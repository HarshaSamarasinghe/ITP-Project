import itemModel from "../model/itemModel.js";
import fs from "node:fs";
import PDFDocument from "pdfkit";

// Helper function to safely delete files without crashing the server
const safelyDeleteFile = (filePath) => {
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log(`Successfully deleted old file: ${filePath}`);
    } else {
      console.warn(`File warning: Attempted to delete ${filePath}, but file does not exist.`);
    }
  } catch (error) {
    console.error(`Error deleting file at ${filePath}:`, error.message);
  }
};

// create ---------------------------------------------------------------------------------------
const createItem = async (req, res) => {
  let imageFilename = req.file ? req.file.filename : null;

  try {
    const {
      name,
      category,
      brand,
      basePrice,
      color,
      weight,
      size,
      material,
      durability,
    } = req.body;

    // Validate required fields
    if (!name || !imageFilename || !category || !brand || !basePrice) {
      // If validation fails, clean up the newly uploaded file to avoid orphaned images
      if (imageFilename) safelyDeleteFile(`./Uploads/${imageFilename}`);
      
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    // Parse specifications if provided
    const specifications = {
      color: JSON.parse(color || "[]"),
      weight: JSON.parse(weight || "[]"),
      size: JSON.parse(size || "[]"),
      material: JSON.parse(material || "[]"),
      durability: JSON.parse(durability || "[]"),
    };

    // Create a new item
    const item = new itemModel({
      name,
      image: imageFilename,
      category,
      brand,
      basePrice,
      specifications,
      review: [],
    });

    // Save item to database
    await item.save();
    res.json({ success: true, message: "Item added successfully", item });
  } catch (error) {
    console.error(error);
    // Cleanup newly uploaded file if database save fails
    if (imageFilename) safelyDeleteFile(`./Uploads/${imageFilename}`);
    res.status(500).json({ success: false, message: "Error creating item" });
  }
};

// Update ---------------------------------------------------------------------------------------
const updateItem = async (req, res) => {
  try {
    const { id } = req.params; 
    const {
      name,
      category,
      brand,
      basePrice,
      color,
      weight,
      size,
      material,
      durability,
    } = req.body; 

    let newImage = req.file ? req.file.filename : null;

    // Find the item by ID
    const item = await itemModel.findById(id);
    if (!item) {
      if (newImage) safelyDeleteFile(`./Uploads/${newImage}`);
      return res
        .status(404)
        .json({ success: false, message: "Item not found" });
    }

    // FIX: Safely delete the old image if a new one is provided
    if (newImage && item.image) {
      safelyDeleteFile(`./Uploads/${item.image}`); 
    }

    // Function to safely parse a value or return the existing value
    const parseSpecification = (value, existingValue) => {
      if (value && Array.isArray(value)) {
        return value; 
      }
      try {
        return value ? JSON.parse(value) : existingValue; 
      } catch (error) {
        console.error("Error parsing specification:", error);
        return existingValue; 
      }
    };

    // Only update specifications if values are provided
    const specifications = {
      color: parseSpecification(color, item.specifications?.color || []),
      weight: parseSpecification(weight, item.specifications?.weight || []),
      size: parseSpecification(size, item.specifications?.size || []),
      material: parseSpecification(material, item.specifications?.material || []),
      durability: parseSpecification(durability, item.specifications?.durability || []),
    };

    // Update the item in the database
    const updatedItem = await itemModel.findByIdAndUpdate(
      id,
      {
        name,
        image: newImage || item.image, 
        category,
        brand,
        basePrice,
        specifications, 
      },
      { new: true } 
    );

    res.json({
      success: true,
      message: "Item updated successfully",
      data: updatedItem,
    });
  } catch (error) {
    console.error(error);
    // If anything fails and a new image was uploaded, remove it to keep storage clean
    if (req.file ? req.file.filename : null) safelyDeleteFile(`./Uploads/${req.file.filename}`);
    res.status(500).json({ success: false, message: "Error updating item" });
  }
};

// delete ---------------------------------------------------------------------------------------
const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "Item ID is required" });
    }

    const item = await itemModel.findById(id);
    if (!item) {
      return res
        .status(404)
        .json({ success: false, message: "Item not found" });
    }

    // FIX: Remove old image safely before removing database records
    if (item.image) {
      safelyDeleteFile(`./Uploads/${item.image}`);
    }

    // Find and delete item
    await itemModel.findByIdAndDelete(id);

    res.json({ success: true, message: "Item deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error deleting item" });
  }
};

// read ---------------------------------------------------------------------------------------
const listItem = async (req, res) => {
  try {
    const items = await itemModel.find();

    if (items.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No items found" });
    }

    res.json({
      success: true,
      message: "Items retrieved successfully",
      data: items,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error fetching items" });
  }
};

// get item by id -------------------------------------------------------------------------------
const getItem = async (req, res) => {
  try {
    const { id } = req.params; 

    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "Item ID is required" });
    }

    const item = await itemModel.findById(id);

    if (!item) {
      return res
        .status(404)
        .json({ success: false, message: "Item not found" });
    }

    res.json({
      success: true,
      message: "Item retrieved successfully",
      data: item,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error fetching item" });
  }
};

// Report Generation -----------------------------------------------------------------------------
const generateReport = async (req, res) => {
  console.log("Generating item report...");

  try {
    const items = await itemModel.find();

    const doc = new PDFDocument({ size: "A4", layout: "portrait", margin: 40 });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=item-report.pdf`
    );

    doc.pipe(res);

    doc.fontSize(18).text("Admin Item Report", { align: "center" });
    doc.moveDown(1);

    items.forEach((item, index) => {
      doc
        .fontSize(14)
        .text(`${index + 1}. ${item.name}`, { underline: true })
        .moveDown(0.2);

      doc.fontSize(12);
      doc.text(`Category: ${item.category}`);
      doc.text(`Brand: ${item.brand}`);
      doc.text(`Base Price: LKR ${item.basePrice}`);
      doc.moveDown(0.5);

      const spec = item.specifications || {};

      const printSpec = (label, values) => {
        if (values && values.length > 0) {
          doc.text(`${label}:`);
          values.forEach((v) => {
            doc.text(` - ${v.value || 'N/A'} (LKR ${v.price || 0})`, { indent: 20 });
          });
          doc.moveDown(0.3);
        }
      };

      printSpec("Colors", spec.color);
      printSpec("Weight", spec.weight);
      printSpec("Size", spec.size);
      printSpec("Material", spec.material);
      printSpec("Durability", spec.durability);

      doc.moveDown(1);
      doc
        .moveTo(doc.page.margins.left, doc.y)
        .lineTo(doc.page.width - doc.page.margins.right, doc.y)
        .stroke();
      doc.moveDown(1);
    });

    doc.end();
  } catch (error) {
    console.error("Error generating item report:", error);
    res
      .status(500)
      .json({ success: false, message: "Error generating item report" });
  }
};

export {
  createItem,
  updateItem,
  deleteItem,
  listItem,
  getItem,
  generateReport,
};