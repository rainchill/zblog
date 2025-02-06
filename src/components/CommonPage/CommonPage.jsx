import WebHeader from '@/components/WebHeader/WebHeader';
import { Layout } from 'antd';
import { config } from '@/config';

import React, { useState } from 'react';
import './CommonPage.css';


const { Header, Footer, Sider, Content } = Layout;

const CommonPage = ({ children, title }) => {
    const [current, setCurrent] = useState('mail');

    return (
        <>
            <Layout>
                <WebHeader />
                <Content>
                    <div className="common-container">
                        <div className="common-image-container">
                            <img
                                src={config.categoryBgImg}
                                style={{ width: '100%', objectFit: 'cover' }}
                            />
                            {/* 添加遮罩层 */}
                            <div className="common-overlay"></div>
                            <div className="common-text-overlay">{title}</div>
                        </div>
                    </div>
                    {/* <div className="container">
                        content
                    </div> */}
                    {children}
                </Content>
            </Layout>
        </>
    )
};
export default CommonPage;