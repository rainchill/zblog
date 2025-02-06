import React, { useState, useEffect } from 'react';
import { Skeleton, Button, Flex, Row, Col } from 'antd';
import './AuthorCard.css';
import { CalendarOutlined, InboxOutlined, MessageOutlined, GithubOutlined } from '@ant-design/icons';
import loadingGif from '@/assets/images/loading.gif'
import { useDispatch, useSelector } from 'react-redux';
import { fetchAuthor } from '@/store/modules/homeStore';


const AuthorCardInfo = () => {
    // 文章 标签 分类
    return (
        <>
            <Row gutter={[8, 8]}>
                <Col span={8}>
                    <div className="AuthorCard-information">
                        <div> 文章</div>
                        <div>343</div>
                    </div>
                </Col>
                <Col span={8}>
                    <div className="AuthorCard-information">
                        <div> 标签</div>
                        <div>343</div>
                    </div>
                </Col>
                <Col span={8}>
                    <div className="AuthorCard-information">
                        <div> 分类</div>
                        <div>343</div>
                    </div>
                </Col>
            </Row>
        </>
    )
}

const AuthorCardLoading = () => {

    return (
        <>
            <div className="AuthorCard-content">
                <div className="AuthorCard-image-container">
                    <img
                        src={loadingGif}
                        alt="Author Image"
                        className="AuthorCard-image"
                    />
                </div>
                <div className="AuthorCard-text">
                    <Skeleton
                        active
                        title={{ width: '100%' }}
                        paragraph={{ rows: 3, width: '100%' }}
                    />
                </div>
            </div>
        </>
    )
}

const AuthorCardLoaded = () => {
    const { author } = useSelector((state) => state.home)

    return (
        <>
            <div className="AuthorCard-content">
                <div className="AuthorCard-image-container">
                    <img
                        src={author?.avatar}
                        alt="Author Image"
                        className="AuthorCard-image"
                    />
                </div>
                <div className="AuthorCard-text">
                    {/* <div className="AuthorCard-title">{title}</div> */}
                    <div className="AuthorCard-title">Zhongyh</div>
                    <div className="AuthorCard-description">
                        {author.description}
                    </div>
                    <AuthorCardInfo />
                    <button className="AuthorCard-custom-button">
                        <GithubOutlined />
                        &nbsp;主题 GitHub
                    </button>
                </div>
            </div>
        </>
    )
}

const AuthorCard = ({ title, date, category, comments }) => {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        // 模拟加载状态
        const timer = setTimeout(() => {
            setLoading(false);
        }, 500); // 0.5秒后加载完成

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        dispatch(fetchAuthor());
    }, [])

    return (
        <>
            <div className="AuthorCard">
                {
                    loading ? <AuthorCardLoading /> : <AuthorCardLoaded />
                }
            </div>
            {/* <button onClick={() => setLoading(!loading)}>change loading state</button> */}
        </>
    );
};

export default AuthorCard;
