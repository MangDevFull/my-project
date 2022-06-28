import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import React from 'react';
import Layout from "../component/Layout/index"
import { SpendingIndex } from "./spending"
import { LoginPage, SignupPage } from "./authen/index"
import { CategoryPage } from "./category"
const AppRoute: React.FC = () => {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/" element={<Home />} />
          <Route path="/spending" element={<SpendingIndex />} />
          <Route path="/categories" element={<CategoryPage />} />
        </Routes>
      </Layout>
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
