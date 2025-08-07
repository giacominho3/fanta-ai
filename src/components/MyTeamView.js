import React, { useState } from 'react';
import { theme } from '../theme/theme';
import { Text } from './ui/Typography';
import Card from './ui/Card';
import { getRoleColor } from './ConfigurationHeader';
import { ROLES } from '../constants/roles';
import { FORMATIONS } from '../constants/formations';

// Mappa i ruoli compositi ai ruoli singoli per il filtraggio
const getRolesFromComposite = (compositeRole) => {
  const roleMap = {
    'Por': ['Por'],
    'Dc': ['Dc'],
    'Ds': ['Ds'], 
    'Dd': ['Dd'],
    'B': ['B'],
    'E': ['E'],
    'M': ['M'],
    'C': ['C'],
    'W': ['W'],
    'T': ['T'],
    'A': ['A'],
    'Pc': ['Pc'],
    'Dc/B': ['Dc', 'B'],
    'M/C': ['M', 'C'],
    'W/A': ['W', 'A'],
    'A/Pc': ['A', 'Pc']
  };
  return roleMap[compositeRole] || [];
};

const FieldPosition = ({ 
  position, 
  index, 
  selectedPlayer, 
  availablePlayers, 
  onPlayerSelect,
  formation 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Filtra i giocatori disponibili per questo ruolo
  const allowedRoles = getRolesFromComposite(position.role);
  const filteredPlayers = availablePlayers.filter(player => 
    player.playerRoles && player.playerRoles.some(role => allowedRoles.includes(role))
  );

  const handleSelect = (playerId) => {
    onPlayerSelect(position, playerId);
    setIsOpen(false);
  };

  return (
    <div style={{
      position: 'absolute',
      left: `${position.x}%`,
      top: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: 10
    }}>
      <div style={{ position: 'relative' }}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            width: '80px',
            height: '40px',
            background: selectedPlayer ? getRoleColor(selectedPlayer.playerRoles[0]) : theme.colors.dark.surface.tertiary,
            border: `2px solid ${theme.colors.dark.border.primary}`,
            borderRadius: theme.borderRadius.base,
            color: 'white',
            fontSize: theme.typography.fontSize.xs,
            fontWeight: theme.typography.fontWeight.semibold,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: '2px'
          }}
        >
          <div>{position.role}</div>
          {selectedPlayer && (
            <div style={{
              fontSize: '8px',
              opacity: 0.8,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              width: '76px'
            }}>
              {selectedPlayer.playerName}
            </div>
          )}
        </button>

        {isOpen && (
          <div style={{
            position: 'absolute',
            top: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            background: theme.colors.dark.surface.tertiary,
            border: `1px solid ${theme.colors.dark.border.primary}`,
            borderRadius: theme.borderRadius.base,
            maxHeight: '200px',
            overflowY: 'auto',
            minWidth: '150px',
            zIndex: 1000,
            boxShadow: theme.shadows.lg
          }}>
            <div
              onClick={() => handleSelect(null)}
              style={{
                padding: theme.spacing[2],
                cursor: 'pointer',
                color: "#FFFFFF",
                fontSize: theme.typography.fontSize.xs,
                borderBottom: `1px solid ${theme.colors.dark.border.secondary}`
              }}
            >
              Nessuno
            </div>
            {filteredPlayers.map(player => (
              <div
                key={player.playerId}
                onClick={() => handleSelect(player.playerId)}
                style={{
                  padding: theme.spacing[2],
                  cursor: 'pointer',
                  color: "#FFFFFF",
                  fontSize: theme.typography.fontSize.xs,
                  borderBottom: `1px solid ${theme.colors.dark.border.secondary}`,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = theme.colors.dark.surface.secondary;
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'transparent';
                }}
              >
                <span>{player.playerName}</span>
                <span style={{ 
                  color: getRoleColor(player.playerRoles[0]),
                  fontSize: '8px'
                }}>
                  {player.playerRoles.join(', ')}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const BenchPosition = ({ 
  index, 
  selectedPlayer, 
  availablePlayers, 
  onPlayerSelect 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (playerId) => {
    onPlayerSelect(index, playerId);
    setIsOpen(false);
  };

  return (
    <div style={{ position: 'relative', margin: theme.spacing[1] }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100px',
          height: '40px',
          background: selectedPlayer ? getRoleColor(selectedPlayer.playerRoles[0]) : theme.colors.dark.surface.tertiary,
          border: `2px solid ${theme.colors.dark.border.primary}`,
          borderRadius: theme.borderRadius.base,
          color: 'white',
          fontSize: theme.typography.fontSize.xs,
          fontWeight: theme.typography.fontWeight.semibold,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: '2px'
        }}
      >
        <div>Panch {index + 1}</div>
        {selectedPlayer && (
          <div style={{
            fontSize: '8px',
            opacity: 0.8,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            width: '96px'
          }}>
            {selectedPlayer.playerName}
          </div>
        )}
      </button>

      {isOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          background: theme.colors.dark.surface.tertiary,
          border: `1px solid ${theme.colors.dark.border.primary}`,
          borderRadius: theme.borderRadius.base,
          maxHeight: '200px',
          overflowY: 'auto',
          minWidth: '150px',
          zIndex: 1000,
          boxShadow: theme.shadows.lg
        }}>
          <div
            onClick={() => handleSelect(null)}
            style={{
              padding: theme.spacing[2],
              cursor: 'pointer',
              color: theme.colors.dark.text.tertiary,
              fontSize: theme.typography.fontSize.xs,
              borderBottom: `1px solid ${theme.colors.dark.border.secondary}`
            }}
          >
            Nessuno
          </div>
          {availablePlayers.map(player => (
            <div
              key={player.playerId}
              onClick={() => handleSelect(player.playerId)}
              style={{
                padding: theme.spacing[2],
                cursor: 'pointer',
                color: theme.colors.dark.text.primary,
                fontSize: theme.typography.fontSize.xs,
                borderBottom: `1px solid ${theme.colors.dark.border.secondary}`,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = theme.colors.dark.surface.secondary;
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'transparent';
              }}
            >
              <span>{player.playerName}</span>
              <span style={{ 
                color: getRoleColor(player.playerRoles[0]),
                fontSize: '8px'
              }}>
                {player.playerRoles.join(', ')}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const MyTeamView = ({ getTeamPlayers }) => {
  const [selectedFormation, setSelectedFormation] = useState('343');
  const [lineup, setLineup] = useState({}); // { positionKey: playerId }
  const [bench, setBench] = useState({}); // { benchIndex: playerId }

  // Ottieni i giocatori della squadra "Gigi" (team1)
  const myTeamPlayers = getTeamPlayers('team1');
  
  const formation = FORMATIONS[selectedFormation];

  // Giocatori già selezionati
  const selectedPlayerIds = [
    ...Object.values(lineup).filter(Boolean),
    ...Object.values(bench).filter(Boolean)
  ];

  // Giocatori disponibili per la selezione
  const availablePlayers = myTeamPlayers.filter(playerData => {
    return !selectedPlayerIds.includes(playerData.playerId);
  });

  const handlePositionSelect = (position, playerId) => {
    const positionKey = `${position.role}_${position.x}`;
    setLineup(prev => ({
      ...prev,
      [positionKey]: playerId
    }));
  };

  const handleBenchSelect = (benchIndex, playerId) => {
    setBench(prev => ({
      ...prev,
      [benchIndex]: playerId
    }));
  };

  const getPlayerById = (playerId) => {
    return myTeamPlayers.find(p => p.playerId === playerId);
  };

  // Ordina i giocatori per ruolo come nella vista squadre
  const ROLE_ORDER = ROLES.map(role => role.key);
  const sortPlayersByRole = (players) => {
    return players.sort((a, b) => {
      const roleA = a.playerRoles?.[0] || a.playerRole || 'Z';
      const roleB = b.playerRoles?.[0] || b.playerRole || 'Z';
      
      const indexA = ROLE_ORDER.indexOf(roleA);
      const indexB = ROLE_ORDER.indexOf(roleB);
      
      const finalIndexA = indexA === -1 ? 999 : indexA;
      const finalIndexB = indexB === -1 ? 999 : indexB;
      
      return finalIndexA - finalIndexB;
    });
  };

  const sortedTeamPlayers = sortPlayersByRole([...myTeamPlayers]);

  return (
    <div style={{ display: 'flex', gap: theme.spacing[6], height: 'calc(100vh - 200px)' }}>
      
      {/* Left Side - Field */}
      <div style={{ flex: '1', display: 'flex', flexDirection: 'column' }}>
        
        {/* Formation Selector */}
        <Card variant="glass" style={{ marginBottom: theme.spacing[4], padding: theme.spacing[4] }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            marginBottom: theme.spacing[3]
          }}>
            <Text style={{ fontWeight: theme.typography.fontWeight.semibold }}>
              Modulo di gioco
            </Text>
            <div style={{ display: 'flex', gap: theme.spacing[2] }}>
              {Object.keys(FORMATIONS).map(key => (
                <button
                  key={key}
                  onClick={() => setSelectedFormation(key)}
                  style={{
                    padding: `${theme.spacing[2]} ${theme.spacing[3]}`,
                    background: selectedFormation === key ? theme.colors.primary[500] : theme.colors.dark.surface.secondary,
                    color: 'white',
                    border: 'none',
                    borderRadius: theme.borderRadius.base,
                    cursor: 'pointer',
                    fontSize: theme.typography.fontSize.sm,
                    fontWeight: theme.typography.fontWeight.semibold
                  }}
                >
                  {FORMATIONS[key].name}
                </button>
              ))}
            </div>
          </div>
        </Card>

        {/* Field */}
        <Card variant="glass" style={{ 
          flex: 1, 
          background: 'linear-gradient(135deg, #22c55e, #16a34a)',
          position: 'relative',
          minHeight: '500px',
          overflow: 'visible'
        }}>
          
          {/* Field Lines */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            border: '3px solid white',
            borderRadius: theme.borderRadius.lg
          }}>
            {/* Center line */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: 0,
              right: 0,
              height: '2px',
              background: 'white',
              transform: 'translateY(-50%)'
            }} />
            
            {/* Center circle */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '80px',
              height: '80px',
              border: '2px solid white',
              borderRadius: '50%',
              transform: 'translate(-50%, -50%)'
            }} />

            {/* Penalty areas */}
            <div style={{
              position: 'absolute',
              top: '10px',
              left: '30%',
              right: '30%',
              height: '80px',
              border: '2px solid white',
              borderTop: 'none'
            }} />
            
            <div style={{
              position: 'absolute',
              bottom: '10px',
              left: '30%',
              right: '30%',
              height: '80px',
              border: '2px solid white',
              borderBottom: 'none'
            }} />
          </div>

          {/* Positions */}
          {formation.positions.map((row, rowIndex) => (
            <div
              key={rowIndex}
              style={{
                position: 'absolute',
                top: `${15 + rowIndex * 17}%`,
                left: 0,
                right: 0,
                height: '15%'
              }}
            >
              {row.map((position, posIndex) => {
                const positionKey = `${position.role}_${position.x}`;
                const selectedPlayerId = lineup[positionKey];
                const selectedPlayer = selectedPlayerId ? getPlayerById(selectedPlayerId) : null;
                
                return (
                  <FieldPosition
                    key={`${rowIndex}-${posIndex}`}
                    position={position}
                    index={posIndex}
                    selectedPlayer={selectedPlayer}
                    availablePlayers={availablePlayers}
                    onPlayerSelect={handlePositionSelect}
                    formation={selectedFormation}
                  />
                );
              })}
            </div>
          ))}
        </Card>

        {/* Bench */}
        <Card variant="glass" style={{ 
          marginTop: theme.spacing[4], 
          padding: theme.spacing[4] 
        }}>
          <Text style={{ 
            marginBottom: theme.spacing[3],
            fontWeight: theme.typography.fontWeight.semibold
          }}>
            Panchina
          </Text>
          <div style={{ 
            display: 'flex', 
            flexWrap: 'wrap',
            gap: theme.spacing[2]
          }}>
            {Array.from({ length: 7 }).map((_, index) => {
              const selectedPlayerId = bench[index];
              const selectedPlayer = selectedPlayerId ? getPlayerById(selectedPlayerId) : null;
              
              return (
                <BenchPosition
                  key={index}
                  index={index}
                  selectedPlayer={selectedPlayer}
                  availablePlayers={availablePlayers}
                  onPlayerSelect={handleBenchSelect}
                />
              );
            })}
          </div>
        </Card>
      </div>

      {/* Right Side - Player List */}
      <div style={{ width: '400px' }}>
        <Card variant="glass" style={{ height: '100%', overflow: 'hidden' }}>
          <div style={{
            padding: theme.spacing[4],
            borderBottom: `1px solid ${theme.colors.dark.border.secondary}`
          }}>
            <Text style={{ 
              fontWeight: theme.typography.fontWeight.semibold,
              fontSize: theme.typography.fontSize.lg
            }}>
              La mia rosa ({myTeamPlayers.length}/28)
            </Text>
          </div>
          
          <div style={{ 
            padding: theme.spacing[4], 
            maxHeight: 'calc(100% - 80px)', 
            overflowY: 'auto' 
          }}>
            {sortedTeamPlayers.map((playerData, index) => {
              const allRoles = playerData.playerRoles || [playerData.playerRole] || ['N/A'];
              const isInLineup = selectedPlayerIds.includes(playerData.playerId);
              
              return (
                <div
                  key={index}
                  style={{
                    background: isInLineup 
                      ? 'rgba(34, 197, 94, 0.2)' 
                      : theme.colors.dark.surface.secondary,
                    borderRadius: theme.borderRadius.base,
                    padding: theme.spacing[3],
                    marginBottom: theme.spacing[2],
                    border: isInLineup 
                      ? `1px solid ${theme.colors.primary[500]}` 
                      : `1px solid ${theme.colors.dark.border.primary}`
                  }}
                >
                  <div style={{
                    color: theme.colors.dark.text.primary,
                    fontSize: theme.typography.fontSize.sm,
                    fontWeight: theme.typography.fontWeight.semibold,
                    marginBottom: theme.spacing[1]
                  }}>
                    {playerData.playerName || `Player ${playerData.playerId}`}
                  </div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: theme.spacing[1]
                    }}>
                      {allRoles.map((role, roleIndex) => (
                        <span
                          key={roleIndex}
                          style={{
                            color: getRoleColor(role),
                            fontSize: theme.typography.fontSize.xs,
                            fontWeight: theme.typography.fontWeight.bold
                          }}
                        >
                          {role}
                          {roleIndex < allRoles.length - 1 && (
                            <span style={{ 
                              color: theme.colors.dark.text.tertiary,
                              fontWeight: theme.typography.fontWeight.normal 
                            }}>
                              ,
                            </span>
                          )}
                        </span>
                      ))}
                    </div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: theme.spacing[2]
                    }}>
                      <span style={{
                        color: theme.colors.accent.orange,
                        fontSize: theme.typography.fontSize.xs,
                        fontWeight: theme.typography.fontWeight.bold
                      }}>
                        FM {playerData.price || 0}
                      </span>
                      {isInLineup && (
                        <span style={{
                          color: theme.colors.primary[400],
                          fontSize: theme.typography.fontSize.xs
                        }}>
                          ⚽ In campo
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {sortedTeamPlayers.length === 0 && (
              <div style={{
                textAlign: 'center',
                color: theme.colors.dark.text.tertiary,
                padding: theme.spacing[8]
              }}>
                <div style={{ marginBottom: theme.spacing[2] }}>
                  Nessun giocatore nella tua rosa
                </div>
                <div style={{ fontSize: theme.typography.fontSize.sm }}>
                  Vai alla vista Giocatori per acquistare i tuoi giocatori
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default MyTeamView;