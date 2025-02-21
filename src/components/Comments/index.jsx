import { Input, Card, Button, ConfigProvider, List, Typography, Avatar, message } from 'antd';
import { MessageOutlined, LikeOutlined, DislikeOutlined, UserOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './Comments.css'
import dayjs from 'dayjs';
import { useSelector, useDispatch } from 'react-redux';
import { setCommentX, setXCommentList } from '@/store/modules/commentsStore';
import { config } from '@/config';

const { TextArea } = Input;

const CommentBox = () => {

    // const [commentList, setCommentList] = useState([]);
    const [id, setId] = useState('');
    const [email, setEmail] = useState('');
    const [website, setWebsite] = useState('');
    const [desc, setDesc] = useState('');

    const getId = (e) => {
        // console.log('getId:', e.target.value);
        setId(e.target.value);
    };
    const getEmail = (e) => {
        // console.log('getEmail:', e.target.value);
        setEmail(e.target.value);
    };
    const getWebsite = (e) => {
        // console.log('getWebsite:', e.target.value);
        setWebsite(e.target.value);
    };
    const getDesc = (e) => {
        // console.log('getDesc:', e.target.value);
        setDesc(e.target.value);
    };
    const { commentList } = useSelector((state) => state.comments);
    const { _id: articleID } = useSelector((state) => state.home.articleInfo);
    const dispatch = useDispatch();
    const submitComment = async (item) => {
        let name;
        let defaultAvatar = false;
        if (!desc) {
            return;
        }
        console.log('提交');
        // const response = await axios.get(`https://api.leafone.cn/api/qqnick?qq=${item.id}`);
        try {
            let newComment = {
                id,
                email,
                website,
                desc,
                date: dayjs().toISOString()
            }
            let response = await axios.get(`/qq/api/qqnick?qq=${id}`);
            if (response.data.data) {
                name = response.data.data.nickname || '用户' + id.slice(-6);
                // dispatch(setXCommentList([{
                //     name, id, email, website, desc, date: dayjs().toISOString(), default: false
                // }, ...commentList]));
            } else {
                name = '用户' + id.slice(-5);
                defaultAvatar = true;
                // setXCommentList([{
                //     name, id, email, website, desc, date: dayjs().toISOString(), default: true
                // }, ...commentList]);
            }
            newComment = { ...newComment, defaultAvatar, name, articleID };
            response = await axios.post(config.apiUrl + 'comments', newComment);
            if (response.status === 201) {
                dispatch(setXCommentList([newComment, ...commentList]));
            } else { }
        } catch (err) {
            console.log('err:', err);
        }
        // setId('');
        // setEmail('');
        // setWebsite('');
        setDesc('');
    }

    return (
        <>
            <Card
                className='comments-card'
                bordered={true}
                style={{ width: '100%', marginTop: '36px' }}
                styles={{ body: { padding: 0 } }}
            >
                <div className='comments-container'>
                    <div className='comments-header'>
                        <Input value={id} className='custom-input' placeholder='昵称' onChange={getId} />
                        <Input value={email} className='custom-input' placeholder='邮箱（选填）' onChange={getEmail} />
                        <Input value={website} className='custom-input' placeholder='网站（选填）' onChange={getWebsite} />
                    </div>
                    <div className='comments-content'>
                        <ConfigProvider
                            theme={{
                                token: {
                                    // Seed Token，影响范围大
                                    colorPrimary: '#fff',
                                    borderRadius: 2,
                                    // 派生变量，影响范围小
                                    // colorBgContainer: '#f6ffed',
                                },
                            }}
                        >
                            <TextArea
                                value={desc}
                                showCount
                                maxLength={100}
                                onChange={getDesc}
                                placeholder="请在这里输入~"
                                style={{
                                    // height: 100,
                                    resize: 'none',
                                }}
                                autoComplete="off"
                                className='comments-editer'
                            />
                        </ConfigProvider>
                        <ConfigProvider
                            theme={{
                                token: {
                                    // Seed Token，影响范围大
                                    colorPrimary: '#fff',
                                    borderRadius: 2,
                                    // 派生变量，影响范围小
                                    colorText: '#fff',
                                    colorBgContainer: '#49b1f5',
                                },
                            }}
                        >
                            <div className='button'>
                                <Button onClick={submitComment}>提交</Button>
                            </div>
                        </ConfigProvider>
                    </div>
                </div>
            </Card>
        </>
    )
}

const CommentItem = ({ item }) => {

    return (
        <div className='comment-warp'>
            <div className='comment-avatar'>
                {item.defaultAvatar ?
                    <Avatar shape="square" size={50} icon={<UserOutlined />} />
                    : <img src={`https://q1.qlogo.cn/g?b=qq&nk=${item.id}&s=100`} style={{ height: 50, width: 50 }} />}

            </div>
            <div className='comment-main'>
                <div className='comment-header'>
                    <span className='comment-item comment-id'>{item.name}</span>
                    <span className='comment-item'>{dayjs(item.date).format('YYYY-MM-DD HH:MM:ss')}</span>
                </div>
                <div className='comment-body'>{item.desc}</div>
                <div className='comment-footer'>
                    <span className='comment-action-btn'><LikeOutlined />({0})</span>
                    <span className='comment-action-btn'><DislikeOutlined />({0})</span>
                    <span className='comment-action-btn' onClick={() => {
                        console.log('回复');
                    }}><MessageOutlined /></span>
                </div>
                <div className='comment-children'>

                </div>
            </div>
        </div>
    )
}

const Comments = () => {
    const { id, email, website, desc, commentList } = useSelector((state) => state.comments);
    const dispatch = useDispatch();
    const { articleInfo } = useSelector((state) => state.home);
    // 存在 bug 非常不优雅的做法... 待优化
    useEffect(() => {
        console.log('渲染');
        // 按日期降序排序
        if (articleInfo.comments) {
            const newList = articleInfo.comments.slice().sort((a, b) => dayjs(b.date).valueOf() - dayjs(a.date).valueOf());
            dispatch(setXCommentList(newList));
        }
    }, [articleInfo._id])

    return (
        <>
            <CommentBox />

            <List
                // header={<div>Header</div>}
                // footer={<div>Footer</div>}
                // bordered
                split={false}
                dataSource={commentList}
                renderItem={(item) => (
                    <List.Item
                        style={{ padding: 0 }}
                    >
                        <CommentItem item={item} key={item.id} />
                    </List.Item>
                )}
            />
        </>
    )
}

export default Comments;