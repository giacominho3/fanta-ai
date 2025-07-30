import { useState, useCallback } from 'react';
import * as XLSX from 'xlsx';

export const usePlayerData = () => {
  const [players, setPlayers] = useState([]);
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [selectedRole, setSelectedRole] = useState('T');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

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
      })).filter(player => player.nome && player.nome.trim() !== '');
      
      setPlayers(processedPlayers);
      setFilteredPlayers(processedPlayers.filter(p => p.rmArray.includes('T')));
      
      onSuccess?.(processedPlayers, file.name);
      
      console.log('Giocatori processati:', processedPlayers.slice(0, 5));
      
    } catch (error) {
      console.error('Errore nel processare Excel:', error);
      onError?.(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const filterPlayersByRole = useCallback((role) => {
    setSelectedRole(role);
    let filtered = players.filter(player => player.rmArray.includes(role));
    
    if (searchTerm) {
      filtered = filtered.filter(player => 
        player.nome.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredPlayers(filtered);
  }, [players, searchTerm]);

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
    setFilteredPlayers
  };
};