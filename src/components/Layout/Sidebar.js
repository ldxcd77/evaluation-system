import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../styles/sidebar.css';

function Sidebar() {
    const location = useLocation();
    const [expandedMenus, setExpandedMenus] = useState({});

    const menuItems = [
        { 
            path: '/', 
            label: '首页',
            icon: '📊'
        },
        {
            label: '用户管理',
            icon: '👥',
            children: [
                { path: '/user-management', label: '用户列表' },
                { path: '/user-roles', label: '角色管理' }
            ]
        },
        {
            label: '指标管理',
            icon: '📈',
            children: [
                { path: '/indicator-management', label: '指标列表' },
                { path: '/indicator-system-management', label: '指标体系' },
                { path: '/evaluation-object-management', label: '评价对象' }
            ]
        },
        {
            label: '评价管理',
            icon: '📋',
            children: [
                { path: '/evaluation', label: '评价记录' },
                { path: '/evaluation-analysis', label: '评价分析' }
            ]
        }
    ];

    const toggleMenu = (label) => {
        setExpandedMenus(prev => ({
            ...prev,
            [label]: !prev[label]
        }));
    };

    const renderMenuItem = (item) => {
        if (item.children) {
            return (
                <div key={item.label} className="menu-group">
                    <div 
                        className="menu-group-title" 
                        onClick={() => toggleMenu(item.label)}
                    >
                        <span className="menu-icon">{item.icon}</span>
                        {item.label}
                        <span className={`arrow ${expandedMenus[item.label] ? 'expanded' : ''}`}>▼</span>
                    </div>
                    <div className={`submenu ${expandedMenus[item.label] ? 'expanded' : ''}`}>
                        {item.children.map(child => (
                            <Link
                                key={child.path}
                                to={child.path}
                                className={`menu-item ${location.pathname === child.path ? 'active' : ''}`}
                            >
                                {child.label}
                            </Link>
                        ))}
                    </div>
                </div>
            );
        }

        return (
            <Link
                key={item.path}
                to={item.path}
                className={`menu-item ${location.pathname === item.path ? 'active' : ''}`}
            >
                <span className="menu-icon">{item.icon}</span>
                {item.label}
            </Link>
        );
    };

    return (
        <div className="sidebar">
            <div className="logo">
                <h2>指标评价系统</h2>
            </div>
            <nav className="menu">
                {menuItems.map(renderMenuItem)}
            </nav>
        </div>
    );
}

export default Sidebar; 