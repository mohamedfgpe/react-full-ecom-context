import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Cart from "./components/Cart/Cart";
import Products from "./components/Products/Products";
import Register from "./components/Register/Register";
import LogIn from "./components/LogIn/LogIn";
import NotFound from "./components/NotFound/NotFound";
import Categories from "./components/Categories/Categories";
import Layout from './components/Layout/Layout';
import {jwtDecode} from "jwt-decode"; // Ensure jwtDecode is imported correctly
import { useEffect, useState } from "react";
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import ProductDetails from './components/ProductDetails/ProductDetails';
import { CartContextProvider } from "./context/CartContext";
import WishList from './components/WishList/WishList';
import Brand from "./components/Brand/Brand";
import CheckOut from './components/CheckOut/CheckOut';
import AllOrders from './components/AllOrders/AllOrders';

function App() {
  const [userData, setuserData] = useState(null);

  function saveUserData() {
    const token = localStorage.getItem('userToken');
    if (token) {
      setuserData(jwtDecode(token));
    } else {
      setuserData(null);
    }
  }

  
  useEffect(() => {
    saveUserData();
  }, []); 

  function logOut() {
    setuserData(null);
    localStorage.removeItem('userToken');
  }

  const routers = createBrowserRouter([
    {
      path: "",
      element: <Layout logOut={logOut} userData={userData} />,
      children: [
        { path: "about", element: <ProtectedRoute><About /></ProtectedRoute> },
        { path: 'product-details/:id', element: <ProtectedRoute><ProductDetails /></ProtectedRoute> },
        { path: "cart", element: <ProtectedRoute><Cart /></ProtectedRoute> },
        { index: true, element: <ProtectedRoute><Home /></ProtectedRoute> },
        { path: "products", element: <ProtectedRoute><Products /></ProtectedRoute> },
        { path: "brands", element: <ProtectedRoute><Brand /></ProtectedRoute> },
        { path: "wish-list", element: <ProtectedRoute><WishList /></ProtectedRoute> },
        { path: "checkout", element: <ProtectedRoute><CheckOut /></ProtectedRoute> },
        { path: "allorders", element: userData ? <ProtectedRoute userData={userData}><AllOrders userData={userData} /></ProtectedRoute> : <NotFound /> },
        { path: "register", element: <Register /> },
        { path: "login", element: <LogIn saveUserData={saveUserData} /> },
        { path: "categories", element: <ProtectedRoute><Categories /></ProtectedRoute> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);

  return (
    <CartContextProvider>
      <RouterProvider router={routers}></RouterProvider>
    </CartContextProvider>
  );
}

export default App;
