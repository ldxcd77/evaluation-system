import React, { useState, useEffect } from 'react';
import '../styles/evaluationManagement.css';

function EvaluationManagement() {
    const [evaluations, setEvaluations] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [evaluationSystems, setEvaluationSystems] = useState([]);
    const [evaluationObjects, setEvaluationObjects] = useState([]);
    const [selectedSystem, setSelectedSystem] = useState(null);
    const [selectedObject, setSelectedObject] = useState(null);
    const [formData, setFormData] = useState({
        systemId: '',
        objectId: '',
        period: '',
        evaluationDate: '',
        status: 'draft',
        scores: []
    });

    // 模拟初始数据
    useEffect(() => {
        // 模拟评价体系数据
        setEvaluationSystems([
            {
                id: 1,
                name: '企业创新能力评价体系',
                indicators: [
                    {
                        id: 1,
                        name: '技术创新能力',
                        weight: 0.4,
                        customFormula: '(专利数 * 0.4 + 研发投入 * 0.6) * 100'
                    },
                    {
                        id: 2,
                        name: '客户满意度',
                        weight: 0.3,
                        customFormula: '(满意客户数 / 总客户数) * 100'
                    }
                ]
            }
        ]);

        // 模拟评价对象数据
        setEvaluationObjects([
            {
                id: 1,
                name: '企业A',
                type: '企业'
            }
        ]);

        // 模拟评价记录
        setEvaluations([
            {
                id: 1,
                systemName: '企业创新能力评价体系',
                objectName: '企业A',
                period: '2024-Q1',
                evaluationDate: '2024-03-31',
                status: 'completed',
                totalScore: 85.5,
                scores: [
                    { indicatorName: '技术创新能力', score: 88, weight: 0.4 },
                    { indicatorName: '客户满意度', score: 82, weight: 0.3 }
                ]
            }
        ]);
    }, []);

    const handleSystemChange = (e) => {
        const system = evaluationSystems.find(s => s.id === parseInt(e.target.value));
        setSelectedSystem(system);
        setFormData(prev => ({
            ...prev,
            systemId: e.target.value,
            scores: system ? system.indicators.map(indicator => ({
                indicatorId: indicator.id,
                indicatorName: indicator.name,
                weight: indicator.weight,
                score: 0,
                rawData: {}
            })) : []
        }));
    };

    const handleObjectChange = (e) => {
        const object = evaluationObjects.find(o => o.id === parseInt(e.target.value));
        setSelectedObject(object);
        setFormData(prev => ({
            ...prev,
            objectId: e.target.value
        }));
    };

    const handleScoreChange = (indicatorId, value) => {
        setFormData(prev => ({
            ...prev,
            scores: prev.scores.map(score =>
                score.indicatorId === indicatorId
                    ? { ...score, score: parseFloat(value) || 0 }
                    : score
            )
        }));
    };

    const handleRawDataChange = (indicatorId, field, value) => {
        setFormData(prev => ({
            ...prev,
            scores: prev.scores.map(score =>
                score.indicatorId === indicatorId
                    ? {
                        ...score,
                        rawData: {
                            ...score.rawData,
                            [field]: parseFloat(value) || 0
                        }
                    }
                    : score
            )
        }));
    };

    const calculateScore = (indicator, rawData) => {
        // 这里应该根据指标的计算公式计算得分
        // 示例实现
        if (indicator.customFormula.includes('专利数')) {
            const patentCount = rawData.patentCount || 0;
            const rdInvestment = rawData.rdInvestment || 0;
            return (patentCount * 0.4 + rdInvestment * 0.6) * 100;
        }
        return 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const system = evaluationSystems.find(s => s.id === parseInt(formData.systemId));
        const object = evaluationObjects.find(o => o.id === parseInt(formData.objectId));
        
        const totalScore = formData.scores.reduce((sum, score) => {
            return sum + (score.score * score.weight);
        }, 0);

        const newEvaluation = {
            id: Date.now(),
            systemName: system.name,
            objectName: object.name,
            period: formData.period,
            evaluationDate: formData.evaluationDate,
            status: formData.status,
            totalScore,
            scores: formData.scores
        };

        setEvaluations([...evaluations, newEvaluation]);
        handleCloseModal();
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedSystem(null);
        setSelectedObject(null);
        setFormData({
            systemId: '',
            objectId: '',
            period: '',
            evaluationDate: '',
            status: 'draft',
            scores: []
        });
    };

    return (
        <div className="content-container">
            <div className="evaluation-header">
                <h2>评价管理</h2>
                <button onClick={() => setIsModalOpen(true)} className="add-button">
                    新建评价
                </button>
            </div>

            <div className="evaluation-list">
                <table>
                    <thead>
                        <tr>
                            <th>评价体系</th>
                            <th>评价对象</th>
                            <th>评价周期</th>
                            <th>评价日期</th>
                            <th>总分</th>
                            <th>状态</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        {evaluations.map(evaluation => (
                            <tr key={evaluation.id}>
                                <td>{evaluation.systemName}</td>
                                <td>{evaluation.objectName}</td>
                                <td>{evaluation.period}</td>
                                <td>{evaluation.evaluationDate}</td>
                                <td>{evaluation.totalScore.toFixed(2)}</td>
                                <td>
                                    <span className={`status-badge ${evaluation.status}`}>
                                        {evaluation.status === 'completed' ? '已完成' : '草稿'}
                                    </span>
                                </td>
                                <td>
                                    <button className="view-button">查看详情</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal evaluation-modal">
                        <h3>新建评价</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>评价体系:</label>
                                    <select
                                        value={formData.systemId}
                                        onChange={handleSystemChange}
                                        required
                                    >
                                        <option value="">请选择评价体系</option>
                                        {evaluationSystems.map(system => (
                                            <option key={system.id} value={system.id}>
                                                {system.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>评价对象:</label>
                                    <select
                                        value={formData.objectId}
                                        onChange={handleObjectChange}
                                        required
                                    >
                                        <option value="">请选择评价对象</option>
                                        {evaluationObjects.map(object => (
                                            <option key={object.id} value={object.id}>
                                                {object.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>评价周期:</label>
                                    <input
                                        type="text"
                                        value={formData.period}
                                        onChange={(e) => setFormData(prev => ({ ...prev, period: e.target.value }))}
                                        placeholder="例如: 2024-Q1"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>评价日期:</label>
                                    <input
                                        type="date"
                                        value={formData.evaluationDate}
                                        onChange={(e) => setFormData(prev => ({ ...prev, evaluationDate: e.target.value }))}
                                        required
                                    />
                                </div>
                            </div>

                            {selectedSystem && (
                                <div className="evaluation-scores">
                                    <h4>指标评分</h4>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>指标名称</th>
                                                <th>权重</th>
                                                <th>原始数据</th>
                                                <th>得分</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {formData.scores.map(score => (
                                                <tr key={score.indicatorId}>
                                                    <td>{score.indicatorName}</td>
                                                    <td>{score.weight}</td>
                                                    <td className="raw-data-cell">
                                                        {score.indicatorName === '技术创新能力' && (
                                                            <>
                                                                <input
                                                                    type="number"
                                                                    placeholder="专利数"
                                                                    value={score.rawData.patentCount || ''}
                                                                    onChange={(e) => handleRawDataChange(score.indicatorId, 'patentCount', e.target.value)}
                                                                />
                                                                <input
                                                                    type="number"
                                                                    placeholder="研发投入"
                                                                    value={score.rawData.rdInvestment || ''}
                                                                    onChange={(e) => handleRawDataChange(score.indicatorId, 'rdInvestment', e.target.value)}
                                                                />
                                                            </>
                                                        )}
                                                    </td>
                                                    <td>
                                                        <input
                                                            type="number"
                                                            value={score.score}
                                                            onChange={(e) => handleScoreChange(score.indicatorId, e.target.value)}
                                                            min="0"
                                                            max="100"
                                                            required
                                                        />
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}

                            <div className="form-group">
                                <label>状态:</label>
                                <select
                                    value={formData.status}
                                    onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                                >
                                    <option value="draft">草稿</option>
                                    <option value="completed">完成</option>
                                </select>
                            </div>

                            <div className="modal-buttons">
                                <button type="submit" className="submit-button">
                                    保存评价
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

export default EvaluationManagement; 