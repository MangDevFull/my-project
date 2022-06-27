import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import React from 'react';
import Layout from "../component/Layout"
import { SpendingIndex } from "./spending"
const AppRoute: React.FC = () => {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/spending" element={<SpendingIndex />} />
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
