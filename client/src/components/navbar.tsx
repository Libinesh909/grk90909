import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Gamepad2, Menu, X } from "lucide-react";

export default function Navbar() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { path: "/", label: "HOME" },
    { path: "/tournaments", label: "TOURNAMENTS" },
    { path: "/payment", label: "PAYMENT" },
    { path: "/contact", label: "CONTACT US" },
  ];

  const isActive = (path: string) => location === path;

  return (
    <nav className="fixed top-0 w-full bg-gaming-purple/95 backdrop-blur-sm border-b border-gaming-green/20 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gaming-green rounded-lg flex items-center justify-center">
              <Gamepad2 className="text-gaming-dark font-bold" size={24} />
            </div>
            <span className="font-gaming text-xl font-bold glow-text">GRK</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link key={item.path} href={item.path}>
                <Button
                  variant="ghost"
                  className={`font-body font-medium transition-colors ${
                    isActive(item.path)
                      ? "text-gaming-green"
                      : "text-white hover:text-gaming-green"
                  }`}
                >
                  {item.label}
                </Button>
              </Link>
            ))}
            <Link href="/admin">
              <Button
                variant="outline"
                className="border-gaming-orange text-gaming-orange hover:bg-gaming-orange hover:text-white"
              >
                ADMIN
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-gaming-green"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gaming-green/20">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link key={item.path} href={item.path}>
                  <Button
                    variant="ghost"
                    className={`w-full justify-start font-body font-medium ${
                      isActive(item.path)
                        ? "text-gaming-green bg-gaming-green/10"
                        : "text-white hover:text-gaming-green"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Button>
                </Link>
              ))}
              <Link href="/admin">
                <Button
                  variant="outline"
                  className="w-full justify-start border-gaming-orange text-gaming-orange hover:bg-gaming-orange hover:text-white"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  ADMIN
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
