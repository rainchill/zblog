import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Col, Flex, Layout, Menu, Row } from 'antd';
import classNames from 'classnames';
import NavRightBar from '@/pages/Home/components/NavRightBar';
import { fetchHomeInfo } from "@/store/modules/homeStore";
import { updatePage } from "@/store/modules/homeStore";
import { config } from '@/config';
import './WebHeader.css'


const { Header, Footer, Sider, Content } = Layout;

const WebHeader = () => {
    const [isHidden, setIsHidden] = useState(false) // 控制 Header 是否隐藏
    const lastScrollY = useRef(0) // 保存上一次滚动位置
    // 设置背景是否透明
    const [isTransparent, setIsTransparent] = useState(true)
    const [showAuthorCard, setShowAuthorCard] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { cardList, totalPages } = useSelector((state) => state.home);

    // console.log('img:', config.categoryBgImg)
    // useEffect(() => {
    //     // 从后端获取首页json数据
    //     dispatch(fetchHomeInfo())
    // }, [])

    // 监听滚动事件
    useEffect(() => {
        const handleTransparent = () => {
            const currentScrollY = window.scrollY
            if (currentScrollY < 128) {
                setIsTransparent(true)
            }
            else {
                setIsTransparent(false)
            }
        }

        const handleScroll = () => {
            const currentScrollY = window.scrollY // 当前滚动位置
            const isScrollingUp = currentScrollY < lastScrollY.current // 判断是否向上滚动
            // console.log('now Y=', currentScrollY)
            // 如果向上滚动且 Header 已隐藏，则显示 Header
            if (isScrollingUp && isHidden) {
                setIsHidden(false);
            }
            // 如果向下滚动且 Header 可见，则隐藏 Header
            else if (!isScrollingUp && !isHidden) {
                setIsHidden(true);
            }
            handleTransparent()

            // 更新上一次滚动位置
            lastScrollY.current = currentScrollY;
        };
        // 添加滚动事件监听
        window.addEventListener("scroll", handleScroll);


        const handleResize = () => {
            // 当父容器宽度小于 1050px 时隐藏 AuthorCard
            setShowAuthorCard(window.innerWidth >= 1050);
        };

        // 初始化时检查一次
        handleResize();
        // console.log('11111111111111111')

        // 监听窗口大小变化
        window.addEventListener('resize', handleResize);

        // 清理事件监听
        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener('resize', handleResize);
        };
    }, [isHidden, isTransparent])

    return (
        <>
            <Header
                className={classNames({
                    "transparent-background": isTransparent,
                    "glass-effect": !isTransparent
                })}
                style={{
                    position: "fixed",
                    top: isHidden ? "-64px" : 0, // 根据状态动态调整 Header 位置
                    width: "100%",
                    // transition: "top 0.3s ease", // 添加过渡动画
                    zIndex: 1000,
                    // color: "#fff",
                    padding: "0 36px",
                    // backgroundColor: "white"
                }}
            >
                <Row justify="start">
                    <Col flex={4} align="start">
                        <span className={classNames({
                            "site-name": !isTransparent,
                            "site-name2": isTransparent,
                            "no-select": true
                        })} onClick={() => {
                            navigate('/')
                        }}>Butterfly</span>
                    </Col>
                    <Col flex={3} align="center">
                        <NavRightBar isTransparent={isTransparent} />
                    </Col>
                </Row>
            </Header>
        </>
    )
};
export default WebHeader;