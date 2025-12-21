"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface WishlistContextType {
  wishlist: Product[];
  toggleWishlist: (product: Product) => void;
  isInWishlist: (id: string) => boolean;
}

const WishlistContext = createContext<WishlistContextType>({
  wishlist: [],
  toggleWishlist: () => {},
  isInWishlist: () => false,
});

export const WishlistProvider = ({ children }: { children: React.ReactNode }) => {
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [userId, setUserId] = useState<string | null>(null);

  // ✅ Track login state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserId(user.uid);
        // 🔥 Fetch wishlist whenever user logs in
        await loadWishlist(user.uid);
      } else {
        setUserId(null);
        setWishlist([]);
      }
    });
    return () => unsubscribe();
  }, []);

  // ✅ Load wishlist from Firestore
  const loadWishlist = async (uid: string) => {
    const ref = doc(db, "wishlists", uid);
    const snap = await getDoc(ref);
    if (snap.exists()) {
      const data = snap.data();
      setWishlist(data.items || []);
      console.log("✅ Wishlist loaded:", data.items);
    } else {
      console.log("⚠️ No wishlist found");
      setWishlist([]);
    }
  };

  // ✅ Save to Firestore
  const saveToFirestore = async (items: Product[]) => {
    if (!userId) return;
    const ref = doc(db, "wishlists", userId);
    await setDoc(ref, { items });
  };

  // ✅ Toggle wishlist
  const toggleWishlist = (product: Product) => {
    let updated: Product[];
    if (wishlist.some((item) => item.id === product.id)) {
      updated = wishlist.filter((item) => item.id !== product.id);
    } else {
      updated = [...wishlist, product];
    }
    setWishlist(updated);
    saveToFirestore(updated);
  };

  const isInWishlist = (id: string) => wishlist.some((item) => item.id === id);

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
