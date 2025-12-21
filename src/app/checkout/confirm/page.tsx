"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { sendSignInLinkToEmail } from "firebase/auth";
import { Button } from "@/components/ui/button";
import { CheckCircle, Mail, Package } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function OrderConfirmationPage() {
  const router = useRouter();
  const [guestEmail, setGuestEmail] = useState("");
  const [showAccountPrompt, setShowAccountPrompt] = useState(false);
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  const [accountEmailSent, setAccountEmailSent] = useState(false);
  const user = auth.currentUser;

  useEffect(() => {
    // Check if this was a guest order
    const storedEmail = localStorage.getItem("guestEmail");
    if (!user && storedEmail) {
      setGuestEmail(storedEmail);
      setShowAccountPrompt(true);
    }
  }, [user]);

  const handleCreateAccount = async () => {
    if (!guestEmail) return;

    setIsCreatingAccount(true);

    try {
      const actionCodeSettings = {
        url: `${window.location.origin}/signin`,
        handleCodeInApp: true,
      };

      await sendSignInLinkToEmail(auth, guestEmail, actionCodeSettings);
      localStorage.setItem("emailForSignIn", guestEmail);
      
      setAccountEmailSent(true);
    } catch (error) {
      console.error("Error sending account creation email:", error);
      alert("Failed to send account creation link. Please try again.");
    } finally {
      setIsCreatingAccount(false);
    }
  };

  const handleSkip = () => {
    // Clean up guest data
    localStorage.removeItem("guestOrderId");
    localStorage.removeItem("guestEmail");
    router.push("/");
  };

  // Account creation email sent confirmation
  if (accountEmailSent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
                <Mail className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <CardTitle>Check Your Email</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-gray-600">
              We've sent an account creation link to <strong>{guestEmail}</strong>
            </p>
            <p className="text-sm text-gray-500">
              Click the link to create your account and track your order.
            </p>
            <Button 
              onClick={() => router.push("/")}
              className="w-full bg-black text-white hover:bg-gray-800"
            >
              Continue Shopping
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-2xl space-y-6">
        {/* Order Success Card */}
        <Card>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
            </div>
            <CardTitle className="text-2xl">Order Confirmed!</CardTitle>
            <p className="text-gray-600">
              Thank you for your order. We'll send you a confirmation email shortly.
            </p>
          </CardHeader>
          <CardContent className="text-center">
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <Package className="h-8 w-8 mx-auto mb-2 text-gray-600" />
              <p className="text-sm text-gray-600">
                Your order is being processed and will be shipped soon.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Create Account Prompt for Guests */}
        {showAccountPrompt && (
          <Card className="border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="text-xl text-center">
                Track Your Order
              </CardTitle>
              <p className="text-sm text-gray-600 text-center">
                Create an account to easily track your order and save your preferences for faster checkout next time.
              </p>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                onClick={handleCreateAccount}
                disabled={isCreatingAccount}
                className="w-full bg-black text-white hover:bg-gray-800"
              >
                {isCreatingAccount ? "Sending..." : "Create Account"}
              </Button>
              
              <Button 
                onClick={handleSkip}
                variant="outline"
                className="w-full"
              >
                Skip for Now
              </Button>

              <p className="text-xs text-center text-gray-500 mt-4">
                We'll send a sign-in link to {guestEmail}
              </p>
            </CardContent>
          </Card>
        )}

        {/* Logged in user - just show continue shopping */}
        {!showAccountPrompt && (
          <div className="text-center">
            <Button 
              onClick={() => router.push("/")}
              className="bg-black text-white hover:bg-gray-800"
            >
              Continue Shopping
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}