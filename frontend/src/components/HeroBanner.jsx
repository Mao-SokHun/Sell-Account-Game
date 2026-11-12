import React from 'react';
import { 
  Search, Flame, ArrowRight, BookOpen, ShieldCheck, 
  Zap, Trophy, Sparkles, TrendingUp, QrCode, CheckCircle2 
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
        {/* LEFT COLUMN: Modern Headline, Search, Tags & Trust Badges */}
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

          {/* Sleek Horizontal Trust Line (Never overlaps the character visual!) */}
          <div className="hero-trust-strip">
            <span className="hero-trust-item">
              <Zap size={14} color="#38bdf8" />
              <span>ប្រគល់ជូនក្នុង ៥ វិនាទី</span>
            </span>
            <span className="hero-trust-divider">•</span>
            <span className="hero-trust-item">
              <ShieldCheck size={14} color="#10b981" />
              <span>Clean 100% គ្មាន 2FA</span>
            </span>
            <span className="hero-trust-divider">•</span>
            <span className="hero-trust-item">
              <QrCode size={14} color="#f43f5e" />
              <span>Bakong KHQR គ្រប់ធនាគារ</span>
            </span>
          </div>
        </div>

        {/* RIGHT COLUMN: Majestic Cyber Warrior Artwork (100% Clear, No Clutter, No Giant Overlapping Boxes!) */}
        <div className="seamless-hero-right">
          <div className="seamless-character-stage">
            <img
              src="/images/hero_character.jpg"
              alt="Cyber Warrior Legendary Character"
              className="seamless-character-visual"
            />
            {/* Soft Ambient Vignette */}
            <div className="seamless-character-fade" />

            {/* Top Minimal Floating Badge (Discreet, in the corner) */}
            <div className="hero-corner-stat top-right">
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <TrendingUp size={13} color="#10b981" />
                <span style={{ fontSize: '0.74rem', color: '#94a3b8', fontWeight: 700 }}>In-Stock</span>
              </div>
              <div style={{ fontSize: '1.15rem', fontWeight: 900, color: '#ffffff', fontFamily: 'var(--font-gaming)' }}>
                120+ <span style={{ fontSize: '0.76rem', color: '#c4b5fd', fontWeight: 600 }}>Accounts</span>
              </div>
            </div>

            {/* Bottom Floating Gamers Strip */}
            <div className="hero-corner-stat bottom-left">
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span className="pulse-dot-green" />
                <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#ffffff' }}>1,480+ Gamers Online</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                <span className="hero-mini-avatar" style={{ background: '#ec4899' }}>🎮</span>
                <span className="hero-mini-avatar" style={{ background: '#8b5cf6' }}>⚔️</span>
                <span className="hero-mini-avatar" style={{ background: '#06b6d4' }}>⚡</span>
                <span style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 700, marginLeft: '3px' }}>+1.4k Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
