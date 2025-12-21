// app/api/get-order/route.ts
import { NextResponse } from "next/server";
import { serverDb } from "@/lib/firebase-server";
import { doc, getDoc } from "firebase/firestore";

export async function GET(req: Request) {
  try {
    // Get orderId from query params
    const { searchParams } = new URL(req.url);
    const orderId = searchParams.get("orderId");

    if (!orderId) {
      return NextResponse.json({ error: "Missing orderId" }, { status: 400 });
    }

    const docRef = doc(serverDb, "orders", orderId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({ orderId, ...docSnap.data() });
  } catch (error) {
    console.error("Error fetching order:", error);
    return NextResponse.json({ error: "Failed to fetch order" }, { status: 500 });
  }
}
