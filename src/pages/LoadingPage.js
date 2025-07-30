import React from 'react';
import { Upload, ArrowLeft } from 'lucide-react';
import { theme, gradients } from '../theme/theme';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { Heading, Text } from '../components/ui/Typography';
import { useFileUpload } from '../hooks/useFileUpload';

const LoadingPage = ({ 
  players = [], 
  loading = false, 
  onNavigate = () => {}, 
  onFileUpload = () => {},
  addNotification = () => {} 
}) => {
  const { handleFileUpload } = useFileUpload();

  const handleFileChange = (event) => {
    handleFileUpload(
      event,
      onFileUpload,
      (error) => addNotification('error', error)
    );
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: gradients.primary,
      padding: theme.spacing[8]
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          marginBottom: theme.spacing[8] 
        }}>
          <Button 
            variant="ghost"
            onClick={() => onNavigate('home')}
            style={{ display: 'flex', alignItems: 'center', gap: theme.spacing[2] }}
          >
            <ArrowLeft size={20} />
            Torna alla Home
          </Button>
          
          <Heading level={1}>Caricamento Dati</Heading>
          
          <div></div>
        </div>

        {/* Upload Card */}
        <Card variant="glass">
          <div style={{ textAlign: 'center', marginBottom: theme.spacing[8] }}>
            <Upload 
              size={64} 
              color={theme.colors.primary[500]} 
              style={{ 
                margin: `0 auto ${theme.spacing[4]} auto`, 
                display: 'block' 
              }} 
            />
            <Heading level={2} style={{ marginBottom: theme.spacing[2] }}>
              Carica Quotazioni Fantacalcio.it
            </Heading>
            <Text color="muted">
              Seleziona il file Excel con le quotazioni ufficiali della stagione corrente
            </Text>
          </div>

          {/* Drop Zone */}
          <div style={{
            border: `2px dashed ${theme.colors.primary[500]}`,
            borderRadius: theme.borderRadius.xl,
            padding: theme.spacing[12],
            textAlign: 'center',
            background: 'rgba(34, 197, 94, 0.05)',
            transition: theme.transitions.base
          }}>
            <input
              type="file"
              accept=".xlsx,.xls"
              onChange={handleFileChange}
              style={{ display: 'none' }}
              id="fileUpload"
              disabled={loading}
            />
            <label 
              htmlFor="fileUpload" 
              style={{ 
                cursor: loading ? 'not-allowed' : 'pointer',
                display: 'block'
              }}
            >
              <Upload 
                size={48} 
                color={theme.colors.primary[500]} 
                style={{ 
                  margin: `0 auto ${theme.spacing[4]} auto`, 
                  display: 'block' 
                }} 
              />
              <Text size="lg" style={{ marginBottom: theme.spacing[2] }}>
                {loading ? 'Caricamento in corso...' : 'Clicca per caricare il file Excel'}
              </Text>
              <Text size="sm" color="muted">
                Supporta file .xlsx e .xls da Fantacalcio.it
              </Text>
            </label>
          </div>

          {/* Success State */}
          {players.length > 0 && (
            <Card 
              variant="success"
              style={{ marginTop: theme.spacing[8] }}
            >
              <Heading level={3} color="accent" style={{ marginBottom: theme.spacing[2] }}>
                ✓ Dati caricati con successo
              </Heading>
              <Text style={{ marginBottom: theme.spacing[4] }}>
                {players.length} giocatori importati dal file Excel
              </Text>
              <Button 
                variant="primary"
                onClick={() => onNavigate('configuration')}
              >
                Vai alla Configurazione →
              </Button>
            </Card>
          )}

          {/* Instructions */}
          <div style={{ 
            marginTop: theme.spacing[8],
            padding: theme.spacing[6],
            background: theme.colors.dark.surface.secondary,
            borderRadius: theme.borderRadius.lg
          }}>
            <Heading level={4} style={{ marginBottom: theme.spacing[3] }}>
              Istruzioni per il caricamento
            </Heading>
            <div style={{ 
              display: 'grid', 
              gap: theme.spacing[2],
              fontSize: theme.typography.fontSize.sm,
              color: theme.colors.dark.text.secondary
            }}>
              <div>1. Scarica il file Excel dalle quotazioni ufficiali di Fantacalcio.it</div>
              <div>2. Assicurati che il file contenga le colonne: Nome, Ruolo, Squadra, Quotazione, FVM</div>
              <div>3. Seleziona il file usando il pulsante sopra</div>
              <div>4. Attendi il completamento del caricamento</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LoadingPage;