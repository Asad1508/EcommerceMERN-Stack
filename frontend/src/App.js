import './App.css';
import {BrowserRouter as Router,Route, Routes} from 'react-router-dom'
import Header from './component/layout/Header/header';
import React, { useState } from 'react';
import  store from './store';
import Footer from './component/layout/footer/footer';
import Home from './component/layout/Home/home';
import ProductDetails from './component/product/ProductDetails';
import Products from './component/product/Product';
import Search from './component/product/search';
import LoginSignUp from './component/User/loginsignup';
import { loadUser } from './actions/userActions';
import UserOptions from './component/layout/Header/userOptions';
import { useSelector } from 'react-redux';
import Profile from './component/User/Profile';
import ProtectedRoute from './component/Route/protectedRoutes';
import UpdateProfile from './component/User/updateprofile';
import UpdatePassword from './component/User/updatepassword';
import ForgotPassword from './component/User/forgotpassword';
import ResetPassword from './component/User/resetpassword';
import Cart from './component/Cart/cart'
import {Elements} from "@stripe/react-stripe-js"
import {loadStripe} from "@stripe/stripe-js";
import axios from 'axios';
import Shipping from './component/Cart/Shipping'
import ConfirmOrder from './component/Cart/ConfirmOrder'
import Payment from './component/Cart/Payment'
import OrderSuccess from './component/Cart/OrderSuccess'
import Myorders from './component/Order/myOrder'
import Orderdetails from './component/Order/orderdetails';
import Dashboard from './Admin/Dashboard'
import ProductList from './Admin/ProductList';
import Createproduct from './Admin/NewProduct'
import UpdateProduct from './Admin/UpdateProduct'
import Allorders from './Admin/OrderList'
import Updateorder from './Admin/Updateorder'
import Allusers from './Admin/usersList'
import UpdateUser from './Admin/updateUser';

function App() {
  const {isAuthenticated,user}=useSelector((state)=>state.user);
const [stripeApiKey, setStripeApiKey] = useState("");

async function getStripeApiKey() {
  const { data } = await axios.get("/api/v1/stripeapikey");

  setStripeApiKey(data.stripeApiKey);
}
  React.useEffect(()=>{
    store.dispatch(loadUser())
    getStripeApiKey()
  },[])
  return (
  <Router>
    <Header/>
    {isAuthenticated && <UserOptions user={user}/>}   
    {stripeApiKey &&(
  <Elements stripe={loadStripe(stripeApiKey)}>   
   <Routes>
    <Route exact path="/" element={<Home/>} />
    <Route exact path="/product/:id" element={<ProductDetails/>} />
  
    <Route path='/account' element={<ProtectedRoute component={Profile}/>}/>
    <Route path='/updateprofile' element={<ProtectedRoute component={UpdateProfile}/>}/>
    <Route path='/updatepassword' element={<ProtectedRoute component={UpdatePassword}/>}/>
    <Route exact path="/products/:keyword" element={<Products/>} />
    <Route exact path="/products" element={<Products/>} />
    <Route exact path="/forgotpassword" element={<ForgotPassword/>} />
    <Route exact path="/password/reset/:token" element={<ResetPassword/>} />
    <Route exact path="/search" element={<Search/>} />
    <Route exact path="/cart" element={<Cart/>} />
    <Route exact path="/login" element={<LoginSignUp/>} />
  
    <Route exact path="/login/shipping" element={<ProtectedRoute component={Shipping}/>} />   
    <Route exact path="/order/confirm" element={<ProtectedRoute component={ConfirmOrder}/>} />   
    <Route exact path="/process/payment" element={<ProtectedRoute component={Payment}/>} />   
    <Route exact path="/orders" element={<ProtectedRoute component={Myorders}/>} />   
    <Route exact path="/orderdetails/:id" element={<ProtectedRoute component={Orderdetails}/>} />   
    <Route exact path="/success" element={isAuthenticated ? <OrderSuccess /> : <LoginSignUp />} />   

    <Route exact path="/admin/dashboard" element={<ProtectedRoute isAdmin={true} component={Dashboard}/>} />   
    <Route exact path="/admin/products" element={<ProtectedRoute isAdmin={true} component={ProductList}/>} />   
    <Route exact path="/admin/product" element={<ProtectedRoute isAdmin={true} component={Createproduct}/>} />   
    <Route exact path="/admin/product/:id" element={<ProtectedRoute isAdmin={true} component={UpdateProduct}/>} /> 

    <Route exact path="/admin/orders" element={<ProtectedRoute isAdmin={true} component={Allorders}/>} />   
    <Route exact path="/admin/updateorder/:id" element={<ProtectedRoute isAdmin={true} component={Updateorder}/>} />   
   
    <Route exact path="/admin/users" element={<ProtectedRoute isAdmin={true} component={Allusers}/>} />   
    <Route exact path="/admin/updateuser/:id" element={<ProtectedRoute isAdmin={true} component={UpdateUser}/>} />   



    </Routes>
    <Footer/>
  </Elements>)} 
   
  </Router>

  );
}

export default App;
