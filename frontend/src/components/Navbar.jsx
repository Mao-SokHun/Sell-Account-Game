import React from 'react';
import { UserX, Lock, Unlock, Gamepad2, Search, History, Crown } from 'lucide-react';

export const Navbar = ({
  searchQuery,
  setSearchQuery,
  currentView,
  onNavigateHome,
  adminUser,
  onLogoutAdmin,
  purchasedCount,
  onOpenHistoryModal
}) => {
  const isOwnerView = currentView === 'admin';

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      background: 'rgba(7, 9, 14, 0.85)',
      borderBottom: '1px solid var(--border-color)',
      padding: '14px 0'
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '20px',
        flexWrap: 'wrap'
      }}>
        {/* Brand Logo */}
        <div 
          onClick={onNavigateHome}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            cursor: 'pointer'
          }}
        >
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #6366f1, #06b6d4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 20px rgba(99, 102, 241, 0.5)'
          }}>
            <Gamepad2 size={24} color="#ffffff" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{
                fontSize: '1.25rem',
                fontWeight: 800,
                letterSpacing: '-0.5px',
                background: 'linear-gradient(to right, #ffffff, #c7d2fe, #38bdf8)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                ROBLOX KHMER
              </span>
              <span className="badge badge-cyan" style={{ fontSize: '0.7rem', padding: '2px 8px' }}>
                🇰🇭 កម្ពុជា
              </span>
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: 0 }}>
              ហាងលក់ Account Roblox ស្វ័យប្រវត្តិ
            </p>
          </div>
        </div>

        {/* Search Bar - only show when on buyer views */}
        {!isOwnerView && (
          <div style={{
            flex: '1',
            maxWidth: '440px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <div style={{
              position: 'relative',
              width: '100%'
            }}>
              <Search size={18} style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--text-dim)'
              }} />
              <input
                type="text"
                placeholder="ស្វែងរក Account Blox Fruits, VIP, Pet Sim 99..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="form-input"
                style={{
                  paddingLeft: '38px',
                  background: 'rgba(15, 23, 42, 0.6)',
                  fontSize: '0.88rem'
                }}
              />
            </div>
          </div>
        )}

        {/* Right Navigation Controls */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          {/* OWNER VIEW CONTROLS (Only visible when accessing /owner) */}
          {isOwnerView ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span className="badge badge-gold" style={{ padding: '6px 12px', fontSize: '0.82rem' }}>
                <Crown size={14} /> ផ្ទាំងម្ចាស់ហាង (Owner Portal)
              </span>

              <button
                onClick={onNavigateHome}
                className="btn btn-secondary"
                style={{ padding: '8px 14px', fontSize: '0.85rem' }}
              >
                <span>ត្រឡប់ទៅហាងទំនិញ</span>
              </button>

              {adminUser && (
                <button
                  onClick={onLogoutAdmin}
                  className="btn btn-ghost"
                  style={{ padding: '8px 12px', fontSize: '0.85rem', color: '#f87171' }}
                  title="ចាកចេញពី Admin"
                >
                  <Unlock size={16} />
                  <span>ចាកចេញ</span>
                </button>
              )}
            </div>
          ) : (
            /* BUYER VIEW CONTROLS (Clean: NO Admin button displayed!) */
            <>
              {/* Buyer No Register Tag */}
              <div className="glass-pill" style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                fontSize: '0.8rem',
                color: '#38bdf8',
                borderColor: 'rgba(56, 189, 248, 0.25)'
              }}>
                <UserX size={14} />
                <span>អ្នកទិញមិនបាច់ចុះឈ្មោះ</span>
              </div>

              {/* Purchased Accounts Button */}
              <button
                onClick={onOpenHistoryModal}
                className="btn btn-secondary"
                style={{ padding: '8px 14px', fontSize: '0.85rem' }}
                title="មើលគណនីដែលបានទិញរួចរាល់"
              >
                <History size={16} />
                <span>គណនីបានទិញ</span>
                {purchasedCount > 0 && (
                  <span style={{
                    background: 'var(--accent-green)',
                    color: '#000',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    borderRadius: '999px',
                    padding: '1px 6px',
                    marginLeft: '4px'
                  }}>
                    {purchasedCount}
                  </span>
                )}
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
