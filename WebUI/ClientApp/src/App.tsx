import * as React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import HomePage from "./components/home";
import DefaultLayout from "./components/containers/defaultLayout";

import LoginPage from "./components/authorization/login";
import RegisterPage from "./components/authorization/registration";

import ProductList from "./components/productAdmin/pages/list";

import RoleBasedRoute from "./routing/roleBasedRoute";

export default () => (
  <Router>
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route index element={<HomePage />} />
        //login
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        //admin
        <Route path="/admin/product/list" element={<RoleBasedRoute />}>
          <Route path="/admin/product/list" element={<ProductList />} />
        </Route>
      </Route>
    </Routes>
    <ToastContainer pauseOnHover={false} pauseOnFocusLoss={false} />
  </Router>
);
