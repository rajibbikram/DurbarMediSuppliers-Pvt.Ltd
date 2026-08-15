import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () => (
  <Link to="/" style={{ textDecoration: 'none' }}>
    <div style={{
      display: 'flex',
      alignItems: 'center',
      fontWeight: 700,
      fontSize: '1.75rem',
      color: 'var(--dark)'
    }}>
      <span style={{
        backgroundColor: 'var(--primary)',
        color: 'white',
        padding: '0.5rem',
        borderRadius: '8px',
        marginRight: '0.5rem',
        fontSize: '1.5rem',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '40px',
        height: '40px'
      }}>
        DM
      </span>
      <span>Durbar<span style={{ color: 'var(--primary)' }}>Medi</span></span>
    </div>
  </Link>
);

export default Logo;
