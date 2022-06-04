import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
} from "react-router-dom";
import React from 'react';
import Layout from "../component/Layout"
import {SpendingIndex} from "./spending"
const AppRoute: React.FC = () => {
  return (
    <>
        <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/spending" element={<SpendingIndex />} />
          </Routes>
          </Layout>
        </Router>
 
    </>
  );
};
function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

function About() {
  return (
    <div>
      <h2>About</h2>
    </div>
  );
}

function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
    </div>
  );
}

export default AppRoute
