import React from 'react';
import { Plus, Zap, ChevronRight, PlayCircle, PauseCircle, Trash2 } from 'lucide-react';
import mockAPI from '../api/mockAPI';

const Areas = ({ areas, setAreas, services, showCreateArea, setShowCreateArea, newArea, setNewArea }) => {
  const handleToggleArea = async (id) => {
    await mockAPI.toggleArea(id);
    setAreas(areas.map(a => a.id === id ? { ...a, active: !a.active } : a));
  };

  const handleDeleteArea = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette AREA ?')) {
      await mockAPI.deleteArea(id);
      setAreas(areas.filter(a => a.id !== id));
    }
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
                <span className="text-gray-500">Dernière: {new Date(area.lastExecution).toLocaleDateString('fr-FR')}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TODO: Implémenter un modal de création si nécessaire */}
    </div>
  );
};

export default Areas;
