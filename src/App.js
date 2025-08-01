import React, { useState } from 'react';
import HomePage from './pages/HomePage';
import LoadingPage from './pages/LoadingPage';
import ConfigurationPage from './pages/ConfigurationPage';
import AuctionPage from './pages/AuctionPage';
import NotificationSystem from './components/NotificationSystem';
import { useNotifications } from './hooks/useNotifications';
import { usePlayerData } from './hooks/usePlayerData';
import { usePlayerConfig } from './hooks/usePlayerConfig';
import { ROLES } from './constants/roles';

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [budget] = useState(500);

  // Custom hooks
  const { notifications, addNotification, removeNotification } = useNotifications();
  const { 
    players, 
    filteredPlayers, 
    selectedRole, 
    searchTerm, 
    loading, 
    processExcelData,
    filterPlayersByRole,
    handleSearch 
  } = usePlayerData();
  
  const {
    playerConfigs,
    updatePlayerConfig,
    getPlayerConfig,
    saveConfigurations,
    resetAllConfigurations,
    getTotalBudgetAssigned,
    getConfiguratedPlayersCount
  } = usePlayerConfig();

  // Navigation
  const navigateTo = (view) => {
    setCurrentView(view);
  };

  // File upload handler
  const handleFileUpload = async (file) => {
    await processExcelData(
      file,
      (processedPlayers, fileName) => {
        addNotification('success', `${processedPlayers.length} giocatori caricati da ${fileName}`);
      },
      (error) => {
        addNotification('error', `Errore nel caricamento: ${error.message}`);
      }
    );
  };

  // Configuration handlers
  const handleSaveConfigurations = () => {
    saveConfigurations(
      players,
      (count) => {
        addNotification('success', `Configurazioni salvate! ${count} giocatori configurati`);
      }
    );
  };

  const handleResetConfigurations = () => {
    resetAllConfigurations(() => {
      addNotification('warning', 'Tutte le configurazioni sono state resettate');
    });
  };

  // Stats for configuration page
  const configurationStats = {
    totalPlayers: players.length,
    configuratedCount: getConfiguratedPlayersCount(),
    totalBudgetAssigned: getTotalBudgetAssigned()
  };

  // Render appropriate page
  const renderCurrentView = () => {
    switch (currentView) {
      case 'home':
        return (
          <HomePage
            players={players}
            budget={budget}
            onNavigate={navigateTo}
            addNotification={addNotification}
          />
        );
      
      case 'loading':
        return (
          <LoadingPage
            players={players}
            loading={loading}
            onNavigate={navigateTo}
            onFileUpload={handleFileUpload}
            addNotification={addNotification}
          />
        );
      
      case 'configuration':
        return (
          <ConfigurationPage
            filteredPlayers={filteredPlayers}
            searchTerm={searchTerm}
            onSearch={handleSearch}
            selectedRole={selectedRole}
            onRoleChange={filterPlayersByRole}
            budget={budget}
            getPlayerConfig={getPlayerConfig}
            updatePlayerConfig={updatePlayerConfig}
            onSaveConfigurations={handleSaveConfigurations}
            onResetConfigurations={handleResetConfigurations}
            onNavigateHome={() => navigateTo('home')}
            roles={ROLES}
            stats={configurationStats}
          />
        );
      
      case 'auction':
        return (
          <AuctionPage
            filteredPlayers={filteredPlayers}
            searchTerm={searchTerm}
            onSearch={handleSearch}
            selectedRole={selectedRole}
            onRoleChange={filterPlayersByRole}
            getPlayerConfig={getPlayerConfig}
            onNavigateHome={() => navigateTo('home')}
            roles={ROLES}
            players={players}
          />
        );
      
      default:
        return <HomePage />;
    }
  };

  return (
    <div>
      {renderCurrentView()}
      <NotificationSystem 
        notifications={notifications}
        removeNotification={removeNotification}
      />
    </div>
  );
}

export default App;