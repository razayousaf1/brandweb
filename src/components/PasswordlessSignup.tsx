"use client";

import { useState, useEffect, Suspense } from "react";
import { 
  signInWithPopup,
  GoogleAuthProvider,
  sendSignInLinkToEmail, 
  signInWithEmailLink, 
  isSignInWithEmailLink 
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, Mail } from "lucide-react";

interface AuthFormProps {
  mode?: "signin" | "signup";
}

function PasswordlessSignupContent({ mode = "signup" }: AuthFormProps) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();

  const isSignIn = mode === "signin";
  const redirectUrl = searchParams.get('redirect') || '/';

  // Check if user is returning from email link
  useEffect(() => {
    if (isSignInWithEmailLink(auth, window.location.href)) {
      handleEmailLinkSignIn();
    }
  }, []);

  const getErrorMessage = (errorCode: string) => {
    switch (errorCode) {
      case 'auth/invalid-email':
        return "Invalid email address. Please check and try again.";
      case 'auth/user-disabled':
        return "This account has been disabled.";
      case 'auth/too-many-requests':
        return "Too many attempts. Please try again later.";
      case 'auth/network-request-failed':
        return "Network error. Please check your connection.";
      case 'auth/popup-closed-by-user':
        return "Sign-in cancelled. Please try again.";
      case 'auth/cancelled-popup-request':
        return "Only one popup allowed at a time.";
      default:
        return `Authentication failed. Please try again.`;
    }
  };

  const handleEmailLinkSignIn = async () => {
    setIsLoading(true);
    
    try {
      let emailForSignIn = localStorage.getItem("emailForSignIn");
      
      if (!emailForSignIn) {
        emailForSignIn = window.prompt("Please provide your email for confirmation");
        if (!emailForSignIn) {
          toast({
            title: "Error",
            description: "Email is required to complete sign-in",
            variant: "destructive",
          });
          return;
        }
      }

      await signInWithEmailLink(auth, emailForSignIn, window.location.href);
      localStorage.removeItem("emailForSignIn");
      
      toast({
        title: "Welcome!",
        description: "You've successfully signed in.",
      });

      router.push(redirectUrl);
      
    } catch (error: any) {
      console.error("Error signing in with email link:", error);
      toast({
        title: "Error",
        description: "Failed to sign in. The link may be expired or invalid.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      
      toast({
        title: "Success!",
        description: "Signed in with Google successfully.",
      });
      
      router.push(redirectUrl);
    } catch (error: any) {
      console.error("Google sign-in error:", error);
      const errorMessage = getErrorMessage(error.code);
      
      toast({
        title: "Sign-in Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailLink = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const actionCodeSettings = {
        url: typeof window !== 'undefined' ? `${window.location.origin}/signin` : 'http://localhost:3000/signin',
        handleCodeInApp: true,
      };

      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      localStorage.setItem("emailForSignIn", email);
      
      setEmailSent(true);
      toast({
        title: "Check your email!",
        description: "We sent you a sign-in link.",
      });
    } catch (error: any) {
      console.error('Email link error:', error);
      const errorMessage = getErrorMessage(error.code);
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resendEmail = () => {
    setEmailSent(false);
    handleEmailLink({ preventDefault: () => {} } as React.FormEvent);
  };

  // Email sent confirmation screen
  if (emailSent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle>Check Your Email</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
                  <Mail className="h-8 w-8 text-green-600" />
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                We've sent a sign-in link to <strong>{email}</strong>
              </p>
              <p className="text-sm text-gray-500 mb-6">
                Click the link in your email to sign in. The link expires in 1 hour.
              </p>
              <Button 
                onClick={resendEmail} 
                variant="outline"
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? "Sending..." : "Resend Email"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Main sign-in screen
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">
            {isSignIn ? "Welcome Back" : "Get Started"}
          </CardTitle>
          <p className="text-gray-600 text-sm">
            Sign in to access your account
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Google Sign-In Button */}
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={handleGoogleSignIn}
            disabled={isLoading}
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </Button>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">Or</span>
            </div>
          </div>

          {/* Email Link Form */}
          <form onSubmit={handleEmailLink} className="space-y-4">
            <div>
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
                autoComplete="email"
              />
            </div>

            <Button 
              type="submit" 
              className="w-full group"
              disabled={isLoading}
            >
              {isLoading ? (
                "Please wait..."
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <span>Continue with Email</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              )}
            </Button>
          </form>

          <p className="text-xs text-center text-gray-500 mt-4">
            We'll send you a secure link to sign in without a password
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export default function PasswordlessSignup({ mode = "signup" }: AuthFormProps) {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600">Loading...</p>
      </div>
    }>
      <PasswordlessSignupContent mode={mode} />
    </Suspense>
  );
}