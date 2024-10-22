import { For, Show } from 'solid-js';
import {
  cartItems,
  removeFromCart,
  updateCartItemQuantity,
} from '../store/cartStore';

function Cart() {
  const totalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const proceedToCheckout = () => {
    console.log('Proceeding to checkout');
  };

  return (
    <div>
      <h1 class="text-3xl font-bold text-purple-600 mb-8">Your Cart</h1>
      <Show when={cartItems.length > 0} fallback={<p>Your cart is empty.</p>}>
        <div class="space-y-4">
          <For each={cartItems}>
            {(item) => (
              <div class="flex items-center border-b border-gray-200 pb-4">
                <img
                  src={item.image}
                  alt={item.name}
                  class="w-24 h-24 object-cover rounded"
                />
                <div class="ml-4 flex-1">
                  <p class="text-lg font-semibold">{item.name}</p>
                  <p class="text-gray-600">${item.price.toFixed(2)}</p>
                  <div class="flex items-center mt-2">
                    <label for={`quantity-${item.id}`} class="mr-2">
                      Quantity:
                    </label>
                    <input
                      id={`quantity-${item.id}`}
                      type="number"
                      min="1"
                      class="border border-gray-300 rounded px-2 py-1 box-border w-16"
                      value={item.quantity}
                      onInput={(e) =>
                        updateCartItemQuantity(item.id, Number(e.target.value))
                      }
                    />
                  </div>
                </div>
                <button
                  class="text-red-500 hover:text-red-700 ml-4 cursor-pointer"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            )}
          </For>
          <div class="text-right mt-4">
            <p class="text-xl font-semibold">
              Total: ${totalPrice().toFixed(2)}
            </p>
          </div>
          <div class="text-right mt-4">
            <button
              class="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded cursor-pointer transition duration-300 ease-in-out transform hover:scale-105"
              onClick={proceedToCheckout}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </Show>
    </div>
  );
}

export default Cart;