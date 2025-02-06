import React, { useState, useEffect } from 'react';
import { Row, Col, Skeleton, Image } from 'antd';
import './ArticleCard.css';
import { CalendarOutlined, InboxOutlined, MessageOutlined, FileTextOutlined, CommentOutlined } from '@ant-design/icons'
import loadingGif from '@/assets/images/loading.gif'
import classNames from 'classnames';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const ArticleInfo = ({ info }) => {
    // 日期<CalendarOutlined /> 分类 <InboxOutlined /> 评论 <MessageOutlined />
    return (
        <>
            <Row gutter={[8, 8]}>
                <Col>
                    <CalendarOutlined />
                    <span> 发布于{moment(info.date).format("YYYY-MM-DD")}</span>
                </Col>
                <Col className='card-article-category'>
                    <InboxOutlined />
                    <span> {info.category}</span>
                </Col>
                <Col>
                    <MessageOutlined />
                    <span> {info.comments.length}条评论</span>
                </Col>
            </Row>
        </>
    )
}

const ArticleCard = ({ info, reverse = false }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const navigate = useNavigate();

    const handleImageLoad = () => {
        setIsLoaded(true);
    };

    return (
        <>
            <div className="card">
                <div className={classNames({ "card-content": !reverse, "card-content-reverse": reverse })}>
                    <div className="card-image-container">
                        <img
                            src={info.cover}
                            alt="Card Image"
                            className="card-image"
                            onLoad={handleImageLoad}
                            onClick={() => {
                                navToArticle(info, navigate)
                            }}
                        />
                        {!isLoaded && (
                            <div className="card-image-placeholder">
                                <img
                                    src={loadingGif}
                                    alt="Loading"
                                    style={{ width: '100%', height: 'auto' }}
                                />
                            </div>
                        )}
                    </div>
                    <div className="card-text">
                        <div className="card-title" onClick={() => {
                            navToArticle(info, navigate)
                        }}>{info.title}</div>
                        <div className="card-information"><ArticleInfo info={info} /></div>
                        <div className="card-description">{info.description}</div>
                    </div>
                </div>
            </div>
        </>
    );
};

function navToArticle(info, navigate) {
    // navigate(`/post/${info._id}`, {
    //     state: {
    //         title: info.title,
    //         info: info
    //     }
    // });
    navigate(`/post/${info._id}`);
}

export default ArticleCard;

// const ArticleCardLoading = ({ reverse = false }) => {
//     return (
//         <>
//             <div className="card">
//                 <div className={classNames({ "card-content": !reverse, "card-content-reverse": reverse })}>
//                     <div className="card-image-container">
//                         <img
//                             src={loadingGif}
//                             alt="Card Image"
//                             className="card-image"
//                         />
//                     </div>
//                     <div className="card-text">
//                         <Skeleton
//                             active
//                             title={{ width: '100%' }}
//                             paragraph={{ rows: 3, width: '100%' }}
//                         />
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }

// const ArticleCardLoaded = ({ info, reverse = false }) => {
//     return (
//         <>
//             <div className="card">
//                 <div className={classNames({ "card-content": !reverse, "card-content-reverse": reverse })}>
//                     <div className="card-image-container">
//                         <img
//                             src="https://w.wallhaven.cc/full/qz/wallhaven-qz13pl.jpg"
//                             alt="Card Image"
//                             className="card-image"
//                         />
//                     </div>
//                     <div className="card-text">
//                         <div className="card-title">{info.title}</div>
//                         <div className="card-information"><ArticleInfo info={info} /></div>
//                         <div className="card-description">{info.description}</div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }


// const ArticleCard = ({ info, reverse }) => {
//     const [isLoading, setIsLoading] = useState(true)

//     useEffect(() => {
//         // 模拟加载状态
//         const timer = setTimeout(() => {
//             setIsLoading(false);
//         }, 2000); // 2秒后加载完成

//         return () => clearTimeout(timer);
//     }, [])

//     return (
//         <>
//             <div>
//                 {isLoading ?
//                     <ArticleCardLoading reverse={reverse} /> :
//                     <ArticleCardLoaded info={info} reverse={reverse} />}
//                 {/* <button onClick={() => setIsLoading(!isLoading)}>change loading state</button> */}
//             </div>
//         </>
//     );
// };

// export default ArticleCard;
