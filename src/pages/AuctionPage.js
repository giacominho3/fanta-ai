import React, { useState } from 'react';
import { theme, gradients } from '../theme/theme';
import { useAuctionData } from '../hooks/useAuctionData';
import AuctionHeader from '../components/AuctionHeader';
import AuctionPlayersView from '../components/AuctionPlayersView';
import AuctionTeamsView from '../components/AuctionTeamsView';
import MyTeamView from '../components/MyTeamView';

const AuctionPage = ({
  filteredPlayers,
  searchTerm,
  onSearch,
  selectedRole,
  onRoleChange,
  getPlayerConfig,
  onNavigateHome,
  roles,
  players
}) => {
  const [currentView, setCurrentView] = useState('players'); // 'players' o 'teams' o 'myteam'
  
  const {
    auctionData,
    updatePlayerAuction,
    getPlayerAuction,
    getTeamPlayers,
    getAuctionStats,
    resetAuction
  } = useAuctionData(players);

  const auctionStats = getAuctionStats();

  const handleViewChange = (view) => {
    setCurrentView(view);
  };

  const handleResetAuction = () => {
    if (window.confirm('Sei sicuro di voler resettare tutti i dati dell\'asta? Questa azione non può essere annullata.')) {
      resetAuction();
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: gradients.primary
    }}>
      
      {/* Header */}
      <AuctionHeader
        currentView={currentView}
        onViewChange={handleViewChange}
        searchTerm={searchTerm}
        onSearch={onSearch}
        selectedRole={selectedRole}
        onRoleChange={onRoleChange}
        onNavigateHome={onNavigateHome}
        onResetAuction={handleResetAuction}
        roles={roles}
        stats={auctionStats}
      />

      {/* Content */}
      <div style={{ padding: theme.spacing[6] }}>
        {currentView === 'players' ? (
          <AuctionPlayersView
            filteredPlayers={filteredPlayers}
            getPlayerConfig={getPlayerConfig}
            getPlayerAuction={getPlayerAuction}
            updatePlayerAuction={updatePlayerAuction}
            selectedRole={selectedRole}
          />
        ) : currentView === 'teams' ? (
          <AuctionTeamsView
            getTeamPlayers={getTeamPlayers}
            auctionStats={auctionStats}
          />
        ) : currentView === 'myteam' ? (
          <MyTeamView
            getTeamPlayers={getTeamPlayers}
          />
        ) : null}
      </div>
    </div>
  );
};

export default AuctionPage;