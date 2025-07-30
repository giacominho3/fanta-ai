import { useState, useCallback } from 'react';

export const useNotifications = () => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = useCallback((type, message, duration = 5000) => {
    const notification = { 
      id: Date.now(), 
      type, 
      message, 
      timestamp: new Date().toLocaleTimeString() 
    };
    
    setNotifications(prev => [notification, ...prev.slice(0, 2)]);
    
    if (duration > 0) {
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== notification.id));
      }, duration);
    }
  }, []);

  const removeNotification = useCallback((id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  return {
    notifications,
    addNotification,
    removeNotification,
    clearAll
  };
};