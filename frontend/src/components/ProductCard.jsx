import React from 'react';
import { ShieldCheck, ArrowRight, Trophy, Coins, Star, Sparkles, Crown } from 'lucide-react';
import { formatUSD, formatKHR } from '../utils/currency';

export const ProductCard = ({ product, onSelectProduct }) => {
  const isAvailable = product.status === 'available';

  // Category specific accent color for border / badge
  const getCategoryTheme = (category) => {
    switch (category) {
      case 'Blox Fruits':
        return { color: '#38bdf8', bg: 'rgba(56, 189, 248, 0.12)', border: 'rgba(56, 189, 248, 0.4)' };
      case 'ឈុត VIP Avatar':
        return { color: '#fbbf24', bg: 'rgba(251, 191, 36, 0.12)', border: 'rgba(251, 191, 36, 0.4)' };
      case 'Pet Sim 99':
        return { color: '#c084fc', bg: 'rgba(192, 132, 252, 0.12)', border: 'rgba(192, 132, 252, 0.4)' };
      case 'Blade Ball':
        return { color: '#f43f5e', bg: 'rgba(244, 63, 94, 0.12)', border: 'rgba(244, 63, 94, 0.4)' };
      default:
        return { color: '#8b5cf6', bg: 'rgba(139, 92, 246, 0.12)', border: 'rgba(139, 92, 246, 0.4)' };
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
      {/* Tall Gaming Poster Thumbnail */}
      <div className="pixel-card-thumb">
        <img
          src={product.image}
          alt={product.title}
          onError={(e) => {
            e.target.src = '/images/bloxfruits.jpg';
          }}
        />

        {/* Cinematic Vignette Overlay */}
        <div className="pixel-card-vignette" />

        {/* Top Header Strip: Category & Star Rating */}
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
          {/* Category Badge (Sleek sharp 6px radius) */}
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            background: 'rgba(8, 6, 16, 0.85)',
            border: `1px solid ${theme.border}`,
            color: theme.color,
            fontSize: '0.74rem',
            fontWeight: 700,
            padding: '3px 9px',
            borderRadius: '6px',
            backdropFilter: 'blur(8px)',
            letterSpacing: '0.2px'
          }}>
            {product.category === 'ឈុត VIP Avatar' && <Crown size={12} />}
            {product.category === 'Blox Fruits' && <Sparkles size={12} />}
            {product.category}
          </span>

          {/* Rating Badge (Sleek gold badge) */}
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            background: 'rgba(8, 6, 16, 0.85)',
            border: '1px solid rgba(251, 191, 36, 0.35)',
            color: '#fbbf24',
            fontSize: '0.74rem',
            fontWeight: 800,
            padding: '3px 8px',
            borderRadius: '6px',
            backdropFilter: 'blur(8px)'
          }}>
            <Star size={11} fill="#fbbf24" color="#fbbf24" />
            <span>5.0</span>
          </span>
        </div>

        {/* Bottom Overlay Specs on Thumbnail */}
        <div style={{
          position: 'absolute',
          bottom: '10px',
          left: '12px',
          right: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '8px',
          zIndex: 3
        }}>
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            background: 'rgba(8, 6, 16, 0.85)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            padding: '3px 8px',
            borderRadius: '6px',
            fontSize: '0.72rem',
            fontWeight: 700,
            color: '#ffffff',
            backdropFilter: 'blur(8px)'
          }}>
            <Trophy size={11} color="#38bdf8" />
            <span>{product.level}</span>
          </span>

          {product.robux > 0 && (
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              background: 'rgba(8, 6, 16, 0.85)',
              border: '1px solid rgba(251, 191, 36, 0.35)',
              padding: '3px 8px',
              borderRadius: '6px',
              fontSize: '0.72rem',
              fontWeight: 700,
              color: '#fbbf24',
              backdropFilter: 'blur(8px)'
            }}>
              <Coins size={11} color="#fbbf24" />
              <span>{product.robux.toLocaleString()} R$</span>
            </span>
          )}
        </div>
      </div>

      {/* Card Body */}
      <div className="pixel-card-body">
        {/* Title */}
        <h3 className="pixel-card-title">
          {product.title}
        </h3>

        {/* Security / Clean Account Guarantee Micro-Tag */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '0.74rem',
          color: '#34d399',
          marginBottom: '12px',
          background: 'rgba(16, 185, 129, 0.08)',
          padding: '5px 9px',
          borderRadius: '6px',
          border: '1px solid rgba(16, 185, 129, 0.2)'
        }}>
          <ShieldCheck size={13} color="#10b981" />
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {product.emailStatus || 'គណនីស្អាត ១០០% មិនទាន់ភ្ជាប់ Email'}
          </span>
        </div>

        {/* Bottom Price & High-Tech Cyber Action Button */}
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
              fontSize: '1.25rem',
              fontWeight: 900,
              color: '#ffffff',
              lineHeight: 1.15,
              fontFamily: 'var(--font-gaming)'
            }}>
              {formatUSD(product.priceUsd)}
            </div>
            <div style={{
              fontSize: '0.72rem',
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
