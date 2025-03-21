
// import { Box, Button, Container, Heading, Input, Select, useColorModeValue, useToast, VStack } from "@chakra-ui/react";
// import { useState } from "react";
// import axios from "axios";

// const CreateRentingItems = () => {
//     const [newProduct, setNewProduct] = useState({
//         eqName: "",
//         eqDescription: "",
//         eqPrice: "",
//         eqImage: "",
//         eqAvailability: "",
//     });
//     const toast = useToast();

//     const handleAddProduct = async () => {
//         try {
//             const response = await axios.post("/api/rentingItems",newProduct) //  actual API endpoint
//             toast({
//                 title: "Success",
//                 description: response.data.message,
//                 status: "success",
//                 isClosable: true,
//             });
//             setNewProduct({ eqName: "", eqPrice: "", eqImage: "", eqAvailability: "", eqDescription: "" });
//         } catch (error) {
//             toast({
//                 title: "Error",
//                 description: error.response ? error.response.data.message : "An error occurred",
//                 status: "error",
//                 isClosable: true,
//             });
//         }
//     };

//     return (
//         <Container maxW={"container.sm"}>
//             <VStack spacing={8}>
//                 <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
//                     Add New Renting Items
//                 </Heading>

//                 <Box w={"full"} bg={useColorModeValue("white", "gray.800")} p={6} rounded={"lg"} shadow={"md"}>
//                     <VStack spacing={4}>
//                         <Input
//                             placeholder="Product Name"
//                             name="eqName"
//                             value={newProduct.eqName}
//                             onChange={(e) => setNewProduct({ ...newProduct, eqName: e.target.value })}
//                         />
//                         <Input
//                             placeholder="Description"
//                             name="eqDescription"
//                             value={newProduct.eqDescription}
//                             onChange={(e) => setNewProduct({ ...newProduct, eqDescription: e.target.value })}
//                         />
//                         <Input
//                             placeholder="Price"
//                             name="eqPrice"
//                             type="number"
//                             value={newProduct.eqPrice}
//                             onChange={(e) => setNewProduct({ ...newProduct, eqPrice: e.target.value })}
//                         />
//                         <Input
//                             placeholder="Image URL"
//                             name="eqImage"
//                             value={newProduct.eqImage}
//                             onChange={(e) => setNewProduct({ ...newProduct, eqImage: e.target.value })}
//                         />
//                         <Select
//                             placeholder="Select Availability"
//                             name="eqAvailability"
//                             value={newProduct.eqAvailability}
//                             onChange={(e) => setNewProduct({ ...newProduct, eqAvailability: e.target.value })}
//                         >
//                             <option value="In Stock">In Stock</option>
//                             <option value="Out of Stock">Out of Stock</option>
//                         </Select>
                        

//                         <Button colorScheme="blue" onClick={handleAddProduct} w="full">
//                             Add Equipment
//                         </Button>
//                     </VStack>
//                 </Box>
//             </VStack>
//         </Container>
//     );
// };

// export default CreateRentingItems;


import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./createRentingItems.css";

const CreateRentingItems = () => {
    const [newProduct, setNewProduct] = useState({
        eqName: "",
        eqDescription: "",
        eqPrice: "",
        eqImage: "",
        eqAvailability: "",
    });

    const [errors, setErrors] = useState({});

    const validateForm = () => {
        let errors = {};
        if (!newProduct.eqName.trim()) errors.eqName = "Product name is required";
        if (!newProduct.eqDescription.trim()) errors.eqDescription = "Description is required";
        if (!newProduct.eqPrice.trim() || isNaN(newProduct.eqPrice) || Number(newProduct.eqPrice) <= 0) 
            errors.eqPrice = "Valid price is required";
        if (!newProduct.eqImage.trim()) errors.eqImage = "Image URL is required";
        if (!newProduct.eqAvailability.trim()) errors.eqAvailability = "Availability is required";

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleAddProduct = async () => {
        if (!validateForm()) {
            toast.error("Please correct the errors before submitting!");
            return;
        }

        try {
            const response = await axios.post("http://localhost:4000/api/rentingItems", newProduct);
            toast.success(response.data.message || "Item added successfully!");
            setNewProduct({ eqName: "", eqPrice: "", eqImage: "", eqAvailability: "", eqDescription: "" });
            setErrors({});
        } catch (error) {
            toast.error(error.response ? error.response.data.message : "An error occurred");
        }
    };

    return (
        <div className="container">
            <ToastContainer position="bottom-center" autoClose={3000} />
            <h1>Add New Renting Items</h1>
            <div className="form-container">
                
                <input
                    type="text"
                    placeholder="Product Name"
                    value={newProduct.eqName}
                    onChange={(e) => setNewProduct({ ...newProduct, eqName: e.target.value })}
                />
                {errors.eqName && <p className="error">{errors.eqName}</p>}
                

                <input
                    type="text"
                    placeholder="Description"
                    value={newProduct.eqDescription}
                    onChange={(e) => setNewProduct({ ...newProduct, eqDescription: e.target.value })}
                />
                {errors.eqDescription && <p className="error">{errors.eqDescription}</p>}

                <input
                    type="number"
                    placeholder="Price"
                    value={newProduct.eqPrice}
                    onChange={(e) => setNewProduct({ ...newProduct, eqPrice: e.target.value })}
                />
                {errors.eqPrice && <p className="error">{errors.eqPrice}</p>}

                <input
                    type="text"
                    placeholder="Image URL"
                    value={newProduct.eqImage}
                    onChange={(e) => setNewProduct({ ...newProduct, eqImage: e.target.value })}
                />
                {errors.eqImage && <p className="error">{errors.eqImage}</p>}

                <select
                    value={newProduct.eqAvailability}
                    placeholder="Select Availability"
                    onChange={(e) => setNewProduct({ ...newProduct, eqAvailability: e.target.value })}
                >
                    <option value="">Select Availability</option>
                    <option value="In Stock">In Stock</option>
                    <option value="Out of Stock">Out of Stock</option>
                </select>
                {errors.eqAvailability && <p className="error">{errors.eqAvailability}</p>}

                <button className="btnAdd" onClick={handleAddProduct}>Add Equipment</button>
            </div>
        </div>
    );
};

export default CreateRentingItems;
