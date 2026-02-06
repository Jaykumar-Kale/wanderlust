import React from 'react';

export default function UserAvatar({ user, size = '60px', className = '' }) {
  const sizeNumber = parseInt(size);
  
  if (!user) return null;

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        overflow: 'hidden',
        objectFit: 'cover',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f0f0f0'
      }}
      className={className}
    >
      <img
        src={
          user.profileImage ||
          `https://ui-avatars.com/api/?name=${encodeURIComponent(user.username)}&background=fe424d&color=fff&bold=true&size=${sizeNumber}`
        }
        alt={user.username}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover'
        }}
      />
    </div>
  );
}
