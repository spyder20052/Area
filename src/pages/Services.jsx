import React from 'react';
import { CheckCircle, X } from 'lucide-react';
import mockAPI from '../api/mockAPI';

const Services = ({ services, setServices, selectedService, setSelectedService }) => {
  const handleConnectService = async (serviceId) => {
    await mockAPI.connectService(serviceId);
    setServices(services.map(s => s.id === serviceId ? { ...s, connected: true } : s));
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

export default Services;
