import * as React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import RoleBasedRoute from "./routing/roleBasedRoute";

import NotFoundPage from "./components/noMatch/NotFound";

import HomePage from "./components/home";
import DefaultLayout from "./components/containers/defaultLayout";

import LoginPage from "./components/authorization/login";
import RegisterPage from "./components/authorization/registration";

//admin
import ProductList from "./components/productAdmin/pages/list";
import AddProduct from "./components/productAdmin/pages/add";
import EditProduct from "./components/productAdmin/pages/edit";

//shop
import Shop from "./components/shop";
import ItemCart from "./components/shop/cart/pages";

export default () => (
  <Router>
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route index element={<HomePage />} />
        //login
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        //admin
        <Route path="/admin" element={<RoleBasedRoute />}>
          <Route path="/admin/product/list" element={<ProductList />} />
          <Route path="/admin/product/add" element={<AddProduct />} />
          <Route path="/admin/product/edit" element={<EditProduct />} />
        </Route>
        <Route path="/shop" element={<Shop />}></Route>
        <Route path="/shop/cart" element={<ItemCart />}></Route>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
    <ToastContainer pauseOnHover={false} pauseOnFocusLoss={false} />
  </Router>
);
