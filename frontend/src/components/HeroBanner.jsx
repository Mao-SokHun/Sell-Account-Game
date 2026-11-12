import React from 'react';
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

export const HeroBanner = ({
  searchQuery,
  setSearchQuery,
  onNavigateHowToBuy,
  onSelectCategory
}) => {
  const handleScrollToCatalog = () => {
    const el = document.getElementById('product-catalog-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 550, behavior: 'smooth' });
    }
  };

  const handleTagClick = (query) => {
    if (setSearchQuery) {
      setSearchQuery(query);
    }
    handleScrollToCatalog();
  };

  return (
    <div className="seamless-hero">
      {/* Background ambient lighting aura */}
      <div className="seamless-hero-glow" />

      <div className="seamless-hero-grid">
        {/* LEFT COLUMN: Modern Headline, Search & Trending */}
        <div className="seamless-hero-left">
          {/* Eyebrow badge */}
          <div className="seamless-hero-eyebrow">
            <Sparkles size={15} color="#38bdf8" />
            <span>LEVEL UP YOUR ACCOUNT</span>
            <span className="pulse-dot-green" style={{ marginLeft: '4px' }} />
          </div>

          {/* Clean, Powerful PixelVault Headline */}
          <h1 className="seamless-hero-title">
            DISCOVER THE NEXT <br />
            <span className="gradient-text">LEGENDARY ACCOUNT</span>
          </h1>

          {/* Subtitle */}
          <p className="seamless-hero-desc">
            ស្វែងរក និងជាវគណនី Roblox កំពូលៗ Blox Fruits, VIP Avatar, Pet Sim 99 ស្កេនទូទាត់តាម Bakong KHQR គ្រប់ធនាគារ ទទួលបានគណនី Login ភ្លាមៗ 100% គ្មាន 2FA។
          </p>

          {/* PIXELVAULT SEARCH PILL */}
          <div className="seamless-search-box">
            <div className="seamless-search-inner">
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
                className="btn-pixel-primary"
                style={{
                  padding: '8px 18px',
                  borderRadius: '9999px',
                  fontSize: '0.84rem'
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
              style={{ padding: '13px 28px', fontSize: '0.96rem' }}
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
                style={{ padding: '13px 24px', fontSize: '0.94rem' }}
              >
                <BookOpen size={17} color="#38bdf8" />
                <span>របៀបទិញ (How to Buy)</span>
              </button>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: PixelVault Cyber Warrior Artwork & Clean Floating Stat Cards */}
        <div className="seamless-hero-right">
          {/* Cyber Ninja Character Artwork (Seamlessly blending with ambient background) */}
          <div className="seamless-character-stage">
            <img
              src="/images/hero_character.jpg"
              alt="Cyber Warrior Legendary Character"
              className="seamless-character-visual"
            />
            {/* Soft Ambient Vignette / Edge Fades */}
            <div className="seamless-character-fade" />
          </div>

          {/* Clean Floating Stat Cards (Positioned naturally, NO clipped text, NO awkward borders!) */}
          <div className="seamless-stats-stack">
            {/* Stat Card 1: Total In-Stock */}
            <div className="seamless-stat-box">
              <div className="seamless-stat-box-header">
                <span className="seamless-stat-box-title">Total Accounts</span>
                <span className="seamless-stat-box-trend">
                  <TrendingUp size={12} /> +24 new
                </span>
              </div>
              <div className="seamless-stat-box-number">
                120+ <span className="seamless-stat-box-unit">In-Stock</span>
              </div>
            </div>

            {/* Stat Card 2: Active Gamers */}
            <div className="seamless-stat-box">
              <div className="seamless-stat-box-header">
                <span className="pulse-dot-green" />
                <span className="seamless-stat-box-title">Active Gamers</span>
              </div>
              <div className="seamless-stat-box-number">
                1,480+ <span className="seamless-stat-box-unit">Online</span>
              </div>
              <div className="seamless-avatars-row">
                <span className="seamless-avatar" style={{ background: '#ec4899' }}>🎮</span>
                <span className="seamless-avatar" style={{ background: '#8b5cf6' }}>⚔️</span>
                <span className="seamless-avatar" style={{ background: '#06b6d4' }}>⚡</span>
                <span className="seamless-avatar-count">+1.4k</span>
              </div>
            </div>

            {/* Stat Card 3: Instant Delivery & Safe Clean */}
            <div className="seamless-stat-box">
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#38bdf8', fontSize: '0.8rem', fontWeight: 800, marginBottom: '2px' }}>
                <Zap size={14} color="#38bdf8" />
                <span>Instant Delivery &lt; 5s</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#34d399', fontSize: '0.74rem', fontWeight: 600 }}>
                <ShieldCheck size={13} color="#10b981" />
                <span>Clean 100% • គ្មាន 2FA • Bakong KHQR</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
