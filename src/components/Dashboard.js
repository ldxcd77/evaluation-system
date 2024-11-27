import React from 'react';
import '../styles/dashboard.css';

function Dashboard() {
    return (
        <div className="content-container">
            <h1 className="page-title">综合指标管理平台</h1>
            
            <div className="dashboard-grid">
                <div className="card">
                    <h3>用户统计</h3>
                    <div className="stat-number">125</div>
                    <p>总用户数</p>
                </div>
                
                <div className="card">
                    <h3>指标统计</h3>
                    <div className="stat-number">48</div>
                    <p>活跃指标数</p>
                </div>
                
                <div className="card">
                    <h3>评价对象</h3>
                    <div className="stat-number">36</div>
                    <p>当前评价对象数</p>
                </div>
                
                <div className="card">
                    <h3>系统状态</h3>
                    <div className="stat-number">正常</div>
                    <p>系统运行状态</p>
                </div>
            </div>

            <div className="card">
                <h3>最近活动</h3>
                <div className="activity-list">
                    <div className="activity-item">
                        <span className="activity-time">2024-01-20 10:30</span>
                        <span className="activity-desc">新增用户：张三</span>
                    </div>
                    <div className="activity-item">
                        <span className="activity-time">2024-01-20 09:15</span>
                        <span className="activity-desc">更新指标：技术创新能力</span>
                    </div>
                    <div className="activity-item">
                        <span className="activity-time">2024-01-19 16:45</span>
                        <span className="activity-desc">修改评价对象：A公司</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard; 