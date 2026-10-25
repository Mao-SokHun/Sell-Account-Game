import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  CheckCircle, Copy, Check, Eye, EyeOff, 
  Download, ExternalLink, ShieldAlert, Key, 
  User, Lock, X, FileText
} from 'lucide-react';

export const AccountSuccessModal = ({ 
  product, 
  orderInfo, 
  onClose 
}) => {
  const [copiedField, setCopiedField] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [copiedAll, setCopiedAll] = useState(false);

  const creds = product.credentials || {
    username: 'RobloxUser_' + product.id,
    password: 'Password@2026',
    backupCode: 'PIN-9921',
    linkedEmail: 'មិនទាន់ភ្ជាប់ (ស្អាត ១០០%)',
    note: 'សូមប្តូរលេខសម្ងាត់ភ្លាមៗ'
  };

  // Launch confetti on mount
  useEffect(() => {
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      console.log('Confetti effect');
    }
  }, []);

  // Copy single field
  const handleCopy = (text, fieldName) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  // Copy all details
  const handleCopyAll = () => {
    const fullText = `=== ព័ត៌មានគណនី ROBLOX (វិក្កយបត្រផ្លូវការ) ===
ហាងលក់: ហាង ROBLOX KHMER
ផលិតផល: ${product.title}
វិក្កយបត្រ ID: ${orderInfo?.invoiceId || 'RBX-' + Date.now()}
កាលបរិច្ឆេទ: ${new Date().toLocaleString('km-KH')}

[ព័ត៌មានគណនីសម្រាប់ចូលលេង]
ឈ្មោះគណនី (Username): ${creds.username}
ពាក្យសម្ងាត់ (Password): ${creds.password}
លេខកូដសុវត្ថិភាព (PIN/2FA): ${creds.backupCode || 'គ្មាន'}
ស្ថានភាព Email: ${creds.linkedEmail}

[សេចក្ដីណែនាំបន្ទាន់]
១. ចូលទៅកាន់គេហទំព័រ www.roblox.com
២. Login ដោយប្រើ Username និង Password ខាងលើ
៣. ចូល Settings -> Account Info -> ដាក់ Email និងលេខទូរស័ព្ទផ្ទាល់ខ្លួនរបស់អ្នក
៤. ផ្លាស់ប្តូរលេខសម្ងាត់ថ្មី ដើម្បីគ្រប់គ្រងគណនីផ្ដាច់មុខ ១០០%!`;

    navigator.clipboard.writeText(fullText);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  // Download .txt file
  const handleDownloadTxt = () => {
    const fullText = `ហាង ROBLOX KHMER - ព័ត៌មានគណនី ROBLOX ផ្លូវការ
=============================================
ផលិតផល: ${product.title}
វិក្កយបត្រ ID: ${orderInfo?.invoiceId || 'RBX-' + Date.now()}
កាលបរិច្ឆេទ: ${new Date().toLocaleString()}

ព័ត៌មានគណនីសម្រាប់ចូលលេង (LOGIN):
---------------------------------------------
- ឈ្មោះគណនី (Username): ${creds.username}
- ពាក្យសម្ងាត់ (Password): ${creds.password}
- លេខកូដសុវត្ថិភាព (PIN/2FA): ${creds.backupCode || 'គ្មាន'}
- ស្ថានភាព Email: ${creds.linkedEmail}

ជំហានសុវត្ថិភាពបន្ទាន់ (SECURITY STEPS):
១. ចូល roblox.com ហើយ Login ជាមួយ Username & Password ខាងលើ
២. ចូល Settings -> Account Info -> បន្ថែម Email និងលេខទូរស័ព្ទផ្ទាល់ខ្លួន
៣. ផ្លាស់ប្តូរលេខសម្ងាត់ថ្មីភ្លាមៗ
=============================================`;

    const element = document.createElement('a');
    const file = new Blob([fullText], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = `Roblox_Account_${creds.username}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="modal-overlay">
      <div 
        className="modal-content animate-modal"
        style={{
          maxWidth: '680px',
          padding: '0',
          overflow: 'hidden',
          border: '1px solid rgba(16, 185, 129, 0.4)',
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.9), 0 0 35px rgba(16, 185, 129, 0.3)'
        }}
      >
        {/* Header Ribbon */}
        <div style={{
          background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
          padding: '24px 28px',
          color: '#ffffff',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{
              width: '46px',
              height: '46px',
              borderRadius: '14px',
              background: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(8px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
            }}>
              <CheckCircle size={28} color="#ffffff" />
            </div>
            <div>
              <div style={{ fontSize: '1.28rem', fontWeight: 800 }}>
                ការទូទាត់តាមបាគងជោគជ័យ!
              </div>
              <div style={{ fontSize: '0.86rem', opacity: 0.9 }}>
                នេះជាព័ត៌មានគណនី Roblox របស់អ្នកសម្រាប់ចូលលេង (Login)
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="btn btn-ghost"
            style={{
              padding: '6px',
              borderRadius: '50%',
              color: '#ffffff',
              background: 'rgba(0,0,0,0.1)'
            }}
            title="បិទ"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content Body */}
        <div style={{ padding: '24px 28px' }}>
          
          {/* Order Meta Bar */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '10px',
            padding: '12px 16px',
            background: 'rgba(255, 255, 255, 0.03)',
            borderRadius: '12px',
            border: '1px solid var(--border-color)',
            marginBottom: '20px',
            fontSize: '0.84rem'
          }}>
            <div>
              <span style={{ color: 'var(--text-dim)' }}>វិក្កយបត្រ៖ </span>
              <strong style={{ color: '#38bdf8' }}>{orderInfo?.invoiceId || 'RBX-90182'}</strong>
            </div>
            <div>
              <span style={{ color: 'var(--text-dim)' }}>គណនី៖ </span>
              <strong style={{ color: '#ffffff' }}>{product.category} ({product.level})</strong>
            </div>
          </div>

          {/* CREDENTIALS CARD */}
          <div style={{
            background: 'rgba(15, 23, 42, 0.85)',
            border: '1px solid rgba(99, 102, 241, 0.3)',
            borderRadius: '18px',
            padding: '20px',
            marginBottom: '20px',
            position: 'relative'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '16px',
              borderBottom: '1px solid var(--border-color)',
              paddingBottom: '10px'
            }}>
              <span style={{
                fontSize: '0.95rem',
                fontWeight: 700,
                color: '#c7d2fe',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <Key size={18} color="#818cf8" />
                <span>ព័ត៌មានលម្អិតសម្រាប់ចូល Roblox</span>
              </span>

              <span className="badge badge-green">
                ស្ថានភាព៖ ត្រៀមរួចរាល់
              </span>
            </div>

            {/* Field: Username */}
            <div style={{ marginBottom: '14px' }}>
              <div style={{
                fontSize: '0.8rem',
                color: 'var(--text-muted)',
                marginBottom: '6px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <User size={13} /> ឈ្មោះគណនីចូលលេង Roblox (Username)
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: 'rgba(7, 9, 14, 0.8)',
                padding: '10px 14px',
                borderRadius: '10px',
                border: '1px solid var(--border-color)'
              }}>
                <span style={{
                  fontSize: '1.05rem',
                  fontWeight: 700,
                  color: '#ffffff',
                  fontFamily: 'monospace',
                  letterSpacing: '0.5px'
                }}>
                  {creds.username}
                </span>
                <button
                  onClick={() => handleCopy(creds.username, 'username')}
                  className="btn btn-secondary"
                  style={{ padding: '6px 12px', fontSize: '0.78rem' }}
                >
                  {copiedField === 'username' ? (
                    <>
                      <Check size={14} color="#10b981" />
                      <span>ចម្លងហើយ</span>
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      <span>ចម្លង</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Field: Password */}
            <div style={{ marginBottom: '14px' }}>
              <div style={{
                fontSize: '0.8rem',
                color: 'var(--text-muted)',
                marginBottom: '6px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <Lock size={13} /> ពាក្យសម្ងាត់ចូលលេង (Password)
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: 'rgba(7, 9, 14, 0.8)',
                padding: '10px 14px',
                borderRadius: '10px',
                border: '1px solid var(--border-color)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{
                    fontSize: '1.05rem',
                    fontWeight: 700,
                    color: '#38bdf8',
                    fontFamily: 'monospace',
                    letterSpacing: '0.5px'
                  }}>
                    {showPassword ? creds.password : '••••••••••••••••'}
                  </span>
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--text-dim)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                    title={showPassword ? 'លាក់ពាក្យសម្ងាត់' : 'បង្ហាញពាក្យសម្ងាត់'}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                <button
                  onClick={() => handleCopy(creds.password, 'password')}
                  className="btn btn-secondary"
                  style={{ padding: '6px 12px', fontSize: '0.78rem' }}
                >
                  {copiedField === 'password' ? (
                    <>
                      <Check size={14} color="#10b981" />
                      <span>ចម្លងហើយ</span>
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      <span>ចម្លង</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Field: 2FA / PIN */}
            {creds.backupCode && (
              <div style={{ marginBottom: '14px' }}>
                <div style={{
                  fontSize: '0.8rem',
                  color: 'var(--text-muted)',
                  marginBottom: '6px'
                }}>
                  លេខកូដសុវត្ថិភាព / លេខ PIN 2FA
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: 'rgba(7, 9, 14, 0.8)',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  border: '1px solid var(--border-color)'
                }}>
                  <span style={{
                    fontSize: '0.95rem',
                    fontWeight: 700,
                    color: '#fbbf24',
                    fontFamily: 'monospace'
                  }}>
                    {creds.backupCode}
                  </span>
                  <button
                    onClick={() => handleCopy(creds.backupCode, 'pin')}
                    className="btn btn-secondary"
                    style={{ padding: '6px 12px', fontSize: '0.78rem' }}
                  >
                    {copiedField === 'pin' ? (
                      <>
                        <Check size={14} color="#10b981" />
                        <span>ចម្លងហើយ</span>
                      </>
                    ) : (
                      <>
                        <Copy size={14} />
                        <span>ចម្លង</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Email Status */}
            <div style={{
              fontSize: '0.84rem',
              color: 'var(--text-dim)',
              padding: '6px 0',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <span>ស្ថានភាព Email៖</span>
              <strong style={{ color: 'var(--accent-green)' }}>{creds.linkedEmail}</strong>
            </div>
          </div>

          {/* Action Buttons: Copy All & Download .txt */}
          <div style={{
            display: 'flex',
            gap: '12px',
            flexWrap: 'wrap',
            marginBottom: '22px'
          }}>
            <button
              onClick={handleCopyAll}
              className="btn btn-primary"
              style={{ flex: 1, padding: '12px 18px', fontSize: '0.9rem' }}
            >
              {copiedAll ? <Check size={18} /> : <Copy size={18} />}
              <span>{copiedAll ? 'បានចម្លងទាំងអស់ជោគជ័យ!' : 'ចម្លងព័ត៌មានទាំងអស់'}</span>
            </button>

            <button
              onClick={handleDownloadTxt}
              className="btn btn-secondary"
              style={{ padding: '12px 18px', fontSize: '0.9rem' }}
            >
              <Download size={18} />
              <span>ទាញយកវិក្កយបត្រ (.txt)</span>
            </button>

            <a
              href="https://www.roblox.com/login"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
              style={{ padding: '12px 18px', fontSize: '0.9rem' }}
            >
              <span>ចូលទៅកាន់គេហទំព័រ Roblox</span>
              <ExternalLink size={16} />
            </a>
          </div>

          {/* Urgent Security Guide */}
          <div style={{
            background: 'rgba(239, 68, 68, 0.06)',
            border: '1px solid rgba(239, 68, 68, 0.25)',
            borderRadius: '14px',
            padding: '16px',
            marginBottom: '20px'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: '#f87171',
              fontWeight: 700,
              fontSize: '0.9rem',
              marginBottom: '8px'
            }}>
              <ShieldAlert size={18} />
              <span>សេចក្តីណែនាំបន្ទាន់ក្នុងការការពារគណនី៖</span>
            </div>
            <ol style={{
              paddingLeft: '20px',
              fontSize: '0.84rem',
              color: 'var(--text-muted)',
              lineHeight: 1.7
            }}>
              <li>ចូលទៅកាន់គេហទំព័រ <strong>roblox.com</strong> ហើយ Login ជាមួយ Username & Password ខាងលើ</li>
              <li>ចូលទៅកាន់ <strong>Settings &gt; Account Info</strong> ដើម្បីដាក់ Email និងលេខទូរស័ព្ទផ្ទាល់ខ្លួនរបស់អ្នក</li>
              <li>ផ្លាស់ប្តូរលេខសម្ងាត់ (Password) ថ្មីជាបន្ទាន់ ដើម្បីគ្រប់គ្រងគណនីផ្តាច់មុខ ១០០%</li>
            </ol>
          </div>

          {/* Footer note & Dismiss */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '0.8rem',
            color: 'var(--text-dim)'
          }}>
            <span>* ព័ត៌មាននេះត្រូវបានរក្សាទុកក្នុងទំព័រ "គណនីបានទិញ" ដោយស្វ័យប្រវត្តិ</span>
            <button
              onClick={onClose}
              className="btn btn-ghost"
              style={{ padding: '6px 14px', fontSize: '0.84rem' }}
            >
              បិទផ្ទាំងនេះ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
