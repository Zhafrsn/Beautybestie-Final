import React from 'react';

interface avatarProps {
  src?: string;
  name?: string;
  size?: string;
  bordered?: boolean;
}

const avatar: React.FC<avatarProps> = ({
  src,
  size = '100px',
  name,
  bordered,
}) => {
  const avatarStyle: React.CSSProperties = {
    width: size,
    height: size,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'var(--primary-color)', 
    color: 'gray',
    border: bordered ? '1px solid #eca4b0' : 'none',
    borderRadius: '50%', 
    overflow: 'hidden', 
  };

  return (
    <div style={avatarStyle}>
      {src ? (
        <img src={src} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      ) : (
        <span style={{ fontSize: '30px', fontWeight: 'bold' }}>{name ? name[0].toUpperCase() : ''}</span>
      )}
    </div>
  );
};

export default avatar;
