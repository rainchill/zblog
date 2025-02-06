import React, { useEffect, useState } from 'react';
import { Card } from 'antd';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useParams, useLocation } from 'react-router-dom';
import 'github-markdown-css/github-markdown.css';
import './Article.css'; // 确保引入了 Article.css
import { config } from '@/config';

const Page = ({ info }) => {
    const { id } = useParams(); // 获取路径参数 id
    const location = useLocation();
    const { state } = location; // 获取传递的参数
    const [fileData, setFileData] = useState("");
    const [error, setError] = useState(null);

    useEffect(() => {
        // console.log('xxxxxxxxx info:', info)
        // 请求静态文件
        if (info.title) {
            // console.log(`file name: http://localhost:3000/uploads/${info?.title}.md`)
            // axios.get(`http://localhost:3000/uploads/${info?.title}.md`)
            // axios.get(config.upload + info?.title + '.md')
            axios.get(config.uploadDir + info?.title + '.md')
                .then(response => {
                    setFileData(response.data); // 设置文件内容
                    setError(null); // 清除错误信息
                })
                .catch(err => {
                    console.error('Error fetching Markdown file:', err);
                    setError('Failed to load the Markdown file.'); // 设置错误信息
                });
        }
    }, [info?.title]);

    // 自定义链接组件
    const CustomLink = ({ href, children }) => {
        return (
            <a href={href} target="_blank" rel="noopener noreferrer">
                {children}
            </a>
        );
    };

    // 自定义图片组件
    const CustomImage = ({ src, alt, ...props }) => {
        return (
            <img
                src={src}
                alt={alt}
                style={{ maxWidth: '100%', height: 'auto', display: 'block' }}
                {...props}
            />
        );
    };

    return (
        <Card
            bordered={true}
            style={{ width: '100%', margin: '0' }}
            className="markdown-card"
        >
            {error && <div className="error">{error}</div>} {/* 显示错误信息 */}
            {fileData && (
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
                    components={{
                        a: CustomLink, // 使用自定义链接组件
                        img: CustomImage, // 使用自定义图片组件
                        code({ node, inline, className, children, ...props }) {
                            const match = /language-(\w+)/.exec(className || '');
                            return !inline && match ? (
                                <SyntaxHighlighter
                                    children={String(children).replace(/\n$/, '')}
                                    style={tomorrow}
                                    language={match[1]}
                                    PreTag="div"
                                    {...props}
                                />
                            ) : (
                                <code className={className} {...props}>
                                    {children}
                                </code>
                            );
                        },
                    }}
                >
                    {fileData}
                </ReactMarkdown>
            )}
        </Card>
    );
};

export default Page;
