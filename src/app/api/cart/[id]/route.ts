import { NextResponse } from "next/server";
import { db } from "@/lib/firebase-client";
import { doc, updateDoc, deleteDoc, getDoc } from "firebase/firestore";

// PUT /api/cart/:id
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { quantity } = body;

    console.log("📝 PUT /api/cart/:id called with:", { id, quantity });

    if (!quantity || quantity <= 0) {
      return NextResponse.json(
        { error: "Invalid quantity" },
        { status: 400 }
      );
    }

    const ref = doc(db, "cart", id);
    const docSnap = await getDoc(ref);
    
    if (!docSnap.exists()) {
      console.log("❌ Document not found:", id);
      return NextResponse.json(
        { error: "Cart item not found" },
        { status: 404 }
      );
    }

    await updateDoc(ref, { quantity });
    console.log("✅ Updated cart item:", id);

    return NextResponse.json({ success: true, id, quantity });
  } catch (error: any) {
    console.error("💥 Error updating cart:", error);
    return NextResponse.json(
      {
        error: "Failed to update cart",
        message: error?.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}

// DELETE /api/cart/:id
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    console.log("🗑️ DELETE /api/cart/:id called with:", id);

    const ref = doc(db, "cart", id);
    const docSnap = await getDoc(ref);

    if (!docSnap.exists()) {
      console.log("❌ Document not found:", id);
      return NextResponse.json(
        { error: "Cart item not found" },
        { status: 404 }
      );
    }

    await deleteDoc(ref);
    console.log("✅ Deleted cart item:", id);

    return NextResponse.json({ success: true, id });
  } catch (error: any) {
    console.error("💥 Error deleting cart item:", error);
    return NextResponse.json(
      {
        error: "Failed to delete item",
        message: error?.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}