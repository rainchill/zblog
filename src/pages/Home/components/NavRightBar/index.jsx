import { Row, Col } from "antd"
import classNames from "classnames"
import "./NavRightBar.css"
import { HomeOutlined, SearchOutlined, CompassOutlined, FileTextOutlined, CommentOutlined, UserOutlined } from '@ant-design/icons'
import { useNavigate } from "react-router-dom"

const navNames = { "搜索": SearchOutlined, "首页": HomeOutlined, "分类": FileTextOutlined, "留言板": CommentOutlined, "登录": UserOutlined }

const ColUI = (name, SonUI, isTransparent, onClick) => {
    return (
        <Col >
            <div className="home-page-container" onClick={onClick}>
                <SonUI className={classNames({ "home-icon": isTransparent, "home-icon2": !isTransparent })} />
                <span className={classNames({ "home-text2": isTransparent, "home-text": !isTransparent })}>
                    {name}
                </span>
            </div>
        </Col>
    )
}

const NavRightBar = ({ isTransparent }) => {
    const navigate = useNavigate()
    return (
        <Row gutter={[24, 8]} align="end">
            {/* {entries.map(([key, value]) => ColUI(key, value, isTransparent))} */}
            {Object.keys(navNames).map((key) => (
                <div key={key}>
                    {/* 动态渲染组件 */}
                    {ColUI(key, navNames[key], isTransparent, () => {
                        navClick(key, navigate);
                    })}
                </div>
            ))}
        </Row>
    )
}

function navClick(key, navigate) {
    switch (key) {
        case '搜索': {
            break;
        }
        case '首页': {
            navigate('/');
            break;
        }
        case '分类': {
            navigate('/category')
            break;
        }
        case '留言板': {
            break;
        }
        case '登录': {
            navigate('/admin');
            break;
        }
    }
}

export default NavRightBar