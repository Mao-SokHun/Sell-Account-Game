import React from 'react';
import { Lock, Unlock, Gamepad2, Search, History, Crown, BookOpen, ShieldCheck } from 'lucide-react';

export const Navbar = ({
  searchQuery,
  setSearchQuery,
  currentView,
  onNavigateHome,
  onNavigateHowToBuy,
  onNavigateWarranty,
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
        gap: '16px',
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
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: 0 }}>
              Platform លក់ Account Roblox ស្វ័យប្រវត្តិ
            </p>
          </div>
        </div>

        {/* Navigation Links (Buyer View) */}
        {!isOwnerView && (
          <nav style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            flexWrap: 'wrap'
          }}>
            <button
              onClick={onNavigateHome}
              className="btn"
              style={{
                padding: '7px 14px',
                fontSize: '0.86rem',
                borderRadius: '10px',
                background: currentView === 'catalog' ? 'rgba(99, 102, 241, 0.18)' : 'transparent',
                border: currentView === 'catalog' ? '1px solid rgba(99, 102, 241, 0.4)' : '1px solid transparent',
                color: currentView === 'catalog' ? '#fff' : 'var(--text-muted)',
                fontWeight: currentView === 'catalog' ? 700 : 500,
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                cursor: 'pointer'
              }}
            >
              <Gamepad2 size={16} color={currentView === 'catalog' ? 'var(--primary)' : 'currentColor'} />
              <span>ហាងទំនិញ</span>
            </button>

            <button
              onClick={onNavigateHowToBuy}
              className="btn"
              style={{
                padding: '7px 14px',
                fontSize: '0.86rem',
                borderRadius: '10px',
                background: currentView === 'how-to-buy' ? 'rgba(99, 102, 241, 0.18)' : 'transparent',
                border: currentView === 'how-to-buy' ? '1px solid rgba(99, 102, 241, 0.4)' : '1px solid transparent',
                color: currentView === 'how-to-buy' ? '#fff' : 'var(--text-muted)',
                fontWeight: currentView === 'how-to-buy' ? 700 : 500,
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                cursor: 'pointer'
              }}
            >
              <BookOpen size={16} color={currentView === 'how-to-buy' ? 'var(--primary)' : 'currentColor'} />
              <span>របៀបទិញ</span>
            </button>

            <button
              onClick={onNavigateWarranty}
              className="btn"
              style={{
                padding: '7px 14px',
                fontSize: '0.86rem',
                borderRadius: '10px',
                background: currentView === 'warranty' ? 'rgba(16, 185, 129, 0.18)' : 'transparent',
                border: currentView === 'warranty' ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid transparent',
                color: currentView === 'warranty' ? '#fff' : 'var(--text-muted)',
                fontWeight: currentView === 'warranty' ? 700 : 500,
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                cursor: 'pointer'
              }}
            >
              <ShieldCheck size={16} color={currentView === 'warranty' ? '#10b981' : 'currentColor'} />
              <span>ការធានា & ជំនួយ</span>
            </button>
          </nav>
        )}

        {/* Search Bar - only show when on catalog views */}
        {!isOwnerView && currentView === 'catalog' && (
          <div style={{
            flex: '1',
            maxWidth: '340px',
            minWidth: '220px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <div style={{
              position: 'relative',
              width: '100%'
            }}>
              <Search size={16} style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--text-dim)'
              }} />
              <input
                type="text"
                placeholder="ស្វែងរក Blox Fruits, VIP..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="form-input"
                style={{
                  paddingLeft: '36px',
                  background: 'rgba(15, 23, 42, 0.6)',
                  fontSize: '0.84rem',
                  paddingTop: '7px',
                  paddingBottom: '7px'
                }}
              />
            </div>
          </div>
        )}

        {/* Right Navigation Controls */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          {/* OWNER VIEW CONTROLS */}
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
            /* BUYER VIEW CONTROLS (Purchased accounts history) */
            purchasedCount > 0 ? (
              <button
                onClick={onOpenHistoryModal}
                className="btn btn-secondary"
                style={{ padding: '8px 14px', fontSize: '0.85rem' }}
                title="មើលគណនីដែលបានទិញរួចរាល់"
              >
                <History size={16} />
                <span>គណនីបានទិញ</span>
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
              </button>
            ) : null
          )}
        </div>
      </div>
    </header>
  );
};
