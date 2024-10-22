import { createSignal } from 'solid-js';
import { useNavigate } from '@solidjs/router';
import { createEvent } from '../supabaseClient';

function NewCampaign() {
  const [campaignName, setCampaignName] = createSignal('');
  const [campaignDescription, setCampaignDescription] = createSignal('');
  const [marketingChannel, setMarketingChannel] = createSignal('Email');
  const [aiPrompt, setAiPrompt] = createSignal('');
  const [generatedContent, setGeneratedContent] = createSignal('');
  const [loading, setLoading] = createSignal(false);
  const navigate = useNavigate();

  const handleGenerateContent = async () => {
    setLoading(true);
    try {
      const result = await createEvent('chatgpt_request', {
        prompt: aiPrompt(),
        response_type: 'text',
      });
      setGeneratedContent(result);
    } catch (error) {
      console.error('Error generating content:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveCampaign = () => {
    // Save the campaign to the backend or database
    // This is a placeholder. Replace with actual API call.
    console.log('Campaign saved');
    navigate('/');
  };

  return (
    <div class="h-full">
      <h1 class="text-3xl font-bold text-purple-600 mb-6">Create New Campaign</h1>
      <form class="space-y-4">
        <div>
          <label class="block mb-1 font-semibold">Campaign Name</label>
          <input
            type="text"
            class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border"
            value={campaignName()}
            onInput={(e) => setCampaignName(e.target.value)}
            required
          />
        </div>
        <div>
          <label class="block mb-1 font-semibold">Description</label>
          <textarea
            class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border"
            value={campaignDescription()}
            onInput={(e) => setCampaignDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label class="block mb-1 font-semibold">Marketing Channel</label>
          <select
            class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent cursor-pointer"
            value={marketingChannel()}
            onChange={(e) => setMarketingChannel(e.target.value)}
          >
            <option>Email</option>
            <option>Social Media</option>
            <option>Ads</option>
          </select>
        </div>
        <div>
          <label class="block mb-1 font-semibold">AI Prompt for Content Generation</label>
          <textarea
            class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border"
            value={aiPrompt()}
            onInput={(e) => setAiPrompt(e.target.value)}
          />
        </div>
        <button
          type="button"
          class={`w-full px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer ${
            loading() ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          onClick={handleGenerateContent}
          disabled={loading()}
        >
          {loading() ? 'Generating Content...' : 'Generate Content'}
        </button>
        {generatedContent() && (
          <div>
            <label class="block mb-1 font-semibold">Generated Content</label>
            <textarea
              class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border"
              value={generatedContent()}
              onInput={(e) => setGeneratedContent(e.target.value)}
            />
          </div>
        )}
        <button
          type="button"
          class="w-full px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
          onClick={handleSaveCampaign}
        >
          Save Campaign
        </button>
      </form>
    </div>
  );
}

export default NewCampaign;