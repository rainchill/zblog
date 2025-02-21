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
import WebHeader from '@/components/WebHeader';
import Comments from '@/components/Comments';

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

    return (
        <>
            <Layout>
                <WebHeader />
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
