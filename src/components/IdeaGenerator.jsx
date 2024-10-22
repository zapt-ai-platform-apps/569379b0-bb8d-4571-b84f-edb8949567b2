import { createSignal } from 'solid-js';
import { createEvent } from '../supabaseClient';
import { Show, For } from 'solid-js';

function IdeaGenerator() {
  const [skills, setSkills] = createSignal('');
  const [loading, setLoading] = createSignal(false);
  const [ideas, setIdeas] = createSignal([]);

  const handleGenerateIdeas = async () => {
    setLoading(true);
    try {
      const result = await createEvent('chatgpt_request', {
        prompt: `List 5 online earning opportunities suitable for someone with the following skills or interests: ${skills()}. Provide the list in JSON format with the following structure: {"ideas": [{"title": "Title", "description": "Description"}, ...]}`,
        response_type: 'json',
      });
      setIdeas(result.ideas || []);
    } catch (error) {
      console.error('Error generating ideas:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div class="mb-8">
      <h2 class="text-2xl font-bold mb-4 text-purple-600">Generate Personalized Ideas</h2>
      <div class="flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Enter your skills or interests"
          value={skills()}
          onInput={(e) => setSkills(e.target.value)}
          class="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border"
        />
        <button
          class={`px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer ${
            loading() ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          onClick={handleGenerateIdeas}
          disabled={loading()}
        >
          {loading() ? 'Generating...' : 'Generate Ideas'}
        </button>
      </div>
      <Show when={ideas().length > 0}>
        <div class="mt-6">
          <h3 class="text-xl font-bold mb-4 text-purple-600">Your Personalized Ideas</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <For each={ideas()}>
              {(idea) => (
                <div class="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer">
                  <h4 class="text-lg font-semibold text-gray-800">{idea.title}</h4>
                  <p class="text-gray-600">{idea.description}</p>
                </div>
              )}
            </For>
          </div>
        </div>
      </Show>
    </div>
  );
}

export default IdeaGenerator;