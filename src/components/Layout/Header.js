import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/authSlice';
import '../../styles/header.css';

function Header() {
    const location = useLocation();
    const { isAuthenticated, user } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const getBreadcrumbs = () => {
        const paths = location.pathname.split('/').filter(Boolean);
        return paths.map((path, index) => {
            const url = `/${paths.slice(0, index + 1).join('/')}`;
            return {
                label: path.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
                url
            };
        });
    };

    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem('token');
    };

    return (
        <header className="header">
            <div className="breadcrumbs">
                <Link to="/">首页</Link>
                {getBreadcrumbs().map((crumb, index) => (
                    <React.Fragment key={crumb.url}>
                        <span className="breadcrumb-separator">/</span>
                        <Link to={crumb.url}>{crumb.label}</Link>
                    </React.Fragment>
                ))}
            </div>
            <div className="user-actions">
                {isAuthenticated ? (
                    <>
                        <span className="username">欢迎, {user?.username}</span>
                        <button onClick={handleLogout} className="logout-btn">退出</button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="login-btn">登录</Link>
                        <Link to="/register" className="register-btn">注册</Link>
                    </>
                )}
            </div>
        </header>
    );
}

export default Header; 