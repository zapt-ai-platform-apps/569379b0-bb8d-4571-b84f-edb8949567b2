import { useParams, useNavigate } from '@solidjs/router';
import { createSignal, onMount, Show } from 'solid-js';
import { addToCart } from '../store/cartStore';
import products from '../data/products';

function ProductDetail() {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = createSignal(null);
  const [quantity, setQuantity] = createSignal(1);

  onMount(() => {
    const prod = products.find((p) => p.id === Number(params.id));
    if (prod) {
      setProduct(prod);
    } else {
      console.error('Product not found');
    }
  });

  const addToCartHandler = () => {
    addToCart(product(), Number(quantity()));
    navigate('/cart');
  };

  return (
    <Show when={product()} fallback={<div>Loading...</div>}>
      <div class="flex flex-col md:flex-row gap-8">
        <img
          src={product().image}
          alt={product().name}
          class="w-full md:w-1/2 h-auto rounded"
        />
        <div class="w-full md:w-1/2">
          <h1 class="text-3xl font-bold text-gray-800 mb-4">{product().name}</h1>
          <p class="text-xl text-purple-600 mb-4">${product().price.toFixed(2)}</p>
          <p class="text-gray-700 mb-4">{product().description}</p>
          <div class="flex items-center mb-4">
            <label for="quantity" class="mr-2">
              Quantity:
            </label>
            <input
              id="quantity"
              type="number"
              min="1"
              class="border border-gray-300 rounded px-2 py-1 box-border"
              value={quantity()}
              onInput={(e) => setQuantity(e.target.value)}
            />
          </div>
          <button
            class="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-6 rounded cursor-pointer transition duration-300 ease-in-out transform hover:scale-105"
            onClick={addToCartHandler}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </Show>
  );
}

export default ProductDetail;