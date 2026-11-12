// API Client for MIRA STORE Platform
// Configured to communicate with Backend PHP API (/api) and Neon PostgreSQL
import { initialProducts } from '../data/initialProducts';

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
 * Fetch all products or filter by category from Backend API
 * Falls back to localStorage or initialProducts if backend is offline
 */
export const fetchProductsFromApi = async (category = null, includeAll = true) => {
  let queryParams = [];
  if (category && category !== 'ទាំងអស់' && category !== 'all') {
    queryParams.push(`category=${encodeURIComponent(category)}`);
  }
  if (includeAll) {
    queryParams.push(`include_all=1`);
  }
  const queryString = queryParams.length > 0 ? `?${queryParams.join('&')}` : '';

  try {
    // Try /get_product.php or /products
    let res = await fetch(`${API_BASE_URL}/get_product.php${queryString}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });

    if (!res.ok) {
      // Try REST alias /products
      res = await fetch(`${API_BASE_URL}/products${queryString}`);
    }

    if (res.ok) {
      const data = await res.json();
      const productList = Array.isArray(data) ? data : (data.products || []);
      if (Array.isArray(productList) && productList.length > 0) {
        // Cache to localStorage
        localStorage.setItem('roblox_products', JSON.stringify(productList));
        return { success: true, data: productList, source: 'backend_api' };
      }
    }
  } catch (err) {
    console.warn('[MIRA API] Backend offline, loading from local cache:', err.message);
  }

  // Fallback to local storage or initialProducts
  try {
    const cached = localStorage.getItem('roblox_products');
    if (cached) {
      const parsed = JSON.parse(cached);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return { success: true, data: parsed, source: 'local_cache' };
      }
    }
  } catch (e) {
    console.error('Error reading localStorage:', e);
  }

  return { success: true, data: initialProducts, source: 'fallback_initial' };
};

/**
 * Fetch a single product detail by ID from Backend API
 */
export const fetchProductDetailFromApi = async (productId) => {
  if (!productId) return null;

  try {
    let res = await fetch(`${API_BASE_URL}/get_product_detail.php?id=${encodeURIComponent(productId)}`);
    if (!res.ok) {
      res = await fetch(`${API_BASE_URL}/products/${encodeURIComponent(productId)}`);
    }

    if (res.ok) {
      const data = await res.json();
      if (data.success && data.product) {
        return { success: true, data: data.product, source: 'backend_api' };
      }
    }
  } catch (err) {
    console.warn('[MIRA API] Could not fetch detail from backend:', err.message);
  }

  // Fallback to local search
  const cached = localStorage.getItem('roblox_products');
  const list = cached ? JSON.parse(cached) : initialProducts;
  const found = list.find(p => String(p.id) === String(productId));
  return found ? { success: true, data: found, source: 'local_cache' } : { success: false, data: null };
};

/**
 * Add / Create a new product in Backend API and sync to local storage
 */
export const createProductApi = async (productData) => {
  let createdProduct = null;

  try {
    let res = await fetch(`${API_BASE_URL}/create_product.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productData)
    });

    if (!res.ok) {
      res = await fetch(`${API_BASE_URL}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData)
      });
    }

    if (res.ok) {
      const result = await res.json();
      if (result.success && result.product) {
        createdProduct = result.product;
      }
    }
  } catch (err) {
    console.warn('[MIRA API] Backend create failed (offline mode):', err.message);
  }

  // Fallback if backend offline
  if (!createdProduct) {
    createdProduct = {
      ...productData,
      id: productData.id || `rbx-${Date.now().toString().slice(-4)}`
    };
  }

  // Sync to local storage
  try {
    const cached = localStorage.getItem('roblox_products');
    const existing = cached ? JSON.parse(cached) : initialProducts;
    const updated = [createdProduct, ...existing.filter(p => String(p.id) !== String(createdProduct.id))];
    localStorage.setItem('roblox_products', JSON.stringify(updated));
  } catch (e) {
    console.error('Error syncing create to localStorage:', e);
  }

  return { success: true, data: createdProduct, source: createdProduct.id ? 'backend_api' : 'local_cache' };
};

/**
 * Update existing product in Backend API and sync to local storage
 */
export const updateProductApi = async (productData) => {
  try {
    let res = await fetch(`${API_BASE_URL}/update_product.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productData)
    });

    if (!res.ok) {
      res = await fetch(`${API_BASE_URL}/products/${encodeURIComponent(productData.id)}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData)
      });
    }

    if (res.ok) {
      console.log('[MIRA API] Product updated in backend successfully');
    }
  } catch (err) {
    console.warn('[MIRA API] Backend update failed (offline mode):', err.message);
  }

  // Sync to local storage
  try {
    const cached = localStorage.getItem('roblox_products');
    const existing = cached ? JSON.parse(cached) : initialProducts;
    const updated = existing.map(p => String(p.id) === String(productData.id) ? { ...p, ...productData } : p);
    localStorage.setItem('roblox_products', JSON.stringify(updated));
  } catch (e) {
    console.error('Error syncing update to localStorage:', e);
  }

  return { success: true, data: productData };
};

/**
 * Delete a product from Backend API and sync to local storage
 */
export const deleteProductApi = async (productId) => {
  try {
    let res = await fetch(`${API_BASE_URL}/delete_product.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: productId })
    });

    if (!res.ok) {
      res = await fetch(`${API_BASE_URL}/products/${encodeURIComponent(productId)}`, {
        method: 'DELETE'
      });
    }

    if (res.ok) {
      console.log('[MIRA API] Product deleted from backend');
    }
  } catch (err) {
    console.warn('[MIRA API] Backend delete failed (offline mode):', err.message);
  }

  // Sync to local storage
  try {
    const cached = localStorage.getItem('roblox_products');
    const existing = cached ? JSON.parse(cached) : initialProducts;
    const updated = existing.filter(p => String(p.id) !== String(productId));
    localStorage.setItem('roblox_products', JSON.stringify(updated));
  } catch (e) {
    console.error('Error syncing delete to localStorage:', e);
  }

  return { success: true, id: productId };
};

/**
 * Fetch Purchase History from Backend API
 * Falls back to localStorage if backend is unreachable
 */
export const fetchPurchaseHistoryFromApi = async () => {
  const buyerId = getBuyerSessionId();
  try {
    let res = await fetch(`${API_BASE_URL}/purchases.php?buyerId=${encodeURIComponent(buyerId)}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });

    if (!res.ok) {
      res = await fetch(`${API_BASE_URL}/purchases?buyerId=${encodeURIComponent(buyerId)}`);
    }

    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        localStorage.setItem('roblox_purchases', JSON.stringify(data));
        return { success: true, data, source: 'backend_api' };
      }
    }
  } catch (err) {
    console.warn('[MIRA API] Backend purchases not reachable, loading from cache:', err.message);
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
    let res = await fetch(`${API_BASE_URL}/purchases.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      res = await fetch(`${API_BASE_URL}/purchases`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    }

    if (res.ok) {
      const savedData = await res.json();
      return { success: true, data: savedData, source: 'backend_api' };
    }
  } catch (err) {
    console.warn('[MIRA API] Could not post purchase to backend API:', err.message);
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
    let res = await fetch(`${API_BASE_URL}/purchases.php?invoiceId=${encodeURIComponent(cleanId)}`);
    if (!res.ok) {
      res = await fetch(`${API_BASE_URL}/purchases/${encodeURIComponent(cleanId)}`);
    }

    if (res.ok) {
      const order = await res.json();
      const orderData = order.data || order;
      return { success: true, data: orderData, source: 'backend_api' };
    }
  } catch (err) {
    console.warn('[MIRA API] Backend invoice lookup error:', err);
  }

  // Local fallback search
  const cached = localStorage.getItem('roblox_purchases');
  const existing = cached ? JSON.parse(cached) : [];
  const found = existing.find(p => p.invoiceId?.toUpperCase() === cleanId);
  return found ? { success: true, data: found, source: 'local_cache' } : { success: false, data: null };
};
