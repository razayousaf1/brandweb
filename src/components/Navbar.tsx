"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCart } from "@/contexts/CartContext";
import { ShoppingBag, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

// ✅ Firebase Auth
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartCount } = useCart();

  // ✅ Track user
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // ✅ Handle logout
  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    router.push("/signin");
  };

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/rings", label: "Rings" },
    { href: "/bracelets", label: "Bracelets" },
    { href: "/pendants", label: "Pendants" },
    { href: "/crossbody-bags", label: "Crossbody Bags" },
    { href: "/pocket-watches", label: "Pocket Watches" },
    { href: "/about", label: "About" },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* 🌟 Logo + Nav links */}
          <div className="flex items-center space-x-8">
            <Link href="/" data-testid="link-home">
              <h1 className="font-serif text-2xl font-bold text-black cursor-pointer">
                Shahsawaar
              </h1>
            </Link>

            <div className="hidden md:flex space-x-3">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`nav-link font-medium transition-colors px-2 py-1 rounded ${
                    pathname === item.href
                      ? "text-black bg-black text-white"
                      : "text-gray-700 hover:text-white hover:bg-black"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* 🌟 Right side: Auth + Cart + Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* ✅ Auth Buttons */}
            {user ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="text-black hover:bg-black hover:text-white"
              >
                Logout
              </Button>
            ) : (
              <div className="hidden md:flex space-x-2">
                <Link href="/signin">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-black hover:bg-black hover:text-white"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-black hover:bg-black hover:text-white"
                  >
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}

            {/* 🛒 Cart */}
            <Link href="/cart">
              <Button
                variant="ghost"
                size="icon"
                className="relative text-black hover:bg-black hover:text-white"
              >
                <ShoppingBag className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>

            {/* 📱 Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-black hover:bg-black hover:text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* 📱 Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200">
            <div className="flex flex-col space-y-3 pt-4">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  className={`font-medium text-left transition-colors ${
                    pathname === item.href
                      ? "text-black"
                      : "text-gray-700 hover:text-black"
                  }`}
                  onClick={() => {
                    router.push(item.href);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  {item.label}
                </button>
              ))}

              {/* ✅ Auth Links (Mobile) */}
              {user ? (
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-left text-gray-700 hover:text-black font-medium"
                >
                  Logout
                </button>
              ) : (
                <>
                  <button
                    onClick={() => {
                      router.push("/signin");
                      setIsMobileMenuOpen(false);
                    }}
                    className="text-left text-gray-700 hover:text-black font-medium"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => {
                      router.push("/signup");
                      setIsMobileMenuOpen(false);
                    }}
                    className="text-left text-gray-700 hover:text-black font-medium"
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}