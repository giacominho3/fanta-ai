import { useState, useCallback, useEffect } from 'react';
import * as XLSX from 'xlsx';

const STORAGE_KEY = 'fantaai_player_data';

// Definizione delle fasce di difensività (più basso = più difensivo)
const ROLE_DEFENSIVE_TIER = {
  // 1° fascia - più difensiva
  'Por': 1,
  
  // 2° fascia
  'Dc': 2,
  'B': 2,

  // 3° fascia
  'Dd': 3,
  'Ds': 3,
  
  // 4° fascia
  'E': 4,
  'M': 4,
  
  // 5° fascia
  'C': 5,
  
  // 6° fascia
  'W': 6,
  'T': 6,
  
  // 7° fascia - più offensiva
  'A': 7,
  'Pc': 7
};

// Funzione per determinare se un giocatore dovrebbe apparire in un determinato ruolo
const shouldPlayerAppearInRole = (playerRoles, targetRole) => {
  if (!playerRoles || !playerRoles.includes(targetRole)) {
    return false; // Il giocatore non ha questo ruolo
  }
  
  // Trova la fascia più difensiva tra i ruoli del giocatore
  const mostDefensiveTier = Math.min(
    ...playerRoles
      .filter(role => ROLE_DEFENSIVE_TIER[role] !== undefined)
      .map(role => ROLE_DEFENSIVE_TIER[role])
  );
  
  // Il giocatore appare nel ruolo solo se appartiene alla fascia più difensiva
  return ROLE_DEFENSIVE_TIER[targetRole] === mostDefensiveTier;
};

export const usePlayerData = () => {
  const [players, setPlayers] = useState([]);
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [selectedRole, setSelectedRole] = useState('T');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  // Carica i dati salvati all'avvio
  useEffect(() => {
    const loadSavedData = () => {
      try {
        const savedData = localStorage.getItem(STORAGE_KEY);
        if (savedData) {
          const { players: savedPlayers, selectedRole: savedRole } = JSON.parse(savedData);
          if (savedPlayers && savedPlayers.length > 0) {
            setPlayers(savedPlayers);
            setSelectedRole(savedRole || 'T');
            // Filtra per il ruolo salvato usando la nuova logica
            const filtered = savedPlayers.filter(player => 
              shouldPlayerAppearInRole(player.rmArray, savedRole || 'T')
            );
            setFilteredPlayers(filtered);
            console.log(`✓ Caricati ${savedPlayers.length} giocatori dal salvataggio locale`);
          }
        }
      } catch (error) {
        console.error('Errore nel caricamento dei dati salvati:', error);
      }
    };

    loadSavedData();
  }, []);

  // Salva i dati quando cambiano
  const saveData = useCallback((playersToSave, roleToSave) => {
    try {
      const dataToSave = {
        players: playersToSave,
        selectedRole: roleToSave,
        timestamp: new Date().toISOString(),
        version: '1.0'
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
      console.log(`✓ Dati salvati: ${playersToSave.length} giocatori`);
    } catch (error) {
      console.error('Errore nel salvataggio dei dati:', error);
    }
  }, []);

  const processExcelData = useCallback(async (file, onSuccess, onError) => {
    setLoading(true);
    try {
      const fileBuffer = await file.arrayBuffer();
      const workbook = XLSX.read(fileBuffer, { type: 'array' });
      
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      
      console.log('Dati Excel grezzi:', jsonData.slice(0, 5));
      
      const processedPlayers = jsonData.map(row => ({
        id: row.Id || row.ID || Math.random(),
        nome: row.Nome || row.NOME || '',
        ruolo: row.R || row.Ruolo || '',
        rm: row.RM || row['R.M'] || row.Ruolo || '',
        rmArray: (row.RM || row['R.M'] || row.Ruolo || '').split(';').map(r => r.trim()),
        squadra: row.Squadra || row.SQUADRA || '',
        fvm: parseFloat(row['FVM M'] || row.FVM || row['Fvm M'] || 0),
        quotazione: parseFloat(row.Qt || row.Quotazione || 0),
        // AGGIUNTA: campo per Qt.A M (quotazione attuale)
        quotazioneAttuale: parseFloat(row['Qt.A M'] || row['Qt A M'] || row['Qt.AM'] || row['QtAM'] || 0),
        // Metadati per la persistenza
        loadedAt: new Date().toISOString(),
        fileName: file.name
      })).filter(player => player.nome && player.nome.trim() !== '');
      
      setPlayers(processedPlayers);
      const defaultRole = 'T';
      setSelectedRole(defaultRole);
      
      // Applica la nuova logica di filtraggio
      const filtered = processedPlayers.filter(player => 
        shouldPlayerAppearInRole(player.rmArray, defaultRole)
      );
      setFilteredPlayers(filtered);
      
      // Salva automaticamente dopo il caricamento
      saveData(processedPlayers, defaultRole);
      
      onSuccess?.(processedPlayers, file.name);
      
      console.log('Giocatori processati e salvati:', processedPlayers.slice(0, 5));
      console.log(`✓ Filtro difensività applicato: ${filtered.length} giocatori per ruolo ${defaultRole}`);
      
    } catch (error) {
      console.error('Errore nel processare Excel:', error);
      onError?.(error);
    } finally {
      setLoading(false);
    }
  }, [saveData]);

  const filterPlayersByRole = useCallback((role, currentSearchTerm = null) => {
    setSelectedRole(role);
    
    // Usa il parametro passato o il searchTerm corrente
    const termToUse = currentSearchTerm !== null ? currentSearchTerm : searchTerm;
    
    // Applica il filtro per difensività: i giocatori appaiono solo nei ruoli più difensivi che possiedono
    let filtered = players.filter(player => 
      shouldPlayerAppearInRole(player.rmArray, role)
    );
    
    if (termToUse && termToUse.trim()) {
      filtered = filtered.filter(player => 
        player.nome.toLowerCase().includes(termToUse.toLowerCase())
      );
    }
    
    setFilteredPlayers(filtered);
    
    // Debug log per verificare il comportamento
    const multiRolePlayers = players.filter(p => p.rmArray && p.rmArray.length > 1);
    console.log(`🔍 Filtraggio ruolo ${role}:`);
    console.log(`- Giocatori totali: ${players.length}`);
    console.log(`- Giocatori multiruolo: ${multiRolePlayers.length}`);
    console.log(`- Giocatori mostrati per ${role}: ${filtered.length}`);
    console.log(`- Search term: "${termToUse}"`);
    
    // Salva il ruolo selezionato
    if (players.length > 0) {
      saveData(players, role);
    }
  }, [players, searchTerm, saveData]);

  const handleSearch = useCallback((term) => {
    const cleanTerm = term.trim();
    setSearchTerm(cleanTerm);
    
    // Passa il termine di ricerca corrente direttamente alla funzione
    if (cleanTerm && cleanTerm.length > 0) {
      // Applica sia il filtro di ricerca che quello di difensività
      const filtered = players.filter(player => 
        player.nome.toLowerCase().includes(cleanTerm.toLowerCase()) &&
        shouldPlayerAppearInRole(player.rmArray, selectedRole)
      );
      setFilteredPlayers(filtered);
    } else {
      // Passa esplicitamente una stringa vuota per resettare la ricerca
      filterPlayersByRole(selectedRole, "");
    }
  }, [players, selectedRole, filterPlayersByRole]);

  // Funzione per cancellare i dati salvati
  const clearSavedData = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      setPlayers([]);
      setFilteredPlayers([]);
      setSelectedRole('T');
      setSearchTerm('');
      console.log('✓ Dati salvati cancellati');
    } catch (error) {
      console.error('Errore nella cancellazione dei dati:', error);
    }
  }, []);

  // Funzione per ottenere info sui dati salvati
  const getSavedDataInfo = useCallback(() => {
    try {
      const savedData = localStorage.getItem(STORAGE_KEY);
      if (savedData) {
        const { players: savedPlayers, timestamp, fileName } = JSON.parse(savedData);
        return {
          hasData: true,
          playersCount: savedPlayers?.length || 0,
          timestamp,
          fileName: savedPlayers?.[0]?.fileName || fileName
        };
      }
    } catch (error) {
      console.error('Errore nel recuperare info sui dati salvati:', error);
    }
    return { hasData: false };
  }, []);

  return {
    players,
    filteredPlayers,
    selectedRole,
    searchTerm,
    loading,
    processExcelData,
    filterPlayersByRole,
    handleSearch,
    setPlayers,
    setFilteredPlayers,
    clearSavedData,
    getSavedDataInfo
  };
};