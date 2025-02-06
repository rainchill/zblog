import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import 'github-markdown-css/github-markdown.css';
import axios from 'axios';

const MarkdownViewer = ({ url }) => {
    const [markdownContent, setMarkdownContent] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        // 使用 axios 获取 Markdown 文件内容
        // console.log('url=', url);
        axios.get(url)
            .then(response => {
                setMarkdownContent(response.data); // 设置 Markdown 文件内容
                setError(null); // 清除错误信息
            })
            .catch(err => {
                console.error('Error fetching Markdown file:', err);
                setError('Failed to load the Markdown file.'); // 设置错误信息
            });
    }, [url]);

    return (
        <div className="markdown-body">
            {error && <div className="error">{error}</div>} {/* 显示错误信息 */}
            {markdownContent && (
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
                    components={{
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
                    {markdownContent}
                </ReactMarkdown>
            )}
        </div>
    );
};

export default MarkdownViewer;
