import React, { useState, useEffect, useMemo } from 'react';
import '../styles/roleManagement.css';

function RoleManagement() {
    const [roles, setRoles] = useState([]);
    const [editingRole, setEditingRole] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        code: '',
        description: '',
        permissions: [],
        status: 'active'
    });

    // 使用 useMemo 来缓存权限列表
    const availablePermissions = useMemo(() => [
        { id: 1, name: '用户管理', code: 'user:manage' },
        { id: 2, name: '角色管理', code: 'role:manage' },
        { id: 3, name: '指标管理', code: 'indicator:manage' },
        { id: 4, name: '指标体系管理', code: 'indicator-system:manage' },
        { id: 5, name: '评价对象管理', code: 'evaluation-object:manage' },
        { id: 6, name: '数据查看', code: 'data:view' },
        { id: 7, name: '数据编辑', code: 'data:edit' },
    ], []);

    // 模拟初始数据
    useEffect(() => {
        setRoles([
            {
                id: 1,
                name: '超级管理员',
                code: 'super_admin',
                description: '系统最高权限角色',
                permissions: availablePermissions.map(p => p.id),
                status: 'active'
            },
            {
                id: 2,
                name: '普通用户',
                code: 'normal_user',
                description: '基础功能访问权限',
                permissions: [6],
                status: 'active'
            }
        ]);
    }, [availablePermissions]);

    const handleInputChange = (e) => {
        const { name, value, type } = e.target;
        if (type === 'checkbox') {
            const permissionId = parseInt(value);
            setFormData(prev => ({
                ...prev,
                permissions: e.target.checked
                    ? [...prev.permissions, permissionId]
                    : prev.permissions.filter(id => id !== permissionId)
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingRole) {
            // 更新角色
            setRoles(roles.map(role => 
                role.id === editingRole.id 
                    ? { ...formData, id: role.id }
                    : role
            ));
        } else {
            // 创建新角色
            setRoles([...roles, { ...formData, id: Date.now() }]);
        }
        handleCloseModal();
    };

    const handleEdit = (role) => {
        setEditingRole(role);
        setFormData(role);
        setIsModalOpen(true);
    };

    const handleDelete = (roleId) => {
        if (window.confirm('确定要删除这个角色吗？')) {
            setRoles(roles.filter(role => role.id !== roleId));
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingRole(null);
        setFormData({
            name: '',
            code: '',
            description: '',
            permissions: [],
            status: 'active'
        });
    };

    return (
        <div className="content-container">
            <div className="role-header">
                <h2>角色管理</h2>
                <button onClick={() => setIsModalOpen(true)} className="add-button">
                    添加角色
                </button>
            </div>

            <div className="role-table">
                <table>
                    <thead>
                        <tr>
                            <th>角色名称</th>
                            <th>角色编码</th>
                            <th>描述</th>
                            <th>权限数量</th>
                            <th>状态</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        {roles.map(role => (
                            <tr key={role.id}>
                                <td>{role.name}</td>
                                <td>{role.code}</td>
                                <td>{role.description}</td>
                                <td>{role.permissions.length}</td>
                                <td>
                                    <span className={`status-badge ${role.status}`}>
                                        {role.status === 'active' ? '启用' : '禁用'}
                                    </span>
                                </td>
                                <td>
                                    <button 
                                        onClick={() => handleEdit(role)}
                                        className="edit-button"
                                    >
                                        编辑
                                    </button>
                                    <button 
                                        onClick={() => handleDelete(role.id)}
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
                        <h3>{editingRole ? '编辑角色' : '添加角色'}</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>角色名称:</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>角色编码:</label>
                                <input
                                    type="text"
                                    name="code"
                                    value={formData.code}
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
                            <div className="form-group">
                                <label>权限:</label>
                                <div className="permissions-grid">
                                    {availablePermissions.map(permission => (
                                        <label key={permission.id} className="permission-item">
                                            <input
                                                type="checkbox"
                                                value={permission.id}
                                                checked={formData.permissions.includes(permission.id)}
                                                onChange={handleInputChange}
                                            />
                                            <span>{permission.name}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                            <div className="modal-buttons">
                                <button type="submit" className="submit-button">
                                    {editingRole ? '保存' : '创建'}
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

export default RoleManagement; 