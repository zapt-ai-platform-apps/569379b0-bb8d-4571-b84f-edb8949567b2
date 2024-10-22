import { createSignal } from 'solid-js';
import { useNavigate } from '@solidjs/router';
import { saveCampaign } from '../store/campaignStore';

function CreateCampaign() {
  const navigate = useNavigate();
  const [campaignType, setCampaignType] = createSignal('social');
  const [name, setName] = createSignal('');
  const [message, setMessage] = createSignal('');
  const [scheduleAt, setScheduleAt] = createSignal('');
  const [loading, setLoading] = createSignal(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const campaign = {
      id: Date.now(),
      name: name(),
      type: campaignType(),
      message: message(),
      scheduleAt: scheduleAt(),
      status: scheduleAt() ? 'Scheduled' : 'Active',
    };
    await saveCampaign(campaign);
    setLoading(false);
    navigate('/campaigns');
  };

  return (
    <div>
      <h1 class="text-3xl font-bold text-purple-600 mb-8">Create Campaign</h1>
      <form onSubmit={handleSubmit} class="space-y-6">
        <div>
          <label class="block mb-2 text-gray-700">Campaign Name</label>
          <input
            type="text"
            class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border"
            value={name()}
            onInput={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label class="block mb-2 text-gray-700">Campaign Type</label>
          <select
            class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent cursor-pointer"
            value={campaignType()}
            onInput={(e) => setCampaignType(e.target.value)}
          >
            <option value="social">Social Media Post</option>
            <option value="email">Email Newsletter</option>
          </select>
        </div>
        <div>
          <label class="block mb-2 text-gray-700">Message</label>
          <textarea
            class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border"
            rows="5"
            value={message()}
            onInput={(e) => setMessage(e.target.value)}
            required
          ></textarea>
        </div>
        <div>
          <label class="block mb-2 text-gray-700">Schedule At</label>
          <input
            type="datetime-local"
            class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border"
            value={scheduleAt()}
            onInput={(e) => setScheduleAt(e.target.value)}
          />
        </div>
        <button
          type="submit"
          class={`bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 px-6 rounded-lg w-full cursor-pointer transition duration-300 ease-in-out transform hover:scale-105 ${
            loading() ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={loading()}
        >
          {loading() ? 'Saving...' : 'Save Campaign'}
        </button>
      </form>
    </div>
  );
}

export default CreateCampaign;