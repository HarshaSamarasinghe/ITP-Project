import "./Settings.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../../Components/Sidebar/Sidebar";
import { useToast } from "@chakra-ui/react";

function Settings() {
  const url = "http://localhost:4000";
  const navigate = useNavigate();
  const toast = useToast();

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Mock settings stored locally for full interactivity
  const [preferences, setPreferences] = useState(() => {
    const saved = localStorage.getItem("sports_zaga_settings_prefs");
    return saved
      ? JSON.parse(saved)
      : {
          emailNotifications: true,
          activityLog: true,
          publicProfile: false,
        };
  });

  useEffect(() => {
    localStorage.setItem(
      "sports_zaga_settings_prefs",
      JSON.stringify(preferences)
    );
  }, [preferences]);

  const togglePreference = (key) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Handle input changes
  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  // Update user data
  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!userData.name.trim()) {
      toast({
        title: "Name is required",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (!userData.email.trim()) {
      toast({
        title: "Email is required",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Password validation if they filled it out
    if (userData.password) {
      if (userData.password.length < 8) {
        toast({
          title: "Password too short",
          description: "Password must be at least 8 characters long.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }
      if (userData.password !== userData.confirmPassword) {
        toast({
          title: "Passwords do not match",
          description: "Please check your passwords and try again.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }
    }

    try {
      setSaving(true);
      const token = localStorage.getItem("token");
      if (!token) {
        toast({
          title: "Session Expired",
          description: "Please log in again.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        navigate("/login");
        return;
      }

      const payload = {
        name: userData.name,
        email: userData.email,
      };

      if (userData.password) {
        payload.password = userData.password;
      }

      const response = await axios.put(`${url}/api/user/update`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        toast({
          title: "Success",
          description: "Profile updated successfully!",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        
        // Reset password fields
        setUserData((prev) => ({
          ...prev,
          password: "",
          confirmPassword: "",
        }));

        setTimeout(() => {
          navigate("/profile");
        }, 1200);
      } else {
        toast({
          title: "Update Failed",
          description: response.data.message || "Failed to update profile",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to update profile.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          toast({
            title: "Authentication Required",
            description: "Please log in to manage your settings.",
            status: "warning",
            duration: 3000,
            isClosable: true,
          });
          setLoading(false);
          navigate("/login");
          return;
        }

        const response = await axios.get(`${url}/api/user/settings`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data && response.data.success) {
          setUserData({
            name: response.data.data.name || "",
            email: response.data.data.email || "",
            password: "",
            confirmPassword: "",
          });
        }
      } catch (error) {
        console.error(error);
        toast({
          title: "Error",
          description: "Failed to fetch user data.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [url, navigate, toast]);

  if (loading) {
    return (
      <div className="settingsLoadingWrapper">
        <p>Loading settings...</p>
      </div>
    );
  }

  return (
    <div className="profilePageWrapper">
      <Sidebar />
      <main className="settingsMainContent">
        <div className="settingsHeader">
          <div className="settingsHeaderTitle">
            <button className="settingsBackBtn" onClick={() => navigate("/profile")}>
              <i className="bx bx-arrow-back"></i> Back to Profile
            </button>
            <h1>Settings</h1>
            <p className="settingsSubtitle">
              Manage your profile info, security settings, and notifications.
            </p>
          </div>
        </div>

        <div className="settingsGrid">
          {/* Card for Profile and Security */}
          <form onSubmit={handleUpdate} className="settingsCard">
            <div className="settingsCardHeader">
              <h2>Account Information</h2>
              <p>Update your personal details below.</p>
            </div>

            <div className="settingsCardBody">
              <div className="settingsInputWrapper">
                <label className="settingsLabel" htmlFor="name">
                  Full Name
                </label>
                <div className="settingsInputInner">
                  <i className="bx bx-user settingsInputIcon"></i>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    className="settingsInput"
                    placeholder="Enter your name"
                    value={userData.name}
                    onChange={onChangeHandler}
                    required
                  />
                </div>
              </div>

              <div className="settingsInputWrapper">
                <label className="settingsLabel" htmlFor="email">
                  Email Address
                </label>
                <div className="settingsInputInner">
                  <i className="bx bx-envelope settingsInputIcon"></i>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    className="settingsInput"
                    placeholder="Enter your email"
                    value={userData.email}
                    onChange={onChangeHandler}
                    required
                  />
                </div>
              </div>
            </div>

            <div
              className="settingsCardHeader"
              style={{
                marginTop: "24px",
                paddingTop: "24px",
                borderTop: "1px solid #f0f0f0",
              }}
            >
              <h2>Security</h2>
              <p>Change your password if desired. Otherwise, leave blank.</p>
            </div>

            <div className="settingsCardBody">
              <div className="settingsInputWrapper">
                <label className="settingsLabel" htmlFor="password">
                  New Password
                </label>
                <div className="settingsInputInner">
                  <i className="bx bx-lock-alt settingsInputIcon"></i>
                  <input
                    id="password"
                    type="password"
                    name="password"
                    className="settingsInput"
                    placeholder="Min. 8 characters"
                    value={userData.password}
                    onChange={onChangeHandler}
                  />
                </div>
              </div>

              <div className="settingsInputWrapper">
                <label className="settingsLabel" htmlFor="confirmPassword">
                  Confirm Password
                </label>
                <div className="settingsInputInner">
                  <i className="bx bx-lock settingsInputIcon"></i>
                  <input
                    id="confirmPassword"
                    type="password"
                    name="confirmPassword"
                    className="settingsInput"
                    placeholder="Verify new password"
                    value={userData.confirmPassword}
                    onChange={onChangeHandler}
                  />
                </div>
              </div>
            </div>

            <div className="settingsCardFooter">
              <button
                type="submit"
                className="settingsSubmitBtn"
                disabled={saving}
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default Settings;
