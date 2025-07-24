import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Dashboard from "./Dashboard";

const MainPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  const menuItems = [
    {
      id: "dashboard",
      name: "Dashboard Principal",
      icon: "📊",
      description: "Visão geral do desempenho"
    },
    {
      id: "units",
      name: "Análise por Unidade",
      icon: "🏫",
      description: "América, Mangueiras, Intensivo"
    },
    {
      id: "subjects",
      name: "Por Disciplina",
      icon: "📚",
      description: "Análise detalhada por matéria"
    },
    {
      id: "ranking",
      name: "Rankings",
      icon: "🏆",
      description: "Posicionamento e comparações"
    },
    {
      id: "reports",
      name: "Relatórios",
      icon: "📋",
      description: "Documentos e exportações"
    },
    {
      id: "profile",
      name: "Perfil",
      icon: "👤",
      description: "Configurações do usuário"
    }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "units":
        return (
          <div className="glass-effect rounded-2xl shadow-soft p-8 animate-fade-in">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-sapiens-primary to-sapiens-secondary rounded-xl flex items-center justify-center mr-4">
                <span className="text-white text-xl font-bold">🏫</span>
              </div>
              <h2 className="text-3xl font-bold gradient-text">Análise por Unidade</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-america-light to-blue-50 p-6 rounded-xl border border-america-primary/20">
                <h3 className="text-xl font-bold text-america-dark mb-2">🏛️ Unidade América</h3>
                <p className="text-america-dark/70">Análise detalhada em desenvolvimento...</p>
              </div>
              <div className="bg-gradient-to-br from-mangueiras-light to-green-50 p-6 rounded-xl border border-mangueiras-primary/20">
                <h3 className="text-xl font-bold text-mangueiras-dark mb-2">🌳 Unidade Mangueiras</h3>
                <p className="text-mangueiras-dark/70">Análise detalhada em desenvolvimento...</p>
              </div>
              <div className="bg-gradient-to-br from-intensivo-light to-purple-50 p-6 rounded-xl border border-intensivo-primary/20">
                <h3 className="text-xl font-bold text-intensivo-dark mb-2">⚡ Unidade Intensivo</h3>
                <p className="text-intensivo-dark/70">Análise detalhada em desenvolvimento...</p>
              </div>
            </div>
          </div>
        );
      case "subjects":
        return (
          <div className="glass-effect rounded-2xl shadow-soft p-8 animate-fade-in">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-sapiens-primary to-sapiens-secondary rounded-xl flex items-center justify-center mr-4">
                <span className="text-white text-xl font-bold">📚</span>
              </div>
              <h2 className="text-3xl font-bold gradient-text">Análise por Disciplina</h2>
            </div>
            <p className="text-sapiens-dark/70 text-lg">Análise detalhada por disciplinas em desenvolvimento...</p>
          </div>
        );
      case "ranking":
        return (
          <div className="glass-effect rounded-2xl shadow-soft p-8 animate-fade-in">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-sapiens-primary to-sapiens-secondary rounded-xl flex items-center justify-center mr-4">
                <span className="text-white text-xl font-bold">🏆</span>
              </div>
              <h2 className="text-3xl font-bold gradient-text">Rankings e Comparações</h2>
            </div>
            <p className="text-sapiens-dark/70 text-lg">Sistema de rankings em desenvolvimento...</p>
          </div>
        );
      case "reports":
        return (
          <div className="glass-effect rounded-2xl shadow-soft p-8 animate-fade-in">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-sapiens-primary to-sapiens-secondary rounded-xl flex items-center justify-center mr-4">
                <span className="text-white text-xl font-bold">📋</span>
              </div>
              <h2 className="text-3xl font-bold gradient-text">Relatórios e Exportações</h2>
            </div>
            <p className="text-sapiens-dark/70 text-lg">Sistema de relatórios em desenvolvimento...</p>
          </div>
        );
      case "profile":
        return (
          <div className="glass-effect rounded-2xl shadow-soft p-8 animate-fade-in">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-sapiens-primary to-sapiens-secondary rounded-xl flex items-center justify-center mr-4">
                <span className="text-white text-xl font-bold">👤</span>
              </div>
              <h2 className="text-3xl font-bold gradient-text">Perfil do Usuário</h2>
            </div>
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-sapiens-light to-blue-50 p-6 rounded-xl border border-sapiens-accent/20">
                <label className="block text-sm font-semibold text-sapiens-dark mb-2">
                  📧 E-mail Institucional
                </label>
                <p className="text-lg text-gray-800 font-medium">
                  {currentUser?.email}
                </p>
              </div>
              <div className="bg-gradient-to-r from-gray-50 to-sapiens-light p-6 rounded-xl border border-gray-200">
                <label className="block text-sm font-semibold text-sapiens-dark mb-2">
                  🔑 ID do Usuário
                </label>
                <p className="text-sm text-gray-600 font-mono bg-white p-3 rounded-lg border">
                  {currentUser?.uid}
                </p>
              </div>
              <div className="bg-gradient-to-r from-sapiens-light to-blue-50 p-6 rounded-xl border border-sapiens-accent/20">
                <label className="block text-sm font-semibold text-sapiens-dark mb-2">
                  🏢 Instituição
                </label>
                <p className="text-lg text-gray-800 font-medium">
                  Colégio Sapiens - Grupo Educacional
                </p>
              </div>
            </div>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-sapiens-light/30 to-blue-50">
      {/* Top Navigation */}
      <nav className="glass-effect border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between h-20">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-gradient-to-br from-sapiens-primary to-sapiens-secondary rounded-xl flex items-center justify-center shadow-medium">
                <span className="text-white text-2xl font-bold">📊</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold gradient-text">
                  Colégio Sapiens
                </h1>
                <p className="text-sm text-sapiens-dark/70 font-medium">
                  Dashboard ENEM 2024 - Sistema de Análise Pedagógica
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="text-right">
                <p className="text-sm text-sapiens-dark/70">Bem-vindo(a),</p>
                <p className="text-sm font-semibold text-sapiens-dark">
                  {currentUser?.email?.split('@')[0]}
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 shadow-medium hover:shadow-lg transform hover:-translate-y-0.5"
              >
                🚪 Sair
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Enhanced Sidebar */}
        <div className="w-80 glass-effect min-h-screen border-r border-white/20">
          <div className="p-6">
            <div className="mb-8">
              <h3 className="text-xl font-bold text-sapiens-dark mb-2">Menu de Navegação</h3>
              <p className="text-sm text-sapiens-dark/70 mb-4">Acesse as diferentes seções do sistema</p>
              <div className="w-16 h-1 bg-gradient-to-r from-sapiens-primary to-sapiens-secondary rounded-full"></div>
            </div>
            
            <nav className="space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full text-left p-4 rounded-xl text-sm font-semibold transition-all duration-200 flex items-start space-x-4 group ${
                    activeTab === item.id
                      ? "bg-gradient-to-r from-sapiens-primary to-sapiens-secondary text-white shadow-medium transform scale-102"
                      : "text-sapiens-dark hover:bg-sapiens-light/50 hover:transform hover:scale-102"
                  }`}
                >
                  <span className="text-xl flex-shrink-0 group-hover:animate-bounce-slow">
                    {item.icon}
                  </span>
                  <div className="flex-1">
                    <div className="font-semibold">{item.name}</div>
                    <div className={`text-xs mt-1 ${
                      activeTab === item.id ? "text-white/80" : "text-sapiens-dark/60"
                    }`}>
                      {item.description}
                    </div>
                  </div>
                </button>
              ))}
            </nav>

            {/* Quick Stats in Sidebar */}
            <div className="mt-8 p-4 bg-gradient-to-br from-sapiens-light/50 to-blue-50 rounded-xl border border-sapiens-accent/20">
              <h4 className="font-semibold text-sapiens-dark mb-3">📈 Status do Sistema</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-sapiens-dark/70">Dados ENEM 2024:</span>
                  <span className="font-medium text-sapiens-warning">Em Processamento</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sapiens-dark/70">Última Atualização:</span>
                  <span className="font-medium text-sapiens-dark">Hoje</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sapiens-dark/70">Unidades Ativas:</span>
                  <span className="font-medium text-sapiens-success">3/3</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default MainPage;