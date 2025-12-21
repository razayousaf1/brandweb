import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";

// GET /api/cart?sessionId=xxx
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get("sessionId");
    
    console.log("🔍 GET /api/cart called with sessionId:", sessionId);
    
    // Return empty cart instead of error for missing sessionId
    if (!sessionId) {
      console.log("⚠️ Missing sessionId, returning empty cart");
      return NextResponse.json([]);
    }

    const snapshot = await adminDb
      .collection("cart")
      .where("sessionId", "==", sessionId)
      .get();
    
    console.log("📦 Found", snapshot.docs.length, "cart items in Firestore");
    
    const items = snapshot.docs.map((doc) => {
      const data = doc.data();
      console.log("📦 Processing cart item:", { id: doc.id, ...data });
      
      // The product data is already embedded in the cart item
      const product = data.product ? {
        id: data.product.id || data.productId,
        ...data.product
      } : null;
      
      if (product) {
        console.log("✅ Product found embedded:", product.name);
      } else {
        console.log("❌ No product data embedded for:", data.productId);
      }
      
      const item = {
        id: doc.id,
        ...data,
        product, // use the embedded product data
      };
      
      console.log("📦 Final cart item:", item);
      return item;
    });
    
    console.log("✅ Returning", items.length, "items");
    return NextResponse.json(items);
  } catch (error) {
    console.error("💥 Error fetching cart:", error);
    // Return empty cart instead of error for better UX
    return NextResponse.json([]);
  }
}

// POST /api/cart
export async function POST(req: Request) {
  try {
    const { productId, quantity = 1, size, sessionId, product } = await req.json();
    
    console.log("➕ POST /api/cart called with:", { productId, quantity, size, sessionId, hasProduct: !!product });
    
    if (!productId || !sessionId) {
      console.log("❌ Missing fields:", { productId: !!productId, sessionId: !!sessionId });
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // Check if item already exists in cart
    const existingItems = await adminDb
      .collection("cart")
      .where("sessionId", "==", sessionId)
      .where("productId", "==", productId)
      .where("size", "==", size || null)
      .get();

    console.log("🔍 Found", existingItems.docs.length, "existing items");

    if (!existingItems.empty) {
      // Update existing item quantity
      const existingItem = existingItems.docs[0];
      const currentQuantity = existingItem.data().quantity || 0;
      const newQuantity = currentQuantity + quantity;
      
      console.log("📝 Updating existing item quantity:", currentQuantity, "→", newQuantity);
      
      await existingItem.ref.update({ 
        quantity: newQuantity 
      });
      
      const result = { 
        id: existingItem.id, 
        ...existingItem.data(),
        quantity: newQuantity
      };
      
      console.log("✅ Updated existing item:", result);
      return NextResponse.json(result);
    } else {
      // Add new item with embedded product data
      const newItem = { 
        productId, 
        quantity, 
        size: size || null, 
        sessionId, 
        product: product || null, // Include the full product data
        createdAt: Date.now() 
      };
      
      console.log("➕ Adding new item:", newItem);
      
      const docRef = await adminDb.collection("cart").add(newItem);
      
      const result = { id: docRef.id, ...newItem };
      console.log("✅ Added new item:", result);
      
      return NextResponse.json(result);
    }
  } catch (error) {
    console.error("💥 Error adding to cart:", error);
    return NextResponse.json({ error: "Failed to add item" }, { status: 500 });
  }
}