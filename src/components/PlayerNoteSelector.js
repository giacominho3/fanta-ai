import React, { useState, useRef, useEffect } from 'react';
import { theme } from '../theme/theme';

// Configurazione delle note disponibili
export const PLAYER_NOTES = {
  'T': { label: 'Top', color: '#EAB308', description: 'Giocatore top' },
  'S': { label: 'Scommessa', color: '#22c55e', description: 'Scommessa' },
  'C': { label: 'Certezza', color: '#3B82F6', description: 'Certezza' },
  'E': { label: 'Esca', color: '#EF4444', description: 'Esca' },
  'I': { label: 'Ideale', color: '#F59E0B', description: 'Ideale' }
};

const PlayerNoteSelector = ({ 
  value = '', 
  onChange = () => {},
  readOnly = false,
  size = 28
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const buttonRef = useRef(null);
  
  const currentNote = PLAYER_NOTES[value];

  // Calcola la posizione del dropdown quando si apre
  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + 4,
        left: rect.left + (rect.width / 2) - 75 // Centra il dropdown (150px / 2 = 75px)
      });
    }
  }, [isOpen]);

  const handleSelect = (noteKey) => {
    // Se clicco sulla stessa nota che è già selezionata, la rimuovo
    const newValue = value === noteKey ? '' : noteKey;
    onChange(newValue);
    setIsOpen(false);
  };

  const handleClick = () => {
    if (!readOnly) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <>
      <button
        ref={buttonRef}
        onClick={handleClick}
        disabled={readOnly}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          borderRadius: '50%',
          border: currentNote ? `2px solid ${currentNote.color}` : `2px solid ${theme.colors.dark.border.primary}`,
          background: currentNote ? currentNote.color : 'transparent',
          color: currentNote ? 'white' : theme.colors.dark.text.tertiary,
          fontSize: `${size * 0.5}px`,
          fontWeight: theme.typography.fontWeight.bold,
          cursor: readOnly ? 'default' : 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: theme.transitions.fast,
          opacity: readOnly ? 1 : 1,
          boxShadow: currentNote ? `0 2px 4px ${currentNote.color}40` : 'none',
          flexShrink: 0,
          position: 'relative',
          zIndex: isOpen ? 10000 : 1
        }}
        onMouseEnter={(e) => {
          if (!readOnly && !isOpen) {
            e.target.style.transform = 'scale(1.1)';
          }
        }}
        onMouseLeave={(e) => {
          if (!readOnly) {
            e.target.style.transform = 'scale(1)';
          }
        }}
      >
        {currentNote ? currentNote.label[0] : '+'}
      </button>

      {/* Dropdown con position fixed */}
      {isOpen && !readOnly && (
        <>
          {/* Overlay per chiudere il dropdown */}
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 19998,
              background: 'transparent'
            }}
            onClick={() => setIsOpen(false)}
          />
          
          {/* Menu dropdown */}
          <div style={{
            position: 'fixed',
            top: `${dropdownPosition.top}px`,
            left: `${dropdownPosition.left}px`,
            background: theme.colors.dark.surface.primary,
            border: `1px solid ${theme.colors.dark.border.primary}`,
            borderRadius: theme.borderRadius.lg,
            minWidth: '150px',
            width: '150px',
            zIndex: 19999,
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.8)',
            overflow: 'hidden',
            backdropFilter: 'blur(8px)'
          }}>
            {/* Opzione "Nessuna nota" */}
            <div
              onClick={() => handleSelect('')}
              style={{
                padding: `${theme.spacing[3]} ${theme.spacing[4]}`,
                cursor: 'pointer',
                color: theme.colors.dark.text.primary,
                fontSize: theme.typography.fontSize.sm,
                fontWeight: theme.typography.fontWeight.medium,
                borderBottom: `1px solid ${theme.colors.dark.border.secondary}`,
                transition: theme.transitions.fast,
                display: 'flex',
                alignItems: 'center',
                gap: theme.spacing[2],
                backgroundColor: 'transparent'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = theme.colors.dark.surface.secondary;
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
              }}
            >
              <div style={{
                width: '16px',
                height: '16px',
                borderRadius: '50%',
                border: `2px solid ${theme.colors.dark.border.primary}`,
                background: 'transparent',
                flexShrink: 0
              }} />
              Nessuna nota
            </div>

            {/* Opzioni delle note */}
            {Object.entries(PLAYER_NOTES).map(([key, note]) => (
              <div
                key={key}
                onClick={() => handleSelect(key)}
                style={{
                  padding: `${theme.spacing[3]} ${theme.spacing[4]}`,
                  cursor: 'pointer',
                  color: theme.colors.dark.text.primary,
                  fontSize: theme.typography.fontSize.sm,
                  fontWeight: theme.typography.fontWeight.medium,
                  borderBottom: key !== 'I' ? `1px solid ${theme.colors.dark.border.secondary}` : 'none',
                  transition: theme.transitions.fast,
                  display: 'flex',
                  alignItems: 'center',
                  gap: theme.spacing[2],
                  backgroundColor: value === key ? `${note.color}20` : 'transparent'
                }}
                onMouseEnter={(e) => {
                  if (value !== key) {
                    e.target.style.backgroundColor = theme.colors.dark.surface.secondary;
                  }
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = value === key ? `${note.color}20` : 'transparent';
                }}
              >
                <div style={{
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  background: note.color,
                  color: 'white',
                  fontSize: '10px',
                  fontWeight: theme.typography.fontWeight.bold,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  boxShadow: `0 2px 4px ${note.color}40`
                }}>
                  {key}
                </div>
                <div>
                  <div style={{ fontWeight: theme.typography.fontWeight.semibold }}>
                    {note.label}
                  </div>
                  <div style={{ 
                    fontSize: theme.typography.fontSize.xs, 
                    color: theme.colors.dark.text.tertiary,
                    marginTop: '2px'
                  }}>
                    {note.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default PlayerNoteSelector;