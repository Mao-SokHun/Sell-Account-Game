import React from 'react';
import { ShieldCheck, Zap, Coins, Trophy, ArrowRight, CheckCircle2 } from 'lucide-react';
import { formatUSD, formatKHR } from '../utils/currency';

export const ProductCard = ({ product, onSelectProduct }) => {
  const isAvailable = product.status === 'available';

  return (
    <div 
      className="glass-panel"
      onClick={() => onSelectProduct(product)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        cursor: 'pointer',
        position: 'relative',
        border: '1px solid var(--border-color)',
        borderRadius: '18px'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-6px)';
        e.currentTarget.style.borderColor = 'var(--border-hover)';
        e.currentTarget.style.boxShadow = '0 16px 32px -10px rgba(99, 102, 241, 0.3)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.borderColor = 'var(--border-color)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Thumbnail Container */}
      <div style={{ position: 'relative', width: '100%', height: '190px', overflow: 'hidden' }}>
        <img
          src={product.image}
          alt={product.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.5s ease'
          }}
          onError={(e) => {
            // fallback if image fails to load
            e.target.src = '/images/bloxfruits.jpg';
          }}
        />

        {/* Overlay gradient */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(7, 9, 14, 0.95) 0%, rgba(7, 9, 14, 0.2) 60%, transparent 100%)'
        }} />

        {/* Top Header Strip (Single Row with space-between - NO OVERLAPPING) */}
        <div style={{
          position: 'absolute',
          top: '12px',
          left: '12px',
          right: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '8px',
          zIndex: 2
        }}>
          {/* Category on Left */}
          <span className="badge badge-primary" style={{ backdropFilter: 'blur(10px)', fontSize: '0.74rem' }}>
            {product.category}
          </span>

          {/* Stock on Right */}
          {isAvailable ? (
            <span className="badge badge-green" style={{ backdropFilter: 'blur(10px)', fontSize: '0.74rem' }}>
              <Zap size={11} /> មានស្តុក
            </span>
          ) : (
            <span className="badge badge-red" style={{ backdropFilter: 'blur(10px)', fontSize: '0.74rem' }}>
              អស់ស្តុក
            </span>
          )}
        </div>

        {/* Level & Robux Strip */}
        <div style={{
          position: 'absolute',
          bottom: '10px',
          left: '12px',
          right: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '0.82rem',
          color: '#ffffff',
          fontWeight: 600
        }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Trophy size={14} color="#38bdf8" /> {product.level}
          </span>
          {product.robux > 0 && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#fbbf24' }}>
              <Coins size={14} color="#fbbf24" /> {product.robux.toLocaleString()} Robux
            </span>
          )}
        </div>
      </div>

      {/* Content Area */}
      <div style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        {/* Promotional Badge & Item Tag Row */}
        {product.badge && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span className="badge badge-gold" style={{ fontSize: '0.74rem', padding: '2px 8px' }}>
              {product.badge}
            </span>
          </div>
        )}

        <h3 style={{
          fontSize: '0.98rem',
          fontWeight: 700,
          lineHeight: 1.5,
          color: '#ffffff',
          marginBottom: '10px',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          minHeight: '46px'
        }}>
          {product.title}
        </h3>

        {/* Security guarantee line */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '0.78rem',
          color: 'var(--accent-green)',
          marginBottom: '14px'
        }}>
          <CheckCircle2 size={13} />
          <span>{product.emailStatus || 'គណនីស្អាត 100% មិនជាប់ Email'}</span>
        </div>

        {/* Bottom Price & Button */}
        <div style={{
          marginTop: 'auto',
          paddingTop: '12px',
          borderTop: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{
              fontSize: '1.2rem',
              fontWeight: 800,
              color: '#38bdf8',
              lineHeight: 1.2
            }}>
              {formatUSD(product.priceUsd)}
            </div>
            <div style={{
              fontSize: '0.76rem',
              color: 'var(--text-dim)',
              fontWeight: 500
            }}>
              ~ {formatKHR(product.priceKhr || product.priceUsd * 4100)}
            </div>
          </div>

          <button 
            className={`btn ${isAvailable ? 'btn-primary' : 'btn-secondary'}`}
            style={{
              padding: '7px 12px',
              fontSize: '0.82rem',
              borderRadius: '10px',
              opacity: isAvailable ? 1 : 0.8
            }}
          >
            <span>{isAvailable ? 'ទិញភ្លាមៗ' : 'លក់ដាច់ហើយ'}</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
