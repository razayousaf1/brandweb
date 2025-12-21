"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function CancelPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-4xl font-bold mb-4 text-red-600">Payment Cancelled ❌</h1>
      <p className="text-gray-600 mb-8">
        Your order was cancelled. If this was a mistake, you can try again.
      </p>
      <Button
        onClick={() => router.push("/cart")}
        className="bg-black text-white hover:bg-gray-800"
      >
        Back to Cart
      </Button>
    </div>
  );
}
