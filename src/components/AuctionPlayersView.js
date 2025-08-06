import React from 'react';
import { theme } from '../theme/theme';
import { Text } from './ui/Typography';
import { getRoleColor } from './ConfigurationHeader';
import AuctionPlayerRow from './AuctionPlayerRow';
import SortableHeader from './SortableHeader';
import { useSorting } from '../hooks/useSorting';

const AuctionPlayersView = ({
  filteredPlayers,
  getPlayerConfig,
  getPlayerAuction,
  updatePlayerAuction,
  selectedRole
}) => {
  // Hook per l'ordinamento
  const { sortedData, sortField, sortDirection, handleSort } = useSorting(filteredPlayers, getPlayerConfig);

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

  // Header delle tabelle con configurazioni di ordinamento
  const tableHeaders = [
    { label: 'Nome', field: null, sortable: false },
    { label: 'Ruoli', field: null, sortable: false },
    { label: 'Prezzo', field: 'prezzo', sortable: true },
    { label: 'Budget', field: 'budget', sortable: true },
    { label: 'App', field: 'app', sortable: true },
    { label: 'Quo', field: null, sortable: false },
    { label: 'Tit', field: null, sortable: false },
    { label: 'Aff', field: null, sortable: false },
    { label: 'Fis', field: null, sortable: false },
    { label: 'FVM', field: 'fvm', sortable: true },
    { label: 'Squadra', field: null, sortable: false },
    { label: 'Prezzo Asta', field: null, sortable: false }
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
          <Text color="muted">({sortedData.length})</Text>
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
              {sortedData.filter(p => !getPlayerAuction(p.id, 'team')).length}
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
              {sortedData.filter(p => getPlayerAuction(p.id, 'team')).length}
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
              key={typeof header === 'string' ? header : header.label} 
              style={{ 
                textAlign: index === 0 ? 'left' : 'center',
                width: columnWidths[index],
                paddingLeft: index === 0 ? theme.spacing[2] : 0
              }}
            >
              <SortableHeader
                field={typeof header === 'object' ? header.field : null}
                sortField={sortField}
                sortDirection={sortDirection}
                onSort={handleSort}
                sortable={typeof header === 'object' ? header.sortable : false}
                style={{
                  justifyContent: index === 0 ? 'flex-start' : 'center'
                }}
              >
                {typeof header === 'string' ? header : header.label}
              </SortableHeader>
            </div>
          ))}
        </div>

        {/* Players List */}
        <div style={{
          maxHeight: 'calc(100vh - 250px)',
          overflowY: 'auto'
        }}>
          {sortedData.map((player, index) => {
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
        {sortedData.length === 0 && (
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