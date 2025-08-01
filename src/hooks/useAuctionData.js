import { useState, useCallback, useEffect } from 'react';

const AUCTION_STORAGE_KEY = 'fantaai_auction_data';

// Lista delle squadre per l'asta (puoi personalizzarla)
export const AUCTION_TEAMS = [
  { id: 'team1', name: 'Gigi', color: '#EF4444' },
  { id: 'team2', name: 'Signor', color: '#3B82F6' },
  { id: 'team3', name: 'Ben', color: '#10B981' },
  { id: 'team4', name: 'Abbo', color: '#F59E0B' },
  { id: 'team5', name: 'John', color: '#8B5CF6' },
  { id: 'team6', name: 'Rubi', color: '#EC4899' },
  { id: 'team7', name: 'Gabbo', color: '#06B6D4' },
  { id: 'team8', name: 'Giordano', color: '#84CC16' }
];

export const useAuctionData = (players = []) => {
  const [auctionData, setAuctionData] = useState({});

  // Carica i dati salvati all'avvio
  useEffect(() => {
    const loadSavedData = () => {
      try {
        const savedData = localStorage.getItem(AUCTION_STORAGE_KEY);
        if (savedData) {
          const { auction } = JSON.parse(savedData);
          setAuctionData(auction || {});
          console.log(`✓ Caricati dati asta per ${Object.keys(auction || {}).length} giocatori`);
        }
      } catch (error) {
        console.error('Errore nel caricamento dei dati asta:', error);
      }
    };

    loadSavedData();
  }, []);

  // Salva i dati quando cambiano
  const saveData = useCallback((data) => {
    try {
      const dataToSave = {
        auction: data,
        timestamp: new Date().toISOString(),
        version: '1.0'
      };
      localStorage.setItem(AUCTION_STORAGE_KEY, JSON.stringify(dataToSave));
      console.log(`✓ Dati asta salvati per ${Object.keys(data).length} giocatori`);
    } catch (error) {
      console.error('Errore nel salvataggio dei dati asta:', error);
    }
  }, []);

  const updatePlayerAuction = useCallback((playerId, field, value) => {
    setAuctionData(prev => {
      const updated = {
        ...prev,
        [playerId]: {
          ...prev[playerId],
          [field]: value,
          lastModified: new Date().toISOString()
        }
      };
      
      // Salva automaticamente dopo ogni modifica
      saveData(updated);
      
      return updated;
    });
  }, [saveData]);

  const getPlayerAuction = useCallback((playerId, field, defaultValue = '') => {
    return auctionData[playerId]?.[field] || defaultValue;
  }, [auctionData]);

  // Verifica se un giocatore è stato acquistato
  const isPlayerAuctioned = useCallback((playerId) => {
    const playerData = auctionData[playerId];
    return playerData && playerData.team && playerData.price;
  }, [auctionData]);

  // Ottieni tutti i giocatori di una squadra con i loro dati completi
  const getTeamPlayers = useCallback((teamId) => {
    return Object.entries(auctionData)
      .filter(([playerId, data]) => data.team === teamId)
      .map(([playerId, data]) => {
        // Trova i dati del giocatore nell'array players
        const playerInfo = players.find(p => p.id == playerId) || {};
        return {
          playerId,
          playerName: playerInfo.nome || 'Sconosciuto',
          playerRole: playerInfo.ruolo || 'N/A',
          playerRoles: playerInfo.rmArray || [],
          playerTeam: playerInfo.squadra || '',
          ...data
        };
      });
  }, [auctionData, players]);

  // Statistiche dell'asta
  const getAuctionStats = useCallback(() => {
    const auctionedPlayers = Object.values(auctionData).filter(data => 
      data.team && data.price
    );
    
    const totalSpent = auctionedPlayers.reduce((sum, data) => 
      sum + (parseInt(data.price) || 0), 0
    );

    const teamStats = AUCTION_TEAMS.map(team => {
      const teamPlayers = getTeamPlayers(team.id);
      const teamSpent = teamPlayers.reduce((sum, player) => 
        sum + (parseInt(player.price) || 0), 0
      );
      
      return {
        ...team,
        playersCount: teamPlayers.length,
        totalSpent: teamSpent,
        remainingBudget: 500 - teamSpent // Assumendo budget di 500
      };
    });

    return {
      totalPlayersAuctioned: auctionedPlayers.length,
      totalSpent,
      teamStats,
      averagePrice: auctionedPlayers.length > 0 ? Math.round(totalSpent / auctionedPlayers.length) : 0
    };
  }, [auctionData, getTeamPlayers]);

  // Reset dell'asta
  const resetAuction = useCallback(() => {
    setAuctionData({});
    try {
      localStorage.removeItem(AUCTION_STORAGE_KEY);
      console.log('✓ Dati asta resettati');
    } catch (error) {
      console.error('Errore nel reset dei dati asta:', error);
    }
  }, []);

  // Esporta dati asta
  const exportAuctionData = useCallback((players) => {
    const auctionResults = players.map(player => ({
      ...player,
      auction: auctionData[player.id] || {}
    })).filter(player => player.auction.team && player.auction.price);

    const dataToExport = {
      auctionResults,
      teamStats: getAuctionStats().teamStats,
      timestamp: new Date().toISOString(),
      totalPlayers: auctionResults.length,
      exportVersion: '1.0'
    };
    
    const blob = new Blob([JSON.stringify(dataToExport, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `risultati-asta-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [auctionData, getAuctionStats]);

  return {
    auctionData,
    updatePlayerAuction,
    getPlayerAuction,
    isPlayerAuctioned,
    getTeamPlayers,
    getAuctionStats,
    resetAuction,
    exportAuctionData
  };
};