import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Shield, Lock } from "lucide-react";
import { useLocation } from "wouter";

export default function AdminLogin() {
  const { toast } = useToast();
  const [, navigate] = useLocation();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple admin check - in production, this should be properly secured
    if (credentials.username === "admin" && credentials.password === "grk2024") {
      localStorage.setItem("isAdmin", "true");
      toast({
        title: "Login Successful",
        description: "Welcome to the admin panel!",
      });
      navigate("/admin");
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid admin credentials",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="pt-20 min-h-screen flex items-center justify-center">
      <Card className="tournament-card border-gaming-orange/20 w-full max-w-md">
        <CardHeader>
          <CardTitle className="font-gaming text-2xl text-gaming-orange text-center">
            <Shield className="inline mr-2" size={24} />
            ADMIN ACCESS
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <Label className="text-gaming-cyan font-bold flex items-center">
                <Lock className="mr-2" size={16} />
                Username
              </Label>
              <Input
                value={credentials.username}
                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                placeholder="Enter admin username"
                className="bg-gaming-dark border-gaming-orange/30 text-white"
                required
              />
            </div>

            <div>
              <Label className="text-gaming-cyan font-bold flex items-center">
                <Lock className="mr-2" size={16} />
                Password
              </Label>
              <Input
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                placeholder="Enter admin password"
                className="bg-gaming-dark border-gaming-orange/30 text-white"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-gaming-orange text-white font-bold py-3 neon-orange"
            >
              <Shield className="mr-2" size={16} />
              ACCESS ADMIN PANEL
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-xs text-gray-400">
              Authorized personnel only. Unauthorized access is prohibited.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}