import React from 'react';
import { theme } from '../../theme/theme';
import { ROLE_COLORS } from '../../constants/roles';

const getRoleColor = (roleKey) => {
  return ROLE_COLORS[roleKey] || theme.colors.gray[500];
};

const RoleBadge = ({ role }) => {
  const roleColor = getRoleColor(role);
  
  return (
    <div style={{
      background: roleColor,
      color: 'white',
      borderRadius: theme.borderRadius.full,
      padding: `${theme.spacing[1]} ${theme.spacing[1]}`,
      fontSize: theme.typography.fontSize.xs,
      fontWeight: theme.typography.fontWeight.bold,
      minWidth: '28px',
      width: '28px',
      textAlign: 'center',
      boxShadow: `0 2px 4px ${roleColor}40`,
      flexShrink: 0
    }}>
      {role}
    </div>
  );
};

const RoleBadges = ({ roles = [] }) => {
  if (!roles || roles.length === 0) return null;
  
  return (
    <div style={{
      display: 'flex',
      gap: theme.spacing[1],
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'center',
      maxWidth: '100px'
    }}>
      {roles.map((role, index) => (
        <RoleBadge key={`${role}-${index}`} role={role} />
      ))}
    </div>
  );
};

export { RoleBadges as default, RoleBadge };