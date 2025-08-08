import React, { useState } from 'react';
import { theme } from '../theme/theme';
import { Text } from './ui/Typography';
import Card from './ui/Card';
import { getRoleColor } from './ConfigurationHeader';
import { ROLES, ROLE_COLORS } from '../constants/roles';
import { FORMATIONS } from '../constants/formations';

// Gerarchia offensiva dei ruoli (più alto = più offensivo)
const ROLE_HIERARCHY = {
  'Por': 1,
  'Dc': 2, 'Ds': 2, 'Dd': 2, 'B': 2,
  'E': 3,
  'M': 4,
  'C': 5,
  'W': 6,
  'T': 7,
  'A': 8,
  'Pc': 9
};

// Funzione per ottenere il colore del ruolo più offensivo
const getMostOffensiveRoleColor = (roleString) => {
  if (!roleString) return theme.colors.dark.surface.tertiary;
  
  const roles = roleString.split('/');
  let mostOffensiveRole = roles[0];
  let highestHierarchy = ROLE_HIERARCHY[roles[0]] || 0;
  
  roles.forEach(role => {
    const hierarchy = ROLE_HIERARCHY[role] || 0;
    if (hierarchy > highestHierarchy) {
      highestHierarchy = hierarchy;
      mostOffensiveRole = role;
    }
  });
  
  return ROLE_COLORS[mostOffensiveRole] || theme.colors.dark.surface.tertiary;
};

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

  // Ottieni il colore basato sul ruolo più offensivo
  const roleColor = getMostOffensiveRoleColor(position.role);
  const hasPlayer = !!selectedPlayer;

  return (
    <div style={{
      position: 'absolute',
      left: `${position.x}%`,
      top: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: hasPlayer ? 15 : 10
    }}>
      <div style={{ position: 'relative' }}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            width: '90px',
            height: '45px',
            background: hasPlayer ? roleColor : `${roleColor}40`,
            border: `2px solid ${roleColor}`,
            borderRadius: theme.borderRadius.base,
            color: 'white',
            fontSize: theme.typography.fontSize.xs,
            fontWeight: theme.typography.fontWeight.bold,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: '2px',
            boxShadow: hasPlayer ? theme.shadows.md : theme.shadows.sm,
            transition: theme.transitions.fast
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'scale(1.05)';
            e.target.style.boxShadow = theme.shadows.lg;
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'scale(1)';
            e.target.style.boxShadow = hasPlayer ? theme.shadows.md : theme.shadows.sm;
          }}
        >
          <div>{position.role}</div>
          {selectedPlayer && (
            <div style={{
              fontSize: '11px',
              opacity: 0.95,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              width: '85px',
              fontWeight: theme.typography.fontWeight.semibold
            }}>
              {selectedPlayer.playerName}
            </div>
          )}
        </button>

        {isOpen && (
          <div style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: theme.colors.dark.surface.primary,
            border: `2px solid ${theme.colors.dark.border.primary}`,
            borderRadius: theme.borderRadius.lg,
            maxHeight: '300px',
            overflowY: 'auto',
            minWidth: '200px',
            zIndex: 9999,
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(8px)'
          }}>
            <div
              onClick={() => handleSelect(null)}
              style={{
                padding: `${theme.spacing[3]} ${theme.spacing[4]}`,
                cursor: 'pointer',
                color: theme.colors.dark.text.primary,
                fontSize: theme.typography.fontSize.sm,
                fontWeight: theme.typography.fontWeight.medium,
                borderBottom: `1px solid ${theme.colors.dark.border.secondary}`,
                transition: theme.transitions.fast
              }}
              onMouseEnter={(e) => {
                e.target.style.background = theme.colors.dark.surface.secondary;
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'transparent';
              }}
            >
              Nessuno
            </div>
            {filteredPlayers.map(player => (
              <div
                key={player.playerId}
                onClick={() => handleSelect(player.playerId)}
                style={{
                  padding: `${theme.spacing[3]} ${theme.spacing[4]}`,
                  cursor: 'pointer',
                  color: theme.colors.dark.text.primary,
                  fontSize: theme.typography.fontSize.sm,
                  fontWeight: theme.typography.fontWeight.medium,
                  borderBottom: `1px solid ${theme.colors.dark.border.secondary}`,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  transition: theme.transitions.fast
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = theme.colors.dark.surface.secondary;
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'transparent';
                }}
              >
                <span style={{ fontWeight: theme.typography.fontWeight.semibold }}>
                  {player.playerName}
                </span>
                <span style={{ 
                  color: getRoleColor(player.playerRoles[0]),
                  fontSize: theme.typography.fontSize.xs,
                  fontWeight: theme.typography.fontWeight.bold
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
          width: '110px',
          height: '44px',
          background: selectedPlayer ? getRoleColor(selectedPlayer.playerRoles[0]) : theme.colors.dark.surface.tertiary,
          border: `2px solid ${theme.colors.dark.border.primary}`,
          borderRadius: theme.borderRadius.base,
          color: 'white',
          fontSize: theme.typography.fontSize.xs,
          fontWeight: theme.typography.fontWeight.bold,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: '2px',
          transition: theme.transitions.fast
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = 'scale(1.02)';
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'scale(1)';
        }}
      >
        <div>Panch {index + 1}</div>
        {selectedPlayer && (
          <div style={{
            fontSize: '9px',
            opacity: 0.9,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            width: '105px',
            fontWeight: theme.typography.fontWeight.medium
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
          background: theme.colors.dark.surface.primary,
          border: `1px solid ${theme.colors.dark.border.primary}`,
          borderRadius: theme.borderRadius.lg,
          maxHeight: '200px',
          overflowY: 'auto',
          minWidth: '180px',
          zIndex: 1000,
          boxShadow: theme.shadows.xl,
          marginTop: '4px'
        }}>
          <div
            onClick={() => handleSelect(null)}
            style={{
              padding: `${theme.spacing[3]} ${theme.spacing[4]}`,
              cursor: 'pointer',
              color: theme.colors.dark.text.primary,
              fontSize: theme.typography.fontSize.sm,
              fontWeight: theme.typography.fontWeight.medium,
              borderBottom: `1px solid ${theme.colors.dark.border.secondary}`,
              transition: theme.transitions.fast
            }}
            onMouseEnter={(e) => {
              e.target.style.background = theme.colors.dark.surface.secondary;
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'transparent';
            }}
          >
            Nessuno
          </div>
          {availablePlayers.map(player => (
            <div
              key={player.playerId}
              onClick={() => handleSelect(player.playerId)}
              style={{
                padding: `${theme.spacing[3]} ${theme.spacing[4]}`,
                cursor: 'pointer',
                color: theme.colors.dark.text.primary,
                fontSize: theme.typography.fontSize.sm,
                fontWeight: theme.typography.fontWeight.medium,
                borderBottom: `1px solid ${theme.colors.dark.border.secondary}`,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                transition: theme.transitions.fast
              }}
              onMouseEnter={(e) => {
                e.target.style.background = theme.colors.dark.surface.secondary;
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'transparent';
              }}
            >
              <span style={{ fontWeight: theme.typography.fontWeight.semibold }}>
                {player.playerName}
              </span>
              <span style={{ 
                color: getRoleColor(player.playerRoles[0]),
                fontSize: theme.typography.fontSize.xs,
                fontWeight: theme.typography.fontWeight.bold
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

  // Crea array di 28 slot per i giocatori
  const createPlayerSlots = () => {
    const slots = [];
    
    // Aggiungi i giocatori esistenti
    sortedTeamPlayers.forEach((playerData, index) => {
      const allRoles = playerData.playerRoles || [playerData.playerRole] || ['N/A'];
      const isInLineup = selectedPlayerIds.includes(playerData.playerId);
      
      slots.push({
        type: 'player',
        data: playerData,
        roles: allRoles,
        isInLineup,
        index
      });
    });
    
    // Aggiungi slot vuoti fino a 28
    for (let i = sortedTeamPlayers.length; i < 28; i++) {
      slots.push({
        type: 'empty',
        index: i
      });
    }
    
    return slots;
  };

  const playerSlots = createPlayerSlots();

  return (
    <div style={{ 
      display: 'flex', 
      gap: theme.spacing[6], 
      minHeight: 'calc(100vh - 150px)',
      height: 'auto',
      paddingBottom: theme.spacing[8]
    }}>
      
      {/* Left Side - Field e Panchina */}
      <div style={{ 
        flex: '1', 
        display: 'flex', 
        flexDirection: 'column',
        minHeight: '800px'
      }}>
        
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
          background: 'linear-gradient(135deg, #22c55e, #16a34a)',
          position: 'relative',
          height: '500px',
          overflow: 'visible',
          marginBottom: theme.spacing[4]
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

        {/* Bench - Ora sempre visibile */}
        <Card variant="glass" style={{ 
          padding: theme.spacing[4],
          height: '250px'
        }}>
          <Text style={{ 
            marginBottom: theme.spacing[4],
            fontWeight: theme.typography.fontWeight.semibold
          }}>
            Panchina (12 giocatori)
          </Text>
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: theme.spacing[3],
            height: '180px',
            overflowY: 'auto'
          }}>
            {Array.from({ length: 12 }).map((_, index) => {
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

      {/* Right Side - Player List con 28 slot sempre visibili */}
      <div style={{ width: '400px', height: 'calc(100vh - 150px)' }}>
        <Card variant="glass" style={{ 
          height: '100%', 
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <div style={{
            padding: theme.spacing[4],
            borderBottom: `1px solid ${theme.colors.dark.border.secondary}`,
            flexShrink: 0
          }}>
            <Text style={{ 
              fontWeight: theme.typography.fontWeight.semibold,
              fontSize: theme.typography.fontSize.lg
            }}>
              La mia rosa ({myTeamPlayers.length}/28)
            </Text>
          </div>
          
          <div style={{ 
            flex: 1,
            overflowY: 'auto',
            padding: 0
          }}>
            {playerSlots.map((slot, index) => {
              if (slot.type === 'player') {
                const { data: playerData, roles: allRoles, isInLineup } = slot;
                
                return (
                  <div
                    key={`player-${index}`}
                    style={{
                      background: isInLineup 
                        ? 'rgba(34, 197, 94, 0.2)' 
                        : theme.colors.dark.surface.secondary,
                      padding: theme.spacing[3],
                      margin: 0,
                      borderBottom: `1px solid ${theme.colors.dark.border.primary}`,
                      borderLeft: isInLineup 
                        ? `3px solid ${theme.colors.primary[500]}` 
                        : 'none',
                      width: '100%'
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
                      </div>
                    </div>
                  </div>
                );
              } else {
                // Slot vuoto
                return (
                  <div
                    key={`empty-${index}`}
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      padding: theme.spacing[3],
                      margin: 0,
                      borderBottom: `1px solid ${theme.colors.dark.border.primary}`,
                      borderLeft: `1px dashed ${theme.colors.dark.border.primary}`,
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      minHeight: '60px'
                    }}
                  >
                    <Text color="muted" style={{ 
                      fontSize: theme.typography.fontSize.sm,
                      fontStyle: 'italic'
                    }}>
                      Slot {index + 1} - Libero
                    </Text>
                  </div>
                );
              }
            })}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default MyTeamView;