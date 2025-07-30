import { useState, useCallback } from 'react';

export const usePlayerConfig = () => {
  const [playerConfigs, setPlayerConfigs] = useState({});

  const updatePlayerConfig = useCallback((playerId, field, value) => {
    setPlayerConfigs(prev => ({
      ...prev,
      [playerId]: {
        ...prev[playerId],
        [field]: value
      }
    }));
  }, []);

  const getPlayerConfig = useCallback((playerId, field, defaultValue = '') => {
    return playerConfigs[playerId]?.[field] || defaultValue;
  }, [playerConfigs]);

  const saveConfigurations = useCallback((players, onSuccess) => {
    const dataToExport = {
      players: players.map(player => ({
        ...player,
        configurations: playerConfigs[player.id] || {}
      })),
      timestamp: new Date().toISOString(),
      totalPlayers: players.length,
      configuratedPlayers: Object.keys(playerConfigs).length
    };
    
    const blob = new Blob([JSON.stringify(dataToExport, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `listone-configurato-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    onSuccess?.(Object.keys(playerConfigs).length);
  }, [playerConfigs]);

  const resetAllConfigurations = useCallback((onSuccess) => {
    if (window.confirm('Sei sicuro di voler resettare tutte le configurazioni?')) {
      setPlayerConfigs({});
      onSuccess?.();
    }
  }, []);

  const getTotalBudgetAssigned = useCallback(() => {
    return Object.values(playerConfigs).reduce((sum, config) => 
      sum + (parseInt(config.budget) || 0), 0
    );
  }, [playerConfigs]);

  const getConfiguratedPlayersCount = useCallback(() => {
    return Object.keys(playerConfigs).length;
  }, [playerConfigs]);

  return {
    playerConfigs,
    updatePlayerConfig,
    getPlayerConfig,
    saveConfigurations,
    resetAllConfigurations,
    getTotalBudgetAssigned,
    getConfiguratedPlayersCount
  };
};