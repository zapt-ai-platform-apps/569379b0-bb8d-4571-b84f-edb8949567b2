import { For } from 'solid-js';
import { Link } from '@solidjs/router';
import products from '../data/products';

function ProductList() {
  return (
    <div>
      <h1 class="text-3xl font-bold text-purple-600 mb-8">Products</h1>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <For each={products}>
          {(product) => (
            <div class="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer">
              <Link href={`/product/${product.id}`}>
                <img
                  src={product.image}
                  alt={product.name}
                  class="w-full h-48 object-cover mb-4 rounded"
                />
                <h2 class="text-xl font-semibold text-gray-800">{product.name}</h2>
                <p class="text-gray-600">${product.price.toFixed(2)}</p>
              </Link>
            </div>
          )}
        </For>
      </div>
    </div>
  );
}

export default ProductList;