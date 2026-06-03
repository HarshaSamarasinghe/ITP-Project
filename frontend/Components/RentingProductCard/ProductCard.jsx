import { Link } from "react-router-dom";
import React from "react";
import "./ProductCard.css";
import "boxicons/css/boxicons.min.css";

const ProductCard = ({ product }) => {
  return (
    <div className="cardWrapper">
      <div className="cardContainer">
        <i className="bx bx-heart"></i>
        <Link to={`/viewSingleItem/${product._id}`}>
          <div className="itemImage">
            <img
              src={`http://localhost:4000/images/${product.eqImage}`}
              alt={product.eqName}
            />
          </div>
        </Link>
        <div className="itemDetails">
          <div className="itemNameAndPrice">
            <h3 className="itemName">{product.eqName}</h3>
            <h4 className="itemPrice">
              Rs. {Number(product.eqPrice || 0).toFixed(2)}/day
            </h4>
          </div>
          <div className="buyItem">
            <Link to={`/viewSingleItem/${product._id}`}>
              <button className="buy">Rent</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
