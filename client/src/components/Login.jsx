import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  // 1. Local state for form inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login } = useAuth(); // Grab the login function from our "Brain"
  const navigate = useNavigate(); // The tool to move the user after success

  const handleSubmit = async (e) => {
    e.preventDefault(); // Stop the page from refreshing
    setError("");

    try {
      // 2. Call the login function from AuthContext
      await login(email, password);

      // 3. If successful, send them to the Dashboard
      navigate("/dashboard");
    } catch (err) {
      // 4. If Axios caught an error (e.g., 401 Unauthorized),
      // the Promise.reject() we wrote sends it here!
      setError(
        err.response?.data?.message || "Login failed. Check your credentials.",
      );
    }
  };

  return (
    <div className="login-container">
      <h2>Login to Your Account</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
