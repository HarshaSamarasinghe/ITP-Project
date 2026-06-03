import { useEffect, useState } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import Sidebar from "../../../Components/Sidebar/Sidebar";
import "./MyCustomization.css";

const MyCustomization = () => {
  const toast = useToast();
  const [customizations, setCustomizations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedCustomization, setSelectedCustomization] = useState(null);
  const [newColor, setNewColor] = useState("");
  const [newWeight, setNewWeight] = useState("");

  const fetchCustomizations = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/customize/my`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setCustomizations(response.data.data || []);
    } catch (error) {
      console.error("Error fetching customizations:", error);
      toast({
        title: "Error",
        description: "Failed to load customizations.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteCustomization = async (id, progress) => {
    if (progress > 0) {
      toast({
        title: "Action Blocked",
        description: "You cannot delete a customization already in progress.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    try {
      const response = await axios.delete(
        `http://localhost:4000/api/customize/delete/${id}`
      );
      if (response.data.success) {
        toast({
          title: "Deleted",
          description: "Customization deleted successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setCustomizations(customizations.filter((item) => item._id !== id));
      } else {
        toast({
          title: "Delete Failed",
          description: response.data.message || "Could not delete design.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error deleting customization:", error);
      toast({
        title: "Error",
        description: "Failed to delete customization.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleUpdateClick = (item) => {
    if (item.progress > 0) {
      toast({
        title: "Action Locked",
        description: "This design is in production and cannot be updated.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    setSelectedCustomization(item);
    setNewColor(item.color);
    setNewWeight(item.weight);
    setShowModal(true);
  };

  const handleUpdateSubmit = async () => {
    const weightNum = Number(newWeight);
    if (isNaN(weightNum) || weightNum < 500 || weightNum > 1200) {
      toast({
        title: "Invalid Weight",
        description: "Weight must be between 500g and 1200g.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:4000/api/customize/update/my/${selectedCustomization._id}`,
        {
          color: newColor,
          weight: newWeight,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      if (response.data.success) {
        toast({
          title: "Success",
          description: "Customization updated successfully!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        fetchCustomizations();
        setShowModal(false);
      } else {
        toast({
          title: "Update Failed",
          description: response.data.message || "Failed to update design.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error updating customization:", error);
      toast({
        title: "Error",
        description: "Failed to update customization.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    fetchCustomizations();
  }, []);

  if (loading) {
    return (
      <div className="settingsLoadingWrapper">
        <p>Loading your customizations...</p>
      </div>
    );
  }

  return (
    <div className="profilePageWrapper">
      <Sidebar />
      <main className="customizationsMainContent">
        <div className="customHeader">
          <h1>My Customizations</h1>
          <p className="customSubtitle">
            Track, modify, or delete your bespoke sports equipment designs.
          </p>
        </div>

        {customizations.length === 0 ? (
          <div className="customEmptyState">
            <i className="bx bx-paint"></i>
            <h3>No Customizations Yet</h3>
            <p>
              You haven't customized any equipment designs yet. Head to the
              store to start a design!
            </p>
          </div>
        ) : (
          <div className="customCardGrid">
            {customizations.map((item) => {
              const isLocked = item.progress > 0;
              return (
                <div key={item._id} className="customCard">
                  <div className="customImageContainer">
                    <img
                      src={`http://localhost:4000/images/${item.image}`}
                      alt={item.name}
                      className="customCardImage"
                    />
                  </div>

                  <div className="customCardHeader">
                    <h2 className="customCardTitle">{item.name}</h2>
                    <span className="customCardPrice">LKR {item.totalPrice}</span>
                  </div>

                  <div className="customCardSpecs">
                    <div className="specItem">
                      <span className="specLabel">Color</span>
                      <span className="specValue">
                        <span
                          className="colorPreviewCircle"
                          style={{ backgroundColor: item.color }}
                        />
                        {item.color}
                      </span>
                    </div>

                    <div className="specItem">
                      <span className="specLabel">Weight</span>
                      <span className="specValue">{item.weight}g</span>
                    </div>

                    <div className="specItem">
                      <span className="specLabel">Size</span>
                      <span className="specValue">{item.size}</span>
                    </div>

                    <div className="specItem">
                      <span className="specLabel">Material</span>
                      <span className="specValue">{item.material}</span>
                    </div>

                    <div className="specItem" style={{ gridColumn: "span 2" }}>
                      <span className="specLabel">Durability</span>
                      <span className="specValue">{item.durability}</span>
                    </div>
                  </div>

                  <div className="customCardProgress">
                    <div className="progressLabelRow">
                      <span className="progressLabel">
                        {isLocked ? (
                          <>
                            <i className="bx bx-cog bx-spin"></i> In Production
                          </>
                        ) : (
                          <>
                            <i className="bx bx-time-five"></i> Pending Approval
                          </>
                        )}
                      </span>
                      <span className="progressPercentage">{item.progress}%</span>
                    </div>
                    <div className="progressBarContainer">
                      <div
                        className="progressBarFill"
                        style={{ width: `${item.progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="customCardActions">
                    <button
                      className="customActionBtn update"
                      onClick={() => handleUpdateClick(item)}
                      disabled={isLocked}
                      title={isLocked ? "In progress - cannot edit" : "Edit specs"}
                    >
                      {isLocked ? (
                        <>
                          <i className="bx bx-lock-alt"></i> Locked
                        </>
                      ) : (
                        "Update"
                      )}
                    </button>
                    <button
                      className="customActionBtn delete"
                      disabled={isLocked}
                      onClick={() => {
                        if (
                          window.confirm(
                            "Are you sure you want to delete this customization?"
                          )
                        ) {
                          deleteCustomization(item._id, item.progress);
                        }
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {showModal && (
          <div className="customModalOverlay">
            <div className="customModalContent">
              <div className="customModalHeader">
                <h3>Update Customization</h3>
                <p>Modify the color and weight specifications for your design.</p>
              </div>

              <div className="customModalBody">
                <div className="modalField">
                  <label className="modalLabel">Color</label>
                  <div className="paletteContainer">
                    {[
                      "#FF0000",
                      "#37914f",
                      "#0000FF",
                      "#f57125",
                      "#f21b63",
                      "#000000",
                      "#f5f5f5",
                    ].map((color) => (
                      <div
                        key={color}
                        className={`paletteColorCircle ${
                          newColor === color ? "selected" : ""
                        }`}
                        style={{ backgroundColor: color }}
                        onClick={() => setNewColor(color)}
                        title={color}
                      />
                    ))}
                  </div>
                </div>

                <div className="modalField">
                  <label className="modalLabel" htmlFor="modalWeight">
                    Weight (500g–1200g)
                  </label>
                  <div className="weightInputWrapper">
                    <input
                      id="modalWeight"
                      type="number"
                      min="500"
                      max="1200"
                      value={newWeight}
                      onChange={(e) => setNewWeight(e.target.value)}
                      className="modalInputText"
                      placeholder="Enter weight in grams"
                    />
                  </div>
                </div>
              </div>

              <div className="customModalFooter">
                <button className="modalActionBtn save" onClick={handleUpdateSubmit}>
                  Save
                </button>
                <button
                  className="modalActionBtn cancel"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default MyCustomization;
