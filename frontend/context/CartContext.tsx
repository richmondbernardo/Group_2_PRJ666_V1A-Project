import React, { createContext, useState } from "react";

export interface CartItem {
  menuItem: any;
  quantity: number;
  customizations?: Record<string, string | string[]>;
  cartItemId: string;
  addOnPrice?: number;
}

export interface CartContextType {
  items: CartItem[];
  addToCart: (
    item: any,
    customizations?: Record<string, string | string[]>,
    addOnPrice?: number,
  ) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const CartContext = createContext<CartContextType>(
  {} as CartContextType,
);

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (menuItem, customizations = {}, addOnPrice = 0) => {
    setItems((prev) => [
      ...prev,
      {
        menuItem,
        quantity: 1,
        customizations,
        cartItemId: Math.random().toString(36).substr(2, 9),
        addOnPrice,
      },
    ]);
  };

  const removeFromCart = (cartItemId) => {
    setItems((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  const updateQuantity = (cartItemId, quantity) => {
    setItems((prev) =>
      prev.map((item) =>
        item.cartItemId === cartItemId
          ? { ...item, quantity: Math.max(1, quantity) }
          : item,
      ),
    );
  };

  const clearCart = () => setItems([]);

  const getTotalItems = () =>
    items.reduce((sum, item) => sum + item.quantity, 0);

  const getTotalPrice = () =>
    items.reduce(
      (sum, item) =>
        sum + (item.menuItem.price + (item.addOnPrice || 0)) * item.quantity,
      0,
    );

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalItems,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
