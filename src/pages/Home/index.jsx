import React, { useState, useEffect, useRef } from "react"
import { Layout, Col, Row, Flex, Button, Card, Pagination } from "antd"
import { SearchOutlined, StarOutlined, DownOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux'

import './Home.css'
import classNames from "classnames"
import { Carousel } from 'antd'
import bgPic from '../../assets/images/bg.jpg';
import NavRightBar from "./components/NavRightBar";
import ArticleCard from "./components/ArticleCard";
import AuthorCard from "./components/AuthorCard";
import ArticleCardList from "./components/ArticleCardList";
import { fetchHomeInfo } from "@/store/modules/homeStore";
import { updatePage } from "@/store/modules/homeStore";
import { useNavigate } from "react-router-dom";
import WebHeader from "@/components/WebHeader";
import SubContent from "@/components/SubContent/SubContent";
import WebFooter from "./WebFooter";
import bgImg from '@/assets/images/bg.jpg'

// const contentStyle = {
//     height: '911px',
//     color: '#fff',
//     lineHeight: '160px',
//     textAlign: 'center',
//     background: '#364d79',
//     marginTop: '0px',   // 上外边距
//     marginRight: '0px', // 右外边距
//     marginBottom: '0px',// 下外边距
//     marginLeft: '0px'  // 左外边距
// }

const { Header, Footer, Sider, Content } = Layout;


const Home = () => {
    const [isHidden, setIsHidden] = useState(false) // 控制 Header 是否隐藏
    const lastScrollY = useRef(0) // 保存上一次滚动位置
    // 设置背景是否透明
    const [isTransparent, setIsTransparent] = useState(true)
    const [showAuthorCard, setShowAuthorCard] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        // 从后端获取首页json数据
        dispatch(fetchHomeInfo())
    }, [])

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

        // 清理事件监听
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [isHidden, isTransparent])

    const backgroundImageUrl = '../../assets/images/bg.jpg';


    return (
        <Layout>
            <WebHeader />
            <Content>
                <div>
                    <div className="image-container">
                        <div className="responsive-image"></div>
                        <div className="text-overlay">Hello, World! 你好，世界！</div>
                        {/* <div className="float-button">butoon</div> */}
                        <DownOutlined className="float-button icon-bold bouncing-button" onClick={() => {
                            // console.log("click the floating button");
                            window.scrollTo({
                                top: 911, // 滚动到距离页面顶部911px的位置
                                behavior: 'smooth', // 平滑滚动效果
                            });
                        }} />
                    </div>
                </div>
                <SubContent>
                    <ArticleCardList onChange={(page) => {
                        // console.log('page=', page)
                        dispatch(updatePage(page))
                    }} />
                </SubContent>
            </Content>
            <WebFooter img={bgImg}></WebFooter>
        </Layout>
    );
};

export default Home;
