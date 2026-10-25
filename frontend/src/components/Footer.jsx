import React from 'react';
import { Gamepad2, ShieldCheck, Send, BookOpen, ExternalLink, HelpCircle, ArrowRight } from 'lucide-react';

export const Footer = ({ onNavigateHome, onNavigateHowToBuy, onNavigateWarranty }) => {
  return (
    <footer style={{
      borderTop: '1px solid var(--border-color)',
      background: 'rgba(5, 8, 14, 0.95)',
      padding: '50px 0 30px 0',
      color: 'var(--text-muted)',
      marginTop: '60px'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '36px',
          marginBottom: '40px'
        }}>
          {/* Brand Col */}
          <div>
            <div 
              onClick={onNavigateHome}
              style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px', cursor: 'pointer' }}
            >
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #6366f1, #06b6d4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff'
              }}>
                <Gamepad2 size={20} />
              </div>
              <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff' }}>
                ROBLOX KHMER
              </span>
            </div>
            <p style={{ fontSize: '0.86rem', lineHeight: 1.7, marginBottom: '16px' }}>
              ទីផ្សារទិញ-លក់ Account Roblox ស្វ័យប្រវត្តិកំពូលនៅកម្ពុជា។ មិនបាច់ចុះឈ្មោះសម្រាប់អ្នកទិញ ស្កេនទូទាត់តាមបាគង KHQR ទទួលគណនីភ្លាមៗ ធានាសុវត្ថិភាព ១០០%។
            </p>
            <div style={{ display: 'flex', gap: '8px' }}>
              <span className="badge badge-green">
                <ShieldCheck size={12} /> សុវត្ថិភាព & ធានា ១០០%
              </span>
            </div>
          </div>

          {/* Quick Links Menu */}
          <div>
            <h4 style={{ fontSize: '0.98rem', fontWeight: 700, color: '#fff', marginBottom: '16px' }}>
              ម៉ឺនុយរហ័ស (Navigation)
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li>
                <button
                  onClick={onNavigateHome}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    color: 'var(--text-muted)',
                    fontSize: '0.88rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.color = '#fff'}
                  onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
                >
                  <ArrowRight size={14} color="var(--primary)" />
                  <span>ហាងទំនិញ (Store Catalog)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onNavigateHowToBuy}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    color: 'var(--text-muted)',
                    fontSize: '0.88rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.color = '#fff'}
                  onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
                >
                  <ArrowRight size={14} color="var(--primary)" />
                  <span>របៀបទិញ (How to Buy Guide)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onNavigateWarranty}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    color: 'var(--text-muted)',
                    fontSize: '0.88rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.color = '#fff'}
                  onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
                >
                  <ArrowRight size={14} color="var(--primary)" />
                  <span>គោលការណ៍ធានា និងជំនួយ (Warranty & Support)</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Payment Methods */}
          <div>
            <h4 style={{ fontSize: '0.98rem', fontWeight: 700, color: '#fff', marginBottom: '16px' }}>
              វិធីសាស្រ្តទូទាត់ប្រាក់
            </h4>
            <p style={{ fontSize: '0.86rem', lineHeight: 1.7, marginBottom: '12px' }}>
              គាំទ្រការស្កេនទូទាត់តាមស្តង់ដារ <strong>Bakong KHQR</strong> ដោយឥតគិតថ្លៃសេវា ពីគ្រប់ធនាគារនៅកម្ពុជា៖
            </p>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px',
              fontSize: '0.8rem'
            }}>
              <span className="glass-pill" style={{ padding: '4px 10px', color: '#fff' }}>ធនាគារបាគង (Bakong)</span>
              <span className="glass-pill" style={{ padding: '4px 10px', color: '#fff' }}>ធនាគារអេប៊ីអេ (ABA)</span>
              <span className="glass-pill" style={{ padding: '4px 10px', color: '#fff' }}>ធនាគារវីង (Wing)</span>
              <span className="glass-pill" style={{ padding: '4px 10px', color: '#fff' }}>ធនាគារអេស៊ីលីដា (ACLEDA)</span>
              <span className="glass-pill" style={{ padding: '4px 10px', color: '#fff' }}>ធនាគារកាណាឌីយ៉ា</span>
            </div>
          </div>

          {/* Customer Support */}
          <div>
            <h4 style={{ fontSize: '0.98rem', fontWeight: 700, color: '#fff', marginBottom: '16px' }}>
              សេវាបម្រើអតិថិជន (២៤ ម៉ោង)
            </h4>
            <p style={{ fontSize: '0.86rem', lineHeight: 1.7, marginBottom: '14px' }}>
              ប្រសិនបើមានចម្ងល់ ឬត្រូវការជំនួយក្នុងការ Login ប្តូរលេខសម្ងាត់ សូមទាក់ទងមកយើងខ្ញុំ៖
            </p>
            <a
              href="https://t.me/RobloxKhmerSupport"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.85rem',
                color: '#38bdf8',
                borderColor: 'rgba(56, 189, 248, 0.3)'
              }}
            >
              <Send size={15} />
              <span>Telegram ជំនួយ៖ @RobloxKhmerSupport</span>
            </a>
          </div>
        </div>

        {/* Bottom copyright */}
        <div style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.05)',
          paddingTop: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          fontSize: '0.82rem'
        }}>
          <div>
            © {new Date().getFullYear()} ហាង ROBLOX KHMER VAULT. រក្សាសិទ្ធិគ្រប់យ៉ាង។
          </div>
          <div style={{ color: 'var(--text-dim)' }}>
            ប្រព័ន្ធទូទាត់ស្វ័យប្រវត្តិ Bakong KHQR • មិនបាច់ចុះឈ្មោះសម្រាប់អ្នកទិញ
          </div>
        </div>
      </div>
    </footer>
  );
};
