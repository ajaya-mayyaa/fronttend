import { useState, useEffect } from "react";
import axios from "axios";
import prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "highlight.js/styles/github-dark.css";
import "./styles/App.css";
import CodeEditor from "./components/CodeEditor";
import CodeReview from "./components/CodeReview";
import Login from "./Login";
import Homepage from "./components/Homepage";
import AdminPage from "./components/Adminpage"; // ✅ Fixed import

function App() {
  const [code, setCode] = useState(`function sum() {\n  return 1 + 1;\n}`);
  const [review, setReview] = useState("");
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    prism.highlightAll();

    // ✅ Retrieve user from database instead of localStorage
    const fetchUser = async () => {
      try {
        const savedUser = JSON.parse(localStorage.getItem("user"));
        if (!savedUser?.email) return;

        const response = await axios.get(`https://backend-scvg.onrender.com/user/${savedUser.email}`);
        if (response.data) {
          setUser(response.data);
          localStorage.setItem("user", JSON.stringify(response.data)); // ✅ Sync with DB
        } else {
          localStorage.removeItem("user"); // ✅ Remove invalid user
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        localStorage.removeItem("user"); // ✅ Ensure no corrupted data
      }
    };

    fetchUser();
  }, []);

  async function reviewCode() {
    try {
      const response = await axios.post("https://backend-scvg.onrender.com/ai/get-review", { code });
      setReview(response.data);
    } catch (error) {
      console.error("Code Review Error:", error);
    }
  }

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    alert("Signed out successfully!");
    window.location.href = "/";  // ✅ Redirect after logout
  };

  const handleLogin = async (email, password) => {
    try {
      const response = await axios.post("https://backend-scvg.onrender.com/api/login", { email, password });
  
      if (response.data.success) {
        const { username, email, isAdmin } = response.data.user;
        const newUser = { username, email, isAdmin };
  
        setUser(newUser);
        localStorage.setItem("user", JSON.stringify(newUser));
  
        // ✅ Redirect based on role
        if (isAdmin) {
          window.location.href = "/admin"; // Redirect to AdminPage
        } else {
          window.location.href = "/user"; // Redirect to UserPage
        }
      } else {
        alert("Invalid credentials!");
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert("Login failed. Please try again.");
    }
  };
  
  const handleSignup = async (email, password, role = "user") => {
    try {
      const response = await fetch("https://backend-scvg.onrender.com/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Signup failed");

      console.log("Signup Successful:", data);

      // ✅ Store user with correct role
      const newUser = { email, role: data.role || "user" };
      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
    } catch (error) {
      console.error("Signup Error:", error.message);
    }
  };

  return (
    <main>
      {!user ? (
        showLogin ? (
          <Login setUser={setUser} handleLogin={handleLogin} handleSignup={handleSignup} />
        ) : (
          <Homepage setShowLogin={setShowLogin} />
        )
      ) : user.isAdmin ? (
        <AdminPage onLogout={handleLogout} />
      ) : (
        <>
          <button onClick={handleLogout} className="logout-btn">Sign Out</button>
          <CodeEditor code={code} setCode={setCode} reviewCode={reviewCode} />
          <CodeReview review={review} />
        </>
      )}
    </main>
  );
  
}

export default App;
