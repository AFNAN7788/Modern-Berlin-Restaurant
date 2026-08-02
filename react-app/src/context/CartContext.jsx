import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useAuth } from './AuthContext';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const { isLoggedIn } = useAuth();
  const [cart, setCart] = useState([]);
  const [pendingDish, setPendingDish] = useState(null);

  // Load cart from localStorage on mount
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      try {
        setCart(JSON.parse(storedCart));
      } catch {
        setCart([]);
      }
    }
  }, []);

  // Sync cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Load pending dish from localStorage (clickedDish flow)
  useEffect(() => {
    const stored = localStorage.getItem('clickedDish');
    if (stored) {
      try {
        setPendingDish(JSON.parse(stored));
      } catch {
        setPendingDish(null);
      }
    }
  }, []);

  // When user logs in and there's a pending dish, add it to cart
  useEffect(() => {
    if (isLoggedIn && pendingDish) {
      addToCart(pendingDish);
      localStorage.removeItem('clickedDish');
      setPendingDish(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn, pendingDish]);

  const addToCart = useCallback((dish) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === dish.id);
      if (existing) {
        return prev.map((item) =>
          item.id === dish.id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
        );
      }
      return [...prev, { ...dish, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((dishId) => {
    setCart((prev) => prev.filter((item) => item.id !== dishId));
  }, []);

  const updateQuantity = useCallback((dishId, quantity) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === dishId ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const totalAmount = cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
  const itemCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalAmount,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}