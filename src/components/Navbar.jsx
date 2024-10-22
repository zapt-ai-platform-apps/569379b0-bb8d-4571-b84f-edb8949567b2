import { Link } from '@solidjs/router';
import { Show } from 'solid-js';
import { cartItems } from '../store/cartStore';

function Navbar() {
  const cartItemsCount = () => cartItems.length;

  return (
    <nav class="bg-white border-b border-gray-200">
      <div class="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" class="text-2xl font-bold text-purple-600">
          New App
        </Link>
        <div class="flex items-center space-x-6">
          <Link href="/cart" class="relative">
            <svg
              class="w-6 h-6 text-gray-700 hover:text-gray-900 cursor-pointer"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.2 6M17 13l1.2 6M6 19h12"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
              ></path>
            </svg>
            <Show when={cartItemsCount() > 0}>
              <span class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
                {cartItemsCount()}
              </span>
            </Show>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;