import React, { useState } from 'react';
import { 
  PlusCircle, Package, DollarSign, CheckCircle2, 
  Trash2, Edit3, ArrowLeft, Image as ImageIcon, 
  Key, ShieldCheck, Tag, Sparkles, AlertTriangle
} from 'lucide-react';
import { formatUSD, formatKHR, convertUsdToKhr } from '../utils/currency';
import { GAME_CATEGORIES } from '../data/initialProducts';

export const AdminDashboard = ({
  products,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  onBackToStore,
  adminUser
}) => {
  const [activeTab, setActiveTab] = useState('list'); // 'list' or 'add'
  const [editingId, setEditingId] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    category: 'Blox Fruits',
    priceUsd: 15.00,
    level: 'កម្រិត Max 2550',
    robux: 1000,
    badge: 'ពេញនិយម',
    image: '/images/bloxfruits.jpg',
    description: '',
    emailStatus: 'គណនីស្អាត ១០០% មិនទាន់ភ្ជាប់ Email (អាចដាក់ Email ផ្ទាល់ខ្លួន)',
    status: 'available',
    // Credentials
    username: '',
    password: '',
    backupCode: 'PIN-1234',
    linkedEmail: 'មិនទាន់ភ្ជាប់ (ស្អាត ១០០%)'
  });

  const [formSuccess, setFormSuccess] = useState('');

  // Sample image presets for quick selection
  const imagePresets = [
    { label: 'រូបភាព Blox Fruits', url: '/images/bloxfruits.jpg' },
    { label: 'រូបភាព VIP Avatar (Robux)', url: '/images/avatar_rich.jpg' },
    { label: 'រូបភាព Pet Sim 99 Huge Pet', url: '/images/petsim.jpg' },
    { label: 'រូបភាព Blade Ball ដាវពន្លឺ', url: '/images/bladeball.jpg' }
  ];

  // Calculate statistics
  const totalProducts = products.length;
  const availableCount = products.filter(p => p.status === 'available').length;
  const soldCount = totalProducts - availableCount;
  const totalRevenueUsd = products
    .filter(p => p.status === 'sold')
    .reduce((acc, curr) => acc + (curr.priceUsd || 0), 0);

  // Handle Form Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'priceUsd' || name === 'robux' ? parseFloat(value) || 0 : value
    }));
  };

  // Start Editing
  const handleStartEdit = (product) => {
    setEditingId(product.id);
    setFormData({
      title: product.title,
      category: product.category,
      priceUsd: product.priceUsd,
      level: product.level,
      robux: product.robux || 0,
      badge: product.badge || '',
      image: product.image,
      description: product.description || '',
      emailStatus: product.emailStatus || 'គណនីស្អាត មិនទាន់ភ្ជាប់ Email',
      status: product.status || 'available',
      username: product.credentials?.username || '',
      password: product.credentials?.password || '',
      backupCode: product.credentials?.backupCode || '',
      linkedEmail: product.credentials?.linkedEmail || 'មិនទាន់ភ្ជាប់'
    });
    setActiveTab('add');
  };

  // Handle Submit (Add or Edit)
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.username.trim() || !formData.password.trim()) {
      alert('សូមបំពេញព័ត៌មានចាំបាច់៖ ចំណងជើងគណនី, ឈ្មោះគណនី Roblox និងពាក្យសម្ងាត់!');
      return;
    }

    const productPayload = {
      id: editingId || `rbx-${Date.now().toString().slice(-4)}`,
      title: formData.title.trim(),
      category: formData.category,
      priceUsd: formData.priceUsd,
      priceKhr: convertUsdToKhr(formData.priceUsd),
      level: formData.level,
      robux: formData.robux,
      badge: formData.badge,
      image: formData.image,
      gallery: [formData.image, '/images/bloxfruits.jpg', '/images/avatar_rich.jpg'],
      description: formData.description,
      emailStatus: formData.emailStatus,
      status: formData.status,
      gameStats: {
        'ប្រភេទហ្គេម': formData.category,
        'កម្រិតគណនី': formData.level,
        'ចំនួន Robux': formData.robux > 0 ? `${formData.robux.toLocaleString()} Robux` : 'គ្មាន',
        'ស្ថានភាព Email': formData.emailStatus,
        'ការប្រគល់ជូន': 'ស្វ័យប្រវត្តភ្លាមៗ'
      },
      credentials: {
        username: formData.username.trim(),
        password: formData.password.trim(),
        backupCode: formData.backupCode.trim(),
        linkedEmail: formData.linkedEmail,
        registeredDate: new Date().toISOString().split('T')[0],
        note: 'សូមប្តូរលេខសម្ងាត់ភ្លាមៗ'
      }
    };

    if (editingId) {
      onUpdateProduct(productPayload);
      setFormSuccess('បានកែប្រែទិន្នន័យគណនីជោគជ័យ!');
    } else {
      onAddProduct(productPayload);
      setFormSuccess('បានដាក់លក់គណនី Roblox ថ្មីជោគជ័យ!');
    }

    setTimeout(() => {
      setFormSuccess('');
      setActiveTab('list');
      setEditingId(null);
      // Reset form
      setFormData({
        title: '',
        category: 'Blox Fruits',
        priceUsd: 15.00,
        level: 'កម្រិត Max 2550',
        robux: 1000,
        badge: 'ពេញនិយម',
        image: '/images/bloxfruits.jpg',
        description: '',
        emailStatus: 'គណនីស្អាត ១០០% មិនទាន់ភ្ជាប់ Email (អាចដាក់ Email ផ្ទាល់ខ្លួន)',
        status: 'available',
        username: '',
        password: '',
        backupCode: 'PIN-1234',
        linkedEmail: 'មិនទាន់ភ្ជាប់ (ស្អាត ១០០%)'
      });
    }, 1200);
  };

  // Toggle Stock Status
  const handleToggleStatus = (product) => {
    const updated = {
      ...product,
      status: product.status === 'available' ? 'sold' : 'available'
    };
    onUpdateProduct(updated);
  };

  return (
    <div style={{ marginBottom: '80px' }}>
      {/* Top Bar with Stats */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
        margin: '24px 0'
      }}>
        <div>
          <button
            onClick={onBackToStore}
            className="btn btn-secondary"
            style={{ padding: '8px 16px', fontSize: '0.85rem', marginBottom: '8px' }}
          >
            <ArrowLeft size={16} />
            <span>ត្រឡប់ទៅហាងទំនិញ</span>
          </button>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 800 }}>
            ផ្ទាំងគ្រប់គ្រងម្ចាស់ហាង (Admin Dashboard)
          </h1>
          <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)' }}>
            សួស្តី {adminUser?.username || 'Admin'}! អ្នកអាចគ្រប់គ្រង និងបន្ថែមគណនី Roblox សម្រាប់ដាក់លក់នៅទីនេះ។
          </p>
        </div>

        {/* Tab Controls */}
        <div style={{
          display: 'flex',
          background: 'rgba(255, 255, 255, 0.05)',
          padding: '4px',
          borderRadius: '12px',
          border: '1px solid var(--border-color)'
        }}>
          <button
            onClick={() => { setActiveTab('list'); setEditingId(null); }}
            style={{
              padding: '8px 18px',
              borderRadius: '9px',
              border: 'none',
              background: activeTab === 'list' ? 'var(--primary)' : 'transparent',
              color: activeTab === 'list' ? '#fff' : 'var(--text-muted)',
              fontWeight: 700,
              fontSize: '0.88rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Package size={16} />
            <span>បញ្ជីគណនី ({totalProducts})</span>
          </button>

          <button
            onClick={() => { setActiveTab('add'); setEditingId(null); }}
            style={{
              padding: '8px 18px',
              borderRadius: '9px',
              border: 'none',
              background: activeTab === 'add' ? 'var(--primary)' : 'transparent',
              color: activeTab === 'add' ? '#fff' : 'var(--text-muted)',
              fontWeight: 700,
              fontSize: '0.88rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <PlusCircle size={16} />
            <span>{editingId ? 'កែប្រែគណនី' : 'បន្ថែមគណនីដាក់លក់'}</span>
          </button>
        </div>
      </div>

      {/* KPI Cards in 100% Khmer */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '16px',
        marginBottom: '28px'
      }}>
        <div className="glass-panel" style={{ padding: '18px 20px', borderRadius: '18px' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginBottom: '4px' }}>
            គណនីទាំងអស់ក្នុងប្រព័ន្ធ
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#38bdf8' }}>
            {totalProducts} <span style={{ fontSize: '0.85rem', fontWeight: 500 }}>គណនី</span>
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '18px 20px', borderRadius: '18px' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginBottom: '4px' }}>
            គណនីនៅសល់ក្នុងស្តុក
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--accent-green)' }}>
            {availableCount} <span style={{ fontSize: '0.85rem', fontWeight: 500 }}>គណនី</span>
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '18px 20px', borderRadius: '18px' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginBottom: '4px' }}>
            គណនីដែលបានលក់ចេញ
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fbbf24' }}>
            {soldCount} <span style={{ fontSize: '0.85rem', fontWeight: 500 }}>គណនី</span>
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '18px 20px', borderRadius: '18px' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginBottom: '4px' }}>
            ចំណូលសរុបទទួលបាន
          </div>
          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#a855f7' }}>
            {formatUSD(totalRevenueUsd)}
          </div>
        </div>
      </div>

      {/* Alert Success message */}
      {formSuccess && (
        <div style={{
          background: 'rgba(16, 185, 129, 0.15)',
          border: '1px solid rgba(16, 185, 129, 0.4)',
          borderRadius: '12px',
          padding: '14px 18px',
          color: '#34d399',
          fontWeight: 600,
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <CheckCircle2 size={20} />
          <span>{formSuccess}</span>
        </div>
      )}

      {/* ================= TAB 1: ADD / EDIT PRODUCT FORM ================= */}
      {activeTab === 'add' && (
        <div className="glass-panel" style={{ padding: '32px', borderRadius: '24px' }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '6px' }}>
            {editingId ? 'កែប្រែព័ត៌មានគណនី Roblox' : 'ដាក់លក់គណនី Roblox ថ្មី'}
          </h2>
          <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', marginBottom: '24px' }}>
            សូមបំពេញព័ត៌មានគណនីឱ្យបានត្រឹមត្រូវ។ ព័ត៌មាន Login ដូចជា Username និង Password នឹងត្រូវផ្ដល់ជូនអតិថិជនលើអេក្រង់ដោយស្វ័យប្រវត្ត ក្រោយពេលស្កេនបង់លុយតាមបាគងរួចរាល់។
          </p>

          <form onSubmit={handleSubmit}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '20px',
              marginBottom: '24px'
            }}>
              {/* Product Title */}
              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label className="form-label">ចំណងជើងគណនីដាក់លក់ *</label>
                <input
                  type="text"
                  name="title"
                  className="form-input"
                  placeholder="ឧទាហរណ៍: គណនី Blox Fruits កម្រិត Max 2550 | ផ្លែបិសាច Kitsune + ដាវ CDK"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Category */}
              <div className="form-group">
                <label className="form-label">ប្រភេទហ្គេម *</label>
                <select
                  name="category"
                  className="form-select"
                  value={formData.category}
                  onChange={handleChange}
                >
                  <option value="Blox Fruits">Blox Fruits</option>
                  <option value="ឈុត VIP Avatar">ឈុត VIP Avatar</option>
                  <option value="Pet Sim 99">Pet Sim 99</option>
                  <option value="Blade Ball">Blade Ball</option>
                </select>
              </div>

              {/* Price USD */}
              <div className="form-group">
                <label className="form-label">តម្លៃលក់គិតជាដុល្លារ ($) *</label>
                <input
                  type="number"
                  step="0.5"
                  name="priceUsd"
                  className="form-input"
                  value={formData.priceUsd}
                  onChange={handleChange}
                  required
                />
                <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>
                  ស្មើនឹងប្រមាណ: {formatKHR(convertUsdToKhr(formData.priceUsd))}
                </span>
              </div>

              {/* Level / Rank */}
              <div className="form-group">
                <label className="form-label">កម្រិតគណនី (Level)</label>
                <input
                  type="text"
                  name="level"
                  className="form-input"
                  placeholder="ឧ. កម្រិត Max 2550 ឬ Rank 25"
                  value={formData.level}
                  onChange={handleChange}
                />
              </div>

              {/* Robux Balance */}
              <div className="form-group">
                <label className="form-label">ចំនួន Robux ក្នុងគណនី</label>
                <input
                  type="number"
                  name="robux"
                  className="form-input"
                  placeholder="0"
                  value={formData.robux}
                  onChange={handleChange}
                />
              </div>

              {/* Badge */}
              <div className="form-group">
                <label className="form-label">ស្លាកសម្គាល់ពិសេស</label>
                <input
                  type="text"
                  name="badge"
                  className="form-input"
                  placeholder="ឧ. លក់ដាច់បំផុត, ថ្មី, កម្រពិសេស"
                  value={formData.badge}
                  onChange={handleChange}
                />
              </div>

              {/* Email Clean Status */}
              <div className="form-group">
                <label className="form-label">ស្ថានភាព Email</label>
                <input
                  type="text"
                  name="emailStatus"
                  className="form-input"
                  value={formData.emailStatus}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Image Selection Presets */}
            <div className="form-group" style={{ marginBottom: '24px' }}>
              <label className="form-label">
                <ImageIcon size={15} style={{ display: 'inline', marginRight: '6px' }} />
                ជ្រើសរើសរូបភាពគម្របគណនី
              </label>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '12px',
                marginBottom: '10px'
              }}>
                {imagePresets.map((preset, idx) => (
                  <div
                    key={idx}
                    onClick={() => setFormData(prev => ({ ...prev, image: preset.url }))}
                    style={{
                      border: formData.image === preset.url ? '2px solid var(--primary)' : '1px solid var(--border-color)',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      background: 'rgba(15, 23, 42, 0.6)',
                      padding: '8px'
                    }}
                  >
                    <img
                      src={preset.url}
                      alt={preset.label}
                      style={{ width: '100%', height: '90px', objectFit: 'cover', borderRadius: '8px', marginBottom: '6px' }}
                    />
                    <div style={{ fontSize: '0.8rem', fontWeight: 600, color: formData.image === preset.url ? '#818cf8' : 'var(--text-muted)' }}>
                      {preset.label}
                    </div>
                  </div>
                ))}
              </div>

              <input
                type="text"
                name="image"
                className="form-input"
                placeholder="ឬបញ្ចូលតំណភ្ជាប់រូបភាព (Image URL) ផ្ទាល់ខ្លួន"
                value={formData.image}
                onChange={handleChange}
              />
            </div>

            {/* Description */}
            <div className="form-group" style={{ marginBottom: '24px' }}>
              <label className="form-label">សេចក្តីពិពណ៌នាលម្អិតអំពីគណនី</label>
              <textarea
                name="description"
                rows="4"
                className="form-textarea"
                placeholder="រៀបរាប់ពីរបស់របរ Items, ក្បាច់ Melee, ដាវ, ផ្លែបិសាច, សត្វ Pets ដែលមានក្នុងគណនី..."
                value={formData.description}
                onChange={handleChange}
              />
            </div>

            {/* SECRET CREDENTIALS SECTION (For Buyer Modal) */}
            <div style={{
              background: 'rgba(99, 102, 241, 0.08)',
              border: '1px solid rgba(99, 102, 241, 0.3)',
              borderRadius: '18px',
              padding: '24px',
              marginBottom: '28px'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '1.05rem',
                fontWeight: 700,
                color: '#c7d2fe',
                marginBottom: '10px'
              }}>
                <Key size={18} color="#818cf8" />
                <span>ព័ត៌មានសម្ងាត់គណនី (សម្រាប់ប្រគល់ជូនអ្នកទិញ)</span>
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
                * ព័ត៌មាននេះត្រូវបានការពារសុវត្ថិភាព ហើយនឹងបង្ហាញតែលើផ្ទាំងអេក្រង់ជូនអ្នកទិញក្រោយពេលស្កេនបង់លុយតាមបាគងរួចរាល់ប៉ុណ្ណោះ។
              </p>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '16px'
              }}>
                <div className="form-group">
                  <label className="form-label">ឈ្មោះគណនីចូលលេង (Username) *</label>
                  <input
                    type="text"
                    name="username"
                    className="form-input"
                    placeholder="ឈ្មោះ Login Roblox"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">ពាក្យសម្ងាត់ចូលលេង (Password) *</label>
                  <input
                    type="text"
                    name="password"
                    className="form-input"
                    placeholder="លេខសម្ងាត់ Login"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">លេខកូដសម្ងាត់ការពារ / លេខ PIN 2FA (បើមាន)</label>
                  <input
                    type="text"
                    name="backupCode"
                    className="form-input"
                    placeholder="ឧ. PIN-994821"
                    value={formData.backupCode}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/* Submit Buttons */}
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                type="submit"
                className="btn btn-primary"
                style={{ padding: '12px 24px', fontSize: '0.95rem' }}
              >
                <CheckCircle2 size={18} />
                <span>{editingId ? 'រក្សាទុកការកែប្រែ' : 'ដាក់លក់គណនីភ្លាមៗ'}</span>
              </button>

              <button
                type="button"
                onClick={() => { setActiveTab('list'); setEditingId(null); }}
                className="btn btn-secondary"
                style={{ padding: '12px 24px', fontSize: '0.95rem' }}
              >
                បោះបង់
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ================= TAB 2: INVENTORY TABLE ================= */}
      {activeTab === 'list' && (
        <div className="glass-panel" style={{ padding: '24px', borderRadius: '24px', overflowX: 'auto' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '18px'
          }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800 }}>
              បញ្ជីគណនី Roblox ក្នុងប្រព័ន្ធ
            </h2>
            <button
              onClick={() => { setActiveTab('add'); setEditingId(null); }}
              className="btn btn-primary"
              style={{ padding: '8px 16px', fontSize: '0.85rem' }}
            >
              <PlusCircle size={16} />
              <span>បន្ថែមគណនីថ្មី</span>
            </button>
          </div>

          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: '0.88rem'
          }}>
            <thead>
              <tr style={{
                borderBottom: '1px solid var(--border-color)',
                color: 'var(--text-dim)',
                textAlign: 'left'
              }}>
                <th style={{ padding: '12px 14px' }}>រូបភាព</th>
                <th style={{ padding: '12px 14px' }}>ចំណងជើង និងប្រភេទ</th>
                <th style={{ padding: '12px 14px' }}>កម្រិត និង Robux</th>
                <th style={{ padding: '12px 14px' }}>តម្លៃលក់</th>
                <th style={{ padding: '12px 14px' }}>ឈ្មោះ Username</th>
                <th style={{ padding: '12px 14px' }}>ស្ថានភាពស្តុក</th>
                <th style={{ padding: '12px 14px', textAlign: 'center' }}>សកម្មភាព</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr
                  key={product.id}
                  style={{
                    borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                    transition: 'background 0.2s ease'
                  }}
                >
                  {/* Thumbnail */}
                  <td style={{ padding: '12px 14px' }}>
                    <img
                      src={product.image}
                      alt={product.title}
                      style={{
                        width: '60px',
                        height: '45px',
                        borderRadius: '8px',
                        objectFit: 'cover'
                      }}
                      onError={(e) => { e.target.src = '/images/bloxfruits.jpg'; }}
                    />
                  </td>

                  {/* Title & Category */}
                  <td style={{ padding: '12px 14px', maxWidth: '280px' }}>
                    <div style={{ fontWeight: 700, color: '#ffffff', marginBottom: '4px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                      {product.title}
                    </div>
                    <span className="badge badge-primary" style={{ fontSize: '0.74rem' }}>
                      {product.category}
                    </span>
                  </td>

                  {/* Level & Robux */}
                  <td style={{ padding: '12px 14px' }}>
                    <div style={{ color: '#38bdf8', fontWeight: 600 }}>{product.level}</div>
                    <div style={{ fontSize: '0.78rem', color: '#fbbf24' }}>
                      {product.robux ? `${product.robux.toLocaleString()} Robux` : '0 Robux'}
                    </div>
                  </td>

                  {/* Price */}
                  <td style={{ padding: '12px 14px' }}>
                    <div style={{ fontWeight: 800, color: '#ffffff' }}>
                      {formatUSD(product.priceUsd)}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>
                      ~ {formatKHR(product.priceKhr || product.priceUsd * 4100)}
                    </div>
                  </td>

                  {/* Login Username */}
                  <td style={{ padding: '12px 14px' }}>
                    <code style={{
                      background: 'rgba(0,0,0,0.4)',
                      padding: '3px 8px',
                      borderRadius: '6px',
                      color: '#a5b4fc',
                      fontSize: '0.84rem'
                    }}>
                      {product.credentials?.username || 'គ្មាន'}
                    </code>
                  </td>

                  {/* Status Toggle */}
                  <td style={{ padding: '12px 14px' }}>
                    <button
                      onClick={() => handleToggleStatus(product)}
                      style={{
                        border: 'none',
                        background: 'none',
                        cursor: 'pointer',
                        padding: 0
                      }}
                    >
                      {product.status === 'available' ? (
                        <span className="badge badge-green">មានក្នុងស្តុក</span>
                      ) : (
                        <span className="badge badge-red">លក់ដាច់ហើយ</span>
                      )}
                    </button>
                  </td>

                  {/* Actions */}
                  <td style={{ padding: '12px 14px', textAlign: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                      <button
                        onClick={() => handleStartEdit(product)}
                        className="btn btn-ghost"
                        style={{ padding: '6px', color: '#818cf8' }}
                        title="កែប្រែគណនី"
                      >
                        <Edit3 size={16} />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`តើអ្នកពិតជាចង់លុបគណនី "${product.title}" មែនទេ?`)) {
                            onDeleteProduct(product.id);
                          }
                        }}
                        className="btn btn-ghost"
                        style={{ padding: '6px', color: '#f87171' }}
                        title="លុបគណនី"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
