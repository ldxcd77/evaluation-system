import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCredentials } from '../store/authSlice';
import '../styles/login.css';

function Login() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // 模拟登录成功
        const mockUser = {
            username: formData.username || 'test_user',
            role: 'admin'
        };
        const mockToken = 'mock_token_123';
        
        // 存储登录信息
        dispatch(setCredentials({ user: mockUser, token: mockToken }));
        localStorage.setItem('token', mockToken);
        
        // 导航到主页
        navigate('/');
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>用户登录</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>用户名</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="请输入用户名"
                        />
                    </div>
                    <div className="form-group">
                        <label>密码</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="请输入密码"
                        />
                    </div>
                    <button type="submit">登录</button>
                </form>
            </div>
        </div>
    );
}

export default Login; 