import React from 'react';
import { ShieldCheck, Zap, Coins, Trophy, ArrowRight, CheckCircle2, Flame, Crown, Sparkles } from 'lucide-react';
import { formatUSD, formatKHR } from '../utils/currency';

export const ProductCard = ({ product, onSelectProduct }) => {
  const isAvailable = product.status === 'available';

  // Category specific accent color for border / badge
  const getCategoryTheme = (category) => {
    switch (category) {
      case 'Blox Fruits':
        return { color: '#38bdf8', bg: 'rgba(56, 189, 248, 0.15)', border: 'rgba(56, 189, 248, 0.5)' };
      case 'ឈុត VIP Avatar':
        return { color: '#fbbf24', bg: 'rgba(251, 191, 36, 0.15)', border: 'rgba(251, 191, 36, 0.5)' };
      case 'Pet Sim 99':
        return { color: '#a855f7', bg: 'rgba(168, 85, 247, 0.15)', border: 'rgba(168, 85, 247, 0.5)' };
      case 'Blade Ball':
        return { color: '#f43f5e', bg: 'rgba(244, 63, 94, 0.15)', border: 'rgba(244, 63, 94, 0.5)' };
      default:
        return { color: '#6366f1', bg: 'rgba(99, 102, 241, 0.15)', border: 'rgba(99, 102, 241, 0.5)' };
    }
  };

  const theme = getCategoryTheme(product.category);

  return (
    <div 
      className="gaming-card"
      onClick={() => onSelectProduct(product)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onSelectProduct(product);
        }
      }}
    >
      {/* Thumbnail Container with Vignette & Spec Badges */}
      <div className="gaming-card-thumb">
        <img
          src={product.image}
          alt={product.title}
          onError={(e) => {
            e.target.src = '/images/bloxfruits.jpg';
          }}
        />

        {/* Dual Vignette Layers for contrast */}
        <div className="gaming-card-vignette" />

        {/* Top Header Strip (Category & Stock) */}
        <div style={{
          position: 'absolute',
          top: '12px',
          left: '12px',
          right: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '8px',
          zIndex: 3
        }}>
          {/* Category Badge */}
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            background: 'rgba(7, 10, 19, 0.88)',
            border: `1px solid ${theme.border}`,
            color: theme.color,
            fontSize: '0.78rem',
            fontWeight: 800,
            padding: '5px 12px',
            borderRadius: '10px',
            backdropFilter: 'blur(10px)',
            boxShadow: `0 4px 14px -2px ${theme.bg}`
          }}>
            {product.category === 'ឈុត VIP Avatar' && <Crown size={12} />}
            {product.category === 'Blox Fruits' && <Sparkles size={12} />}
            {product.category}
          </span>

          {/* Stock Badge with Pulsing Live Dot */}
          {isAvailable ? (
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: 'rgba(6, 78, 59, 0.85)',
              border: '1px solid rgba(16, 185, 129, 0.5)',
              color: '#6ee7b7',
              fontSize: '0.76rem',
              fontWeight: 800,
              padding: '5px 10px',
              borderRadius: '10px',
              backdropFilter: 'blur(10px)'
            }}>
              <span className="pulse-dot-green" />
              <span>មានស្តុក</span>
            </span>
          ) : (
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: 'rgba(127, 29, 29, 0.85)',
              border: '1px solid rgba(239, 68, 68, 0.5)',
              color: '#fca5a5',
              fontSize: '0.76rem',
              fontWeight: 800,
              padding: '5px 10px',
              borderRadius: '10px',
              backdropFilter: 'blur(10px)'
            }}>
              អស់ស្តុក
            </span>
          )}
        </div>

        {/* Bottom Specs Strip over Thumbnail */}
        <div style={{
          position: 'absolute',
          bottom: '10px',
          left: '12px',
          right: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          zIndex: 3
        }}>
          {/* Level Spec */}
          <span className="gaming-spec-pill">
            <Trophy size={13} color="#38bdf8" />
            <span>{product.level}</span>
          </span>

          {/* Robux Spec */}
          {product.robux > 0 && (
            <span className="gaming-spec-pill" style={{
              borderColor: 'rgba(251, 191, 36, 0.35)',
              color: '#fbbf24'
            }}>
              <Coins size={13} color="#fbbf24" />
              <span>{product.robux.toLocaleString()} R$</span>
            </span>
          )}
        </div>
      </div>

      {/* Content Area */}
      <div style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        {/* Special Tag / Rarity Tag if present */}
        {product.badge && (
          <div style={{ marginBottom: '8px' }}>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              fontSize: '0.72rem',
              fontWeight: 800,
              background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.2), rgba(217, 119, 6, 0.1))',
              border: '1px solid rgba(245, 158, 11, 0.4)',
              color: '#fbbf24',
              padding: '3px 9px',
              borderRadius: '6px'
            }}>
              <Flame size={12} color="#f59e0b" />
              {product.badge}
            </span>
          </div>
        )}

        {/* Title */}
        <h3 style={{
          fontSize: '0.96rem',
          fontWeight: 700,
          lineHeight: 1.55,
          color: '#ffffff',
          marginBottom: '10px',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          minHeight: '44px'
        }}>
          {product.title}
        </h3>

        {/* Security / Clean Account Guarantee Line */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '0.76rem',
          color: '#34d399',
          marginBottom: '14px',
          background: 'rgba(6, 78, 59, 0.2)',
          padding: '6px 10px',
          borderRadius: '8px',
          border: '1px solid rgba(16, 185, 129, 0.2)'
        }}>
          <ShieldCheck size={14} color="#10b981" />
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {product.emailStatus || 'គណនីស្អាត ១០០% មិនទាន់ភ្ជាប់ Email'}
          </span>
        </div>

        {/* Bottom Price & Gaming Action Button */}
        <div style={{
          marginTop: 'auto',
          paddingTop: '12px',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px'
        }}>
          <div>
            <div style={{
              fontSize: '1.24rem',
              fontWeight: 900,
              background: 'linear-gradient(135deg, #ffffff 0%, #38bdf8 60%, #818cf8 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              lineHeight: 1.2
            }}>
              {formatUSD(product.priceUsd)}
            </div>
            <div style={{
              fontSize: '0.74rem',
              color: '#94a3b8',
              fontWeight: 600,
              marginTop: '2px'
            }}>
              ~ {formatKHR(product.priceKhr || product.priceUsd * 4100)}
            </div>
          </div>

          <button 
            type="button"
            className={isAvailable ? 'btn-gaming-action' : 'btn btn-secondary'}
            style={{
              padding: '9px 15px',
              fontSize: '0.84rem',
              opacity: isAvailable ? 1 : 0.6
            }}
          >
            <span>{isAvailable ? 'ទិញភ្លាមៗ' : 'អស់ស្តុក'}</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
