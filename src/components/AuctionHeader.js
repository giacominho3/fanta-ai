import React from 'react';
import { ArrowLeft, Search, Users, List, BarChart3, Download } from 'lucide-react';
import { theme } from '../theme/theme';
import Button from './ui/Button';
import Input from './ui/Input';
import { getRoleColor } from './ConfigurationHeader';

const AuctionHeader = ({ 
  currentView = 'players',
  onViewChange = () => {},
  searchTerm = '',
  onSearch = () => {},
  selectedRole = 'T',
  onRoleChange = () => {},
  onNavigateHome = () => {},
  onResetAuction = () => {},
  roles = [],
  stats = {}
}) => {
  return (
    <div style={{
      background: 'rgba(0, 0, 0, 0.2)',
      backdropFilter: 'blur(12px)',
      borderBottom: `1px solid ${theme.colors.dark.border.secondary}`,
      padding: `${theme.spacing[3]} ${theme.spacing[6]}`,
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        gap: theme.spacing[4],
        minHeight: '50px'
      }}>
        
        {/* Left Section */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: theme.spacing[4],
          flex: '0 0 auto',
          minWidth: '200px'
        }}>
          <Button 
            variant="ghost"
            size="small"
            onClick={onNavigateHome}
            style={{
              padding: theme.spacing[2],
              borderRadius: theme.borderRadius.full
            }}
          >
            <ArrowLeft size={20} />
          </Button>
          
          <h1 style={{
            color: theme.colors.dark.text.primary,
            fontSize: theme.typography.fontSize.lg,
            fontWeight: theme.typography.fontWeight.bold,
            margin: 0,
            display: 'flex',
            alignItems: 'center',
            gap: theme.spacing[2]
          }}>
            🏆 Asta Live
          </h1>
        </div>

        {/* Center Section - View Toggle */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: theme.spacing[2],
          flex: '1 1 auto',
          justifyContent: 'center'
        }}>
          <div style={{
            background: theme.colors.dark.surface.primary,
            borderRadius: theme.borderRadius.full,
            padding: theme.spacing[1],
            display: 'flex',
            gap: theme.spacing[1]
          }}>
            <Button
              variant={currentView === 'players' ? 'primary' : 'ghost'}
              size="small"
              onClick={() => onViewChange('players')}
              style={{
                borderRadius: theme.borderRadius.full,
                fontSize: theme.typography.fontSize.sm,
                fontWeight: theme.typography.fontWeight.medium
              }}
            >
              <List size={16} />
              Giocatori
            </Button>
            <Button
              variant={currentView === 'teams' ? 'primary' : 'ghost'}
              size="small"
              onClick={() => onViewChange('teams')}
              style={{
                borderRadius: theme.borderRadius.full,
                fontSize: theme.typography.fontSize.sm,
                fontWeight: theme.typography.fontWeight.medium
              }}
            >
              <Users size={16} />
              Squadre
            </Button>
          </div>
        </div>

        {/* Right Section - Stats and Actions */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: theme.spacing[3],
          flex: '0 0 auto',
          minWidth: '300px',
          justifyContent: 'flex-end'
        }}>
          {/* Quick Stats */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: theme.spacing[3],
            fontSize: theme.typography.fontSize.sm
          }}>
            <div style={{
              background: 'rgba(34, 197, 94, 0.2)',
              borderRadius: theme.borderRadius.full,
              padding: `${theme.spacing[1]} ${theme.spacing[3]}`,
              color: theme.colors.primary[400],
              fontWeight: theme.typography.fontWeight.semibold
            }}>
              {stats.totalPlayersAuctioned || 0} venduti
            </div>
            
            <div style={{
              background: 'rgba(59, 130, 246, 0.2)',
              borderRadius: theme.borderRadius.full,
              padding: `${theme.spacing[1]} ${theme.spacing[3]}`,
              color: theme.colors.accent.blue,
              fontWeight: theme.typography.fontWeight.semibold
            }}>
              €{stats.totalSpent || 0}
            </div>
          </div>

          {/* Actions */}
          <Button 
            variant="secondary"
            size="small"
            onClick={onResetAuction}
            style={{ 
              borderRadius: theme.borderRadius.full,
              fontSize: theme.typography.fontSize.xs
            }}
          >
            Reset
          </Button>
        </div>
      </div>

      {/* Second Row - Search and Roles (only in players view) */}
      {currentView === 'players' && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: theme.spacing[4],
          marginTop: theme.spacing[3]
        }}>
          {/* Search */}
          <div style={{ position: 'relative', width: '18rem' }}>
            <Search size={16} style={{
              color: theme.colors.dark.text.tertiary,
              position: 'absolute',
              left: theme.spacing[3],
              top: '50%',
              transform: 'translateY(-50%)',
              pointerEvents: 'none'
            }} />
            <Input
              type="text"
              placeholder="Cerca giocatori..."
              value={searchTerm}
              onChange={(e) => onSearch(e.target.value)}
              style={{
                paddingLeft: '2.5rem',
                borderRadius: theme.borderRadius.full,
                width: '100%',
                fontSize: theme.typography.fontSize.sm,
                fontWeight: theme.typography.fontWeight.medium
              }}
            />
          </div>

          {/* Role Filters */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: theme.spacing[1],
            flex: '1 1 auto',
            justifyContent: 'center',
            overflowX: 'auto',
            whiteSpace: 'nowrap'
          }}>
            {roles.map(role => {
              const roleColor = getRoleColor(role.key);
              const isSelected = selectedRole === role.key;
              
              return (
                <button
                  key={role.key}
                  onClick={() => onRoleChange(role.key)}
                  style={{
                    borderRadius: theme.borderRadius.full,
                    minWidth: '2.5rem',
                    width: '2.5rem',
                    height: '2.5rem',
                    padding: 0,
                    fontWeight: theme.typography.fontWeight.bold,
                    fontSize: theme.typography.fontSize.xs,
                    flexShrink: 0,
                    cursor: 'pointer',
                    transition: theme.transitions.fast,
                    background: isSelected ? roleColor : 'transparent',
                    color: isSelected ? 'white' : roleColor,
                    border: `2px solid ${roleColor}`,
                    boxShadow: isSelected ? `0 0 12px ${roleColor}40` : 'none',
                    transform: isSelected ? 'scale(1.05)' : 'scale(1)',
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) {
                      e.target.style.background = `${roleColor}20`;
                      e.target.style.transform = 'scale(1.02)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) {
                      e.target.style.background = 'transparent';
                      e.target.style.transform = 'scale(1)';
                    }
                  }}
                >
                  {role.label}
                </button>
              );
            })}
          </div>

          <div style={{ width: '18rem' }}></div>
        </div>
      )}
    </div>
  );
};

export default AuctionHeader;