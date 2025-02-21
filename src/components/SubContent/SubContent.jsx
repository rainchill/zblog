import AuthorCard from "@/pages/Home/components/AuthorCard";
import { useEffect, useState } from "react";
import { Row, Col } from "antd";

import './SubContent.css'

const SubContent = ({ children }) => {
    const [showAuthorCard, setShowAuthorCard] = useState(true);

    useEffect(() => {
        const handleResize = () => {
            // 当父容器宽度小于 1050px 时隐藏 AuthorCard
            setShowAuthorCard(window.innerWidth >= 1050);
        };

        // 初始化时检查一次
        handleResize();

        // 监听窗口大小变化
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, [])

    return (
        <>
            <div className="subcontent-container">
                <div className="subcontent-card-container">
                    <div className="subcontent-card-wrapper">
                        {children}
                    </div>
                    {showAuthorCard && (
                        <div className="subcontent-author-card-wrapper">
                            <AuthorCard />
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default SubContent;