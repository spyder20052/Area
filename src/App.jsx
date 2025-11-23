import React, { useState, useEffect } from 'react';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Areas from './pages/Areas.jsx';
import Services from './pages/Services.jsx';
import Settings from './pages/Settings.jsx';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, Navigate, useLocation } from 'react-router-dom';
import { Camera, Plus, Trash2, Settings as SettingsIcon, LogOut, Menu, X, Zap, PlayCircle, PauseCircle, Bell, Activity, Users, Search, Filter, ChevronRight, Globe, Mail, Github, Twitter, Clock, Database, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

// Mock API
const mockAPI = {
  login: async (email, password) => {
    return { token: 'mock-token', user: { id: 1, email, name: 'John Doe' } };
  },
  register: async (data) => {
    return { token: 'mock-token', user: { id: 1, ...data } };
  },
  getServices: async () => [
    { 
      id: 1, 
      name: 'Gmail', 
      icon: '📧', 
      connected: false,
      actions: [
        { id: 'a1', name: 'new_email', description: 'Quand un nouvel email est reçu' },
        { id: 'a2', name: 'email_with_attachment', description: 'Email avec pièce jointe' }
      ],
      reactions: [
        { id: 'r1', name: 'send_email', description: 'Envoyer un email' }
      ]
    },
    { 
      id: 2, 
      name: 'GitHub', 
      icon: '🐙', 
      connected: false,
      actions: [
        { id: 'a3', name: 'new_issue', description: 'Nouvelle issue créée' },
        { id: 'a4', name: 'new_pr', description: 'Nouvelle Pull Request' }
      ],
      reactions: [
        { id: 'r2', name: 'create_issue', description: 'Créer une issue' }
      ]
    },
    { 
      id: 3, 
      name: 'OneDrive', 
      icon: '☁️', 
      connected: false,
      actions: [
        { id: 'a5', name: 'new_file', description: 'Nouveau fichier ajouté' }
      ],
      reactions: [
        { id: 'r3', name: 'save_file', description: 'Sauvegarder un fichier' }
      ]
    },
    { 
      id: 4, 
      name: 'Slack', 
      icon: '💬', 
      connected: false,
      actions: [],
      reactions: [
        { id: 'r4', name: 'send_message', description: 'Envoyer un message' }
      ]
    },
    { 
      id: 5, 
      name: 'Twitter', 
      icon: '🐦', 
      connected: false,
      actions: [
        { id: 'a6', name: 'new_mention', description: 'Nouvelle mention' }
      ],
      reactions: [
        { id: 'r5', name: 'post_tweet', description: 'Poster un tweet' }
      ]
    },
    { 
      id: 6, 
      name: 'Timer', 
      icon: '⏰', 
      connected: true,
      actions: [
        { id: 'a7', name: 'schedule_time', description: 'À une heure précise' },
        { id: 'a8', name: 'schedule_date', description: 'À une date précise' }
      ],
      reactions: []
    }
  ],
  getAreas: async () => [
    {
      id: 1,
      name: 'Email vers OneDrive',
      action: { service: 'Gmail', name: 'Email avec pièce jointe' },
      reaction: { service: 'OneDrive', name: 'Sauvegarder un fichier' },
      active: true,
      executions: 12,
      lastExecution: '2025-11-23T10:30:00'
    },
    {
      id: 2,
      name: 'GitHub vers Slack',
      action: { service: 'GitHub', name: 'Nouvelle issue créée' },
      reaction: { service: 'Slack', name: 'Envoyer un message' },
      active: true,
      executions: 5,
      lastExecution: '2025-11-22T15:20:00'
    }
  ],
  createArea: async (area) => {
    return { id: Date.now(), ...area, active: true, executions: 0, lastExecution: new Date().toISOString() };
  },
  toggleArea: async (id) => {
    return { success: true };
  },
  deleteArea: async (id) => {
    return { success: true };
  },
  connectService: async (serviceId) => {
    return { success: true };
  }
};

// Protected Route Component
const ProtectedRoute = ({ user, children }) => {
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

// Auth Components
const LoginPage = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const result = await mockAPI.login(email, password);
    setUser(result.user);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mb-4">
            <Zap className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">ACTION-REACTION</h1>
          <p className="text-gray-600">Automatisez votre vie numérique</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="votre@email.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            Se connecter
          </button>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Ou continuer avec</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3">
            <button className="flex justify-center items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Globe className="w-5 h-5 text-blue-600" />
            </button>
            <button className="flex justify-center items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Github className="w-5 h-5 text-gray-800" />
            </button>
            <button className="flex justify-center items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Twitter className="w-5 h-5 text-blue-400" />
            </button>
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-gray-600">
          Pas encore de compte ?{' '}
          <Link to="/register" className="text-purple-600 font-semibold hover:underline">
            S'inscrire
          </Link>
        </p>
      </div>
    </div>
  );
};

const RegisterPage = ({ setUser }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Les mots de passe ne correspondent pas');
      return;
    }
    const result = await mockAPI.register(formData);
    setUser(result.user);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mb-4">
            <Zap className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Créer un compte</h1>
          <p className="text-gray-600">Rejoignez-nous aujourd'hui</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nom complet</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Mot de passe</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Confirmer le mot de passe</label>
            <input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            S'inscrire
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Déjà un compte ?{' '}
          <Link to="/login" className="text-purple-600 font-semibold hover:underline">
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  );
};

// Sidebar Component
const Sidebar = ({ user, setUser }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    setUser(null);
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="bg-white w-64 min-h-screen border-r border-gray-200 p-6 hidden md:block">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
          <Zap className="w-6 h-6 text-white" />
        </div>
        <span className="text-xl font-bold text-gray-800">AREA</span>
      </div>

      <nav className="space-y-2">
        <Link
          to="/dashboard"
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
            isActive('/dashboard') ? 'bg-purple-100 text-purple-600' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Activity className="w-5 h-5" />
          <span className="font-medium">Tableau de bord</span>
        </Link>

        <Link
          to="/areas"
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
            isActive('/areas') ? 'bg-purple-100 text-purple-600' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Zap className="w-5 h-5" />
          <span className="font-medium">Mes AREA</span>
        </Link>

        <Link
          to="/services"
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
            isActive('/services') ? 'bg-purple-100 text-purple-600' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Database className="w-5 h-5" />
          <span className="font-medium">Services</span>
        </Link>

        <Link
          to="/settings"
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
            isActive('/settings') ? 'bg-purple-100 text-purple-600' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <SettingsIcon className="w-5 h-5" />
          <span className="font-medium">Paramètres</span>
        </Link>
      </nav>

      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="flex items-center gap-3 mb-4 px-4">
          <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
            <Users className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-800">{user?.name}</p>
            <p className="text-xs text-gray-500">{user?.email}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Déconnexion</span>
        </button>
      </div>
    </div>
  );
};

// Mobile Components
const MobileHeader = ({ showMobileMenu, setShowMobileMenu }) => (
  <div className="md:hidden bg-white border-b border-gray-200 p-4 flex items-center justify-between">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
        <Zap className="w-6 h-6 text-white" />
      </div>
      <span className="text-xl font-bold text-gray-800">AREA</span>
    </div>
    <button onClick={() => setShowMobileMenu(!showMobileMenu)}>
      {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
    </button>
  </div>
);

const MobileMenu = ({ user, setUser, setShowMobileMenu }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path) => {
    navigate(path);
    setShowMobileMenu(false);
  };

  const handleLogout = () => {
    setUser(null);
    setShowMobileMenu(false);
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="md:hidden fixed inset-0 bg-white z-40 p-6">
      <nav className="space-y-2">
        <button
          onClick={() => handleNavigation('/dashboard')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
            isActive('/dashboard') ? 'bg-purple-100 text-purple-600' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Activity className="w-5 h-5" />
          <span className="font-medium">Tableau de bord</span>
        </button>

        <button
          onClick={() => handleNavigation('/areas')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
            isActive('/areas') ? 'bg-purple-100 text-purple-600' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Zap className="w-5 h-5" />
          <span className="font-medium">Mes AREA</span>
        </button>

        <button
          onClick={() => handleNavigation('/services')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
            isActive('/services') ? 'bg-purple-100 text-purple-600' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Database className="w-5 h-5" />
          <span className="font-medium">Services</span>
        </button>

        <button
          onClick={() => handleNavigation('/settings')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
            isActive('/settings') ? 'bg-purple-100 text-purple-600' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <SettingsIcon className="w-5 h-5" />
          <span className="font-medium">Paramètres</span>
        </button>
      </nav>

      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="flex items-center gap-3 mb-4 px-4">
          <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
            <Users className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-800">{user?.name}</p>
            <p className="text-xs text-gray-500">{user?.email}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Déconnexion</span>
        </button>
      </div>
    </div>
  );
};

// Dashboard Page
const DashboardPage = ({ user, services, areas }) => {
  const navigate = useNavigate();
  const stats = [
    { label: 'AREA Actives', value: areas.filter(a => a.active).length, icon: Zap },
    { label: 'Services Connectés', value: services.filter(s => s.connected).length, icon: Database },
    { label: 'Exécutions (24h)', value: areas.reduce((sum, a) => sum + a.executions, 0), icon: Activity },
    { label: 'Notifications', value: 3, icon: Bell }
  ];

  return (
    <div className="p-4 md:p-8">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Bienvenue, {user?.name} 👋</h1>
        <p className="text-gray-600">Voici un aperçu de vos automatisations</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <stat.icon className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-3xl font-bold text-gray-800">{stat.value}</span>
            </div>
            <p className="text-sm text-gray-600">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">AREA Récentes</h2>
            <button
              onClick={() => navigate('/areas')}
              className="text-purple-600 text-sm font-medium hover:underline"
            >
              Voir tout
            </button>
          </div>
          <div className="space-y-4">
            {areas.slice(0, 3).map((area) => (
              <div key={area.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <div className={`w-2 h-2 rounded-full ${area.active ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                <div className="flex-1">
                  <p className="font-medium text-gray-800">{area.name}</p>
                  <p className="text-sm text-gray-500">{area.executions} exécutions</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Activité Récente</h2>
          <div className="space-y-4">
            {areas.slice(0, 3).map((area, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-800">
                    <span className="font-medium">{area.name}</span> a été exécutée
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(area.lastExecution).toLocaleString('fr-FR')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Areas Page
const AreasPage = ({ areas, setAreas, services, showCreateArea, setShowCreateArea, newArea, setNewArea }) => {
  const handleToggleArea = async (id) => {
    await mockAPI.toggleArea(id);
    setAreas(areas.map(a => a.id === id ? {...a, active: !a.active} : a));
  };

  const handleDeleteArea = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette AREA ?')) {
      await mockAPI.deleteArea(id);
      setAreas(areas.filter(a => a.id !== id));
    }
  };

  const CreateAreaModal = () => {
    const [step, setStep] = useState(1);

    const handleCreate = async () => {
      if (!newArea.name || !newArea.action || !newArea.reaction) {
        alert('Veuillez remplir tous les champs');
        return;
      }

      const created = await mockAPI.createArea({
        name: newArea.name,
        action: {
          service: newArea.actionService.name,
          name: newArea.action.description
        },
        reaction: {
          service: newArea.reactionService.name,
          name: newArea.reaction.description
        }
      });

      setAreas([...areas, created]);
      setShowCreateArea(false);
      setNewArea({ name: '', actionService: null, action: null, reactionService: null, reaction: null });
      setStep(1);
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
            <h2 className="text-2xl font-bold text-gray-800">Créer une nouvelle AREA</h2>
            <button
              onClick={() => {
                setShowCreateArea(false);
                setNewArea({ name: '', actionService: null, action: null, reactionService: null, reaction: null });
                setStep(1);
              }}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          <div className="p-6">
            {step === 1 && (
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-4">Étape 1: Nom de l'AREA</h3>
                <input
                  type="text"
                  value={newArea.name}
                  onChange={(e) => setNewArea({...newArea, name: e.target.value})}
                  placeholder="Ex: Email vers OneDrive"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent mb-4"
                />
                <button
                  onClick={() => setStep(2)}
                  disabled={!newArea.name}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Suivant
                </button>
              </div>
            )}

            {step === 2 && (
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-4">Étape 2: Choisir une ACTION</h3>
                <p className="text-sm text-gray-600 mb-4">Sélectionnez le service qui déclenchera l'automatisation</p>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  {services.filter(s => s.actions.length > 0).map((service) => (
                    <button
                      key={service.id}
                      onClick={() => setNewArea({...newArea, actionService: service, action: null})}
                      className={`p-4 border-2 rounded-lg transition-all ${
                        newArea.actionService?.id === service.id
                          ? 'border-purple-600 bg-purple-50'
                          : 'border-gray-200 hover:border-purple-300'
                      }`}
                    >
                      <div className="text-3xl mb-2">{service.icon}</div>
                      <p className="font-medium text-gray-800">{service.name}</p>
                    </button>
                  ))}
                </div>

                {newArea.actionService && (
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Sélectionnez l'action:</p>
                    <div className="space-y-2">
                      {newArea.actionService.actions.map((action) => (
                        <button
                          key={action.id}
                          onClick={() => setNewArea({...newArea, action})}
                          className={`w-full p-3 border-2 rounded-lg text-left transition-all ${
                            newArea.action?.id === action.id
                              ? 'border-purple-600 bg-purple-50'
                              : 'border-gray-200 hover:border-purple-300'
                          }`}
                        >
                          <p className="font-medium text-gray-800">{action.description}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex gap-3">
                  <button
                    onClick={() => setStep(1)}
                    className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-all"
                  >
                    Précédent
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    disabled={!newArea.action}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Suivant
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-4">Étape 3: Choisir une REACTION</h3>
                <p className="text-sm text-gray-600 mb-4">Sélectionnez l'action qui sera exécutée</p>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  {services.filter(s => s.reactions.length > 0).map((service) => (
                    <button
                      key={service.id}
                      onClick={() => setNewArea({...newArea, reactionService: service, reaction: null})}
                      className={`p-4 border-2 rounded-lg transition-all ${
                        newArea.reactionService?.id === service.id
                          ? 'border-purple-600 bg-purple-50'
                          : 'border-gray-200 hover:border-purple-300'
                      }`}
                    >
                      <div className="text-3xl mb-2">{service.icon}</div>
                      <p className="font-medium text-gray-800">{service.name}</p>
                    </button>
                  ))}
                </div>

                {newArea.reactionService && (
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Sélectionnez la réaction:</p>
                    <div className="space-y-2">
                      {newArea.reactionService.reactions.map((reaction) => (
                        <button
                          key={reaction.id}
                          onClick={() => setNewArea({...newArea, reaction})}
                          className={`w-full p-3 border-2 rounded-lg text-left transition-all ${
                            newArea.reaction?.id === reaction.id
                              ? 'border-purple-600 bg-purple-50'
                              : 'border-gray-200 hover:border-purple-300'
                          }`}
                        >
                          <p className="font-medium text-gray-800">{reaction.description}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex gap-3">
                  <button
                    onClick={() => setStep(2)}
                    className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-all"
                  >
                    Précédent
                  </button>
                  <button
                    onClick={handleCreate}
                    disabled={!newArea.reaction}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Créer l'AREA
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Mes AREA</h1>
          <p className="text-gray-600">Gérez vos automatisations</p>
        </div>
        <button
          onClick={() => setShowCreateArea(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
        >
          <Plus className="w-5 h-5" />
          Créer une AREA
        </button>
      </div>

      {areas.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Zap className="w-10 h-10 text-purple-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Aucune AREA pour le moment</h3>
          <p className="text-gray-600 mb-6">Créez votre première automatisation pour commencer</p>
          <button
            onClick={() => setShowCreateArea(true)}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
          >
            Créer ma première AREA
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {areas.map((area) => (
            <div key={area.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${area.active ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                  <h3 className="text-lg font-bold text-gray-800">{area.name}</h3>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleToggleArea(area.id)}
                    className={`p-2 rounded-lg transition-colors ${
                      area.active ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                    }`}
                  >
                    {area.active ? <PlayCircle className="w-5 h-5" /> : <PauseCircle className="w-5 h-5" />}
                  </button>
                  <button
                    onClick={() => handleDeleteArea(area.id)}
                    className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-xl">⚡</div>
                  <div>
                    <p className="text-xs text-blue-600 font-medium">ACTION</p>
                    <p className="text-sm font-medium text-gray-800">{area.action.service}</p>
                    <p className="text-xs text-gray-600">{area.action.name}</p>
                  </div>
                </div>

                <div className="flex justify-center">
                  <ChevronRight className="w-6 h-6 text-gray-400" />
                </div>

                <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center text-xl">🎯</div>
                  <div>
                    <p className="text-xs text-purple-600 font-medium">REACTION</p>
                    <p className="text-sm font-medium text-gray-800">{area.reaction.service}</p>
                    <p className="text-xs text-gray-600">{area.reaction.name}</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between text-sm">
                <span className="text-gray-600">
                  <span className="font-medium text-gray-800">{area.executions}</span> exécutions
                </span>
                <span className="text-gray-500">
                  Dernière: {new Date(area.lastExecution).toLocaleDateString('fr-FR')}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {showCreateArea && <CreateAreaModal />}
    </div>
  );
};

// Services Page
const ServicesPage = ({ services, setServices, selectedService, setSelectedService }) => {
  const handleConnectService = async (serviceId) => {
    await mockAPI.connectService(serviceId);
    setServices(services.map(s => s.id === serviceId ? {...s, connected: true} : s));
  };

  return (
    <div className="p-4 md:p-8">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Services</h1>
        <p className="text-gray-600">Connectez vos services pour créer des automatisations</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div key={service.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="text-4xl">{service.icon}</div>
              {service.connected ? (
                <span className="px-3 py-1 bg-green-100 text-green-600 text-xs font-medium rounded-full flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  Connecté
                </span>
              ) : (
                <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                  Non connecté
                </span>
              )}
            </div>

            <h3 className="text-lg font-bold text-gray-800 mb-2">{service.name}</h3>
            
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">
                <span className="font-medium">{service.actions.length}</span> actions • 
                <span className="font-medium"> {service.reactions.length}</span> réactions
              </p>
            </div>

            {!service.connected ? (
              <button
                onClick={() => handleConnectService(service.id)}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2 rounded-lg font-semibold hover:shadow-lg transition-all"
              >
                Connecter
              </button>
            ) : (
              <button
                onClick={() => setSelectedService(service)}
                className="w-full bg-gray-100 text-gray-800 py-2 rounded-lg font-semibold hover:bg-gray-200 transition-all"
              >
                Voir les détails
              </button>
            )}
          </div>
        ))}
      </div>

      {selectedService && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
              <div className="flex items-center gap-3">
                <div className="text-4xl">{selectedService.icon}</div>
                <h2 className="text-2xl font-bold text-gray-800">{selectedService.name}</h2>
              </div>
              <button
                onClick={() => setSelectedService(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            <div className="p-6">
              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-800 mb-3">Actions disponibles</h3>
                {selectedService.actions.length > 0 ? (
                  <div className="space-y-2">
                    {selectedService.actions.map((action) => (
                      <div key={action.id} className="p-4 bg-blue-50 rounded-lg">
                        <p className="font-medium text-gray-800">{action.description}</p>
                        <p className="text-xs text-gray-600 mt-1">ID: {action.name}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">Aucune action disponible</p>
                )}
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-3">Réactions disponibles</h3>
                {selectedService.reactions.length > 0 ? (
                  <div className="space-y-2">
                    {selectedService.reactions.map((reaction) => (
                      <div key={reaction.id} className="p-4 bg-purple-50 rounded-lg">
                        <p className="font-medium text-gray-800">{reaction.description}</p>
                        <p className="text-xs text-gray-600 mt-1">ID: {reaction.name}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">Aucune réaction disponible</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Settings Page
const SettingsPage = ({ user }) => {
  return (
    <div className="p-4 md:p-8">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Paramètres</h1>
        <p className="text-gray-600">Gérez votre compte et vos préférences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Informations du compte</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nom</label>
              <input
                type="text"
                defaultValue={user?.name}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                defaultValue={user?.email}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2 rounded-lg font-semibold hover:shadow-lg transition-all">
              Enregistrer les modifications
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Notifications</h3>
          <div className="space-y-4">
            <label className="flex items-center justify-between">
              <span className="text-gray-800">Notifications par email</span>
              <input type="checkbox" defaultChecked className="w-5 h-5 text-purple-600" />
            </label>
            <label className="flex items-center justify-between">
              <span className="text-gray-800">Notifications push</span>
              <input type="checkbox" defaultChecked className="w-5 h-5 text-purple-600" />
            </label>
            <label className="flex items-center justify-between">
              <span className="text-gray-800">Rapport hebdomadaire</span>
              <input type="checkbox" className="w-5 h-5 text-purple-600" />
            </label>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Sécurité</h3>
          <div className="space-y-4">
            <button className="w-full bg-gray-100 text-gray-800 py-2 rounded-lg font-semibold hover:bg-gray-200 transition-all">
              Changer le mot de passe
            </button>
            <button className="w-full bg-gray-100 text-gray-800 py-2 rounded-lg font-semibold hover:bg-gray-200 transition-all">
              Authentification à deux facteurs
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Zone de danger</h3>
          <button className="w-full bg-red-100 text-red-600 py-2 rounded-lg font-semibold hover:bg-red-200 transition-all">
            Supprimer le compte
          </button>
        </div>
      </div>
    </div>
  );
};

// Main Layout
const MainLayout = ({ user, setUser, services, setServices, areas, setAreas, selectedService, setSelectedService, showCreateArea, setShowCreateArea, newArea, setNewArea }) => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <MobileHeader showMobileMenu={showMobileMenu} setShowMobileMenu={setShowMobileMenu} />
      {showMobileMenu && <MobileMenu user={user} setUser={setUser} setShowMobileMenu={setShowMobileMenu} />}
      
      <div className="flex">
        <Sidebar user={user} setUser={setUser} />
        <div className="flex-1 min-h-screen">
          <Routes>
            <Route path="/dashboard" element={<Dashboard user={user} services={services} areas={areas} />} />
            <Route path="/areas" element={<Areas areas={areas} setAreas={setAreas} services={services} showCreateArea={showCreateArea} setShowCreateArea={setShowCreateArea} newArea={newArea} setNewArea={setNewArea} />} />
            <Route path="/services" element={<Services services={services} setServices={setServices} selectedService={selectedService} setSelectedService={setSelectedService} />} />
            <Route path="/settings" element={<Settings user={user} />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

// Main App Component
const App = () => {
  const [user, setUser] = useState(null);
  const [services, setServices] = useState([]);
  const [areas, setAreas] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [showCreateArea, setShowCreateArea] = useState(false);
  const [newArea, setNewArea] = useState({
    name: '',
    actionService: null,
    action: null,
    reactionService: null,
    reaction: null
  });

  useEffect(() => {
    if (user) {
      loadServices();
      loadAreas();
    }
  }, [user]);

  const loadServices = async () => {
    const data = await mockAPI.getServices();
    setServices(data);
  };

  const loadAreas = async () => {
    const data = await mockAPI.getAreas();
    setAreas(data);
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register setUser={setUser} />} />
        <Route
          path="/*"
          element={
            <ProtectedRoute user={user}>
              <MainLayout 
                user={user} 
                setUser={setUser} 
                services={services} 
                setServices={setServices}
                areas={areas} 
                setAreas={setAreas}
                selectedService={selectedService}
                setSelectedService={setSelectedService}
                showCreateArea={showCreateArea}
                setShowCreateArea={setShowCreateArea}
                newArea={newArea}
                setNewArea={setNewArea}
              />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default App;