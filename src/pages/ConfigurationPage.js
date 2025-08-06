import React from 'react';
import { theme, gradients } from '../theme/theme';
import ConfigurationHeader from '../components/ConfigurationHeader';
import ConfigurationStats from '../components/ConfigurationStats';
import PlayerRow from '../components/PlayerRow';
import SortableHeader from '../components/SortableHeader';
import { useSorting } from '../hooks/useSorting';

const ConfigurationPage = ({
  filteredPlayers,
  searchTerm,
  onSearch,
  selectedRole,
  onRoleChange,
  budget,
  getPlayerConfig,
  updatePlayerConfig,
  onSaveConfigurations,
  onResetConfigurations,
  onNavigateHome,
  roles,
  stats
}) => {
  // Hook per l'ordinamento
  const { sortedData, sortField, sortDirection, handleSort } = useSorting(filteredPlayers, getPlayerConfig);

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
    { label: 'FVM', field: 'fvm', sortable: true }
  ];

  // Larghezze aggiornate - rimosse 5 colonne, allargate le rimanenti
  const columnWidths = [
    '350px', // Nome (allargata)
    '130px', // Ruoli (allargata)
    '90px',  // Prezzo (allargata, non editabile)
    '90px',  // Budget (allargata)
    '70px',  // PMAL (allargata)
    '70px',  // Quo (allargata)
    '90px',  // Titolare (allargata) - ora stelline
    '90px',  // Affidabilità (allargata) - ora stelline
    '90px',  // Fisico (allargata) - ora stelline
    '70px'   // FVM (allargata, read-only)
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: gradients.primary
    }}>
      
      {/* Header */}
      <ConfigurationHeader
        searchTerm={searchTerm}
        onSearch={onSearch}
        selectedRole={selectedRole}
        onRoleChange={onRoleChange}
        budget={budget}
        configuratedCount={stats.configuratedCount}
        totalBudgetAssigned={stats.totalBudgetAssigned}
        onSaveConfigurations={onSaveConfigurations}
        onResetConfigurations={onResetConfigurations}
        onNavigateHome={onNavigateHome}
        roles={roles}
      />

      {/* Content */}
      <div style={{ padding: theme.spacing[6] }}>
        
        {/* Stats */}
        <ConfigurationStats
          totalPlayers={stats.totalPlayers}
          configuratedCount={stats.configuratedCount}
          totalBudgetAssigned={stats.totalBudgetAssigned}
          selectedRole={selectedRole}
          filteredPlayersCount={filteredPlayers.length}
        />

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
            maxHeight: 'calc(100vh - 200px)', // Tabella più alta, occupa quasi tutto lo schermo
            overflowY: 'auto'
          }}>
            {sortedData.map((player, index) => {
              const isConfigured = getPlayerConfig(player.id, 'budget') || 
                                  getPlayerConfig(player.id, 'prezzo') !== player.quotazione;
              
              return (
                <PlayerRow
                  key={player.id}
                  player={player}
                  index={index}
                  isConfigured={isConfigured}
                  getPlayerConfig={getPlayerConfig}
                  updatePlayerConfig={updatePlayerConfig}
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
    </div>
  );
};

export default ConfigurationPage;