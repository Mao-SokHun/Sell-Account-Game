import React, { useState } from 'react';
import { Shield, Lock, User, Key, AlertCircle, CheckCircle2, X, ArrowLeft, Crown } from 'lucide-react';

export const AdminAuthModal = ({
  isOpen,
  isStandalone = false,
  onClose,
  onLoginSuccess
}) => {
  const [mode, setMode] = useState('login'); // 'login' or 'register'
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen && !isStandalone) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (!username.trim() || !password.trim()) {
      setError('សូមបំពេញឈ្មោះគណនី និងពាក្យសម្ងាត់!');
      return;
    }

    const savedAdmins = JSON.parse(localStorage.getItem('roblox_admins') || '[]');

    if (mode === 'register') {
      // Check secret key for creating admin
      if (secretKey.trim() !== 'ADMIN2026' && secretKey.trim() !== 'admin') {
        setError('លេខកូដសម្ងាត់មិនត្រឹមត្រូវទេ! (ប្រើ: ADMIN2026 សម្រាប់ចុះឈ្មោះ Admin)');
        return;
      }

      const existing = savedAdmins.find(a => a.username.toLowerCase() === username.toLowerCase());
      if (existing) {
        setError('ឈ្មោះ Admin នេះមានក្នុងប្រព័ន្ធរួចហើយ!');
        return;
      }

      const newAdmin = {
        username: username.trim(),
        password: password.trim(),
        role: 'SUPER_ADMIN',
        createdAt: new Date().toISOString()
      };

      savedAdmins.push(newAdmin);
      localStorage.setItem('roblox_admins', JSON.stringify(savedAdmins));

      setSuccessMsg('បានចុះឈ្មោះ Admin ជោគជ័យ! សូមចូល Login ឥឡូវនេះ។');
      setMode('login');
      setPassword('');
      return;
    }

    // Login mode
    // Default admin fallback if none registered yet
    if (username === 'admin' && password === 'admin123') {
      const adminData = { username: 'admin', role: 'SUPER_ADMIN' };
      localStorage.setItem('current_admin', JSON.stringify(adminData));
      onLoginSuccess(adminData);
      if (onClose) onClose();
      return;
    }

    const matched = savedAdmins.find(
      a => a.username.toLowerCase() === username.toLowerCase() && a.password === password
    );

    if (matched) {
      localStorage.setItem('current_admin', JSON.stringify(matched));
      onLoginSuccess(matched);
      if (onClose) onClose();
    } else {
      setError('ឈ្មោះគណនី ឬពាក្យសម្ងាត់ Admin មិនត្រឹមត្រូវទេ! (គំរូ: admin / admin123)');
    }
  };

  const content = (
    <div 
      className="modal-content animate-modal"
      style={{
        maxWidth: '480px',
        width: '100%',
        padding: '32px',
        borderRadius: '24px',
        border: '1px solid rgba(99, 102, 241, 0.35)',
        background: '#0d1322',
        boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.9), 0 0 35px rgba(99, 102, 241, 0.2)'
      }}
    >
      {/* Top Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '20px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #f59e0b, #d97706)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            boxShadow: '0 4px 15px rgba(245, 158, 11, 0.35)'
          }}>
            <Crown size={24} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>
              {mode === 'login' ? 'ចូលគ្រប់គ្រងហាង' : 'ចុះឈ្មោះបង្កើត Admin ថ្មី'}
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>
              ច្រកសម្ងាត់សម្រាប់តែម្ចាស់ហាង (/owner)
            </p>
          </div>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="btn btn-ghost"
            style={{ padding: '6px', borderRadius: '50%' }}
            title="បិទ"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Notice Banner */}
      <div style={{
        background: 'rgba(245, 158, 11, 0.08)',
        border: '1px solid rgba(245, 158, 11, 0.25)',
        borderRadius: '12px',
        padding: '10px 14px',
        fontSize: '0.82rem',
        color: '#fbbf24',
        marginBottom: '20px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}>
        <AlertCircle size={16} style={{ flexShrink: 0 }} />
        <span>ទំព័រនេះមិនបង្ហាញលើទំព័រដើមទេ សម្រាប់តែម្ចាស់ហាងគ្រប់គ្រងប៉ុណ្ណោះ។</span>
      </div>

      {/* Tab Switcher */}
      <div style={{
        display: 'flex',
        background: 'rgba(255, 255, 255, 0.05)',
        padding: '4px',
        borderRadius: '12px',
        marginBottom: '20px',
        border: '1px solid var(--border-color)'
      }}>
        <button
          type="button"
          onClick={() => { setMode('login'); setError(''); }}
          style={{
            flex: 1,
            padding: '8px',
            borderRadius: '9px',
            border: 'none',
            background: mode === 'login' ? 'var(--primary)' : 'transparent',
            color: mode === 'login' ? '#fff' : 'var(--text-muted)',
            fontWeight: 700,
            fontSize: '0.88rem',
            cursor: 'pointer'
          }}
        >
          ចូលប្រើ (Login)
        </button>
        <button
          type="button"
          onClick={() => { setMode('register'); setError(''); }}
          style={{
            flex: 1,
            padding: '8px',
            borderRadius: '9px',
            border: 'none',
            background: mode === 'register' ? 'var(--primary)' : 'transparent',
            color: mode === 'register' ? '#fff' : 'var(--text-muted)',
            fontWeight: 700,
            fontSize: '0.88rem',
            cursor: 'pointer'
          }}
        >
          ចុះឈ្មោះ Admin ថ្មី
        </button>
      </div>

      {/* Error / Success Alerts */}
      {error && (
        <div style={{
          background: 'rgba(239, 68, 68, 0.1)',
          border: '1px solid rgba(239, 68, 68, 0.3)',
          borderRadius: '10px',
          padding: '10px 14px',
          color: '#f87171',
          fontSize: '0.85rem',
          marginBottom: '16px'
        }}>
          {error}
        </div>
      )}

      {successMsg && (
        <div style={{
          background: 'rgba(16, 185, 129, 0.1)',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          borderRadius: '10px',
          padding: '10px 14px',
          color: '#34d399',
          fontSize: '0.85rem',
          marginBottom: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <CheckCircle2 size={16} />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Auth Form */}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">
            <User size={14} style={{ display: 'inline', marginRight: '4px' }} />
            ឈ្មោះគណនី Admin *
          </label>
          <input
            type="text"
            className="form-input"
            placeholder="ឧទាហរណ៍: admin"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">
            <Lock size={14} style={{ display: 'inline', marginRight: '4px' }} />
            ពាក្យសម្ងាត់ *
          </label>
          <input
            type="password"
            className="form-input"
            placeholder="បញ្ចូលពាក្យសម្ងាត់របស់អ្នក"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {mode === 'register' && (
          <div className="form-group">
            <label className="form-label">
              <Key size={14} style={{ display: 'inline', marginRight: '4px' }} />
              លេខកូដសម្ងាត់សម្រាប់ចុះឈ្មោះ Admin *
            </label>
            <input
              type="password"
              className="form-input"
              placeholder="បញ្ចូលកូដសម្ងាត់: ADMIN2026"
              value={secretKey}
              onChange={(e) => setSecretKey(e.target.value)}
              required
            />
            <span style={{ fontSize: '0.76rem', color: 'var(--text-dim)' }}>
              * កូដសម្ងាត់លំនាំដើម: <code>ADMIN2026</code>
            </span>
          </div>
        )}

        {mode === 'login' && (
          <div style={{
            background: 'rgba(255, 255, 255, 0.02)',
            padding: '10px 12px',
            borderRadius: '10px',
            border: '1px solid var(--border-color)',
            fontSize: '0.8rem',
            color: 'var(--text-dim)',
            marginBottom: '20px'
          }}>
            គណនីគំរូ: <strong>admin</strong> | ពាក្យសម្ងាត់: <strong>admin123</strong>
          </div>
        )}

        <button
          type="submit"
          className="btn btn-primary"
          style={{ width: '100%', padding: '12px', fontSize: '0.95rem', borderRadius: '12px', marginBottom: '16px' }}
        >
          {mode === 'login' ? 'ចូលផ្ទាំងគ្រប់គ្រង' : 'ចុះឈ្មោះបង្កើតគណនី'}
        </button>

        {isStandalone && (
          <div style={{ textAlign: 'center' }}>
            <button
              type="button"
              onClick={onClose}
              className="btn btn-ghost"
              style={{ fontSize: '0.86rem' }}
            >
              <ArrowLeft size={15} />
              <span>ត្រឡប់ទៅហាងទំនិញ</span>
            </button>
          </div>
        )}
      </form>
    </div>
  );

  if (isStandalone) {
    return (
      <div style={{
        minHeight: '75vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 20px'
      }}>
        {content}
      </div>
    );
  }

  return (
    <div className="modal-overlay">
      {content}
    </div>
  );
};
