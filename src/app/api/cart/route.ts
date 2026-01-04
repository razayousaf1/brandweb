import { NextResponse } from "next/server";
import { db } from "@/lib/firebase-client";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  getDoc,
  deleteDoc,
} from "firebase/firestore";

// GET /api/cart?sessionId=xxx
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get("sessionId");
    
    console.log("🔍 GET /api/cart called with sessionId:", sessionId);
    
    if (!sessionId) {
      console.log("⚠️ Missing sessionId, returning empty cart");
      return NextResponse.json([]);
    }

    const q = query(collection(db, "cart"), where("sessionId", "==", sessionId));
    const snapshot = await getDocs(q);
    
    console.log("📦 Found", snapshot.docs.length, "cart items");
    
    const items = snapshot.docs.map((docSnap) => {
      const data = docSnap.data();
      const product = data.product ? {
        id: data.product.id || data.productId,
        ...data.product
      } : null;
      
      return {
        id: docSnap.id,
        ...data,
        product,
      };
    });
    
    console.log("✅ Returning", items.length, "items");
    return NextResponse.json(items);
  } catch (error) {
    console.error("💥 Error fetching cart:", error);
    return NextResponse.json([]);
  }
}

// POST /api/cart
export async function POST(req: Request) {
  try {
    const { productId, quantity = 1, size, sessionId, product } = await req.json();
    
    console.log("➕ POST /api/cart called with:", { productId, quantity, size, sessionId });
    
    if (!productId || !sessionId) {
      console.log("❌ Missing fields");
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // Check if item already exists
    const q = query(
      collection(db, "cart"), 
      where("sessionId", "==", sessionId),
      where("productId", "==", productId),
      where("size", "==", size || null)
    );
    const existingItems = await getDocs(q);

    if (!existingItems.empty) {
      // Update existing item
      const existingItem = existingItems.docs[0];
      const currentQuantity = existingItem.data().quantity || 0;
      const newQuantity = currentQuantity + quantity;
      
      console.log("📝 Updating quantity:", currentQuantity, "→", newQuantity);
      
      await updateDoc(existingItem.ref, { quantity: newQuantity });
      
      const result = { 
        id: existingItem.id, 
        ...existingItem.data(),
        quantity: newQuantity
      };
      
      console.log("✅ Updated item");
      return NextResponse.json(result);
    } else {
      // Add new item
      const newItem = { 
        productId, 
        quantity, 
        size: size || null, 
        sessionId, 
        product: product || null,
        createdAt: Date.now() 
      };
      
      console.log("➕ Adding new item");
      
      const docRef = await addDoc(collection(db, "cart"), newItem);
      
      console.log("✅ Added item with ID:", docRef.id);
      return NextResponse.json({ id: docRef.id, ...newItem });
    }
  } catch (error: any) {
    console.error("💥 Error adding to cart:", error);
    return NextResponse.json({ 
      error: "Failed to add item",
      details: error.message 
    }, { status: 500 });
  }
}