import React from 'react';
import { Outlet } from "react-router-dom"
type Props = {
  children: React.ReactNode,
};
import '../../styles/login.scss'
const LayoutAuthen: React.FC = () => {
  return (
    <div className="login-page">
      <div className="login-box">
        <div className="illustration-wrapper">
          <img src="https://mixkit.imgix.net/art/preview/mixkit-left-handed-man-sitting-at-a-table-writing-in-a-notebook-27-original-large.png?q=80&auto=format%2Ccompress&h=700" alt="Login" />
        </div>
        <Outlet />
      </div>
    </div>
  )
}
export default LayoutAuthen