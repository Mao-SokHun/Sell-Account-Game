import React from 'react';
import { 
  ShieldCheck, Zap, QrCode, UserCheck, Flame, 
  ArrowRight, BookOpen, CheckCircle2, Sparkles, ChevronRight, Crown
} from 'lucide-react';

const FEATURED_GAMES = [
  {
    id: 'bloxfruits',
    title: 'Blox Fruits',
    category: 'Blox Fruits',
    badge: 'VIP Max Level 2550',
    badgeColor: '#6366f1',
    highlight: 'Kitsune + Godhuman + CDK',
    image: '/images/bloxfruits.jpg',
    tag: 'ពេញនិយមបំផុត 🔥'
  },
  {
    id: 'avatar',
    title: 'ឈុត VIP Avatar',
    category: 'ឈុត VIP Avatar',
    badge: '50,000+ Robux',
    badgeColor: '#ec4899',
    highlight: 'Dominus + Golden Valkyrie',
    image: '/images/avatar_rich.jpg',
    tag: 'កម្ររកបាន 👑'
  },
  {
    id: 'petsim',
    title: 'Pet Simulator 99',
    category: 'Pet Sim 99',
    badge: 'Titanic Rainbow',
    badgeColor: '#10b981',
    highlight: '8.4B Gems + Huge Titanic',
    image: '/images/petsim.jpg',
    tag: 'OP Stats 💎'
  },
  {
    id: 'bladeball',
    title: 'Blade Ball',
    category: 'Blade Ball',
    badge: 'Grand Champion',
    badgeColor: '#f59e0b',
    highlight: 'Chromatic Void + VIP Effect',
    image: '/images/bladeball.jpg',
    tag: 'Top Rank ⚔️'
  }
];

export const HeroBanner = ({ onNavigateHowToBuy, onSelectCategory }) => {
  const handleScrollToProducts = () => {
    const el = document.getElementById('product-catalog-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 500, behavior: 'smooth' });
    }
  };

  const handleCardClick = (category) => {
    if (onSelectCategory) {
      onSelectCategory(category);
    } else {
      handleScrollToProducts();
    }
  };

  return (
    <div className="hero-banner-card">
      {/* Background Ambient Lighting */}
      <div style={{
        position: 'absolute',
        top: '-100px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '560px',
        height: '320px',
        borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(99, 102, 241, 0.35) 0%, rgba(6, 182, 212, 0.18) 50%, transparent 75%)',
        filter: 'blur(50px)',
        pointerEvents: 'none'
      }} />

      {/* Top Futuristic Eyebrow Pill */}
      <div className="hero-badge-pill">
        <span style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: '#38bdf8',
          boxShadow: '0 0 10px #38bdf8',
          display: 'inline-block'
        }} />
        <span style={{ fontSize: '0.84rem', fontWeight: 800, color: '#c7d2fe', letterSpacing: '0.2px' }}>
          ✨ ទីផ្សារលក់ ACCOUNT ROBLOX ស្វ័យប្រវត្តិកម្ពុជា
        </span>
      </div>

      {/* Monumental Centered Headline */}
      <h1 className="hero-main-title">
        ទិញ ACCOUNT ROBLOX ស្វ័យប្រវត្តិ <br />
        <span className="hero-gradient-text">
          មិនបាច់ចុះឈ្មោះ • ស្កេន KHQR ភ្លាមៗ
        </span>
      </h1>

      {/* Centered Subtitle */}
      <p className="hero-description">
        ប្រព័ន្ធទិញ-លក់គណនី Roblox ស្វ័យប្រវត្តិតាមបាគង KHQR គ្រប់ធនាគារនៅកម្ពុជា (ABA, Wing, ACLEDA)។ ស្កេនទូទាត់ភ្លាម ទទួលបាន Username & Password សម្រាប់ចូលលេងភ្លាមៗលើអេក្រង់ក្នុងរយៈពេល ៥ វិនាទី!
      </p>

      {/* Action CTA Buttons */}
      <div className="hero-cta-group">
        <button
          onClick={handleScrollToProducts}
          className="btn btn-primary"
          style={{
            padding: '13px 28px',
            fontSize: '0.96rem',
            fontWeight: 800,
            borderRadius: '14px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 12px 30px rgba(99, 102, 241, 0.45)',
            cursor: 'pointer'
          }}
        >
          <Flame size={19} />
          <span>រកមើលគណនីទាំងអស់</span>
          <ArrowRight size={17} />
        </button>

        {onNavigateHowToBuy && (
          <button
            onClick={onNavigateHowToBuy}
            className="btn btn-secondary"
            style={{
              padding: '13px 22px',
              fontSize: '0.96rem',
              fontWeight: 700,
              borderRadius: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.14)',
              cursor: 'pointer'
            }}
          >
            <BookOpen size={18} color="var(--primary)" />
            <span>របៀបទិញ (How to Buy)</span>
          </button>
        )}
      </div>

      {/* Trust Ribbon */}
      <div className="hero-trust-ribbon">
        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <CheckCircle2 size={15} color="#10b981" /> ៥ វិនាទីទទួល Account
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <CheckCircle2 size={15} color="#10b981" /> Clean 100% គ្មាន 2FA
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <CheckCircle2 size={15} color="#10b981" /> គាំទ្រគ្រប់ធនាគារ KHQR
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <CheckCircle2 size={15} color="#10b981" /> ប្រព័ន្ធស្វ័យប្រវត្តិ ២៤/៧
        </span>
      </div>

      {/* PANORAMIC 4-GAME SHOWCASE CARDS (Full Width Interactive Grid) */}
      <div style={{ textAlign: 'left', marginBottom: '8px' }}>
        <div style={{
          fontSize: '0.78rem',
          fontWeight: 800,
          color: 'var(--text-muted)',
          letterSpacing: '1px',
          textTransform: 'uppercase',
          marginBottom: '10px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px'
        }}>
          <Sparkles size={14} color="#38bdf8" /> ជ្រើសរើសប្រភេទហ្គេមដែលអ្នកចង់ទិញ៖
        </div>
      </div>

      <div className="hero-showcase-grid">
        {FEATURED_GAMES.map((game) => (
          <div
            key={game.id}
            onClick={() => handleCardClick(game.category)}
            className="hero-game-card"
            title={`ចុចដើម្បីមើល ${game.title}`}
          >
            <img src={game.image} alt={game.title} />
            <div className="hero-game-card-overlay">
              {/* Top Badges */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{
                  background: 'rgba(15, 23, 42, 0.88)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: '#fff',
                  fontSize: '0.7rem',
                  fontWeight: 800,
                  padding: '3px 8px',
                  borderRadius: '9999px'
                }}>
                  {game.badge}
                </span>

                <span style={{
                  background: 'rgba(16, 185, 129, 0.9)',
                  color: '#fff',
                  fontSize: '0.68rem',
                  fontWeight: 800,
                  padding: '3px 7px',
                  borderRadius: '9999px'
                }}>
                  {game.tag}
                </span>
              </div>

              {/* Bottom Info */}
              <div>
                <div style={{ fontSize: '0.72rem', color: '#38bdf8', fontWeight: 700, marginBottom: '2px' }}>
                  {game.highlight}
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span style={{ fontSize: '0.96rem', fontWeight: 900, color: '#ffffff' }}>
                    {game.title}
                  </span>
                  <span style={{
                    fontSize: '0.72rem',
                    color: '#c7d2fe',
                    display: 'flex',
                    alignItems: 'center',
                    fontWeight: 700
                  }}>
                    មើល <ChevronRight size={13} />
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 4 SERVICE PILLARS (At bottom of Hero) */}
      <div className="hero-features-grid">
        <div style={{
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '14px',
          padding: '12px 14px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          textAlign: 'left'
        }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            background: 'rgba(99, 102, 241, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#818cf8',
            flexShrink: 0
          }}>
            <UserCheck size={18} />
          </div>
          <div>
            <div style={{ fontSize: '0.86rem', fontWeight: 700, whiteSpace: 'nowrap' }}>គ្មានការចុះឈ្មោះ</div>
            <div style={{ fontSize: '0.74rem', color: 'var(--text-dim)', whiteSpace: 'nowrap' }}>ចូលទិញភ្លាមៗ</div>
          </div>
        </div>

        <div style={{
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '14px',
          padding: '12px 14px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          textAlign: 'left'
        }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            background: 'rgba(211, 32, 39, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--bakong-red)',
            flexShrink: 0
          }}>
            <QrCode size={18} />
          </div>
          <div>
            <div style={{ fontSize: '0.86rem', fontWeight: 700, whiteSpace: 'nowrap' }}>បាគង KHQR</div>
            <div style={{ fontSize: '0.74rem', color: 'var(--text-dim)', whiteSpace: 'nowrap' }}>ABA, Wing, ACLEDA</div>
          </div>
        </div>

        <div style={{
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '14px',
          padding: '12px 14px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          textAlign: 'left'
        }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            background: 'rgba(16, 185, 129, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--accent-green)',
            flexShrink: 0
          }}>
            <Zap size={18} />
          </div>
          <div>
            <div style={{ fontSize: '0.86rem', fontWeight: 700, whiteSpace: 'nowrap' }}>ទទួលបានភ្លាមៗ</div>
            <div style={{ fontSize: '0.74rem', color: 'var(--text-dim)', whiteSpace: 'nowrap' }}>Username & Password</div>
          </div>
        </div>

        <div style={{
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '14px',
          padding: '12px 14px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          textAlign: 'left'
        }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            background: 'rgba(245, 158, 11, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--accent-gold)',
            flexShrink: 0
          }}>
            <ShieldCheck size={18} />
          </div>
          <div>
            <div style={{ fontSize: '0.86rem', fontWeight: 700, whiteSpace: 'nowrap' }}>ធានាសុវត្ថិភាព</div>
            <div style={{ fontSize: '0.74rem', color: 'var(--text-dim)', whiteSpace: 'nowrap' }}>Clean 100% គ្មាន 2FA</div>
          </div>
        </div>
      </div>
    </div>
  );
};
