import Sidebar from "../../../Components/Sidebar/Sidebar";
import { useState } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import "./Repair.css";

const Repair = () => {
  const url = "http://localhost:4000";
  const toast = useToast();
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    equipment: "",
    description: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (!data.name.trim() || !data.equipment.trim() || !data.description.trim()) {
      toast({
        title: "All fields are required",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      setSubmitting(true);
      const token = localStorage.getItem("token");
      if (!token) {
        toast({
          title: "Authentication Required",
          description: "Please log in to submit repair requests.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        navigate("/login");
        return;
      }

      const response = await axios.post(`${url}/api/repair/create`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        toast({
          title: "Success",
          description: "Repair Request created successfully!",
          status: "success",
          duration: 2000,
          isClosable: true,
        });

        setData({
          name: "",
          equipment: "",
          description: "",
        });

        setTimeout(() => {
          navigate("/my-repairs");
        }, 1200);
      } else {
        toast({
          title: "Submission Failed",
          description: response.data.message || "Failed to create repair request",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to submit request.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="profilePageWrapper">
      <Sidebar />
      <main className="repairMainContent">
        <div className="repairHeader">
          <h1>Request a Repair</h1>
          <p className="repairSubtitle">
            Please fill in the details below to request a new repair service.
          </p>
        </div>

        <form onSubmit={onSubmitHandler} className="repairCard">
          <div className="repairCardBody">
            <div className="repairInputWrapper">
              <label className="repairLabel" htmlFor="name">
                Owner Name
              </label>
              <div className="repairInputInner">
                <i className="bx bx-user repairInputIcon"></i>
                <input
                  id="name"
                  type="text"
                  name="name"
                  className="repairInput"
                  placeholder="Enter your full name"
                  value={data.name}
                  onChange={onChangeHandler}
                  required
                />
              </div>
            </div>

            <div className="repairInputWrapper">
              <label className="repairLabel" htmlFor="equipment">
                Equipment Type
              </label>
              <div className="repairInputInner">
                <i className="bx bx-wrench repairInputIcon"></i>
                <input
                  id="equipment"
                  type="text"
                  name="equipment"
                  className="repairInput"
                  placeholder="e.g. Badminton Racket, Cricket Bat"
                  value={data.equipment}
                  onChange={onChangeHandler}
                  required
                />
              </div>
            </div>

            <div className="repairInputWrapper">
              <label className="repairLabel" htmlFor="description">
                Problem Description
              </label>
              <div className="repairInputInner">
                <i className="bx bx-detail repairTextareaIcon"></i>
                <textarea
                  id="description"
                  name="description"
                  className="repairInput repairTextarea"
                  placeholder="Describe the problem with your equipment in detail..."
                  value={data.description}
                  onChange={onChangeHandler}
                  required
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="repairSubmitBtn"
            disabled={submitting}
          >
            {submitting ? "Submitting Request..." : "Submit Repair Request"}
          </button>

          <p className="repairNote">
            Note: Please ensure that all details are correct. You will be redirected to view your active repairs.
          </p>
        </form>
      </main>
    </div>
  );
};

export default Repair;
