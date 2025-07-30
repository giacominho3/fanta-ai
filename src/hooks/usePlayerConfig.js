import { useState, useCallback, useEffect } from 'react';

const CONFIG_STORAGE_KEY = 'fantaai_player_configs';

export const usePlayerConfig = () => {
  const [playerConfigs, setPlayerConfigs] = useState({});

  // Carica le configurazioni salvate all'avvio
  useEffect(() => {
    const loadSavedConfigs = () => {
      try {
        const savedConfigs = localStorage.getItem(CONFIG_STORAGE_KEY);
        if (savedConfigs) {
          const configData = JSON.parse(savedConfigs);
          setPlayerConfigs(configData.configs || {});
          console.log(`✓ Caricate configurazioni per ${Object.keys(configData.configs || {}).length} giocatori`);
        }
      } catch (error) {
        console.error('Errore nel caricamento delle configurazioni salvate:', error);
      }
    };

    loadSavedConfigs();
  }, []);

  // Salva le configurazioni quando cambiano
  const saveConfigs = useCallback((configs) => {
    try {
      const dataToSave = {
        configs,
        timestamp: new Date().toISOString(),
        version: '1.0'
      };
      localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(dataToSave));
      console.log(`✓ Configurazioni salvate per ${Object.keys(configs).length} giocatori`);
    } catch (error) {
      console.error('Errore nel salvataggio delle configurazioni:', error);
    }
  }, []);

  const updatePlayerConfig = useCallback((playerId, field, value) => {
    setPlayerConfigs(prev => {
      const updated = {
        ...prev,
        [playerId]: {
          ...prev[playerId],
          [field]: value,
          lastModified: new Date().toISOString()
        }
      };
      
      // Salva automaticamente dopo ogni modifica
      saveConfigs(updated);
      
      return updated;
    });
  }, [saveConfigs]);

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
      configuratedPlayers: Object.keys(playerConfigs).length,
      exportVersion: '1.0'
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
    if (window.confirm('Sei sicuro di voler resettare tutte le configurazioni? Questa azione non può essere annullata.')) {
      setPlayerConfigs({});
      // Cancella anche dal localStorage
      try {
        localStorage.removeItem(CONFIG_STORAGE_KEY);
        console.log('✓ Tutte le configurazioni sono state cancellate');
      } catch (error) {
        console.error('Errore nella cancellazione delle configurazioni:', error);
      }
      onSuccess?.();
    }
  }, []);

  // Funzione per importare configurazioni da file JSON
  const importConfigurations = useCallback((jsonData, onSuccess, onError) => {
    try {
      const data = typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData;
      
      if (data.players && Array.isArray(data.players)) {
        const importedConfigs = {};
        
        data.players.forEach(player => {
          if (player.configurations && Object.keys(player.configurations).length > 0) {
            importedConfigs[player.id] = {
              ...player.configurations,
              importedAt: new Date().toISOString()
            };
          }
        });
        
        setPlayerConfigs(importedConfigs);
        saveConfigs(importedConfigs);
        
        onSuccess?.(Object.keys(importedConfigs).length);
        console.log(`✓ Importate configurazioni per ${Object.keys(importedConfigs).length} giocatori`);
      } else {
        throw new Error('Formato file non valido');
      }
    } catch (error) {
      console.error('Errore nell\'importazione delle configurazioni:', error);
      onError?.(error.message);
    }
  }, [saveConfigs]);

  // Funzione per ottenere statistiche sulle configurazioni salvate
  const getConfigurationStats = useCallback(() => {
    try {
      const savedConfigs = localStorage.getItem(CONFIG_STORAGE_KEY);
      if (savedConfigs) {
        const configData = JSON.parse(savedConfigs);
        return {
          hasConfigurations: true,
          configuratedPlayers: Object.keys(configData.configs || {}).length,
          timestamp: configData.timestamp,
          totalBudgetAssigned: Object.values(configData.configs || {}).reduce((sum, config) => 
            sum + (parseInt(config.budget) || 0), 0
          )
        };
      }
    } catch (error) {
      console.error('Errore nel recuperare le statistiche delle configurazioni:', error);
    }
    return { hasConfigurations: false };
  }, []);

  const getTotalBudgetAssigned = useCallback(() => {
    return Object.values(playerConfigs).reduce((sum, config) => 
      sum + (parseInt(config.budget) || 0), 0
    );
  }, [playerConfigs]);

  const getConfiguratedPlayersCount = useCallback(() => {
    return Object.keys(playerConfigs).length;
  }, [playerConfigs]);

  // Funzione per cancellare tutte le configurazioni salvate
  const clearAllSavedData = useCallback(() => {
    try {
      localStorage.removeItem(CONFIG_STORAGE_KEY);
      setPlayerConfigs({});
      console.log('✓ Tutti i dati delle configurazioni cancellati');
    } catch (error) {
      console.error('Errore nella cancellazione dei dati:', error);
    }
  }, []);

  return {
    playerConfigs,
    updatePlayerConfig,
    getPlayerConfig,
    saveConfigurations,
    resetAllConfigurations,
    getTotalBudgetAssigned,
    getConfiguratedPlayersCount,
    importConfigurations,
    getConfigurationStats,
    clearAllSavedData
  };
};