import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, Zap, Lock } from "lucide-react";
import React from "react";

const Home = () => {
  return (
    <div className=" home-hero h-full flex flex-col items-center justify-between px-6 py-8">
      <div className="hidden md:block flex-1" />

      {/* Center: Hero Section */}
      <div className="flex flex-col items-center max-w-2xl text-center shrink-0">
        <div className="space-y-3">
          {/* We use smaller responsive text to prevent massive height jumps */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.1]">
            Secure Auth, <br className="hidden sm:block" /> Simplified.
          </h1>
          <p className="max-w-[26rem] mx-auto text-sm text-muted-foreground leading-relaxed">
            A seamless way to manage your user identity. Top-tier security with
            a minimalist design.
          </p>
        </div>

        <div className="flex gap-3 mt-6">
          <Button asChild className="h-9 px-6 shadow-sm">
            <Link to="/register">Get Started</Link>
          </Button>
          <Button asChild variant="outline" className="h-9 px-6">
            <Link to="/login">Log In</Link>
          </Button>
        </div>
      </div>

      {/* Bottom: Features anchored to the bottom */}
      <div className="flex-1 flex flex-col justify-end w-full max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full mt-8">
          <FeatureItem
            icon={<Shield />}
            title="Secure"
            desc="Encrypted data."
          />
          <FeatureItem icon={<Zap />} title="Fast" desc="Instant response." />
          <FeatureItem
            icon={<Lock />}
            title="Private"
            desc="You're in control."
          />
        </div>
      </div>
    </div>
  );
};

const FeatureItem = ({ icon, title, desc }) => (
  <div className="flex items-center gap-3 p-3 bg-card rounded-lg border shadow-sm">
    <div className="p-1.5 bg-primary/10 text-primary rounded-md shrink-0">
      {/* Clone icon to force size */}
      {React.cloneElement(icon, { className: "h-4 w-4" })}
    </div>
    <div className="min-w-0">
      <h3 className="font-bold text-[10px] uppercase tracking-widest opacity-70">
        {title}
      </h3>
      <p className="text-muted-foreground text-[11px] leading-tight truncate">
        {desc}
      </p>
    </div>
  </div>
);

export default Home;
