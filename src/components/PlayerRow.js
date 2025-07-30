import React from 'react';
import { Bookmark } from 'lucide-react';
import { theme } from '../theme/theme';
import Input from './ui/Input';

const PlayerRow = ({ 
  player, 
  index, 
  isConfigured,
  getPlayerConfig,
  updatePlayerConfig 
}) => {
  const inputConfigs = [
    { field: 'prezzo', defaultValue: player.quotazione, color: theme.colors.accent.orange, width: '3rem' },
    { field: 'budget', placeholder: '-', color: theme.colors.secondary[600], width: '3rem' },
    { field: 'pmal', placeholder: '0', color: 'rgba(37, 99, 235, 0.8)', width: '3rem' },
    { field: 'quo', placeholder: '0', color: 'transparent', border: true, width: '3rem' },
    { field: 'titolare', placeholder: '0', color: 'rgba(37, 99, 235, 0.8)', width: '3rem' },
    { field: 'affidabilita', placeholder: '0', color: 'rgba(37, 99, 235, 0.8)', width: '3rem' },
    { field: 'fisico', placeholder: '0', color: 'rgba(37, 99, 235, 0.8)', width: '3rem' },
    { field: 'fmvExp', placeholder: '0', color: 'rgba(37, 99, 235, 0.8)', width: '3rem', step: '0.1' },
    { field: 'mv', placeholder: '0', color: 'rgba(37, 99, 235, 0.8)', width: '3rem', step: '0.1' },
    { field: 'presenze', placeholder: '0', color: 'rgba(37, 99, 235, 0.8)', width: '3rem' },
    { field: 'gol', placeholder: '0', color: 'rgba(220, 38, 38, 0.8)', width: '3rem' },
    { field: 'assist', placeholder: '0', color: 'rgba(202, 138, 4, 0.8)', width: '3rem' }
  ];

  return (
    <div style={{
      borderBottom: `1px solid ${theme.colors.dark.border.secondary}`,
      padding: theme.spacing[3],
      background: isConfigured ? 'rgba(34, 197, 94, 0.05)' : 'transparent',
      borderLeft: isConfigured ? `2px solid ${theme.colors.primary[400]}` : 'none'
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '2fr repeat(13, 1fr)',
        gap: theme.spacing[3],
        alignItems: 'center'
      }}>
        
        {/* Player Info */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: theme.spacing[2] 
        }}>
          {/* Index */}
          <div style={{
            width: theme.spacing[6],
            height: theme.spacing[6],
            background: theme.colors.dark.surface.primary,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: theme.colors.dark.text.tertiary,
            fontSize: theme.typography.fontSize.xs
          }}>
            {index + 1}
          </div>
          
          <Bookmark 
            size={12} 
            color={isConfigured ? theme.colors.primary[400] : theme.colors.dark.text.tertiary} 
          />
          
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: theme.spacing[2] 
          }}>
            {/* Avatar */}
            <div style={{
              width: theme.spacing[8],
              height: theme.spacing[8],
              background: `linear-gradient(135deg, ${theme.colors.secondary[400]}, ${theme.colors.primary[500]})`,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: theme.typography.fontWeight.bold,
              fontSize: theme.typography.fontSize.xs
            }}>
              {player.nome.charAt(0)}
            </div>
            
            <div>
              <div style={{
                color: theme.colors.dark.text.tertiary,
                fontSize: theme.typography.fontSize.xs,
                display: 'flex',
                alignItems: 'center',
                gap: theme.spacing[2]
              }}>
                {player.squadra}
                {isConfigured && (
                  <div style={{ 
                    width: theme.spacing[2], 
                    height: theme.spacing[2], 
                    background: theme.colors.primary[400], 
                    borderRadius: '50%' 
                  }}></div>
                )}
              </div>
              <div style={{ 
                color: theme.colors.primary[500], 
                fontWeight: theme.typography.fontWeight.semibold, 
                fontSize: theme.typography.fontSize.sm 
              }}>
                {player.nome}
              </div>
            </div>
          </div>
        </div>

        {/* Editable Fields */}
        {inputConfigs.map(config => (
          <div key={config.field} style={{ textAlign: 'center' }}>
            <Input
              type="number"
              step={config.step}
              value={getPlayerConfig(player.id, config.field, config.defaultValue)}
              onChange={(e) => updatePlayerConfig(player.id, config.field, e.target.value)}
              placeholder={config.placeholder}
              style={{
                background: config.color,
                color: config.border ? theme.colors.dark.text.primary : (
                  config.color === 'transparent' ? theme.colors.dark.text.primary : 'white'
                ),
                textAlign: 'center',
                borderRadius: config.field === 'prezzo' ? theme.borderRadius.full : theme.borderRadius.base,
                padding: `${theme.spacing[1]} ${theme.spacing[2]}`,
                width: config.width,
                fontSize: theme.typography.fontSize.xs,
                fontWeight: theme.typography.fontWeight.semibold,
                border: config.border ? `1px solid ${theme.colors.dark.border.primary}` : '0'
              }}
            />
          </div>
        ))}

        {/* FMV (Read-only) */}
        <div style={{ 
          color: theme.colors.dark.text.primary, 
          textAlign: 'center', 
          fontWeight: theme.typography.fontWeight.medium, 
          fontSize: theme.typography.fontSize.sm 
        }}>
          {player.fvm}
        </div>
      </div>
    </div>
  );
};

export default PlayerRow;