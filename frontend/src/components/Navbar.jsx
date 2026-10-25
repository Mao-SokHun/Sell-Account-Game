import React, { useState } from 'react';
import { 
  Lock, Unlock, Gamepad2, Search, History, Crown, 
  BookOpen, ShieldCheck, Menu, X, Send, ArrowRight 
} from 'lucide-react';

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const isOwnerView = currentView === 'admin';

  const handleNavClick = (callback) => {
    setIsMobileMenuOpen(false);
    setIsMobileSearchOpen(false);
    if (callback) callback();
  };

  return (
    <header className="navbar-header">
      <div className="container navbar-container">
        {/* Brand Logo */}
        <div 
          onClick={() => handleNavClick(onNavigateHome)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            cursor: 'pointer',
            flexShrink: 0
          }}
        >
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #6366f1, #06b6d4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 16px rgba(99, 102, 241, 0.45)',
            flexShrink: 0
          }}>
            <Gamepad2 size={20} color="#ffffff" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{
                fontSize: '1.15rem',
                fontWeight: 900,
                letterSpacing: '-0.3px',
                background: 'linear-gradient(to right, #ffffff, #c7d2fe, #38bdf8)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                whiteSpace: 'nowrap'
              }}>
                ROBLOX KHMER
              </span>
            </div>
            <p className="navbar-brand-subtitle" style={{ fontSize: '0.74rem', color: 'var(--text-muted)', margin: 0, whiteSpace: 'nowrap' }}>
              Platform លក់ Account Roblox ស្វ័យប្រវត្តិ
            </p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        {!isOwnerView && (
          <nav className="navbar-desktop-nav">
            <button
              onClick={() => handleNavClick(onNavigateHome)}
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
              onClick={() => handleNavClick(onNavigateHowToBuy)}
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
              onClick={() => handleNavClick(onNavigateWarranty)}
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

        {/* Desktop Search Bar (only shown on catalog view) */}
        {!isOwnerView && currentView === 'catalog' && (
          <div className="navbar-desktop-search">
            <div style={{ position: 'relative', width: '100%' }}>
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

        {/* Right Controls */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          flexShrink: 0
        }}>
          {isOwnerView ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="badge badge-gold" style={{ padding: '6px 10px', fontSize: '0.78rem' }}>
                <Crown size={14} /> <span>Admin</span>
              </span>

              <button
                onClick={() => handleNavClick(onNavigateHome)}
                className="btn btn-secondary"
                style={{ padding: '6px 12px', fontSize: '0.82rem' }}
              >
                <span>ហាងទំនិញ</span>
              </button>

              {adminUser && (
                <button
                  onClick={onLogoutAdmin}
                  className="btn btn-ghost"
                  style={{ padding: '6px 10px', fontSize: '0.82rem', color: '#f87171' }}
                  title="ចាកចេញពី Admin"
                >
                  <Unlock size={15} />
                </button>
              )}
            </div>
          ) : (
            <>
              {/* Mobile Search Toggle Button */}
              {currentView === 'catalog' && (
                <button
                  onClick={() => {
                    setIsMobileSearchOpen(prev => !prev);
                    setIsMobileMenuOpen(false);
                  }}
                  className="btn btn-secondary navbar-mobile-search-btn"
                  style={{
                    padding: '8px 10px',
                    borderRadius: '10px',
                    color: isMobileSearchOpen ? 'var(--primary)' : 'var(--text-main)'
                  }}
                  title="ស្វែងរក"
                  aria-label="Search"
                >
                  {isMobileSearchOpen ? <X size={18} /> : <Search size={18} />}
                </button>
              )}

              {/* History Button (Buyer) */}
              {purchasedCount > 0 && (
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenHistoryModal();
                  }}
                  className="btn btn-secondary"
                  style={{
                    padding: '7px 11px',
                    fontSize: '0.84rem',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                  title="មើលគណនីដែលបានទិញរួចរាល់"
                >
                  <History size={16} />
                  <span className="navbar-brand-subtitle">គណនីបានទិញ</span>
                  <span style={{
                    background: 'var(--accent-green)',
                    color: '#000',
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    borderRadius: '999px',
                    padding: '1px 6px'
                  }}>
                    {purchasedCount}
                  </span>
                </button>
              )}

              {/* Mobile Hamburger Toggle Button */}
              <button
                onClick={() => {
                  setIsMobileMenuOpen(prev => !prev);
                  setIsMobileSearchOpen(false);
                }}
                className="btn btn-secondary navbar-mobile-toggle-btn"
                style={{
                  padding: '8px 10px',
                  borderRadius: '10px',
                  color: isMobileMenuOpen ? 'var(--primary)' : 'var(--text-main)',
                  background: isMobileMenuOpen ? 'rgba(99, 102, 241, 0.2)' : 'rgba(255, 255, 255, 0.08)'
                }}
                title="មឺនុយ"
                aria-label="Menu"
              >
                {isMobileMenuOpen ? <X size={19} /> : <Menu size={19} />}
              </button>
            </>
          )}
        </div>
      </div>

      {/* Mobile Search Dropdown Bar */}
      {isMobileSearchOpen && !isOwnerView && currentView === 'catalog' && (
        <div style={{
          padding: '10px 14px',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          background: 'rgba(10, 15, 28, 0.98)',
          backdropFilter: 'blur(16px)',
          animation: 'modalFadeIn 0.2s ease-out'
        }}>
          <div style={{ position: 'relative', width: '100%' }}>
            <Search size={16} style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--text-dim)'
            }} />
            <input
              type="text"
              placeholder="ស្វែងរក Blox Fruits, VIP, Pet Sim 99..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-input"
              autoFocus
              style={{
                paddingLeft: '38px',
                paddingRight: '36px',
                fontSize: '0.88rem',
                background: 'rgba(15, 23, 42, 0.9)',
                paddingTop: '8px',
                paddingBottom: '8px'
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                  padding: '4px'
                }}
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Mobile Navigation Dropdown Drawer */}
      {isMobileMenuOpen && !isOwnerView && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          background: 'rgba(9, 13, 24, 0.98)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderBottom: '1px solid rgba(99, 102, 241, 0.3)',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.85)',
          padding: '14px 12px 18px 12px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          animation: 'modalFadeIn 0.2s ease-out'
        }}>
          <button
            onClick={() => handleNavClick(onNavigateHome)}
            className="btn"
            style={{
              justifyContent: 'flex-start',
              padding: '12px 14px',
              borderRadius: '12px',
              fontSize: '0.94rem',
              fontWeight: currentView === 'catalog' ? 800 : 600,
              color: currentView === 'catalog' ? '#fff' : 'var(--text-muted)',
              background: currentView === 'catalog' ? 'rgba(99, 102, 241, 0.2)' : 'rgba(255, 255, 255, 0.03)',
              border: currentView === 'catalog' ? '1px solid rgba(99, 102, 241, 0.4)' : '1px solid transparent'
            }}
          >
            <Gamepad2 size={18} color={currentView === 'catalog' ? 'var(--primary)' : 'currentColor'} />
            <span>ហាងទំនិញ (Store Catalog)</span>
          </button>

          <button
            onClick={() => handleNavClick(onNavigateHowToBuy)}
            className="btn"
            style={{
              justifyContent: 'flex-start',
              padding: '12px 14px',
              borderRadius: '12px',
              fontSize: '0.94rem',
              fontWeight: currentView === 'how-to-buy' ? 800 : 600,
              color: currentView === 'how-to-buy' ? '#fff' : 'var(--text-muted)',
              background: currentView === 'how-to-buy' ? 'rgba(99, 102, 241, 0.2)' : 'rgba(255, 255, 255, 0.03)',
              border: currentView === 'how-to-buy' ? '1px solid rgba(99, 102, 241, 0.4)' : '1px solid transparent'
            }}
          >
            <BookOpen size={18} color={currentView === 'how-to-buy' ? 'var(--primary)' : 'currentColor'} />
            <span>របៀបទិញគណនី (How to Buy Guide)</span>
          </button>

          <button
            onClick={() => handleNavClick(onNavigateWarranty)}
            className="btn"
            style={{
              justifyContent: 'flex-start',
              padding: '12px 14px',
              borderRadius: '12px',
              fontSize: '0.94rem',
              fontWeight: currentView === 'warranty' ? 800 : 600,
              color: currentView === 'warranty' ? '#fff' : 'var(--text-muted)',
              background: currentView === 'warranty' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255, 255, 255, 0.03)',
              border: currentView === 'warranty' ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid transparent'
            }}
          >
            <ShieldCheck size={18} color={currentView === 'warranty' ? '#10b981' : 'currentColor'} />
            <span>គោលការណ៍ធានា និងជំនួយ (Warranty & Support)</span>
          </button>

          {purchasedCount > 0 && (
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenHistoryModal();
              }}
              className="btn btn-secondary"
              style={{
                justifyContent: 'flex-start',
                padding: '12px 14px',
                borderRadius: '12px',
                fontSize: '0.94rem'
              }}
            >
              <History size={18} />
              <span>មើលគណនីដែលបានទិញរួចរាល់ ({purchasedCount})</span>
            </button>
          )}

          <div style={{
            marginTop: '6px',
            paddingTop: '10px',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)'
          }}>
            <a
              href="https://t.me/RobloxKhmerSupport"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '11px 14px',
                fontSize: '0.9rem',
                borderRadius: '12px',
                textDecoration: 'none',
                background: 'linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%)'
              }}
            >
              <Send size={15} />
              <span>Telegram ជំនួយ៖ @RobloxKhmerSupport</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
