import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

// 模拟登录状态
const isAuthenticated = () => {
    // 这里可以替换为实际的登录状态检查逻辑，例如从 localStorage 或 Redux 中获取
    // return !!localStorage.getItem('token');
    const auth = localStorage.getItem('auth');
    if (auth === 'true') {
        return true;
    }
    return false;
};

// PrivateRoute 组件
const PrivateRoute = ({ children }) => {
    const location = useLocation();
    const auth = isAuthenticated();

    if (!auth) {
        // 如果未登录，重定向到登录页面
        // return <Navigate to="/login" state={{ from: location }} replace />;
        return <Navigate to="/login" replace />;
    }

    return children; // 如果已登录，渲染子组件
};

export default PrivateRoute;