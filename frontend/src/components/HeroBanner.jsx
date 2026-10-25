import React from 'react';
import { ShieldCheck, Zap, QrCode, UserCheck, Flame } from 'lucide-react';

export const HeroBanner = () => {
  return (
    <div className="hero-banner-card">
      {/* Background Ambient Glows */}
      <div style={{
        position: 'absolute',
        top: '-40px',
        right: '-40px',
        width: '260px',
        height: '260px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(99, 102, 241, 0.25) 0%, transparent 70%)',
        filter: 'blur(30px)',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-40px',
        left: '20%',
        width: '240px',
        height: '240px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(6, 182, 212, 0.2) 0%, transparent 70%)',
        filter: 'blur(30px)',
        pointerEvents: 'none'
      }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '900px' }}>
        {/* Top Badges */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '14px' }}>
          <span className="badge badge-gold" style={{ fontSize: '0.78rem' }}>
            <Flame size={13} /> ទិញងាយស្រួល ទទួលគណនីភ្លាមៗ
          </span>
          <span className="badge badge-cyan" style={{ fontSize: '0.78rem' }}>
            <Zap size={13} /> ស្វ័យប្រវត្តិ ២៤ ម៉ោង
          </span>
          <span className="badge badge-green" style={{ fontSize: '0.78rem' }}>
            <ShieldCheck size={13} /> ធានាសុវត្ថិភាព ១០០%
          </span>
        </div>

        {/* Main Headline */}
        <h1 style={{
          fontSize: 'clamp(1.35rem, 4.5vw, 2.3rem)',
          fontWeight: 800,
          lineHeight: 1.35,
          marginBottom: '12px',
          letterSpacing: '-0.4px'
        }}>
          ទិញ Account Roblox <span style={{
            background: 'linear-gradient(135deg, #818cf8, #38bdf8)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>មិនបាច់ចុះឈ្មោះ</span> ស្កេនបាគង KHQR ទទួលគណនីភ្លាមៗ
        </h1>

        {/* Subtitle */}
        <p style={{
          fontSize: '0.92rem',
          color: 'var(--text-muted)',
          maxWidth: '750px',
          lineHeight: 1.65,
          marginBottom: '22px'
        }}>
          ជ្រើសរើស Account Roblox ដែលអ្នកពេញចិត្ត (Blox Fruits, ឈុត VIP Avatar, Pet Simulator 99, Blade Ball) រួចចុចទិញស្កេនទូទាត់តាមបាគង KHQR (ABA, Wing, អេស៊ីលីដា...) ប្រព័ន្ធនឹងបង្ហាញឈ្មោះគណនី និងលេខសម្ងាត់សម្រាប់ចូលលេងភ្លាមៗលើផ្ទាំងអេក្រង់!
        </p>

        {/* 4 Feature Cards (2x2 on mobile, 4 columns on desktop) */}
        <div className="hero-features-grid">
          <div style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '14px',
            padding: '10px 12px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <div style={{
              width: '34px',
              height: '34px',
              borderRadius: '9px',
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
              <div style={{ fontSize: '0.84rem', fontWeight: 700, whiteSpace: 'nowrap' }}>គ្មានការចុះឈ្មោះ</div>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-dim)', whiteSpace: 'nowrap' }}>ចូលទិញភ្លាមៗ</div>
            </div>
          </div>

          <div style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '14px',
            padding: '10px 12px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <div style={{
              width: '34px',
              height: '34px',
              borderRadius: '9px',
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
              <div style={{ fontSize: '0.84rem', fontWeight: 700, whiteSpace: 'nowrap' }}>បាគង KHQR</div>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-dim)', whiteSpace: 'nowrap' }}>គ្រប់ធនាគារ</div>
            </div>
          </div>

          <div style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '14px',
            padding: '10px 12px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <div style={{
              width: '34px',
              height: '34px',
              borderRadius: '9px',
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
              <div style={{ fontSize: '0.84rem', fontWeight: 700, whiteSpace: 'nowrap' }}>ទទួលបានភ្លាមៗ</div>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-dim)', whiteSpace: 'nowrap' }}>Username/Pass</div>
            </div>
          </div>

          <div style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '14px',
            padding: '10px 12px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <div style={{
              width: '34px',
              height: '34px',
              borderRadius: '9px',
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
              <div style={{ fontSize: '0.84rem', fontWeight: 700, whiteSpace: 'nowrap' }}>ធានាសុវត្ថិភាព</div>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-dim)', whiteSpace: 'nowrap' }}>Clean 100%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
