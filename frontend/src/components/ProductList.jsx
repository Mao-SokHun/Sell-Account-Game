import React, { useState } from 'react';
import { ProductCard } from './ProductCard';
import { GAME_CATEGORIES } from '../data/initialProducts';
import { 
  SlidersHorizontal, AlertCircle, Gamepad2, 
  Crown, Sparkles, Flame, Swords, Star, ArrowRight, TrendingUp
} from 'lucide-react';
import { CustomDropdown } from './CustomDropdown';
import { formatUSD } from '../utils/currency';

export const ProductList = ({
  products,
  selectedCategory,
  setSelectedCategory,
  searchQuery,
  onSelectProduct
}) => {
  const [sortBy, setSortBy] = useState('featured');

  // Filter products by category and search query
  const filteredProducts = products.filter(item => {
    const isAll = selectedCategory === 'ទាំងអស់' || selectedCategory === 'ទាំងអស់ (All)';
    const matchesCategory = isAll || item.category === selectedCategory;
    const matchesSearch = !searchQuery || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.priceUsd - b.priceUsd;
    if (sortBy === 'price-high') return b.priceUsd - a.priceUsd;
    return 0;
  });

  const getCategoryTheme = (category) => {
    switch (category) {
      case 'Blox Fruits':
        return { icon: <Swords size={20} color="#38bdf8" />, bg: 'rgba(56, 189, 248, 0.12)' };
      case 'ឈុត VIP Avatar':
        return { icon: <Crown size={20} color="#fbbf24" />, bg: 'rgba(251, 191, 36, 0.12)' };
      case 'Pet Sim 99':
        return { icon: <Sparkles size={20} color="#c084fc" />, bg: 'rgba(192, 132, 252, 0.12)' };
      case 'Blade Ball':
        return { icon: <Flame size={20} color="#f43f5e" />, bg: 'rgba(244, 63, 94, 0.12)' };
      default:
        return { icon: <Gamepad2 size={20} color="#8b5cf6" />, bg: 'rgba(139, 92, 246, 0.12)' };
    }
  };

  const getCategoryCount = (category) => {
    if (category === 'ទាំងអស់') return products.length;
    return products.filter(p => p.category === category).length;
  };

  // Top trending accounts for "Hot This Week" sidebar
  const hotThisWeek = [...products].slice(0, 5);

  return (
    <section id="product-catalog-section" style={{ marginBottom: '60px' }}>
      {/* 1. TRENDING CATEGORIES (PIXELVAULT SQUIRCLES) */}
      <div style={{ marginBottom: '32px' }}>
        <div className="pixel-categories-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h2 className="pixel-section-title">
              Trending Categories
            </h2>
            <span style={{ fontSize: '0.82rem', color: '#94a3b8' }}>
              ({GAME_CATEGORIES.length} ប្រភេទ)
            </span>
          </div>
        </div>

        {/* SQUIRCLES ROW */}
        <div className="pixel-categories-row">
          {GAME_CATEGORIES.map(category => {
            const count = getCategoryCount(category);
            const isActive = selectedCategory === category;
            const theme = getCategoryTheme(category);

            return (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`pixel-squircle ${isActive ? 'active' : ''}`}
              >
                <div 
                  className="pixel-squircle-icon"
                  style={{ background: theme.bg }}
                >
                  {theme.icon}
                </div>
                <div className="pixel-squircle-label">
                  {category}
                </div>
                <div className="pixel-squircle-count">
                  {count}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. SUBHEADER: COUNT + SORTING */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '14px',
        marginBottom: '20px',
        paddingBottom: '14px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <h2 className="pixel-section-title" style={{ fontSize: '1.25rem' }}>
            {selectedCategory === 'ទាំងអស់' ? 'គណនីទាំងអស់ (All Accounts)' : selectedCategory}
          </h2>
          <span style={{
            fontSize: '0.78rem',
            padding: '2px 8px',
            borderRadius: '6px',
            background: 'rgba(139, 92, 246, 0.15)',
            color: '#c4b5fd',
            fontWeight: 700
          }}>
            {sortedProducts.length} គណនី
          </span>
        </div>

        {/* Sorting Dropdown */}
        <CustomDropdown
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          icon={SlidersHorizontal}
          options={[
            { value: 'featured', label: 'តម្រៀប៖ ពេញនិយមបំផុត (Featured)' },
            { value: 'price-low', label: 'តម្លៃ៖ ពីទាបទៅខ្ពស់' },
            { value: 'price-high', label: 'តម្លៃ៖ ពីខ្ពស់ទៅទាប' }
          ]}
          buttonStyle={{
            padding: '8px 16px',
            fontSize: '0.84rem',
            borderRadius: '12px',
            background: 'rgba(18, 15, 32, 0.8)',
            border: '1px solid rgba(255, 255, 255, 0.12)'
          }}
        />
      </div>

      {/* 3. CATALOG CONTAINER: MAIN CARDS GRID + HOT THIS WEEK SIDEBAR */}
      <div className="pixel-catalog-container">
        {/* Left Column: Product Cards Grid */}
        <div>
          {sortedProducts.length > 0 ? (
            <div className="pixel-cards-grid">
              {sortedProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onSelectProduct={onSelectProduct}
                />
              ))}
            </div>
          ) : (
            <div className="glass-panel" style={{
              padding: '60px 20px',
              textAlign: 'center',
              borderRadius: '20px',
              border: '1px dashed rgba(255, 255, 255, 0.15)',
              background: 'rgba(18, 15, 32, 0.7)'
            }}>
              <AlertCircle size={46} color="#38bdf8" style={{ marginBottom: '16px' }} />
              <h3 style={{ fontSize: '1.2rem', marginBottom: '8px', color: '#ffffff' }}>
                រកមិនឃើញគណនីត្រូវនឹងការស្វែងរកទេ
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: '420px', margin: '0 auto 16px auto' }}>
                សូមសាកល្បងវាយពាក្យគន្លឹះផ្សេង ឬចុចមើលប្រភេទហ្គេមផ្សេងទៀត។
              </p>
              <button
                type="button"
                onClick={() => setSelectedCategory('ទាំងអស់')}
                className="btn btn-primary"
                style={{ padding: '8px 18px', fontSize: '0.86rem' }}
              >
                បង្ហាញគណនីទាំងអស់ឡើងវិញ
              </button>
            </div>
          )}
        </div>

        {/* Right Column: Hot This Week Sidebar (PixelVault Feature) */}
        <aside className="pixel-hot-sidebar">
          <div className="pixel-hot-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <TrendingUp size={18} color="#8b5cf6" />
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#ffffff' }}>
                Hot This Week
              </h3>
            </div>
            <span style={{ fontSize: '0.74rem', color: '#10b981', fontWeight: 700 }}>
              Live
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {hotThisWeek.map((item, idx) => (
              <div
                key={item.id}
                className="pixel-hot-item"
                onClick={() => onSelectProduct(item)}
              >
                <span className="pixel-hot-rank">
                  {idx + 1}
                </span>

                <div className="pixel-hot-thumb">
                  <img src={item.image} alt={item.title} />
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontSize: '0.88rem',
                    fontWeight: 700,
                    color: '#ffffff',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    lineHeight: 1.3
                  }}>
                    {item.title}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '3px' }}>
                    <span style={{ fontSize: '0.74rem', color: '#94a3b8' }}>
                      {item.category}
                    </span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', fontSize: '0.74rem', color: '#fbbf24', fontWeight: 700 }}>
                      <Star size={10} fill="#fbbf24" color="#fbbf24" /> 5.0
                    </span>
                  </div>
                </div>

                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#ffffff' }}>
                    {formatUSD(item.priceUsd)}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '16px', paddingTop: '14px', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
            <button
              type="button"
              onClick={() => setSelectedCategory('ទាំងអស់')}
              style={{
                width: '100%',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                color: '#c4b5fd',
                padding: '9px 12px',
                borderRadius: '10px',
                fontSize: '0.84rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => e.currentTarget.style.background = 'rgba(139, 92, 246, 0.2)'}
              onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'}
            >
              <span>View All Trending</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </aside>
      </div>
    </section>
  );
};
