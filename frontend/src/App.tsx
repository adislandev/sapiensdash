import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { PrivateRoute } from './components/PrivateRoute';
import { AdminRoute } from './components/AdminRoute';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { EnemPage } from './pages/EnemPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Rota raiz - redireciona para dashboard */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            
            {/* Rota de login - pública */}
            <Route path="/login" element={<LoginPage />} />
            
            {/* Rotas protegidas */}
            <Route 
              path="/dashboard" 
              element={
                <PrivateRoute>
                  <DashboardPage />
                </PrivateRoute>
              } 
            />
            
            {/* Rota do ENEM */}
            <Route 
              path="/enem" 
              element={
                <PrivateRoute>
                  <EnemPage />
                </PrivateRoute>
              } 
            />
            
            {/* Rotas de administrador */}
            <Route 
              path="/admin/users" 
              element={
                <AdminRoute>
                  <div className="min-h-screen bg-gray-50 p-6">
                    <div className="max-w-7xl mx-auto">
                      <h1 className="text-3xl font-bold text-gray-900 mb-6">
                        Gerenciamento de Usuários
                      </h1>
                      <div className="bg-white rounded-lg shadow-sm p-6">
                        <p className="text-gray-600">
                          Página de gerenciamento de usuários em desenvolvimento...
                        </p>
                      </div>
                    </div>
                  </div>
                </AdminRoute>
              } 
            />
            
            {/* Rota de perfil */}
            <Route 
              path="/profile" 
              element={
                <PrivateRoute>
                  <div className="min-h-screen bg-gray-50 p-6">
                    <div className="max-w-7xl mx-auto">
                      <h1 className="text-3xl font-bold text-gray-900 mb-6">
                        Perfil do Usuário
                      </h1>
                      <div className="bg-white rounded-lg shadow-sm p-6">
                        <p className="text-gray-600">
                          Página de perfil em desenvolvimento...
                        </p>
                      </div>
                    </div>
                  </div>
                </PrivateRoute>
              } 
            />
            
            {/* Rota 404 - redireciona para dashboard */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App; 