import { useNavigate } from "react-router-dom";
import api from "../api/axios"; // We use the direct 'api' instance here
import { SignupForm } from "./signup-form";

const Register = () => {
  const navigate = useNavigate();

  const handleRegister = async (formData) => {
    try {
      await api.post("/register", formData);
      alert("Account created!");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <>
      <div className="flex h-full w-full items-center justify-center bg-background p-6 md:p-10">
        <div className="w-full max-w-md">
          <SignupForm onSubmit={handleRegister} />
        </div>
      </div>
    </>
  );
};

export default Register;
