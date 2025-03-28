import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import axios from "axios";
import Lottie from "lottie-react";
import animationData from "./assets/login-animation.json";
import "./styles/Login.css";

const Login = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isSignUp ? "signup" : "login";

    try {
      const response = await axios.post(`https://backend-scvg.onrender.com/api/${endpoint}`, {
        username,
        email,
        password,
      });

      if (response.data.success) {
        const user = response.data.user;
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("isAdmin", user.isAdmin); // ✅ Store admin status separately

        if (user.isAdmin) {
          alert("Admin Login Successful");
          navigate("/AdminPage");
        } else {
          alert(isSignUp ? "Sign Up Successful" : "Login Successful");
          navigate("/home");
        }
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred. Please try again.";
      alert("Error: " + errorMessage);
    }
  };

  return (
    <div className="login-container">
      <h2>{isSignUp ? "Sign Up" : "Login"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required={isSignUp}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">{isSignUp ? "Sign Up" : "Login"}</button>
      </form>
      <p onClick={() => setIsSignUp(!isSignUp)} className="toggle-link">
        {isSignUp ? "Already have an account? Login" : "Don't have an account? Sign Up"}
      </p>

      <div className="animated-character">
        <Lottie animationData={animationData} loop={true} />
      </div>
    </div>
  );
};

export default Login;
