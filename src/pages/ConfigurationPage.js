import React from 'react';
import { theme, gradients } from '../theme/theme';
import ConfigurationHeader from '../components/ConfigurationHeader';
import ConfigurationStats from '../components/ConfigurationStats';
import PlayerRow from '../components/PlayerRow';

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
  const tableHeaders = [
    'Nome', 'Prezzo', 'Budget', 'PMAL', 'Quo', 'Titolar.', 'Affida.',
    'Fisico', 'FMV Exp.', 'MV', 'FMV', 'Pres.', 'Gol', 'Assist'
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
            padding: theme.spacing[4],
            display: 'grid',
            gridTemplateColumns: '2fr repeat(13, 1fr)',
            gap: theme.spacing[3],
            fontSize: theme.typography.fontSize.xs,
            color: theme.colors.dark.text.tertiary,
            fontWeight: theme.typography.fontWeight.medium,
            borderBottom: `1px solid ${theme.colors.dark.border.secondary}`
          }}>
            {tableHeaders.map(header => (
              <div key={header} style={{ textAlign: header === 'Nome' ? 'left' : 'center' }}>
                {header}
              </div>
            ))}
          </div>

          {/* Players List */}
          {filteredPlayers.map((player, index) => {
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
    </div>
  );
};

export default ConfigurationPage;