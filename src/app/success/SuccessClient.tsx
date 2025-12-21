import { Suspense } from "react";
import SuccessClient from "./SuccessClient";


import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";

export default function SuccessClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get("orderId");
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!orderId) return;
      const docRef = doc(db, "orders", orderId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setOrder({ id: docSnap.id, ...docSnap.data() });
      }
    };
    fetchOrder();
  }, [orderId]);

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading order...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-4xl font-bold mb-4 text-green-600">
        Payment Successful 🎉
      </h1>

      <p className="text-gray-600 mb-6">
        Thank you for your purchase, {order.customer.name}!  
        Your order has been placed successfully.
      </p>

      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg mb-6">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

        {order.items.map((item: any, idx: number) => (
          <div key={idx} className="flex justify-between border-b py-2">
            <span>
              {item.product.name} × {item.quantity}
            </span>
            <span>
              ${(item.product.price * item.quantity).toFixed(2)}
            </span>
          </div>
        ))}

        <div className="flex justify-between font-bold mt-4">
          <span>Total:</span>
          <span>${order.total.toFixed(2)}</span>
        </div>
      </div>

      <Button
        onClick={() => router.push("/")}
        className="bg-black text-white hover:bg-gray-800"
      >
        Continue Shopping
      </Button>
    </div>
  );
}
