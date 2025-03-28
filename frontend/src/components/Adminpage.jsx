import { useState, useEffect } from "react";
import axios from "axios";
import Lottie from "lottie-react";
import "./AdminPage.css";
import leftCharacter from "../assets/leftCharacter.json";  
import rightCharacter from "../assets/rightCharacter.json"; 

const AdminPage = ({ onLogout }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("https://backend-scvg.onrender.com/api/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      setError("Failed to load users. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    setDeleting(id);
    try {
      await axios.delete(`https://backend-scvg.onrender.com/api/users/${id}`);
      setUsers(users.filter((user) => user._id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
      setError("Failed to delete user. Please try again.");
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="admin-container">
      <div className="inner-container"> {/* New Inner Container */}
        {/* Left Lottie Character */}
        <div className="lottie-left">
          <Lottie animationData={leftCharacter} loop={true} />
        </div>

        <div className="admin-content">
          <h2>Admin Dashboard</h2>
          <button onClick={onLogout} className="logout-btn">Logout</button>
          <button onClick={fetchUsers} className="refresh-btn">Refresh Users</button>

          {loading && <p className="loading-message">Loading users...</p>}
          {error && <p className="error-message">{error}</p>}

          <ul className="user-list">
            {users.length > 0 ? (
              users.map((user) => (
                <li key={user._id}>
                  <div className="user-info">
                    <strong>{user.username}</strong> - {user.email}
                  </div>
                  <button
                    onClick={() => deleteUser(user._id)}
                    disabled={deleting === user._id}
                    className="delete-btn"
                  >
                    {deleting === user._id ? "Deleting..." : "Delete"}
                  </button>
                </li>
              ))
            ) : (
              !loading && <p>No users found</p>
            )}
          </ul>
        </div>

        {/* Right Lottie Character */}
        <div className="lottie-right">
          <Lottie animationData={rightCharacter} loop={true} />
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
