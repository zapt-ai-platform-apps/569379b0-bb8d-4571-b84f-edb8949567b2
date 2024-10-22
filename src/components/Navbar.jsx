import { Link } from '@solidjs/router';

function Navbar() {
  return (
    <nav class="bg-white border-b border-gray-200">
      <div class="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" class="text-2xl font-bold text-purple-600">
          New App
        </Link>
        <div class="flex items-center space-x-6">
          <Link href="/campaigns" class="text-gray-700 hover:text-gray-900 cursor-pointer">
            Campaigns
          </Link>
          <Link href="/analytics" class="text-gray-700 hover:text-gray-900 cursor-pointer">
            Analytics
          </Link>
          <Link
            href="/create-campaign"
            class="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded cursor-pointer transition duration-300 ease-in-out transform hover:scale-105"
          >
            Create Campaign
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;