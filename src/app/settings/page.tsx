"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebase";
import {
  GoogleAuthProvider,
  reauthenticateWithPopup,
  deleteUser,
  onAuthStateChanged,
} from "firebase/auth";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Trash2, User } from "lucide-react";

export default function SettingsPage() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  // Listen for auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push("/signin");
      } else {
        setUser(currentUser);
      }
    });
    return () => unsubscribe();
  }, [router]);

  // Function to get user-friendly error messages
  const getErrorMessage = (errorCode: string) => {
    switch (errorCode) {
      case 'auth/requires-recent-login':
        return "For security, please sign out and sign back in, then try deleting your account";
      case 'auth/user-not-found':
        return "User account not found";
      case 'auth/too-many-requests':
        return "Too many failed attempts. Please try again later";
      case 'auth/network-request-failed':
        return "Network error. Please check your connection and try again";
      case 'auth/popup-closed-by-user':
        return "Reauthentication cancelled. Please try again.";
      case 'auth/cancelled-popup-request':
        return "Only one popup allowed at a time.";
      default:
        return "Failed to delete account. Please try again";
    }
  };

  // Delete all user data from Firestore
  const deleteUserData = async (uid: string) => {
    try {
      const wishlistRef = collection(db, "wishlists", uid, "items");
      const wishlistSnap = await getDocs(wishlistRef);
      for (const item of wishlistSnap.docs) {
        await deleteDoc(item.ref);
      }
      await deleteDoc(doc(db, "wishlists", uid)).catch(() => {});
      await deleteDoc(doc(db, "carts", uid)).catch(() => {});
      await deleteDoc(doc(db, "users", uid)).catch(() => {});
      console.log("Firestore data deleted");
    } catch (error) {
      console.error("Firestore delete error:", error);
    }
  };

  const handleDeleteAccount = async () => {
    if (!user) return;
    setLoading(true);
    setErrorMessage("");

    try {
      const providerId = user.providerData[0]?.providerId;
      console.log("Provider ID:", providerId);
      console.log("Attempting account deletion...");

      // Reauthenticate based on provider
      if (providerId === "google.com") {
        console.log("Reauthenticating with Google...");
        const provider = new GoogleAuthProvider();
        await reauthenticateWithPopup(user, provider);
        console.log("Google reauthentication successful");
      }
      // For email link users, they don't need reauthentication with password
      // Firebase will handle this automatically or prompt if needed

      // Delete Firestore data then user
      const uid = user.uid;
      await deleteUserData(uid);
      await deleteUser(user);

      alert("Account and all data deleted successfully!");
      router.push("/");
    } catch (err: any) {
      console.error("Delete error:", err);
      console.log("Error code:", err.code);
      
      // Handle requires-recent-login error
      if (err.code === 'auth/requires-recent-login') {
        setErrorMessage("For security, please sign out and sign back in, then try deleting your account again");
        
        // Optionally, auto sign out the user
        setTimeout(() => {
          if (confirm("Would you like to sign out now? You'll need to sign back in before deleting your account.")) {
            auth.signOut();
            router.push("/signin");
          }
        }, 2000);
      } else {
        // Use the centralized error message function
        const processedErrorMessage = getErrorMessage(err.code);
        setErrorMessage(processedErrorMessage);
      }
      
      // Auto-clear error after 8 seconds
      setTimeout(() => setErrorMessage(""), 8000);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  // Get the sign-in method display name
  const getProviderName = (providerId: string) => {
    switch (providerId) {
      case "google.com":
        return "Google";
      case "password":
        return "Email & Password";
      default:
        return "Email Link";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-black mb-8">Account Settings</h1>

        <div className="space-y-6">
          {/* Account Info Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="w-5 h-5" />
                <span>Account Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-600">Email</label>
                <p className="text-lg text-black">{user.email}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Sign-in Method</label>
                <p className="text-lg text-black">
                  {getProviderName(user.providerData[0]?.providerId)}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Danger Zone Card */}
          <Card className="border-red-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-red-600">
                <AlertTriangle className="w-5 h-5" />
                <span>Danger Zone</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Error Message Display */}
              {errorMessage && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="w-5 h-5 flex-shrink-0" />
                    <span className="font-medium text-sm">{errorMessage}</span>
                  </div>
                </div>
              )}
              
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-red-900 mb-2">Delete Account</h3>
                <p className="text-sm text-red-700 mb-4">
                  Once you delete your account, there is no going back. This will permanently delete your account data, wishlist, and cart.
                </p>
                
                {user.providerData[0]?.providerId === "google.com" && (
                  <p className="text-sm text-red-600 mb-4 bg-red-100 p-3 rounded">
                    ⚠️ You'll need to reauthenticate with Google before deletion for security.
                  </p>
                )}
                
                <Button
                  onClick={async () => {
                    if (confirm("Are you sure you want to permanently delete your account? This action cannot be undone.")) {
                      await handleDeleteAccount();
                    }
                  }}
                  variant="destructive"
                  className="bg-red-600 hover:bg-red-700"
                  disabled={loading}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  {loading ? "Deleting..." : "Delete My Account"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}