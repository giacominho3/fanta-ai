import { useState, useCallback, useEffect } from 'react';
import * as XLSX from 'xlsx';

const STORAGE_KEY = 'fantaai_player_data';

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
            // Filtra per il ruolo salvato
            const filtered = savedPlayers.filter(player => 
              player.rmArray && player.rmArray.includes(savedRole || 'T')
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
      setFilteredPlayers(processedPlayers.filter(p => p.rmArray.includes(defaultRole)));
      
      // Salva automaticamente dopo il caricamento
      saveData(processedPlayers, defaultRole);
      
      onSuccess?.(processedPlayers, file.name);
      
      console.log('Giocatori processati e salvati:', processedPlayers.slice(0, 5));
      
    } catch (error) {
      console.error('Errore nel processare Excel:', error);
      onError?.(error);
    } finally {
      setLoading(false);
    }
  }, [saveData]);

  const filterPlayersByRole = useCallback((role) => {
    setSelectedRole(role);
    let filtered = players.filter(player => player.rmArray.includes(role));
    
    if (searchTerm) {
      filtered = filtered.filter(player => 
        player.nome.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredPlayers(filtered);
    
    // Salva il ruolo selezionato
    if (players.length > 0) {
      saveData(players, role);
    }
  }, [players, searchTerm, saveData]);

  const handleSearch = useCallback((term) => {
    setSearchTerm(term);
    if (term) {
      const filtered = players.filter(player => 
        player.nome.toLowerCase().includes(term.toLowerCase()) &&
        player.rmArray.includes(selectedRole)
      );
      setFilteredPlayers(filtered);
    } else {
      filterPlayersByRole(selectedRole);
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