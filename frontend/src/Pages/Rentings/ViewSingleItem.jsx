import React, { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useProductStore } from "../../Store/rentingItems";
import "./ViewSingleItem.css";
import "boxicons/css/boxicons.min.css";

const ViewSingleItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchProducts, products } = useProductStore();

  useEffect(() => {
    if (products.length === 0) {
      fetchProducts();
    }
  }, [products.length, fetchProducts]);

  const product = products.find((prod) => prod._id === id);

  if (!product) {
    return (
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <p
          style={{ fontSize: "1.2rem", fontWeight: "500", color: "#555" }}
        >
          Loading product details...
        </p>
      </div>
    );
  }

  const isAvailable = product.eqAvailability === "In Stock";

  return (
    <div>
      <div className="itemDetailsWrapper">
        <div className="itemDetailsContainer">
          {/* Left Section */}
          <section className="leftItemDetails">
            <div className="itemDetailsTitle">
              <i
                className="bx bx-chevron-left"
                onClick={() => navigate(-1)}
              ></i>
              <h1 className="itemDetailsItemName">{product.eqName}</h1>
            </div>
            <div className="itemDetailsImage">
              <i className="bx bx-heart"></i>
              <img
                src={`http://localhost:4000/images/${product.eqImage}`}
                alt={product.eqName}
              />
            </div>
            <div className="leftItemDetailsInfo">
              <div className="itemDetailsBrand">
                <h3>Price:</h3>
                <h4>
                  Rs. {Number(product.eqPrice || 0).toFixed(2)}
                  <span className="perDay">/day</span>
                </h4>
              </div>
              <div className="itemDetailsCategory">
                <h3>Availability:</h3>
                <h4
                  style={{ color: isAvailable ? "#2a9d2a" : "#e53935" }}
                >
                  {product.eqAvailability}
                </h4>
              </div>
            </div>
          </section>

          {/* Right Section */}
          <section className="rightItemDetails">
            <div className="customization-option">
              <h4>Description</h4>
              <p className="rentingDescription">{product.eqDescription}</p>
            </div>

            <div className="customization-option" style={{ marginTop: "10px" }}>
              <h4>Ratings</h4>
              <p className="rentingRatings">⭐⭐⭐⭐☆ &nbsp; 4.0 / 5</p>
            </div>

            <div className="customization-option" style={{ marginTop: "10px" }}>
              <h4>Rental Details</h4>
              <div className="rentalDetails">
                <div className="rentalDetailRow">
                  <span>Price per day</span>
                  <strong>Rs. {Number(product.eqPrice || 0).toFixed(2)}</strong>
                </div>
                <div className="rentalDetailRow">
                  <span>Availability</span>
                  <strong style={{ color: isAvailable ? "#2a9d2a" : "#e53935" }}>
                    {product.eqAvailability}
                  </strong>
                </div>
              </div>
            </div>

            {isAvailable ? (
              <Link 
                to={`/checkout/${product._id}`} 
                className="rentNowBtn" 
                style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
              >
                Rent Now
              </Link>
            ) : (
              <button className="rentNowBtn" disabled style={{ opacity: 0.5, cursor: "not-allowed", display: "flex", justifyContent: "center", alignItems: "center"}}>
                Out of Stock
              </button>
            )}

            <Link to="/rentingStore" className="cancelRentBtn">
              Back to Store
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ViewSingleItem;
