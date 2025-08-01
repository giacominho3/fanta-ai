import React from 'react';
import { theme } from '../theme/theme';
import { Text } from './ui/Typography';
import { getRoleColor } from './ConfigurationHeader';
import AuctionPlayerRow from './AuctionPlayerRow';

const AuctionPlayersView = ({
  filteredPlayers,
  getPlayerConfig,
  getPlayerAuction,
  updatePlayerAuction,
  selectedRole
}) => {
  const getRoleDisplayName = (role) => {
    const roleMap = {
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
    return roleMap[role] || role;
  };

  const tableHeaders = [
    'Nome', 'Prezzo', 'Budget', 'App', 'Quo', 'Tit', 'Aff',
    'Fis', 'FMV Exp.', 'MV', 'FVM', 'Pres', 'Gol', 'Ass', 'Squadra', 'Prezzo Asta'
  ];

  // Larghezze delle colonne (incluse le nuove per asta)
  const columnWidths = [
    '280px', // Nome
    '60px',  // Prezzo
    '60px',  // Budget  
    '60px',  // PMAL
    '60px',  // Quo
    '60px',  // Titolare
    '60px',  // Affidabilità
    '60px',  // Fisico
    '60px',  // FMV Exp
    '60px',  // MV
    '60px',  // FMV
    '60px',  // Presenze
    '60px',  // Gol
    '60px',  // Assist
    '120px', // Squadra (dropdown)
    '80px'   // Prezzo Asta
  ];

  return (
    <div>
      {/* Stats Header */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        marginBottom: theme.spacing[6],
        padding: `0 ${theme.spacing[6]}`
      }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: theme.spacing[3] 
        }}>
          <div style={{ 
            width: theme.spacing[3], 
            height: theme.spacing[3], 
            background: getRoleColor(selectedRole), 
            borderRadius: '50%' 
          }}></div>
          <h2 style={{ 
            color: theme.colors.dark.text.primary, 
            fontSize: theme.typography.fontSize.lg, 
            fontWeight: theme.typography.fontWeight.semibold, 
            margin: 0 
          }}>
            {getRoleDisplayName(selectedRole)}
          </h2>
          <Text color="muted">({filteredPlayers.length})</Text>
        </div>
        
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: theme.spacing[4],
          fontSize: theme.typography.fontSize.sm 
        }}>
          <div style={{ 
            background: theme.colors.dark.surface.primary, 
            borderRadius: theme.borderRadius.lg, 
            padding: theme.spacing[3] 
          }}>
            <Text color="muted" style={{ display: 'inline' }}>Disponibili: </Text>
            <Text style={{ fontWeight: theme.typography.fontWeight.semibold, display: 'inline' }}>
              {filteredPlayers.filter(p => !getPlayerAuction(p.id, 'team')).length}
            </Text>
          </div>
          
          <div style={{ 
            background: 'rgba(239, 68, 68, 0.2)', 
            borderRadius: theme.borderRadius.lg, 
            padding: theme.spacing[3] 
          }}>
            <Text style={{ color: theme.colors.accent.red, display: 'inline' }}>Venduti: </Text>
            <Text style={{ 
              color: theme.colors.accent.red, 
              fontWeight: theme.typography.fontWeight.semibold,
              display: 'inline' 
            }}>
              {filteredPlayers.filter(p => getPlayerAuction(p.id, 'team')).length}
            </Text>
          </div>
        </div>
      </div>

      {/* Table */}
      <div style={{
        background: 'rgba(0, 0, 0, 0.1)',
        backdropFilter: 'blur(12px)',
        borderRadius: theme.borderRadius.xl,
        overflow: 'hidden'
      }}>
        
        {/* Table Header */}
        <div style={{
          background: 'rgba(0, 0, 0, 0.2)',
          padding: theme.spacing[3],
          display: 'grid',
          gridTemplateColumns: columnWidths.join(' '),
          gap: theme.spacing[2],
          fontSize: theme.typography.fontSize.xs,
          color: theme.colors.dark.text.tertiary,
          fontWeight: theme.typography.fontWeight.semibold,
          borderBottom: `1px solid ${theme.colors.dark.border.secondary}`,
          alignItems: 'center'
        }}>
          {tableHeaders.map((header, index) => (
            <div 
              key={header} 
              style={{ 
                textAlign: index === 0 ? 'left' : 'center',
                width: columnWidths[index],
                paddingLeft: index === 0 ? theme.spacing[2] : 0
              }}
            >
              {header}
            </div>
          ))}
        </div>

        {/* Players List */}
        <div style={{
          maxHeight: 'calc(100vh - 250px)',
          overflowY: 'auto'
        }}>
          {filteredPlayers.map((player, index) => {
            const isAuctioned = getPlayerAuction(player.id, 'team');
            
            return (
              <AuctionPlayerRow
                key={player.id}
                player={player}
                index={index}
                isAuctioned={isAuctioned}
                getPlayerConfig={getPlayerConfig}
                getPlayerAuction={getPlayerAuction}
                updatePlayerAuction={updatePlayerAuction}
              />
            );
          })}
        </div>

        {/* Empty State */}
        {filteredPlayers.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: theme.spacing[12],
            color: theme.colors.dark.text.tertiary
          }}>
            <div style={{ fontSize: theme.typography.fontSize.lg, marginBottom: theme.spacing[2] }}>
              Nessun giocatore trovato
            </div>
            <div style={{ fontSize: theme.typography.fontSize.sm }}>
              Prova a modificare i filtri o il termine di ricerca
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuctionPlayersView;