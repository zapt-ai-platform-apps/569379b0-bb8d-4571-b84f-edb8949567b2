import { createSignal, createEffect } from 'solid-js';
import { Show, For } from 'solid-js';

function Favorites() {
  const [favorites, setFavorites] = createSignal([]);
  const [loading, setLoading] = createSignal(false);

  const fetchFavorites = () => {
    setLoading(true);
    try {
      const favs = JSON.parse(localStorage.getItem('favorites')) || [];
      setFavorites(favs);
    } catch (error) {
      console.error('Error fetching favorites:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = (id) => {
    let favs = favorites().filter((fav) => fav.id !== id);
    localStorage.setItem('favorites', JSON.stringify(favs));
    setFavorites(favs);
  };

  createEffect(fetchFavorites);

  return (
    <div class="h-full">
      <h1 class="text-3xl font-bold text-purple-600 mb-6">Your Favorites</h1>
      <Show when={!loading()} fallback={<p>Loading favorites...</p>}>
        <Show when={favorites().length > 0} fallback={<p>You have no saved opportunities.</p>}>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <For each={favorites()}>
              {(favorite) => (
                <div class="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition">
                  <h3 class="text-lg font-semibold text-gray-800">{favorite.title}</h3>
                  <p class="text-gray-600 mb-2">{favorite.description}</p>
                  <button
                    class="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-full shadow-md cursor-pointer transition duration-300 ease-in-out transform hover:scale-105 mt-2"
                    onClick={() => handleRemove(favorite.id)}
                  >
                    Remove
                  </button>
                </div>
              )}
            </For>
          </div>
        </Show>
      </Show>
    </div>
  );
}

export default Favorites;