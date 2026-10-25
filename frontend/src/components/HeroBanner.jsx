import React from 'react';
import { 
  ShieldCheck, Zap, QrCode, UserCheck, Flame, 
  ArrowRight, BookOpen, CheckCircle2, Sparkles 
} from 'lucide-react';

export const HeroBanner = ({ onNavigateHowToBuy }) => {
  return (
    <div className="hero-banner-card">
      {/* Background Ambient Glows */}
      <div style={{
        position: 'absolute',
        top: '-60px',
        right: '-40px',
        width: '320px',
        height: '320px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(99, 102, 241, 0.28) 0%, transparent 70%)',
        filter: 'blur(40px)',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-50px',
        left: '10%',
        width: '280px',
        height: '280px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(6, 182, 212, 0.22) 0%, transparent 70%)',
        filter: 'blur(35px)',
        pointerEvents: 'none'
      }} />

      {/* Main 2-Column Split: Left Copy & Actions, Right Gaming Showcase */}
      <div className="hero-layout-split" style={{ position: 'relative', zIndex: 1 }}>
        {/* LEFT COLUMN */}
        <div>
          {/* Eyebrow Pill */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 14px',
            borderRadius: '9999px',
            background: 'rgba(99, 102, 241, 0.12)',
            border: '1px solid rgba(99, 102, 241, 0.3)',
            marginBottom: '16px',
            backdropFilter: 'blur(8px)'
          }}>
            <span style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#38bdf8',
              boxShadow: '0 0 10px #38bdf8',
              display: 'inline-block'
            }} />
            <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#c7d2fe' }}>
              🇰🇭 ទីផ្សារលក់ Account Roblox ស្វ័យប្រវត្តិកម្ពុជា
            </span>
          </div>

          {/* Main Headline */}
          <h1 style={{
            fontSize: 'clamp(1.55rem, 4vw, 2.45rem)',
            fontWeight: 900,
            lineHeight: 1.3,
            marginBottom: '16px',
            letterSpacing: '-0.5px'
          }}>
            ទិញ Account Roblox <br />
            <span style={{
              background: 'linear-gradient(135deg, #a5b4fc 0%, #38bdf8 50%, #4ade80 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'inline-block'
            }}>
              មិនបាច់ចុះឈ្មោះ
            </span>{' '}
            ស្កេន KHQR ភ្លាមៗ
          </h1>

          {/* Subtitle Description */}
          <p style={{
            fontSize: '0.92rem',
            color: 'var(--text-muted)',
            lineHeight: 1.7,
            marginBottom: '22px',
            maxWidth: '560px'
          }}>
            ជ្រើសរើសគណនី Blox Fruits, ឈុត VIP Avatar, Blade Ball ឬ Pet Simulator 99 រួចស្កេនទូទាត់តាមបាគង KHQR គ្រប់ធនាគារ (ABA, Wing, ACLEDA...) ទទួលបានឈ្មោះគណនី និងលេខសម្ងាត់សម្រាប់ចូលលេងភ្លាមៗលើអេក្រង់!
          </p>

          {/* Action CTA Buttons */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '22px' }}>
            <button
              onClick={() => {
                const el = document.getElementById('product-catalog-section');
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth' });
                } else {
                  window.scrollTo({ top: 380, behavior: 'smooth' });
                }
              }}
              className="btn btn-primary"
              style={{
                padding: '12px 24px',
                fontSize: '0.94rem',
                fontWeight: 800,
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 10px 25px rgba(99, 102, 241, 0.4)',
                cursor: 'pointer'
              }}
            >
              <Flame size={18} />
              <span>រកមើលគណនីទាំងអស់</span>
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
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  cursor: 'pointer'
                }}
              >
                <BookOpen size={18} color="var(--primary)" />
                <span>របៀបទិញ (How to Buy)</span>
              </button>
            )}
          </div>

          {/* Live Trust Indicators */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '16px',
            fontSize: '0.82rem',
            color: 'var(--text-dim)'
          }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle2 size={15} color="#10b981" /> ៥ វិនាទីទទួល Account
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle2 size={15} color="#10b981" /> Clean 100% គ្មាន 2FA
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle2 size={15} color="#10b981" /> គាំទ្រគ្រប់ធនាគារ KHQR
            </span>
          </div>
        </div>

        {/* RIGHT COLUMN: 3D GAMING SHOWCASE CARD */}
        <div className="hero-showcase-container">
          <div 
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '380px',
              borderRadius: '22px',
              padding: '6px',
              background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.4), rgba(6, 182, 212, 0.25), rgba(255, 255, 255, 0.05))',
              boxShadow: '0 25px 60px -10px rgba(99, 102, 241, 0.4), 0 0 30px rgba(6, 182, 212, 0.25)',
              transform: 'perspective(1000px) rotateY(-4deg) rotateX(2deg)',
              transition: 'transform 0.35s ease, box-shadow 0.35s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 30px 70px -10px rgba(99, 102, 241, 0.5), 0 0 40px rgba(6, 182, 212, 0.35)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'perspective(1000px) rotateY(-4deg) rotateX(2deg)';
              e.currentTarget.style.boxShadow = '0 25px 60px -10px rgba(99, 102, 241, 0.4), 0 0 30px rgba(6, 182, 212, 0.25)';
            }}
          >
            <div style={{
              position: 'relative',
              borderRadius: '16px',
              overflow: 'hidden',
              background: '#090d1a'
            }}>
              <img
                src="/images/bloxfruits.jpg"
                alt="Roblox Account Showcase"
                style={{
                  width: '100%',
                  height: '240px',
                  objectFit: 'cover',
                  display: 'block',
                  filter: 'brightness(0.95) contrast(1.05)'
                }}
              />
              {/* Vignette Gradient Overlay */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(9, 13, 26, 0.95) 0%, rgba(9, 13, 26, 0.25) 55%, transparent 100%)'
              }} />

              {/* Top Floating Badges */}
              <div style={{
                position: 'absolute',
                top: '12px',
                left: '12px',
                right: '12px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span style={{
                  background: 'rgba(15, 23, 42, 0.88)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: '#fff',
                  fontSize: '0.74rem',
                  fontWeight: 800,
                  padding: '4px 10px',
                  borderRadius: '9999px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px'
                }}>
                  <Sparkles size={13} color="#f59e0b" /> Blox Fruits VIP
                </span>

                <span style={{
                  background: 'rgba(16, 185, 129, 0.92)',
                  color: '#ffffff',
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  padding: '4px 10px',
                  borderRadius: '9999px',
                  boxShadow: '0 4px 12px rgba(16, 185, 129, 0.4)'
                }}>
                  ⚡ ស្វ័យប្រវត្តិ ២៤/៧
                </span>
              </div>

              {/* Bottom Details */}
              <div style={{
                position: 'absolute',
                bottom: '12px',
                left: '14px',
                right: '14px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end'
              }}>
                <div>
                  <div style={{ fontSize: '0.74rem', color: '#38bdf8', fontWeight: 700 }}>
                    Kitsune + Godhuman + CDK
                  </div>
                  <div style={{ fontSize: '1rem', fontWeight: 900, color: '#ffffff' }}>
                    Level Max 2550
                  </div>
                </div>

                <div style={{
                  background: 'rgba(211, 32, 39, 0.92)',
                  color: '#fff',
                  fontSize: '0.76rem',
                  fontWeight: 800,
                  padding: '5px 10px',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  boxShadow: '0 4px 14px rgba(211, 32, 39, 0.4)'
                }}>
                  <QrCode size={13} /> Bakong KHQR
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM: 4 FEATURE CARDS */}
      <div className="hero-features-grid" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '14px',
          padding: '12px 14px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          transition: 'transform 0.2s ease, border-color 0.2s ease'
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
          transition: 'transform 0.2s ease, border-color 0.2s ease'
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
          transition: 'transform 0.2s ease, border-color 0.2s ease'
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
          transition: 'transform 0.2s ease, border-color 0.2s ease'
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
