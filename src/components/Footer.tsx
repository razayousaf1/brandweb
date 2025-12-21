"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function Footer() {
  const [user, setUser] = useState<any>(null);

  // Listen for auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <footer className="bg-white py-12 px-6 lg:px-20 border-t border-gray-200">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Logo + Contact */}
        <div>
          <Image
            src="/logo/1.jpg"
            alt="Shahsawaar Logo"
            width={80}
            height={80}
            className="mb-4"
          />
          <h4 className="font-semibold mb-2 text-black">Contact</h4>
          <p className="text-black">
            <span className="font-bold">Phone:</span> +92 314 8812243
          </p>
          <p className="text-black">
            <span className="font-bold">Email:</span> shahsawaarofficial25@gmail.com
          </p>
        </div>

        {/* About */}
        <div>
          <h4 className="font-semibold mb-2 text-black">About</h4>
          <ul className="space-y-2 text-black">
            <li><Link href="/about" className="hover:text-yellow-600">About us</Link></li>
            <li><Link href="/privacy-policy" className="hover:text-yellow-600">Privacy Policy</Link></li>
            <li><Link href="/returns-exchange" className="hover:text-yellow-600">Returns & Exchange</Link></li>
            <li><Link href="/shipping-policy" className="hover:text-yellow-600">Shipping Policy</Link></li>
            <li><Link href="/terms" className="hover:text-yellow-600">Terms & Conditions</Link></li>
            <li><Link href="/contact" className="hover:text-yellow-600">Contact us</Link></li>
          </ul>
        </div>

        {/* My Account */}
        <div>
          <h4 className="font-semibold mb-2 text-black">My Account</h4>
          <ul className="space-y-2 text-black">
            {!user && (
              <li><Link href="/signin" className="hover:text-yellow-600">Sign In</Link></li>
            )}
            <li><Link href="/wishlist" className="hover:text-yellow-600">My Wishlist</Link></li>
            <li><Link href="/cart" className="hover:text-yellow-600">My Cart</Link></li>
            <li><Link href="/track-order" className="hover:text-yellow-600">Track Order</Link></li>
            
            {user && (
              <li><Link href="/settings" className="hover:text-yellow-600">Account Settings</Link></li>
            )}
          </ul>
        </div>

        {/* Payment */}
        <div>
          <h4 className="font-semibold mb-2 text-black">Secured Payment Gateways</h4>
          <div className="flex gap-4">
            <Image src="/pay/visa.png" alt="Visa" width={40} height={20} />
            <Image src="/pay/card.png" alt="Mastercard" width={40} height={20} />
            <Image src="/pay/maestro.png" alt="Maestro" width={40} height={20} />
            <Image src="/pay/express.png" alt="Amex" width={40} height={20} />
            <Image src="/pay/union-pay.png" alt="UnionPay" width={40} height={20} />
          </div>
        </div>
      </div>
    </footer>
  );
}