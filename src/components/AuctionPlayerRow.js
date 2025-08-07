import React from 'react';
import { Bookmark } from 'lucide-react';
import { theme } from '../theme/theme';
import Input from './ui/Input';
import RoleBadges from './ui/RoleBadge';
import StarRating from './ui/StarRating';
import { AUCTION_TEAMS } from '../hooks/useAuctionData';
import { TEAM_COLORS } from '../constants/teamColors';

const getTeamColors = (teamName) => {
  const normalizedName = teamName?.trim();
  if (TEAM_COLORS[normalizedName]) {
    return TEAM_COLORS[normalizedName];
  }
  return { primary: '#6B7280', secondary: '#4B5563' };
};

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
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '50%',
        height: '100%',
        background: colors.primary,
        clipPath: 'polygon(0 0, 100% 0, 80% 100%, 0 100%)'
      }} />
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

// Funzione per ottenere il colore della squadra di asta
const getAuctionTeamColor = (teamId) => {
  const team = AUCTION_TEAMS.find(team => team.id === teamId);
  return team ? team.color : theme.colors.accent.red; // fallback al rosso se non trova la squadra
};

const AuctionPlayerRow = ({ 
  player, 
  index, 
  isAuctioned,
  getPlayerConfig,
  getPlayerAuction,
  updatePlayerAuction
}) => {
  // Calcola il prezzo basato sul budget (budget% * 500)
  const calculatePrice = (budget) => {
    const budgetValue = parseFloat(budget) || 0;
    return Math.round(budgetValue * 5); // budget% * 500 / 100 = budget * 5
  };

  const currentBudget = getPlayerConfig(player.id, 'budget', '0');
  const calculatedPrice = calculatePrice(currentBudget);

  // Ottieni il colore della squadra di asta
  const teamId = getPlayerAuction(player.id, 'team');
  const auctionTeamColor = getAuctionTeamColor(teamId);

  // Configurazione dei campi (tutti read-only tranne team e price)
  const displayFields = [
    { field: 'prezzo', value: calculatedPrice, color: theme.colors.accent.orange },
    { field: 'budget', value: getPlayerConfig(player.id, 'budget', '-'), color: theme.colors.secondary[600] },
    { field: 'pmal', value: getPlayerConfig(player.id, 'pmal', '0'), color: 'rgba(37, 99, 235, 0.8)' },
    { field: 'titolare', value: getPlayerConfig(player.id, 'titolare', '0'), color: 'rgba(37, 99, 235, 0.8)' },
    { field: 'affidabilita', value: getPlayerConfig(player.id, 'affidabilita', '0'), color: 'rgba(37, 99, 235, 0.8)' },
    { field: 'fisico', value: getPlayerConfig(player.id, 'fisico', '0'), color: 'rgba(37, 99, 235, 0.8)' }
  ];

  // Larghezze delle colonne aggiornate (rimosse 5 colonne, allargate le rimanenti)
  const columnWidths = [
    '250px', // Nome (ridotta per modalità asta)
    '130px', // Ruoli (allargata)
    '90px',  // Prezzo (allargata)
    '90px',  // Budget (allargata)
    '70px',  // PMAL (allargata)
    '70px',  // Quo (allargata)
    '90px',  // Titolare (allargata) - ora stelline
    '90px',  // Affidabilità (allargata) - ora stelline
    '90px',  // Fisico (allargata) - ora stelline
    '70px',  // FMV (allargata)
    '150px', // Squadra (allargata)
    '100px'  // Prezzo Asta (allargata)
  ];

  return (
    <div style={{
      borderBottom: `1px solid ${theme.colors.dark.border.secondary}`,
      padding: theme.spacing[3],
      background: isAuctioned ? `${auctionTeamColor}20` : 'transparent', // Usa il colore della squadra con opacità
      borderLeft: isAuctioned ? `3px solid ${auctionTeamColor}` : 'none' // Bordo più spesso e colorato
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: columnWidths.join(' '),
        gap: theme.spacing[2],
        alignItems: 'center',
        width: '100%'
      }}>
        
        {/* Player Info - Nome senza ruoli */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: theme.spacing[2],
          width: '250px',
          minWidth: '250px',
          overflow: 'hidden'
        }}>
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
            color={isAuctioned ? auctionTeamColor : theme.colors.dark.text.tertiary} // Usa il colore della squadra
            style={{ flexShrink: 0 }}
          />
          
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: theme.spacing[2],
            minWidth: 0,
            flex: 1
          }}>
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
                color: isAuctioned ? theme.colors.dark.text.tertiary : theme.colors.primary[500], 
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

        {/* Colonna Ruoli */}
        <div style={{ 
          width: '130px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <RoleBadges roles={player.rmArray} />
        </div>

        {/* Read-only Fields - Prima del Quo */}
        {displayFields.slice(0, 3).map((config, configIndex) => (
          <div key={config.field} style={{ 
            width: columnWidths[configIndex + 2], // +2 perché ora abbiamo Nome + Ruoli
            display: 'flex',
            justifyContent: 'center'
          }}>
            <div style={{
              background: config.color,
              color: 'white',
              textAlign: 'center',
              borderRadius: config.field === 'prezzo' ? theme.borderRadius.full : theme.borderRadius.base,
              padding: `${theme.spacing[1]} ${theme.spacing[2]}`,
              width: config.field === 'budget' ? '80px' : '60px',
              fontSize: theme.typography.fontSize.xs,
              fontWeight: theme.typography.fontWeight.semibold,
              position: 'relative'
            }}>
              {config.field === 'budget' && config.value !== '-' ? `${config.value}%` : config.value}
            </div>
          </div>
        ))}

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

        {/* Star Rating Fields - Titolare, Affidabilità, Fisico (Read-only) */}
        {displayFields.slice(3).map((config, configIndex) => (
          <div key={config.field} style={{ 
            width: columnWidths[configIndex + 6], // Partono dalla posizione 6
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <StarRating
              value={getPlayerConfig(player.id, config.field, '0')}
              size={12}
              color={config.color}
              readOnly={true}
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
          {player.fvm}
        </div>

        {/* Team Dropdown */}
        <div style={{ width: columnWidths[10], display: 'flex', justifyContent: 'center' }}>
          <select
            value={getPlayerAuction(player.id, 'team')}
            onChange={(e) => updatePlayerAuction(player.id, 'team', e.target.value)}
            style={{
              background: theme.colors.dark.surface.primary,
              color: theme.colors.dark.text.primary,
              border: `1px solid ${theme.colors.dark.border.primary}`,
              borderRadius: theme.borderRadius.base,
              padding: `${theme.spacing[1]} ${theme.spacing[2]}`,
              fontSize: theme.typography.fontSize.xs,
              width: '140px'
            }}
          >
            <option value="">Squadra</option>
            {AUCTION_TEAMS.map(team => (
              <option key={team.id} value={team.id}>
                {team.name}
              </option>
            ))}
          </select>
        </div>

        {/* Auction Price */}
        <div style={{ width: columnWidths[11], display: 'flex', justifyContent: 'center' }}>
          <Input
            type="number"
            value={getPlayerAuction(player.id, 'price')}
            onChange={(e) => updatePlayerAuction(player.id, 'price', e.target.value)}
            placeholder="FM"
            style={{
              background: theme.colors.accent.orange,
              color: 'white',
              textAlign: 'center',
              borderRadius: theme.borderRadius.base,
              padding: `${theme.spacing[1]} ${theme.spacing[2]}`,
              width: '80px',
              fontSize: theme.typography.fontSize.xs,
              fontWeight: theme.typography.fontWeight.semibold,
              border: '0'
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AuctionPlayerRow;