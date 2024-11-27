import React, { useState, useEffect } from 'react';
import '../styles/userManagement.css';

function UserManagement() {
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        employeeId: '',
        name: '',
        phone: '',
        password: '',
        status: 'active',
        enabled: true,
        email: '',
        department: '',
        role: 'user'
    });

    // 模拟初始数据
    useEffect(() => {
        setUsers([
            {
                id: 1,
                employeeId: 'EMP001',
                name: '张三',
                phone: '13800138000',
                status: 'active',
                enabled: true,
                email: 'zhangsan@example.com',
                department: '技术部',
                role: 'admin'
            },
            // 可以添加更多模拟数据
        ]);
    }, []);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingUser) {
            // 更新用户
            setUsers(users.map(user => 
                user.id === editingUser.id 
                    ? { ...formData, id: user.id }
                    : user
            ));
        } else {
            // 创建新用户
            setUsers([...users, { ...formData, id: Date.now() }]);
        }
        handleCloseModal();
    };

    const handleEdit = (user) => {
        setEditingUser(user);
        setFormData(user);
        setIsModalOpen(true);
    };

    const handleDelete = (userId) => {
        if (window.confirm('确定要删除这个用户吗？')) {
            setUsers(users.filter(user => user.id !== userId));
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingUser(null);
        setFormData({
            employeeId: '',
            name: '',
            phone: '',
            password: '',
            status: 'active',
            enabled: true,
            email: '',
            department: '',
            role: 'user'
        });
    };

    return (
        <div className="user-management">
            <div className="user-header">
                <h2>用户管理</h2>
                <button onClick={() => setIsModalOpen(true)} className="add-button">
                    添加用户
                </button>
            </div>

            <div className="user-table">
                <table>
                    <thead>
                        <tr>
                            <th>工号</th>
                            <th>姓名</th>
                            <th>联系方式</th>
                            <th>邮箱</th>
                            <th>部门</th>
                            <th>角色</th>
                            <th>状态</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td>{user.employeeId}</td>
                                <td>{user.name}</td>
                                <td>{user.phone}</td>
                                <td>{user.email}</td>
                                <td>{user.department}</td>
                                <td>{user.role}</td>
                                <td>
                                    <span className={`status-badge ${user.status}`}>
                                        {user.status === 'active' ? '启用' : '禁用'}
                                    </span>
                                </td>
                                <td>
                                    <button 
                                        onClick={() => handleEdit(user)}
                                        className="edit-button"
                                    >
                                        编辑
                                    </button>
                                    <button 
                                        onClick={() => handleDelete(user.id)}
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
                        <h3>{editingUser ? '编辑用户' : '添加用户'}</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>工号:</label>
                                <input
                                    type="text"
                                    name="employeeId"
                                    value={formData.employeeId}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>姓名:</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>联系方式:</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>邮箱:</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>部门:</label>
                                <input
                                    type="text"
                                    name="department"
                                    value={formData.department}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>角色:</label>
                                <select
                                    name="role"
                                    value={formData.role}
                                    onChange={handleInputChange}
                                >
                                    <option value="user">普通用户</option>
                                    <option value="admin">管理员</option>
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
                            {!editingUser && (
                                <div className="form-group">
                                    <label>密码:</label>
                                    <input
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        required={!editingUser}
                                    />
                                </div>
                            )}
                            <div className="modal-buttons">
                                <button type="submit" className="submit-button">
                                    {editingUser ? '保存' : '创建'}
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

export default UserManagement; 