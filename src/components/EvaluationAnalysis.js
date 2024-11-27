import React, { useState, useEffect } from 'react';
import '../styles/evaluationAnalysis.css';

function EvaluationAnalysis() {
    const [evaluations, setEvaluations] = useState([]);
    const [filters, setFilters] = useState({
        startPeriod: '',
        endPeriod: '',
        systemId: '',
        objectId: '',
        status: ''
    });
    const [evaluationSystems, setEvaluationSystems] = useState([]);
    const [evaluationObjects, setEvaluationObjects] = useState([]);

    // 模拟初始数据
    useEffect(() => {
        // 模拟评价体系数据
        setEvaluationSystems([
            { id: 1, name: '企业创新能力评价体系' },
            { id: 2, name: '产品质量评价体系' }
        ]);

        // 模拟评价对象数据
        setEvaluationObjects([
            { id: 1, name: '企业A' },
            { id: 2, name: '企业B' }
        ]);

        // 模拟评价记录
        setEvaluations([
            {
                id: 1,
                period: '2024-Q1',
                evaluationDate: '2024-03-31',
                systemName: '企业创新能力评价体系',
                objectName: '企业A',
                status: 'completed',
                totalScore: 85.5,
                scores: [
                    { indicatorName: '技术创新能力', score: 88, weight: 0.4 },
                    { indicatorName: '客户满意度', score: 82, weight: 0.3 }
                ]
            },
            {
                id: 2,
                period: '2023-Q4',
                evaluationDate: '2023-12-31',
                systemName: '企业创新能力评价体系',
                objectName: '企业A',
                status: 'completed',
                totalScore: 83.2,
                scores: [
                    { indicatorName: '技术创新能力', score: 85, weight: 0.4 },
                    { indicatorName: '客户满意度', score: 80, weight: 0.3 }
                ]
            }
        ]);
    }, []);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSearch = () => {
        // 这里实现筛选逻辑
        // 实际项目中应该调用API进行查询
        const filteredEvaluations = evaluations.filter(evaluation => {
            if (filters.startPeriod && evaluation.period < filters.startPeriod) return false;
            if (filters.endPeriod && evaluation.period > filters.endPeriod) return false;
            if (filters.systemId && evaluation.systemId !== parseInt(filters.systemId)) return false;
            if (filters.objectId && evaluation.objectId !== parseInt(filters.objectId)) return false;
            if (filters.status && evaluation.status !== filters.status) return false;
            return true;
        });
        setEvaluations(filteredEvaluations);
    };

    const handleReset = () => {
        setFilters({
            startPeriod: '',
            endPeriod: '',
            systemId: '',
            objectId: '',
            status: ''
        });
    };

    const handleViewDetails = (evaluationId) => {
        // 实现查看详情功能
        console.log('View details for evaluation:', evaluationId);
    };

    return (
        <div className="content-container">
            <div className="analysis-header">
                <h2>评价查询</h2>
            </div>

            <div className="filter-section">
                <div className="filter-row">
                    <div className="filter-item">
                        <label>开始周期:</label>
                        <input
                            type="text"
                            name="startPeriod"
                            value={filters.startPeriod}
                            onChange={handleFilterChange}
                            placeholder="例如: 2024-Q1"
                        />
                    </div>
                    <div className="filter-item">
                        <label>结束周期:</label>
                        <input
                            type="text"
                            name="endPeriod"
                            value={filters.endPeriod}
                            onChange={handleFilterChange}
                            placeholder="例如: 2024-Q4"
                        />
                    </div>
                    <div className="filter-item">
                        <label>评价体系:</label>
                        <select
                            name="systemId"
                            value={filters.systemId}
                            onChange={handleFilterChange}
                        >
                            <option value="">全部</option>
                            {evaluationSystems.map(system => (
                                <option key={system.id} value={system.id}>
                                    {system.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="filter-item">
                        <label>评价对象:</label>
                        <select
                            name="objectId"
                            value={filters.objectId}
                            onChange={handleFilterChange}
                        >
                            <option value="">全部</option>
                            {evaluationObjects.map(object => (
                                <option key={object.id} value={object.id}>
                                    {object.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="filter-item">
                        <label>状态:</label>
                        <select
                            name="status"
                            value={filters.status}
                            onChange={handleFilterChange}
                        >
                            <option value="">全部</option>
                            <option value="completed">已完成</option>
                            <option value="draft">草稿</option>
                        </select>
                    </div>
                </div>
                <div className="filter-buttons">
                    <button onClick={handleSearch} className="search-button">
                        查询
                    </button>
                    <button onClick={handleReset} className="reset-button">
                        重置
                    </button>
                </div>
            </div>

            <div className="evaluation-results">
                <table>
                    <thead>
                        <tr>
                            <th>评价周期</th>
                            <th>评价日期</th>
                            <th>评价体系</th>
                            <th>评价对象</th>
                            <th>总分</th>
                            <th>状态</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        {evaluations.map(evaluation => (
                            <tr key={evaluation.id}>
                                <td>{evaluation.period}</td>
                                <td>{evaluation.evaluationDate}</td>
                                <td>{evaluation.systemName}</td>
                                <td>{evaluation.objectName}</td>
                                <td>{evaluation.totalScore.toFixed(2)}</td>
                                <td>
                                    <span className={`status-badge ${evaluation.status}`}>
                                        {evaluation.status === 'completed' ? '已完成' : '草稿'}
                                    </span>
                                </td>
                                <td>
                                    <button
                                        onClick={() => handleViewDetails(evaluation.id)}
                                        className="view-button"
                                    >
                                        查看详情
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default EvaluationAnalysis; 