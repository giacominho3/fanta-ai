import React from 'react';
import { theme } from '../theme/theme';
import Input from './ui/Input';
import RoleBadges from './ui/RoleBadge';
import StarRating from './ui/StarRating';
import PlayerNoteSelector from './PlayerNoteSelector';
import { TEAM_COLORS } from '../constants/teamColors';

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
  // ARRAY INPUTCONFIGS MODIFICATO - Rimosso fmvExp, mv, presenze, gol, assist
  // Ora solo budget e pmal sono input, il resto sono stelline
  const inputConfigs = [
    { field: 'budget', placeholder: '0', color: theme.colors.secondary[600], width: '90px' },
    { field: 'pmal', placeholder: '0', color: 'rgba(37, 99, 235, 0.8)', width: '70px' },
    { field: 'titolare', placeholder: '0', color: 'rgba(37, 99, 235, 0.8)', width: '70px' },
    { field: 'affidabilita', placeholder: '0', color: 'rgba(37, 99, 235, 0.8)', width: '70px' },
    { field: 'fisico', placeholder: '0', color: 'rgba(37, 99, 235, 0.8)', width: '70px' }
  ];

  // Definizione delle larghezze fisse per ogni colonna (rimosse 5 colonne, allargate le rimanenti)
  const columnWidths = [
    '350px', // Nome (allargata)
    '130px', // Ruoli (allargata)
    '90px',  // Prezzo (allargata, non editabile)
    '90px',  // Budget (allargata)
    '70px',  // PMAL (allargata)
    '70px',  // Quo (allargata, read-only)
    '90px',  // Titolare (allargata) - ora stelline
    '90px',  // Affidabilità (allargata) - ora stelline
    '90px',  // Fisico (allargata) - ora stelline
    '70px'   // FMV (allargata, read-only)
  ];

  // Calcola il prezzo basato sul budget (budget% * 500)
  const calculatePrice = (budget) => {
    const budgetValue = parseFloat(budget) || 0;
    return Math.round(budgetValue * 5); // budget% * 500 / 100 = budget * 5
  };

  const currentBudget = getPlayerConfig(player.id, 'budget', '0');
  const calculatedPrice = calculatePrice(currentBudget);

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
        
        {/* Player Info - Nome */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: theme.spacing[2],
          width: '350px',
          minWidth: '350px',
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
          
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: theme.spacing[2],
            minWidth: 0,
            flex: 1
          }}>
            {/* TeamBadge con colori della squadra */}
            <TeamBadge teamName={player.squadra} size={theme.spacing[8]} />
            
            <div style={{ minWidth: 0, flex: 1 }}>
              <div style={{
                color: theme.colors.dark.text.tertiary,
                fontSize: theme.typography.fontSize.xs,
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
                textOverflow: 'ellipsis',
                display: 'flex',
                alignItems: 'center',
                gap: theme.spacing[2]
              }}>
                {player.nome}
                
                {/* PlayerNoteSelector posizionato alla destra del nome */}
                <PlayerNoteSelector
                  value={getPlayerConfig(player.id, 'note', '')}
                  onChange={(value) => updatePlayerConfig(player.id, 'note', value)}
                  readOnly={false}
                  size={24}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Colonna Ruoli */}
        <div style={{ 
          width: '130px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <RoleBadges roles={player.rmArray} />
        </div>

        {/* Prezzo (Non editabile - Calcolato automaticamente) */}
        <div style={{ 
          width: columnWidths[2],
          display: 'flex',
          justifyContent: 'center'
        }}>
          <div style={{
            background: 'rgba(34, 197, 94, 0.2)',
            color: theme.colors.primary[400],
            border: `1px solid ${theme.colors.primary[500]}`,
            textAlign: 'center',
            borderRadius: theme.borderRadius.full,
            padding: `${theme.spacing[1]} ${theme.spacing[2]}`,
            width: '80px',
            fontSize: theme.typography.fontSize.xs,
            fontWeight: theme.typography.fontWeight.semibold
          }}>
            {calculatedPrice}
          </div>
        </div>

        {/* Budget con simbolo % */}
        <div style={{ 
          width: columnWidths[3],
          display: 'flex',
          justifyContent: 'center'
        }}>
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <Input
              type="number"
              value={getPlayerConfig(player.id, 'budget', '')}
              onChange={(e) => updatePlayerConfig(player.id, 'budget', e.target.value)}
              placeholder="0"
              style={{
                background: 'rgba(34, 197, 94, 0.2)',
                color: theme.colors.primary[400],
                border: `1px solid ${theme.colors.primary[500]}`,
                textAlign: 'center',
                fontFamily: 'Manrope',
                borderRadius: theme.borderRadius.full,
                padding: `${theme.spacing[1]} ${theme.spacing[2]}`,
                paddingRight: '0px', // Spazio per il simbolo %
                width: '80px',
                fontSize: theme.typography.fontSize.xs,
                fontWeight: theme.typography.fontWeight.semibold,
              }}
            />
            <span style={{
              position: 'absolute',
              right: '8px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: theme.colors.primary[400],
              fontFamily: 'Manrope',
              fontSize: theme.typography.fontSize.xs,
              fontWeight: theme.typography.fontWeight.semibold,
              pointerEvents: 'none'
            }}>
              %
            </span>
          </div>
        </div>

        {/* PMAL */}
        <div style={{ 
          width: columnWidths[4],
          display: 'flex',
          justifyContent: 'center',
        }}>
          <Input
            type="number"
            value={getPlayerConfig(player.id, 'pmal', '')}
            onChange={(e) => updatePlayerConfig(player.id, 'pmal', e.target.value)}
            placeholder="0"
            style={{
              background: 'rgba(34, 197, 94, 0.2)',
              color: theme.colors.primary[400],
              border: `1px solid ${theme.colors.primary[500]}`,
              textAlign: 'center',
              borderRadius: theme.borderRadius.full,
              padding: `${theme.spacing[1]} ${theme.spacing[2]}`,
              width: '60px',
              fontSize: theme.typography.fontSize.xs,
              fontFamily: 'Manrope',
              fontWeight: theme.typography.fontWeight.semibold,
            }}
          />
        </div>

        {/* Quo (Read-only) */}
        <div style={{ 
          color: theme.colors.dark.text.primary, 
          textAlign: 'center', 
          fontWeight: theme.typography.fontWeight.medium, 
          fontSize: theme.typography.fontSize.sm,
          width: columnWidths[5]
        }}>
          {player.quotazioneAttuale || 0}
        </div>

        {/* Star Rating Fields - Titolare, Affidabilità, Fisico */}
        {inputConfigs.slice(2).map((config, configIndex) => (
          <div key={config.field} style={{ 
            width: columnWidths[configIndex + 6], // Partono dalla posizione 6
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <StarRating
              value={getPlayerConfig(player.id, config.field, '0')}
              onChange={(value) => updatePlayerConfig(player.id, config.field, value.toString())}
              size={14}
              color={config.color}
            />
          </div>
        ))}

        {/* FMV (Read-only) */}
        <div style={{ 
          color: theme.colors.dark.text.primary, 
          textAlign: 'center', 
          fontWeight: theme.typography.fontWeight.medium, 
          fontSize: theme.typography.fontSize.sm,
          width: columnWidths[9]
        }}>
          {Math.round(player.fvm / 2)}
        </div>
      </div>
    </div>
  );
};

export default PlayerRow;