"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface Order {
  id: string;
  total: number;
  status: string;
  createdAt: string;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchOrders = async () => {
      const user = auth.currentUser;
      if (!user) {
        router.push("/signin");
        return;
      }

      try {
        const q = query(collection(db, "orders"), where("userId", "==", user.uid));
        const snapshot = await getDocs(q);
        const fetchedOrders: Order[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          total: doc.data().total,
          status: doc.data().status,
          createdAt: doc.data().createdAt?.toDate().toLocaleString() || "N/A",
        }));
        setOrders(fetchedOrders);
      } catch (err: any) {
        console.error(err);
        setError("Failed to load orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [router]);

  if (loading) return <p className="text-center py-16">Loading your orders...</p>;
  if (error) return <p className="text-center text-red-600 py-16">{error}</p>;

  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <h1 className="text-3xl font-bold mb-8 text-center">My Orders</h1>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500">You haven’t placed any orders yet.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="border rounded-lg p-4 shadow-sm flex justify-between items-center"
            >
              <div>
                <h2 className="font-semibold text-lg">Order #{order.id.slice(0, 6)}</h2>
                <p className="text-gray-600">Status: {order.status}</p>
                <p className="text-gray-600">Placed: {order.createdAt}</p>
                <p className="text-black font-semibold mt-2">Total: ${order.total.toFixed(2)}</p>
              </div>
              <Button
                onClick={() => router.push(`/order/${order.id}`)}
                className="bg-black text-white hover:bg-gray-800"
              >
                View Details
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
