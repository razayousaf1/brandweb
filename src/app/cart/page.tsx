"use client";

import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";

export default function CartPage() {
  const { cartItems, cartCount, cartTotal, updateQuantity, removeItem, isLoading } = useCart();
  const { toast } = useToast();
  const router = useRouter();

  const handleCheckout = () => {
    const user = auth.currentUser;
    if (!user) {
      toast({ title: "Sign in required", description: "Please sign in to continue to checkout." });
      router.push("/signin");
      return;
    }
    router.push("/checkout");
  };



  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-6" />
        <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
        <p className="text-gray-500 mb-8">Add products to get started.</p>
        <Link href="/"><Button>Start Shopping</Button></Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Items */}
        <div className="lg:col-span-2 space-y-6">
          {cartItems.map((item) => item.product && (
            <Card key={item.id}>
              <CardContent className="flex items-center space-x-4">
                <Image src={item.product.image} alt={item.product.name} width={80} height={80} className="rounded-lg" />
                <div className="flex-1">
                  <h3 className="font-semibold">{item.product.name}</h3>
                  {item.size && <p>Size: {item.size}</p>}
                  <p>PKR {item.product.price} × {item.quantity} = PKR {(item.product.price * item.quantity).toFixed(2)}</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <Button onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))} variant="outline"><Minus /></Button>
                    <Input value={item.quantity} onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)} className="w-16 text-center" />
                    <Button onClick={() => updateQuantity(item.id, item.quantity + 1)} variant="outline"><Plus /></Button>
                    <Button variant="destructive" onClick={() => removeItem(item.id)}><Trash2 /></Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
            <div className="flex justify-between">Items ({cartCount}) <span>PKR {cartTotal.toFixed(2)}</span></div>
              <div className="flex justify-between">Shipping <span>PKR 200.00</span></div>
              <hr />
              <div className="flex justify-between font-bold text-lg">Total <span>PKR {(cartTotal + 200).toFixed(2)}</span></div>              
              <Button onClick={handleCheckout} className="w-full btn-primary py-4">{isLoading ? "Processing..." : "Checkout"}</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}