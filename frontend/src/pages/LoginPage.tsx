import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const LoginPage: React.FC = () => {
  const { signInWithGoogle, signInWithEmail } = useAuth();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      setError('');
      await signInWithGoogle();
      navigate('/dashboard');
    } catch (error: any) {
      setError('Erro ao fazer login com Google. Tente novamente.');
      console.error('Erro no login:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    try {
      setIsLoading(true);
      setError('');
      await signInWithEmail(formData.email, formData.password);
      navigate('/dashboard');
    } catch (error: any) {
      setError('Email ou senha incorretos. Tente novamente.');
      console.error('Erro no login:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-900 flex">
      {/* Left Side - Brand Section */}
      <div
        className={`hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 relative overflow-hidden transition-all duration-1000 ease-out ${
          isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
        }`}
      >
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse delay-500" />
        </div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center items-center w-full p-12">
          <div className="text-center">
            {/* Logo */}
            <div className="mb-8">
              {/* Logo placeholder */}
            </div>

            {/* Brand Name */}
            <h1 className="text-6xl font-bold bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent mb-6 tracking-tight">
              SAPIENS
            </h1>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-300 via-blue-400 to-blue-500 bg-clip-text text-transparent mb-8 tracking-wide">
              DASH
            </h2>

            {/* Tagline */}
            <p className="text-xl text-gray-300 mb-8 max-w-md leading-relaxed">
              Sistema de gestão inteligente para análise de dados e relatórios avançados
            </p>

            {/* Features */}
            <div className="space-y-4 text-left max-w-sm">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                <span className="text-gray-300">Dashboard em tempo real</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-200" />
                <span className="text-gray-300">Relatórios personalizados</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse delay-400" />
                <span className="text-gray-300">Análise produtiva</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div
        className={`w-full lg:w-1/2 bg-gradient-to-br from-emerald-900 via-teal-800 to-green-900 flex items-center justify-center p-8 transition-all duration-1000 ease-out relative overflow-hidden ${
          isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
        }`}
      >
        {/* Animated Background Elements - Educational Theme */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-emerald-500/10 rounded-full blur-2xl animate-pulse" />
          <div className="absolute bottom-1/3 left-1/3 w-48 h-48 bg-teal-400/15 rounded-full blur-3xl animate-pulse delay-700" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-green-400/8 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        {/* Subtle Grid Pattern for Educational Feel */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:40px_40px] animate-pulse" />

        {/* Floating Educational Icons Animation */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-emerald-400/20 rounded-full animate-bounce delay-300" />
          <div className="absolute top-3/4 right-1/4 w-2 h-2 bg-teal-400/30 rounded-full animate-bounce delay-500" />
          <div className="absolute bottom-1/4 left-1/3 w-4 h-4 bg-green-400/15 rounded-full animate-bounce delay-700" />
        </div>

        <div className="w-full max-w-md">
          {/* Mobile Brand (visible only on small screens) */}
          <div className="lg:hidden text-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent mb-2">
              SAPIENS DASH
            </h1>
            <p className="text-gray-400">Sistema de acesso restrito</p>
          </div>

          <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-700/50 shadow-2xl shadow-black/50 relative overflow-hidden rounded-xl">
            {/* Card Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-indigo-500/5 opacity-50" />

            <div className="p-8 relative z-10">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">Acesso Autorizado</h2>
                <p className="text-gray-400">Entre com suas credenciais para continuar</p>
              </div>

              <form onSubmit={handleEmailLogin} className="space-y-6">
                {/* Email Field */}
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-gray-300">
                    Email
                  </label>
                  <div className="relative group">
                    <svg
                      className={`absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 transition-colors duration-200 ${
                        focusedField === "email" ? "text-blue-400" : "text-gray-500"
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      onFocus={() => setFocusedField("email")}
                      onBlur={() => setFocusedField("")}
                      className="w-full pl-12 h-14 bg-gray-800/50 border border-gray-600 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 rounded-xl px-4"
                    />
                    <div
                      className={`absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 transition-opacity duration-200 pointer-events-none ${
                        focusedField === "email" ? "opacity-100" : ""
                      }`}
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium text-gray-300">
                    Senha
                  </label>
                  <div className="relative group">
                    <svg
                      className={`absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 transition-colors duration-200 ${
                        focusedField === "password" ? "text-blue-400" : "text-gray-500"
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                      onFocus={() => setFocusedField("password")}
                      onBlur={() => setFocusedField("")}
                      className="w-full pl-12 pr-12 h-14 bg-gray-800/50 border border-gray-600 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 rounded-xl px-4"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors duration-200"
                    >
                      {showPassword ? (
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                        </svg>
                      ) : (
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </button>
                    <div
                      className={`absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 transition-opacity duration-200 pointer-events-none ${
                        focusedField === "password" ? "opacity-100" : ""
                      }`}
                    />
                  </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center space-x-3 cursor-pointer group">
                    <div className="relative">
                      <input type="checkbox" className="sr-only" />
                      <div className="w-5 h-5 bg-gray-700 border-2 border-gray-600 rounded group-hover:border-blue-500 transition-colors duration-200" />
                      <div className="absolute inset-0 w-5 h-5 bg-gradient-to-r from-blue-500 to-purple-500 rounded opacity-0 group-hover:opacity-20 transition-opacity duration-200" />
                    </div>
                    <span className="text-sm text-gray-300 group-hover:text-white transition-colors duration-200">
                      Lembrar-me
                    </span>
                  </label>
                  <button
                    type="button"
                    className="text-sm text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200"
                  >
                    Esqueceu a senha?
                  </button>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                    <p className="text-sm text-red-400">{error}</p>
                  </div>
                )}

                {/* Login Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-14 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-800 hover:from-gray-600 hover:via-gray-500 hover:to-gray-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-gray-500/25 hover:shadow-xl hover:shadow-gray-400/40 relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-100/10 via-white/15 to-gray-200/10 opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
                  {isLoading ? (
                    <div className="flex items-center justify-center space-x-3">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Entrando...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-3">
                      <span>Acessar Sistema</span>
                      <svg className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                  )}
                </button>

                {/* Divider */}
                <div className="relative my-8">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-600" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-gray-900 text-gray-400">Ou continue com</span>
                  </div>
                </div>

                {/* Google Login */}
                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  disabled={isLoading}
                  className="w-full h-14 bg-gray-800/50 border border-gray-600 hover:bg-gray-700/50 text-white transition-all duration-200 rounded-xl group relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 via-yellow-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="flex items-center justify-center space-x-3 relative z-10">
                    <svg className="w-6 h-6" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    <span className="font-medium">Entrar com Google</span>
                  </div>
                </button>
              </form>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-8">
            <p className="text-xs text-gray-500">© 2025 SapiensBi. Todos os direitos reservados.</p>
          </div>
        </div>
      </div>
    </div>
  );
}; 
