import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";

// DELETE /api/cart/session/[sessionId]
export async function DELETE(
  req: Request,
  { params }: { params: { sessionId: string } }
) {
  try {
    const { sessionId } = await params;
    console.log("🗑️ DELETE /api/cart/session/[sessionId] called with:", sessionId);

    if (!sessionId) {
      console.log("❌ Missing sessionId");
      return NextResponse.json({ error: "Missing sessionId" }, { status: 400 });
    }

    const snapshot = await adminDb
      .collection("cart")
      .where("sessionId", "==", sessionId)
      .get();

    console.log("🗑️ Found", snapshot.docs.length, "items to delete");

    if (snapshot.empty) {
      console.log("✅ No items to delete");
      return NextResponse.json({ success: true, deleted: 0 });
    }

    const deletePromises = snapshot.docs.map((doc) => {
      console.log("🗑️ Deleting item:", doc.id);
      return doc.ref.delete();
    });

    await Promise.all(deletePromises);

    console.log("✅ Successfully deleted", snapshot.docs.length, "items");
    return NextResponse.json({ success: true, deleted: snapshot.docs.length });
  } catch (error: any) {
    console.error("💥 Error clearing cart:", error);
    return NextResponse.json(
      {
        error: "Failed to clear cart",
        details: error.message,
      },
      { status: 500 }
    );
  }
}