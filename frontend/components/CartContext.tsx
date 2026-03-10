import React, { createContext, useContext, useState } from "react";
import type { MenuItem } from "../data/menu";

export interface CartItem {
  item: MenuItem;
  quantity: number;
  customizations?: Record<string, any>;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: MenuItem, customizations?: Record<string, any>) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: MenuItem, customizations?: Record<string, any>) => {
    setCart((prev) => {
      const existing = prev.find(
        (ci) =>
          ci.item.id === item.id &&
          JSON.stringify(ci.customizations) === JSON.stringify(customizations),
      );
      if (existing) {
        return prev.map((ci) =>
          ci.item.id === item.id &&
          JSON.stringify(ci.customizations) === JSON.stringify(customizations)
            ? { ...ci, quantity: ci.quantity + 1 }
            : ci,
        );
      }
      return [...prev, { item, quantity: 1, customizations }];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((ci) => ci.item.id !== itemId));
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
