import React, { useState, useEffect } from 'react';
import { initialProducts } from './data/initialProducts';
import { 
  fetchProductsFromApi, 
  createProductApi, 
  updateProductApi, 
  deleteProductApi, 
  fetchPurchaseHistoryFromApi, 
  savePurchaseToApi 
} from './utils/api';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { LiveGamingTicker } from './components/LiveGamingTicker';
import { ProductList } from './components/ProductList';
import { ProductDetail } from './components/ProductDetail';
import { HowToBuyPage } from './components/HowToBuyPage';
import { AccountSuccessModal } from './components/AccountSuccessModal';
import { AdminAuthModal } from './components/AdminAuthModal';
import { AdminDashboard } from './components/AdminDashboard';
import { PurchaseHistoryModal } from './components/PurchaseHistoryModal';
import { Footer } from './components/Footer';

// Helper to check route on initial load
const getInitialView = () => {
  const path = window.location.pathname.toLowerCase();
  const hash = window.location.hash.toLowerCase();
  if (path === '/owner' || path === '/admin' || hash === '#owner' || hash === '#admin') {
    const savedAdmin = localStorage.getItem('current_admin');
    return savedAdmin ? 'admin' : 'owner-login';
  }
  if (path === '/how-to-buy' || hash === '#how-to-buy' || hash === '#guide') {
    return 'how-to-buy';
  }
  return 'catalog';
};

export function App() {
  // Load products from localStorage or use initialProducts
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('roblox_products');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {
        return initialProducts;
      }
    }
    return initialProducts;
  });

  const [isSyncingProducts, setIsSyncingProducts] = useState(false);
  const [productsSource, setProductsSource] = useState('local_cache');

  // Load live products from Backend API on mount
  useEffect(() => {
    const loadProductsFromBackend = async () => {
      setIsSyncingProducts(true);
      const res = await fetchProductsFromApi(null, true);
      if (res && res.data && res.data.length > 0) {
        setProducts(res.data);
      }
      if (res && res.source) {
        setProductsSource(res.source);
      }
      setIsSyncingProducts(false);
    };
    loadProductsFromBackend();
  }, []);

  // Save products to localStorage on update as persistent fallback
  useEffect(() => {
    localStorage.setItem('roblox_products', JSON.stringify(products));
  }, [products]);

  // Admin auth state
  const [adminUser, setAdminUser] = useState(() => {
    const saved = localStorage.getItem('current_admin');
    return saved ? JSON.parse(saved) : null;
  });

  // Initial view based on URL route
  const [currentView, setCurrentView] = useState(() => getInitialView());

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('ទាំងអស់');
  const [searchQuery, setSearchQuery] = useState('');

  // Buyer purchases state (synced with Backend API and cached in localStorage)
  const [purchases, setPurchases] = useState(() => {
    const saved = localStorage.getItem('roblox_purchases');
    return saved ? JSON.parse(saved) : [];
  });
  const [isSyncingApi, setIsSyncingApi] = useState(false);
  const [apiSource, setApiSource] = useState('local_cache');
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);

  // Success Modal state after Bakong payment
  const [successModalData, setSuccessModalData] = useState(null);

  // Sync purchase history from Backend API on mount
  useEffect(() => {
    const syncWithApi = async () => {
      setIsSyncingApi(true);
      const res = await fetchPurchaseHistoryFromApi();
      if (res && res.data && res.data.length > 0) {
        setPurchases(res.data);
      }
      if (res && res.source) {
        setApiSource(res.source);
      }
      setIsSyncingApi(false);
    };
    syncWithApi();
  }, []);

  // Save purchases to local storage on update
  useEffect(() => {
    localStorage.setItem('roblox_purchases', JSON.stringify(purchases));
  }, [purchases]);

  const handleRefreshPurchases = async () => {
    setIsSyncingApi(true);
    const res = await fetchPurchaseHistoryFromApi();
    if (res && res.data) {
      setPurchases(res.data);
    }
    if (res && res.source) {
      setApiSource(res.source);
    }
    setIsSyncingApi(false);
  };

  const handleAddPurchaseFromSearch = (item) => {
    setPurchases(prev => {
      const exists = prev.some(p => p.invoiceId === item.invoiceId);
      return exists ? prev : [item, ...prev];
    });
  };

  // Listen for browser URL changes (back/forward or direct navigation)
  useEffect(() => {
    const handleUrlChange = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();

      if (path === '/owner' || path === '/admin' || hash === '#owner' || hash === '#admin') {
        const savedAdmin = localStorage.getItem('current_admin');
        if (savedAdmin) {
          setAdminUser(JSON.parse(savedAdmin));
          setCurrentView('admin');
        } else {
          setCurrentView('owner-login');
        }
      } else if (path === '/how-to-buy' || hash === '#how-to-buy' || hash === '#guide') {
        setCurrentView('how-to-buy');
        setSelectedProduct(null);
      } else {
        if (currentView === 'admin' || currentView === 'owner-login' || currentView === 'how-to-buy') {
          setCurrentView('catalog');
          setSelectedProduct(null);
        }
      }
    };

    window.addEventListener('popstate', handleUrlChange);
    window.addEventListener('hashchange', handleUrlChange);
    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      window.removeEventListener('hashchange', handleUrlChange);
    };
  }, [currentView]);

  // Navigate to Home (Store View)
  const handleNavigateHome = () => {
    window.history.pushState(null, '', '/');
    setCurrentView('catalog');
    setSelectedProduct(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Navigate to How to Buy Guide
  const handleNavigateHowToBuy = () => {
    window.history.pushState(null, '', '/how-to-buy');
    setCurrentView('how-to-buy');
    setSelectedProduct(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Navigate to product detail view (2-column page)
  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    setCurrentView('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Payment success handler (Triggered when Bakong KHQR is paid)
  const handlePaymentSuccess = async (product) => {
    const invoiceId = `RBX-${Math.floor(100000 + Math.random() * 900000)}`;
    const purchaseItem = {
      ...product,
      invoiceId,
      purchaseDate: new Date().toLocaleString('km-KH', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    // Save purchase to state and push to Backend API
    setPurchases(prev => [purchaseItem, ...prev]);
    try {
      await savePurchaseToApi(purchaseItem);
    } catch (err) {
      console.warn('API save fallback to local:', err);
    }

    // Mark product as sold in inventory
    const updatedProduct = { ...product, status: 'sold' };
    setProducts(prev => prev.map(p => 
      String(p.id) === String(product.id) ? updatedProduct : p
    ));

    // Sync sold status to Backend API
    try {
      await updateProductApi({ id: product.id, status: 'sold' });
    } catch (err) {
      console.warn('Could not update status to sold on backend:', err);
    }

    // Also update selectedProduct so the detail view immediately reflects sold status
    setSelectedProduct(prev => prev && String(prev.id) === String(product.id) ? updatedProduct : prev);

    // Show the detail modal with Roblox account credentials!
    setSuccessModalData({
      product: updatedProduct,
      orderInfo: { invoiceId }
    });
  };

  // Admin login success
  const handleAdminLoginSuccess = (admin) => {
    setAdminUser(admin);
    window.history.pushState(null, '', '/owner');
    setCurrentView('admin');
  };

  // Admin logout
  const handleAdminLogout = () => {
    localStorage.removeItem('current_admin');
    setAdminUser(null);
    window.history.pushState(null, '', '/');
    setCurrentView('catalog');
  };

  // Admin Add Product via HTTP POST to Backend API
  const handleAddProduct = async (newProduct) => {
    setIsSyncingProducts(true);
    try {
      const res = await createProductApi(newProduct);
      const savedItem = res?.data || newProduct;
      setProducts(prev => [savedItem, ...prev.filter(p => String(p.id) !== String(savedItem.id))]);
      if (res?.source) setProductsSource(res.source);
    } catch (err) {
      console.error('Error adding product to backend:', err);
      setProducts(prev => [newProduct, ...prev]);
    } finally {
      setIsSyncingProducts(false);
    }
  };

  // Admin Update Product via HTTP PUT/POST to Backend API
  const handleUpdateProduct = async (updatedProduct) => {
    // Optimistic UI update
    setProducts(prev => prev.map(p => String(p.id) === String(updatedProduct.id) ? updatedProduct : p));
    if (selectedProduct && String(selectedProduct.id) === String(updatedProduct.id)) {
      setSelectedProduct(updatedProduct);
    }

    try {
      await updateProductApi(updatedProduct);
    } catch (err) {
      console.error('Error updating product on backend:', err);
    }
  };

  // Admin Delete Product via HTTP DELETE to Backend API
  const handleDeleteProduct = async (productId) => {
    // Optimistic UI update
    setProducts(prev => prev.filter(p => String(p.id) !== String(productId)));
    if (selectedProduct && String(selectedProduct.id) === String(productId)) {
      setSelectedProduct(null);
      setCurrentView('catalog');
    }

    try {
      await deleteProductApi(productId);
    } catch (err) {
      console.error('Error deleting product on backend:', err);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Navigation Bar */}
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        currentView={currentView}
        onNavigateHome={handleNavigateHome}
        onNavigateHowToBuy={handleNavigateHowToBuy}
        adminUser={adminUser}
        onLogoutAdmin={handleAdminLogout}
        purchasedCount={purchases.length}
        onOpenHistoryModal={() => setIsHistoryModalOpen(true)}
      />

      {/* Main Content Area */}
      <main style={{ flex: 1 }}>
        <div className="container">
          {/* VIEW 1: CATALOG (HOME) */}
          {currentView === 'catalog' && (
            <>
              <LiveGamingTicker />
              <HeroBanner 
                onNavigateHowToBuy={handleNavigateHowToBuy} 
                onSelectCategory={(category) => {
                  setSelectedCategory(category);
                  const el = document.getElementById('product-catalog-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              />
              <ProductList
                products={products}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                searchQuery={searchQuery}
                onSelectProduct={handleSelectProduct}
              />
            </>
          )}

          {/* VIEW 2: PRODUCT DETAIL (2 COLUMNS: LEFT DESCRIPTION, RIGHT BAKONG PAYMENT) */}
          {currentView === 'detail' && selectedProduct && (
            <ProductDetail
              product={selectedProduct}
              onBack={handleNavigateHome}
              onPaymentSuccess={handlePaymentSuccess}
            />
          )}

          {/* VIEW 3: HOW TO BUY GUIDE */}
          {currentView === 'how-to-buy' && (
            <HowToBuyPage
              onBack={handleNavigateHome}
              onGoToStore={handleNavigateHome}
            />
          )}

          {/* VIEW 5: DEDICATED OWNER LOGIN (ACCESSIBLE VIA URL: /owner) */}
          {currentView === 'owner-login' && (
            <AdminAuthModal
              isStandalone={true}
              onClose={handleNavigateHome}
              onLoginSuccess={handleAdminLoginSuccess}
            />
          )}

          {/* VIEW 6: ADMIN DASHBOARD (ACCESSIBLE VIA URL: /owner) */}
          {currentView === 'admin' && adminUser && (
            <AdminDashboard
              products={products}
              onAddProduct={handleAddProduct}
              onUpdateProduct={handleUpdateProduct}
              onDeleteProduct={handleDeleteProduct}
              onBackToStore={handleNavigateHome}
              adminUser={adminUser}
              isSyncingProducts={isSyncingProducts}
              productsSource={productsSource}
            />
          )}
        </div>
      </main>

      {/* Footer */}
      <Footer
        onNavigateHome={handleNavigateHome}
        onNavigateHowToBuy={handleNavigateHowToBuy}
      />

      {/* MODAL 1: ACCOUNT DETAIL SUCCESS MODAL (POST-PAYMENT BAKONG) */}
      {successModalData && (
        <AccountSuccessModal
          product={successModalData.product}
          orderInfo={successModalData.orderInfo}
          onClose={() => {
            setSuccessModalData(null);
            handleNavigateHome();
          }}
        />
      )}

      {/* MODAL 2: BUYER'S PURCHASE HISTORY */}
      <PurchaseHistoryModal
        isOpen={isHistoryModalOpen}
        onClose={() => setIsHistoryModalOpen(false)}
        purchases={purchases}
      />
    </div>
  );
}

export default App;
