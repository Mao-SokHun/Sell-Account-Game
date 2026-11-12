import React, { useState, useEffect } from 'react';
import { 
  Flame, ArrowRight, BookOpen, CheckCircle2, 
  Zap, ShieldCheck, QrCode, Headphones, Sparkles, Crown, Swords 
} from 'lucide-react';

const FEATURED_SLIDES = [
  {
    id: 'bloxfruits',
    tabLabel: 'Blox Fruits',
    category: 'Blox Fruits',
    badge: '⚡ HOT GAMING DEAL • ស្វ័យប្រវត្តិ ២៤/៧',
    title: 'Account Blox Fruits កម្រិត Max 2550',
    highlight: 'Kitsune Mythical + Godhuman + Cursed Dual Katana',
    description: 'មិនបាច់ចុះឈ្មោះ ស្កេនបាគង KHQR គ្រប់ធនាគារ ទទួលបានឈ្មោះគណនី និងលេខសម្ងាត់សម្រាប់ Login ចូលលេងភ្លាមៗក្នុង ៥ វិនាទី!',
    image: '/images/bloxfruits.jpg',
    glowColor: 'rgba(6, 182, 212, 0.45)'
  },
  {
    id: 'avatar',
    tabLabel: 'VIP Avatar',
    category: 'ឈុត VIP Avatar',
    badge: '👑 ULTRA RARE • 50,000+ ROBUX',
    title: 'Account Roblox VIP Rich Avatar',
    highlight: 'Dominus + Golden Valkyrie + Korblox Deathspeaker',
    description: 'ឈុតកម្រតម្លៃរាប់ពាន់ដុល្លារ គណនីស្អាត Clean 100% គ្មានជាប់ Email អាចដាក់ Email ផ្ទាល់ខ្លួនបានភ្លាមៗ!',
    image: '/images/avatar_rich.jpg',
    glowColor: 'rgba(245, 158, 11, 0.45)'
  },
  {
    id: 'petsim',
    tabLabel: 'Pet Sim 99',
    category: 'Pet Sim 99',
    badge: '💎 TITANIC OP • 8.4B GEMS',
    title: 'Pet Simulator 99 Huge Titanic',
    highlight: 'Huge Titanic Rainbow Dragon + Rainbow Plaza VIP',
    description: 'គណនី Pet Simulator 99 កំពូលកម្រ ស្កេនទូទាត់តាមបាគង KHQR ទទួលគណនីភ្លាមៗ ធានាសុវត្ថិភាពខ្ពស់!',
    image: '/images/petsim.jpg',
    glowColor: 'rgba(168, 85, 247, 0.45)'
  },
  {
    id: 'bladeball',
    tabLabel: 'Blade Ball',
    category: 'Blade Ball',
    badge: '⚔️ TOP RANK • GRAND CHAMPION',
    title: 'Blade Ball Arena Mythic',
    highlight: 'Chromatic Void Blade Mythic + VIP Explosion Effect',
    description: 'គណនី Rank ខ្ពស់ដាវកម្រ Chromatic Void ស្កេនទូទាត់ភ្លាម ទទួលបាន Username & Password លើអេក្រង់ភ្លាមៗ!',
    image: '/images/bladeball.jpg',
    glowColor: 'rgba(244, 63, 94, 0.45)'
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
  }, [activeIndex]);

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
    <div style={{ marginBottom: '36px' }}>
      {/* Cinematic Gaming Hero Banner */}
      <div 
        className="cinematic-hero"
        style={{
          boxShadow: `0 25px 60px -15px rgba(0, 0, 0, 0.9), 0 0 50px -10px ${currentSlide.glowColor}`,
          transition: 'box-shadow 1s ease'
        }}
      >
        {/* Background Cinematic Gaming Images with Crossfade */}
        {FEATURED_SLIDES.map((slide, idx) => (
          <div
            key={slide.id}
            className={`cinematic-hero-bg-layer ${activeIndex === idx ? 'active' : ''}`}
            aria-hidden={activeIndex !== idx}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="cinematic-hero-bg-img"
            />
          </div>
        ))}

        {/* Dynamic Dark Cyber Vignette Overlay */}
        <div className="cinematic-hero-overlay" />

        {/* Hero Content */}
        <div className="cinematic-hero-content">
          <div key={activeIndex} className="hero-text-anim">
            {/* Glowing Category Badge */}
            <div style={{ marginBottom: '14px' }}>
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                borderRadius: '12px',
                background: 'rgba(10, 14, 26, 0.85)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.5)',
                fontSize: '0.8rem',
                fontWeight: 800,
                color: '#ffffff',
                backdropFilter: 'blur(10px)'
              }}>
                <span className="pulse-dot-green" />
                <span>{currentSlide.badge}</span>
              </span>
            </div>

            {/* Clean Headline with High Contrast Gaming Glow */}
            <h1 className="cinematic-hero-title">
              {currentSlide.title} <br />
              <span style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #38bdf8 50%, #818cf8 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'inline-block'
              }}>
                ស្កេនបាគង KHQR ភ្លាមទទួលបាន Account ភ្លាមៗ
              </span>
            </h1>

            {/* Description */}
            <p className="cinematic-hero-desc">
              {currentSlide.description}
            </p>
          </div>

          {/* CTA Actions */}
          <div className="cinematic-hero-actions">
            <button
              onClick={handleCtaClick}
              className="btn-gaming-action"
              style={{
                padding: '13px 28px',
                fontSize: '0.96rem',
                borderRadius: '14px',
                boxShadow: '0 10px 30px rgba(99, 102, 241, 0.5)'
              }}
            >
              <Flame size={18} />
              <span>ទិញគណនីហ្គេមឥឡូវនេះ</span>
              <ArrowRight size={16} />
            </button>

            {onNavigateHowToBuy && (
              <button
                onClick={onNavigateHowToBuy}
                className="btn btn-secondary"
                style={{
                  padding: '13px 22px',
                  fontSize: '0.92rem',
                  fontWeight: 700,
                  borderRadius: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'rgba(15, 23, 42, 0.75)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  backdropFilter: 'blur(12px)',
                  cursor: 'pointer'
                }}
              >
                <BookOpen size={18} color="#38bdf8" />
                <span>របៀបទិញ (How to Buy)</span>
              </button>
            )}
          </div>

          {/* Trust Badges */}
          <div className="cinematic-hero-trust">
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#cbd5e1' }}>
              <CheckCircle2 size={16} color="#10b981" /> មិនបាច់ចុះឈ្មោះ
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#cbd5e1' }}>
              <CheckCircle2 size={16} color="#10b981" /> ស្កេនបាគង KHQR គ្រប់ធនាគារ
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#cbd5e1' }}>
              <CheckCircle2 size={16} color="#10b981" /> Clean 100% គ្មាន 2FA
            </span>
          </div>
        </div>

        {/* Game Selector Tabs (Bottom Right of Banner) */}
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

      {/* 4-Pillar Gaming Platform Assurance Strip */}
      <div className="gaming-trust-strip">
        {/* Card 1 */}
        <div className="gaming-trust-card">
          <div className="gaming-trust-icon-box" style={{ background: 'rgba(99, 102, 241, 0.2)', border: '1px solid rgba(99, 102, 241, 0.4)' }}>
            <Zap size={22} color="#818cf8" />
          </div>
          <div>
            <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#ffffff', marginBottom: '2px' }}>
              ប្រគល់ជូនក្នុង ៥ វិនាទី
            </div>
            <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
              បង្ហាញ Username & Password លើអេក្រង់ភ្លាមៗ
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="gaming-trust-card">
          <div className="gaming-trust-icon-box" style={{ background: 'rgba(16, 185, 129, 0.2)', border: '1px solid rgba(16, 185, 129, 0.4)' }}>
            <ShieldCheck size={22} color="#34d399" />
          </div>
          <div>
            <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#ffffff', marginBottom: '2px' }}>
              គណនីស្អាត ១០០%
            </div>
            <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
              គ្មានជាប់ Email ឬលេខទូរស័ព្ទ (Unverified)
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="gaming-trust-card">
          <div className="gaming-trust-icon-box" style={{ background: 'rgba(211, 32, 39, 0.2)', border: '1px solid rgba(211, 32, 39, 0.4)' }}>
            <QrCode size={22} color="#f87171" />
          </div>
          <div>
            <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#ffffff', marginBottom: '2px' }}>
              បាគង KHQR គ្រប់ធនាគារ
            </div>
            <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
              ABA, ACLEDA, Wing, Canadia គ្មានកម្រៃសេវា
            </div>
          </div>
        </div>

        {/* Card 4 */}
        <div className="gaming-trust-card">
          <div className="gaming-trust-icon-box" style={{ background: 'rgba(6, 182, 212, 0.2)', border: '1px solid rgba(6, 182, 212, 0.4)' }}>
            <Headphones size={22} color="#38bdf8" />
          </div>
          <div>
            <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#ffffff', marginBottom: '2px' }}>
              សេវាបម្រើ ២៤/៧
            </div>
            <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
              Telegram Support រហ័ស និងការធានាពេញលេញ
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
