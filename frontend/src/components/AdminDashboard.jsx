import React, { useState } from 'react';
import { 
  PlusCircle, Package, DollarSign, CheckCircle2, 
  Trash2, Edit3, ArrowLeft, Image as ImageIcon, 
  Key, ShieldCheck, Tag, AlertTriangle,
  Upload, Camera, Smartphone, Monitor, X, Layers, Plus
} from 'lucide-react';
import { formatUSD, formatKHR, convertUsdToKhr } from '../utils/currency';
import { GAME_CATEGORIES } from '../data/initialProducts';
import { CustomDropdown } from './CustomDropdown';

// Default templates for game in-game statistics
export const DEFAULT_GAME_STATS_TEMPLATES = {
  'Blox Fruits': [
    { key: 'ផ្លែបិសាច', value: 'Kitsune (Awakened ពេញ Mastery 600)' },
    { key: 'ក្បាច់ប្រយុទ្ធ', value: 'Godhuman និង Sanguine Art' },
    { key: 'ក្បាច់ Melee ផ្សេងទៀត', value: 'Superhuman, Death Step, Sharkman Karate' },
    { key: 'ដាវ និងអាវុធ', value: 'ដាវគូ Cursed Dual Katana (CDK), TTK, Hallow Scythe' },
    { key: 'កាំភ្លើង', value: 'Soul Guitar' },
    { key: 'ប្រភេទតួអង្គ (Race)', value: 'Cyborg V4 (ដោះសោ Gears ទាំងអស់)' },
    { key: 'ពិន្ទុ Bounty', value: '១២.៥ លាន (12.5M Bounty)' },
    { key: 'ប្រាក់ Beli ក្នុងហ្គេម', value: '៨៥ លាន Beli' },
    { key: 'បំណែក Fragments', value: '១២០,០០០ Fragments' }
  ],
  'ឈុត VIP Avatar': [
    { key: 'អាយុកាលគណនី', value: 'បង្កើតឡើង ៥ ឆ្នាំមុន (គណនីចាស់)' },
    { key: 'ទឹកប្រាក់ Robux', value: '៥០,២៣០ Robux (មានស្រាប់ក្នុងគណនី)' },
    { key: 'គ្រឿងតុបតែង', value: 'Golden Valkyrie Helm, Dominus Rex Hood' },
    { key: 'ឈុតរូបរាង', value: 'Korblox Deathspeaker (ជើងឆ្អឹង Korblox Leg)' },
    { key: 'កាយវិការ Animation', value: 'Ninja, Cartoony, Levitation, Mage' },
    { key: 'មេដាយហ្គេម', value: 'ច្រើនជាង ៣៥០+ Game Badges' },
    { key: 'របស់របរក្នុងកាតាប', value: 'ច្រើនជាង ១,២០០+ Accessories និងសម្លៀកបំពាក់' }
  ],
  'Pet Sim 99': [
    { key: 'កម្រិតតួអង្គ', value: 'Rank 28 (Pro Trader)' },
    { key: 'សត្វចិញ្ចឹមកំពូល', value: 'Huge Titanic Rainbow Dragon, សត្វ Huge ១៥ ក្បាល' },
    { key: 'គ្រាប់ពេជ្រ Gems', value: '៨,៤៥០,៣២១,៧៨៩ គ្រាប់ពេជ្រ (Gems)' },
    { key: 'កាក់ Coins', value: '១៥,២០០,៥០០,៦០០ កាក់ (Coins)' },
    { key: 'សំបុត្រពិសេស Gamepass', value: 'VIP Gamepass, Auto Farm, Magic Egg, Huge Hunter' },
    { key: 'សៀវភៅ Enchants', value: 'Overload, Lightning, Super Magnet (កម្រិត Max)' }
  ],
  'Blade Ball': [
    { key: 'កម្រិត Rank', value: 'Rank Mythic (ពិន្ទុ ១២៥០+)' },
    { key: 'ដាវពន្លឺពិសេស', value: 'Chromatic Void Blade' },
    { key: 'ក្បាច់ផ្ទុះ Explosion', value: 'VIP Explosion' },
    { key: 'សមត្ថភាព Abilities', value: 'Rapture, Infinity, Forcefield' }
  ]
};

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
    gallery: ['/images/bloxfruits.jpg'],
    description: '',
    emailStatus: 'គណនីស្អាត ១០០% មិនទាន់ភ្ជាប់ Email (អាចដាក់ Email ផ្ទាល់ខ្លួន)',
    status: 'available',
    // Credentials
    username: '',
    password: '',
    linkedEmail: 'មិនទាន់ភ្ជាប់ (ស្អាត ១០០%)'
  });

  // Dynamic In-Game Detailed Stats (ព័ត៌មានលម្អិតក្នុងហ្គេម)
  const [customStats, setCustomStats] = useState(() => DEFAULT_GAME_STATS_TEMPLATES['Blox Fruits']);

  const handleAddStatRow = () => {
    setCustomStats(prev => [...prev, { key: '', value: '' }]);
  };

  const handleUpdateStatRow = (index, field, val) => {
    setCustomStats(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: val };
      return updated;
    });
  };

  const handleRemoveStatRow = (index) => {
    setCustomStats(prev => prev.filter((_, i) => i !== index));
  };

  const handleLoadTemplate = (categoryName) => {
    const template = DEFAULT_GAME_STATS_TEMPLATES[categoryName] || [];
    setCustomStats([...template]);
  };

  const [formSuccess, setFormSuccess] = useState('');



  // Handle Unified Images Upload from Mobile (Camera / Gallery) or Computer
  const handleImagesUpload = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    files.forEach(file => {
      if (file.size > 8 * 1024 * 1024) {
        alert(`រូបភាព "${file.name}" ធំជាង 8MB! សូមជ្រើសរើសរូបភាពតូចជាងនេះ`);
        return;
      }

      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        const dataUrl = uploadEvent.target.result;
        setFormData(prev => {
          const currentGallery = prev.gallery || [];
          if (currentGallery.includes(dataUrl)) return prev;
          const newGallery = [...currentGallery, dataUrl];
          return {
            ...prev,
            image: prev.image || newGallery[0],
            gallery: newGallery
          };
        });
      };
      reader.readAsDataURL(file);
    });

    e.target.value = '';
  };

  // Set selected image as the main cover
  const handleSetCover = (imgUrl) => {
    setFormData(prev => ({
      ...prev,
      image: imgUrl
    }));
  };

  // Remove single image from account gallery
  const handleRemoveImage = (imgUrlToRemove) => {
    setFormData(prev => {
      const updatedGallery = (prev.gallery || []).filter(img => img !== imgUrlToRemove);
      return {
        ...prev,
        image: prev.image === imgUrlToRemove ? (updatedGallery[0] || '') : prev.image,
        gallery: updatedGallery
      };
    });
  };

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
      gallery: product.gallery || (product.image ? [product.image] : []),
      description: product.description || '',
      emailStatus: product.emailStatus || 'គណនីស្អាត មិនទាន់ភ្ជាប់ Email',
      status: product.status || 'available',
      username: product.credentials?.username || '',
      password: product.credentials?.password || '',
      linkedEmail: product.credentials?.linkedEmail || 'មិនទាន់ភ្ជាប់'
    });

    // Populate customStats from product.gameStats
    if (product.gameStats && Object.keys(product.gameStats).length > 0) {
      const excludedKeys = ['ការប្រគល់ជូន', 'ស្ថានភាព Email', 'កម្រិតគណនី', 'ចំនួន Robux', 'ប្រភេទហ្គេម'];
      const statsList = Object.entries(product.gameStats)
        .filter(([k]) => !excludedKeys.includes(k))
        .map(([k, v]) => ({ key: k, value: String(v) }));
      setCustomStats(statsList.length > 0 ? statsList : (DEFAULT_GAME_STATS_TEMPLATES[product.category] || []));
    } else {
      setCustomStats(DEFAULT_GAME_STATS_TEMPLATES[product.category] || []);
    }

    setActiveTab('add');
  };

  // Handle Submit (Add or Edit)
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.username.trim() || !formData.password.trim()) {
      alert('សូមបំពេញព័ត៌មានចាំបាច់៖ ចំណងជើងគណនី, ឈ្មោះគណនី Roblox និងពាក្យសម្ងាត់!');
      return;
    }

    if (!formData.image) {
      alert('សូមជ្រើសរើស ឬ Upload រូបភាពគណនីពីទូរស័ព្ទ ឬកុំព្យូទ័រ!');
      return;
    }

    // Build comprehensive gameStats object (combining top specs & custom attributes)
    const gameStatsObj = {
      'ប្រភេទហ្គេម': formData.category,
      'កម្រិតគណនី': formData.level || 'កម្រិតធម្មតា',
      'ចំនួន Robux': formData.robux > 0 ? `${formData.robux.toLocaleString()} Robux` : 'គ្មាន',
      'ស្ថានភាព Email': formData.emailStatus,
      'ការប្រគល់ជូន': 'ស្វ័យប្រវត្តភ្លាមៗ'
    };

    customStats.forEach(item => {
      if (item.key.trim() && item.value.trim()) {
        gameStatsObj[item.key.trim()] = item.value.trim();
      }
    });

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
      gallery: formData.gallery && formData.gallery.length > 0 ? formData.gallery : [formData.image],
      description: formData.description,
      emailStatus: formData.emailStatus,
      status: formData.status,
      gameStats: gameStatsObj,
      credentials: {
        username: formData.username.trim(),
        password: formData.password.trim(),
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
        gallery: ['/images/bloxfruits.jpg'],
        description: '',
        emailStatus: 'គណនីស្អាត ១០០% មិនទាន់ភ្ជាប់ Email (អាចដាក់ Email ផ្ទាល់ខ្លួន)',
        status: 'available',
        username: '',
        password: '',
        linkedEmail: 'មិនទាន់ភ្ជាប់ (ស្អាត ១០០%)'
      });
      setCustomStats(DEFAULT_GAME_STATS_TEMPLATES['Blox Fruits']);
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
          <button
            type="button"
            onClick={() => { setActiveTab('list'); setEditingId(null); }}
            className="btn btn-secondary"
            style={{ padding: '7px 14px', fontSize: '0.84rem', marginBottom: '18px', display: 'inline-flex', gap: '6px' }}
          >
            <ArrowLeft size={15} />
            <span>ត្រឡប់ទៅបញ្ជីគណនី</span>
          </button>

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
                <CustomDropdown
                  name="category"
                  value={formData.category}
                  fullWidth={true}
                  options={[
                    'Blox Fruits',
                    'ឈុត VIP Avatar',
                    'Pet Sim 99',
                    'Blade Ball'
                  ]}
                  onChange={(e) => {
                    const newCat = e.target.value;
                    handleChange(e);
                    if (!editingId) {
                      setCustomStats(DEFAULT_GAME_STATS_TEMPLATES[newCat] || []);
                    }
                  }}
                />
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

            {/* Unified Account Photos & Gallery Uploader */}
            <div className="form-group" style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px', flexWrap: 'wrap', gap: '6px' }}>
                <label className="form-label" style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <ImageIcon size={16} color="var(--primary)" />
                  <span>រូបភាពគណនី និងរូបភាពក្នុងហ្គេម (Account Photos & Gallery) *</span>
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.78rem', color: '#38bdf8' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Smartphone size={13} /> ទូរស័ព្ទ (Camera / Gallery)
                  </span>
                  <span style={{ color: 'var(--border-color)' }}>•</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Monitor size={13} /> កុំព្យូទ័រ
                  </span>
                </div>
              </div>

              {/* Single Unified Hidden File Input */}
              <input
                type="file"
                id="unified-images-upload"
                accept="image/*"
                multiple
                style={{ display: 'none' }}
                onChange={handleImagesUpload}
              />

              {/* If images exist, showcase Main Cover + Thumbnails row */}
              {formData.gallery && formData.gallery.length > 0 ? (
                <div>
                  {/* Main Cover Showcase */}
                  <div style={{
                    position: 'relative',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    border: '2px solid rgba(99, 102, 241, 0.45)',
                    background: '#0a0f1d',
                    marginBottom: '14px',
                    height: '240px'
                  }}>
                    <img
                      src={formData.image || formData.gallery[0]}
                      alt="Account Cover Preview"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block'
                      }}
                    />

                    {/* Top Badges and Action */}
                    <div style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      right: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      zIndex: 2
                    }}>
                      <span className="badge badge-primary" style={{ padding: '6px 12px', fontSize: '0.8rem', backdropFilter: 'blur(8px)', background: 'rgba(99, 102, 241, 0.85)', color: '#fff' }}>
                        ⭐️ រូបភាពគម្របមេ (Main Cover)
                      </span>

                      <label
                        htmlFor="unified-images-upload"
                        className="btn btn-primary"
                        style={{ padding: '6px 14px', fontSize: '0.8rem', cursor: 'pointer', boxShadow: '0 4px 14px rgba(0,0,0,0.6)' }}
                      >
                        <Plus size={14} />
                        <span>+ បន្ថែមរូបទៀត</span>
                      </label>
                    </div>

                    <div style={{
                      position: 'absolute',
                      bottom: '10px',
                      left: '12px',
                      background: 'rgba(15, 23, 42, 0.85)',
                      backdropFilter: 'blur(8px)',
                      padding: '4px 12px',
                      borderRadius: '8px',
                      fontSize: '0.78rem',
                      color: 'var(--accent-green)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      border: '1px solid rgba(16, 185, 129, 0.3)'
                    }}>
                      <CheckCircle2 size={13} />
                      <span>សរុប {formData.gallery.length} រូបភាពក្នុងបញ្ជី</span>
                    </div>
                  </div>

                  {/* Thumbnail Strip with Cover Indicator and Delete */}
                  <div style={{
                    background: 'rgba(15, 23, 42, 0.5)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '14px',
                    padding: '12px 14px',
                    marginBottom: '16px'
                  }}>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
                      ចុចលើរូបភាពណាមួយដើម្បីកំណត់ជា <strong>រូបភាពគម្រប (Cover)</strong> ឬចុចសញ្ញា ✕ ដើម្បីលុប៖
                    </div>
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
                      {formData.gallery.map((imgUrl, idx) => {
                        const isCover = formData.image === imgUrl;
                        return (
                          <div
                            key={idx}
                            style={{
                              position: 'relative',
                              width: '90px',
                              height: '68px',
                              borderRadius: '10px',
                              overflow: 'hidden',
                              border: isCover ? '2px solid var(--primary)' : '1px solid rgba(255,255,255,0.15)',
                              boxShadow: isCover ? '0 0 12px rgba(99, 102, 241, 0.5)' : 'none',
                              cursor: 'pointer',
                              transition: 'all 0.2s ease'
                            }}
                            onClick={() => handleSetCover(imgUrl)}
                            title={isCover ? 'រូបភាពគម្របមេបច្ចុប្បន្ន' : 'ចុចដើម្បីកំណត់ជារូបភាពគម្របមេ'}
                          >
                            <img
                              src={imgUrl}
                              alt={`Thumbnail ${idx + 1}`}
                              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                            {isCover && (
                              <div style={{
                                position: 'absolute',
                                bottom: '0',
                                left: '0',
                                right: '0',
                                background: 'rgba(99, 102, 241, 0.9)',
                                color: '#fff',
                                fontSize: '0.62rem',
                                fontWeight: 700,
                                textAlign: 'center',
                                padding: '1px 0'
                              }}>
                                ⭐️ គម្រប
                              </div>
                            )}
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRemoveImage(imgUrl);
                              }}
                              style={{
                                position: 'absolute',
                                top: '3px',
                                right: '3px',
                                width: '20px',
                                height: '20px',
                                borderRadius: '50%',
                                background: 'rgba(239, 68, 68, 0.9)',
                                border: 'none',
                                color: '#fff',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                padding: 0
                              }}
                              title="លុបរូបភាពនេះ"
                            >
                              <X size={12} />
                            </button>
                          </div>
                        );
                      })}

                      {/* Add more button tile in the strip */}
                      <label
                        htmlFor="unified-images-upload"
                        style={{
                          width: '90px',
                          height: '68px',
                          borderRadius: '10px',
                          border: '2px dashed rgba(99, 102, 241, 0.4)',
                          background: 'rgba(99, 102, 241, 0.08)',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '4px',
                          cursor: 'pointer',
                          color: '#818cf8',
                          fontSize: '0.72rem',
                          fontWeight: 600,
                          transition: 'all 0.2s ease'
                        }}
                        title="ជ្រើសរើសរូបភាពបន្ថែម"
                      >
                        <Plus size={18} />
                        <span>+ ថែមរូប</span>
                      </label>
                    </div>
                  </div>
                </div>
              ) : (
                /* Empty state: Single unified dropzone */
                <label
                  htmlFor="unified-images-upload"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '38px 20px',
                    border: '2px dashed rgba(99, 102, 241, 0.5)',
                    borderRadius: '18px',
                    background: 'rgba(15, 23, 42, 0.5)',
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                    marginBottom: '14px',
                    textAlign: 'center'
                  }}
                >
                  <div style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '16px',
                    background: 'rgba(99, 102, 241, 0.18)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#818cf8',
                    marginBottom: '12px'
                  }}>
                    <Upload size={28} />
                  </div>
                  <div style={{ fontSize: '1.02rem', fontWeight: 700, color: '#ffffff', marginBottom: '4px' }}>
                    ចុចទីនេះដើម្បីជ្រើសរើសរូបភាពពីទូរស័ព្ទ ឬកុំព្យូទ័រ
                  </div>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-dim)', maxWidth: '460px', margin: 0 }}>
                    ជ្រើសរើសរូបភាពពី Photo Gallery, ថតរូបថ្មី ឬ Upload ឯកសារ JPG, PNG, WEBP (អាចជ្រើសរើសរូបភាពច្រើនសន្លឹកក្នុងពេលតែមួយបាន)
                  </p>
                </label>
              )}


            </div>

            {/* ================= DETAILED IN-GAME STATS TABLE EDITOR ================= */}
            <div style={{
              background: 'rgba(15, 23, 42, 0.65)',
              border: '1px solid rgba(99, 102, 241, 0.3)',
              borderRadius: '20px',
              padding: '24px',
              marginBottom: '28px'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '12px',
                flexWrap: 'wrap',
                gap: '10px'
              }}>
                <div>
                  <h3 style={{ fontSize: '1.08rem', fontWeight: 700, color: '#ffffff', margin: 0 }}>
                    ព័ត៌មានលម្អិតក្នុងហ្គេម (In-Game Detailed Stats Table)
                  </h3>
                </div>

                {/* Quick Category Templates */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>ផ្ទុកគំរូរហ័ស:</span>
                  {Object.keys(DEFAULT_GAME_STATS_TEMPLATES).map(cat => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => handleLoadTemplate(cat)}
                      className="btn btn-secondary"
                      style={{
                        padding: '4px 10px',
                        fontSize: '0.74rem',
                        borderRadius: '8px',
                        background: formData.category === cat ? 'rgba(99, 102, 241, 0.25)' : 'rgba(255, 255, 255, 0.05)',
                        borderColor: formData.category === cat ? 'var(--primary)' : 'rgba(255, 255, 255, 0.1)'
                      }}
                      title={`ផ្ទុកគំរូទម្រង់សម្រាប់ ${cat}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '18px' }}>
                * ព័ត៌មានដែលអ្នកបញ្ចូលខាងក្រោមនេះ នឹងត្រូវបង្ហាញលើតារាងលម្អិតក្នុងហ្គេម (ដូចជា៖ ផ្លែបិសាច, ក្បាច់ប្រយុទ្ធ, ដាវ CDK, គ្រឿងតុបតែង Dominus, ឈុត Korblox, សត្វចិញ្ចឹម Huge Pets...) ឱ្យអ្នកទិញបានឃើញច្បាស់។
              </p>

              {/* Rows List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
                {customStats.map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'minmax(130px, 1fr) minmax(180px, 1.8fr) 42px',
                      gap: '10px',
                      alignItems: 'center'
                    }}
                  >
                    <input
                      type="text"
                      className="form-input"
                      placeholder="ឈ្មោះលក្ខណៈ (ឧ. ផ្លែបិសាច, ដាវ)"
                      value={item.key}
                      onChange={(e) => handleUpdateStatRow(idx, 'key', e.target.value)}
                      style={{ fontSize: '0.86rem', padding: '8px 12px' }}
                    />
                    <input
                      type="text"
                      className="form-input"
                      placeholder="ព័ត៌មានជាក់ស្តែង (ឧ. Kitsune Awakened, CDK)"
                      value={item.value}
                      onChange={(e) => handleUpdateStatRow(idx, 'value', e.target.value)}
                      style={{ fontSize: '0.86rem', padding: '8px 12px' }}
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveStatRow(idx)}
                      className="btn btn-ghost"
                      style={{
                        color: '#f87171',
                        padding: '8px',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'rgba(239, 68, 68, 0.1)'
                      }}
                      title="លុបជួរនេះ"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={handleAddStatRow}
                className="btn btn-secondary"
                style={{
                  padding: '8px 16px',
                  fontSize: '0.84rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  borderRadius: '10px'
                }}
              >
                <PlusCircle size={15} />
                <span>+ បន្ថែមព័ត៌មានលម្អិតមួយជួរទៀត</span>
              </button>
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
                      type="button"
                      onClick={() => handleToggleStatus(product)}
                      style={{
                        border: 'none',
                        background: 'none',
                        cursor: 'pointer',
                        padding: 0,
                        fontFamily: 'var(--font-family)'
                      }}
                      title="ចុចដើម្បីប្តូរស្ថានភាព ស្តុក / លក់ដាច់"
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
