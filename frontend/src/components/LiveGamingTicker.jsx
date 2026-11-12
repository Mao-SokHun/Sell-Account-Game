import React, { useState, useEffect } from 'react';
import { Zap, ShieldCheck, Flame, Radio, Trophy, CheckCircle2 } from 'lucide-react';

const RECENT_DROPS = [
  { time: '១ នាទីមុន', user: '012***892', item: 'Account Blox Fruits Kitsune Max 2550', price: '$18.50', bank: 'ABA Bank' },
  { time: '៣ នាទីមុន', user: '098***314', item: 'VIP Avatar 50,230 Robux + Dominus', price: '$45.00', bank: 'ACLEDA' },
  { time: '៥ នាទីមុន', user: '070***441', item: 'Pet Sim 99 Huge Titanic Rainbow Dragon', price: '$22.00', bank: 'Wing' },
  { time: '៨ នាទីមុន', user: '096***558', item: 'Blade Ball Mythic Chromatic Void Blade', price: '$12.00', bank: 'Bakong' },
  { time: '១២ នាទីមុន', user: '088***901', item: 'Blox Fruits Kitsune + Godhuman + CDK', price: '$18.50', bank: 'Canadia' }
];

export const LiveGamingTicker = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % RECENT_DROPS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const drop = RECENT_DROPS[currentIndex];

  return (
    <div style={{
      margin: '0 0 16px 0',
      background: 'linear-gradient(90deg, rgba(99, 102, 241, 0.15) 0%, rgba(6, 182, 212, 0.12) 50%, rgba(168, 85, 247, 0.15) 100%)',
      border: '1px solid rgba(99, 102, 241, 0.3)',
      borderRadius: '14px',
      padding: '8px 16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '12px',
      flexWrap: 'wrap',
      backdropFilter: 'blur(10px)',
      boxShadow: '0 4px 20px -5px rgba(99, 102, 241, 0.25)'
    }}>
      {/* Left: Live Pulse Tag */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          background: 'rgba(239, 68, 68, 0.2)',
          border: '1px solid rgba(239, 68, 68, 0.5)',
          color: '#f87171',
          fontSize: '0.72rem',
          fontWeight: 900,
          padding: '3px 8px',
          borderRadius: '6px',
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}>
          <span style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            backgroundColor: '#ef4444',
            boxShadow: '0 0 8px #ef4444'
          }} />
          LIVE DROPS
        </span>

        {/* Live Recent Drop Animated */}
        <div key={currentIndex} style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '0.82rem',
          color: '#e2e8f0',
          animation: 'heroTextFadeIn 0.4s ease'
        }}>
          <span style={{ color: '#94a3b8', fontSize: '0.76rem' }}>[{drop.time}]</span>
          <span style={{ color: '#38bdf8', fontWeight: 700 }}>{drop.user}</span>
          <span>បានទិញ</span>
          <span style={{ color: '#fbbf24', fontWeight: 800 }}>{drop.item}</span>
          <span style={{
            background: 'rgba(16, 185, 129, 0.2)',
            color: '#34d399',
            padding: '1px 6px',
            borderRadius: '4px',
            fontSize: '0.74rem',
            fontWeight: 800
          }}>
            {drop.price}
          </span>
          <span style={{ color: '#94a3b8', fontSize: '0.74rem' }}>({drop.bank})</span>
        </div>
      </div>

      {/* Right: Live stats */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '14px',
        fontSize: '0.78rem',
        color: '#94a3b8',
        marginLeft: 'auto'
      }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <span className="pulse-dot-green" />
          <strong style={{ color: '#f8fafc' }}>1,480+</strong> Gamers Online
        </span>
        <span style={{ color: 'rgba(255, 255, 255, 0.2)' }}>•</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#38bdf8' }}>
          <Zap size={13} color="#38bdf8" /> ស្វ័យប្រវត្តិ &lt; 5s
        </span>
      </div>
    </div>
  );
};
