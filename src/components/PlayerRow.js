import React from 'react';
import { Bookmark } from 'lucide-react';
import { theme } from '../theme/theme';
import Input from './ui/Input';

// Mappa dei colori sociali delle squadre di Serie A 2025/26
const TEAM_COLORS = {
  // Atalanta - Nerazzurro
  'Atalanta': {
    primary: '#1E3A8A', // Blu
    secondary: '#000000' // Nero
  },
  
  // Bologna - Rossoblù
  'Bologna': {
    primary: '#AD0505', // Rosso
    secondary: '#042AA6' // Blu
  },
  
  // Cagliari - Rossoblù
  'Cagliari': {
    primary: '#DC2626', // Rosso
    secondary: '#1E40AF' // Blu
  },
  
  // Como - Azzurro
  'Como': {
    primary: '#FFFFFF', // Bianco
    secondary: '#1E40AF' // Azzurro più scuro
  },
  
  // Cremonese - Grigio e rosso
  'Cremonese': {
    primary: '#6B7280', // Grigio
    secondary: '#DC2626' // Rosso
  },
  
  // Fiorentina - Viola
  'Fiorentina': {
    primary: '#7C3AED', // Viola
    secondary: '#7C3AED' // Viola più scuro
  },
  
  // Genoa - Rossoblù
  'Genoa': {
    primary: '#DC2626', // Rosso
    secondary: '#1E40AF' // Blu
  },
  
  // Inter - Nerazzurro
  'Inter': {
    primary: '#000000', // Nero
    secondary: '#1E3A8A' // Blu
  },
  
  // Juventus - Bianconero
  'Juventus': {
    primary: '#FFFFFF', // Bianco
    secondary: '#000000' // Nero
  },
  
  // Lazio - Biancoceleste
  'Lazio': {
    primary: '#FFFFFF', // Bianco
    secondary: '#0EA5E9' // Celeste
  },
  
  // Lecce - Giallorosso
  'Lecce': {
    primary: '#EAB308', // Giallo
    secondary: '#DC2626' // Rosso
  },
  
  // Milan - Rossonero
  'Milan': {
    primary: '#DC2626', // Rosso
    secondary: '#000000' // Nero
  },
  
  // Napoli - Azzurro
  'Napoli': {
    primary: '#0EA5E9', // Azzurro
    secondary: '#0284C7' // Azzurro più scuro
  },
  
  // Parma - Gialloblu
  'Parma': {
    primary: '#EAB308', // Giallo
    secondary: '#1E40AF' // Blu
  },
  
  // Pisa - Nerazzurro
  'Pisa': {
    primary: '#000000', // Nero
    secondary: '#1E3A8A' // Blu
  },
  
  // Roma - Giallorosso
  'Roma': {
    primary: '#DBA400', // Giallo
    secondary: '#890000' // Rosso
  },
  
  // Sassuolo - Neroverdi
  'Sassuolo': {
    primary: '#000000', // Nero
    secondary: '#16A34A' // Verde
  },
  
  // Torino - Granata
  'Torino': {
    primary: '#7F1D1D', // Granata
    secondary: '#7F1D1D' // Granata più scuro
  },
  
  // Udinese - Bianconero
  'Udinese': {
    primary: '#FFFFFF', // Bianco
    secondary: '#000000' // Nero
  },
  
  // Verona - Gialloblu
  'Verona': {
    primary: '#EAB308', // Giallo
    secondary: '#1E40AF' // Blu
  }
};

// Funzione per ottenere i colori di una squadra
const getTeamColors = (teamName) => {
  // Normalizziamo il nome della squadra per gestire varianti
  const normalizedName = teamName?.trim();
  
  // Se troviamo una corrispondenza esatta
  if (TEAM_COLORS[normalizedName]) {
    return TEAM_COLORS[normalizedName];
  }
  
  // Controlliamo alcune varianti comuni
  const teamVariants = {
    'AC Milan': 'Milan',
    'FC Inter': 'Inter',
    'Internazionale': 'Inter',
    'Juventus FC': 'Juventus',
    'AS Roma': 'Roma',
    'SS Lazio': 'Lazio',
    'SSC Napoli': 'Napoli',
    'ACF Fiorentina': 'Fiorentina',
    'Hellas Verona': 'Verona',
    'US Lecce': 'Lecce',
    'Torino FC': 'Torino',
    'Atalanta BC': 'Atalanta',
    'Bologna FC': 'Bologna',
    'Genoa CFC': 'Genoa',
    'Como 1907': 'Como',
    'US Sassuolo': 'Sassuolo',
    'Parma FC': 'Parma',
    'Udinese Calcio': 'Udinese',
    'Cagliari Calcio': 'Cagliari',
    'US Cremonese': 'Cremonese',
    'Pisa SC': 'Pisa'
  };
  
  if (teamVariants[normalizedName]) {
    return TEAM_COLORS[teamVariants[normalizedName]];
  }
  
  // Se non troviamo la squadra, ritorniamo colori di default
  return {
    primary: '#6B7280', // Grigio
    secondary: '#4B5563' // Grigio più scuro
  };
};

// Componente TeamBadge per mostrare i colori della squadra
const TeamBadge = ({ teamName, size = theme.spacing[8] }) => {
  const colors = getTeamColors(teamName);
  
  return (
    <div style={{
      width: size,
      height: size,
      borderRadius: '50%',
      position: 'relative',
      overflow: 'hidden',
      border: `2px solid ${theme.colors.dark.border.primary}`,
      flexShrink: 0,
      boxShadow: theme.shadows.sm
    }}>
      {/* Prima metà - colore primario */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '50%',
        height: '100%',
        background: colors.primary,
        clipPath: 'polygon(0 0, 100% 0, 80% 100%, 0 100%)'
      }} />
      
      {/* Seconda metà - colore secondario */}
      <div style={{
        position: 'absolute',
        top: 0,
        right: 0,
        width: '50%',
        height: '100%',
        background: colors.secondary,
        clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 0 100%)'
      }} />
    </div>
  );
};

const PlayerRow = ({ 
  player, 
  index, 
  isConfigured,
  getPlayerConfig,
  updatePlayerConfig 
}) => {
  // ARRAY INPUTCONFIGS MODIFICATO - RIMOSSO 'quo'
  const inputConfigs = [
    { field: 'prezzo', defaultValue: player.quotazione, color: theme.colors.accent.orange, width: '60px' },
    { field: 'budget', placeholder: '-', color: theme.colors.secondary[600], width: '60px' },
    { field: 'pmal', placeholder: '0', color: 'rgba(37, 99, 235, 0.8)', width: '60px' },
    // RIMOSSO: { field: 'quo', defaultValue: player.quotazioneAttuale, color: 'transparent', border: true, width: '60px' },
    { field: 'titolare', placeholder: '0', color: 'rgba(37, 99, 235, 0.8)', width: '60px' },
    { field: 'affidabilita', placeholder: '0', color: 'rgba(37, 99, 235, 0.8)', width: '60px' },
    { field: 'fisico', placeholder: '0', color: 'rgba(37, 99, 235, 0.8)', width: '60px' },
    { field: 'fmvExp', placeholder: '0', color: 'rgba(37, 99, 235, 0.8)', width: '60px', step: '0.1' },
    { field: 'mv', placeholder: '0', color: 'rgba(37, 99, 235, 0.8)', width: '60px', step: '0.1' }
  ];

  const postFmvInputConfigs = [
    { field: 'presenze', placeholder: '0', color: 'rgba(37, 99, 235, 0.8)', width: '60px' },
    { field: 'gol', placeholder: '0', color: 'rgba(220, 38, 38, 0.8)', width: '60px' },
    { field: 'assist', placeholder: '0', color: 'rgba(202, 138, 4, 0.8)', width: '60px' }
  ];

  // Definizione delle larghezze fisse per ogni colonna
  const columnWidths = [
    '280px', // Nome (fissa)
    '60px',  // Prezzo
    '60px',  // Budget  
    '60px',  // PMAL
    '60px',  // Quo (ora read-only)
    '60px',  // Titolare
    '60px',  // Affidabilità
    '60px',  // Fisico
    '60px',  // FMV Exp
    '60px',  // MV
    '60px',  // FMV (read-only)
    '60px',  // Presenze
    '60px',  // Gol
    '60px'   // Assist
  ];

  return (
    <div style={{
      borderBottom: `1px solid ${theme.colors.dark.border.secondary}`,
      padding: theme.spacing[3],
      background: isConfigured ? 'rgba(34, 197, 94, 0.05)' : 'transparent',
      borderLeft: isConfigured ? `2px solid ${theme.colors.primary[400]}` : 'none'
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: columnWidths.join(' '),
        gap: theme.spacing[2],
        alignItems: 'center',
        width: '100%'
      }}>
        
        {/* Player Info - Larghezza Fissa */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: theme.spacing[2],
          width: '280px', // Larghezza fissa
          minWidth: '280px',
          overflow: 'hidden'
        }}>
          {/* Index */}
          <div style={{
            width: theme.spacing[6],
            height: theme.spacing[6],
            background: theme.colors.dark.surface.primary,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: theme.colors.dark.text.tertiary,
            fontSize: theme.typography.fontSize.xs,
            flexShrink: 0
          }}>
            {index + 1}
          </div>
          
          <Bookmark 
            size={12} 
            color={isConfigured ? theme.colors.primary[400] : theme.colors.dark.text.tertiary}
            style={{ flexShrink: 0 }}
          />
          
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: theme.spacing[2],
            minWidth: 0, // Permette il truncate
            flex: 1
          }}>
            {/* TeamBadge con colori della squadra invece dell'avatar con iniziale */}
            <TeamBadge teamName={player.squadra} size={theme.spacing[8]} />
            
            <div style={{ minWidth: 0, flex: 1 }}>
              <div style={{
                color: theme.colors.dark.text.tertiary,
                fontSize: theme.typography.fontSize.xs,
                display: 'flex',
                alignItems: 'center',
                gap: theme.spacing[2],
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>
                {player.squadra}
              </div>
              <div style={{ 
                color: theme.colors.primary[500], 
                fontWeight: theme.typography.fontWeight.semibold, 
                fontSize: theme.typography.fontSize.sm,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>
                {player.nome}
              </div>
            </div>
          </div>
        </div>

        {/* Editable Fields Prima del Quo - Prezzo, Budget, PMAL */}
        {inputConfigs.slice(0, 3).map((config, configIndex) => (
          <div key={config.field} style={{ 
            width: columnWidths[configIndex + 1],
            display: 'flex',
            justifyContent: 'center'
          }}>
            <Input
              type="number"
              step={config.step}
              value={getPlayerConfig(player.id, config.field, config.defaultValue)}
              onChange={(e) => updatePlayerConfig(player.id, config.field, e.target.value)}
              placeholder={config.placeholder}
              style={{
                background: config.color,
                color: config.border ? theme.colors.dark.text.primary : (
                  config.color === 'transparent' ? theme.colors.dark.text.primary : 'white'
                ),
                textAlign: 'center',
                borderRadius: config.field === 'prezzo' ? theme.borderRadius.full : theme.borderRadius.base,
                padding: `${theme.spacing[1]} ${theme.spacing[2]}`,
                width: '50px',
                fontSize: theme.typography.fontSize.xs,
                fontWeight: theme.typography.fontWeight.semibold,
                border: config.border ? `1px solid ${theme.colors.dark.border.primary}` : '0'
              }}
            />
          </div>
        ))}

        {/* Quo (Read-only) */}
        <div style={{ 
          color: theme.colors.dark.text.primary, 
          textAlign: 'center', 
          fontWeight: theme.typography.fontWeight.medium, 
          fontSize: theme.typography.fontSize.sm,
          width: columnWidths[4] // Quo è alla posizione 4
        }}>
          {player.quotazioneAttuale || 0}
        </div>

        {/* Editable Fields Dopo il Quo - Da Titolare a MV */}
        {inputConfigs.slice(3).map((config, configIndex) => (
          <div key={config.field} style={{ 
            width: columnWidths[configIndex + 5], // Partono dalla posizione 5
            display: 'flex',
            justifyContent: 'center'
          }}>
            <Input
              type="number"
              step={config.step}
              value={getPlayerConfig(player.id, config.field, config.defaultValue)}
              onChange={(e) => updatePlayerConfig(player.id, config.field, e.target.value)}
              placeholder={config.placeholder}
              style={{
                background: config.color,
                color: config.border ? theme.colors.dark.text.primary : (
                  config.color === 'transparent' ? theme.colors.dark.text.primary : 'white'
                ),
                textAlign: 'center',
                borderRadius: theme.borderRadius.base,
                padding: `${theme.spacing[1]} ${theme.spacing[2]}`,
                width: '50px',
                fontSize: theme.typography.fontSize.xs,
                fontWeight: theme.typography.fontWeight.semibold,
                border: config.border ? `1px solid ${theme.colors.dark.border.primary}` : '0'
              }}
            />
          </div>
        ))}

        {/* FMV (Read-only) */}
        <div style={{ 
          color: theme.colors.dark.text.primary, 
          textAlign: 'center', 
          fontWeight: theme.typography.fontWeight.medium, 
          fontSize: theme.typography.fontSize.sm,
          width: columnWidths[10] // FMV è alla posizione 10
        }}>
          {player.fvm}
        </div>

        {/* Editable Fields Dopo il FMV */}
        {postFmvInputConfigs.map((config, configIndex) => (
          <div key={config.field} style={{ 
            width: columnWidths[configIndex + 11], // Partono dalla posizione 11
            display: 'flex',
            justifyContent: 'center'
          }}>
            <Input
              type="number"
              step={config.step}
              value={getPlayerConfig(player.id, config.field, config.defaultValue)}
              onChange={(e) => updatePlayerConfig(player.id, config.field, e.target.value)}
              placeholder={config.placeholder}
              style={{
                background: config.color,
                color: config.border ? theme.colors.dark.text.primary : (
                  config.color === 'transparent' ? theme.colors.dark.text.primary : 'white'
                ),
                textAlign: 'center',
                borderRadius: theme.borderRadius.base,
                padding: `${theme.spacing[1]} ${theme.spacing[2]}`,
                width: '50px',
                fontSize: theme.typography.fontSize.xs,
                fontWeight: theme.typography.fontWeight.semibold,
                border: config.border ? `1px solid ${theme.colors.dark.border.primary}` : '0'
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayerRow;