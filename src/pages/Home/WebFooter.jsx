import React, { useState, useEffect, useRef } from "react"
import { Layout, Col, Row, Flex, Button, Card, Pagination } from "antd"
import './Home.css'



const { Footer } = Layout;

const WebFooter = ({ img }) => {
    const footerStyle = {
        marginTop: '20px',
        height: '150px',
        backgroundImage: `url(${img})`, // 动态图片路径
        backgroundSize: '100% auto', // 宽度填满容器，高度保持原始比例
        backgroundPosition: 'center bottom', // 图片底部对齐容器底部
        backgroundRepeat: 'no-repeat',
        color: '#0e2a4e',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0 20px',
    };

    return (
        <>
            <Footer
                // className="footer-container"
                style={footerStyle}
            >
                <div className="copyright">
                    ©2025 By Zhongyh
                </div>
                <div className="framwork-info">
                    Power by React | ZBlog
                </div>
            </Footer>
        </>
    )
}


export default WebFooter;