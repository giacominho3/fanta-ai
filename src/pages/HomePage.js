import React from 'react';
import { Upload, Settings, Zap, Brain } from 'lucide-react';
import { theme, gradients } from '../theme/theme';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Grid from '../components/ui/Grid';
import { Heading, Text } from '../components/ui/Typography';

const HomePage = ({ 
  players = [], 
  budget = 500, 
  onNavigate = () => {}, 
  addNotification = () => {} 
}) => {
  const handleCardClick = (route) => {
    if (route === 'configuration' && players.length === 0) {
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
      features: ['Tracker tempo reale', 'AI insights dinamici', 'Simulatore budget'],
      available: false,
      statusText: '🚧 In sviluppo'
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
            <Heading level={1} style={{ fontSize: theme.typography.fontSize['6xl'] }}>
              FantaAI
            </Heading>
          </div>
          <Text size="xl" color="secondary" style={{ marginBottom: theme.spacing[2] }}>
            L'assistente intelligente per il tuo fantacalcio
          </Text>
          <Text color="muted">
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
              onClick={() => handleCardClick(card.route)}
              style={{
                opacity: card.available ? 1 : 0.6,
                cursor: card.available ? 'pointer' : 'default',
                transition: theme.transitions.base,
                ...(card.available && {
                  ':hover': {
                    background: gradients.elevated,
                    transform: 'scale(1.05)',
                  }
                })
              }}
            >
              <card.icon 
                size={64} 
                color={card.color} 
                style={{ 
                  margin: `0 auto ${theme.spacing[6]} auto`, 
                  display: 'block' 
                }} 
              />
              
              <Heading level={3} style={{ marginBottom: theme.spacing[4] }}>
                {card.title}
              </Heading>
              
              <Text color="secondary" style={{ marginBottom: theme.spacing[6] }}>
                {card.description}
              </Text>
              
              <div style={{ 
                fontSize: theme.typography.fontSize.sm, 
                color: card.color, 
                marginBottom: theme.spacing[4] 
              }}>
                {card.features.map((feature, index) => (
                  <div key={index}>• {feature}</div>
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
                  padding: theme.spacing[2]
                }}>
                  {card.statusText}
                </div>
              )}
            </Card>
          ))}
        </Grid>

        {/* Stats */}
        {players.length > 0 && (
          <Card 
            variant="glass" 
            style={{ 
              marginTop: theme.spacing[12],
              textAlign: 'center'
            }}
          >
            <Grid cols={3} gap={4}>
              <div>
                <div style={{ 
                  fontSize: theme.typography.fontSize['2xl'], 
                  fontWeight: theme.typography.fontWeight.bold, 
                  color: theme.colors.primary[500] 
                }}>
                  {players.length}
                </div>
                <Text size="sm" color="muted">Giocatori Caricati</Text>
              </div>
              <div>
                <div style={{ 
                  fontSize: theme.typography.fontSize['2xl'], 
                  fontWeight: theme.typography.fontWeight.bold, 
                  color: theme.colors.accent.cyan 
                }}>
                  {budget}
                </div>
                <Text size="sm" color="muted">Budget Disponibile</Text>
              </div>
              <div>
                <div style={{ 
                  fontSize: theme.typography.fontSize['2xl'], 
                  fontWeight: theme.typography.fontWeight.bold, 
                  color: theme.colors.accent.orange 
                }}>
                  Ready
                </div>
                <Text size="sm" color="muted">Stato Sistema</Text>
              </div>
            </Grid>
          </Card>
        )}
      </div>
    </div>
  );
};

export default HomePage;