import React, { useState } from 'react';
import { History, X, Copy, Check, Eye, EyeOff, Download, ExternalLink, ShieldCheck } from 'lucide-react';
import { formatUSD } from '../utils/currency';

export const PurchaseHistoryModal = ({
  isOpen,
  onClose,
  purchases
}) => {
  const [copiedId, setCopiedId] = useState(null);
  const [revealedPasswords, setRevealedPasswords] = useState({});

  if (!isOpen) return null;

  const togglePassword = (idx) => {
    setRevealedPasswords(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDownloadSingle = (purchase) => {
    const creds = purchase.credentials || {};
    const fullText = `=== ព័ត៌មានគណនី ROBLOX (វិក្កយបត្រផ្លូវការ) ===
ហាងលក់: ហាង ROBLOX KHMER
ផលិតផល: ${purchase.title}
វិក្កយបត្រ ID: ${purchase.invoiceId}
កាលបរិច្ឆេទ: ${purchase.purchaseDate}

ព័ត៌មានគណនី ROBLOX:
- ឈ្មោះគណនី (Username): ${creds.username}
- ពាក្យសម្ងាត់ (Password): ${creds.password}
- លេខកូដសុវត្ថិភាព PIN/2FA: ${creds.backupCode || 'គ្មាន'}
- ស្ថានភាព Email: ${creds.linkedEmail || 'ស្អាត ១០០%'}

សូមប្តូរពាក្យសម្ងាត់ថ្មីភ្លាមៗក្រោយពេល Login!`;

    const element = document.createElement('a');
    const file = new Blob([fullText], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = `Receipt_${purchase.invoiceId}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="modal-overlay">
      <div 
        className="modal-content animate-modal"
        style={{
          maxWidth: '700px',
          padding: '28px',
          borderRadius: '24px',
          background: '#0d1322',
          border: '1px solid rgba(99, 102, 241, 0.35)'
        }}
      >
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '20px',
          borderBottom: '1px solid var(--border-color)',
          paddingBottom: '16px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              background: 'rgba(16, 185, 129, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--accent-green)'
            }}>
              <History size={22} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>
                ប្រវត្តិគណនីដែលបានទិញ
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>
                ព័ត៌មានគណនី Roblox ដែលអ្នកបានទិញជោគជ័យតាមបាគង KHQR
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="btn btn-ghost"
            style={{ padding: '6px', borderRadius: '50%' }}
            title="បិទ"
          >
            <X size={18} />
          </button>
        </div>

        {/* Purchases List */}
        {purchases && purchases.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {purchases.map((purchase, idx) => {
              const creds = purchase.credentials || {};
              const isPasswordVisible = revealedPasswords[idx];

              return (
                <div
                  key={idx}
                  style={{
                    background: 'rgba(15, 23, 42, 0.75)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '16px',
                    padding: '18px',
                    position: 'relative'
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    marginBottom: '12px',
                    gap: '12px'
                  }}>
                    <div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--accent-green)', fontWeight: 600 }}>
                        ✓ ទិញជោគជ័យ | វិក្កយបត្រ #{purchase.invoiceId}
                      </div>
                      <h4 style={{ fontSize: '0.98rem', fontWeight: 700, color: '#ffffff', marginTop: '2px' }}>
                        {purchase.title}
                      </h4>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>
                        {purchase.purchaseDate} • {formatUSD(purchase.priceUsd)}
                      </div>
                    </div>

                    <button
                      onClick={() => handleDownloadSingle(purchase)}
                      className="btn btn-secondary"
                      style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                      title="ទាញយកវិក្កយបត្រ"
                    >
                      <Download size={14} />
                      <span>វិក្កយបត្រ</span>
                    </button>
                  </div>

                  {/* Credentials Box */}
                  <div style={{
                    background: 'rgba(7, 9, 14, 0.8)',
                    borderRadius: '12px',
                    padding: '12px 14px',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '10px',
                    border: '1px solid var(--border-color)',
                    fontSize: '0.86rem'
                  }}>
                    <div>
                      <span style={{ color: 'var(--text-dim)', fontSize: '0.76rem', display: 'block' }}>ឈ្មោះគណនី (Username)៖</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '2px' }}>
                        <code style={{ fontWeight: 700, color: '#ffffff' }}>{creds.username}</code>
                        <button
                          onClick={() => handleCopy(creds.username, `user-${idx}`)}
                          style={{ background: 'none', border: 'none', color: '#818cf8', cursor: 'pointer' }}
                          title="ចម្លងឈ្មោះគណនី"
                        >
                          {copiedId === `user-${idx}` ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <span style={{ color: 'var(--text-dim)', fontSize: '0.76rem', display: 'block' }}>ពាក្យសម្ងាត់ (Password)៖</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '2px' }}>
                        <code style={{ fontWeight: 700, color: '#38bdf8' }}>
                          {isPasswordVisible ? creds.password : '••••••••••'}
                        </code>
                        <button
                          onClick={() => togglePassword(idx)}
                          style={{ background: 'none', border: 'none', color: 'var(--text-dim)', cursor: 'pointer' }}
                          title={isPasswordVisible ? 'លាក់ពាក្យសម្ងាត់' : 'បង្ហាញពាក្យសម្ងាត់'}
                        >
                          {isPasswordVisible ? <EyeOff size={14} /> : <Eye size={14} />}
                        </button>
                        <button
                          onClick={() => handleCopy(creds.password, `pass-${idx}`)}
                          style={{ background: 'none', border: 'none', color: '#818cf8', cursor: 'pointer' }}
                          title="ចម្លងពាក្យសម្ងាត់"
                        >
                          {copiedId === `pass-${idx}` ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
                        </button>
                      </div>
                    </div>

                    {creds.backupCode && (
                      <div>
                        <span style={{ color: 'var(--text-dim)', fontSize: '0.76rem', display: 'block' }}>លេខកូដ PIN 2FA៖</span>
                        <code style={{ fontWeight: 700, color: '#fbbf24', marginTop: '2px', display: 'block' }}>
                          {creds.backupCode}
                        </code>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div style={{
            textAlign: 'center',
            padding: '40px 20px',
            color: 'var(--text-muted)'
          }}>
            <p>មិនទាន់មានប្រវត្តិទិញគណនីនៅឡើយទេ។</p>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-dim)', marginTop: '4px' }}>
              នៅពេលអ្នកទិញគណនី Roblox ណាមួយ ព័ត៌មាននឹងបង្ហាញនៅទីនេះដោយស្វ័យប្រវត្តិ។
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
