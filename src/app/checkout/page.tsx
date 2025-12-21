"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/contexts/CartContext";
import { auth, db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { Button } from "@/components/ui/button";

export default function CheckoutPage() {
  const router = useRouter();
  const { cartItems, cartTotal, clearCart } = useCart();

  const shippingFee = 200;
  const finalTotal = cartTotal + shippingFee;

  const [form, setForm] = useState({
    fullName: "",
    phoneForUpdates: "",
    city: "",
    address: "",
    postalCode: "",
  });

  const [error, setError] = useState("");
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ✅ Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // Clear error when user starts typing
    if (error) setError("");
  };

  // ✅ Handle input blur to mark field as touched
  const handleBlur = (fieldName: string) => {
    setTouched({ ...touched, [fieldName]: true });
  };

  // ✅ Validate phone number format
  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^\+92\d{10}$/;
    return phoneRegex.test(phone);
  };

  // ✅ Check if field should show error
  const showFieldError = (fieldName: keyof typeof form): boolean => {
    return touched[fieldName] && !form[fieldName];
  };

  // ✅ Handle form submission
  const handleSubmit = async () => {
    if (isSubmitting) return; // Prevent double submission
    
    try {
      setIsSubmitting(true);
      const user = auth.currentUser;
      
      // Check if user is authenticated
      if (!user) {
        setError("Please sign in before checking out.");
        setTimeout(() => router.push("/signin"), 2000);
        return;
      }

      console.log("User authenticated:", user.uid);

      // Mark all required fields as touched
      setTouched({
        fullName: true,
        phoneForUpdates: true,
        city: true,
        address: true,
      });

      // Check if all required fields are filled
      if (!form.fullName || !form.phoneForUpdates || !form.city || !form.address) {
        setError("Please fill in all required fields.");
        setIsSubmitting(false);
        return;
      }

      // Validate phone number format
      if (!validatePhone(form.phoneForUpdates)) {
        setError("Phone number must be in format: +92XXXXXXXXXX (e.g., +923001234567)");
        setIsSubmitting(false);
        return;
      }

      if (cartItems.length === 0) {
        setError("Your cart is empty.");
        setIsSubmitting(false);
        return;
      }

      console.log("Submitting order...");

      // ✅ Save order in Firestore
      const orderData = {
        userId: user.uid,
        userEmail: user.email || "",
        items: cartItems.map((item) => ({
          productId: item.product.id,
          name: item.product.name,
          price: item.product.price,
          quantity: item.quantity,
          size: item.size || null,
        })),
        subtotal: cartTotal,
        shippingFee: shippingFee,
        total: finalTotal,
        shipping: {
          fullName: form.fullName,
          phoneForUpdates: form.phoneForUpdates,
          city: form.city,
          address: form.address,
          postalCode: form.postalCode || "",
          country: "Pakistan",
        },
        status: "pending",
        createdAt: serverTimestamp(),
      };

      console.log("Order data:", orderData);

      const docRef = await addDoc(collection(db, "orders"), orderData);
      console.log("Order saved with ID:", docRef.id);

      // ✅ Redirect to confirmation page FIRST
      // We redirect before clearing cart to avoid race conditions
      router.push("/checkout/confirm");
      
      // ✅ Clear cart after redirect (non-blocking)
      setTimeout(() => {
        try {
          clearCart();
          console.log("Cart clear initiated");
        } catch (cartError) {
          console.error("Cart clear error (non-blocking):", cartError);
        }
      }, 100);
    } catch (err: any) {
      console.error("Order submission error:", err);
      console.error("Error details:", {
        code: err.code,
        message: err.message,
        stack: err.stack,
      });
      
      if (err.code === "permission-denied") {
        setError("Permission denied. Please sign in again.");
      } else {
        setError(`Something went wrong: ${err.message || "Please try again."}`);
      }
      setIsSubmitting(false);
    }
  };

  // ✅ If cart is empty
  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
        <p className="text-gray-500 mb-8">
          Add some items to checkout.
        </p>
        <Button onClick={() => router.push("/")}>Continue Shopping</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16 max-w-2xl">
      <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4 text-center">
          {error}
        </div>
      )}

      {/* Customer Details Form */}
      <div className="space-y-6 mb-8">

        {/* Shipping Details Section */}
        <div className="space-y-4 pt-6 border-t">
          <h2 className="text-xl font-semibold">Shipping Details</h2>
          
          <div>
            <input
              name="fullName"
              placeholder="Full Name *"
              value={form.fullName}
              onChange={handleChange}
              onBlur={() => handleBlur("fullName")}
              className={`w-full border p-3 rounded transition-colors ${
                showFieldError("fullName")
                  ? "border-red-500 bg-red-50"
                  : "border-gray-300 focus:border-blue-500"
              }`}
            />
            {showFieldError("fullName") && (
              <p className="text-red-500 text-sm mt-1">Full name is required</p>
            )}
          </div>

          <div>
            <input
              name="phoneForUpdates"
              placeholder="Phone Number for Order Updates * (e.g., +923001234567)"
              value={form.phoneForUpdates}
              onChange={handleChange}
              onBlur={() => handleBlur("phoneForUpdates")}
              className={`w-full border p-3 rounded transition-colors ${
                showFieldError("phoneForUpdates")
                  ? "border-red-500 bg-red-50"
                  : "border-gray-300 focus:border-blue-500"
              }`}
            />
            {showFieldError("phoneForUpdates") && (
              <p className="text-red-500 text-sm mt-1">
                Phone number is required (Format: +92XXXXXXXXXX)
              </p>
            )}
          </div>

          <div>
            <input
              name="city"
              placeholder="City *"
              value={form.city}
              onChange={handleChange}
              onBlur={() => handleBlur("city")}
              className={`w-full border p-3 rounded transition-colors ${
                showFieldError("city")
                  ? "border-red-500 bg-red-50"
                  : "border-gray-300 focus:border-blue-500"
              }`}
            />
            {showFieldError("city") && (
              <p className="text-red-500 text-sm mt-1">City is required</p>
            )}
          </div>

          <div>
            <input
              name="address"
              placeholder="Complete Address *"
              value={form.address}
              onChange={handleChange}
              onBlur={() => handleBlur("address")}
              className={`w-full border p-3 rounded transition-colors ${
                showFieldError("address")
                  ? "border-red-500 bg-red-50"
                  : "border-gray-300 focus:border-blue-500"
              }`}
            />
            {showFieldError("address") && (
              <p className="text-red-500 text-sm mt-1">Address is required</p>
            )}
          </div>

          <input
            name="postalCode"
            placeholder="Postal Code (Optional)"
            value={form.postalCode}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded focus:border-blue-500"
          />
        </div>
      </div>

      {/* Order Summary */}
      <div className="bg-gray-50 p-4 rounded-lg shadow-sm mb-8">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex justify-between border-b py-2"
          >
            <span>
              {item.product.name} 
              {item.size ? ` (${item.size})` : ""} × {item.quantity}
            </span>
            <span>Rs {(item.product.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        <div className="flex justify-between mt-4 pt-2">
          <span>Subtotal:</span>
          <span>Rs {cartTotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between py-2">
          <span>Shipping Fee:</span>
          <span>Rs {shippingFee.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-bold text-lg border-t pt-2">
          <span>Total:</span>
          <span>Rs {finalTotal.toFixed(2)}</span>
        </div>
      </div>

      {/* Place Order Button */}
      <Button
        onClick={handleSubmit}
        disabled={isSubmitting}
        className="w-full bg-black text-white hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Processing..." : "Place Order"}
      </Button>
    </div>
  );
}