import React, { useState, useEffect, useCallback } from 'react';
import { Layout, Menu, Avatar, Dropdown } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import "../../styles/layout.scss"
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  HomeOutlined,
  LogoutOutlined,
  PlusOutlined,
  PicCenterOutlined
} from '@ant-design/icons';
import { Link, useNavigate, Outlet } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux';
import { selectorAccount } from "../../redux/selectors"
import { Add_Infor_Account_Action } from "../../redux/actions/account.action"
import API from "../../contants/API"
const { Header, Sider, Content } = Layout;
// interface Props {
//   children: React.ReactNode
// }
const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const account = useSelector(selectorAccount)
  console.log("Account: ", account)
  let navigate = useNavigate();
  const dispatch = useDispatch()
  const getInfro = async (): Promise<any> => {
   
      const response = await API.getMe()
      console.log("resss", response)
      // if (response.status === 401) {
      //   navigate(`/login`, { replace: true });
      // }
      // const { data } = response
      // if (data.status === 200) {
      //   dispatch(Add_Infor_Account_Action({
      //     accountInfor: data.data,
      //     userId: data.data._id,
      //   }))
      // } else if (data.status === 401) {
      //   navigate(`/login`);
      // }
  }
  useEffect(() => {
    getInfro()
  }, [])

  const hanldeLogout = useCallback(() => {
    localStorage.removeItem('myProjectToken')
    localStorage.removeItem('myProjectuserId')
    navigate(`../login`, { replace: true });
  }, [])

  const menu = (
    <Menu
      className="p-1"
      items={[
        {
          key: '1',
          label: (
            <a className="hanlde">
              Account
            </a>
          ),
        },
        {
          key: '2',
          label: (
            <a
              onClick={hanldeLogout}
              className="handle">Log out</a>
          ),
        },
      ]}
    />
  );
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed} breakpoint="lg">
        <div className="logo" >
        </div>
        <Menu
          theme="dark"
          mode="inline"
        >
          <Menu.Item key="/">
            <Link to="/">
              <HomeOutlined /> <span style={{ marginTop: "20px" }}>Home</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="/spending">
            <Link to="/spending">
              <LogoutOutlined /> <span style={{ marginTop: "20px" }}>Spending</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="/income">
            <Link to="/income">
              <PlusOutlined /> <span style={{ marginTop: "20px" }}>Income</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="/categories">
            <Link to="/categories">
              <PicCenterOutlined /> <span style={{ marginTop: "20px" }}>Category</span>
            </Link>
          </Menu.Item>

        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ paddingLeft: 10 }}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed),
          })}
          <div style={{ float: 'right' }}>
            <Dropdown overlay={menu} placement="bottom" arrow>
              {account?.accountInfor?.profile.avatar ? <Avatar className="handle" src={account.accountInfor.profile.avatar} /> : <Avatar size={40} icon={<UserOutlined />} />}
            </Dropdown>
          </div>
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;