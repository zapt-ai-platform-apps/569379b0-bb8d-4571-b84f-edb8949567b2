import { createStore } from 'solid-js/store';

const [cartItems, setCartItems] = createStore([]);

const addToCart = (product, quantity) => {
  const existingItem = cartItems.find((item) => item.id === product.id);
  if (existingItem) {
    setCartItems(
      (item) => item.id === product.id,
      'quantity',
      (q) => q + quantity
    );
  } else {
    setCartItems([...cartItems, { ...product, quantity }]);
  }
};

const removeFromCart = (id) => {
  setCartItems(cartItems.filter((item) => item.id !== id));
};

const updateCartItemQuantity = (id, quantity) => {
  setCartItems(
    (item) => item.id === id,
    'quantity',
    quantity
  );
};

export { cartItems, addToCart, removeFromCart, updateCartItemQuantity };