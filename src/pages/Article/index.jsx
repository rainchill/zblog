import React, { useState, useEffect, useRef } from 'react';
import { Layout, Col, Row, Image } from 'antd';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import NavRightBar from '../Home/components/NavRightBar';
import AuthorCard from '../Home/components/AuthorCard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAuthor, fetchArticleInfo } from '@/store/modules/homeStore';
import './Article.css';
import Page from './Page'; // 确保正确引入 Page 组件
import SubContent from '@/components/SubContent/SubContent';
import WebFooter from '../Home/WebFooter';
import axios from 'axios';

const { Header, Content, Footer } = Layout;

const Article = () => {
    const [isHidden, setIsHidden] = useState(false); // 控制 Header 是否隐藏
    const lastScrollY = useRef(0); // 保存上一次滚动位置
    const [isTransparent, setIsTransparent] = useState(true); // 设置背景是否透明
    const [showAuthorCard, setShowAuthorCard] = useState(true);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { author, articleInfo: info } = useSelector((state) => state.home);
    const { id } = useParams(); // 获取路径中的 _id 参数

    useEffect(() => {
        dispatch(fetchAuthor());
        dispatch(fetchArticleInfo(id))
    }, [id])

    // 监听滚动事件
    useEffect(() => {
        const handleTransparent = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY < 128) {
                setIsTransparent(true);
            } else {
                setIsTransparent(false);
            }
        };

        const handleScroll = () => {
            const currentScrollY = window.scrollY; // 当前滚动位置
            const isScrollingUp = currentScrollY < lastScrollY.current; // 判断是否向上滚动

            // 如果向上滚动且 Header 已隐藏，则显示 Header
            if (isScrollingUp && isHidden) {
                setIsHidden(false);
            }
            // 如果向下滚动且 Header 可见，则隐藏 Header
            else if (!isScrollingUp && !isHidden) {
                setIsHidden(true);
            }
            handleTransparent();

            // 更新上一次滚动位置
            lastScrollY.current = currentScrollY;
        };
        // 添加滚动事件监听
        window.addEventListener("scroll", handleScroll);

        // 清理事件监听
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [isHidden, isTransparent]);

    return (
        <>
            <Layout>
                <Header
                    className={classNames({
                        "transparent-background": isTransparent,
                        "glass-effect": !isTransparent
                    })}
                    style={{
                        position: "fixed",
                        top: isHidden ? "-64px" : 0, // 根据状态动态调整 Header 位置
                        width: "100%",
                        zIndex: 1000,
                        padding: "0 36px"
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
                <Content>
                    <div>
                        <div className="article-image-container">
                            <img
                                src={info?.cover}
                                style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                            />
                        </div>
                    </div>
                    <SubContent>
                        <Page info={info} />
                    </SubContent>
                </Content>
                <WebFooter img={info?.cover} />
            </Layout>
        </>
    );
};

export default Article;
