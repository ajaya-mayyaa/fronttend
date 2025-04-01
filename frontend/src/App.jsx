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
import AboutUs from "./components/AboutUs"; // Import the new AboutUs component
import AdminPage from "./components/Adminpage";

function App() {
  const [code, setCode] = useState(`function sum() {\n  return 1 + 1;\n}`);
  const [review, setReview] = useState("");
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [currentPage, setCurrentPage] = useState("homepage"); // State to track the current page

  useEffect(() => {
    prism.highlightAll();

    const fetchUser = async () => {
      try {
        const savedUser = JSON.parse(localStorage.getItem("user"));
        if (!savedUser?.email) return;

        const response = await axios.get(`https://backend-scvg.onrender.com/user/${savedUser.email}`);
        if (response.data) {
          setUser(response.data);
          localStorage.setItem("user", JSON.stringify(response.data));
        } else {
          localStorage.removeItem("user");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        localStorage.removeItem("user");
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
    setCurrentPage("homepage"); // Reset to homepage on logout
    window.location.href = "/"; // Redirect after logout
  };

  const handleLogin = async (email, password) => {
    try {
      const response = await axios.post("https://backend-scvg.onrender.com/api/login", { email, password });
      if (response.data.success) {
        const { username, email, isAdmin } = response.data.user;
        const newUser = { username, email, isAdmin };
        setUser(newUser);
        localStorage.setItem("user", JSON.stringify(newUser));
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
      const newUser = { email, role: data.role || "user" };
      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
    } catch (error) {
      console.error("Signup Error:", error.message);
    }
  };

  const showAboutUs = () => {
    console.log("Navigating to AboutUs");
    setCurrentPage("about");
  };

  const showHomepage = () => {
    console.log("Navigating to Homepage");
    setCurrentPage("homepage");
  };

  return (
    <div className="app-container">
      <main>
        {!user ? (
          showLogin ? (
            <Login setUser={setUser} handleLogin={handleLogin} handleSignup={handleSignup} />
          ) : currentPage === "homepage" ? (
            <Homepage
              setShowLogin={setShowLogin}
              user={user}
              handleLogout={handleLogout}
              showAboutUs={showAboutUs}
            />
          ) : (
            <AboutUs onBack={showHomepage} />
          )
        ) : user.isAdmin ? (
          <AdminPage onLogout={handleLogout} />
        ) : (
          <>
            <nav className="navbar">
              <div className="navbar-brand">Code Reviewer App</div>
              <div className="navbar-links">
                <button onClick={handleLogout} className="navbar-btn signout-btn">
                  Sign Out
                </button>
              </div>
            </nav>
            <div className="content">
              <CodeEditor code={code} setCode={setCode} reviewCode={reviewCode} />
              <CodeReview review={review} />
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default App;