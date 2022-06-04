import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import 'antd/dist/antd.css';
import "../styles/layout.scss"
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  HomeOutlined,
  LogoutOutlined,
  PlusOutlined
} from '@ant-design/icons';
import { Link } from "react-router-dom"
const { Header, Sider, Content } = Layout;
interface Props {
  children: React.ReactNode
}
const App: React.FC<Props> = (props: Props) => {
  const [collapsed, setCollapsed] = useState(false);
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