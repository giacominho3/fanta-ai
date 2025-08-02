import React from 'react';
import { theme } from '../theme/theme';
import { AUCTION_TEAMS } from '../hooks/useAuctionData';
import { ROLES } from '../constants/roles';
import { getRoleColor } from '../components/ConfigurationHeader';
import { Text } from './ui/Typography';
import Card from './ui/Card';

const AuctionTeamsView = ({ getTeamPlayers, auctionStats }) => {
  // Slot per posizioni (25 + 3 portieri = 28 giocatori totali)
  const TEAM_SLOTS = 28;

  // Ordine dei ruoli secondo i filtri
  const ROLE_ORDER = ROLES.map(role => role.key);

  // Funzione per ordinare i giocatori per ruolo
  const sortPlayersByRole = (players) => {
    return players.sort((a, b) => {
      // Prendi il primo ruolo di ogni giocatore per l'ordinamento
      const roleA = a.playerRoles?.[0] || a.playerRole || 'Z';
      const roleB = b.playerRoles?.[0] || b.playerRole || 'Z';
      
      const indexA = ROLE_ORDER.indexOf(roleA);
      const indexB = ROLE_ORDER.indexOf(roleB);
      
      // Se il ruolo non è trovato, mettilo alla fine
      const finalIndexA = indexA === -1 ? 999 : indexA;
      const finalIndexB = indexB === -1 ? 999 : indexB;
      
      return finalIndexA - finalIndexB;
    });
  };

  const TeamCard = ({ team }) => {
    const teamPlayersData = getTeamPlayers(team.id);
    const sortedPlayers = sortPlayersByRole(teamPlayersData);
    const teamStats = auctionStats.teamStats?.find(t => t.id === team.id) || {
      playersCount: 0,
      totalSpent: 0,
      remainingBudget: 500
    };

    return (
      <Card variant="glass" style={{ height: '100%' }}>
        {/* Team Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: theme.spacing[4],
          paddingBottom: theme.spacing[3],
          borderBottom: `2px solid ${team.color}`
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing[3] }}>
            <div style={{
              width: theme.spacing[4],
              height: theme.spacing[4],
              background: team.color,
              borderRadius: '50%'
            }}></div>
            <h3 style={{
              color: theme.colors.dark.text.primary,
              fontSize: theme.typography.fontSize.lg,
              fontWeight: theme.typography.fontWeight.bold,
              margin: 0
            }}>
              {team.name}
            </h3>
          </div>
          
          <div style={{ textAlign: 'right' }}>
            <div style={{
              color: team.color,
              fontSize: theme.typography.fontSize.sm,
              fontWeight: theme.typography.fontWeight.semibold
            }}>
              {teamStats.playersCount}/{TEAM_SLOTS}
            </div>
            <div style={{
              color: theme.colors.dark.text.tertiary,
              fontSize: theme.typography.fontSize.xs
            }}>
              giocatori
            </div>
          </div>
        </div>

        {/* Team Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: theme.spacing[3],
          marginBottom: theme.spacing[4]
        }}>
          <div style={{
            background: 'rgba(239, 68, 68, 0.2)',
            borderRadius: theme.borderRadius.lg,
            padding: theme.spacing[3],
            textAlign: 'center'
          }}>
            <div style={{
              color: theme.colors.accent.red,
              fontSize: theme.typography.fontSize.lg,
              fontWeight: theme.typography.fontWeight.bold
            }}>
              €{teamStats.totalSpent}
            </div>
            <div style={{
              color: theme.colors.dark.text.tertiary,
              fontSize: theme.typography.fontSize.xs
            }}>
              spesi
            </div>
          </div>
          
          <div style={{
            background: 'rgba(34, 197, 94, 0.2)',
            borderRadius: theme.borderRadius.lg,
            padding: theme.spacing[3],
            textAlign: 'center'
          }}>
            <div style={{
              color: theme.colors.primary[400],
              fontSize: theme.typography.fontSize.lg,
              fontWeight: theme.typography.fontWeight.bold
            }}>
              €{teamStats.remainingBudget}
            </div>
            <div style={{
              color: theme.colors.dark.text.tertiary,
              fontSize: theme.typography.fontSize.xs
            }}>
              rimasti
            </div>
          </div>
        </div>

        {/* Players Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: theme.spacing[2],
          maxHeight: '400px',
          overflowY: 'auto'
        }}>
          {/* Render dei giocatori acquistati - ORDINATI PER RUOLO */}
          {sortedPlayers.map((playerData, index) => {
            // Array di tutti i ruoli del giocatore
            const allRoles = playerData.playerRoles || [playerData.playerRole] || ['N/A'];
            
            return (
              <div
                key={index}
                style={{
                  background: theme.colors.dark.surface.secondary,
                  borderRadius: theme.borderRadius.base,
                  padding: theme.spacing[2],
                  border: `1px solid ${team.color}40`
                }}
              >
                <div style={{
                  color: theme.colors.dark.text.primary,
                  fontSize: theme.typography.fontSize.xs,
                  fontWeight: theme.typography.fontWeight.semibold,
                  marginBottom: theme.spacing[1],
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  {playerData.playerName || `Player ${playerData.playerId}`}
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  {/* Rendering di tutti i ruoli con i loro colori */}
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
                  <span style={{
                    color: theme.colors.accent.orange,
                    fontSize: theme.typography.fontSize.xs,
                    fontWeight: theme.typography.fontWeight.bold
                  }}>
                    €{playerData.price || 0}
                  </span>
                </div>
              </div>
            );
          })}
          
          {/* Slot vuoti */}
          {Array.from({ length: TEAM_SLOTS - sortedPlayers.length }).map((_, index) => (
            <div
              key={`empty-${index}`}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: theme.borderRadius.base,
                padding: theme.spacing[2],
                border: `1px dashed ${theme.colors.dark.border.primary}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '60px'
              }}
            >
              <Text color="muted" style={{ fontSize: theme.typography.fontSize.xs }}>
                Libero
              </Text>
            </div>
          ))}
        </div>
      </Card>
    );
  };

  return (
    <div>
      {/* Overview Stats */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: theme.spacing[4],
        marginBottom: theme.spacing[8]
      }}>
        <Card variant="glass">
          <div style={{ textAlign: 'center' }}>
            <div style={{
              color: theme.colors.primary[500],
              fontSize: theme.typography.fontSize['2xl'],
              fontWeight: theme.typography.fontWeight.bold,
              marginBottom: theme.spacing[1]
            }}>
              {auctionStats.totalPlayersAuctioned || 0}
            </div>
            <Text color="muted" size="sm">Giocatori Venduti</Text>
          </div>
        </Card>
        
        <Card variant="glass">
          <div style={{ textAlign: 'center' }}>
            <div style={{
              color: theme.colors.accent.orange,
              fontSize: theme.typography.fontSize['2xl'],
              fontWeight: theme.typography.fontWeight.bold,
              marginBottom: theme.spacing[1]
            }}>
              €{auctionStats.totalSpent || 0}
            </div>
            <Text color="muted" size="sm">Totale Speso</Text>
          </div>
        </Card>
        
        <Card variant="glass">
          <div style={{ textAlign: 'center' }}>
            <div style={{
              color: theme.colors.accent.cyan,
              fontSize: theme.typography.fontSize['2xl'],
              fontWeight: theme.typography.fontWeight.bold,
              marginBottom: theme.spacing[1]
            }}>
              €{auctionStats.averagePrice || 0}
            </div>
            <Text color="muted" size="sm">Prezzo Medio</Text>
          </div>
        </Card>
        
        <Card variant="glass">
          <div style={{ textAlign: 'center' }}>
            <div style={{
              color: theme.colors.secondary[400],
              fontSize: theme.typography.fontSize['2xl'],
              fontWeight: theme.typography.fontWeight.bold,
              marginBottom: theme.spacing[1]
            }}>
              {224 - (auctionStats.totalPlayersAuctioned || 0)}
            </div>
            <Text color="muted" size="sm">Giocatori Rimasti</Text>
          </div>
        </Card>
      </div>

      {/* Teams Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: theme.spacing[6]
      }}>
        {AUCTION_TEAMS.map(team => (
          <TeamCard key={team.id} team={team} />
        ))}
      </div>
    </div>
  );
};

export default AuctionTeamsView;