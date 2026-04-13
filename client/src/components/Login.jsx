import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { LoginForm } from "./login-form";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (data) => {
    try {
      await login(data.email, data.password);
      navigate("/dashboard");
    } catch (err) {
      alert(
        err.response?.data?.message || "Login failed. Check your credentials.",
      );
    }
  };

  return (
    // 'h-full' assumes you kept the 'App.jsx' flex-1 logic from earlier
    <div className="flex h-full w-full items-center justify-center bg-background p-6">
      <div className="w-full max-w-md">
        <LoginForm onSubmit={handleLogin} />
      </div>
    </div>
  );
};

export default Login;
