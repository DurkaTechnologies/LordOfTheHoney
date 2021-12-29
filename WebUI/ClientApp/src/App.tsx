import * as React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import HomePage from "./components/home";
import DefaultLayout from "./components/containers/defaultLayout";

import LoginPage from "./components/authorization/login";
import RegisterPage from "./components/authorization/registration";

export default () => (
  <Router>
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>
    </Routes>
  </Router>
);
