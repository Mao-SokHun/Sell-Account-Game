import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

export const CustomDropdown = ({
  value,
  onChange,
  options = [],
  placeholder = 'ជ្រើសរើស...',
  icon: Icon = null,
  fullWidth = false,
  style = {},
  buttonStyle = {},
  menuStyle = {},
  id,
  name
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Normalize options to { value, label }
  const normalizedOptions = options.map(opt => {
    if (typeof opt === 'string') {
      return { value: opt, label: opt };
    }
    return opt;
  });

  const selectedOption = normalizedOptions.find(opt => opt.value === value);
  const displayLabel = selectedOption ? selectedOption.label : placeholder;

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleSelect = (optionValue) => {
    setIsOpen(false);
    if (onChange) {
      // Support both direct value setter (val) and synthetic event (e.target.value)
      const syntheticEvent = {
        target: { name: name || '', value: optionValue },
        value: optionValue
      };
      onChange(syntheticEvent);
    }
  };

  return (
    <div 
      ref={dropdownRef}
      style={{
        position: 'relative',
        display: fullWidth ? 'block' : 'inline-block',
        width: fullWidth ? '100%' : 'auto',
        ...style
      }}
    >
      {/* Trigger Button */}
      <button
        type="button"
        id={id}
        onClick={() => setIsOpen(prev => !prev)}
        style={{
          width: fullWidth ? '100%' : 'auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '10px',
          padding: '9px 14px',
          background: isOpen ? 'rgba(22, 32, 57, 0.95)' : 'rgba(15, 23, 42, 0.85)',
          border: isOpen ? '1px solid var(--primary)' : '1px solid var(--border-color)',
          borderRadius: 'var(--radius-md)',
          color: '#ffffff',
          fontSize: '0.88rem',
          fontFamily: 'var(--font-family)',
          cursor: 'pointer',
          outline: 'none',
          boxShadow: isOpen ? '0 0 0 3px rgba(99, 102, 241, 0.25)' : 'none',
          transition: 'all 0.2s ease',
          textAlign: 'left',
          ...buttonStyle
        }}
        onMouseOver={(e) => {
          if (!isOpen) {
            e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.4)';
            e.currentTarget.style.background = 'rgba(22, 32, 57, 0.9)';
          }
        }}
        onMouseOut={(e) => {
          if (!isOpen) {
            e.currentTarget.style.borderColor = 'var(--border-color)';
            e.currentTarget.style.background = 'rgba(15, 23, 42, 0.85)';
          }
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflow: 'hidden' }}>
          {Icon && <Icon size={16} color="var(--primary)" style={{ flexShrink: 0 }} />}
          <span style={{ 
            whiteSpace: 'nowrap', 
            textOverflow: 'ellipsis', 
            overflow: 'hidden',
            color: selectedOption ? '#ffffff' : 'var(--text-dim)',
            fontWeight: selectedOption ? 600 : 400
          }}>
            {displayLabel}
          </span>
        </div>

        <ChevronDown 
          size={16} 
          style={{
            flexShrink: 0,
            color: isOpen ? 'var(--primary)' : 'var(--text-dim)',
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
          }} 
        />
      </button>

      {/* Glassmorphic Dropdown Menu */}
      {isOpen && (
        <div 
          style={{
            position: 'absolute',
            top: 'calc(100% + 6px)',
            left: 0,
            right: fullWidth ? 0 : 'auto',
            minWidth: '100%',
            width: fullWidth ? '100%' : 'max-content',
            maxWidth: '360px',
            background: 'rgba(13, 19, 36, 0.98)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid rgba(99, 102, 241, 0.35)',
            borderRadius: '14px',
            boxShadow: '0 16px 36px -10px rgba(0, 0, 0, 0.85), 0 0 25px rgba(99, 102, 241, 0.2)',
            padding: '6px',
            zIndex: 1000,
            maxHeight: '260px',
            overflowY: 'auto',
            animation: 'modalFadeIn 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
            ...menuStyle
          }}
        >
          {normalizedOptions.map(opt => {
            const isSelected = opt.value === value;
            return (
              <div
                key={opt.value}
                onClick={() => handleSelect(opt.value)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px',
                  padding: '9px 12px',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  fontSize: '0.88rem',
                  fontFamily: 'var(--font-family)',
                  color: isSelected ? '#ffffff' : 'var(--text-muted)',
                  fontWeight: isSelected ? 700 : 500,
                  background: isSelected 
                    ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.25) 0%, rgba(6, 182, 212, 0.2) 100%)' 
                    : 'transparent',
                  border: isSelected ? '1px solid rgba(99, 102, 241, 0.4)' : '1px solid transparent',
                  transition: 'all 0.15s ease',
                  marginBottom: '2px'
                }}
                onMouseOver={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                    e.currentTarget.style.color = '#ffffff';
                  }
                }}
                onMouseOut={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = 'var(--text-muted)';
                  }
                }}
              >
                <span>{opt.label}</span>
                {isSelected && (
                  <Check size={15} color="var(--accent-cyan)" style={{ flexShrink: 0 }} />
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
