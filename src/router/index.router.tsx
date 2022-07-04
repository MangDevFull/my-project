import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import React from 'react';
import { SpendingIndex } from "./spending"
import { LoginPage, SignupPage } from "./authen/index"
import { CategoryPage } from "./category"
import Layout from "../component/Layout/Layout"
import LayoutAuthen from "../component/Layout/LayoutAuthen"
const AppRoute: React.FC = () => {
  return (
    <>
      <Routes>
        <Route element={<LayoutAuthen />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Route>
        <Route element={<Layout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/spending" element={<SpendingIndex />} />
          <Route path="/categories" element={<CategoryPage />} />
        </Route>
      </Routes>
    </>
  )

};
function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

export default AppRoute
