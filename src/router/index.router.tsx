import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
  matchRoutes, useLocation
} from "react-router-dom";
import React from 'react';
import Layout from "../component/Layout"
import { SpendingIndex } from "./spending"
import { LoginPage } from "./authen"
const AppRoute: React.FC = () => {
  console.log("s", window.location.pathname)
  return (
    <>
      {window.location.pathname !== "/login" ?
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/spending" element={<SpendingIndex />} />
            </Routes>
          </Layout>
        </Router>
        :
        <Router>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </Router>
      }
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
