import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  BrowserRouter as Router, Routes, Route
} from "react-router-dom";
import App from './App'
import './index.css'
import { LoginPage, SignupPage } from "./router/authen"
import LayoutAuthen from "../src/component/Authen/Layout"
import { Provider } from 'react-redux';
import store from "./redux/store"
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        {localStorage.getItem('myProjectToken') ?

          <App />

          :
          <LayoutAuthen>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
            </Routes>
          </LayoutAuthen>
        }
      </Router>
    </Provider>
  </React.StrictMode>
)
