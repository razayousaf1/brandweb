"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "@/lib/firebase";
import { Button } from "@/components/ui/button";

export default function OrderDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      const user = auth.currentUser;
      if (!user) {
        router.push("/signin");
        return;
      }

      const ref = doc(db, "orders", id as string);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        const data = snap.data();
        // Security check: only allow user to view their own order
        if (data.userId !== user.uid) {
          alert("Unauthorized access.");
          router.push("/orders");
          return;
        }
        setOrder(data);
      }
      setLoading(false);
    };
    fetchOrder();
  }, [id, router]);

  if (loading) return <p className="text-center py-16">Loading order details...</p>;
  if (!order) return <p className="text-center text-red-600 py-16">Order not found.</p>;

  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <h1 className="text-3xl font-bold mb-4 text-center">Order #{id?.slice(0, 6)}</h1>

      <div className="bg-gray-50 p-6 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold mb-2">Shipping Info</h2>
        <p><strong>Name:</strong> {order.customer.name}</p>
        <p><strong>Phone:</strong> {order.customer.phone}</p>
        <p><strong>Address:</strong> {order.customer.address}</p>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold mb-2">Items</h2>
        {order.items.map((item: any) => (
          <div key={item.id} className="flex justify-between border-b py-2">
            <span>{item.product.name} × {item.quantity}</span>
            <span>${(item.product.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
      </div>

      <div className="bg-gray-50 p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
        <p><strong>Status:</strong> {order.status}</p>
        <p><strong>Total:</strong> ${order.total.toFixed(2)}</p>
      </div>

      <div className="mt-8 text-center">
        <Button onClick={() => router.push("/orders")} className="bg-black text-white hover:bg-gray-800">
          Back to Orders
        </Button>
      </div>
    </div>
  );
}
