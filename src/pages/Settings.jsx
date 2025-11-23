import React from 'react';

const Settings = ({ user }) => {
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
              <input type="text" defaultValue={user?.name} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input type="email" defaultValue={user?.email} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
            </div>
            <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2 rounded-lg font-semibold hover:shadow-lg transition-all">Enregistrer les modifications</button>
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
            <button className="w-full bg-gray-100 text-gray-800 py-2 rounded-lg font-semibold hover:bg-gray-200 transition-all">Changer le mot de passe</button>
            <button className="w-full bg-gray-100 text-gray-800 py-2 rounded-lg font-semibold hover:bg-gray-200 transition-all">Authentification à deux facteurs</button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Zone de danger</h3>
          <button className="w-full bg-red-100 text-red-600 py-2 rounded-lg font-semibold hover:bg-red-200 transition-all">Supprimer le compte</button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
