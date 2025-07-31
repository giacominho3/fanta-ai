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
    'Nome', 'Prezzo', 'Budget', 'App', 'Quo', 'Tit', 'Aff',
    'Fis', 'FMV Exp.', 'MV', 'FVM', 'Pres', 'Gol', 'Ass'
  ];

  // Stesse larghezze del PlayerRow per perfetto allineamento
  const columnWidths = [
    '280px', // Nome (fissa)
    '60px',  // Prezzo
    '60px',  // Budget  
    '60px',  // PMAL
    '60px',  // Quo
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
            maxHeight: 'calc(100vh - 200px)', // Tabella più alta, occupa quasi tutto lo schermo
            overflowY: 'auto'
          }}>
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
    </div>
  );
};

export default ConfigurationPage;