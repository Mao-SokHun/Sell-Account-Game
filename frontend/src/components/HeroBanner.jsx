import React from 'react';
import { ShieldCheck, Zap, QrCode, UserCheck, Flame, Gift } from 'lucide-react';

export const HeroBanner = () => {
  return (
    <div style={{
      position: 'relative',
      margin: '28px 0',
      padding: '36px 30px',
      borderRadius: '24px',
      background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.7) 0%, rgba(15, 23, 42, 0.9) 100%)',
      border: '1px solid rgba(99, 102, 241, 0.25)',
      overflow: 'hidden',
      boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
    }}>
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
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '16px' }}>
          <span className="badge badge-gold">
            <Flame size={14} /> ហាងពេញនិយមបំផុតនៅកម្ពុជា
          </span>
          <span className="badge badge-cyan">
            <Zap size={14} /> ប្រព័ន្ធស្វ័យប្រវត្តិ ២៤ ម៉ោង
          </span>
          <span className="badge badge-green">
            <ShieldCheck size={14} /> ធានាសុវត្ថិភាព ១០០%
          </span>
        </div>

        {/* Main Headline */}
        <h1 style={{
          fontSize: 'clamp(1.7rem, 3.5vw, 2.5rem)',
          fontWeight: 800,
          lineHeight: 1.35,
          marginBottom: '14px',
          letterSpacing: '-0.5px'
        }}>
          ទិញ Account Roblox <span style={{
            background: 'linear-gradient(135deg, #818cf8, #38bdf8)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>មិនបាច់ចុះឈ្មោះ</span> ស្កេនបាគង KHQR ទទួលគណនីភ្លាមៗ
        </h1>

        {/* Subtitle */}
        <p style={{
          fontSize: '1rem',
          color: 'var(--text-muted)',
          maxWidth: '750px',
          lineHeight: 1.7,
          marginBottom: '28px'
        }}>
          ជ្រើសរើស Account Roblox ដែលអ្នកពេញចិត្ត (Blox Fruits, ឈុត VIP Avatar, Pet Simulator 99, Blade Ball) រួចចុចទិញស្កេនទូទាត់តាមបាគង KHQR (ABA, Wing, អេស៊ីលីដា...) ប្រព័ន្ធនឹងបង្ហាញឈ្មោះគណនី និងលេខសម្ងាត់សម្រាប់ចូលលេងភ្លាមៗលើផ្ទាំងអេក្រង់!
        </p>

        {/* 4 Feature Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px'
        }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '16px',
            padding: '14px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'rgba(99, 102, 241, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#818cf8'
            }}>
              <UserCheck size={20} />
            </div>
            <div>
              <div style={{ fontSize: '0.9rem', fontWeight: 700 }}>គ្មានការចុះឈ្មោះ</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>អ្នកទិញចូលទិញភ្លាមៗ</div>
            </div>
          </div>

          <div style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '16px',
            padding: '14px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'rgba(211, 32, 39, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--bakong-red)'
            }}>
              <QrCode size={20} />
            </div>
            <div>
              <div style={{ fontSize: '0.9rem', fontWeight: 700 }}>បាគង KHQR</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>ស្កេនបានគ្រប់ធនាគារ</div>
            </div>
          </div>

          <div style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '16px',
            padding: '14px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'rgba(16, 185, 129, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--accent-green)'
            }}>
              <Zap size={20} />
            </div>
            <div>
              <div style={{ fontSize: '0.9rem', fontWeight: 700 }}>ទទួលបានភ្លាមៗ</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>បង្ហាញ Username & Password</div>
            </div>
          </div>

          <div style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '16px',
            padding: '14px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'rgba(245, 158, 11, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--accent-gold)'
            }}>
              <ShieldCheck size={20} />
            </div>
            <div>
              <div style={{ fontSize: '0.9rem', fontWeight: 700 }}>ធានាសុវត្ថិភាព ១០០%</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>គណនីស្អាត មិនជាប់ Email</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
