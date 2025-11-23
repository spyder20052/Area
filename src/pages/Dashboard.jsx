import React from 'react';
import { Zap, Database, Activity, Bell, ChevronRight, CheckCircle } from 'lucide-react';

const Dashboard = ({ user, services, areas }) => {
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
                  <p className="text-xs text-gray-500">{new Date(area.lastExecution).toLocaleString('fr-FR')}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
