import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import { 
  ArrowLeft, ShieldCheck, CheckCircle2, QrCode, Clock, 
  Coins, Trophy, AlertCircle, Copy, Check, 
  Lock, Eye, Flame, Smartphone, HelpCircle, Zap, ChevronRight
} from 'lucide-react';
import { formatUSD, formatKHR, generateBakongKhqrString } from '../utils/currency';

export const ProductDetail = ({ 
  product, 
  onBack, 
  onPaymentSuccess 
}) => {
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [activeImage, setActiveImage] = useState(product.image);
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState('');
  const [countdown, setCountdown] = useState(600); // 10 minutes in seconds
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  // Gallery images list
  const gallery = product.gallery && product.gallery.length > 0 
    ? product.gallery 
    : [product.image];

  // Calculate prices
  const priceUsd = product.priceUsd;
  const priceKhr = product.priceKhr || Math.round(priceUsd * 4100);
  const currentPriceText = selectedCurrency === 'USD' ? formatUSD(priceUsd) : formatKHR(priceKhr);

  // Generate Bakong KHQR code using qrcode package
  useEffect(() => {
    const khqrText = generateBakongKhqrString({
      merchantName: 'MIRA STORE',
      amount: selectedCurrency === 'USD' ? priceUsd : priceKhr,
      currency: selectedCurrency,
      orderId: `MIRA-${product.id}-${Date.now().toString().slice(-4)}`
    });

    QRCode.toDataURL(khqrText, {
      width: 260,
      margin: 1,
      color: {
        dark: '#000000',
        light: '#ffffff'
      }
    })
      .then(url => {
        setQrCodeDataUrl(url);
      })
      .catch(err => {
        console.error('Failed to generate QR Code:', err);
      });
  }, [product, selectedCurrency, priceUsd, priceKhr]);

  // Countdown timer for KHQR expiry
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          return 600; // Reset
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Trigger payment confirmation
  const handleConfirmPayment = () => {
    setIsProcessingPayment(true);
    setTimeout(() => {
      setIsProcessingPayment(false);
      onPaymentSuccess(product);
    }, 1500);
  };

  return (
    <div style={{ marginBottom: '80px' }}>
      {/* Sleek Minimal Back & Breadcrumb Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        maxWidth: '1440px',
        margin: '14px auto 18px auto',
        padding: '0 2px',
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

        <span
          onClick={onBack}
          style={{
            fontSize: '0.84rem',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            flexShrink: 0,
            whiteSpace: 'nowrap',
            transition: 'color 0.2s'
          }}
          onMouseEnter={(e) => e.target.style.color = '#38bdf8'}
          onMouseLeave={(e) => e.target.style.color = ''}
        >
          {product.category}
        </span>

        <ChevronRight size={13} color="rgba(255, 255, 255, 0.25)" style={{ flexShrink: 0 }} />

        <span style={{
          fontSize: '0.84rem',
          color: '#ffffff',
          fontWeight: 600,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          maxWidth: '450px'
        }}>
          {product.title}
        </span>
      </div>

      {/* 2 COLUMN LAYOUT */}
      <div 
        className="two-column-layout"
        style={{
          display: 'grid',
          gridTemplateColumns: '1.25fr 0.95fr',
          gap: '32px',
          alignItems: 'start',
          maxWidth: '1440px',
          margin: '0 auto'
        }}
      >
        {/* ==================== LEFT COLUMN: ACCOUNT DETAILS & DESCRIPTION ==================== */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Main Showcase Gallery */}
          <div className="glass-panel" style={{ padding: '20px', borderRadius: '24px' }}>
            <div style={{
              width: '100%',
              height: '380px',
              borderRadius: '16px',
              overflow: 'hidden',
              position: 'relative',
              background: '#0a0f1d'
            }}>
              <img
                src={activeImage}
                alt={product.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'opacity 0.3s ease'
                }}
              />

              {/* Top Badges on Showcase */}
              <div style={{
                position: 'absolute',
                top: '16px',
                left: '16px',
                right: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '8px',
                flexWrap: 'wrap',
                zIndex: 2
              }}>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <span className="badge badge-primary">{product.category}</span>
                </div>
                <span className={`badge ${product.status === 'sold' ? 'badge-red' : 'badge-green'}`} style={{ backdropFilter: 'blur(8px)' }}>
                  <Zap size={12} /> {product.status === 'sold' ? 'លក់ដាច់ហើយ (Sold Out)' : 'មានក្នុងស្តុក'}
                </span>
              </div>

              <div style={{
                position: 'absolute',
                bottom: '16px',
                left: '16px',
                background: 'rgba(7, 9, 14, 0.85)',
                backdropFilter: 'blur(10px)',
                padding: '6px 14px',
                borderRadius: '999px',
                fontSize: '0.82rem',
                color: 'var(--accent-green)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                border: '1px solid rgba(16, 185, 129, 0.3)'
              }}>
                <ShieldCheck size={16} />
                <span>ធានាសុវត្ថិភាព ១០០% គណនីស្អាត មិនជាប់ Email/Phone</span>
              </div>
            </div>

            {/* Thumbnail Row */}
            {gallery.length > 1 && (
              <div style={{
                display: 'flex',
                gap: '12px',
                marginTop: '16px',
                overflowX: 'auto',
                paddingBottom: '4px'
              }}>
                {gallery.map((imgUrl, idx) => (
                  <div
                    key={idx}
                    onClick={() => setActiveImage(imgUrl)}
                    style={{
                      width: '80px',
                      height: '60px',
                      borderRadius: '10px',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      border: activeImage === imgUrl ? '2px solid var(--primary)' : '1px solid var(--border-color)',
                      opacity: activeImage === imgUrl ? 1 : 0.6,
                      transition: 'all 0.2s ease',
                      flexShrink: 0
                    }}
                  >
                    <img src={imgUrl} alt="thumbnail" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Account Title & Main Highlights */}
          <div className="glass-panel" style={{ padding: '28px', borderRadius: '24px' }}>
            <h1 style={{
              fontSize: '1.45rem',
              fontWeight: 800,
              lineHeight: 1.45,
              marginBottom: '16px',
              color: '#ffffff'
            }}>
              {product.title}
            </h1>

            {/* Key Specs Matrix */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
              gap: '14px',
              marginBottom: '24px'
            }}>
              <div style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid var(--border-color)',
                borderRadius: '14px',
                padding: '12px 14px'
              }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginBottom: '4px' }}>កម្រិតគណនី (Level)</div>
                <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#38bdf8' }}>{product.level}</div>
              </div>

              <div style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid var(--border-color)',
                borderRadius: '14px',
                padding: '12px 14px'
              }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginBottom: '4px' }}>ចំនួន Robux ក្នុងគណនី</div>
                <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fbbf24' }}>
                  {product.robux ? `${product.robux.toLocaleString()} Robux` : '0 Robux'}
                </div>
              </div>

              <div style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid var(--border-color)',
                borderRadius: '14px',
                padding: '12px 14px'
              }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginBottom: '4px' }}>ស្ថានភាព Email</div>
                <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--accent-green)' }}>
                  ស្អាត ១០០% (មិនទាន់ភ្ជាប់)
                </div>
              </div>

              <div style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid var(--border-color)',
                borderRadius: '14px',
                padding: '12px 14px'
              }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginBottom: '4px' }}>ការប្រគល់ជូន</div>
                <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#818cf8' }}>
                  ភ្លាមៗ ស្វ័យប្រវត្តិ
                </div>
              </div>
            </div>

            {/* In-Game Detailed Stats Table */}
            {product.gameStats && (
              <div style={{ marginBottom: '24px' }}>
                <h3 style={{
                  fontSize: '1rem',
                  fontWeight: 700,
                  marginBottom: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: '#c7d2fe'
                }}>
                  <span>ព័ត៌មានលម្អិតក្នុងហ្គេម</span>
                </h3>

                <div style={{
                  background: 'rgba(15, 23, 42, 0.6)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '16px',
                  overflow: 'hidden'
                }}>
                  {Object.entries(product.gameStats).map(([key, val], i) => (
                    <div
                      key={key}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        padding: '10px 16px',
                        borderBottom: i < Object.keys(product.gameStats).length - 1 ? '1px solid rgba(255, 255, 255, 0.05)' : 'none',
                        fontSize: '0.88rem',
                        background: i % 2 === 0 ? 'transparent' : 'rgba(255, 255, 255, 0.015)'
                      }}
                    >
                      <span style={{ color: 'var(--text-muted)' }}>
                        {key}៖
                      </span>
                      <span style={{ fontWeight: 600, color: '#f1f5f9', textAlign: 'right' }}>
                        {val}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Full Khmer Description */}
            <div style={{ marginBottom: '28px' }}>
              <h3 style={{
                fontSize: '1rem',
                fontWeight: 700,
                marginBottom: '10px',
                color: '#c7d2fe'
              }}>
                សេចក្ដីពិពណ៌នាអំពីគណនី
              </h3>
              <p style={{
                color: 'var(--text-muted)',
                lineHeight: 1.8,
                fontSize: '0.92rem',
                whiteSpace: 'pre-line'
              }}>
                {product.description}
              </p>
            </div>

            {/* 100% Guarantee Box */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(6, 182, 212, 0.05) 100%)',
              border: '1px solid rgba(16, 185, 129, 0.25)',
              borderRadius: '16px',
              padding: '18px 20px'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                color: 'var(--accent-green)',
                fontWeight: 700,
                fontSize: '0.95rem',
                marginBottom: '10px'
              }}>
                <ShieldCheck size={20} />
                <span>គោលការណ៍ធានាសុវត្ថិភាព ១០០% ពីហាង</span>
              </div>
              <ul style={{
                listStyle: 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                fontSize: '0.86rem',
                color: 'var(--text-muted)'
              }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={15} color="var(--accent-green)" />
                  <span>គណនីស្របច្បាប់ ១០០% មិនមែនជា Account Hack ឬជាប់ Report ឡើយ</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={15} color="var(--accent-green)" />
                  <span>គ្មានភ្ជាប់ Email ឬលេខទូរស័ព្ទចាស់ អ្នកទិញអាចដាក់ Email ខ្លួនឯងបានភ្លាមៗ</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={15} color="var(--accent-green)" />
                  <span>ប្រព័ន្ធស្វ័យប្រវត្តិនឹងបង្ហាញ Username & Password លើអេក្រង់ភ្លាមៗក្រោយស្កេនទូទាត់ជោគជ័យ</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={15} color="var(--accent-green)" />
                  <span>ធានាសងប្រាក់វិញ ១០០% ប្រសិនបើគណនីមានបញ្ហាមិនអាចចូលលេងបាន</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* ==================== RIGHT COLUMN: BAKONG PAYMENT ==================== */}
        <div style={{
          position: 'sticky',
          top: '90px'
        }}>
          {product.status === 'sold' ? (
            <div className="glass-panel" style={{
              padding: '36px 24px',
              borderRadius: '24px',
              border: '1px solid rgba(239, 68, 68, 0.35)',
              boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.6)',
              textAlign: 'center'
            }}>
              <div style={{
                width: '70px',
                height: '70px',
                borderRadius: '50%',
                background: 'rgba(239, 68, 68, 0.15)',
                border: '2px solid rgba(239, 68, 68, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 18px auto',
                color: '#f87171'
              }}>
                <Lock size={32} />
              </div>

              <span className="badge badge-red" style={{ fontSize: '0.84rem', padding: '6px 14px', marginBottom: '14px' }}>
                លក់ដាច់ហើយ (Sold Out)
              </span>

              <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#ffffff', margin: '12px 0' }}>
                គណនីនេះត្រូវបានទិញរួចរាល់
              </h2>

              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '24px' }}>
                គណនី Roblox នេះត្រូវបានទូទាត់ និងប្រគល់ជូនអ្នកទិញរួចរាល់ហើយ។ ប្រព័ន្ធបានបិទការស្កេនទូទាត់សម្រាប់គណនីនេះដើម្បីការពារសុវត្ថិភាព។
              </p>

              <div style={{
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid var(--border-color)',
                borderRadius: '14px',
                padding: '14px',
                marginBottom: '20px',
                fontSize: '0.84rem',
                color: 'var(--text-dim)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}>
                <CheckCircle2 size={16} color="var(--accent-green)" />
                <span>បានបញ្ចប់ការទិញ-លក់តាមបាគង KHQR ជោគជ័យ</span>
              </div>

              <button
                onClick={onBack}
                className="btn btn-primary"
                style={{ width: '100%', padding: '12px', fontSize: '0.95rem', gap: '8px' }}
              >
                <ArrowLeft size={16} />
                <span>ត្រឡប់ទៅមើលគណនីផ្សេងទៀត</span>
              </button>
            </div>
          ) : (
            <div className="glass-panel" style={{
              padding: '24px',
              borderRadius: '24px',
              border: '1px solid rgba(99, 102, 241, 0.25)',
              boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.6)'
            }}>
            {/* Header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '16px'
            }}>
              <div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800 }}>
                  ស្កេនទូទាត់តាមបាគង KHQR
                </h2>
              </div>

              {/* Currency Switcher */}
              <div style={{
                display: 'flex',
                background: 'rgba(255, 255, 255, 0.06)',
                borderRadius: '10px',
                padding: '3px',
                border: '1px solid var(--border-color)'
              }}>
                <button
                  type="button"
                  onClick={() => setSelectedCurrency('USD')}
                  style={{
                    fontFamily: 'var(--font-family)',
                    background: selectedCurrency === 'USD' ? 'var(--primary)' : 'transparent',
                    color: selectedCurrency === 'USD' ? '#fff' : 'var(--text-muted)',
                    border: 'none',
                    padding: '4px 10px',
                    borderRadius: '7px',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  ដុល្លារ ($)
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedCurrency('KHR')}
                  style={{
                    fontFamily: 'var(--font-family)',
                    background: selectedCurrency === 'KHR' ? 'var(--primary)' : 'transparent',
                    color: selectedCurrency === 'KHR' ? '#fff' : 'var(--text-muted)',
                    border: 'none',
                    padding: '4px 10px',
                    borderRadius: '7px',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  រៀល (៛)
                </button>
              </div>
            </div>

            {/* Price Summary Banner */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.03)',
              borderRadius: '14px',
              padding: '14px 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              border: '1px solid var(--border-color)',
              marginBottom: '20px'
            }}>
              <div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>ទឹកប្រាក់សរុបត្រូវទូទាត់</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#38bdf8' }}>
                  {currentPriceText}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.76rem', color: 'var(--text-dim)' }}>អត្រាប្តូរប្រាក់</div>
                <div style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>១ ដុល្លារ = ៤,១០០ រៀល</div>
              </div>
            </div>

            {/* Authentic Bakong KHQR Card */}
            <div style={{
              background: '#ffffff',
              borderRadius: '18px',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-bakong)',
              border: '2px solid var(--bakong-red)',
              color: '#1e293b',
              textAlign: 'center',
              position: 'relative'
            }}>
              {/* Bakong Red Header */}
              <div style={{
                background: 'linear-gradient(135deg, #d32027 0%, #a8171d 100%)',
                color: '#ffffff',
                padding: '14px 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    background: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 900,
                    color: '#d32027',
                    fontSize: '0.75rem',
                    letterSpacing: '-0.5px'
                  }}>
                    KHQR
                  </div>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 800, letterSpacing: '0.5px' }}>
                      BAKONG
                    </div>
                    <div style={{ fontSize: '0.65rem', opacity: 0.9 }}>
                      ធនាគារជាតិនៃកម្ពុជា
                    </div>
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  background: 'rgba(0,0,0,0.2)',
                  padding: '3px 8px',
                  borderRadius: '999px',
                  fontSize: '0.74rem',
                  fontWeight: 600
                }}>
                  <Clock size={12} />
                  <span>{formatTimer(countdown)}</span>
                </div>
              </div>

              {/* QR Code Container */}
              <div style={{
                padding: '20px 20px 14px 20px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                position: 'relative'
              }}>
                <div style={{
                  fontSize: '0.92rem',
                  fontWeight: 800,
                  color: '#0f172a',
                  marginBottom: '2px',
                  letterSpacing: '0.3px'
                }}>
                  ហាង MIRA STORE
                </div>
                <div style={{
                  fontSize: '0.76rem',
                  color: '#64748b',
                  marginBottom: '14px'
                }}>
                  សូមចំណាំ: ប្រាក់ដែលបានបង់ហើយមិនអាចប្ដូរវិញបានទេ
                </div>

                {/* QR Image with subtle scanning animation */}
                <div style={{
                  position: 'relative',
                  padding: '8px',
                  background: '#ffffff',
                  borderRadius: '12px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
                }}>
                  {qrCodeDataUrl ? (
                    <img
                      src={qrCodeDataUrl}
                      alt="Bakong KHQR"
                      style={{
                        width: '200px',
                        height: '200px',
                        display: 'block'
                      }}
                    />
                  ) : (
                    <div style={{ width: '200px', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <QrCode size={48} color="#94a3b8" />
                    </div>
                  )}

                  {/* Red corner accents for authentic KHQR style */}
                  <div style={{
                    position: 'absolute',
                    top: '2px',
                    left: '2px',
                    width: '12px',
                    height: '12px',
                    borderTop: '3px solid #d32027',
                    borderLeft: '3px solid #d32027'
                  }} />
                  <div style={{
                    position: 'absolute',
                    top: '2px',
                    right: '2px',
                    width: '12px',
                    height: '12px',
                    borderTop: '3px solid #d32027',
                    borderRight: '3px solid #d32027'
                  }} />
                  <div style={{
                    position: 'absolute',
                    bottom: '2px',
                    left: '2px',
                    width: '12px',
                    height: '12px',
                    borderBottom: '3px solid #d32027',
                    borderLeft: '3px solid #d32027'
                  }} />
                  <div style={{
                    position: 'absolute',
                    bottom: '2px',
                    right: '2px',
                    width: '12px',
                    height: '12px',
                    borderBottom: '3px solid #d32027',
                    borderRight: '3px solid #d32027'
                  }} />
                </div>

                {/* Amount Display */}
                <div style={{
                  marginTop: '14px',
                  fontSize: '1.35rem',
                  fontWeight: 900,
                  color: '#d32027'
                }}>
                  {currentPriceText}
                </div>
              </div>

              {/* Supported Cambodian Banks Footer in Card */}
              <div style={{
                background: '#f8fafc',
                padding: '10px 14px',
                borderTop: '1px solid #e2e8f0',
                fontSize: '0.74rem',
                color: '#64748b'
              }}>
                ស្កេនបានជាមួយ៖ <strong>អេប៊ីអេ, វីង, អេស៊ីលីដា, បាគង, ជីបម៉ុង</strong> និងគ្រប់ធនាគារក្នុងស្រុក
              </div>
            </div>

            {/* Live Payment Scanner Simulation Status */}
            <div style={{
              margin: '18px 0',
              padding: '12px 14px',
              borderRadius: '12px',
              background: 'rgba(99, 102, 241, 0.08)',
              border: '1px solid rgba(99, 102, 241, 0.2)',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <div style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                background: '#10b981',
                boxShadow: '0 0 10px #10b981',
                animation: 'pulseGlow 2s infinite'
              }} />
              <div style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>
                ប្រព័ន្ធកំពុងរង់ចាំការស្កេនទូទាត់ស្វ័យប្រវត្តិ...
              </div>
            </div>

            {/* Instant Confirmation / Simulation Button */}
            <button
              onClick={handleConfirmPayment}
              disabled={isProcessingPayment}
              className="btn btn-bakong"
              style={{
                width: '100%',
                padding: '14px',
                fontSize: '1rem',
                borderRadius: '14px',
                fontWeight: 700
              }}
            >
              {isProcessingPayment ? (
                <span>កំពុងផ្ទៀងផ្ទាត់ការទូទាត់បាគង...</span>
              ) : (
                <>
                  <CheckCircle2 size={20} />
                  <span>ខ្ញុំបានផ្ទេរប្រាក់រួចរាល់ (បញ្ជាក់ការទូទាត់)</span>
                </>
              )}
            </button>

            {/* Buyer Instruction Note */}
            <div style={{
              marginTop: '14px',
              textAlign: 'center',
              fontSize: '0.8rem',
              color: 'var(--text-dim)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}>
              <Lock size={13} color="var(--accent-green)" />
              <span>ព័ត៌មានគណនី (ឈ្មោះ និងលេខសម្ងាត់) នឹងលេចឡើងភ្លាមៗ</span>
            </div>
          </div>
          )}
        </div>
      </div>
    </div>
  );
};
