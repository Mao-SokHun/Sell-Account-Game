import React from 'react';
import { 
  ArrowLeft, ShieldCheck, RefreshCw, Lock, FileCheck2, 
  AlertTriangle, MessageCircle, Send, CheckCircle2, 
  HelpCircle, Sparkles, Clock, ExternalLink, ArrowRight
} from 'lucide-react';

export const WarrantySupportPage = ({ onBack, onGoToStore }) => {
  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto 80px auto', padding: '10px 0' }}>
      {/* Top Breadcrumb & Back */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px',
        marginBottom: '24px'
      }}>
        <button
          onClick={onBack}
          className="btn btn-secondary"
          style={{ padding: '8px 16px', fontSize: '0.88rem' }}
        >
          <ArrowLeft size={16} />
          <span>ត្រឡប់ទៅហាងទំនិញ</span>
        </button>

        <div style={{ fontSize: '0.86rem', color: 'var(--text-muted)' }}>
          <span>ទំព័រដើម</span> &gt; <span style={{ color: '#fff' }}>គោលការណ៍ធានា និងជំនួយ (Warranty & Support)</span>
        </div>
      </div>

      {/* Header Banner */}
      <div className="glass-panel" style={{
        padding: '36px 30px',
        borderRadius: '24px',
        textAlign: 'center',
        marginBottom: '36px',
        background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.12) 0%, rgba(6, 182, 212, 0.1) 100%)',
        border: '1px solid rgba(16, 185, 129, 0.3)'
      }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          background: 'rgba(16, 185, 129, 0.2)',
          border: '1px solid rgba(16, 185, 129, 0.4)',
          borderRadius: '999px',
          padding: '6px 14px',
          fontSize: '0.82rem',
          color: '#6ee7b7',
          fontWeight: 700,
          marginBottom: '16px'
        }}>
          <ShieldCheck size={14} color="#10b981" />
          <span>ការធានាសុវត្ថិភាព និងទំនុកចិត្តខ្ពស់បំផុត ១០០%</span>
        </div>

        <h1 style={{
          fontSize: '2rem',
          fontWeight: 900,
          color: '#ffffff',
          marginBottom: '12px',
          lineHeight: 1.4
        }}>
          គោលការណ៍ធានា និងសេវាជំនួយអតិថិជន
        </h1>

        <p style={{
          fontSize: '0.98rem',
          color: 'var(--text-muted)',
          maxWidth: '680px',
          margin: '0 auto',
          lineHeight: 1.7
        }}>
          យើងខ្ញុំប្តេជ្ញាផ្តល់ជូននូវគណនីស្អាត គ្មានបញ្ហា និងមានការគាំទ្រយ៉ាងរហ័សបំផុតតាម Telegram 24/7។
        </p>
      </div>

      {/* 4 Core Guarantees Grid */}
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{
          fontSize: '1.25rem',
          fontWeight: 800,
          color: '#ffffff',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <Sparkles size={20} color="var(--primary)" />
          <span>ការធានាស្នូលទាំង ៤ ចំណុចពីហាងយើងខ្ញុំ</span>
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '20px'
        }}>
          {/* Guarantee 1 */}
          <div className="glass-panel" style={{
            padding: '24px',
            borderRadius: '18px',
            border: '1px solid rgba(16, 185, 129, 0.25)',
            background: 'linear-gradient(180deg, rgba(16, 185, 129, 0.05) 0%, rgba(15, 23, 42, 0.6) 100%)'
          }}>
            <div style={{
              width: '46px',
              height: '46px',
              borderRadius: '12px',
              background: 'rgba(16, 185, 129, 0.2)',
              border: '1px solid rgba(16, 185, 129, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '16px'
            }}>
              <ShieldCheck size={24} color="#10b981" />
            </div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>
              ១. ធានា Clean Account ១០០%
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
              គណនីទាំងអស់គ្មានជាប់ Email, លេខទូរស័ព្ទ, គ្មាន 2FA, និងគ្មាន PIN កូដឡើយ។ អ្នកទិញជាម្ចាស់ដំបូង និងផ្តាច់មុខពេញលេញ។
            </p>
          </div>

          {/* Guarantee 2 */}
          <div className="glass-panel" style={{
            padding: '24px',
            borderRadius: '18px',
            border: '1px solid rgba(99, 102, 241, 0.25)',
            background: 'linear-gradient(180deg, rgba(99, 102, 241, 0.05) 0%, rgba(15, 23, 42, 0.6) 100%)'
          }}>
            <div style={{
              width: '46px',
              height: '46px',
              borderRadius: '12px',
              background: 'rgba(99, 102, 241, 0.2)',
              border: '1px solid rgba(99, 102, 241, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '16px'
            }}>
              <RefreshCw size={24} color="#818cf8" />
            </div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>
              ២. ធានាប្តូរថ្មីភ្លាមៗ (Instant Replacement)
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
              បើ Login មិនចូលភ្លាមៗក្រោយពេលទិញ យើងខ្ញុំនឹងពិនិត្យនិងប្តូរគណនីថ្មីដែលមានតម្លៃស្មើគ្នា ឬសងប្រាក់វិញភ្លាមៗក្នុងរយៈពេល ៥-១០ នាទី។
            </p>
          </div>

          {/* Guarantee 3 */}
          <div className="glass-panel" style={{
            padding: '24px',
            borderRadius: '18px',
            border: '1px solid rgba(234, 179, 8, 0.25)',
            background: 'linear-gradient(180deg, rgba(234, 179, 8, 0.05) 0%, rgba(15, 23, 42, 0.6) 100%)'
          }}>
            <div style={{
              width: '46px',
              height: '46px',
              borderRadius: '12px',
              background: 'rgba(234, 179, 8, 0.2)',
              border: '1px solid rgba(234, 179, 8, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '16px'
            }}>
              <Lock size={24} color="#eab308" />
            </div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>
              ៣. កម្មសិទ្ធិផ្តាច់មុខមួយជីវិត
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
              ក្រោយពេលអ្នកទិញបាន Login និងភ្ជាប់ Email ផ្ទាល់ខ្លួនជោគជ័យ គ្មានបុគ្គល ឬប្រព័ន្ធណាអាចទាញយកគណនីនោះត្រឡប់មកវិញបានជាដាច់ខាត។
            </p>
          </div>

          {/* Guarantee 4 */}
          <div className="glass-panel" style={{
            padding: '24px',
            borderRadius: '18px',
            border: '1px solid rgba(6, 182, 212, 0.25)',
            background: 'linear-gradient(180deg, rgba(6, 182, 212, 0.05) 0%, rgba(15, 23, 42, 0.6) 100%)'
          }}>
            <div style={{
              width: '46px',
              height: '46px',
              borderRadius: '12px',
              background: 'rgba(6, 182, 212, 0.2)',
              border: '1px solid rgba(6, 182, 212, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '16px'
            }}>
              <FileCheck2 size={24} color="#06b6d4" />
            </div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>
              ៤. វិក្កយបត្រឌីជីថលស្របច្បាប់
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
              រាល់ការទិញសុទ្ធតែមានលេខ Order ID, Bakong Reference Number និងអាចទាញយកជារូបភាពវិក្កយបត្រ (Invoice Image) ទុកជាភស្តុតាងផ្លូវការ។
            </p>
          </div>
        </div>
      </div>

      {/* Exclusions / What is NOT covered */}
      <div className="glass-panel" style={{
        padding: '28px 26px',
        borderRadius: '20px',
        marginBottom: '40px',
        border: '1px solid rgba(239, 68, 68, 0.3)',
        background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.06) 0%, rgba(15, 23, 42, 0.8) 100%)'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '16px'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            background: 'rgba(239, 68, 68, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <AlertTriangle size={22} color="#ef4444" />
          </div>
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#f87171', margin: 0 }}>
              លក្ខខណ្ឌដែលមិនរាប់បញ្ចូលក្នុងការធានា (Exclusions)
            </h3>
            <span style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>
              សូមអានដោយយកចិត្តទុកដាក់ ដើម្បីការពារសុវត្ថិភាពគណនីរបស់អ្នក
            </span>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '14px',
          marginTop: '16px'
        }}>
          <div style={{
            background: 'rgba(0, 0, 0, 0.25)',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            borderRadius: '12px',
            padding: '14px 16px',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '10px'
          }}>
            <span style={{ color: '#ef4444', fontWeight: 800 }}>•</span>
            <span style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              យកគណនីទៅប្រើប្រាស់ <strong>Cheat, Script, Exploit</strong> ឬ Bot នៅក្នុងហ្គេមបណ្តាលឱ្យ Roblox ធ្វើការ Ban គណនី។
            </span>
          </div>

          <div style={{
            background: 'rgba(0, 0, 0, 0.25)',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            borderRadius: '12px',
            padding: '14px 16px',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '10px'
          }}>
            <span style={{ color: '#ef4444', fontWeight: 800 }}>•</span>
            <span style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              ការចែករំលែក Username/Password ឱ្យអ្នកដទៃ ឬលេងរួមគ្នាជាច្រើននាក់បណ្តាលឱ្យបាត់បង់របស់របរក្នុងហ្គេម។
            </span>
          </div>

          <div style={{
            background: 'rgba(0, 0, 0, 0.25)',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            borderRadius: '12px',
            padding: '14px 16px',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '10px'
          }}>
            <span style={{ color: '#ef4444', fontWeight: 800 }}>•</span>
            <span style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              ការធ្វេសប្រហែសមិនព្រមដាក់ Email និងប្តូរលេខសម្ងាត់ថ្មីផ្ទាល់ខ្លួនភ្លាមៗក្រោយពេលទិញ។
            </span>
          </div>

          <div style={{
            background: 'rgba(0, 0, 0, 0.25)',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            borderRadius: '12px',
            padding: '14px 16px',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '10px'
          }}>
            <span style={{ color: '#ef4444', fontWeight: 800 }}>•</span>
            <span style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              ការចាញ់បោកគេតាមរយៈតំណភ្ជាប់ក្លែងក្លាយ (Phishing Links) ឬ Web Scam ក្រៅពី roblox.com ផ្លូវការ។
            </span>
          </div>
        </div>
      </div>

      {/* 24/7 Telegram Support Box */}
      <div className="glass-panel" style={{
        padding: '36px 30px',
        borderRadius: '24px',
        marginBottom: '40px',
        border: '1px solid rgba(14, 165, 233, 0.35)',
        background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.12) 0%, rgba(99, 102, 241, 0.12) 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
          alignItems: 'center'
        }}>
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(14, 165, 233, 0.2)',
              border: '1px solid rgba(14, 165, 233, 0.4)',
              borderRadius: '999px',
              padding: '6px 14px',
              fontSize: '0.82rem',
              color: '#7dd3fc',
              fontWeight: 700,
              marginBottom: '14px'
            }}>
              <Clock size={14} color="#38bdf8" />
              <span>ឆ្លើយតបរហ័សក្រោម ៥ នាទី | ២៤ ម៉ោង / ៧ ថ្ងៃ</span>
            </div>

            <h2 style={{
              fontSize: '1.6rem',
              fontWeight: 900,
              color: '#ffffff',
              marginBottom: '10px',
              lineHeight: 1.3
            }}>
              ត្រូវការជំនួយ ឬមានចម្ងល់?
            </h2>

            <p style={{
              fontSize: '0.94rem',
              color: 'var(--text-muted)',
              lineHeight: 1.7,
              marginBottom: '20px'
            }}>
              ក្រុមការងារជំនួយការបច្ចេកទេសប្រចាំការរង់ចាំដោះស្រាយជូនលោកអ្នកគ្រប់ពេលវេលា។ ប្រសិនបើលោកអ្នកទិញហើយជួបបញ្ហា សូមទាក់ទងមកយើងខ្ញុំភ្លាមៗ!
            </p>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              fontSize: '0.86rem',
              color: 'var(--text-muted)',
              marginBottom: '24px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle2 size={16} color="#10b981" />
                <span>សូមផ្ញើរូបភាពវិក្កយបត្រ (Invoice Image) ឬ Order ID</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle2 size={16} color="#10b981" />
                <span>បញ្ជាក់ឈ្មោះគណនីដែលបានទិញ និងបញ្ហាដែលបានជួបប្រទះ</span>
              </div>
            </div>

            <a
              href="https://t.me/RobloxKhmerSupport"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '14px 28px',
                fontSize: '1.02rem',
                fontWeight: 800,
                background: 'linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%)',
                color: '#fff',
                textDecoration: 'none',
                borderRadius: '14px',
                boxShadow: '0 8px 24px rgba(14, 165, 233, 0.35)'
              }}
            >
              <Send size={18} />
              <span>ទាក់ទងតាម Telegram Support</span>
              <ExternalLink size={16} />
            </a>
          </div>

          {/* Right Telegram Card Info */}
          <div style={{
            background: 'rgba(15, 23, 42, 0.7)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '20px',
            padding: '24px',
            textAlign: 'center'
          }}>
            <div style={{
              width: '68px',
              height: '68px',
              borderRadius: '20px',
              background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px auto',
              boxShadow: '0 8px 20px rgba(14, 165, 233, 0.3)'
            }}>
              <MessageCircle size={36} color="#ffffff" />
            </div>

            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#fff', marginBottom: '6px' }}>
              Telegram Official Support
            </h3>
            <p style={{ fontSize: '0.86rem', color: '#38bdf8', fontWeight: 700, marginBottom: '14px' }}>
              @RobloxKhmerSupport
            </p>

            <div style={{
              background: 'rgba(0, 0, 0, 0.3)',
              borderRadius: '12px',
              padding: '12px',
              fontSize: '0.82rem',
              color: 'var(--text-muted)',
              lineHeight: 1.6
            }}>
              ពេលវេលាធ្វើការ: <strong>២៤ ម៉ោង / ២៤ ម៉ោង</strong><br />
              ថ្ងៃចន្ទ ដល់ ថ្ងៃអាទិត្យ (រួមទាំងថ្ងៃបុណ្យ)
            </div>
          </div>
        </div>
      </div>

      {/* CTA Bottom */}
      <div style={{
        textAlign: 'center',
        padding: '30px 20px',
        background: 'rgba(255, 255, 255, 0.02)',
        borderRadius: '20px',
        border: '1px solid rgba(255, 255, 255, 0.06)'
      }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', marginBottom: '10px' }}>
          ត្រៀមខ្លួនជ្រើសរើសគណនីក្នុងក្តីស្រមៃហើយឬនៅ?
        </h3>
        <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
          ស្កេនបាគង KHQR ទទួលគណនីភ្លាមៗ ធានាសុវត្ថិភាពខ្ពស់បំផុត ១០០%
        </p>
        <button
          onClick={onGoToStore || onBack}
          className="btn btn-primary"
          style={{
            padding: '12px 28px',
            fontSize: '0.98rem',
            fontWeight: 800,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <span>ចូលទៅកាន់ហាងទំនិញ</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};
