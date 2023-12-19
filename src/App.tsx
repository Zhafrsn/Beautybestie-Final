import React from 'react';
import './styles/Global.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
// import {DetailProduct} from 'pages';
import WishlistPage from './pages/Wishlist';
import { Cart } from './pages/Cart';
import { Login } from './components/Login/Login';
import { Register } from './components/Register/Register';
import AboutUs from './pages/AboutUs';
import _404 from './pages/_404';
import Profile from './pages/Profile';
import History from './pages/History';
import { ChatPage } from 'components/Chat/ChatPage';
import Address from './pages/Address'
import { NotPaid } from 'pages/Order/NotPaidPage';
import { BeingPackaged } from 'pages/Order/BeingPackagedPage';
import { Sent } from 'pages/Order/SentPage';
import { Products } from 'pages/Products';
import { Checkout, DetailProduct } from 'pages';
import { Notification } from 'pages/Notification';
// Admin
// import { LoginAdmin } from 'pages/Admin/Login';
// import { Dashboard } from 'pages/Admin/Dashboard';
// import User from 'pages/Admin/User';
// import Customer from 'pages/Admin/Customer';
// import Productlist from 'pages/Admin/Productlist';
// import Transaction from 'pages/Admin/Transaction';
// import Reports from 'pages/Admin/Reports';

export const App: React.FC = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:category" element={<Products />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/*" element={<_404/> } />
          <Route path="/aboutUs" element={<AboutUs />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/history" element={<History />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/chat' element={<ChatPage />} />
          <Route path="/address" element={<Address />} />
          <Route path="/product-detail/:id" element={<DetailProduct />} />
          <Route path='/order' element={<NotPaid/>}/>
          <Route path='/order/being-packaged' element={<BeingPackaged/>}/>
          <Route path='/order/sent' element={<Sent/>}/>
          <Route path='/notification' element={<Notification/>}/>
          {/* Route Admin */}
          {/* <Route path='/Admin' element={<LoginAdmin/>}/>
          <Route path='/Dashboard' element={<Dashboard/>}/>
          <Route path='/admin/users' element={<User/>}/>
          <Route path='/admin/customers' element={<Customer />} />
          <Route path='/admin/productlist' element={<Productlist />} />
          <Route path='/admin/transactions' element={<Transaction />} />
          <Route path='/admin/reports' element={<Reports />} /> */}
        </Routes>
      </Router>
    </>
  );
};
