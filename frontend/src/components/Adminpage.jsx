import { useState, useEffect } from "react";
import axios from "axios";
import "./AdminPage.css";

const AdminPage = ({ onLogout }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

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

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="admin-page">
      <header className="admin-header">
        <h1>Admin Dashboard</h1>
        <div className="header-actions">
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-bar"
          />
          <button onClick={fetchUsers} className="btn btn-secondary">
            Refresh
          </button>
          <button onClick={onLogout} className="btn btn-logout">
            Logout
          </button>
        </div>
      </header>
      <div className="admin-content">
        {loading && <p className="loading">Loading users...</p>}
        {error && <p className="error">{error}</p>}

        {filteredUsers.length > 0 ? (
          <table className="user-table">
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user._id} className="fade-in">
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>
                    {!user.isAdmin && ( // Hide delete button for admin
                      <button
                        onClick={() => deleteUser(user._id)}
                        disabled={deleting === user._id}
                        className="btn btn-danger"
                      >
                        {deleting === user._id ? "Deleting..." : "Delete"}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          !loading && <p className="no-data">No users found</p>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
