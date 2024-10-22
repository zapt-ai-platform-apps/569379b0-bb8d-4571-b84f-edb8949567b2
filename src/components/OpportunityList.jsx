import { createSignal, onMount } from 'solid-js';
import { Show, For } from 'solid-js';

function OpportunityList() {
  const [opportunities, setOpportunities] = createSignal([]);
  const [loading, setLoading] = createSignal(false);

  const fetchOpportunities = async () => {
    setLoading(true);
    try {
      // Replace with actual API call or data fetching logic
      const mockOpportunities = [
        {
          id: 1,
          title: 'Freelance Writing',
          description: 'Earn money by writing articles, blogs, and more.',
          requirements: 'Good writing skills',
          earnings: 'Up to $50 per article',
        },
        {
          id: 2,
          title: 'Online Tutoring',
          description: 'Teach students online in subjects you are proficient in.',
          requirements: 'Expertise in a subject area',
          earnings: '$20-40 per hour',
        },
        // Add more opportunities as needed
      ];
      setOpportunities(mockOpportunities);
    } catch (error) {
      console.error('Error fetching opportunities:', error);
    } finally {
      setLoading(false);
    }
  };

  onMount(fetchOpportunities);

  const handleSave = (opportunity) => {
    // Handle saving to favorites
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (!favorites.find((fav) => fav.id === opportunity.id)) {
      favorites.push(opportunity);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      alert('Opportunity saved to favorites.');
    } else {
      alert('Opportunity is already in favorites.');
    }
  };

  return (
    <div>
      <h2 class="text-2xl font-bold mb-4 text-purple-600">Curated Opportunities</h2>
      <Show when={!loading()} fallback={<p>Loading opportunities...</p>}>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <For each={opportunities()}>
            {(opportunity) => (
              <div class="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition">
                <h3 class="text-lg font-semibold text-gray-800">{opportunity.title}</h3>
                <p class="text-gray-600 mb-2">{opportunity.description}</p>
                <p class="text-sm text-gray-500">Requirements: {opportunity.requirements}</p>
                <p class="text-sm text-gray-500 mb-2">Potential Earnings: {opportunity.earnings}</p>
                <button
                  class="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-full shadow-md cursor-pointer transition duration-300 ease-in-out transform hover:scale-105 mt-2"
                  onClick={() => handleSave(opportunity)}
                >
                  Save
                </button>
              </div>
            )}
          </For>
        </div>
      </Show>
    </div>
  );
}

export default OpportunityList;