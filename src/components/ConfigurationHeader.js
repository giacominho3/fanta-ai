import React from 'react';
import { ArrowLeft, Search, DollarSign, Download } from 'lucide-react';
import { theme } from '../theme/theme';
import Button from './ui/Button';
import Input from './ui/Input';

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
      padding: `${theme.spacing[4]} ${theme.spacing[6]}`
    }}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between' 
      }}>
        
        {/* Left Section */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: theme.spacing[4] 
        }}>
          <Button 
            variant="ghost"
            onClick={onNavigateHome}
          >
            <ArrowLeft size={20} />
          </Button>
          
          {/* Search */}
          <div style={{ position: 'relative', width: '16rem' }}>
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
              placeholder="cerca giocatori..."
              value={searchTerm}
              onChange={(e) => onSearch(e.target.value)}
              style={{
                paddingLeft: '2.5rem',
                borderRadius: theme.borderRadius.full,
                width: '100%'
              }}
            />
          </div>
        </div>

        {/* Role Filters */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: theme.spacing[2] 
        }}>
          {roles.map(role => (
            <Button
              key={role.key}
              variant={selectedRole === role.key ? 'primary' : 'outline'}
              size="small"
              onClick={() => onRoleChange(role.key)}
              style={{
                borderRadius: theme.borderRadius.full,
                minWidth: '3rem'
              }}
            >
              {role.label}
            </Button>
          ))}
        </div>

        {/* Right Section */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: theme.spacing[4] 
        }}>
          {/* Budget Display */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: theme.spacing[2],
            background: theme.colors.dark.surface.primary,
            borderRadius: theme.borderRadius.full,
            padding: `${theme.spacing[2]} ${theme.spacing[4]}`,
            border: `1px solid ${theme.colors.dark.border.primary}`
          }}>
            <DollarSign size={16} color={theme.colors.accent.cyan} />
            <span style={{ 
              color: theme.colors.dark.text.primary, 
              fontWeight: theme.typography.fontWeight.semibold 
            }}>
              {budget}
            </span>
          </div>

          {/* Action Buttons */}
          <Button 
            variant="primary"
            onClick={onSaveConfigurations}
            style={{ borderRadius: theme.borderRadius.full }}
          >
            <Download size={16} />
            Salva Config
          </Button>
          
          <Button 
            variant="danger"
            onClick={onResetConfigurations}
            style={{ borderRadius: theme.borderRadius.full }}
          >
            Reset
          </Button>
          
          <Button 
            variant="secondary"
            style={{ borderRadius: theme.borderRadius.full }}
          >
            Mantra
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfigurationHeader;