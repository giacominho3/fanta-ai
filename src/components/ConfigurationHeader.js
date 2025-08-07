import React from 'react';
import { ArrowLeft, Search, DollarSign, Download } from 'lucide-react';
import { theme } from '../theme/theme';
import Button from './ui/Button';
import Input from './ui/Input';
import { ROLE_COLORS } from '../constants/roles';

export const getRoleColor = (roleKey) => {
  return ROLE_COLORS[roleKey] || theme.colors.gray[500];
};

const ConfigurationHeader = ({ 
  searchTerm = '',
  onSearch = () => {},
  selectedRole = 'T',
  onRoleChange = () => {},
  budget = 500,
  configuratedCount = 0,
  totalBudgetAssigned = 0,
  onSaveConfigurations = () => {},
  onResetConfigurations = () => {},
  onNavigateHome = () => {},
  roles = []
}) => {
  return (
    <div style={{
      background: 'rgba(0, 0, 0, 0.2)',
      backdropFilter: 'blur(12px)',
      borderBottom: `1px solid ${theme.colors.dark.border.secondary}`,
      padding: `${theme.spacing[3]} ${theme.spacing[6]}`, // Ridotto da spacing[4] a spacing[3]
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        gap: theme.spacing[4],
        minHeight: '50px' // Ridotto da 60px a 50px
      }}>
        
        {/* Left Section */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: theme.spacing[4],
          flex: '0 0 auto',
          minWidth: '300px'
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
        </div>

        {/* Role Filters - Single Row con colori per ruolo */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: theme.spacing[1],
          flex: '1 1 auto',
          justifyContent: 'center',
          minWidth: 0, // Importante per permettere al flex di restringersi
          overflowX: 'auto', // Scroll orizzontale se necessario
          whiteSpace: 'nowrap',
          minHeight: '50px'
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
                  
                  // Stili in base alla selezione
                  background: isSelected ? roleColor : 'transparent',
                  color: isSelected ? 'white' : roleColor,
                  border: `2px solid ${roleColor}`,
                  
                  // Shadow per il ruolo selezionato
                  boxShadow: isSelected ? `0 0 12px ${roleColor}40` : 'none',
                  
                  // Effetto hover
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

        {/* Right Section */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: theme.spacing[2],
          flex: '0 0 auto',
          minWidth: '350px',
          justifyContent: 'flex-end'
        }}>
          {/* Budget Display */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: theme.spacing[2],
            background: theme.colors.dark.surface.primary,
            borderRadius: theme.borderRadius.full,
            padding: `${theme.spacing[2]} ${theme.spacing[3]}`,
            border: `1px solid ${theme.colors.dark.border.primary}`,
            boxShadow: theme.shadows.sm
          }}>
            <DollarSign size={14} color={theme.colors.accent.cyan} />
            <span style={{ 
              color: theme.colors.dark.text.primary, 
              fontWeight: theme.typography.fontWeight.semibold,
              fontSize: theme.typography.fontSize.sm
            }}>
              {budget}
            </span>
          </div>

          {/* Budget Assigned Indicator */}
          {totalBudgetAssigned > 0 && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: theme.spacing[1],
              background: 'rgba(34, 197, 94, 0.2)',
              borderRadius: theme.borderRadius.full,
              padding: `${theme.spacing[1]} ${theme.spacing[2]}`,
              border: `1px solid ${theme.colors.primary[500]}`,
              fontSize: theme.typography.fontSize.xs
            }}>
              <span style={{ 
                color: theme.colors.primary[400], 
                fontWeight: theme.typography.fontWeight.medium
              }}>
                {totalBudgetAssigned}
              </span>
            </div>
          )}

          {/* Action Buttons */}
          <Button 
            variant="primary"
            size="small"
            onClick={onSaveConfigurations}
            style={{ 
              borderRadius: theme.borderRadius.full,
              fontWeight: theme.typography.fontWeight.semibold,
              fontSize: theme.typography.fontSize.xs,
              padding: `${theme.spacing[2]} ${theme.spacing[3]}`
            }}
          >
            <Download size={14} />
            Salva
          </Button>
          
          <Button 
            variant="danger"
            size="small"
            onClick={onResetConfigurations}
            style={{ 
              borderRadius: theme.borderRadius.full,
              fontWeight: theme.typography.fontWeight.semibold,
              fontSize: theme.typography.fontSize.xs,
              padding: `${theme.spacing[2]} ${theme.spacing[3]}`
            }}
          >
            Reset
          </Button>
          
          <Button 
            variant="secondary"
            size="small"
            style={{ 
              borderRadius: theme.borderRadius.full,
              fontWeight: theme.typography.fontWeight.semibold,
              fontSize: theme.typography.fontSize.xs,
              padding: `${theme.spacing[2]} ${theme.spacing[3]}`
            }}
          >
            Mantra
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfigurationHeader;