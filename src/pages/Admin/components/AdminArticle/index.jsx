import React, { useState, useEffect } from 'react';
import { Table, Button, Tag, Image, Modal, Form, Input, Descriptions, Space, Popconfirm, DatePicker, Upload, Row, Col } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import axios from 'axios';
import dayjs from 'dayjs';
import './AdminArticle.css';
import { use } from 'react';
import { config } from '@/config';
import { useNavigate } from 'react-router-dom';

const AdminArticle = () => {
    const [dataSource, setDataSource] = useState([]);
    const [total, setTotal] = useState(0);
    const [current, setCurrent] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const pageSize = 6;

    const navigate = useNavigate();

    const columns = [
        {
            title: '标题',
            dataIndex: 'title',
            key: 'title',
            render: (title, record) => {
                return (
                    // <a href={`http://localhost:5173/post/${record.key}`} target='_blank'> {title}</a >
                    // <a href={config.local + 'post/' + record.key} target='_blank'> {title}</a >
                    <a target='_blank' onClick={() => {
                        navigate('/post/' + record.key);
                    }}> {title}</a >
                );
            },
        },
        {
            title: '发布日期',
            dataIndex: 'date',
            key: 'date',
            width: 240,
            render: (date) => <div>{dayjs(date).format('YYYY-MM-DD HH:mm:ss')}</div>
        },
        {
            title: '分类',
            dataIndex: 'category',
            key: 'category',
            width: 120,
        },
        {
            title: '文章封面',
            dataIndex: 'cover',
            key: 'cover',
            render: (cover) => (
                <Image
                    style={{ height: '52px', objectFit: 'cover' }}
                    src={cover}
                />
            ),
        },
        {
            title: '标签',
            key: 'tags',
            dataIndex: 'tags',
            render: (_, { tags }) => (
                <>
                    {tags.map((tag) => {
                        let color = tag.length > 5 ? 'geekblue' : 'green';
                        if (tag === 'loser') {
                            color = 'volcano';
                        }
                        return (
                            <Tag color={color} key={tag}>
                                {tag.toUpperCase()}
                            </Tag>
                        );
                    })}
                </>
            ),
        },
        {
            title: '操作',
            key: 'action',
            render: (_, record) => {
                const text = '确定删除这篇文章吗？';
                const description = '确认之后无法恢复';
                return (
                    <>
                        <Space>
                            <Button type="primary">编辑</Button>
                            <Popconfirm
                                placement="top"
                                title={text}
                                description={description}
                                okText="是"
                                cancelText="否"
                                onConfirm={() => {
                                    handleDelete(record.key);
                                }}
                            >
                                <Button type="primary" danger>删除</Button>
                            </Popconfirm>
                        </Space>

                    </>
                )
            }
            ,
        },
    ];

    const fetchData = async (page, pageSize) => {
        try {
            // const response = await axios.get('http://localhost:3000/api/articles', {
            //     params: { page, pageSize },
            // });
            const response = await axios.get(config.apiUrl + 'articles', {
                params: { page, pageSize },
            });
            const data = response.data.articles.map(item => {
                const { _id, ...rest } = item;
                return {
                    ...rest,
                    key: _id
                }
            });
            setDataSource(data);
            setTotal(response.data.total);
        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
    };

    useEffect(() => {
        fetchData(current, pageSize);
    }, [current, total]);

    const handlePageChange = (newPage) => {
        setCurrent(newPage);
    };

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onFinish = async (values) => {
        try {
            // console.log('values.date.toISOString():', values.date.toISOString());
            const newArticle = {
                title: values.title,
                // date: new Date(), // 当前时间
                description: values.description,
                date: values.date ? values.date.toISOString() : new Date(),
                category: values.category,
                cover: values.cover,
                tags: values.tags && values.tags.split(',').map(tag => tag.trim()), // 将标签字符串分割为数组
                comments: []
            }
            // const response = await axios.post('http://localhost:3000/api/articles', newArticle);
            const response = await axios.post(config.apiUrl + 'articles', newArticle);
            // console.log('xxx=', response.status);
            if (response.status === 201) {
                // console.log("发送成功 newArticle=", newArticle);
                const data = response.data;
                const { _id, comments, __v, description, ...rest } = data;
                const newData = {
                    ...rest,
                    key: _id
                }
                console.log('newData=', newData);
                setDataSource([...dataSource, newData]); // 添加到数据源
                setIsModalOpen(false); // 关闭模态框
                setTotal(total + 1);
                // console.log('dataSource=', dataSource.length, 'total=', total, 'pageSize=', pageSize);
                // console.log('Math.floor(total / pageSize + 1)', Math.floor(total / pageSize + 1))
                setCurrent(Math.floor(total / pageSize + 1));
            }


        } catch (error) {
            console.error('Failed to add article:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            // 调用后端 API 删除指定的文章
            // await axios.delete(`http://localhost:3000/api/articles/${id}`);
            await axios.delete(config.apiUrl + 'articles/' + id);

            // 更新前端状态
            const newDataSource = dataSource.filter(item => item.key !== id);
            setDataSource(newDataSource);
            setTotal(total - 1);

            // 如果当前页为空且不是第一页，跳转到前一页
            if (newDataSource.length === 0 && current > 1) {
                setCurrent(current - 1);
            }
        } catch (error) {
            console.error('Failed to delete article:', error);
        }
    };

    // 处理文件上传状态变化
    const handleChange = (info) => {
        let fileList = [...info.fileList];

        // 1. 限制上传数量
        fileList = fileList.slice(-2);

        // 2. 过滤无效文件
        fileList = fileList.filter((file) =>
            !file.error
        );

        // 3. 设置文件列表到表单状态
        form.setFieldsValue({ dragger: fileList });

        if (info.file.status === 'done') {
            console.log(`${info.file.name} 文件上传成功`);

            // 获取文件名（不包含后缀）
            const fileNameWithoutExtension = info.file.name.split('.').slice(0, -1).join('.');
            // 设置 title 字段的值为文件名
            form.setFieldsValue({ title: fileNameWithoutExtension });
        } else if (info.file.status === 'error') {
            console.log(`${info.file.name} 文件上传失败`);
            // message.error(`${info.file.name} 文件上传失败`);
        }
    };

    return (
        <>
            <div style={{ margin: '24px' }}>
                <Button
                    type="primary"
                    style={{ marginBottom: 16 }}
                    onClick={showModal}
                >
                    添加文章
                </Button>
                <Table
                    columns={columns}
                    dataSource={dataSource}
                    pagination={{
                        current,
                        pageSize,
                        total,
                        onChange: handlePageChange,
                        position: ['bottomCenter']
                    }}
                    bordered
                />
            </div>
            <Modal
                title="Add New Article"
                open={isModalOpen}
                onCancel={handleCancel}
                // footer={null}
                okText="确定"
                cancelText="取消"
                okButtonProps={{
                    autoFocus: true,
                    htmlType: 'submit',
                }}
                modalRender={(dom) => (
                    <Form
                        layout="vertical"
                        form={form}
                        name="form_in_modal"
                        initialValues={{
                            // date: dayjs(), // 设置默认值为当前日期
                        }}
                        clearOnDestroy
                        onFinish={onFinish}
                    >
                        {dom}
                    </Form>
                )}
            >
                {/* <Form
                    form={form}
                    onFinish={onFinish}
                    {...formItemLayout}
                > */}
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="title"
                            label="标题"
                            rules={[{ required: true, message: 'Please input the title!' }]}
                        // wrapperCol={{ span: 24 }}
                        >
                            <Input disabled />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="description"
                            label="描述"
                        // rules={[{ required: true, message: 'Please input the tags!' }]}
                        // wrapperCol={{ span: 24 }}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="category"
                            label="分类"
                            rules={[{ required: true, message: 'Please input the category!' }]}
                        // wrapperCol={{ span: 24 }}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="tags"
                            label="标签(逗号分割)"
                        // rules={[{ required: true, message: 'Please input the tags!' }]}
                        // wrapperCol={{ span: 24 }}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item
                    name="cover"
                    label="封面(URL)"
                    rules={[{ required: true, message: 'Please input the cover URL!' }]}
                // wrapperCol={{ span: 24 }}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="date"
                    label="日期 "
                    extra="不勾选则默认当前日期"
                >
                    <DatePicker
                        disabledDate={(current) => {
                            // 返回 true 表示禁用该日期
                            return current.isAfter(dayjs());
                        }}
                    />
                </Form.Item>
                <Form.Item
                    label="Dragger"
                    name="dragger"
                    rules={[{ required: true, message: 'Please upload a file!' }]}
                >
                    <Form.Item
                        name="dragger"
                        valuePropName="fileList"
                        // getValueFromEvent={normFile}
                        noStyle
                    >
                        <Upload.Dragger
                            name="files"
                            // action="http://localhost:3000/articles"
                            // action={config.article}
                            action={config.upload}
                            // action={config.apiUrl}
                            onChange={handleChange}>
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined />
                            </p>
                            <p className="ant-upload-text">Click or drag file to this area to upload</p>
                            <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                        </Upload.Dragger>
                    </Form.Item>
                </Form.Item>
                {/* <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Add
                        </Button>
                    </Form.Item> */}
                {/* </Form> */}
            </Modal>
        </>
    );
};

export default AdminArticle;