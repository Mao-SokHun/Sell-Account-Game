import React, { useState, useEffect } from 'react';
import { 
  Search, Flame, ArrowRight, BookOpen, ShieldCheck, 
  Zap, Trophy, Sparkles, TrendingUp, CheckCircle2 
} from 'lucide-react';

const TRENDING_TAGS = [
  { label: '#BloxFruits', query: 'Blox Fruits' },
  { label: '#VIPAvatar', query: 'VIP' },
  { label: '#PetSim99', query: 'Pet Sim 99' },
  { label: '#BladeBall', query: 'Blade Ball' },
  { label: '#Kitsune', query: 'Kitsune' },
  { label: '#CDK', query: 'CDK' }
];

const SHOWCASE_SLIDES = [
  {
    id: 'bloxfruits',
    title: 'Account Blox Fruits Kitsune Max',
    category: 'Blox Fruits',
    image: '/images/bloxfruits.jpg',
    glow: 'rgba(56, 189, 248, 0.45)',
    accent: '#38bdf8'
  },
  {
    id: 'avatar',
    title: 'Account Roblox VIP Rich Avatar',
    category: 'ឈុត VIP Avatar',
    image: '/images/avatar_rich.jpg',
    glow: 'rgba(251, 191, 36, 0.45)',
    accent: '#fbbf24'
  },
  {
    id: 'petsim',
    title: 'Pet Sim 99 Huge Titanic Dragon',
    category: 'Pet Sim 99',
    image: '/images/petsim.jpg',
    glow: 'rgba(192, 132, 252, 0.45)',
    accent: '#c084fc'
  },
  {
    id: 'bladeball',
    title: 'Blade Ball Chromatic Mythic',
    category: 'Blade Ball',
    image: '/images/bladeball.jpg',
    glow: 'rgba(244, 63, 94, 0.45)',
    accent: '#f43f5e'
  }
];

export const HeroBanner = ({
  searchQuery,
  setSearchQuery,
  onNavigateHowToBuy,
  onSelectCategory
}) => {
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % SHOWCASE_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const currentSlide = SHOWCASE_SLIDES[slideIndex];

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
      <div 
        className="seamless-hero-glow"
        style={{
          background: `radial-gradient(circle at 75% 35%, ${currentSlide.glow} 0%, rgba(139, 92, 246, 0.15) 40%, transparent 70%)`
        }}
      />

      <div className="seamless-hero-grid">
        {/* LEFT COLUMN: Open, roomier typography, Search Pill & Tags */}
        <div className="seamless-hero-left">
          {/* Eyebrow */}
          <div className="seamless-hero-eyebrow">
            <Sparkles size={15} color="#38bdf8" />
            <span>LEVEL UP YOUR ACCOUNT</span>
            <span className="pulse-dot-green" style={{ marginLeft: '4px' }} />
          </div>

          {/* Headline */}
          <h1 className="seamless-hero-title">
            DISCOVER THE NEXT <br />
            <span className="gradient-text">LEGENDARY ACCOUNT</span>
          </h1>

          {/* Subtitle */}
          <p className="seamless-hero-desc">
            ស្វែងរក និងជាវគណនី Roblox កំពូលៗ Blox Fruits, VIP Avatar, Pet Sim 99 ស្កេនទូទាត់តាម Bakong KHQR គ្រប់ធនាគារ ទទួលបានគណនី Login ភ្លាមៗ 100% គ្មាន 2FA។
          </p>

          {/* SEARCH PILL */}
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

          {/* Trending Tags */}
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

          {/* Action Buttons */}
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

        {/* RIGHT COLUMN: Cinematic Seamless Character Showcase */}
        <div className="seamless-hero-right">
          {/* Main Visual Showcase (Blends naturally into background with soft masks) */}
          <div className="seamless-character-wrap">
            <img
              key={currentSlide.id}
              src={currentSlide.image}
              alt={currentSlide.title}
              className="seamless-character-img"
            />
            {/* Cinematic Gradient Fade Overlays */}
            <div className="seamless-character-fade-bottom" />
            <div className="seamless-character-fade-left" />

            {/* Subtle Info Overlay at bottom */}
            <div className="seamless-character-card-info">
              <div>
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
                  fontSize: '0.74rem',
                  fontWeight: 800,
                  color: currentSlide.accent,
                  textTransform: 'uppercase',
                  marginBottom: '2px'
                }}>
                  <Sparkles size={12} /> {currentSlide.category}
                </span>
                <div style={{ fontSize: '1rem', fontWeight: 800, color: '#ffffff' }}>
                  {currentSlide.title}
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  if (onSelectCategory) onSelectCategory(currentSlide.category);
                  handleScrollToCatalog();
                }}
                className="btn-pixel-glass"
                style={{ padding: '6px 14px', fontSize: '0.78rem' }}
              >
                មើលគណនី
              </button>
            </div>
          </div>

          {/* Clean Top Stat Badge */}
          <div className="seamless-stat-pill top">
            <Zap size={15} color="#38bdf8" />
            <span>ប្រគល់គណនីស្វ័យប្រវត្តិក្នុ​ង <strong>&lt; 5s</strong> តាម Bakong KHQR</span>
          </div>

          {/* Clean Bottom Stat Badge */}
          <div className="seamless-stat-pill bottom">
            <ShieldCheck size={15} color="#10b981" />
            <span>Clean 100% • គ្មានជាប់ Email / លេខទូរស័ព្ទ</span>
          </div>
        </div>
      </div>
    </div>
  );
};
