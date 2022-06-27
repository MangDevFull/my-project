import React, { useState, useEffect } from 'react';
import { Layout, Menu, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import "../styles/layout.scss"
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  HomeOutlined,
  LogoutOutlined,
  PlusOutlined
} from '@ant-design/icons';
import { Link, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux';
import { selectorAccount } from "../redux/selectors"
import { Add_Infor_Account_Action } from "../redux/actions/account.action"
import API from "../contants/API"
const { Header, Sider, Content } = Layout;
interface Props {
  children: React.ReactNode
}
const App: React.FC<Props> = (props: Props) => {
  const [collapsed, setCollapsed] = useState(false);
  const account = useSelector(selectorAccount)
  let navigate = useNavigate();
  const dispatch = useDispatch()
  const getInfro = async (): Promise<any> => {
    if (account.userId === "") {
      const response = await API.getMe()
      if (response.status === 401) {
        navigate(`/login`, { replace: true });
      }
      const { data } = response
      if (data.status === 200) {
        dispatch(Add_Infor_Account_Action({
          accountInfor: data.data,
          userId: data.data._id,
        }))
      } else if (data.status === 401) {
        navigate(`/login`, { replace: true });
      }
    }
  }
  useEffect(() => {
    getInfro()
  }, [])
  console.log({ account })
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

        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ paddingLeft: 10 }}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed),
          })}
          <div style={{float: 'right'}}>
           {account?.accountInfor?.profile.avatar ? <Avatar src={account.accountInfor.profile.avatar} /> :<Avatar size={40} icon={<UserOutlined />} />}
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
          {props.children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;