import React, { useState, useEffect } from 'react';
import { 
  Search, Flame, ArrowRight, BookOpen, ShieldCheck, 
  Zap, Trophy, Sparkles, TrendingUp, Users 
} from 'lucide-react';

const TRENDING_TAGS = [
  { label: '#BloxFruits', query: 'Blox Fruits' },
  { label: '#VIPAvatar', query: 'VIP' },
  { label: '#PetSim99', query: 'Pet Sim 99' },
  { label: '#BladeBall', query: 'Blade Ball' },
  { label: '#Kitsune', query: 'Kitsune' },
  { label: '#CDK', query: 'CDK' }
];

const FEATURED_HERO_SLIDES = [
  {
    id: 'bloxfruits',
    title: 'Blox Fruits Kitsune Max',
    category: 'Blox Fruits',
    image: '/images/bloxfruits.jpg',
    glow: 'rgba(56, 189, 248, 0.4)'
  },
  {
    id: 'avatar',
    title: 'Roblox VIP Rich Avatar',
    category: 'ឈុត VIP Avatar',
    image: '/images/avatar_rich.jpg',
    glow: 'rgba(251, 191, 36, 0.4)'
  },
  {
    id: 'petsim',
    title: 'Pet Sim 99 Huge Titanic',
    category: 'Pet Sim 99',
    image: '/images/petsim.jpg',
    glow: 'rgba(168, 85, 247, 0.4)'
  },
  {
    id: 'bladeball',
    title: 'Blade Ball Arena Mythic',
    category: 'Blade Ball',
    image: '/images/bladeball.jpg',
    glow: 'rgba(244, 63, 94, 0.4)'
  }
];

export const HeroBanner = ({
  searchQuery,
  setSearchQuery,
  onNavigateHowToBuy,
  onSelectCategory
}) => {
  const [slideIndex, setSlideIndex] = useState(0);

  // Cycle through featured character visual every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % FEATURED_HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const currentSlide = FEATURED_HERO_SLIDES[slideIndex];

  const handleScrollToCatalog = () => {
    const el = document.getElementById('product-catalog-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 500, behavior: 'smooth' });
    }
  };

  const handleTagClick = (query) => {
    if (setSearchQuery) {
      setSearchQuery(query);
    }
    handleScrollToCatalog();
  };

  return (
    <div className="pixel-hero">
      {/* LEFT COLUMN: Modern Headline, Search & Trending */}
      <div>
        {/* Eyebrow badge */}
        <div className="pixel-hero-eyebrow">
          <Sparkles size={16} color="#38bdf8" />
          <span>LEVEL UP YOUR ACCOUNT</span>
        </div>

        {/* Clean, Impactful PixelVault Title */}
        <h1 className="pixel-hero-title">
          DISCOVER THE NEXT <br />
          <span className="gradient-text">LEGENDARY ACCOUNT</span>
        </h1>

        {/* Subtitle in clean Khmer */}
        <p className="pixel-hero-desc">
          ស្វែងរក និងជាវគណនីហ្គេមលំដាប់កំពូល Roblox, Blox Fruits, VIP Avatar ស្កេនទូទាត់តាម Bakong KHQR គ្រប់ធនាគារ ទទួលបានគណនី Login ភ្លាមៗ 100% គ្មាន 2FA។
        </p>

        {/* PIXELVAULT SEARCH PILL */}
        <div className="pixel-search-box">
          <div className="pixel-search-inner">
            <Search size={19} color="#94a3b8" />
            <input
              type="text"
              className="pixel-search-input"
              placeholder="ស្វែងរកគណនី (ឧទាហរណ៍៖ Blox Fruits, Kitsune, VIP Avatar...)"
              value={searchQuery || ''}
              onChange={(e) => setSearchQuery && setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleScrollToCatalog();
              }}
            />
            <button
              type="button"
              onClick={handleScrollToCatalog}
              style={{
                background: 'linear-gradient(135deg, #7c3aed 0%, #8b5cf6 100%)',
                border: 'none',
                color: '#fff',
                padding: '8px 16px',
                borderRadius: '9999px',
                fontSize: '0.84rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <span>ស្វែងរក</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>

        {/* Trending Tags Row */}
        <div className="pixel-trending-row">
          <span className="pixel-trending-label">Trending Now:</span>
          {TRENDING_TAGS.map((tag) => (
            <button
              key={tag.label}
              type="button"
              className="pixel-trending-tag"
              onClick={() => handleTagClick(tag.query)}
            >
              {tag.label}
            </button>
          ))}
        </div>

        {/* Action Button Pills */}
        <div className="pixel-hero-buttons">
          <button
            type="button"
            onClick={handleScrollToCatalog}
            className="btn-pixel-primary"
          >
            <Flame size={18} />
            <span>Explore Accounts</span>
            <ArrowRight size={16} />
          </button>

          {onNavigateHowToBuy && (
            <button
              type="button"
              onClick={onNavigateHowToBuy}
              className="btn-pixel-glass"
            >
              <BookOpen size={17} color="#38bdf8" />
              <span>របៀបទិញ (How to Buy)</span>
            </button>
          )}
        </div>
      </div>

      {/* RIGHT COLUMN: Gaming Artwork Showcase & Floating Stat Cards */}
      <div className="pixel-hero-visual">
        <div className="pixel-hero-character-card">
          <img
            src={currentSlide.image}
            alt={currentSlide.title}
          />
          <div className="pixel-hero-character-overlay" />
          
          {/* Bottom tag inside character card */}
          <div style={{
            position: 'absolute',
            bottom: '16px',
            left: '18px',
            right: '18px',
            zIndex: 3,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ fontSize: '0.78rem', color: '#38bdf8', fontWeight: 800, textTransform: 'uppercase' }}>
                Featured Account
              </div>
              <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#ffffff' }}>
                {currentSlide.title}
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                if (onSelectCategory) onSelectCategory(currentSlide.category);
                handleScrollToCatalog();
              }}
              style={{
                background: 'rgba(139, 92, 246, 0.3)',
                border: '1px solid rgba(139, 92, 246, 0.6)',
                color: '#fff',
                padding: '6px 14px',
                borderRadius: '10px',
                fontSize: '0.8rem',
                fontWeight: 700,
                cursor: 'pointer',
                backdropFilter: 'blur(8px)'
              }}
            >
              មើលគណនី
            </button>
          </div>
        </div>

        {/* Floating Stat Card 1: Top Right */}
        <div className="floating-stat-card" style={{ top: '-12px', right: '-12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
            <span style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: 700 }}>Total In-Stock</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', fontSize: '0.72rem', color: '#10b981', fontWeight: 800 }}>
              <TrendingUp size={12} /> +24 new
            </span>
          </div>
          <div style={{ fontSize: '1.35rem', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.3px' }}>
            120+ <span style={{ fontSize: '0.85rem', color: '#c4b5fd', fontWeight: 600 }}>Accounts</span>
          </div>
        </div>

        {/* Floating Stat Card 2: Bottom Left */}
        <div className="floating-stat-card" style={{ bottom: '-12px', left: '-14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span className="pulse-dot-green" />
            <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#ffffff' }}>1,480+ Gamers Active</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.74rem', color: '#34d399' }}>
            <ShieldCheck size={14} color="#10b981" />
            <span>ស្កេន KHQR ទទួលភ្លាម &lt; 5s</span>
          </div>
        </div>
      </div>
    </div>
  );
};
