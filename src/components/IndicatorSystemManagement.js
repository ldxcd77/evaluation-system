import React, { useState, useEffect } from 'react';
import '../styles/indicatorSystemManagement.css';

function IndicatorSystemManagement() {
    const [systems, setSystems] = useState([]);
    const [indicators, setIndicators] = useState([]);
    const [editingSystem, setEditingSystem] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isIndicatorSelectOpen, setIsIndicatorSelectOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        code: '',
        description: '',
        targetType: '',
        status: 'active',
        indicators: []
    });

    // 模拟获取指标列表
    useEffect(() => {
        setIndicators([
            {
                id: 1,
                code: 'KPI001',
                name: '技术创新能力',
                unit: '分'
            },
            {
                id: 2,
                code: 'KPI002',
                name: '客户满意度',
                unit: '%'
            }
            // 更多指标...
        ]);
    }, []);

    // 模拟初始数据
    useEffect(() => {
        setSystems([
            {
                id: 1,
                name: '企业创新能力评价体系',
                code: 'IS001',
                description: '用于评估企业整体创新能力',
                targetType: '企业',
                status: 'active',
                indicators: [
                    {
                        id: 1,
                        code: 'KPI001',
                        name: '技术创新能力',
                        weight: 0.4,
                        customFormula: '(专利数 * 0.4 + 研发投入 * 0.6) * 100',
                        dataSource: '研发部门报告'
                    }
                ]
            }
        ]);
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleIndicatorWeightChange = (indicatorId, value) => {
        setFormData(prev => ({
            ...prev,
            indicators: prev.indicators.map(ind => 
                ind.id === indicatorId 
                    ? { ...ind, weight: parseFloat(value) }
                    : ind
            )
        }));
    };

    const handleIndicatorFormulaChange = (indicatorId, value) => {
        setFormData(prev => ({
            ...prev,
            indicators: prev.indicators.map(ind => 
                ind.id === indicatorId 
                    ? { ...ind, customFormula: value }
                    : ind
            )
        }));
    };

    const handleIndicatorDataSourceChange = (indicatorId, value) => {
        setFormData(prev => ({
            ...prev,
            indicators: prev.indicators.map(ind => 
                ind.id === indicatorId 
                    ? { ...ind, dataSource: value }
                    : ind
            )
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingSystem) {
            setSystems(systems.map(system => 
                system.id === editingSystem.id 
                    ? { ...formData, id: system.id }
                    : system
            ));
        } else {
            setSystems([...systems, { ...formData, id: Date.now() }]);
        }
        handleCloseModal();
    };

    const handleAddIndicator = (indicator) => {
        setFormData(prev => ({
            ...prev,
            indicators: [
                ...prev.indicators,
                {
                    ...indicator,
                    weight: 0,
                    customFormula: '',
                    dataSource: ''
                }
            ]
        }));
    };

    const handleRemoveIndicator = (indicatorId) => {
        setFormData(prev => ({
            ...prev,
            indicators: prev.indicators.filter(ind => ind.id !== indicatorId)
        }));
    };

    const handleEdit = (system) => {
        setEditingSystem(system);
        setFormData(system);
        setIsModalOpen(true);
    };

    const handleDelete = (systemId) => {
        if (window.confirm('确定要删除这个指标体系吗？')) {
            setSystems(systems.filter(system => system.id !== systemId));
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingSystem(null);
        setFormData({
            name: '',
            code: '',
            description: '',
            targetType: '',
            status: 'active',
            indicators: []
        });
    };

    return (
        <div className="content-container">
            <div className="system-header">
                <h2>指标体系管理</h2>
                <button onClick={() => setIsModalOpen(true)} className="add-button">
                    添加指标体系
                </button>
            </div>

            <div className="system-list">
                {systems.map(system => (
                    <div key={system.id} className="system-card">
                        <div className="system-card-header">
                            <h3>{system.name}</h3>
                            <div className="system-card-actions">
                                <button 
                                    onClick={() => handleEdit(system)}
                                    className="edit-button"
                                >
                                    编辑
                                </button>
                                <button 
                                    onClick={() => handleDelete(system.id)}
                                    className="delete-button"
                                >
                                    删除
                                </button>
                            </div>
                        </div>
                        <div className="system-info">
                            <p><strong>编码：</strong>{system.code}</p>
                            <p><strong>评价对象：</strong>{system.targetType}</p>
                            <p><strong>描述：</strong>{system.description}</p>
                            <p><strong>状态：</strong>
                                <span className={`status-badge ${system.status}`}>
                                    {system.status === 'active' ? '启用' : '禁用'}
                                </span>
                            </p>
                        </div>
                        <div className="system-indicators">
                            <h4>包含指标</h4>
                            <table>
                                <thead>
                                    <tr>
                                        <th>指标编码</th>
                                        <th>指标名称</th>
                                        <th>权重</th>
                                        <th>数据来源</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {system.indicators.map(indicator => (
                                        <tr key={indicator.id}>
                                            <td>{indicator.code}</td>
                                            <td>{indicator.name}</td>
                                            <td>{indicator.weight}</td>
                                            <td>{indicator.dataSource}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ))}
            </div>

            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h3>{editingSystem ? '编辑指标体系' : '添加指标体系'}</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>体系名称:</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>体系编码:</label>
                                    <input
                                        type="text"
                                        name="code"
                                        value={formData.code}
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
                                    <label>评价对象类型:</label>
                                    <input
                                        type="text"
                                        name="targetType"
                                        value={formData.targetType}
                                        onChange={handleInputChange}
                                        required
                                    />
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
                                <label>指标列表:</label>
                                <button
                                    type="button"
                                    onClick={() => setIsIndicatorSelectOpen(true)}
                                    className="add-indicator-button"
                                >
                                    添加指标
                                </button>
                                <div className="indicators-table">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>指标编码</th>
                                                <th>指标名称</th>
                                                <th>权重</th>
                                                <th>数据来源</th>
                                                <th>计算公式</th>
                                                <th>操作</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {formData.indicators.map(indicator => (
                                                <tr key={indicator.id}>
                                                    <td>{indicator.code}</td>
                                                    <td>{indicator.name}</td>
                                                    <td>
                                                        <input
                                                            type="number"
                                                            value={indicator.weight || 0}
                                                            onChange={(e) => handleIndicatorWeightChange(indicator.id, e.target.value)}
                                                            step="0.1"
                                                            min="0"
                                                            max="1"
                                                            className="table-input"
                                                        />
                                                    </td>
                                                    <td>
                                                        <input
                                                            type="text"
                                                            value={indicator.dataSource || ''}
                                                            onChange={(e) => handleIndicatorDataSourceChange(indicator.id, e.target.value)}
                                                            className="table-input"
                                                        />
                                                    </td>
                                                    <td>
                                                        <input
                                                            type="text"
                                                            value={indicator.customFormula || ''}
                                                            onChange={(e) => handleIndicatorFormulaChange(indicator.id, e.target.value)}
                                                            className="table-input"
                                                        />
                                                    </td>
                                                    <td>
                                                        <button
                                                            type="button"
                                                            onClick={() => handleRemoveIndicator(indicator.id)}
                                                            className="remove-indicator"
                                                        >
                                                            删除
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div className="modal-buttons">
                                <button type="submit" className="submit-button">
                                    {editingSystem ? '保存' : '创建'}
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

            {isIndicatorSelectOpen && (
                <div className="modal-overlay">
                    <div className="modal indicator-select-modal">
                        <h3>选择指标</h3>
                        <div className="indicator-list">
                            {indicators
                                .filter(ind => !formData.indicators.find(selected => selected.id === ind.id))
                                .map(indicator => (
                                    <div 
                                        key={indicator.id} 
                                        className="indicator-select-item"
                                        onClick={() => {
                                            handleAddIndicator(indicator);
                                            setIsIndicatorSelectOpen(false);
                                        }}
                                    >
                                        <div>{indicator.name}</div>
                                        <div className="indicator-code">{indicator.code}</div>
                                    </div>
                                ))
                            }
                        </div>
                        <div className="modal-buttons">
                            <button 
                                onClick={() => setIsIndicatorSelectOpen(false)}
                                className="cancel-button"
                            >
                                关闭
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default IndicatorSystemManagement; 