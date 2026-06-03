import "./Profile.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../../../Components/Sidebar/Sidebar";
import "boxicons/css/boxicons.min.css";

function Profile() {
  const navigate = useNavigate();
  const url = "http://localhost:4000";

  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedToken = localStorage.getItem("token");
        if (!storedToken) {
          setError("User not authenticated");
          setLoading(false);
          return;
        }
        const response = await axios.get(`${url}/api/user/settings`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        });
        setUserData(response.data.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch user data.");
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  if (loading)
    return (
      <div className="profileLoadingWrapper">
        <p className="profileLoadingText">Loading profile...</p>
      </div>
    );

  if (error)
    return (
      <div className="profileLoadingWrapper">
        <p className="profileErrorText">{error}</p>
      </div>
    );

  /* derive initials for the avatar */
  const initials = userData?.name
    ? userData.name
        .split(" ")
        .map((w) => w[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "?";

  return (
    <div className="profilePageWrapper">
      <Sidebar />

      <main className="myProfile">
        {/* ── Hero card ── */}
        <div className="profileCard">
          <div className="profileAvatarRing">
            <div className="profileAvatar">{initials}</div>
          </div>

          <div className="profileCardBody">
            <h2 className="profileName">{userData?.name || "—"}</h2>
            <p className="profileRole">Sports Zaga Member</p>

            <div className="profileDivider" />

            <div className="profileInfoGrid">
              <div className="profileInfoItem">
                <i className="bx bx-envelope profileInfoIcon" />
                <div>
                  <span className="profileInfoLabel">Email</span>
                  <span className="profileInfoValue">
                    {userData?.email || "—"}
                  </span>
                </div>
              </div>

              <div className="profileInfoItem">
                <i className="bx bx-phone profileInfoIcon" />
                <div>
                  <span className="profileInfoLabel">Phone</span>
                  <span className="profileInfoValue">
                    {userData?.phone || "Not set"}
                  </span>
                </div>
              </div>

              <div className="profileInfoItem">
                <i className="bx bx-map profileInfoIcon" />
                <div>
                  <span className="profileInfoLabel">Address</span>
                  <span className="profileInfoValue">
                    {userData?.address || "Not set"}
                  </span>
                </div>
              </div>

              <div className="profileInfoItem">
                <i className="bx bx-calendar profileInfoIcon" />
                <div>
                  <span className="profileInfoLabel">Member Since</span>
                  <span className="profileInfoValue">
                    {userData?.createdAt
                      ? new Date(userData.createdAt).toLocaleDateString(
                          "en-US",
                          { year: "numeric", month: "long" }
                        )
                      : "—"}
                  </span>
                </div>
              </div>
            </div>

            <div className="profileActions">
              <button
                className="profileActionBtn primary"
                onClick={() => navigate("/settings")}
              >
                <i className="bx bx-edit" />
                Edit Profile
              </button>
              <button
                className="profileActionBtn secondary"
                onClick={() => navigate("/orders")}
              >
                <i className="bx bx-shopping-bag" />
                My Orders
              </button>
            </div>
          </div>
        </div>

        {/* ── Quick stats row ── */}
        <div className="profileStatsRow">
          <div className="profileStatCard" onClick={() => navigate("/orders")}>
            <i className="bx bx-shopping-bag profileStatIcon" />
            <span className="profileStatLabel">Orders</span>
          </div>
          <div
            className="profileStatCard"
            onClick={() => navigate("/viewMyOrders")}
          >
            <i className="bx bx-package profileStatIcon" />
            <span className="profileStatLabel">Rentings</span>
          </div>
          <div
            className="profileStatCard"
            onClick={() => navigate("/my-repairs")}
          >
            <i className="bx bx-wrench profileStatIcon" />
            <span className="profileStatLabel">Repairs</span>
          </div>
          <div
            className="profileStatCard"
            onClick={() => navigate("/my-customization")}
          >
            <i className="bx bx-paint profileStatIcon" />
            <span className="profileStatLabel">Custom Orders</span>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Profile;
