import { useTheme } from "../hooks/useTheme";
import { Button } from "@/components/ui/button";
import { Moon, Sun, ShieldCheck } from "lucide-react"; // Added ShieldCheck as a placeholder logo
import { Link } from "react-router-dom"; // Essential for the routing link

export function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="flex items-center justify-between px-6 py-2 border-b bg-background text-foreground shrink-0">
      {/* Logo Area */}
      <Link
        to="/"
        className="flex items-center gap-2 transition-opacity hover:opacity-80"
      >
        <ShieldCheck className="h-6 w-6 text-primary" />
        <span className="font-bold text-xl tracking-tight">
          Secure Authentication
        </span>
      </Link>

      {/* Theme Toggle */}
      <Button variant="ghost" size="icon" onClick={toggleTheme}>
        {theme === "light" ? (
          <Moon className="h-5 w-5" />
        ) : (
          <Sun className="h-5 w-5" />
        )}
      </Button>
    </nav>
  );
}
