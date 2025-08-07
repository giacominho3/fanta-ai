export const ROLES = [
  { key: 'Por', label: 'Por' }, 
  { key: 'Ds', label: 'Ds' },
  { key: 'Dc', label: 'Dc' }, 
  { key: 'B', label: 'B' },
  { key: 'Dd', label: 'Dd' }, 
  { key: 'E', label: 'E' },
  { key: 'M', label: 'M' }, 
  { key: 'C', label: 'C' },
  { key: 'W', label: 'W' }, 
  { key: 'T', label: 'T' },
  { key: 'A', label: 'A' }, 
  { key: 'Pc', label: 'Pc' }
];

export const ROLE_COLORS = {
  // Portiere -> oro
  'Por': '#F59E0B',
  
  // Difensori -> verde chiaro
  'Dc': '#10B981',
  'B': '#10B981', 
  'Ds': '#10B981',
  'Dd': '#10B981',
  
  // Centrocampisti -> blu chiaro
  'E': '#3B82F6',
  'M': '#3B82F6',
  'C': '#3B82F6',
  
  // Trequartisti/Esterni -> viola
  'W': '#8B5CF6',
  'T': '#8B5CF6',
  
  // Attaccanti -> rosso
  'A': '#EF4444',
  'Pc': '#EF4444'
};

export const roleMap = {
  'T': 'Trequartisti',
  'A': 'Attaccanti',
  'C': 'Centrocampisti',
  'W': 'Esterni',
  'M': 'Mediani',
  'Dc': 'Difensori Centrali',
  'Ds': 'Difensori Sinistri',
  'Dd': 'Difensori Destri',
  'B': 'Braccetti',
  'E': 'Esterni Difensivi',
  'Por': 'Portieri',
  'Pc': 'Prima Punta'
};