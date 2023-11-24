

import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Navigation from './Component/Navigation';
import OrderSearch from './Component/OrderSearch';
import SearchCategory from './Component/SearchCategory';
import DetailsByProductName from './Component/DetailsByProductName';






const Home = lazy(() => import('./Component/Home'));
const ProductList = lazy(() => import('./Features/Product/ProductList'));
const CategoryList = lazy(() => import('./Features/Category/CategoryList'));
const CartList = lazy(() => import('./Features/Cart/cartList'));
const OrderList = lazy(() => import('./Features/Order/OrderList'));
const OrderItemList = lazy(() => import ('./Features/OrderItem/orderItemList'))
const CartProduct = lazy(() => import('./Features/Product/CartProduct'));


function App() {
  return (
    <div className="App">
      <Router>
        <Navigation />
        <Suspense fallback={<div>Loading....</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Product" element={<ProductList />} />
            <Route path="/Category" element={<CategoryList />} />
            <Route path="/Cart" element={<CartList />} />
            <Route path="/Order" element={<OrderList/>} />
            <Route path="/OrderItem" element={<OrderItemList/>} />
            <Route path="/CartProduct" element={<CartProduct/>} />
            <Route path="/OrderSearch" element={<OrderSearch/>} />

            <Route path="/SearchCategory" element={<SearchCategory/>} />
            <Route path="/DetailsByProductName" element={<DetailsByProductName/>} />
           

          </Routes>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
