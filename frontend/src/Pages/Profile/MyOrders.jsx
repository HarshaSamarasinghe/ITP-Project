import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MyOrders.css";
import Sidebar from "../../../Components/Sidebar/Sidebar";
import "boxicons/css/boxicons.min.css";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch orders function
  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token provided. Please log in again.");
        setLoading(false);
        return;
      }

      const response = await axios.get(
        "http://localhost:4000/api/order/my-orders",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setOrders(response.data.data);
      } else {
        setError("Failed to fetch orders.");
      }
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError("Error fetching orders.");
    } finally {
      setLoading(false);
    }
  };

  // Handle delete with confirmation
  const handleDelete = async (orderId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this order?"
    );
    if (!confirmDelete) return; // User cancelled

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("No token provided. Please log in again.");
        return;
      }

      const response = await axios.post(
        `http://localhost:4000/api/order/my-orders/delete/${orderId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data.message);

      setOrders((prevOrders) =>
        prevOrders.filter((order) => order._id !== orderId)
      );
      alert("Order deleted successfully!");
    } catch (error) {
      console.error("Error deleting order:", error);
      alert("Failed to delete the order.");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="ordersLoadingWrapper">
        <p className="ordersLoadingText">Loading your orders...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="ordersLoadingWrapper">
        <p className="ordersErrorText">{error}</p>
      </div>
    );
  }

  return (
    <div className="ordersPageWrapper">
      <Sidebar />
      <main className="myOrders">
        <div className="ordersHeader">
          <div className="ordersHeaderLeft">
            <h2 className="ordersTitle">My Orders</h2>
            <p className="ordersSubtitle">
              {orders.length} {orders.length === 1 ? "order" : "orders"} placed
            </p>
          </div>
        </div>

        {orders.length === 0 ? (
          <div className="noOrdersCard">
            <i className="bx bx-shopping-bag noOrdersIcon" />
            <h3>No orders found</h3>
            <p>Looks like you haven't placed any orders yet.</p>
            <a href="/shop" className="shopNowBtn">
              Shop Now
            </a>
          </div>
        ) : (
          <div className="ordersList">
            {orders.map((order) => (
              <div className="orderCard" key={order._id}>
                {/* Order Top Banner / Header */}
                <div className="orderCardHeader">
                  <div className="orderMeta">
                    <div className="orderIdGroup">
                      <span className="orderIdLabel">ORDER ID</span>
                      <span className="orderIdValue">{order._id}</span>
                    </div>
                    <div className="orderDateGroup">
                      <span className="orderDateLabel">DATE PLACED</span>
                      <span className="orderDateValue">
                        {new Date(order.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                  </div>

                  <div className="orderBadges">
                    <span
                      className={`statusBadge paymentBadge ${
                        order.payment ? "paid" : "pending"
                      }`}
                    >
                      <i
                        className={`bx ${
                          order.payment ? "bx-check-circle" : "bx-time-five"
                        }`}
                      />
                      {order.payment ? "Paid" : "Unpaid"}
                    </span>
                    <span
                      className={`statusBadge trackingBadge ${order.tracking.toLowerCase()}`}
                    >
                      <i className="bx bx-package" />
                      {order.tracking}
                    </span>
                  </div>
                </div>

                {/* Order Body */}
                <div className="orderCardBody">
                  <div className="orderSummarySection">
                    <div className="priceDetail">
                      <span className="priceLabel">Total Amount Paid</span>
                      <span className="priceValue">
                        LKR {order.amount?.toLocaleString()}
                      </span>
                    </div>

                    {order.tracking === "Pending" && (
                      <button
                        className="cancelOrderBtn"
                        onClick={() => handleDelete(order._id)}
                      >
                        <i className="bx bx-trash" />
                        Cancel Order
                      </button>
                    )}
                  </div>

                  {/* Customization Details Box */}
                  {order.customizedDetails ? (
                    <div className="customizationDetailsBox">
                      <h4 className="customizationTitle">
                        <i className="bx bx-slider-alt" /> Customization Specifications
                      </h4>
                      <div className="customizationGrid">
                        <div className="customizationGridItem">
                          <span className="customLabel">Material</span>
                          <span className="customValue">
                            {order.customizedDetails.material || "Standard"}
                          </span>
                        </div>
                        <div className="customizationGridItem">
                          <span className="customLabel">Color</span>
                          <span className="customValue">
                            <span
                              className="colorIndicator"
                              style={{
                                backgroundColor: order.customizedDetails.color?.toLowerCase(),
                              }}
                            />
                            {order.customizedDetails.color || "Standard"}
                          </span>
                        </div>
                        <div className="customizationGridItem">
                          <span className="customLabel">Size</span>
                          <span className="customValue">
                            {order.customizedDetails.size || "Standard"}
                          </span>
                        </div>
                        <div className="customizationGridItem">
                          <span className="customLabel">Weight</span>
                          <span className="customValue">
                            {order.customizedDetails.weight || "Standard"}
                          </span>
                        </div>
                        <div className="customizationGridItem">
                          <span className="customLabel">Durability</span>
                          <span className="customValue">
                            {order.customizedDetails.durability || "Standard"}
                          </span>
                        </div>
                        <div className="customizationGridItem">
                          <span className="customLabel">Custom Price</span>
                          <span className="customValue price">
                            LKR {order.customizedDetails.totalPrice?.toLocaleString() || "0"}
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="noCustomizationBox">
                      <i className="bx bx-info-circle" />
                      <span>Standard product order (No custom specs)</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default MyOrders;
