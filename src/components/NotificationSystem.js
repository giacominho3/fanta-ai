import React from 'react';
import { CheckCircle, AlertTriangle, X, Info } from 'lucide-react';
import { theme } from '../theme/theme';

const NotificationSystem = ({ notifications, removeNotification }) => {
  const getNotificationConfig = (type) => {
    const configs = {
      success: {
        background: theme.colors.primary[500],
        color: 'white',
        icon: CheckCircle
      },
      error: {
        background: theme.colors.accent.red,
        color: 'white',
        icon: AlertTriangle
      },
      warning: {
        background: theme.colors.accent.yellow,
        color: 'black',
        icon: AlertTriangle
      },
      info: {
        background: theme.colors.accent.blue,
        color: 'white',
        icon: Info
      }
    };
    return configs[type] || configs.info;
  };

  if (notifications.length === 0) return null;

  return (
    <div style={{
      position: 'fixed',
      top: theme.spacing[4],
      right: theme.spacing[4],
      zIndex: 1000,
      display: 'flex',
      flexDirection: 'column',
      gap: theme.spacing[2]
    }}>
      {notifications.map(notification => {
        const config = getNotificationConfig(notification.type);
        const Icon = config.icon;

        return (
          <div
            key={notification.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: theme.spacing[3],
              padding: `${theme.spacing[3]} ${theme.spacing[4]}`,
              borderRadius: theme.borderRadius.lg,
              background: config.background,
              color: config.color,
              boxShadow: theme.shadows.lg,
              minWidth: '300px',
              maxWidth: '400px',
              animation: 'slideIn 0.3s ease-out',
              cursor: 'pointer'
            }}
            onClick={() => removeNotification(notification.id)}
          >
            <Icon size={20} />
            <div style={{ flex: 1 }}>
              <div style={{ 
                fontWeight: theme.typography.fontWeight.medium,
                fontSize: theme.typography.fontSize.sm
              }}>
                {notification.message}
              </div>
              <div style={{ 
                fontSize: theme.typography.fontSize.xs,
                opacity: 0.8,
                marginTop: theme.spacing[1]
              }}>
                {notification.timestamp}
              </div>
            </div>
            <X 
              size={16} 
              style={{ 
                cursor: 'pointer',
                opacity: 0.7,
                transition: theme.transitions.fast
              }}
            />
          </div>
        );
      })}
      
      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default NotificationSystem;