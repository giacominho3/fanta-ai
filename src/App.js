import React, { useState } from 'react';
import { Upload, Settings, Zap, Brain, Search, Bookmark, DollarSign, ArrowLeft, Download, CheckCircle, AlertTriangle } from 'lucide-react';
import * as XLSX from 'xlsx';

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [players, setPlayers] = useState([]);
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [selectedRole, setSelectedRole] = useState('T');
  const [searchTerm, setSearchTerm] = useState('');
  const [budget] = useState(500);
  const [notifications, setNotifications] = useState([]);
  const [playerConfigs, setPlayerConfigs] = useState({});
  const [loading, setLoading] = useState(false);

  const roles = [
    { key: 'Por', label: 'Por' }, { key: 'Ds', label: 'Ds' },
    { key: 'Dc', label: 'Dc' }, { key: 'B', label: 'B' },
    { key: 'Dd', label: 'Dd' }, { key: 'E', label: 'E' },
    { key: 'M', label: 'M' }, { key: 'C', label: 'C' },
    { key: 'W', label: 'W' }, { key: 'T', label: 'T' },
    { key: 'A', label: 'A' }, { key: 'Pc', label: 'Pc' }
  ];

  const addNotification = (type, message) => {
    const notification = { 
      id: Date.now(), 
      type, 
      message, 
      timestamp: new Date().toLocaleTimeString() 
    };
    setNotifications(prev => [notification, ...prev.slice(0, 2)]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== notification.id));
    }, 5000);
  };

  const processExcelData = async (file) => {
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
        squadra: row.Squadra || row.SQUADRA || '',
        fvm: parseFloat(row['FVM M'] || row.FVM || row['Fvm M'] || 0),
        quotazione: parseFloat(row.Qt || row.Quotazione || 0),
      })).filter(player => player.nome && player.nome.trim() !== '');
      
      setPlayers(processedPlayers);
      setFilteredPlayers(processedPlayers.filter(p => p.rm === 'T'));
      addNotification('success', `${processedPlayers.length} giocatori caricati da ${file.name}`);
      
      console.log('Giocatori processati:', processedPlayers.slice(0, 5));
      
    } catch (error) {
      console.error('Errore nel processare Excel:', error);
      addNotification('error', `Errore nel caricamento: ${error.message}`);
    }
    setLoading(false);
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.name.match(/\.(xlsx|xls)$/)) {
      addNotification('error', 'Formato file non supportato. Usa file Excel (.xlsx o .xls)');
      return;
    }

    await processExcelData(file);
    event.target.value = '';
  };

  const filterPlayersByRole = (role) => {
    setSelectedRole(role);
    let filtered = players.filter(player => player.rm === role);
    
    if (searchTerm) {
      filtered = filtered.filter(player => 
        player.nome.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredPlayers(filtered);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    if (term) {
      const filtered = players.filter(player => 
        player.nome.toLowerCase().includes(term.toLowerCase()) &&
        player.rm === selectedRole
      );
      setFilteredPlayers(filtered);
    } else {
      filterPlayersByRole(selectedRole);
    }
  };

  const updatePlayerConfig = (playerId, field, value) => {
    setPlayerConfigs(prev => ({
      ...prev,
      [playerId]: {
        ...prev[playerId],
        [field]: value
      }
    }));
  };

  const getPlayerConfig = (playerId, field, defaultValue = '') => {
    return playerConfigs[playerId]?.[field] || defaultValue;
  };

  const saveConfigurations = () => {
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
    
    addNotification('success', `Configurazioni salvate! ${Object.keys(playerConfigs).length} giocatori configurati`);
  };

  const resetAllConfigurations = () => {
    if (window.confirm('Sei sicuro di voler resettare tutte le configurazioni?')) {
      setPlayerConfigs({});
      addNotification('warning', 'Tutte le configurazioni sono state resettate');
    }
  };

  // HOME PAGE
  if (currentView === 'home') {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #581c87, #1e3a8a, #312e81)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        padding: '2rem'
      }}>
        <div style={{ maxWidth: '1200px', textAlign: 'center' }}>
          
          {/* Header */}
          <div style={{ marginBottom: '3rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <Brain size={64} color="#22d3ee" />
              <h1 style={{ fontSize: '4rem', fontWeight: 'bold', margin: 0 }}>FantaAI</h1>
            </div>
            <p style={{ fontSize: '1.25rem', color: '#a5f3fc', margin: '0 0 0.5rem 0' }}>
              L'assistente intelligente per il tuo fantacalcio
            </p>
            <p style={{ color: '#d8b4fe', margin: 0 }}>
              Analisi avanzate • Insights AI • Gestione completa dell'asta
            </p>
          </div>

          {/* Cards */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '2rem'
          }}>
            
            {/* Caricamento */}
            <div 
              onClick={() => setCurrentView('loading')}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(12px)',
                borderRadius: '1rem',
                padding: '2rem',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                e.target.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                e.target.style.transform = 'scale(1)';
              }}
            >
              <Upload size={64} color="#22d3ee" style={{ margin: '0 auto 1.5rem auto', display: 'block' }} />
              <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
                Caricamento Dati
              </h3>
              <p style={{ color: '#e9d5ff', marginBottom: '1.5rem' }}>
                Importa quotazioni dai file Excel di Fantacalcio.it
              </p>
              <div style={{ fontSize: '0.875rem', color: '#67e8f9' }}>
                <div>• Quotazioni ufficiali</div>
                <div>• Dati storici performance</div>
                <div>• Import automatico</div>
              </div>
            </div>

            {/* Configurazione */}
            <div 
              onClick={() => players.length > 0 ? setCurrentView('configuration') : addNotification('warning', 'Carica prima i dati dei giocatori')}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(12px)',
                borderRadius: '1rem',
                padding: '2rem',
                border: `1px solid ${players.length > 0 ? 'rgba(34, 197, 94, 0.5)' : 'rgba(255, 255, 255, 0.2)'}`,
                cursor: 'pointer',
                transition: 'all 0.3s',
                opacity: players.length > 0 ? 1 : 0.6
              }}
              onMouseEnter={(e) => {
                if (players.length > 0) {
                  e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                  e.target.style.transform = 'scale(1.05)';
                }
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                e.target.style.transform = 'scale(1)';
              }}
            >
              <Settings size={64} color="#4ade80" style={{ margin: '0 auto 1.5rem auto', display: 'block' }} />
              <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
                Configurazione Listone
              </h3>
              <p style={{ color: '#e9d5ff', marginBottom: '1.5rem' }}>
                Personalizza priorità e budget per ogni giocatore
              </p>
              <div style={{ fontSize: '0.875rem', color: '#86efac', marginBottom: '1rem' }}>
                <div>• Lista desideri</div>
                <div>• Budget allocation</div>
                <div>• Priorità e note</div>
              </div>
              {players.length === 0 && (
                <div style={{
                  fontSize: '0.75rem',
                  color: '#fcd34d',
                  background: 'rgba(245, 158, 11, 0.2)',
                  borderRadius: '0.5rem',
                  padding: '0.5rem'
                }}>
                  ⚠️ Carica prima i dati
                </div>
              )}
              {players.length > 0 && (
                <div style={{
                  fontSize: '0.75rem',
                  color: '#86efac',
                  background: 'rgba(34, 197, 94, 0.2)',
                  borderRadius: '0.5rem',
                  padding: '0.5rem'
                }}>
                  ✓ {players.length} giocatori caricati
                </div>
              )}
            </div>

            {/* Asta */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(12px)',
              borderRadius: '1rem',
              padding: '2rem',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              opacity: 0.6
            }}>
              <Zap size={64} color="#fb923c" style={{ margin: '0 auto 1.5rem auto', display: 'block' }} />
              <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
                Asta Live
              </h3>
              <p style={{ color: '#e9d5ff', marginBottom: '1.5rem' }}>
                Assistente intelligente durante l'asta
              </p>
              <div style={{ fontSize: '0.875rem', color: '#fdba74', marginBottom: '1rem' }}>
                <div>• Tracker tempo reale</div>
                <div>• AI insights dinamici</div>
                <div>• Simulatore budget</div>
              </div>
              <div style={{
                fontSize: '0.75rem',
                color: '#67e8f9',
                background: 'rgba(6, 182, 212, 0.2)',
                borderRadius: '0.5rem',
                padding: '0.5rem'
              }}>
                🚧 In sviluppo
              </div>
            </div>
          </div>

          {/* Stats */}
          {players.length > 0 && (
            <div style={{
              marginTop: '3rem',
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(12px)',
              borderRadius: '0.75rem',
              padding: '1.5rem',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '1rem',
              textAlign: 'center'
            }}>
              <div>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#22d3ee' }}>{players.length}</div>
                <div style={{ fontSize: '0.875rem', color: '#d8b4fe' }}>Giocatori Caricati</div>
              </div>
              <div>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#4ade80' }}>{budget}</div>
                <div style={{ fontSize: '0.875rem', color: '#d8b4fe' }}>Budget Disponibile</div>
              </div>
              <div>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#fb923c' }}>Ready</div>
                <div style={{ fontSize: '0.875rem', color: '#d8b4fe' }}>Stato Sistema</div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // MODALITÀ CARICAMENTO
  if (currentView === 'loading') {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #581c87, #1e3a8a, #312e81)',
        padding: '2rem'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
            <button 
              onClick={() => setCurrentView('home')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: 'white',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                fontSize: '1rem'
              }}
            >
              <ArrowLeft size={20} />
              Torna alla Home
            </button>
            <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: 'white', margin: 0 }}>
              Caricamento Dati
            </h1>
            <div></div>
          </div>

          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(12px)',
            borderRadius: '1rem',
            padding: '2rem',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <Upload size={64} color="#22d3ee" style={{ margin: '0 auto 1rem auto', display: 'block' }} />
              <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white', marginBottom: '0.5rem' }}>
                Carica Quotazioni Fantacalcio.it
              </h2>
              <p style={{ color: '#d8b4fe' }}>
                Seleziona il file Excel con le quotazioni ufficiali della stagione corrente
              </p>
            </div>

            <div style={{
              border: '2px dashed rgba(34, 211, 238, 0.5)',
              borderRadius: '0.75rem',
              padding: '3rem',
              textAlign: 'center',
              background: 'rgba(34, 211, 238, 0.05)'
            }}>
              <input
                type="file"
                accept=".xlsx,.xls"
                onChange={handleFileUpload}
                style={{ display: 'none' }}
                id="fileUpload"
                disabled={loading}
              />
              <label htmlFor="fileUpload" style={{ cursor: loading ? 'not-allowed' : 'pointer' }}>
                <Upload size={48} color="#22d3ee" style={{ margin: '0 auto 1rem auto', display: 'block' }} />
                <p style={{ color: 'white', fontSize: '1.125rem', marginBottom: '0.5rem' }}>
                  {loading ? 'Caricamento in corso...' : 'Clicca per caricare il file Excel'}
                </p>
                <p style={{ color: '#d8b4fe', fontSize: '0.875rem' }}>
                  Supporta file .xlsx e .xls da Fantacalcio.it
                </p>
              </label>
            </div>

            {players.length > 0 && (
              <div style={{
                marginTop: '2rem',
                padding: '1.5rem',
                background: 'rgba(34, 197, 94, 0.2)',
                border: '1px solid rgba(34, 197, 94, 0.5)',
                borderRadius: '0.75rem'
              }}>
                <h3 style={{ color: '#4ade80', fontWeight: '600', marginBottom: '0.5rem' }}>
                  ✓ Dati caricati con successo
                </h3>
                <p style={{ color: 'white', marginBottom: '1rem' }}>
                  {players.length} giocatori importati dal file Excel
                </p>
                <button 
                  onClick={() => setCurrentView('configuration')}
                  style={{
                    background: '#22c55e',
                    color: 'white',
                    padding: '0.5rem 1.5rem',
                    borderRadius: '0.5rem',
                    border: 'none',
                    cursor: 'pointer',
                    fontWeight: '500'
                  }}
                >
                  Vai alla Configurazione →
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // MODALITÀ CONFIGURAZIONE
  if (currentView === 'configuration') {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #581c87, #312e81, #1e3a8a)'
      }}>
        
        {/* Header */}
        <div style={{
          background: 'rgba(0, 0, 0, 0.2)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          padding: '1rem 1.5rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <button 
                onClick={() => setCurrentView('home')}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'rgba(255, 255, 255, 0.7)',
                  cursor: 'pointer'
                }}
              >
                <ArrowLeft size={20} />
              </button>
              
              {/* Search */}
              <div style={{ position: 'relative' }}>
                <Search size={16} style={{
                  color: 'rgba(255, 255, 255, 0.5)',
                  position: 'absolute',
                  left: '0.75rem',
                  top: '50%',
                  transform: 'translateY(-50%)'
                }} />
                <input
                  type="text"
                  placeholder="cerca trequartisti"
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '9999px',
                    paddingLeft: '2.5rem',
                    paddingRight: '1rem',
                    paddingTop: '0.5rem',
                    paddingBottom: '0.5rem',
                    color: 'white',
                    width: '16rem',
                    fontSize: '0.875rem'
                  }}
                />
              </div>
            </div>

            {/* Role Filters */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              {roles.map(role => (
                <button
                  key={role.key}
                  onClick={() => filterPlayersByRole(role.key)}
                  style={{
                    padding: '0.5rem 1rem',
                    borderRadius: '9999px',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    background: selectedRole === role.key ? '#22d3ee' : 'rgba(255, 255, 255, 0.1)',
                    color: selectedRole === role.key ? 'black' : 'rgba(255, 255, 255, 0.7)'
                  }}
                >
                  {role.label}
                </button>
              ))}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '9999px',
                padding: '0.5rem 1rem',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}>
                <DollarSign size={16} color="#4ade80" />
                <span style={{ color: 'white', fontWeight: '600' }}>{budget}</span>
              </div>
              <button 
                onClick={saveConfigurations}
                style={{
                  background: '#22c55e',
                  color: 'white',
                  padding: '0.5rem 1rem',
                  borderRadius: '9999px',
                  fontWeight: '500',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <Download size={16} />
                Salva Config
              </button>
              <button 
                onClick={resetAllConfigurations}
                style={{
                  background: '#ef4444',
                  color: 'white',
                  padding: '0.5rem 1rem',
                  borderRadius: '9999px',
                  fontWeight: '500',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                Reset
              </button>
              <button style={{
                background: '#22d3ee',
                color: 'black',
                padding: '0.5rem 1rem',
                borderRadius: '9999px',
                fontWeight: '500',
                border: 'none',
                cursor: 'pointer'
              }}>
                Mantra
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: '1.5rem' }}>
          
          {/* Section Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ width: '0.75rem', height: '0.75rem', background: '#fb923c', borderRadius: '50%' }}></div>
              <h2 style={{ color: 'white', fontSize: '1.125rem', fontWeight: '600', margin: 0 }}>
                {selectedRole === 'T' ? 'Trequartisti' : 
                 selectedRole === 'A' ? 'Attaccanti' :
                 selectedRole === 'C' ? 'Centrocampisti' :
                 selectedRole === 'W' ? 'Esterni' :
                 selectedRole === 'M' ? 'Mediani' :
                 selectedRole === 'Dc' ? 'Difensori Centrali' :
                 selectedRole === 'Ds' ? 'Difensori Sinistri' :
                 selectedRole === 'Dd' ? 'Difensori Destri' :
                 selectedRole === 'B' ? 'Braccetti' :
                 selectedRole === 'E' ? 'Esterni Difensivi' :
                 selectedRole === 'Por' ? 'Portieri' :
                 selectedRole === 'Pc' ? 'Prima Punta' : selectedRole} Top
              </h2>
              <span style={{ color: 'rgba(255, 255, 255, 0.5)' }}>({filteredPlayers.length})</span>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.875rem' }}>
              <div style={{ background: 'rgba(255, 255, 255, 0.1)', borderRadius: '0.5rem', padding: '0.75rem' }}>
                <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Totale giocatori: </span>
                <span style={{ color: 'white', fontWeight: '600' }}>{players.length}</span>
              </div>
              <div style={{ background: 'rgba(34, 197, 94, 0.2)', borderRadius: '0.5rem', padding: '0.75rem' }}>
                <span style={{ color: '#86efac' }}>Configurati: </span>
                <span style={{ color: '#4ade80', fontWeight: '600' }}>{Object.keys(playerConfigs).length}</span>
              </div>
              <div style={{ background: 'rgba(59, 130, 246, 0.2)', borderRadius: '0.5rem', padding: '0.75rem' }}>
                <span style={{ color: '#93c5fd' }}>Budget assegnato: </span>
                <span style={{ color: '#60a5fa', fontWeight: '600' }}>
                  {Object.values(playerConfigs).reduce((sum, config) => sum + (parseInt(config.budget) || 0), 0)}FM
                </span>
              </div>
            </div>
          </div>

          {/* Table Header */}
          <div style={{
            background: 'rgba(0, 0, 0, 0.2)',
            borderRadius: '0.75rem 0.75rem 0 0',
            padding: '1rem',
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr',
            gap: '0.75rem',
            fontSize: '0.75rem',
            color: 'rgba(255, 255, 255, 0.7)',
            fontWeight: '500',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <div>Nome</div>
            <div>Prezzo</div>
            <div>Budget</div>
            <div>PMAL</div>
            <div>Quo</div>
            <div>Titolar.</div>
            <div>Affida.</div>
            <div>Fisico</div>
            <div>FMV Exp.</div>
            <div>MV</div>
            <div>FMV</div>
            <div>Pres.</div>
            <div>Gol</div>
            <div>Assist</div>
          </div>

          {/* Players List */}
          <div style={{
            background: 'rgba(0, 0, 0, 0.1)',
            backdropFilter: 'blur(12px)',
            borderRadius: '0 0 0.75rem 0.75rem',
            overflow: 'hidden'
          }}>
            {filteredPlayers.slice(0, 20).map((player, index) => {
              const isConfigured = playerConfigs[player.id] && Object.values(playerConfigs[player.id]).some(val => val && val !== '');
              
              return (
                <div key={player.id} style={{
                  borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                  padding: '0.75rem',
                  background: isConfigured ? 'rgba(34, 197, 94, 0.05)' : 'transparent',
                  borderLeft: isConfigured ? '2px solid #4ade80' : 'none'
                }}>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr',
                    gap: '0.75rem',
                    alignItems: 'center'
                  }}>
                    
                    {/* Nome */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div style={{
                        width: '1.5rem',
                        height: '1.5rem',
                        background: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'rgba(255, 255, 255, 0.7)',
                        fontSize: '0.75rem'
                      }}>
                        {index + 1}
                      </div>
                      <Bookmark size={12} color={isConfigured ? '#4ade80' : 'rgba(255, 255, 255, 0.3)'} />
                      
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{
                          width: '2rem',
                          height: '2rem',
                          background: 'linear-gradient(135deg, #c084fc, #22d3ee)',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          fontWeight: 'bold',
                          fontSize: '0.75rem'
                        }}>
                          {player.nome.charAt(0)}
                        </div>
                        
                        <div>
                          <div style={{
                            color: 'rgba(255, 255, 255, 0.7)',
                            fontSize: '0.75rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                          }}>
                            {player.squadra}
                            {isConfigured && <div style={{ width: '0.5rem', height: '0.5rem', background: '#4ade80', borderRadius: '50%' }}></div>}
                          </div>
                          <div style={{ color: '#22d3ee', fontWeight: '600', fontSize: '0.875rem' }}>
                            {player.nome}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Prezzo */}
                    <div style={{ textAlign: 'center' }}>
                      <input
                        type="number"
                        value={getPlayerConfig(player.id, 'prezzo', player.quotazione)}
                        onChange={(e) => updatePlayerConfig(player.id, 'prezzo', e.target.value)}
                        style={{
                          background: '#fb923c',
                          color: 'black',
                          textAlign: 'center',
                          borderRadius: '9999px',
                          padding: '0.25rem 0.5rem',
                          width: '3rem',
                          fontSize: '0.75rem',
                          fontWeight: '600',
                          border: '0'
                        }}
                      />
                    </div>

                    {/* Budget */}
                    <div style={{ textAlign: 'center' }}>
                      <input
                        type="number"
                        value={getPlayerConfig(player.id, 'budget')}
                        onChange={(e) => updatePlayerConfig(player.id, 'budget', e.target.value)}
                        placeholder="-"
                        style={{
                          background: '#9333ea',
                          color: 'white',
                          textAlign: 'center',
                          borderRadius: '0.25rem',
                          padding: '0.25rem 0.5rem',
                          width: '3rem',
                          fontSize: '0.75rem',
                          border: '0'
                        }}
                      />
                    </div>

                    {/* PMAL */}
                    <div style={{ textAlign: 'center' }}>
                      <input
                        type="number"
                        value={getPlayerConfig(player.id, 'pmal')}
                        onChange={(e) => updatePlayerConfig(player.id, 'pmal', e.target.value)}
                        placeholder="0"
                        style={{
                          background: 'rgba(37, 99, 235, 0.3)',
                          color: '#93c5fd',
                          textAlign: 'center',
                          borderRadius: '0.25rem',
                          padding: '0.25rem 0.5rem',
                          width: '3rem',
                          fontSize: '0.75rem',
                          border: '0'
                        }}
                      />
                    </div>

                    {/* Quo */}
                    <div style={{ textAlign: 'center' }}>
                      <input
                        type="number"
                        value={getPlayerConfig(player.id, 'quo')}
                        onChange={(e) => updatePlayerConfig(player.id, 'quo', e.target.value)}
                        placeholder="0"
                        style={{
                          background: 'transparent',
                          color: 'white',
                          textAlign: 'center',
                          borderRadius: '0.25rem',
                          padding: '0.25rem 0.5rem',
                          width: '3rem',
                          fontSize: '0.75rem',
                          border: '1px solid rgba(255, 255, 255, 0.2)'
                        }}
                      />
                    </div>

                    {/* Titolare % */}
                    <div style={{ textAlign: 'center' }}>
                      <input
                        type="number"
                        value={getPlayerConfig(player.id, 'titolare')}
                        onChange={(e) => updatePlayerConfig(player.id, 'titolare', e.target.value)}
                        placeholder="0"
                        style={{
                          background: 'rgba(37, 99, 235, 0.3)',
                          color: '#93c5fd',
                          textAlign: 'center',
                          borderRadius: '0.25rem',
                          padding: '0.25rem 0.5rem',
                          width: '3rem',
                          fontSize: '0.75rem',
                          border: '0'
                        }}
                      />
                    </div>

                    {/* Affidabilità % */}
                    <div style={{ textAlign: 'center' }}>
                      <input
                        type="number"
                        value={getPlayerConfig(player.id, 'affidabilita')}
                        onChange={(e) => updatePlayerConfig(player.id, 'affidabilita', e.target.value)}
                        placeholder="0"
                        style={{
                          background: 'rgba(37, 99, 235, 0.3)',
                          color: '#93c5fd',
                          textAlign: 'center',
                          borderRadius: '0.25rem',
                          padding: '0.25rem 0.5rem',
                          width: '3rem',
                          fontSize: '0.75rem',
                          border: '0'
                        }}
                      />
                    </div>

                    {/* Fisico % */}
                    <div style={{ textAlign: 'center' }}>
                      <input
                        type="number"
                        value={getPlayerConfig(player.id, 'fisico')}
                        onChange={(e) => updatePlayerConfig(player.id, 'fisico', e.target.value)}
                        placeholder="0"
                        style={{
                          background: 'rgba(37, 99, 235, 0.3)',
                          color: '#93c5fd',
                          textAlign: 'center',
                          borderRadius: '0.25rem',
                          padding: '0.25rem 0.5rem',
                          width: '3rem',
                          fontSize: '0.75rem',
                          border: '0'
                        }}
                      />
                    </div>

                    {/* FMV Exp */}
                    <div style={{ textAlign: 'center' }}>
                      <input
                        type="number"
                        step="0.1"
                        value={getPlayerConfig(player.id, 'fmvExp')}
                        onChange={(e) => updatePlayerConfig(player.id, 'fmvExp', e.target.value)}
                        placeholder="0"
                        style={{
                          background: 'rgba(37, 99, 235, 0.3)',
                          color: '#93c5fd',
                          textAlign: 'center',
                          borderRadius: '0.25rem',
                          padding: '0.25rem 0.5rem',
                          width: '3rem',
                          fontSize: '0.75rem',
                          border: '0'
                        }}
                      />
                    </div>

                    {/* MV */}
                    <div style={{ textAlign: 'center' }}>
                      <input
                        type="number"
                        step="0.1"
                        value={getPlayerConfig(player.id, 'mv')}
                        onChange={(e) => updatePlayerConfig(player.id, 'mv', e.target.value)}
                        placeholder="0"
                        style={{
                          background: 'rgba(37, 99, 235, 0.3)',
                          color: '#93c5fd',
                          textAlign: 'center',
                          borderRadius: '0.25rem',
                          padding: '0.25rem 0.5rem',
                          width: '3rem',
                          fontSize: '0.75rem',
                          border: '0'
                        }}
                      />
                    </div>

                    {/* FMV - FISSO */}
                    <div style={{ color: 'white', textAlign: 'center', fontWeight: '500', fontSize: '0.875rem' }}>
                      {player.fvm}
                    </div>

                    {/* Presenze */}
                    <div style={{ textAlign: 'center' }}>
                      <input
                        type="number"
                        value={getPlayerConfig(player.id, 'presenze')}
                        onChange={(e) => updatePlayerConfig(player.id, 'presenze', e.target.value)}
                        placeholder="0"
                        style={{
                          background: 'rgba(37, 99, 235, 0.3)',
                          color: '#93c5fd',
                          textAlign: 'center',
                          borderRadius: '0.25rem',
                          padding: '0.25rem 0.5rem',
                          width: '3rem',
                          fontSize: '0.75rem',
                          border: '0'
                        }}
                      />
                    </div>

                    {/* Gol */}
                    <div style={{ textAlign: 'center' }}>
                      <input
                        type="number"
                        value={getPlayerConfig(player.id, 'gol')}
                        onChange={(e) => updatePlayerConfig(player.id, 'gol', e.target.value)}
                        placeholder="0"
                        style={{
                          background: 'rgba(220, 38, 38, 0.3)',
                          color: '#fca5a5',
                          textAlign: 'center',
                          borderRadius: '0.25rem',
                          padding: '0.25rem 0.5rem',
                          width: '3rem',
                          fontSize: '0.75rem',
                          border: '0'
                        }}
                      />
                    </div>

                    {/* Assist */}
                    <div style={{ textAlign: 'center' }}>
                      <input
                        type="number"
                        value={getPlayerConfig(player.id, 'assist')}
                        onChange={(e) => updatePlayerConfig(player.id, 'assist', e.target.value)}
                        placeholder="0"
                        style={{
                          background: 'rgba(202, 138, 4, 0.3)',
                          color: '#fcd34d',
                          textAlign: 'center',
                          borderRadius: '0.25rem',
                          padding: '0.25rem 0.5rem',
                          width: '3rem',
                          fontSize: '0.75rem',
                          border: '0'
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Notifications */}
        {notifications.length > 0 && (
          <div style={{
            position: 'fixed',
            top: '1rem',
            right: '1rem',
            zIndex: 1000
          }}>
            {notifications.map(notification => (
              <div key={notification.id} style={{
                padding: '0.75rem 1rem',
                borderRadius: '0.5rem',
                marginBottom: '0.5rem',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                background: notification.type === 'success' ? '#22c55e' :
                           notification.type === 'error' ? '#ef4444' :
                           notification.type === 'warning' ? '#f59e0b' : '#3b82f6',
                color: notification.type === 'warning' ? 'black' : 'white'
              }}>
                {notification.message}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return null;
}

export default App;