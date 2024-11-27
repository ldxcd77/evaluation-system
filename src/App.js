import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import './styles/global.css';
import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';
import Dashboard from './components/Dashboard';
import Metrics from './components/Metrics';
import UserManagement from './components/UserManagement';
import Login from './components/Login';
import IndicatorManagement from './components/IndicatorManagement';
import IndicatorSystemManagement from './components/IndicatorSystemManagement';
import EvaluationObjectManagement from './components/EvaluationObjectManagement';
import PrivateRoute from './components/PrivateRoute';
import RoleManagement from './components/RoleManagement';
import EvaluationManagement from './components/EvaluationManagement';
import EvaluationAnalysis from './components/EvaluationAnalysis';

function App() {
    return (
        <Provider store={store}>
            <Router>
                <div className="app-container">
                    <Sidebar />
                    <div className="main-content">
                        <Header />
                        <div className="page-content">
                            <Routes>
                                <Route path="/login" element={<Login />} />
                                <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                                <Route path="/metrics" element={<PrivateRoute><Metrics /></PrivateRoute>} />
                                <Route path="/user-management" element={<PrivateRoute><UserManagement /></PrivateRoute>} />
                                <Route path="/indicator-management" element={<PrivateRoute><IndicatorManagement /></PrivateRoute>} />
                                <Route path="/indicator-system-management" element={<PrivateRoute><IndicatorSystemManagement /></PrivateRoute>} />
                                <Route path="/evaluation-object-management" element={<PrivateRoute><EvaluationObjectManagement /></PrivateRoute>} />
                                <Route path="/user-roles" element={<PrivateRoute><RoleManagement /></PrivateRoute>} />
                                <Route path="/evaluation" element={<PrivateRoute><EvaluationManagement /></PrivateRoute>} />
                                <Route path="/evaluation-analysis" element={<PrivateRoute><EvaluationAnalysis /></PrivateRoute>} />
                            </Routes>
                        </div>
                    </div>
                </div>
            </Router>
        </Provider>
    );
}

export default App; 