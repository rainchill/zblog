import React from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined, HomeOutlined, FileAddOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Outlet } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom'
import { config } from '@/config';
import './Admin.css'

const { Header, Content, Sider } = Layout;
const items1 = ['1', '2', '3'].map((key) => ({
    key,
    label: `nav ${key}`,
}));
const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map((icon, index) => {
    const key = String(index + 1);
    return {
        key: `sub${key}`,
        icon: React.createElement(icon),
        label: `subnav ${key}`,
        children: new Array(4).fill(null).map((_, j) => {
            const subKey = index * 4 + j + 1;
            return {
                key: subKey,
                label: `option${subKey}`,
            };
        }),
    };
});

const nav = [{ title: '首页', icon: <HomeOutlined /> }, { title: '文章', icon: < FileAddOutlined /> }].map((item, index) => {
    return {
        key: item.title,
        icon: item.icon,
        label: item.title
    }
})
const Admin = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const navigate = useNavigate()
    const handleMenuClick = (e) => {
        // console.log('Menu item clicked:', e);
        // console.log('Key:', e.key);
        // console.log('DOM Event:', e.domEvent);
        if (e.key === '首页') {
            navigate('/admin')
        } else if (e.key === '文章') {
            navigate('/admin/article')
        }
    };
    return (
        <Layout>
            <Header
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    // backgroundColor: '#fff',
                }}
            >
                <div style={{ width: '100%', height: '100%' }} onClick={() => { navigate('/') }} className='admin-avatar'>
                    <img
                        // src="http://localhost:3000/avatar.jpg" // 替换为你的 logo 图片路径
                        src={config.avatar}
                        alt="Logo"
                        style={{
                            width: '64px', // 根据需要调整 logo 的宽度
                            height: 'auto', // 保持图片比例
                            margin: '0 16px', // 添加一些间距
                        }}
                    />
                </div>
            </Header>
            <Layout>
                <Sider
                    width={200}
                    style={{
                        background: colorBgContainer,
                    }}
                >
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        style={{
                            marginTop: '20px',
                            height: '100%',
                            borderRight: 0,
                        }}
                        items={nav}
                        onClick={handleMenuClick}
                    />
                </Sider>
                <Layout
                    style={{
                        padding: '0 6px 0 6px',
                    }}
                >
                    <Content
                        style={{
                            // padding: 24,
                            margin: 24,
                            minHeight: 280,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        {/* <div style={{ height: 800 }}> */}
                        <div>
                            <Outlet />
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
};
export default Admin;