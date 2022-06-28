import React from 'react';
type Props = {
  children: React.ReactNode,
};
import '../../styles/login.scss'
const LayoutAuthen: React.FC<Props> = ({ children }) => {
  return (
    <div className="login-page">
      <div className="login-box">
        <div className="illustration-wrapper">
          <img src="https://mixkit.imgix.net/art/preview/mixkit-left-handed-man-sitting-at-a-table-writing-in-a-notebook-27-original-large.png?q=80&auto=format%2Ccompress&h=700" alt="Login" />
        </div>
        {children}
      </div>
    </div>
  )
}
export default LayoutAuthen