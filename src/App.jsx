import { Routes, Route } from '@solidjs/router';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';

function App() {
  return (
    <div class="min-h-screen bg-gray-100">
      <Navbar />
      <div class="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" component={ProductList} />
          <Route path="/product/:id" component={ProductDetail} />
          <Route path="/cart" component={Cart} />
        </Routes>
      </div>
    </div>
  );
}

export default App;