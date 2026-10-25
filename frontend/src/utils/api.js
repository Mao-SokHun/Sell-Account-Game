// API Client for Roblox Khmer Platform
// Configured to communicate with Backend API (/api)
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

/**
 * Get or create a persistent Buyer Session / Device ID
 * Allows anonymous buyers to retrieve their own purchase history from backend
 */
export const getBuyerSessionId = () => {
  let sessionId = localStorage.getItem('roblox_buyer_session_id');
  if (!sessionId) {
    sessionId = 'buyer_' + Math.random().toString(36).substring(2, 12) + '_' + Date.now();
    localStorage.setItem('roblox_buyer_session_id', sessionId);
  }
  return sessionId;
};

/**
 * Fetch Purchase History from Backend API
 * Falls back to localStorage if backend is unreachable (e.g. during demo)
 */
export const fetchPurchaseHistoryFromApi = async () => {
  const buyerId = getBuyerSessionId();
  try {
    const res = await fetch(`${API_BASE_URL}/purchases?buyerId=${encodeURIComponent(buyerId)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        // Cache to localStorage for offline access
        localStorage.setItem('roblox_purchases', JSON.stringify(data));
        return { success: true, data, source: 'backend_api' };
      }
    }
  } catch (err) {
    console.warn('Backend API not reachable, loading from local cache:', err.message);
  }

  // Fallback to local storage
  const cached = localStorage.getItem('roblox_purchases');
  const fallbackData = cached ? JSON.parse(cached) : [];
  return { 
    success: true, 
    data: fallbackData, 
    source: fallbackData.length > 0 ? 'local_cache' : 'empty' 
  };
};

/**
 * Save new Purchase to Backend API and sync to local storage
 */
export const savePurchaseToApi = async (purchaseItem) => {
  const buyerId = getBuyerSessionId();
  const payload = {
    ...purchaseItem,
    buyerSessionId: buyerId,
    createdAt: new Date().toISOString()
  };

  // Sync to localStorage immediately
  try {
    const cached = localStorage.getItem('roblox_purchases');
    const existing = cached ? JSON.parse(cached) : [];
    const updated = [payload, ...existing.filter(p => p.id !== payload.id && p.invoiceId !== payload.invoiceId)];
    localStorage.setItem('roblox_purchases', JSON.stringify(updated));
  } catch (e) {
    console.error('Error saving to localStorage:', e);
  }

  // Push to backend API
  try {
    const res = await fetch(`${API_BASE_URL}/purchases`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      const savedData = await res.json();
      return { success: true, data: savedData, source: 'backend_api' };
    }
  } catch (err) {
    console.warn('Could not post to backend API (demo mode):', err.message);
  }

  return { success: true, data: payload, source: 'local_cache' };
};

/**
 * Look up a specific purchase from Backend API by Invoice ID
 */
export const lookupPurchaseByInvoiceApi = async (invoiceId) => {
  if (!invoiceId) return null;
  const cleanId = invoiceId.trim().toUpperCase();

  try {
    const res = await fetch(`${API_BASE_URL}/purchases/${encodeURIComponent(cleanId)}`);
    if (res.ok) {
      const order = await res.json();
      return { success: true, data: order, source: 'backend_api' };
    }
  } catch (err) {
    console.warn('Backend lookup error:', err);
  }

  // Local fallback search
  const cached = localStorage.getItem('roblox_purchases');
  const existing = cached ? JSON.parse(cached) : [];
  const found = existing.find(p => p.invoiceId?.toUpperCase() === cleanId);
  return found ? { success: true, data: found, source: 'local_cache' } : { success: false, data: null };
};
