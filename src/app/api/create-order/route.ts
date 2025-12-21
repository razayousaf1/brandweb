// app/api/create-order/route.ts
import { NextResponse } from "next/server";
import { serverDb } from "@/lib/firebase-server"; // ✅ Use Firebase Admin SDK
import { collection, addDoc, Timestamp } from "firebase/firestore";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { items, totalPrice, customer } = body;

    if (!items || !totalPrice || !customer) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Save order to Firestore (using serverDb, i.e., Admin SDK)
    const docRef = await addDoc(collection(serverDb, "orders"), {
      items,
      totalPrice,
      customer,
      status: "pending",
      createdAt: Timestamp.now(),
    });

    return NextResponse.json({ orderId: docRef.id });
  } catch (error) {
    console.error("💥 Error creating order:", error);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}
