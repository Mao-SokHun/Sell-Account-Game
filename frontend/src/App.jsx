import React, { useState, useEffect } from 'react';
import { initialProducts } from './data/initialProducts';
import { fetchPurchaseHistoryFromApi, savePurchaseToApi } from './utils/api';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { ProductList } from './components/ProductList';
import { ProductDetail } from './components/ProductDetail';
import { AccountSuccessModal } from './components/AccountSuccessModal';
import { AdminAuthModal } from './components/AdminAuthModal';
import { AdminDashboard } from './components/AdminDashboard';
import { PurchaseHistoryModal } from './components/PurchaseHistoryModal';
import { Footer } from './components/Footer';

// Helper to check if URL path is an owner/admin route
const checkIsOwnerRoute = () => {
  const path = window.location.pathname.toLowerCase();
  const hash = window.location.hash.toLowerCase();
  return path === '/owner' || path === '/admin' || hash === '#owner' || hash === '#admin';
};

export function App() {
  // Load products from localStorage or use initialProducts
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('roblox_products');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return initialProducts;
      }
    }
    return initialProducts;
  });

  // Save products to localStorage on update
  useEffect(() => {
    localStorage.setItem('roblox_products', JSON.stringify(products));
  }, [products]);

  // Admin auth state
  const [adminUser, setAdminUser] = useState(() => {
    const saved = localStorage.getItem('current_admin');
    return saved ? JSON.parse(saved) : null;
  });

  // Initial view based on URL route (/owner)
  const [currentView, setCurrentView] = useState(() => {
    if (checkIsOwnerRoute()) {
      const savedAdmin = localStorage.getItem('current_admin');
      return savedAdmin ? 'admin' : 'owner-login';
    }
    return 'catalog';
  });

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

  // Listen for browser URL changes (back/forward or navigation to /owner)
  useEffect(() => {
    const handleUrlChange = () => {
      if (checkIsOwnerRoute()) {
        const savedAdmin = localStorage.getItem('current_admin');
        if (savedAdmin) {
          setAdminUser(JSON.parse(savedAdmin));
          setCurrentView('admin');
        } else {
          setCurrentView('owner-login');
        }
      } else {
        if (currentView === 'admin' || currentView === 'owner-login') {
          setCurrentView('catalog');
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
    setProducts(prev => prev.map(p => 
      p.id === product.id ? { ...p, status: 'sold' } : p
    ));

    // Also update selectedProduct so the detail view immediately reflects sold status
    setSelectedProduct(prev => prev && prev.id === product.id ? { ...prev, status: 'sold' } : prev);

    // Show the detail modal with Roblox account credentials!
    setSuccessModalData({
      product: { ...product, status: 'sold' },
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

  // Admin Add Product
  const handleAddProduct = (newProduct) => {
    setProducts(prev => [newProduct, ...prev]);
  };

  // Admin Update Product
  const handleUpdateProduct = (updatedProduct) => {
    setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
  };

  // Admin Delete Product
  const handleDeleteProduct = (productId) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Navigation Bar - NO Admin button on buyer pages! */}
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        currentView={currentView}
        onNavigateHome={handleNavigateHome}
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
              <HeroBanner />
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

          {/* VIEW 3: DEDICATED OWNER LOGIN (ACCESSIBLE VIA URL: /owner) */}
          {currentView === 'owner-login' && (
            <AdminAuthModal
              isStandalone={true}
              onClose={handleNavigateHome}
              onLoginSuccess={handleAdminLoginSuccess}
            />
          )}

          {/* VIEW 4: ADMIN DASHBOARD (ACCESSIBLE VIA URL: /owner) */}
          {currentView === 'admin' && adminUser && (
            <AdminDashboard
              products={products}
              onAddProduct={handleAddProduct}
              onUpdateProduct={handleUpdateProduct}
              onDeleteProduct={handleDeleteProduct}
              onBackToStore={handleNavigateHome}
              adminUser={adminUser}
            />
          )}
        </div>
      </main>

      {/* Footer */}
      <Footer />

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
