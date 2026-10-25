import React, { useState } from 'react';
import { 
  History, X, Copy, Check, Eye, EyeOff, Download, 
  RefreshCw, Search, CloudCheck, Database, CheckCircle2, AlertCircle 
} from 'lucide-react';
import { formatUSD } from '../utils/currency';
import { lookupPurchaseByInvoiceApi } from '../utils/api';

export const PurchaseHistoryModal = ({
  isOpen,
  onClose,
  purchases,
  onRefreshApi,
  isSyncing,
  apiSource,
  onAddPurchase
}) => {
  const [copiedId, setCopiedId] = useState(null);
  const [revealedPasswords, setRevealedPasswords] = useState({});
  const [searchInvoice, setSearchInvoice] = useState('');
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchMessage, setSearchMessage] = useState(null);

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
    const fullText = `=== ព័ត៌មានគណនី ROBLOX (វិក្កយបត្រផ្លូវការពីប្រព័ន្ធ API) ===
ហាងលក់: ហាង ROBLOX KHMER
ផលិតផល: ${purchase.title}
វិក្កយបត្រ ID: ${purchase.invoiceId}
កាលបរិច្ឆេទ: ${purchase.purchaseDate}

ព័ត៌មានគណនី ROBLOX សម្រាប់ចូលលេង:
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

  // Lookup single order from Backend API by Invoice ID
  const handleLookupInvoice = async (e) => {
    e.preventDefault();
    if (!searchInvoice.trim()) return;

    setSearchLoading(true);
    setSearchMessage(null);

    const result = await lookupPurchaseByInvoiceApi(searchInvoice.trim());
    setSearchLoading(false);

    if (result && result.success && result.data) {
      if (onAddPurchase) {
        onAddPurchase(result.data);
      }
      setSearchMessage({ type: 'success', text: `រកឃើញវិក្កយបត្រ ${result.data.invoiceId} ជោគជ័យពី API!` });
      setSearchInvoice('');
    } else {
      setSearchMessage({ type: 'error', text: 'រកមិនឃើញវិក្កយបត្រនេះនៅលើប្រព័ន្ធ Backend ឡើយ។' });
    }

    setTimeout(() => setSearchMessage(null), 4000);
  };

  return (
    <div className="modal-overlay">
      <div 
        className="modal-content animate-modal"
        style={{
          maxWidth: '740px',
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
          paddingBottom: '16px',
          flexWrap: 'wrap',
          gap: '12px'
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
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>
                  ប្រវត្តិគណនីដែលបានទិញ
                </h3>
                <span className="badge badge-cyan" style={{ fontSize: '0.7rem', padding: '2px 8px' }}>
                  Backend API (/api/purchases)
                </span>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>
                ទិន្នន័យគណនី Roblox ដែលបានបញ្ជាក់ការទូទាត់ពី Backend API
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {onRefreshApi && (
              <button
                onClick={onRefreshApi}
                disabled={isSyncing}
                className="btn btn-secondary"
                style={{ padding: '6px 12px', fontSize: '0.8rem', gap: '6px' }}
                title="ទាញយកទិន្នន័យថ្មីពី Backend API"
              >
                <RefreshCw size={13} style={{ animation: isSyncing ? 'spin 1s linear infinite' : 'none' }} />
                <span>{isSyncing ? 'កំពុងទាញ...' : 'ទាញពី API'}</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="btn btn-ghost"
              style={{ padding: '6px', borderRadius: '50%' }}
              title="បិទ"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Search by Invoice ID from Backend API */}
        <form 
          onSubmit={handleLookupInvoice}
          style={{
            display: 'flex',
            gap: '8px',
            marginBottom: '20px',
            background: 'rgba(15, 23, 42, 0.6)',
            padding: '8px',
            borderRadius: '14px',
            border: '1px solid rgba(255, 255, 255, 0.08)'
          }}
        >
          <div style={{ position: 'relative', flex: 1 }}>
            <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
            <input
              type="text"
              placeholder="ស្វែងរកតាមលេខវិក្កយបត្រ (ឧទាហរណ៍៖ RBX-839201) ពី Backend API..."
              value={searchInvoice}
              onChange={(e) => setSearchInvoice(e.target.value)}
              className="form-input"
              style={{
                paddingLeft: '36px',
                fontSize: '0.85rem',
                border: 'none',
                background: 'transparent'
              }}
            />
          </div>
          <button
            type="submit"
            disabled={searchLoading}
            className="btn btn-primary"
            style={{ padding: '8px 16px', fontSize: '0.84rem' }}
          >
            {searchLoading ? 'កំពុងស្វែងរក...' : 'ទាញពី API'}
          </button>
        </form>

        {searchMessage && (
          <div style={{
            padding: '10px 14px',
            borderRadius: '10px',
            marginBottom: '16px',
            fontSize: '0.85rem',
            background: searchMessage.type === 'success' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
            color: searchMessage.type === 'success' ? '#34d399' : '#f87171',
            border: `1px solid ${searchMessage.type === 'success' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`
          }}>
            {searchMessage.text}
          </div>
        )}

        {/* Purchases List */}
        {purchases && purchases.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxHeight: '55vh', overflowY: 'auto' }}>
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
                    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                    gap: '12px',
                    border: '1px solid rgba(255, 255, 255, 0.05)'
                  }}>
                    <div>
                      <span style={{ color: 'var(--text-dim)', fontSize: '0.76rem', display: 'block' }}>ឈ្មោះគណនី (Username)៖</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '2px' }}>
                        <code style={{ fontWeight: 700, color: '#38bdf8' }}>{creds.username}</code>
                        <button
                          onClick={() => handleCopy(creds.username, `user-${idx}`)}
                          style={{ background: 'none', border: 'none', color: '#818cf8', cursor: 'pointer' }}
                          title="ចម្លងឈ្មោះ"
                        >
                          {copiedId === `user-${idx}` ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <span style={{ color: 'var(--text-dim)', fontSize: '0.76rem', display: 'block' }}>ពាក្យសម្ងាត់ (Password)៖</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '2px' }}>
                        <code style={{ fontWeight: 700, color: '#a78bfa' }}>
                          {isPasswordVisible ? creds.password : '••••••••••••'}
                        </code>
                        <button
                          onClick={() => togglePassword(idx)}
                          style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
                          title={isPasswordVisible ? 'លាក់' : 'បង្ហាញ'}
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
            <p>មិនទាន់មានប្រវត្តិទិញគណនីនៅលើប្រព័ន្ធ Backend API ឡើយ។</p>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-dim)', marginTop: '4px' }}>
              នៅពេលអ្នកទិញគណនី Roblox ណាមួយ ព័ត៌មាននឹងបង្ហាញនៅទីនេះដោយស្វ័យប្រវត្តិ។
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
