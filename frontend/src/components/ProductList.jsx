import React, { useState } from 'react';
import { ProductCard } from './ProductCard';
import { GAME_CATEGORIES } from '../data/initialProducts';
import { SlidersHorizontal, AlertCircle } from 'lucide-react';
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

  return (
    <section style={{ marginBottom: '60px' }}>
      {/* Category Tabs & Filter Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
        marginBottom: '24px'
      }}>
        {/* Categories */}
        <div style={{
          display: 'flex',
          gap: '8px',
          overflowX: 'auto',
          paddingBottom: '4px',
          maxWidth: '100%'
        }}>
          {GAME_CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className="btn"
              style={{
                padding: '8px 18px',
                fontSize: '0.88rem',
                borderRadius: 'var(--radius-full)',
                background: selectedCategory === category 
                  ? 'linear-gradient(135deg, #6366f1, #4f46e5)' 
                  : 'rgba(255, 255, 255, 0.05)',
                color: selectedCategory === category ? '#ffffff' : 'var(--text-muted)',
                border: selectedCategory === category 
                  ? '1px solid #818cf8' 
                  : '1px solid rgba(255, 255, 255, 0.08)',
                boxShadow: selectedCategory === category ? '0 4px 15px rgba(99, 102, 241, 0.35)' : 'none',
                whiteSpace: 'nowrap'
              }}
            >
              {category}
            </button>
          ))}
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
            padding: '7px 14px',
            fontSize: '0.84rem',
            borderRadius: 'var(--radius-full)'
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
          borderRadius: '20px'
        }}>
          <AlertCircle size={48} color="#94a3b8" style={{ marginBottom: '16px' }} />
          <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>រកមិនឃើញគណនី Roblox ត្រូវនឹងការស្វែងរកទេ</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            សូមសាកល្បងស្វែងរកពាក្យផ្សេង ឬជ្រើសរើសប្រភេទផ្សេង។
          </p>
        </div>
      )}
    </section>
  );
};
