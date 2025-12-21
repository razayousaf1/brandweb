import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";

// PUT /api/cart/:id
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
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

    const ref = adminDb.collection("cart").doc(id);
    const doc = await ref.get();
    
    if (!doc.exists) {
      console.log("❌ Document not found:", id);
      return NextResponse.json(
        { error: "Cart item not found" },
        { status: 404 }
      );
    }

    await ref.update({ quantity });
    console.log("✅ Updated cart item:", id);

    return NextResponse.json({ success: true, id, quantity });
  } catch (error: any) {
    console.error("💥 Error updating cart:", error);
    console.error("💥 Error message:", error?.message);
    console.error("💥 Error code:", error?.code);
    
    return NextResponse.json(
      {
        error: "Failed to update cart",
        message: error?.message || "Unknown error",
        code: error?.code,
      },
      { status: 500 }
    );
  }
}

// DELETE /api/cart/:id
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get("sessionId");

    console.log("🗑️ DELETE /api/cart/:id called with:", {
      id,
      sessionId,
      fullUrl: req.url,
    });

    const ref = adminDb.collection("cart").doc(id);
    const doc = await ref.get();

    if (!doc.exists) {
      console.log("❌ Document not found:", id);
      return NextResponse.json(
        { error: "Cart item not found" },
        { status: 404 }
      );
    }

    console.log("📄 Document exists, deleting...");
    await ref.delete();
    console.log("✅ Deleted cart item:", id);

    return NextResponse.json({ success: true, id });
  } catch (error: any) {
    console.error("💥 Error deleting cart item:", error);
    console.error("💥 Error message:", error?.message);
    console.error("💥 Error code:", error?.code);
    console.error("💥 Error stack:", error?.stack);

    return NextResponse.json(
      {
        error: "Failed to delete item",
        message: error?.message || "Unknown error",
        code: error?.code,
      },
      { status: 500 }
    );
  }
}