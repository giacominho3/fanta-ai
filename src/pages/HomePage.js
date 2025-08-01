import React from 'react';
import { Upload, Settings, Zap, Brain } from 'lucide-react';
import { theme, gradients } from '../theme/theme';
import Card from '../components/ui/Card';
import Grid from '../components/ui/Grid';
import { Heading, Text } from '../components/ui/Typography';

const HomePage = ({ 
  players = [], 
  budget = 500, 
  onNavigate = () => {}, 
  addNotification = () => {} 
}) => {
  const handleCardClick = (route) => {
    if ((route === 'configuration' || route === 'auction') && players.length === 0) {
      addNotification('warning', 'Carica prima i dati dei giocatori');
      return;
    }
    onNavigate(route);
  };

  const featureCards = [
    {
      id: 'loading',
      title: 'Caricamento Dati',
      description: 'Importa quotazioni dai file Excel di Fantacalcio.it',
      icon: Upload,
      color: theme.colors.primary[500],
      features: ['Quotazioni ufficiali', 'Dati storici performance', 'Import automatico'],
      available: true,
      route: 'loading'
    },
    {
      id: 'configuration',
      title: 'Configurazione Listone',
      description: 'Personalizza priorità e budget per ogni giocatore',
      icon: Settings,
      color: theme.colors.accent.cyan,
      features: ['Lista desideri', 'Budget allocation', 'Priorità e note'],
      available: players.length > 0,
      route: 'configuration',
      statusText: players.length > 0 ? `✓ ${players.length} giocatori caricati` : '⚠️ Carica prima i dati'
    },
    {
      id: 'auction',
      title: 'Asta Live',
      description: 'Assistente intelligente durante l\'asta',
      icon: Zap,
      color: theme.colors.accent.orange,
      features: ['Tracker tempo reale', 'Gestione squadre', 'Monitoraggio budget'],
      available: players.length > 0,
      route: 'auction',
      statusText: players.length > 0 ? `✓ Pronto per l'asta` : '⚠️ Carica prima i dati'
    }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: gradients.primary,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: theme.colors.dark.text.primary,
      padding: theme.spacing[8]
    }}>
      <div style={{ maxWidth: '1200px', textAlign: 'center' }}>
        
        {/* Header */}
        <div style={{ marginBottom: theme.spacing[12] }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            gap: theme.spacing[4], 
            marginBottom: theme.spacing[6] 
          }}>
            <Brain size={64} color={theme.colors.primary[500]} />
            <Heading level={1} style={{ 
              fontSize: theme.typography.fontSize['6xl'],
              fontWeight: theme.typography.fontWeight.extrabold,
              background: `linear-gradient(135deg, ${theme.colors.primary[400]}, ${theme.colors.accent.cyan})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              FantaAI
            </Heading>
          </div>
          <Text size="xl" color="secondary" style={{ 
            marginBottom: theme.spacing[2],
            fontWeight: theme.typography.fontWeight.medium
          }}>
            L'assistente intelligente per il tuo fantacalcio
          </Text>
          <Text color="muted" style={{ fontWeight: theme.typography.fontWeight.light }}>
            Analisi avanzate • Insights AI • Gestione completa dell'asta
          </Text>
        </div>

        {/* Feature Cards */}
        <Grid cols={3} gap={8}>
          {featureCards.map(card => (
            <Card
              key={card.id}
              variant="glass"
              hover={card.available}
              onClick={() => card.available && handleCardClick(card.route)}
              style={{
                opacity: card.available ? 1 : 0.6,
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Card Content */}
              <div style={{ position: 'relative', zIndex: 2 }}>
                <card.icon 
                  size={64} 
                  color={card.color} 
                  style={{ 
                    margin: `0 auto ${theme.spacing[6]} auto`, 
                    display: 'block',
                    filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))'
                  }} 
                />
                
                <Heading level={3} style={{ 
                  marginBottom: theme.spacing[4],
                  fontWeight: theme.typography.fontWeight.semibold
                }}>
                  {card.title}
                </Heading>
                
                <Text color="secondary" style={{ 
                  marginBottom: theme.spacing[6],
                  lineHeight: theme.typography.lineHeight.relaxed
                }}>
                  {card.description}
                </Text>
                
                <div style={{ 
                  fontSize: theme.typography.fontSize.sm, 
                  color: card.color, 
                  marginBottom: theme.spacing[4],
                  textAlign: 'left'
                }}>
                  {card.features.map((feature, index) => (
                    <div key={index} style={{ 
                      marginBottom: theme.spacing[1],
                      fontWeight: theme.typography.fontWeight.medium
                    }}>
                      • {feature}
                    </div>
                  ))}
                </div>

                {card.statusText && (
                  <div style={{
                    fontSize: theme.typography.fontSize.xs,
                    color: card.available ? theme.colors.primary[300] : theme.colors.accent.yellow,
                    background: card.available 
                      ? 'rgba(34, 197, 94, 0.2)' 
                      : 'rgba(245, 158, 11, 0.2)',
                    borderRadius: theme.borderRadius.lg,
                    padding: theme.spacing[3],
                    fontWeight: theme.typography.fontWeight.medium,
                    border: `1px solid ${card.available ? theme.colors.primary[500] : theme.colors.accent.yellow}`
                  }}>
                    {card.statusText}
                  </div>
                )}
              </div>

              {/* Gradient Overlay for Available Cards */}
              {card.available && (
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: `linear-gradient(135deg, ${card.color}10, transparent)`,
                  zIndex: 1,
                  pointerEvents: 'none'
                }} />
              )}
            </Card>
          ))}
        </Grid>

        {/* Stats */}
        {players.length > 0 && (
          <div style={{ marginTop: theme.spacing[12] }}>
            <Card variant="glass">
              <Heading level={3} style={{ 
                marginBottom: theme.spacing[6],
                fontWeight: theme.typography.fontWeight.semibold
              }}>
                Stato del Sistema
              </Heading>
              <Grid cols={3} gap={4}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ 
                    fontSize: theme.typography.fontSize['3xl'], 
                    fontWeight: theme.typography.fontWeight.bold, 
                    color: theme.colors.primary[500],
                    marginBottom: theme.spacing[2]
                  }}>
                    {players.length}
                  </div>
                  <Text size="sm" color="muted" style={{ fontWeight: theme.typography.fontWeight.medium }}>
                    Giocatori Caricati
                  </Text>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ 
                    fontSize: theme.typography.fontSize['3xl'], 
                    fontWeight: theme.typography.fontWeight.bold, 
                    color: theme.colors.accent.cyan,
                    marginBottom: theme.spacing[2]
                  }}>
                    {budget}
                  </div>
                  <Text size="sm" color="muted" style={{ fontWeight: theme.typography.fontWeight.medium }}>
                    Budget Disponibile
                  </Text>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ 
                    fontSize: theme.typography.fontSize['3xl'], 
                    fontWeight: theme.typography.fontWeight.bold, 
                    color: theme.colors.accent.orange,
                    marginBottom: theme.spacing[2]
                  }}>
                    Ready
                  </div>
                  <Text size="sm" color="muted" style={{ fontWeight: theme.typography.fontWeight.medium }}>
                    Stato Sistema
                  </Text>
                </div>
              </Grid>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;