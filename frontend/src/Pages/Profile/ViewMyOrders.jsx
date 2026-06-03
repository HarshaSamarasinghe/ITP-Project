import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ViewMyOrders.css";
import { useOrderDetails } from "../../Store/rentingOrderDetails";
import { Link } from "react-router-dom";
import Sidebar from "../../../Components/Sidebar/Sidebar";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  useDisclosure,
  useToast,
  Button,
  Input,
  VStack,
  Text,
} from "@chakra-ui/react";

function ViewMyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { updateReturnStatus } = useOrderDetails();
  const [isFinePaymentOpen, setIsFinePaymentOpen] = useState(false); // Fine Payment Modal
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [selectedFineAmount, setSelectedFineAmount] = useState(0);

  const [updatedReturnStatus, setUpdatedReturnStatus] = useState({
    returnStatus: "Pending",
  });

  const [updatedFineStatus, setUpdatedFineStatus] = useState({
    returnStatus: "Successful",
    fineValue: 0,
  });

  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure(); // Return Request Modal

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
    name: "",
  });

  const handleUpdateReturnStatus = async (pid, updatedReturnStatus) => {
    const { success, message } = await updateReturnStatus(
      pid,
      updatedReturnStatus
    );
    onClose();
    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      const updatedOrder = useOrderDetails
        .getState()
        .orders.find((o) => o._id === pid);
      setUpdatedReturnStatus(updatedOrder || updatedReturnStatus);
    } else {
      toast({
        title: "Success",
        description: "Return Request Sent successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      await fetchOrders();
    }
  };

  const handleFinePayment = async (pid, updatedFineStatus) => {
    console.log("Fine Paid:", paymentInfo);
    const { success, message } = await updateReturnStatus(
      pid,
      updatedFineStatus
    );
    setIsFinePaymentOpen(false);
    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      const updatedOrder = useOrderDetails
        .getState()
        .orders.find((o) => o._id === pid);
      setUpdatedFineStatus(updatedOrder || updatedFineStatus);
    } else {
      toast({
        title: "Success",
        description: `Rs.${selectedFineAmount} fine paid successfully.`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      await fetchOrders();
    }
  };

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token provided. Please log in again.");
        setLoading(false);
        return;
      }

      const response = await axios.get(
        "http://localhost:4000/api/RentingOrderDetails",
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

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Payment Details Submitted:", paymentInfo);
    alert("Payment Successful! 🎉");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (loading) {
    return (
      <div className="rentingOrdersLoadingWrapper">
        <p className="rentingOrdersLoadingText">Loading renting orders...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rentingOrdersLoadingWrapper">
        <p className="rentingOrdersErrorText">{error}</p>
      </div>
    );
  }

  return (
    <div className="rentingOrdersPageWrapper">
      <Sidebar />
      <main className="myRentingOrders">
        <div className="rentingOrdersHeader">
          <div className="rentingOrdersHeaderLeft">
            <h2 className="rentingOrdersTitle">My Renting Orders</h2>
            <p className="rentingOrdersSubtitle">
              {orders.length} {orders.length === 1 ? "rental order" : "rental orders"} active
            </p>
          </div>
        </div>

        {orders.length === 0 ? (
          <div className="noRentingOrdersCard">
            <i className="bx bx-package noOrdersIcon" />
            <h3>No renting orders found</h3>
            <p>You haven't rented any equipment yet.</p>
            <Link to="/rentingStore" className="rentNowBtn">
              Browse Renting Store
            </Link>
          </div>
        ) : (
          <div className="rentingOrdersList">
            {orders.map((order) => {
              const returnStatusLower = order?.returnStatus ? order.returnStatus.toLowerCase() : "pending";
              return (
                <div className="rentingOrderCard" key={order._id}>
                  {/* Left Column: Image */}
                  <div className="rentingOrderImageContainer">
                    <img
                      src={
                        order?.eqID?.eqImage
                          ? `http://localhost:4000/images/${order.eqID.eqImage}`
                          : "https://via.placeholder.com/150"
                      }
                      alt={order?.eqID?.eqName || "Equipment Image"}
                      className="rentingOrderImage"
                    />
                  </div>

                  {/* Right Column: Card Content */}
                  <div className="rentingOrderCardContent">
                    {/* Header: ID and badges */}
                    <div className="rentingOrderHeaderRow">
                      <div className="rentingOrderIdGroup">
                        <span className="rentingOrderIdLabel">REF NUMBER</span>
                        <span className="rentingOrderIdValue">{order?._id}</span>
                      </div>
                      <div className="rentingOrderBadges">
                        <span className={`statusBadge returnStatusBadge ${returnStatusLower}`}>
                          <i className={`bx ${
                            order?.returnStatus === "Successful" ? "bx-check-circle" :
                            order?.returnStatus === "Fine" ? "bx-error-circle" : "bx-time-five"
                          }`} />
                          {order?.returnStatus}
                        </span>
                      </div>
                    </div>

                    {/* Middle Details Grid */}
                    <div className="rentingOrderDetailsGrid">
                      <div className="rentingDetailItem">
                        <span className="rentingDetailLabel">Item Name</span>
                        <span className="rentingDetailValue itemName">{order?.eqID?.eqName || "—"}</span>
                      </div>
                      <div className="rentingDetailItem">
                        <span className="rentingDetailLabel">Shipping Method</span>
                        <span className="rentingDetailValue">{order?.shippingMethod || "—"}</span>
                      </div>

                      {/* Timeline dates */}
                      <div className="rentingDetailItem timeline">
                        <span className="rentingDetailLabel">Rental Period</span>
                        <div className="rentalTimeline">
                          <div className="timelinePoint">
                            <span className="dateLabel">From</span>
                            <span className="dateValue">
                              {order?.rentFrom ? new Intl.DateTimeFormat("en-GB", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              }).format(new Date(order.rentFrom)) : "—"}
                            </span>
                          </div>
                          <i className="bx bx-right-arrow-alt timelineArrow" />
                          <div className="timelinePoint">
                            <span className="dateLabel">To</span>
                            <span className="dateValue">
                              {order?.rentTo ? new Intl.DateTimeFormat("en-GB", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              }).format(new Date(order.rentTo)) : "—"}
                            </span>
                          </div>
                        </div>
                      </div>

                      {order?.returnDate &&
                        order.returnDate !== "null" &&
                        !isNaN(new Date(order.returnDate)) && (
                          <div className="rentingDetailItem">
                            <span className="rentingDetailLabel">Return Requested</span>
                            <span className="rentingDetailValue returnRequestedDate">
                              <i className="bx bx-calendar-check" />
                              {new Intl.DateTimeFormat("en-GB", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              }).format(new Date(order.returnDate))}
                            </span>
                          </div>
                      )}
                    </div>

                    {/* Bottom Row: Price / Fine details and Actions */}
                    <div className="rentingOrderFooterRow">
                      <div className="rentingPriceSection">
                        <div className="priceDetail">
                          <span className="priceLabel">Total Amount Paid</span>
                          <span className="priceValue">Rs. {order?.TotalPrice?.toLocaleString()}</span>
                        </div>

                        {order?.fineValue > 0 && (
                          <div className="fineDetailCard">
                            <i className="bx bx-info-circle fineIcon" />
                            <div className="fineInfo">
                              <span className="fineLabel">Fine Charged</span>
                              <span className="fineValue">Rs. {order.fineValue?.toLocaleString()}</span>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="rentingOrderButtons">
                        {order?.returnStatus !== "Successful" && (
                          <button
                            className="rentingActionBtn secondary"
                            onClick={() => {
                              setSelectedOrderId(order._id);
                              onOpen();
                            }}
                          >
                            <i className="bx bx-revision" />
                            Make Return Request
                          </button>
                        )}
                        {order?.returnStatus === "Fine" && (
                          <button
                            className="rentingActionBtn primary danger"
                            onClick={() => {
                              setSelectedOrderId(order._id);
                              setSelectedFineAmount(order?.fineValue);
                              setIsFinePaymentOpen(true);
                            }}
                          >
                            <i className="bx bx-credit-card" />
                            Pay Fine
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Modal for Return Request */}
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent className="modalContentCustom">
            <div className="modalHeaderCustom">
              <h3>Request Equipment Return</h3>
              <p>Please enter the date you are returning the equipment</p>
            </div>
            <ModalCloseButton className="modalCloseBtnCustom" />
            <ModalBody>
              <VStack spacing={4}>
                <div className="modalFormGroup">
                  <label>Today's Return Date</label>
                  <input
                    placeholder="Return Date"
                    name="returnDate"
                    type="date"
                    value={updatedReturnStatus.returnDate || ""}
                    onChange={(e) =>
                      setUpdatedReturnStatus({
                        ...updatedReturnStatus,
                        returnDate: e.target.value,
                      })
                    }
                    className="modalInputCustom"
                  />
                </div>
                <Input
                  hidden
                  readOnly
                  value={updatedReturnStatus.returnStatus || ""}
                />
                <Input
                  hidden
                  readOnly
                  value={updatedReturnStatus.fineValue || ""}
                />
              </VStack>
            </ModalBody>

            <ModalFooter className="modalFooterCustom">
              <button
                type="submit"
                className="modalActionBtnCustom primary"
                onClick={() =>
                  handleUpdateReturnStatus(selectedOrderId, updatedReturnStatus)
                }
              >
                Request Return
              </button>

              <button
                type="button"
                className="modalActionBtnCustom secondary"
                onClick={onClose}
              >
                Cancel
              </button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        {/* Modal for Fine Payment */}
        <Modal
          isOpen={isFinePaymentOpen}
          onClose={() => setIsFinePaymentOpen(false)}
        >
          <ModalOverlay />
          <ModalContent className="modalContentCustom">
            <div className="modalHeaderCustom">
              <h3>Complete Fine Payment</h3>
              <p>Secure payment processed by SportSaGa 💳</p>
            </div>
            <ModalCloseButton className="modalCloseBtnCustom" />
            <ModalBody>
              <Input
                hidden
                readOnly
                value={updatedFineStatus.returnStatus || ""}
              />
              <VStack spacing={4} mt={2}>
                <div className="paymentContainerCustom">
                  <form className="paymentFormCustom" onSubmit={handleSubmit}>
                    <div className="modalFormGroup">
                      <label>Cardholder Name</label>
                      <input
                        type="text"
                        name="name"
                        placeholder="Name on Card"
                        value={paymentInfo.name}
                        onChange={handleChange}
                        required
                        className="modalInputCustom"
                      />
                    </div>

                    <div className="modalFormGroup">
                      <label>Card Number</label>
                      <input
                        type="number"
                        name="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={paymentInfo.cardNumber}
                        onChange={handleChange}
                        required
                        className="modalInputCustom"
                        maxLength={19}
                      />
                    </div>

                    <div className="formRowCustom">
                      <div className="modalFormGroup">
                        <label>Expiry Date</label>
                        <input
                          type="text"
                          name="expiry"
                          placeholder="MM/YY"
                          value={paymentInfo.expiry}
                          onChange={handleChange}
                          required
                          className="modalInputCustom"
                          maxLength={5}
                        />
                      </div>

                      <div className="modalFormGroup">
                        <label>CVV</label>
                        <input
                          type="password"
                          name="cvv"
                          placeholder="123"
                          value={paymentInfo.cvv}
                          onChange={handleChange}
                          required
                          className="modalInputCustom"
                          maxLength={4}
                        />
                      </div>
                    </div>

                    <div className="fineDisplayCustom">
                      <span className="fineDisplayLabel">Total Fine to Pay</span>
                      <span className="fineDisplayAmount">Rs. {selectedFineAmount?.toLocaleString()}.00</span>
                    </div>

                    <button
                      type="submit"
                      className="paymentBtnCustom"
                      onClick={() =>
                        handleFinePayment(selectedOrderId, updatedFineStatus)
                      }
                    >
                      Pay Rs. {selectedFineAmount?.toLocaleString()} Now
                    </button>
                  </form>
                </div>
              </VStack>
            </ModalBody>
          </ModalContent>
        </Modal>
      </main>
    </div>
  );
}

export default ViewMyOrders;
