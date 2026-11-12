import React from 'react';
import { ShieldCheck, ArrowRight, Trophy, Coins, Star, Sparkles, Crown } from 'lucide-react';
import { formatUSD, formatKHR } from '../utils/currency';

export const ProductCard = ({ product, onSelectProduct }) => {
  const isAvailable = product.status === 'available';

  // Category specific accent color for border / badge
  const getCategoryTheme = (category) => {
    switch (category) {
      case 'Blox Fruits':
        return { color: '#38bdf8', bg: 'rgba(56, 189, 248, 0.15)', border: 'rgba(56, 189, 248, 0.4)' };
      case 'ឈុត VIP Avatar':
        return { color: '#fbbf24', bg: 'rgba(251, 191, 36, 0.15)', border: 'rgba(251, 191, 36, 0.4)' };
      case 'Pet Sim 99':
        return { color: '#c084fc', bg: 'rgba(192, 132, 252, 0.15)', border: 'rgba(192, 132, 252, 0.4)' };
      case 'Blade Ball':
        return { color: '#f43f5e', bg: 'rgba(244, 63, 94, 0.15)', border: 'rgba(244, 63, 94, 0.4)' };
      default:
        return { color: '#8b5cf6', bg: 'rgba(139, 92, 246, 0.15)', border: 'rgba(139, 92, 246, 0.4)' };
    }
  };

  const theme = getCategoryTheme(product.category);

  return (
    <div 
      className="pixel-card"
      onClick={() => onSelectProduct(product)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onSelectProduct(product);
        }
      }}
    >
      {/* Thumbnail Container */}
      <div className="pixel-card-thumb">
        <img
          src={product.image}
          alt={product.title}
          onError={(e) => {
            e.target.src = '/images/bloxfruits.jpg';
          }}
        />

        {/* Dual Vignette Layers for high contrast */}
        <div className="pixel-card-vignette" />

        {/* Top Header Strip: Category & Stock status */}
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
            background: 'rgba(10, 8, 20, 0.85)',
            border: `1px solid ${theme.border}`,
            color: theme.color,
            fontSize: '0.76rem',
            fontWeight: 700,
            padding: '4px 10px',
            borderRadius: '8px',
            backdropFilter: 'blur(10px)'
          }}>
            {product.category === 'ឈុត VIP Avatar' && <Crown size={12} />}
            {product.category === 'Blox Fruits' && <Sparkles size={12} />}
            {product.category}
          </span>

          {/* Rating Badge (PixelVault signature: ★ 5.0) */}
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            background: 'rgba(10, 8, 20, 0.85)',
            border: '1px solid rgba(251, 191, 36, 0.3)',
            color: '#fbbf24',
            fontSize: '0.76rem',
            fontWeight: 800,
            padding: '4px 8px',
            borderRadius: '8px',
            backdropFilter: 'blur(10px)'
          }}>
            <Star size={11} fill="#fbbf24" color="#fbbf24" />
            <span>5.0</span>
          </span>
        </div>

        {/* Bottom specs overlay on thumb */}
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
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            background: 'rgba(10, 8, 20, 0.85)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            padding: '4px 9px',
            borderRadius: '8px',
            fontSize: '0.74rem',
            fontWeight: 700,
            color: '#ffffff',
            backdropFilter: 'blur(8px)'
          }}>
            <Trophy size={12} color="#38bdf8" />
            <span>{product.level}</span>
          </span>

          {product.robux > 0 && (
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              background: 'rgba(10, 8, 20, 0.85)',
              border: '1px solid rgba(251, 191, 36, 0.3)',
              padding: '4px 9px',
              borderRadius: '8px',
              fontSize: '0.74rem',
              fontWeight: 700,
              color: '#fbbf24',
              backdropFilter: 'blur(8px)'
            }}>
              <Coins size={12} color="#fbbf24" />
              <span>{product.robux.toLocaleString()} R$</span>
            </span>
          )}
        </div>
      </div>

      {/* Card Content */}
      <div className="pixel-card-body">
        {/* Title */}
        <h3 className="pixel-card-title">
          {product.title}
        </h3>

        {/* Security / Clean Account Guarantee Line */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '0.75rem',
          color: '#34d399',
          marginBottom: '14px',
          background: 'rgba(16, 185, 129, 0.1)',
          padding: '6px 10px',
          borderRadius: '8px',
          border: '1px solid rgba(16, 185, 129, 0.2)'
        }}>
          <ShieldCheck size={14} color="#10b981" />
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {product.emailStatus || 'គណនីស្អាត ១០០% មិនទាន់ភ្ជាប់ Email'}
          </span>
        </div>

        {/* Bottom Price & PixelVault Action Button */}
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
              fontSize: '1.28rem',
              fontWeight: 900,
              color: '#ffffff',
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
            className={isAvailable ? 'pixel-btn-buy' : 'btn btn-secondary'}
            style={{
              padding: '9px 16px',
              fontSize: '0.84rem',
              opacity: isAvailable ? 1 : 0.6
            }}
          >
            <span>{isAvailable ? 'ទិញឥឡូវ' : 'អស់ស្តុក'}</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
