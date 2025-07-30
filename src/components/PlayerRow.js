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
    { field: 'prezzo', defaultValue: player.quotazione, color: theme.colors.accent.orange, width: '60px' },
    { field: 'budget', placeholder: '-', color: theme.colors.secondary[600], width: '60px' },
    { field: 'pmal', placeholder: '0', color: 'rgba(37, 99, 235, 0.8)', width: '60px' },
    { field: 'quo', placeholder: '0', color: 'transparent', border: true, width: '60px' },
    { field: 'titolare', placeholder: '0', color: 'rgba(37, 99, 235, 0.8)', width: '60px' },
    { field: 'affidabilita', placeholder: '0', color: 'rgba(37, 99, 235, 0.8)', width: '60px' },
    { field: 'fisico', placeholder: '0', color: 'rgba(37, 99, 235, 0.8)', width: '60px' },
    { field: 'fmvExp', placeholder: '0', color: 'rgba(37, 99, 235, 0.8)', width: '60px', step: '0.1' },
    { field: 'mv', placeholder: '0', color: 'rgba(37, 99, 235, 0.8)', width: '60px', step: '0.1' }
  ];

  const postFmvInputConfigs = [
    { field: 'presenze', placeholder: '0', color: 'rgba(37, 99, 235, 0.8)', width: '60px' },
    { field: 'gol', placeholder: '0', color: 'rgba(220, 38, 38, 0.8)', width: '60px' },
    { field: 'assist', placeholder: '0', color: 'rgba(202, 138, 4, 0.8)', width: '60px' }
  ];

  // Definizione delle larghezze fisse per ogni colonna
  const columnWidths = [
    '280px', // Nome (fissa)
    '60px',  // Prezzo
    '60px',  // Budget  
    '60px',  // PMAL
    '60px',  // Quo
    '60px',  // Titolare
    '60px',  // Affidabilità
    '60px',  // Fisico
    '60px',  // FMV Exp
    '60px',  // MV
    '60px',  // FMV (read-only)
    '60px',  // Presenze
    '60px',  // Gol
    '60px'   // Assist
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
        gridTemplateColumns: columnWidths.join(' '),
        gap: theme.spacing[2],
        alignItems: 'center',
        width: '100%'
      }}>
        
        {/* Player Info - Larghezza Fissa */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: theme.spacing[2],
          width: '280px', // Larghezza fissa
          minWidth: '280px',
          overflow: 'hidden'
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
            fontSize: theme.typography.fontSize.xs,
            flexShrink: 0
          }}>
            {index + 1}
          </div>
          
          <Bookmark 
            size={12} 
            color={isConfigured ? theme.colors.primary[400] : theme.colors.dark.text.tertiary}
            style={{ flexShrink: 0 }}
          />
          
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: theme.spacing[2],
            minWidth: 0, // Permette il truncate
            flex: 1
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
              fontSize: theme.typography.fontSize.xs,
              flexShrink: 0
            }}>
              {player.nome.charAt(0)}
            </div>
            
            <div style={{ minWidth: 0, flex: 1 }}>
              <div style={{
                color: theme.colors.dark.text.tertiary,
                fontSize: theme.typography.fontSize.xs,
                display: 'flex',
                alignItems: 'center',
                gap: theme.spacing[2],
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>
                {player.squadra}
                {isConfigured && (
                  <div style={{ 
                    width: theme.spacing[2], 
                    height: theme.spacing[2], 
                    background: theme.colors.primary[400], 
                    borderRadius: '50%',
                    flexShrink: 0
                  }}></div>
                )}
              </div>
              <div style={{ 
                color: theme.colors.primary[500], 
                fontWeight: theme.typography.fontWeight.semibold, 
                fontSize: theme.typography.fontSize.sm,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>
                {player.nome}
              </div>
            </div>
          </div>
        </div>

        {/* Editable Fields Prima del FMV */}
        {inputConfigs.map((config, configIndex) => (
          <div key={config.field} style={{ 
            width: columnWidths[configIndex + 1],
            display: 'flex',
            justifyContent: 'center'
          }}>
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
                width: '50px',
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
          fontSize: theme.typography.fontSize.sm,
          width: columnWidths[10] // FMV è alla posizione 10
        }}>
          {player.fvm}
        </div>

        {/* Editable Fields Dopo il FMV */}
        {postFmvInputConfigs.map((config, configIndex) => (
          <div key={config.field} style={{ 
            width: columnWidths[configIndex + 11], // Partono dalla posizione 11
            display: 'flex',
            justifyContent: 'center'
          }}>
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
                width: '50px',
                fontSize: theme.typography.fontSize.xs,
                fontWeight: theme.typography.fontWeight.semibold,
                border: config.border ? `1px solid ${theme.colors.dark.border.primary}` : '0'
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayerRow;