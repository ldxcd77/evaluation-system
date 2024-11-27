import React, { useState, useEffect } from 'react';
import '../styles/indicatorManagement.css';

function IndicatorManagement() {
    const [indicators, setIndicators] = useState([]);
    const [editingIndicator, setEditingIndicator] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        code: '',
        name: '',
        description: '',
        unit: '',
        dataSource: '',
        calculationMethod: '',
        category: 'performance',
        weight: 1,
        status: 'active',
        updateFrequency: 'monthly',
        direction: 'positive' // positive: 正向指标, negative: 负向指标
    });

    // 模拟初始数据
    useEffect(() => {
        setIndicators([
            {
                id: 1,
                code: 'KPI001',
                name: '技术创新能力',
                description: '衡量企业技术创新水平',
                unit: '分',
                dataSource: '研发部门报告',
                calculationMethod: '(专利数 * 0.4 + 研发投入 * 0.6) * 100',
                category: 'performance',
                weight: 0.3,
                status: 'active',
                updateFrequency: 'quarterly',
                direction: 'positive'
            },
            {
                id: 2,
                code: 'KPI002',
                name: '客户满意度',
                description: '客户对产品和服务的满意程度',
                unit: '%',
                dataSource: '客户反馈调查',
                calculationMethod: '(满意客户数 / 总调查客户数) * 100',
                category: 'customer',
                weight: 0.2,
                status: 'active',
                updateFrequency: 'monthly',
                direction: 'positive'
            }
        ]);
    }, []);

    const handleInputChange = (e) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'number' ? parseFloat(value) : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingIndicator) {
            setIndicators(indicators.map(indicator => 
                indicator.id === editingIndicator.id 
                    ? { ...formData, id: indicator.id }
                    : indicator
            ));
        } else {
            setIndicators([...indicators, { ...formData, id: Date.now() }]);
        }
        handleCloseModal();
    };

    const handleEdit = (indicator) => {
        setEditingIndicator(indicator);
        setFormData(indicator);
        setIsModalOpen(true);
    };

    const handleDelete = (indicatorId) => {
        if (window.confirm('确定要删除这个指标吗？')) {
            setIndicators(indicators.filter(indicator => indicator.id !== indicatorId));
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingIndicator(null);
        setFormData({
            code: '',
            name: '',
            description: '',
            unit: '',
            dataSource: '',
            calculationMethod: '',
            category: 'performance',
            weight: 1,
            status: 'active',
            updateFrequency: 'monthly',
            direction: 'positive'
        });
    };

    return (
        <div className="content-container">
            <div className="indicator-header">
                <h2>指标管理</h2>
                <button onClick={() => setIsModalOpen(true)} className="add-button">
                    添加指标
                </button>
            </div>

            <div className="indicator-table">
                <table>
                    <thead>
                        <tr>
                            <th>指标编码</th>
                            <th>指标名称</th>
                            <th>单位</th>
                            <th>类别</th>
                            <th>权重</th>
                            <th>更新频率</th>
                            <th>状态</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        {indicators.map(indicator => (
                            <tr key={indicator.id}>
                                <td>{indicator.code}</td>
                                <td>{indicator.name}</td>
                                <td>{indicator.unit}</td>
                                <td>{getCategoryLabel(indicator.category)}</td>
                                <td>{indicator.weight}</td>
                                <td>{getFrequencyLabel(indicator.updateFrequency)}</td>
                                <td>
                                    <span className={`status-badge ${indicator.status}`}>
                                        {indicator.status === 'active' ? '启用' : '禁用'}
                                    </span>
                                </td>
                                <td>
                                    <button 
                                        onClick={() => handleEdit(indicator)}
                                        className="edit-button"
                                    >
                                        编辑
                                    </button>
                                    <button 
                                        onClick={() => handleDelete(indicator.id)}
                                        className="delete-button"
                                    >
                                        删除
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h3>{editingIndicator ? '编辑指标' : '添加指标'}</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>指标编码:</label>
                                    <input
                                        type="text"
                                        name="code"
                                        value={formData.code}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>指标名称:</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>描述:</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    rows="3"
                                />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>单位:</label>
                                    <input
                                        type="text"
                                        name="unit"
                                        value={formData.unit}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>权重:</label>
                                    <input
                                        type="number"
                                        name="weight"
                                        value={formData.weight}
                                        onChange={handleInputChange}
                                        step="0.1"
                                        min="0"
                                        max="1"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>类别:</label>
                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleInputChange}
                                    >
                                        <option value="performance">绩效指标</option>
                                        <option value="customer">客户指标</option>
                                        <option value="financial">财务指标</option>
                                        <option value="process">流程指标</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>更新频率:</label>
                                    <select
                                        name="updateFrequency"
                                        value={formData.updateFrequency}
                                        onChange={handleInputChange}
                                    >
                                        <option value="daily">每日</option>
                                        <option value="weekly">每周</option>
                                        <option value="monthly">每月</option>
                                        <option value="quarterly">每季度</option>
                                        <option value="yearly">每年</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>指标方向:</label>
                                    <select
                                        name="direction"
                                        value={formData.direction}
                                        onChange={handleInputChange}
                                    >
                                        <option value="positive">正向指标</option>
                                        <option value="negative">负向指标</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>状态:</label>
                                    <select
                                        name="status"
                                        value={formData.status}
                                        onChange={handleInputChange}
                                    >
                                        <option value="active">启用</option>
                                        <option value="inactive">禁用</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-group">
                                <label>数据来源:</label>
                                <input
                                    type="text"
                                    name="dataSource"
                                    value={formData.dataSource}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>计算方法:</label>
                                <textarea
                                    name="calculationMethod"
                                    value={formData.calculationMethod}
                                    onChange={handleInputChange}
                                    rows="3"
                                    required
                                />
                            </div>

                            <div className="modal-buttons">
                                <button type="submit" className="submit-button">
                                    {editingIndicator ? '保存' : '创建'}
                                </button>
                                <button 
                                    type="button" 
                                    onClick={handleCloseModal}
                                    className="cancel-button"
                                >
                                    取消
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

// 辅助函数：获取类别标签
function getCategoryLabel(category) {
    const labels = {
        performance: '绩效指标',
        customer: '客户指标',
        financial: '财务指标',
        process: '流程指标'
    };
    return labels[category] || category;
}

// 辅助函数：获取频率标签
function getFrequencyLabel(frequency) {
    const labels = {
        daily: '每日',
        weekly: '每周',
        monthly: '每月',
        quarterly: '每季度',
        yearly: '每年'
    };
    return labels[frequency] || frequency;
}

export default IndicatorManagement; 