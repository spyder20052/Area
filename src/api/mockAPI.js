// Mock API - À remplacer par de vrais appels API
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

export default mockAPI;
