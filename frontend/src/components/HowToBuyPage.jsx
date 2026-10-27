import React from 'react';
import { 
  ArrowLeft, ShoppingBag, QrCode, Key, ShieldCheck, 
  CheckCircle2, Smartphone, ExternalLink, HelpCircle, Lock,
  ArrowRight, ChevronRight
} from 'lucide-react';

export const HowToBuyPage = ({ onBack, onGoToStore }) => {
  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto 80px auto', padding: '10px 0' }}>
      {/* Top Breadcrumb & Back - Unified Modern Strip */}
      {/* Sleek Minimalist Top Navigation */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        marginBottom: '20px',
        whiteSpace: 'nowrap'
      }}>
        <button
          onClick={onBack}
          className="btn btn-secondary"
          style={{
            padding: '7px 14px',
            fontSize: '0.84rem',
            borderRadius: '10px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            cursor: 'pointer',
            fontWeight: 700,
            color: '#f8fafc',
            flexShrink: 0
          }}
        >
          <ArrowLeft size={16} />
          <span>ត្រឡប់ក្រោយ</span>
        </button>

        <span style={{ color: 'rgba(255, 255, 255, 0.2)', userSelect: 'none', flexShrink: 0 }}>/</span>

        <span style={{
          fontSize: '0.84rem',
          color: '#ffffff',
          fontWeight: 600,
          whiteSpace: 'nowrap'
        }}>
          របៀបទិញគណនី (How to Buy)
        </span>
      </div>

      {/* Header Banner */}
      <div className="glass-panel" style={{
        padding: '36px 30px',
        borderRadius: '24px',
        textAlign: 'center',
        marginBottom: '36px',
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.12) 0%, rgba(6, 182, 212, 0.1) 100%)',
        border: '1px solid rgba(99, 102, 241, 0.3)'
      }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(99, 102, 241, 0.2)',
          border: '1px solid rgba(99, 102, 241, 0.4)',
          borderRadius: '999px',
          padding: '6px 16px',
          fontSize: '0.82rem',
          color: '#c7d2fe',
          fontWeight: 700,
          marginBottom: '16px'
        }}>
          <span>ប្រព័ន្ធស្វ័យប្រវត្តិ ២៤ ម៉ោង - មិនបាច់ចុះឈ្មោះ</span>
        </div>

        <h1 style={{
          fontSize: '2rem',
          fontWeight: 900,
          color: '#ffffff',
          marginBottom: '12px',
          lineHeight: 1.4
        }}>
          របៀបទិញគណនី Game លើ MIRA STORE ងាយៗ ៣ ជំហាន
        </h1>

        <p style={{
          fontSize: '0.98rem',
          color: 'var(--text-muted)',
          maxWidth: '680px',
          margin: '0 auto',
          lineHeight: 1.7
        }}>
          ស្កេនទូទាត់ប្រាក់តាមស្តង់ដារ <strong>Bakong KHQR</strong> ពីគ្រប់ធនាគារក្នុងប្រទេសកម្ពុជា ទទួលបាន Username និង Password ភ្លាមៗក្នុងរយៈពេល ៥ វិនាទី!
        </p>
      </div>

      {/* 3 Steps Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
        gap: '24px',
        marginBottom: '40px'
      }}>
        {/* Step 1 */}
        <div className="glass-panel" style={{
          padding: '28px 24px',
          borderRadius: '20px',
          border: '1px solid rgba(99, 102, 241, 0.2)',
          position: 'relative'
        }}>
          <div style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            fontSize: '2.5rem',
            fontWeight: 900,
            color: 'rgba(99, 102, 241, 0.15)',
            lineHeight: 1
          }}>
            01
          </div>

          <div style={{
            width: '52px',
            height: '52px',
            borderRadius: '16px',
            background: 'rgba(99, 102, 241, 0.18)',
            border: '1px solid rgba(99, 102, 241, 0.35)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#818cf8',
            marginBottom: '18px'
          }}>
            <ShoppingBag size={26} />
          </div>

          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff', marginBottom: '10px' }}>
            ១. ជ្រើសរើសគណនី
          </h3>

          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '14px' }}>
            ចូលទៅកាន់ហាងទំនិញ រួចជ្រើសរើសគណនី Roblox ដែលអ្នកពេញចិត្ត (Blox Fruits, VIP Avatar, Pet Simulator, Blade Ball) និងពិនិត្យមើលរូបភាព និង Game Stats។
          </p>

          <div style={{
            fontSize: '0.8rem',
            color: '#38bdf8',
            background: 'rgba(56, 189, 248, 0.08)',
            padding: '8px 12px',
            borderRadius: '10px',
            border: '1px solid rgba(56, 189, 248, 0.2)'
          }}>
            💡 ព័ត៌មានលម្អិតដូចជា Level, Robux និងរបស់របរក្នុងហ្គេម ត្រូវបានបង្ហាញយ៉ាងច្បាស់លាស់។
          </div>
        </div>

        {/* Step 2 */}
        <div className="glass-panel" style={{
          padding: '28px 24px',
          borderRadius: '20px',
          border: '1px solid rgba(211, 32, 39, 0.3)',
          position: 'relative'
        }}>
          <div style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            fontSize: '2.5rem',
            fontWeight: 900,
            color: 'rgba(211, 32, 39, 0.15)',
            lineHeight: 1
          }}>
            02
          </div>

          <div style={{
            width: '52px',
            height: '52px',
            borderRadius: '16px',
            background: 'rgba(211, 32, 39, 0.18)',
            border: '1px solid rgba(211, 32, 39, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#f87171',
            marginBottom: '18px'
          }}>
            <QrCode size={26} />
          </div>

          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff', marginBottom: '10px' }}>
            ២. ស្កេនបង់ប្រាក់ KHQR
          </h3>

          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '14px' }}>
            ជ្រើសរើសរូបិយប័ណ្ណជា <strong>ដុល្លារ ($)</strong> ឬ <strong>រៀល (៛)</strong>។ បើក App ធនាគាររបស់អ្នក (ABA, Wing, ACLEDA, Bakong...) រួចស្កេន QR Code បង់ប្រាក់ជាការស្រេច។
          </p>

          <div style={{
            fontSize: '0.8rem',
            color: '#f87171',
            background: 'rgba(211, 32, 39, 0.08)',
            padding: '8px 12px',
            borderRadius: '10px',
            border: '1px solid rgba(211, 32, 39, 0.2)'
          }}>
            ⚡ គាំទ្រគ្រប់ធនាគារក្នុងស្រុកទាំងអស់ ឥតគិតថ្លៃសេវាផ្ទេរឡើយ!
          </div>
        </div>

        {/* Step 3 */}
        <div className="glass-panel" style={{
          padding: '28px 24px',
          borderRadius: '20px',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          position: 'relative'
        }}>
          <div style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            fontSize: '2.5rem',
            fontWeight: 900,
            color: 'rgba(16, 185, 129, 0.15)',
            lineHeight: 1
          }}>
            03
          </div>

          <div style={{
            width: '52px',
            height: '52px',
            borderRadius: '16px',
            background: 'rgba(16, 185, 129, 0.18)',
            border: '1px solid rgba(16, 185, 129, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#34d399',
            marginBottom: '18px'
          }}>
            <Key size={26} />
          </div>

          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff', marginBottom: '10px' }}>
            ៣. ទទួលគណនីភ្លាមៗ
          </h3>

          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '14px' }}>
            ផ្ទាំងពាក្យសម្ងាត់នឹងលោតឡើងភ្លាមៗ ដោយបង្ហាញ <strong>Username</strong> និង <strong>Password</strong> ជាមួយប៊ូតុង Copy និងប៊ូតុងទាញយកវិក្កយបត្ររូបភាព (PNG)។
          </p>

          <div style={{
            fontSize: '0.8rem',
            color: '#34d399',
            background: 'rgba(16, 185, 129, 0.08)',
            padding: '8px 12px',
            borderRadius: '10px',
            border: '1px solid rgba(16, 185, 129, 0.2)'
          }}>
            🎉 វិក្កយបត្រមានត្រាបញ្ជាក់ និង QR សម្រាប់ផ្ទៀងផ្ទាត់សុពលភាព ១០០%។
          </div>
        </div>
      </div>

      {/* Tutorial: How to Login and Link Email on Roblox.com */}
      <div className="glass-panel" style={{
        padding: '34px 30px',
        borderRadius: '24px',
        border: '1px solid rgba(16, 185, 129, 0.35)',
        background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.06) 0%, rgba(6, 182, 212, 0.06) 100%)',
        marginBottom: '40px'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '20px'
        }}>
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            background: 'rgba(16, 185, 129, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--accent-green)'
          }}>
            <Lock size={22} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#ffffff' }}>
              របៀប Login និងភ្ជាប់ Email ផ្ទាល់ខ្លួនលើគេហទំព័រ Roblox (សំខាន់បំផុត!)
            </h2>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-dim)', marginTop: '2px' }}>
              អនុវត្តតាម ៤ ចំណុចនេះដើម្បីក្លាយជាម្ចាស់គណនីផ្ដាច់មុខ ១០០% មិនបារម្ភពីរឿងបាត់បង់
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{
            display: 'flex',
            gap: '14px',
            background: 'rgba(15, 23, 42, 0.65)',
            padding: '16px 20px',
            borderRadius: '14px',
            border: '1px solid rgba(255, 255, 255, 0.06)'
          }}>
            <div style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              background: 'var(--primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '0.85rem',
              color: '#fff',
              flexShrink: 0
            }}>
              ១
            </div>
            <div>
              <div style={{ fontWeight: 700, color: '#ffffff', marginBottom: '4px' }}>
                ចូលទៅកាន់គេហទំព័រផ្លូវការ Roblox
              </div>
              <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', margin: 0 }}>
                បើក Browser លើទូរស័ព្ទ ឬកុំព្យូទ័ររបស់អ្នក រួចចូលទៅកាន់គេហទំព័រ <a href="Roblox://placeId=1234" target="_blank" rel="noopener noreferrer" style={{ color: '#38bdf8', textDecoration: 'underline' }}>www.roblox.com/login</a>
              </p>
            </div>
          </div>

          <div style={{
            display: 'flex',
            gap: '14px',
            background: 'rgba(15, 23, 42, 0.65)',
            padding: '16px 20px',
            borderRadius: '14px',
            border: '1px solid rgba(255, 255, 255, 0.06)'
          }}>
            <div style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              background: 'var(--primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '0.85rem',
              color: '#fff',
              flexShrink: 0
            }}>
              ២
            </div>
            <div>
              <div style={{ fontWeight: 700, color: '#ffffff', marginBottom: '4px' }}>
                វាយបញ្ចូល Username និង Password
              </div>
              <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', margin: 0 }}>
                ប្រើប្រាស់ <strong>Username</strong> និង <strong>Password</strong> ដែលអ្នកបានទិញពីប្រព័ន្ធយើងខ្ញុំដើម្បី Login ចូលលេង។
              </p>
            </div>
          </div>

          <div style={{
            display: 'flex',
            gap: '14px',
            background: 'rgba(15, 23, 42, 0.65)',
            padding: '16px 20px',
            borderRadius: '14px',
            border: '1px solid rgba(255, 255, 255, 0.06)'
          }}>
            <div style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              background: 'var(--primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '0.85rem',
              color: '#fff',
              flexShrink: 0
            }}>
              ៣
            </div>
            <div>
              <div style={{ fontWeight: 700, color: '#ffffff', marginBottom: '4px' }}>
                ចូល Settings &gt; Account Info ដើម្បីដាក់ Email ផ្ទាល់ខ្លួន
              </div>
              <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', margin: 0 }}>
                ចុចរូបកង់ធ្មេញ (Settings) រួចជ្រើសរើស <strong>Add Email</strong> ឬ <strong>Add Phone</strong>។ បញ្ចូល Email ផ្ទាល់ខ្លួនរបស់អ្នក ហើយចូលទៅ Confirm ក្នុង Inbox នៃ Gmail របស់អ្នក។
              </p>
            </div>
          </div>

          <div style={{
            display: 'flex',
            gap: '14px',
            background: 'rgba(15, 23, 42, 0.65)',
            padding: '16px 20px',
            borderRadius: '14px',
            border: '1px solid rgba(255, 255, 255, 0.06)'
          }}>
            <div style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              background: 'var(--accent-green)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '0.85rem',
              color: '#000',
              flexShrink: 0
            }}>
              ៤
            </div>
            <div>
              <div style={{ fontWeight: 700, color: '#ffffff', marginBottom: '4px' }}>
                ផ្លាស់ប្តូរលេខសម្ងាត់ថ្មី (Change Password)
              </div>
              <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', margin: 0 }}>
                ចុចប្តូរលេខសម្ងាត់ Password ថ្មីដែលអ្នកចងចាំបាន។ ពេលនេះគណនី Roblox នេះជារបស់អ្នកផ្ដាច់មុខ ១០០% ដោយសុវត្ថិភាពបំផុត!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="glass-panel" style={{
        padding: '30px',
        borderRadius: '24px',
        marginBottom: '36px'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          marginBottom: '20px'
        }}>
          <HelpCircle size={22} color="#38bdf8" />
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff' }}>
            សំណួរដែលសួរញឹកញាប់ (FAQ)
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '18px' }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.03)',
            padding: '18px',
            borderRadius: '16px',
            border: '1px solid var(--border-color)'
          }}>
            <h4 style={{ fontSize: '0.96rem', fontWeight: 700, color: '#38bdf8', marginBottom: '8px' }}>
              ❓ ស្កេនបង់លុយរួច តើត្រូវរង់ចាំយូរប៉ុណ្ណា?
            </h4>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
              ប្រព័ន្ធដំណើរការដោយស្វ័យប្រវត្តិ ១០០% តាមស្តង់ដារបាគង KHQR។ ពេលផ្ទេរប្រាក់រួច គណនីនឹងលោតបង្ហាញភ្លាមៗក្នុងរយៈពេល <strong>៣ ទៅ ៥ វិនាទី</strong>!
            </p>
          </div>

          <div style={{
            background: 'rgba(255, 255, 255, 0.03)',
            padding: '18px',
            borderRadius: '16px',
            border: '1px solid var(--border-color)'
          }}>
            <h4 style={{ fontSize: '0.96rem', fontWeight: 700, color: '#38bdf8', marginBottom: '8px' }}>
              ❓ តើគណនីអាចត្រូវគេ Hack យកទៅវិញបានទេ?
            </h4>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
              មិនអាចទេ! គណនីទាំងអស់គឺជា <strong>Clean Account</strong> (គ្មានជាប់ Email ឬ Phone ចាស់ឡើយ)។ ពេលអ្នកដាក់ Email និងប្តូរលេខសម្ងាត់រួច គឺក្លាយជាកម្មសិទ្ធិផ្ដាច់មុខរបស់អ្នក។
            </p>
          </div>

          <div style={{
            background: 'rgba(255, 255, 255, 0.03)',
            padding: '18px',
            borderRadius: '16px',
            border: '1px solid var(--border-color)'
          }}>
            <h4 style={{ fontSize: '0.96rem', fontWeight: 700, color: '#38bdf8', marginBottom: '8px' }}>
              ❓ តើខ្ញុំអាចស្កេនបង់ប្រាក់ជាមួយធនាគារណាខ្លះ?
            </h4>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
              លោកអ្នកអាចស្កេនបានជាមួយគ្រប់ធនាគារនៅកម្ពុជា រួមមាន <strong>ABA, Wing, ACLEDA, Canadia, Chip Mong, Bakong App</strong> និងស្ថាប័នមីក្រូហិរញ្ញវត្ថុទាំងអស់។
            </p>
          </div>

          <div style={{
            background: 'rgba(255, 255, 255, 0.03)',
            padding: '18px',
            borderRadius: '16px',
            border: '1px solid var(--border-color)'
          }}>
            <h4 style={{ fontSize: '0.96rem', fontWeight: 700, color: '#38bdf8', marginBottom: '8px' }}>
              ❓ ប្រសិនបើមានបញ្ហា តើទាក់ទងជំនួយតាមណា?
            </h4>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
              លោកអ្នកអាចទាក់ទងមកកាន់ Telegram Support ផ្លូវការរបស់យើងខ្ញុំបាន ២៤ ម៉ោង តាមរយៈ <a href="https://t.me/Mirastore10" target="_blank" rel="noopener noreferrer" style={{ color: '#38bdf8', textDecoration: 'underline', fontWeight: 700 }}>@Mirastore10</a> យើងខ្ញុំរីករាយជួយដោះស្រាយភ្លាមៗ!
            </p>
          </div>
        </div>
      </div>

      {/* Action Footer Button */}
      <div style={{ textAlign: 'center' }}>
        <button
          onClick={onGoToStore || onBack}
          className="btn btn-primary"
          style={{ padding: '14px 32px', fontSize: '1rem', gap: '10px' }}
        >
          <span>ទៅកាន់ហាងទំនិញ ដើម្បីជ្រើសរើសគណនីឥឡូវនេះ</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};
