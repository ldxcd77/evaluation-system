import React, { useState, useEffect } from 'react';
import '../styles/evaluationObjectManagement.css';

function EvaluationObjectManagement() {
    const [objects, setObjects] = useState([]);
    const [editingObject, setEditingObject] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDatasetModalOpen, setIsDatasetModalOpen] = useState(false);
    const [selectedObjectId, setSelectedObjectId] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        code: '',
        type: '',
        description: '',
        status: 'active',
        dataset: {
            name: '',
            source: '',
            groupByFields: [],
            fields: []
        }
    });

    // 模拟数据字段列表
    const availableFields = [
        { id: 1, name: 'year', label: '年份', type: 'number' },
        { id: 2, name: 'quarter', label: '季度', type: 'number' },
        { id: 3, name: 'department', label: '部门', type: 'string' },
        { id: 4, name: 'region', label: '地区', type: 'string' },
        { id: 5, name: 'revenue', label: '收入', type: 'number' },
        { id: 6, name: 'cost', label: '成本', type: 'number' },
        { id: 7, name: 'profit', label: '利润', type: 'number' }
    ];

    // 模拟初始数据
    useEffect(() => {
        setObjects([
            {
                id: 1,
                name: '企业A',
                code: 'ENT001',
                type: '企业',
                description: '测试企业A',
                status: 'active',
                dataset: {
                    name: '企业财务数据',
                    source: 'financial_data',
                    groupByFields: ['year', 'quarter'],
                    fields: ['revenue', 'cost', 'profit']
                }
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

    const handleDatasetChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            dataset: {
                ...prev.dataset,
                [name]: value
            }
        }));
    };

    const handleFieldToggle = (fieldName) => {
        setFormData(prev => ({
            ...prev,
            dataset: {
                ...prev.dataset,
                fields: prev.dataset.fields.includes(fieldName)
                    ? prev.dataset.fields.filter(f => f !== fieldName)
                    : [...prev.dataset.fields, fieldName]
            }
        }));
    };

    const handleGroupByToggle = (fieldName) => {
        setFormData(prev => ({
            ...prev,
            dataset: {
                ...prev.dataset,
                groupByFields: prev.dataset.groupByFields.includes(fieldName)
                    ? prev.dataset.groupByFields.filter(f => f !== fieldName)
                    : [...prev.dataset.groupByFields, fieldName]
            }
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingObject) {
            setObjects(objects.map(obj => 
                obj.id === editingObject.id 
                    ? { ...formData, id: obj.id }
                    : obj
            ));
        } else {
            setObjects([...objects, { ...formData, id: Date.now() }]);
        }
        handleCloseModal();
    };

    const handleEdit = (object) => {
        setEditingObject(object);
        setFormData(object);
        setIsModalOpen(true);
    };

    const handleDelete = (objectId) => {
        if (window.confirm('确定要删除这个评价对象吗？')) {
            setObjects(objects.filter(obj => obj.id !== objectId));
        }
    };

    const handleConfigureDataset = (objectId) => {
        const object = objects.find(obj => obj.id === objectId);
        setSelectedObjectId(objectId);
        setFormData(prev => ({
            ...prev,
            dataset: object.dataset
        }));
        setIsDatasetModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setIsDatasetModalOpen(false);
        setEditingObject(null);
        setSelectedObjectId(null);
        setFormData({
            name: '',
            code: '',
            type: '',
            description: '',
            status: 'active',
            dataset: {
                name: '',
                source: '',
                groupByFields: [],
                fields: []
            }
        });
    };

    const handleSaveDataset = () => {
        setObjects(objects.map(obj => 
            obj.id === selectedObjectId
                ? { ...obj, dataset: formData.dataset }
                : obj
        ));
        setIsDatasetModalOpen(false);
    };

    return (
        <div className="content-container">
            <div className="object-header">
                <h2>评价对象管理</h2>
                <button onClick={() => setIsModalOpen(true)} className="add-button">
                    添加评价对象
                </button>
            </div>

            <div className="object-list">
                {objects.map(object => (
                    <div key={object.id} className="object-card">
                        <div className="object-card-header">
                            <h3>{object.name}</h3>
                            <div className="object-card-actions">
                                <button 
                                    onClick={() => handleConfigureDataset(object.id)}
                                    className="config-button"
                                >
                                    配置数据集
                                </button>
                                <button 
                                    onClick={() => handleEdit(object)}
                                    className="edit-button"
                                >
                                    编辑
                                </button>
                                <button 
                                    onClick={() => handleDelete(object.id)}
                                    className="delete-button"
                                >
                                    删除
                                </button>
                            </div>
                        </div>
                        <div className="object-info">
                            <p><strong>编码：</strong>{object.code}</p>
                            <p><strong>类型：</strong>{object.type}</p>
                            <p><strong>描述：</strong>{object.description}</p>
                            <p><strong>状态：</strong>
                                <span className={`status-badge ${object.status}`}>
                                    {object.status === 'active' ? '启用' : '禁用'}
                                </span>
                            </p>
                        </div>
                        <div className="dataset-info">
                            <h4>数据集配置</h4>
                            <p><strong>数据集名称：</strong>{object.dataset.name}</p>
                            <p><strong>数据源：</strong>{object.dataset.source}</p>
                            <p><strong>分组字段：</strong>{object.dataset.groupByFields.join(', ')}</p>
                            <p><strong>数据字段：</strong>{object.dataset.fields.join(', ')}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* 评价对象基本信息编辑模态框 */}
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h3>{editingObject ? '编辑评价对象' : '添加评价对象'}</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>名称:</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>编码:</label>
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
                                <label>类型:</label>
                                <input
                                    type="text"
                                    name="type"
                                    value={formData.type}
                                    onChange={handleInputChange}
                                    required
                                />
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

                            <div className="modal-buttons">
                                <button type="submit" className="submit-button">
                                    {editingObject ? '保存' : '创建'}
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

            {/* 数据集配置模态框 */}
            {isDatasetModalOpen && (
                <div className="modal-overlay">
                    <div className="modal dataset-modal">
                        <h3>配置数据集</h3>
                        <div className="dataset-form">
                            <div className="form-group">
                                <label>数据集名称:</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.dataset.name}
                                    onChange={handleDatasetChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>数据源:</label>
                                <input
                                    type="text"
                                    name="source"
                                    value={formData.dataset.source}
                                    onChange={handleDatasetChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>分组字段:</label>
                                <div className="field-grid">
                                    {availableFields.map(field => (
                                        <label key={field.id} className="field-item">
                                            <input
                                                type="checkbox"
                                                checked={formData.dataset.groupByFields.includes(field.name)}
                                                onChange={() => handleGroupByToggle(field.name)}
                                            />
                                            <span>{field.label}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="form-group">
                                <label>数据字段:</label>
                                <div className="field-grid">
                                    {availableFields.map(field => (
                                        <label key={field.id} className="field-item">
                                            <input
                                                type="checkbox"
                                                checked={formData.dataset.fields.includes(field.name)}
                                                onChange={() => handleFieldToggle(field.name)}
                                            />
                                            <span>{field.label}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="modal-buttons">
                                <button 
                                    type="button" 
                                    onClick={handleSaveDataset}
                                    className="submit-button"
                                >
                                    保存配置
                                </button>
                                <button 
                                    type="button" 
                                    onClick={handleCloseModal}
                                    className="cancel-button"
                                >
                                    取消
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default EvaluationObjectManagement; 