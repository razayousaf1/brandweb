"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { CartItem, Product } from "@shared/schema";

type CartItemWithProduct = CartItem & { product: Product };

interface CartContextType {
  cartItems: CartItemWithProduct[];
  cartCount: number;
  cartTotal: number;
  addToCart: (product: Product, quantity?: number, size?: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  isLoading: boolean;
  cartReady: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    let id = localStorage.getItem("cart_session_id");
    if (!id) {
      id =
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);
      localStorage.setItem("cart_session_id", id);
    }
    setSessionId(id);
  }, []);

  const { data = [], isLoading } = useQuery<CartItemWithProduct[]>({
    queryKey: ["/api/cart", sessionId],
    enabled: !!sessionId,
    queryFn: async () =>
      apiRequest("GET", `/api/cart?sessionId=${sessionId}`),
  });

  const cartItems = data;

  const cartCount = useMemo(
    () => cartItems.reduce((sum, i) => sum + i.quantity, 0),
    [cartItems]
  );

  const cartTotal = useMemo(
    () =>
      cartItems.reduce(
        (sum, i) => sum + Number(i.product.price) * i.quantity,
        0
      ),
    [cartItems]
  );

  const addToCartMutation = useMutation({
    mutationFn: async ({
      productId,
      quantity,
      size,
      product,
    }: {
      productId: string;
      quantity: number;
      size?: string;
      product: Product;
    }) =>
      apiRequest("POST", "/api/cart", {
        productId,
        quantity,
        size,
        sessionId,
        product,
      }),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["/api/cart", sessionId] }),
  });

  const updateQuantityMutation = useMutation({
    mutationFn: async ({ id, quantity }: { id: string; quantity: number }) =>
      apiRequest("PUT", `/api/cart/${id}`, { quantity }),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["/api/cart", sessionId] }),
  });

  const removeItemMutation = useMutation({
    mutationFn: async (id: string) => {
      if (!sessionId) throw new Error("No session ID");
      return apiRequest("DELETE", `/api/cart/${id}?sessionId=${sessionId}`);
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["/api/cart", sessionId] }),
  });

  const clearCartMutation = useMutation({
    mutationFn: async () =>
      apiRequest("DELETE", `/api/cart/session/${sessionId}`),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["/api/cart", sessionId] }),
  });

  const addToCart = useCallback(
    (product: Product, quantity = 1, size?: string) => {
      if (!sessionId) return;
      addToCartMutation.mutate({
        productId: product.id,
        quantity,
        size,
        product,
      });
    },
    [addToCartMutation, sessionId]
  );

  const updateQuantity = useCallback(
    (id: string, quantity: number) =>
      updateQuantityMutation.mutate({ id, quantity }),
    [updateQuantityMutation]
  );

  const removeItem = useCallback(
    (id: string) => {
      if (!sessionId) return;
      removeItemMutation.mutate(id);
    },
    [removeItemMutation, sessionId]
  );

  const clearCart = useCallback(
    () => clearCartMutation.mutate(),
    [clearCartMutation]
  );

  const value = useMemo(
    () => ({
      cartItems,
      cartCount,
      cartTotal,
      addToCart,
      updateQuantity,
      removeItem,
      clearCart,
      isLoading,
      cartReady: !!sessionId && !isLoading,
    }),
    [
      cartItems,
      cartCount,
      cartTotal,
      addToCart,
      updateQuantity,
      removeItem,
      clearCart,
      isLoading,
      sessionId,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
