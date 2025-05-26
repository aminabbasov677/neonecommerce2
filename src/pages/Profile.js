import React, { useState } from "react";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import "./Profile.css";

function Profile() {
  const { state } = useCart();
  const { user, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  const [userInfo, setUserInfo] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    address: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Update localStorage with new user info
    const updatedUser = { ...user, ...userInfo };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    toast.success("Profile updated successfully!");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="profile-container"
    >
      <motion.div
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        className="profile-header"
      >
        <h1>My Profile</h1>
      </motion.div>

      <div className="profile-content">
        <div className="profile-tabs">
          <button
            className={`tab-btn ${activeTab === "profile" ? "active" : ""}`}
            onClick={() => setActiveTab("profile")}
          >
            Profile
          </button>
          <button
            className={`tab-btn ${activeTab === "orders" ? "active" : ""}`}
            onClick={() => setActiveTab("orders")}
          >
            Order History
          </button>
          <button className="tab-btn" onClick={signOut}>
            Sign Out
          </button>
        </div>

        {activeTab === "profile" ? (
          <motion.div
            initial={{ x: -50 }}
            animate={{ x: 0 }}
            className="profile-section"
          >
            <h2>Personal Information</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  value={userInfo.name}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, name: e.target.value })
                  }
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={userInfo.email}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, email: e.target.value })
                  }
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                  type="tel"
                  id="phone"
                  value={userInfo.phone}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, phone: e.target.value })
                  }
                />
              </div>

              <div className="form-group">
                <label htmlFor="address">Address</label>
                <textarea
                  id="address"
                  value={userInfo.address}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, address: e.target.value })
                  }
                  rows="3"
                ></textarea>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="update-btn"
              >
                Update Profile
              </motion.button>
            </form>
          </motion.div>
        ) : (
          <motion.div
            initial={{ x: 50 }}
            animate={{ x: 0 }}
            className="orders-section"
          >
            <h2>Order History</h2>
            {state.items.length > 0 ? (
              <div className="orders-list">
                {state.items.map((item) => (
                  <div key={item.id} className="order-item">
                    <img src={item.image} alt={item.title} />
                    <div className="order-details">
                      <h3>{item.title}</h3>
                      <p>Quantity: {item.quantity}</p>
                      <p>Price: ${item.price}</p>
                      <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-orders">No orders found.</p>
            )}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

export default Profile;
