import React, { useState } from 'react';
import {Layout, theme} from 'antd';
import "./index.css";
import AppMenu from "./appMenu/Index.tsx";
import {Outlet} from "react-router-dom";
import AppHeader from "../conpenments/AppHeader";
const { Header, Content, Sider } = Layout;

const App: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className="demo-logo-vertical" >电影园区后台管理系统</div>
                <AppMenu/>
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer }} >
                    <AppHeader></AppHeader>
                </Header>
                <Content style={{ margin: '0 16px' }}>
                    {/*<Breadcrumb style={{ margin: '16px 0' }}>*/}
                    {/*    <Breadcrumb.Item>User</Breadcrumb.Item>*/}
                    {/*    <Breadcrumb.Item>Bill</Breadcrumb.Item>*/}
                    {/*</Breadcrumb>*/}
                    {/*<div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>*/}
                    {/*    Bill is a cat.*/}
                    {/*</div>*/}

                    <Outlet/>

                </Content>
              </Layout>
        </Layout>
    );
};

export default App;
