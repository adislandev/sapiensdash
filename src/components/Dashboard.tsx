import React from "react";

const Dashboard = () => {
  const units = [
    {
      name: "Unidade América",
      icon: "🏛️",
      students: "Em análise",
      average: "Calculando...",
      color: "from-blue-500 to-blue-600",
      bgColor: "from-blue-50 to-blue-100",
    },
    {
      name: "Unidade Mangueiras",
      icon: "🌳",
      students: "Em análise",
      average: "Calculando...",
      color: "from-green-500 to-green-600",
      bgColor: "from-green-50 to-green-100",
    },
    {
      name: "Unidade Intensivo",
      icon: "⚡",
      students: "Em análise",
      average: "Calculando...",
      color: "from-purple-500 to-purple-600",
      bgColor: "from-purple-50 to-purple-100",
    },
  ];

  const knowledgeAreas = [
    {
      name: "Linguagens e Códigos",
      icon: "📚",
      color: "from-indigo-500 to-indigo-600",
      bgColor: "from-indigo-50 to-indigo-100",
      subjects: [
        "Português",
        "Literatura",
        "Inglês",
        "Espanhol",
        "Artes",
        "Ed. Física",
      ],
    },
    {
      name: "Ciências Humanas",
      icon: "🌍",
      color: "from-amber-500 to-amber-600",
      bgColor: "from-amber-50 to-amber-100",
      subjects: ["História", "Geografia", "Filosofia", "Sociologia"],
    },
    {
      name: "Ciências da Natureza",
      icon: "🔬",
      color: "from-emerald-500 to-emerald-600",
      bgColor: "from-emerald-50 to-emerald-100",
      subjects: ["Física", "Química", "Biologia"],
    },
    {
      name: "Matemática",
      icon: "📐",
      color: "from-red-500 to-red-600",
      bgColor: "from-red-50 to-red-100",
      subjects: ["Álgebra", "Geometria", "Estatística", "Probabilidade"],
    },
    {
      name: "Redação",
      icon: "✍️",
      color: "from-violet-500 to-violet-600",
      bgColor: "from-violet-50 to-violet-100",
      subjects: ["Dissertação", "Argumentação", "Coesão", "Coerência"],
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header Section */}
      <div className="glass-effect rounded-2xl p-8 shadow-soft">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold gradient-text mb-3">
            Dashboard de Desempenho ENEM 2024
          </h1>
          <p className="text-lg text-sapiens-dark/80 font-medium">
            Análise Comparativa das Unidades do Grupo Sapiens
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-sapiens-primary to-sapiens-secondary rounded-full mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="text-center p-6 bg-gradient-to-br from-sapiens-light to-blue-50 rounded-xl border border-sapiens-accent/20">
            <div className="text-3xl mb-2">🎯</div>
            <h3 className="font-bold text-sapiens-dark">Objetivo</h3>
            <p className="text-sm text-sapiens-dark/70 mt-1">
              Identificar pontos fortes e fragilidades
            </p>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-sapiens-light to-blue-50 rounded-xl border border-sapiens-accent/20">
            <div className="text-3xl mb-2">📊</div>
            <h3 className="font-bold text-sapiens-dark">Análise</h3>
            <p className="text-sm text-sapiens-dark/70 mt-1">
              Por área de conhecimento e disciplina
            </p>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-sapiens-light to-blue-50 rounded-xl border border-sapiens-accent/20">
            <div className="text-3xl mb-2">🚀</div>
            <h3 className="font-bold text-sapiens-dark">Meta</h3>
            <p className="text-sm text-sapiens-dark/70 mt-1">
              Plano estratégico para ENEM 2025
            </p>
          </div>
        </div>
      </div>

      {/* Units Performance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {units.map((unit, index) => (
          <div
            key={index}
            className="glass-effect rounded-2xl shadow-soft overflow-hidden hover:shadow-medium transition-all duration-300 hover:-translate-y-1 animate-slide-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className={`h-2 bg-gradient-to-r ${unit.color}`}></div>
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div
                  className={`w-12 h-12 bg-gradient-to-br ${unit.color} rounded-xl flex items-center justify-center mr-4`}
                >
                  <span className="text-white text-xl">{unit.icon}</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-sapiens-dark">
                    {unit.name}
                  </h3>
                  <p className="text-sm text-sapiens-dark/70">
                    Unidade Educacional
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div
                  className={`p-4 bg-gradient-to-r ${unit.bgColor} rounded-xl border border-gray-200`}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold text-sapiens-dark">
                      👥 Participantes
                    </span>
                    <span className="text-lg font-bold text-sapiens-dark">
                      {unit.students}
                    </span>
                  </div>
                </div>

                <div
                  className={`p-4 bg-gradient-to-r ${unit.bgColor} rounded-xl border border-gray-200`}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold text-sapiens-dark">
                      📈 Média Geral
                    </span>
                    <span className="text-lg font-bold text-sapiens-dark">
                      {unit.average}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${unit.color} rounded-full animate-pulse`}
                    style={{ width: "0%" }}
                  ></div>
                </div>
                <p className="text-xs text-sapiens-dark/60 mt-2 text-center">
                  Dados sendo processados...
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Knowledge Areas */}
      <div className="glass-effect rounded-2xl shadow-soft p-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold gradient-text mb-3">
            Áreas de Conhecimento ENEM
          </h2>
          <p className="text-sapiens-dark/70">
            Análise detalhada por área e disciplinas específicas
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-sapiens-primary to-sapiens-secondary rounded-full mt-3"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {knowledgeAreas.map((area, index) => (
            <div
              key={index}
              className="group hover:scale-105 transition-all duration-300 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="glass-effect rounded-xl p-6 h-full border border-gray-200 hover:shadow-medium transition-all duration-300">
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${area.color} rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300`}
                >
                  <span className="text-white text-2xl">{area.icon}</span>
                </div>

                <h4 className="font-bold text-sapiens-dark text-center mb-3 text-sm leading-tight">
                  {area.name}
                </h4>

                <div
                  className={`p-3 bg-gradient-to-r ${area.bgColor} rounded-lg border border-gray-200`}
                >
                  <div className="text-center">
                    <div className="text-2xl font-bold text-sapiens-dark mb-1">
                      --
                    </div>
                    <div className="text-xs text-sapiens-dark/70">
                      Média da Área
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="text-xs text-sapiens-dark/60 mb-2">
                    Disciplinas:
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {area.subjects.slice(0, 3).map((subject, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-white/70 px-2 py-1 rounded-full text-sapiens-dark/70"
                      >
                        {subject}
                      </span>
                    ))}
                    {area.subjects.length > 3 && (
                      <span className="text-xs bg-sapiens-accent/20 px-2 py-1 rounded-full text-sapiens-dark/70">
                        +{area.subjects.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Status Banner */}
      <div className="glass-effect rounded-2xl p-6 border-l-4 border-sapiens-warning">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-gradient-to-br from-sapiens-warning to-yellow-500 rounded-xl flex items-center justify-center mr-4">
            <span className="text-white text-xl">⏳</span>
          </div>
          <div>
            <h3 className="text-lg font-bold text-sapiens-dark mb-1">
              Status do Projeto
            </h3>
            <p className="text-sapiens-dark/70">
              Os dados do ENEM 2024 estão sendo coletados e processados.
              Dashboard será atualizado em tempo real conforme os dados ficarem
              disponíveis.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
