import React, { useState, useEffect } from 'react';
import { Flame, ArrowRight, BookOpen, CheckCircle2, Sparkles } from 'lucide-react';

const FEATURED_SLIDES = [
  {
    id: 'bloxfruits',
    tabLabel: 'Blox Fruits',
    category: 'Blox Fruits',
    badge: '⚡ ពេញនិយមបំផុត • ស្វ័យប្រវត្តិ ២៤/៧',
    title: 'Account Blox Fruits Max 2550',
    highlight: 'Kitsune Mythical + Godhuman + Cursed Dual Katana',
    description: 'មិនបាច់ចុះឈ្មោះ ស្កេនបាគង KHQR គ្រប់ធនាគារ ទទួលបានឈ្មោះគណនី និងលេខសម្ងាត់សម្រាប់ Login ចូលលេងភ្លាមៗក្នុង ៥ វិនាទី!',
    image: '/images/bloxfruits.jpg'
  },
  {
    id: 'avatar',
    tabLabel: 'VIP Avatar',
    category: 'ឈុត VIP Avatar',
    badge: '👑 កម្ររកបាន • 50,000+ Robux',
    title: 'Account Roblox VIP Robux',
    highlight: 'Dominus + Golden Valkyrie + Korblox Deathspeaker',
    description: 'ឈុតកម្រតម្លៃរាប់ពាន់ដុល្លារ គណនីស្អាត Clean 100% គ្មានភ្ជាប់ Email អាចដាក់ Email ផ្ទាល់ខ្លួនបានភ្លាមៗ!',
    image: '/images/avatar_rich.jpg'
  },
  {
    id: 'petsim',
    tabLabel: 'Pet Sim 99',
    category: 'Pet Sim 99',
    badge: '💎 OP Titanic • 8.4B Gems',
    title: 'Pet Simulator 99 Huge Titanic',
    highlight: 'Huge Titanic Rainbow Dragon + Rainbow Plaza VIP',
    description: 'គណនី Pet Simulator 99 កំពូលកម្រ ស្កេនទូទាត់តាមបាគង KHQR ទទួលគណនីភ្លាមៗ ធានាសុវត្ថិភាពខ្ពស់!',
    image: '/images/petsim.jpg'
  },
  {
    id: 'bladeball',
    tabLabel: 'Blade Ball',
    category: 'Blade Ball',
    badge: '⚔️ Top Rank • Grand Champion',
    title: 'Blade Ball Arena Mythic',
    highlight: 'Chromatic Void Blade Mythic + VIP Explosion Effect',
    description: 'គណនី Rank ខ្ពស់ដាវកម្រ Chromatic Void ស្កេនទូទាត់ភ្លាម ទទួលបាន Username & Password លើអេក្រង់ភ្លាមៗ!',
    image: '/images/bladeball.jpg'
  }
];

export const HeroBanner = ({ onNavigateHowToBuy, onSelectCategory }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-cycle through featured games every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % FEATURED_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const currentSlide = FEATURED_SLIDES[activeIndex];

  const handleCtaClick = () => {
    if (onSelectCategory && currentSlide.category) {
      onSelectCategory(currentSlide.category);
    }
    const el = document.getElementById('product-catalog-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 400, behavior: 'smooth' });
    }
  };

  return (
    <div className="cinematic-hero">
      {/* Background Cinematic Gaming Image */}
      <img
        key={currentSlide.image}
        src={currentSlide.image}
        alt={currentSlide.title}
        className="cinematic-hero-bg"
      />

      {/* Dark Vignette Gradient Overlay */}
      <div className="cinematic-hero-overlay" />

      {/* Hero Content (Left-Aligned Minimal & Bold) */}
      <div className="cinematic-hero-content">
        {/* Top Glow Badge */}
        <div className="cinematic-hero-badge">
          <Sparkles size={14} color="#38bdf8" />
          <span>{currentSlide.badge}</span>
        </div>

        {/* Clean Headline */}
        <h1 className="cinematic-hero-title">
          {currentSlide.title} <br />
          <span className="hero-gradient-text">
            ស្កេនបាគង KHQR ភ្លាមៗ
          </span>
        </h1>

        {/* 1-Sentence Punchy Description */}
        <p className="cinematic-hero-desc">
          {currentSlide.description}
        </p>

        {/* CTA Actions */}
        <div className="cinematic-hero-actions">
          <button
            onClick={handleCtaClick}
            className="btn btn-primary"
            style={{
              padding: '12px 26px',
              fontSize: '0.94rem',
              fontWeight: 800,
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 10px 25px rgba(99, 102, 241, 0.45)',
              cursor: 'pointer'
            }}
          >
            <Flame size={18} />
            <span>រកមើលគណនីឥឡូវនេះ</span>
            <ArrowRight size={16} />
          </button>

          {onNavigateHowToBuy && (
            <button
              onClick={onNavigateHowToBuy}
              className="btn btn-secondary"
              style={{
                padding: '12px 20px',
                fontSize: '0.94rem',
                fontWeight: 700,
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(15, 23, 42, 0.65)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(10px)',
                cursor: 'pointer'
              }}
            >
              <BookOpen size={18} color="var(--primary)" />
              <span>របៀបទិញ (How to Buy)</span>
            </button>
          )}
        </div>

        {/* Trust Badges Row */}
        <div className="cinematic-hero-trust">
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <CheckCircle2 size={15} color="#10b981" /> មិនបាច់ចុះឈ្មោះ
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <CheckCircle2 size={15} color="#10b981" /> ស្កេនបាគង KHQR
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <CheckCircle2 size={15} color="#10b981" /> Clean 100% គ្មាន 2FA
          </span>
        </div>
      </div>

      {/* Epic Games / Steam Style Selector Tabs (Bottom Right) */}
      <div className="cinematic-hero-tabs">
        {FEATURED_SLIDES.map((slide, idx) => (
          <button
            key={slide.id}
            onClick={() => setActiveIndex(idx)}
            className={`cinematic-tab-btn ${activeIndex === idx ? 'active' : ''}`}
          >
            {slide.tabLabel}
          </button>
        ))}
      </div>
    </div>
  );
};
