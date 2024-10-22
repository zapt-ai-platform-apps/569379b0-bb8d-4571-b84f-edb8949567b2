import { Link } from '@solidjs/router';

function Navbar(props) {
  return (
    <nav class="bg-white border-b border-gray-200">
      <div class="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" class="text-2xl font-bold text-purple-600">
          New App
        </Link>
        <div class="flex items-center space-x-6">
          <button
            class="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-full shadow-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-300 ease-in-out transform hover:scale-105"
            onClick={props.onSignOut}
          >
            Sign Out
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;