import React, { useState } from 'react';
import { ProductCard } from './ProductCard';
import { GAME_CATEGORIES } from '../data/initialProducts';
import { 
  SlidersHorizontal, AlertCircle, Gamepad2, 
  Crown, Sparkles, Flame, Swords, ShieldCheck, Zap
} from 'lucide-react';
import { CustomDropdown } from './CustomDropdown';

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
    const matchesSearch = searchQuery === '' || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.priceUsd - b.priceUsd;
    if (sortBy === 'price-high') return b.priceUsd - a.priceUsd;
    return 0; // default order
  });

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Blox Fruits':
        return <Swords size={16} color="#38bdf8" />;
      case 'ឈុត VIP Avatar':
        return <Crown size={16} color="#fbbf24" />;
      case 'Pet Sim 99':
        return <Sparkles size={16} color="#c084fc" />;
      case 'Blade Ball':
        return <Flame size={16} color="#f43f5e" />;
      default:
        return <Gamepad2 size={16} color="#818cf8" />;
    }
  };

  const getCategoryCount = (category) => {
    if (category === 'ទាំងអស់') return products.length;
    return products.filter(p => p.category === category).length;
  };

  const availableCount = products.filter(p => p.status === 'available').length;

  return (
    <section id="product-catalog-section" style={{ marginBottom: '60px' }}>
      {/* Section Header with Gaming Vibe */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '14px',
        marginBottom: '18px',
        paddingBottom: '14px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
      }}>
        <div>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '0.78rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '1px',
            color: '#38bdf8',
            marginBottom: '6px'
          }}>
            <span className="pulse-dot-green" />
            <span>កាតាឡុកគណនីហ្គេមផ្លូវការ • ROBLOX VERIFIED</span>
          </div>
          <h2 style={{
            fontSize: '1.65rem',
            fontWeight: 900,
            color: '#ffffff',
            margin: 0,
            letterSpacing: '-0.3px'
          }}>
            ជ្រើសរើសគណនី Roblox ដែលអ្នកពេញចិត្ត
          </h2>
        </div>

        {/* Live inventory pill */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: 'rgba(15, 23, 42, 0.7)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          padding: '6px 14px',
          borderRadius: '12px',
          fontSize: '0.82rem',
          color: '#cbd5e1'
        }}>
          <Zap size={14} color="#10b981" />
          <span>មានក្នុងស្តុក៖ <strong style={{ color: '#10b981' }}>{availableCount}</strong> គណនីស្អាត</span>
        </div>
      </div>

      {/* Category Tabs & Filter Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '14px',
        marginBottom: '26px'
      }}>
        {/* Gaming Game Selector Bar */}
        <div className="game-category-bar">
          {GAME_CATEGORIES.map(category => {
            const count = getCategoryCount(category);
            const isActive = selectedCategory === category;

            return (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`game-tab-pill ${isActive ? 'active' : ''}`}
              >
                {getCategoryIcon(category)}
                <span>{category}</span>
                <span style={{
                  fontSize: '0.74rem',
                  padding: '1px 7px',
                  borderRadius: '10px',
                  background: isActive ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.08)',
                  color: isActive ? '#ffffff' : '#94a3b8',
                  fontWeight: 800
                }}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Sorting Dropdown */}
        <CustomDropdown
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          icon={SlidersHorizontal}
          options={[
            { value: 'featured', label: 'តម្រៀប៖ ពេញនិយមបំផុត' },
            { value: 'price-low', label: 'តម្លៃ៖ ពីទាបទៅខ្ពស់' },
            { value: 'price-high', label: 'តម្លៃ៖ ពីខ្ពស់ទៅទាប' }
          ]}
          buttonStyle={{
            padding: '8px 16px',
            fontSize: '0.84rem',
            borderRadius: '12px',
            background: 'rgba(15, 23, 42, 0.8)',
            border: '1px solid rgba(255, 255, 255, 0.12)'
          }}
        />
      </div>

      {/* Grid of Product Cards */}
      {sortedProducts.length > 0 ? (
        <div className="grid-cards">
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
          background: 'rgba(11, 15, 28, 0.7)'
        }}>
          <AlertCircle size={46} color="#38bdf8" style={{ marginBottom: '16px' }} />
          <h3 style={{ fontSize: '1.2rem', marginBottom: '8px', color: '#ffffff' }}>
            រកមិនឃើញគណនី Roblox ត្រូវនឹងការស្វែងរកទេ
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
    </section>
  );
};
