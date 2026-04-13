import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./components/Login";
import Register from "./components/Register";
import PingButton from "./components/ping";
import { SignupForm } from "./components/signup-form";
import { Navbar } from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import Home from "./components/home";
import { Toaster } from "sonner";

const App = () => {
  const { loading } = useAuth();
  if (loading) return <div>Loading Application...</div>;

  return (
    <Router>
      <div className="h-dvh grid grid-rows-[auto_1fr] bg-background text-foreground transition-colors duration-300 overflow-hidden">
        <Navbar />
        <main className="min-h-0 w-full overflow-hidden">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/ping" element={<PingButton />} />
            <Route path="/check" element={<SignupForm />} />

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<h2>User Profile Page</h2>} />
            </Route>

            {/* If the URL doesn't match anything, send them home */}
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Routes>
        </main>
      </div>
      <Toaster position="top-center" richColors />
    </Router>
  );
};

export default App;
