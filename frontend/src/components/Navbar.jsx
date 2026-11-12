import React, { useState, useEffect } from 'react';
import { 
  Gamepad2, Search, History, Crown, 
  BookOpen, Menu, X, Send, ArrowRight, ShieldCheck, Sparkles 
} from 'lucide-react';

export const Navbar = ({
  searchQuery,
  setSearchQuery,
  currentView,
  onNavigateHome,
  onNavigateHowToBuy,
  adminUser,
  onLogoutAdmin,
  purchasedCount,
  onOpenHistoryModal
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const isOwnerView = currentView === 'admin';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (callback) => {
    setIsMobileMenuOpen(false);
    if (callback) callback();
  };

  const handleSearchIconClick = () => {
    if (currentView !== 'catalog') {
      if (onNavigateHome) onNavigateHome();
      setTimeout(() => {
        const input = document.querySelector('.pixel-search-input');
        if (input) input.focus();
      }, 150);
    } else {
      const input = document.querySelector('.pixel-search-input');
      if (input) {
        input.focus();
        input.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  return (
    <>
      <header className={`navbar-header ${isScrolled ? 'navbar-scrolled' : ''}`}>
        <div className="container navbar-container">
          {/* Brand Logo (PixelVault Clean Style) */}
          <div 
            onClick={() => handleNavClick(onNavigateHome)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              cursor: 'pointer',
              flexShrink: 0
            }}
          >
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              overflow: 'hidden',
              border: '1.5px solid rgba(139, 92, 246, 0.6)',
              boxShadow: '0 0 20px rgba(139, 92, 246, 0.45)',
              flexShrink: 0,
              background: '#0d0a18'
            }}>
              <img
                src="/images/logo.jpg"
                alt="MIRA STORE Logo"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{
                fontFamily: 'var(--font-gaming)',
                fontSize: '1.35rem',
                fontWeight: 900,
                letterSpacing: '0.5px',
                lineHeight: 1,
                color: '#ffffff',
                whiteSpace: 'nowrap'
              }}>
                MIRA<span style={{ color: '#8b5cf6' }}>STORE</span>
              </span>
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                background: 'rgba(16, 185, 129, 0.12)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                padding: '3px 8px',
                borderRadius: '8px',
                fontSize: '0.72rem',
                fontWeight: 800,
                color: '#34d399'
              }}>
                <span className="pulse-dot-green" /> 24/7 AUTO
              </span>
            </div>
          </div>

          {/* Center Navigation Links (PixelVault Style) */}
          {!isOwnerView && (
            <nav className="navbar-center-nav">
              <button
                type="button"
                onClick={() => handleNavClick(onNavigateHome)}
                className={`nav-link-btn ${currentView === 'catalog' ? 'active' : ''}`}
              >
                <span>ទំព័រដើម</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  handleNavClick(onNavigateHome);
                  setTimeout(() => {
                    const el = document.getElementById('product-catalog-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
                className="nav-link-btn"
              >
                <span>ហាងទំនិញ</span>
              </button>

              <button
                type="button"
                onClick={() => handleNavClick(onNavigateHowToBuy)}
                className={`nav-link-btn ${currentView === 'how-to-buy' ? 'active' : ''}`}
              >
                <span>របៀបទិញ (Guide)</span>
              </button>
            </nav>
          )}

          {/* Right Section: Action Controls */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginLeft: 'auto'
          }}>
            {isOwnerView ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="badge badge-gold" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
                  <Crown size={14} /> <span>Owner Admin</span>
                </span>

                <button
                  type="button"
                  onClick={() => handleNavClick(onNavigateHome)}
                  className="btn btn-secondary"
                  style={{ padding: '7px 14px', fontSize: '0.84rem', borderRadius: '10px' }}
                >
                  <span>ហាងទំនិញ</span>
                </button>

                {adminUser && (
                  <button
                    type="button"
                    onClick={onLogoutAdmin}
                    className="btn btn-ghost"
                    style={{ padding: '7px 12px', fontSize: '0.84rem', color: '#f87171' }}
                    title="ចាកចេញពី Admin"
                  >
                    <span>ចាកចេញ</span>
                  </button>
                )}
              </div>
            ) : (
              <>
                {/* Search Icon Button (Jumps to Search) */}
                <button
                  type="button"
                  onClick={handleSearchIconClick}
                  className="nav-icon-btn"
                  title="ស្វែងរកគណនី"
                  aria-label="Search"
                >
                  <Search size={18} />
                </button>

                {/* History / Orders Button (Buyer) */}
                {purchasedCount > 0 && (
                  <button
                    type="button"
                    onClick={onOpenHistoryModal}
                    className="nav-history-btn"
                    title="មើលគណនីដែលបានទិញរួច"
                  >
                    <History size={16} />
                    <span>វិក្កយបត្រ</span>
                    <span className="nav-history-badge">
                      {purchasedCount}
                    </span>
                  </button>
                )}

                {/* Telegram Support Action Button (PixelVault Glow Pill) */}
                <a
                  href="https://t.me/mirastore_kh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-pixel-primary"
                  style={{
                    padding: '8px 18px',
                    fontSize: '0.84rem',
                    textDecoration: 'none',
                    borderRadius: '9999px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '7px'
                  }}
                >
                  <Send size={15} />
                  <span>Telegram Support</span>
                </a>

                {/* Mobile Hamburger Toggle Button */}
                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen(prev => !prev)}
                  className="nav-mobile-toggle"
                  aria-label="Toggle menu"
                >
                  {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="mobile-drawer-overlay" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="mobile-drawer-content" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  border: '1.5px solid rgba(139, 92, 246, 0.6)'
                }}>
                  <img src="/images/logo.jpg" alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <span style={{ fontSize: '1.2rem', fontWeight: 900, color: '#fff' }}>
                  MIRA<span style={{ color: '#8b5cf6' }}>STORE</span>
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                className="nav-icon-btn"
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <button
                type="button"
                onClick={() => handleNavClick(onNavigateHome)}
                className={`mobile-nav-link ${currentView === 'catalog' ? 'active' : ''}`}
              >
                <Gamepad2 size={18} color="#8b5cf6" />
                <span>ទំព័រដើម / ហាងទំនិញ</span>
              </button>

              <button
                type="button"
                onClick={() => handleNavClick(onNavigateHowToBuy)}
                className={`mobile-nav-link ${currentView === 'how-to-buy' ? 'active' : ''}`}
              >
                <BookOpen size={18} color="#38bdf8" />
                <span>របៀបទិញ (How to Buy)</span>
              </button>

              {purchasedCount > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenHistoryModal();
                  }}
                  className="mobile-nav-link"
                >
                  <History size={18} color="#10b981" />
                  <span>គណនីបានទិញរួច ({purchasedCount})</span>
                </button>
              )}

              <a
                href="https://t.me/mirastore_kh"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-pixel-primary"
                style={{
                  marginTop: '16px',
                  padding: '12px 20px',
                  borderRadius: '14px',
                  textAlign: 'center',
                  justifyContent: 'center'
                }}
              >
                <Send size={16} />
                <span>Telegram Support</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
