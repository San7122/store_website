import { useState, useMemo, useEffect } from 'react';

export default function App() {
  // Store Configuration
  const [storeConfig, setStoreConfig] = useState(() => {
    const savedConfig = localStorage.getItem('storeConfig');
    return savedConfig ? JSON.parse(savedConfig) : {
      name: 'ShoeVault',
      logo: '👟',
      tagline: 'Step Into Style',
      email: 'hello@shoevault.com',
      phone: '+977 9800000000',
      address: 'Kathmandu, Nepal',
      primaryColor: '#ff6b35',
      secondaryColor: '#f72585',
      accentColor: '#2ecc71',
      freeShippingAbove: 5000,
      smsApiKey: '', // For SMS notifications
      smsEnabled: false
    };
  });

  // Save store config to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('storeConfig', JSON.stringify(storeConfig));
  }, [storeConfig]);

  // Admin Password (stored separately for security)
  const [storedAdminPassword, setStoredAdminPassword] = useState(() => {
    const savedPassword = localStorage.getItem('adminPassword');
    return savedPassword || 'admin123';
  });

  // Save admin password to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('adminPassword', storedAdminPassword);
  }, [storedAdminPassword]);

  // Generate QR Code URL using Google Charts API
  const generateQRCode = (data, size = 200) => {
    return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(data)}`;
  };

  // Generate payment QR data based on payment method and amount
  const getPaymentQRData = (method, amount, currency) => {
    const accounts = paymentAccounts;
    const amountValue = currency === 'NPR' ? amount : amount;

    switch(method) {
      case 'esewa':
        // eSewa QR format
        return `esewa://pay?name=${encodeURIComponent(accounts.esewa.name)}&mobile=${accounts.esewa.id}&amount=${amountValue}`;
      case 'khalti':
        // Khalti QR format
        return `khalti://pay?mobile=${accounts.khalti.id}&amount=${amountValue}&name=${encodeURIComponent(accounts.khalti.name)}`;
      case 'fonepay':
        // FonePay QR format
        return `fonepay://pay?merchant=${accounts.fonepay.id}&amount=${amountValue}`;
      case 'phonepe':
        // PhonePe UPI format
        return `upi://pay?pa=${accounts.phonepe.id}&pn=${encodeURIComponent(accounts.phonepe.name)}&am=${amountValue}&cu=INR`;
      case 'paytm':
        // Paytm UPI format
        return `upi://pay?pa=${accounts.paytm.id}&pn=${encodeURIComponent(accounts.paytm.name)}&am=${amountValue}&cu=INR`;
      case 'razorpay':
        // UPI format
        return `upi://pay?pa=${accounts.razorpay.id}&pn=${encodeURIComponent(accounts.razorpay.name)}&am=${amountValue}&cu=INR`;
      default:
        return '';
    }
  };

  // Payment Accounts Configuration
  const [paymentAccounts, setPaymentAccounts] = useState(() => {
    const savedAccounts = localStorage.getItem('paymentAccounts');
    return savedAccounts ? JSON.parse(savedAccounts) : {
      esewa: { enabled: true, id: '9800000000', name: 'ShoeVault Store', qrCode: '' },
      khalti: { enabled: true, id: '9800000000', name: 'ShoeVault Store', qrCode: '' },
      fonepay: { enabled: true, id: '9800000000', name: 'ShoeVault Store', qrCode: '' },
      razorpay: { enabled: true, id: 'shoevault@upi', name: 'ShoeVault Store', qrCode: '' },
      paytm: { enabled: true, id: '9800000000', name: 'ShoeVault Store', qrCode: '' },
      phonepe: { enabled: true, id: 'shoevault@ybl', name: 'ShoeVault Store', qrCode: '' },
      bankTransfer: { enabled: true, bankName: 'Nepal Bank', accountName: 'ShoeVault Pvt Ltd', accountNumber: '1234567890', ifsc: '' }
    };
  });

  // Save payment accounts to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('paymentAccounts', JSON.stringify(paymentAccounts));
  }, [paymentAccounts]);

  // Theme derived from store config
  const theme = useMemo(() => ({
    primary: storeConfig.primaryColor,
    secondary: storeConfig.secondaryColor,
    accent: storeConfig.accentColor,
    gradient: `linear-gradient(135deg, ${storeConfig.primaryColor} 0%, ${storeConfig.secondaryColor} 100%)`
  }), [storeConfig]);

  // Exchange rate
  const exchangeRate = 1.6;

  // Categories
  const [categories, setCategories] = useState([
    { id: 1, name: 'Running', icon: '🏃' },
    { id: 2, name: 'Casual', icon: '👞' },
    { id: 3, name: 'Sports', icon: '⚽' },
    { id: 4, name: 'Formal', icon: '👔' },
    { id: 5, name: 'Sneakers', icon: '👟' },
    { id: 6, name: 'Sandals', icon: '🩴' }
  ]);

  // Brands
  const [brands, setBrands] = useState([
    { id: 1, name: 'Nike' },
    { id: 2, name: 'Adidas' },
    { id: 3, name: 'Puma' },
    { id: 4, name: 'Reebok' },
    { id: 5, name: 'New Balance' },
    { id: 6, name: 'Goldstar' }
  ]);

  // Available colors and sizes
  const availableColors = [
    { name: 'Black', hex: '#1a1a1a' },
    { name: 'White', hex: '#ffffff' },
    { name: 'Red', hex: '#e74c3c' },
    { name: 'Blue', hex: '#3498db' },
    { name: 'Green', hex: '#2ecc71' },
    { name: 'Yellow', hex: '#f1c40f' },
    { name: 'Orange', hex: '#e67e22' },
    { name: 'Purple', hex: '#9b59b6' },
    { name: 'Pink', hex: '#e91e63' },
    { name: 'Grey', hex: '#95a5a6' }
  ];
  const availableSizes = [6, 7, 8, 9, 10, 11, 12];

  // Products
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Air Max Runner Pro',
      brand: 'Nike',
      category: 'Running',
      price: { npr: 12999, inr: 8124 },
      originalPrice: { npr: 15999, inr: 9999 },
      images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500'],
      colors: ['Red', 'Black', 'White'],
      sizes: [7, 8, 9, 10, 11],
      stock: 25,
      rating: 4.5,
      reviews: [
        { id: 1, user: 'Ram K.', rating: 5, comment: 'Amazing shoes! Very comfortable for running.', date: '2024-01-15', helpful: 12 },
        { id: 2, user: 'Sita M.', rating: 4, comment: 'Good quality, fast delivery to Kathmandu.', date: '2024-01-10', helpful: 8 }
      ],
      description: 'Premium running shoes with advanced cushioning technology for maximum comfort during your runs.',
      featured: true,
      trending: true,
      newArrival: false,
      soldCount: 156
    },
    {
      id: 2,
      name: 'Classic Leather Sneakers',
      brand: 'Adidas',
      category: 'Sneakers',
      price: { npr: 8999, inr: 5624 },
      originalPrice: { npr: 10999, inr: 6874 },
      images: ['https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500'],
      colors: ['White', 'Black', 'Blue'],
      sizes: [6, 7, 8, 9, 10],
      stock: 40,
      rating: 4.3,
      reviews: [
        { id: 1, user: 'Hari B.', rating: 4, comment: 'Stylish and comfortable!', date: '2024-01-12', helpful: 5 }
      ],
      description: 'Classic leather sneakers perfect for everyday wear. Timeless design meets modern comfort.',
      featured: true,
      trending: false,
      newArrival: true,
      soldCount: 89
    },
    {
      id: 3,
      name: 'Sports Training Elite',
      brand: 'Puma',
      category: 'Sports',
      price: { npr: 7499, inr: 4687 },
      originalPrice: { npr: 8999, inr: 5624 },
      images: ['https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500'],
      colors: ['Black', 'Orange', 'Green'],
      sizes: [7, 8, 9, 10, 11, 12],
      stock: 35,
      rating: 4.7,
      reviews: [],
      description: 'High-performance training shoes designed for athletes who demand the best.',
      featured: false,
      trending: true,
      newArrival: true,
      soldCount: 234
    },
    {
      id: 4,
      name: 'Executive Oxford',
      brand: 'Goldstar',
      category: 'Formal',
      price: { npr: 5999, inr: 3749 },
      originalPrice: { npr: 6999, inr: 4374 },
      images: ['https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=500'],
      colors: ['Black', 'Brown'],
      sizes: [7, 8, 9, 10],
      stock: 20,
      rating: 4.2,
      reviews: [],
      description: 'Elegant formal shoes crafted with premium materials for the modern professional.',
      featured: false,
      trending: false,
      newArrival: false,
      soldCount: 67
    },
    {
      id: 5,
      name: 'Casual Comfort Walk',
      brand: 'New Balance',
      category: 'Casual',
      price: { npr: 9499, inr: 5937 },
      originalPrice: { npr: 11999, inr: 7499 },
      images: ['https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500'],
      colors: ['Grey', 'Blue', 'White'],
      sizes: [6, 7, 8, 9, 10, 11],
      stock: 50,
      rating: 4.6,
      reviews: [],
      description: 'Ultimate comfort for all-day wear. Perfect for casual outings and light activities.',
      featured: true,
      trending: false,
      newArrival: true,
      soldCount: 312
    },
    {
      id: 6,
      name: 'Summer Beach Sandals',
      brand: 'Reebok',
      category: 'Sandals',
      price: { npr: 2999, inr: 1874 },
      originalPrice: { npr: 3499, inr: 2187 },
      images: ['https://images.unsplash.com/photo-1603487742131-4160ec999306?w=500'],
      colors: ['Black', 'Blue', 'Red'],
      sizes: [7, 8, 9, 10],
      stock: 60,
      rating: 4.0,
      reviews: [],
      description: 'Lightweight and breathable sandals perfect for summer adventures.',
      featured: false,
      trending: true,
      newArrival: false,
      soldCount: 445
    }
  ]);

  // Orders
  const [orders, setOrders] = useState([
    {
      id: 'ORD001',
      customer: { name: 'Ram Sharma', email: 'ram@email.com', phone: '+977 9801234567' },
      address: { city: 'Kathmandu', country: 'Nepal' },
      items: [{ productId: 1, name: 'Air Max Runner Pro', size: 9, color: 'Red', quantity: 1, price: { npr: 12999, inr: 8124 } }],
      total: { npr: 12999, inr: 8124 },
      status: 'Delivered',
      date: '2024-01-15',
      paymentMethod: 'esewa'
    },
    {
      id: 'ORD002',
      customer: { name: 'Priya Singh', email: 'priya@email.com', phone: '+91 9876543210' },
      address: { city: 'Delhi', country: 'India' },
      items: [{ productId: 2, name: 'Classic Leather Sneakers', size: 7, color: 'White', quantity: 2, price: { npr: 8999, inr: 5624 } }],
      total: { npr: 17998, inr: 11248 },
      status: 'Shipped',
      date: '2024-01-18',
      paymentMethod: 'razorpay'
    }
  ]);

  // Customers
  const [customers] = useState([
    { id: 1, name: 'Ram Sharma', email: 'ram@email.com', phone: '+977 9801234567', country: 'Nepal', totalOrders: 5, totalSpent: { npr: 45000, inr: 28125 }, joinDate: '2023-06-15' },
    { id: 2, name: 'Priya Singh', email: 'priya@email.com', phone: '+91 9876543210', country: 'India', totalOrders: 3, totalSpent: { npr: 28000, inr: 17500 }, joinDate: '2023-08-20' },
    { id: 3, name: 'Sita Thapa', email: 'sita@email.com', phone: '+977 9812345678', country: 'Nepal', totalOrders: 8, totalSpent: { npr: 72000, inr: 45000 }, joinDate: '2023-04-10' }
  ]);

  // UI State
  const [currency, setCurrency] = useState('NPR');
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentView, setCurrentView] = useState('customer');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [adminTab, setAdminTab] = useState('dashboard');
  const [darkMode, setDarkMode] = useState(true);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [compareList, setCompareList] = useState([]);
  const [showCompare, setShowCompare] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [customerOrders, setCustomerOrders] = useState([]);
  const [showOrderTrack, setShowOrderTrack] = useState(false);
  const [trackOrderId, setTrackOrderId] = useState('');
  const [newsletter, setNewsletter] = useState('');
  const [showNewsletter, setShowNewsletter] = useState(false);

  // Sync view with URL hash so there are separate links for admin and customer
  useEffect(() => {
    const applyHash = () => {
      try {
        const h = (window.location.hash || '').replace('#/', '').toLowerCase();
        if (h === 'admin') {
          setCurrentView('admin');
          if (!isLoggedIn) setShowLoginModal(true);
        } else setCurrentView('customer');
      } catch (e) {
        setCurrentView('customer');
      }
    };
    applyHash();
    window.addEventListener('hashchange', applyHash);
    return () => window.removeEventListener('hashchange', applyHash);
  }, []);

  // Mobile responsiveness: track small screens and mobile menu
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Available Coupons (Admin can manage)
  const [coupons, setCoupons] = useState([
    { code: 'WELCOME10', discount: 10, type: 'percent', minOrder: 2000, maxDiscount: 1000, active: true, usageLimit: 100, usedCount: 45 },
    { code: 'FLAT500', discount: 500, type: 'flat', minOrder: 3000, maxDiscount: 500, active: true, usageLimit: 50, usedCount: 20 },
    { code: 'NEPAL20', discount: 20, type: 'percent', minOrder: 5000, maxDiscount: 2000, active: true, usageLimit: 200, usedCount: 89 }
  ]);

  // Dark/Light mode colors
  const modeColors = useMemo(() => ({
    bg: darkMode ? '#0a0a0f' : '#f5f5f7',
    bgSecondary: darkMode ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)',
    bgTertiary: darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)',
    bgCard: darkMode ? 'rgba(255,255,255,0.03)' : '#ffffff',
    bgModal: darkMode ? '#12121a' : '#ffffff',
    bgHeader: darkMode ? 'rgba(10,10,15,0.95)' : 'rgba(255,255,255,0.95)',
    text: darkMode ? '#fff' : '#1a1a2e',
    textSecondary: darkMode ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)',
    textMuted: darkMode ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)',
    border: darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
    borderLight: darkMode ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)',
    inputBg: darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
    selectBg: darkMode ? 'rgba(20,20,30,0.9)' : '#ffffff',
  }), [darkMode]);

  // Filters
  const [filters, setFilters] = useState({
    category: 'All',
    brand: 'All',
    priceRange: [0, 25000],
    colors: [],
    sizes: [],
    rating: 0,
    sortBy: 'featured',
    search: '',
    inStock: false,
    onSale: false,
    newArrivals: false,
    trending: false
  });

  // Filtered products
  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    if (filters.search) {
      filtered = filtered.filter(p => p.name.toLowerCase().includes(filters.search.toLowerCase()) || p.brand.toLowerCase().includes(filters.search.toLowerCase()));
    }
    if (filters.category !== 'All') {
      filtered = filtered.filter(p => p.category === filters.category);
    }
    if (filters.brand !== 'All') {
      filtered = filtered.filter(p => p.brand === filters.brand);
    }
    filtered = filtered.filter(p => p.price.npr >= filters.priceRange[0] && p.price.npr <= filters.priceRange[1]);
    if (filters.colors.length > 0) {
      filtered = filtered.filter(p => p.colors.some(c => filters.colors.includes(c)));
    }
    if (filters.sizes.length > 0) {
      filtered = filtered.filter(p => p.sizes.some(s => filters.sizes.includes(s)));
    }
    if (filters.rating > 0) {
      filtered = filtered.filter(p => p.rating >= filters.rating);
    }
    if (filters.trending) {
      filtered = filtered.filter(p => p.trending);
    }
    if (filters.newArrivals) {
      filtered = filtered.filter(p => p.newArrival);
    }
    if (filters.onSale) {
      filtered = filtered.filter(p => p.originalPrice.npr > p.price.npr);
    }

    switch (filters.sortBy) {
      case 'price-low': filtered.sort((a, b) => a.price.npr - b.price.npr); break;
      case 'price-high': filtered.sort((a, b) => b.price.npr - a.price.npr); break;
      case 'rating': filtered.sort((a, b) => b.rating - a.rating); break;
      case 'popular': filtered.sort((a, b) => b.soldCount - a.soldCount); break;
      default: filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return filtered;
  }, [products, filters]);

  // Cart calculations
  const cartSubtotal = useMemo(() => cart.reduce((sum, item) => sum + (currency === 'NPR' ? item.price.npr : item.price.inr) * item.quantity, 0), [cart, currency]);
  const shippingCost = cartSubtotal >= storeConfig.freeShippingAbove ? 0 : (currency === 'NPR' ? 200 : 125);

  // Coupon discount calculation
  const couponDiscount = useMemo(() => {
    if (!appliedCoupon) return 0;
    if (cartSubtotal < appliedCoupon.minOrder) return 0;
    if (appliedCoupon.type === 'percent') {
      const discount = (cartSubtotal * appliedCoupon.discount) / 100;
      return Math.min(discount, appliedCoupon.maxDiscount);
    }
    return appliedCoupon.discount;
  }, [appliedCoupon, cartSubtotal]);

  const cartTotal = cartSubtotal + shippingCost - couponDiscount;

  // Apply coupon function
  const applyCoupon = () => {
    const coupon = coupons.find(c => c.code.toUpperCase() === couponCode.toUpperCase() && c.active);
    if (!coupon) {
      alert('Invalid or expired coupon code!');
      return;
    }
    if (cartSubtotal < coupon.minOrder) {
      alert(`Minimum order amount for this coupon is ${currency === 'NPR' ? 'रू' : '₹'} ${coupon.minOrder}`);
      return;
    }
    if (coupon.usedCount >= coupon.usageLimit) {
      alert('This coupon has reached its usage limit!');
      return;
    }
    setAppliedCoupon(coupon);
    setCouponCode('');
  };

  // Track order function
  const trackOrder = () => {
    if (!trackOrderId.trim()) {
      alert('Please enter an order ID');
      return;
    }
    const order = orders.find(o => o.id.toUpperCase() === trackOrderId.trim().toUpperCase());
    if (order) {
      setCustomerOrders([order]);
    } else {
      setCustomerOrders([]);
      alert('Order not found! Please check the order ID.');
    }
  };

  // Add to recently viewed
  const addToRecentlyViewed = (product) => {
    setRecentlyViewed(prev => {
      const filtered = prev.filter(p => p.id !== product.id);
      return [product, ...filtered].slice(0, 6);
    });
  };

  // Toggle compare
  const toggleCompare = (product) => {
    if (compareList.find(p => p.id === product.id)) {
      setCompareList(compareList.filter(p => p.id !== product.id));
    } else if (compareList.length < 4) {
      setCompareList([...compareList, product]);
    } else {
      alert('You can compare up to 4 products only!');
    }
  };

  // Newsletter subscribe
  const subscribeNewsletter = () => {
    if (newsletter && newsletter.includes('@')) {
      alert('Thank you for subscribing! You will receive exclusive offers.');
      setNewsletter('');
      setShowNewsletter(false);
    } else {
      alert('Please enter a valid email address.');
    }
  };

  // Analytics
  const analytics = useMemo(() => ({
    totalRevenue: orders.reduce((sum, o) => sum + o.total.npr, 0),
    totalOrders: orders.length,
    totalCustomers: customers.length,
    totalProducts: products.length
  }), [orders, customers, products]);

  // Add to cart function
  const addToCart = (product, size, color) => {
    const existingItem = cart.find(i => i.productId === product.id && i.size === size && i.color === color);
    if (existingItem) {
      setCart(cart.map(i => i.productId === product.id && i.size === size && i.color === color ? { ...i, quantity: i.quantity + 1 } : i));
    } else {
      setCart([...cart, { productId: product.id, name: product.name, brand: product.brand, image: product.images[0], size, color, price: product.price, quantity: 1 }]);
    }
  };

  // Render stars
  const renderStars = (rating) => '★'.repeat(rating) + '☆'.repeat(5 - rating);

  // Styles with mobile responsiveness
  const s = {
    app: { minHeight: '100vh', background: modeColors.bg, color: modeColors.text, fontFamily: "'Poppins', sans-serif", transition: 'background 0.3s, color 0.3s' },
    header: { background: modeColors.bgHeader, backdropFilter: 'blur(20px)', position: 'sticky', top: 0, zIndex: 1000, borderBottom: `1px solid ${theme.primary}22` },
    topBar: { display: isMobile ? 'none' : 'flex', justifyContent: 'space-between', padding: '10px 32px', fontSize: '12px', color: modeColors.textSecondary, borderBottom: `1px solid ${modeColors.border}` },
    mainNav: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: isMobile ? '12px 16px' : '16px 32px', maxWidth: '1600px', margin: '0 auto', flexWrap: 'wrap', gap: isMobile ? '12px' : '16px' },
    logo: { display: 'flex', alignItems: 'center', gap: isMobile ? '8px' : '12px', cursor: 'pointer' },
    logoText: { fontSize: isMobile ? '20px' : '28px', fontWeight: '800', background: theme.gradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' },
    searchBar: { display: 'flex', background: modeColors.bgTertiary, borderRadius: '14px', padding: '4px', border: `1px solid ${modeColors.border}`, width: isMobile ? '100%' : '400px', order: isMobile ? 3 : 2 },
    searchInput: { flex: 1, background: 'transparent', border: 'none', padding: isMobile ? '10px 14px' : '12px 18px', color: modeColors.text, fontSize: '14px', outline: 'none' },
    searchBtn: { padding: isMobile ? '10px 20px' : '12px 24px', background: theme.gradient, border: 'none', borderRadius: '10px', color: '#fff', fontWeight: '600', cursor: 'pointer', fontSize: isMobile ? '13px' : '14px' },
    iconBtn: { position: 'relative', background: modeColors.bgTertiary, border: 'none', borderRadius: '12px', padding: isMobile ? '10px' : '12px', cursor: 'pointer', fontSize: isMobile ? '18px' : '20px', color: modeColors.text },
    badge: { position: 'absolute', top: '-5px', right: '-5px', background: theme.primary, color: '#fff', fontSize: '11px', fontWeight: '700', padding: '2px 7px', borderRadius: '10px' },
    main: { display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '280px 1fr', gap: isMobile ? '16px' : '32px', padding: isMobile ? '16px' : '32px', maxWidth: '1600px', margin: '0 auto' },
    sidebar: { background: modeColors.bgCard, borderRadius: isMobile ? '16px' : '24px', padding: isMobile ? '16px' : '28px', border: `1px solid ${modeColors.border}`, height: 'fit-content', position: isMobile ? 'relative' : 'sticky', top: '120px', boxShadow: darkMode ? 'none' : '0 4px 20px rgba(0,0,0,0.08)' },
    filterSection: { marginBottom: isMobile ? '20px' : '28px' },
    filterTitle: { fontSize: '13px', fontWeight: '700', marginBottom: '14px', color: theme.primary, textTransform: 'uppercase', letterSpacing: '1px' },
    filterOption: { padding: '10px 14px', borderRadius: '10px', cursor: 'pointer', marginBottom: '6px', fontSize: '14px', transition: 'all 0.2s' },
    colorSwatch: { width: isMobile ? '28px' : '32px', height: isMobile ? '28px' : '32px', borderRadius: '50%', cursor: 'pointer', border: '3px solid transparent', transition: 'all 0.2s' },
    sizeBtn: { padding: isMobile ? '8px 12px' : '10px 16px', border: `1px solid ${modeColors.borderLight}`, borderRadius: '10px', background: modeColors.bgTertiary, color: modeColors.text, cursor: 'pointer', fontSize: '13px', fontWeight: '600', minWidth: isMobile ? '40px' : '48px', textAlign: 'center' },
    productGrid: { display: 'grid', gridTemplateColumns: isMobile ? 'repeat(auto-fill, minmax(160px, 1fr))' : 'repeat(auto-fill, minmax(280px, 1fr))', gap: isMobile ? '16px' : '24px' },
    productCard: { background: modeColors.bgCard, borderRadius: isMobile ? '16px' : '24px', overflow: 'hidden', border: `1px solid ${modeColors.border}`, cursor: 'pointer', transition: 'all 0.3s', boxShadow: darkMode ? 'none' : '0 4px 20px rgba(0,0,0,0.08)' },
    productImage: { width: '100%', height: '100%', objectFit: 'cover' },
    productInfo: { padding: isMobile ? '12px' : '20px' },
    productBrand: { fontSize: isMobile ? '10px' : '12px', color: theme.primary, fontWeight: '600', marginBottom: '6px', textTransform: 'uppercase' },
    productName: { fontSize: isMobile ? '14px' : '16px', fontWeight: '700', marginBottom: '8px', lineHeight: '1.3' },
    currentPrice: { fontSize: isMobile ? '16px' : '20px', fontWeight: '800', color: theme.accent },
    originalPrice: { fontSize: isMobile ? '12px' : '14px', color: modeColors.textMuted, textDecoration: 'line-through' },
    colorDot: { width: isMobile ? '14px' : '16px', height: isMobile ? '14px' : '16px', borderRadius: '50%', border: `2px solid ${modeColors.borderLight}` },
    modal: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000, backdropFilter: 'blur(10px)', padding: isMobile ? '10px' : 0 },
    modalContent: { background: modeColors.bgModal, borderRadius: isMobile ? '20px' : '28px', maxWidth: '900px', width: '95%', maxHeight: '90vh', overflow: 'auto', position: 'relative', border: `1px solid ${modeColors.border}`, color: modeColors.text },
    cartSidebar: { position: 'fixed', top: 0, right: 0, width: isMobile ? '100%' : '420px', height: '100vh', background: modeColors.bgModal, zIndex: 2000, padding: isMobile ? '20px' : '28px', overflowY: 'auto', borderLeft: `1px solid ${modeColors.border}`, color: modeColors.text },
    primaryBtn: { padding: isMobile ? '12px 24px' : '14px 32px', background: theme.gradient, border: 'none', borderRadius: '12px', color: '#fff', fontSize: '14px', fontWeight: '700', cursor: 'pointer', touchAction: 'manipulation' },
    secondaryBtn: { padding: isMobile ? '12px 24px' : '14px 32px', background: modeColors.bgTertiary, border: `1px solid ${modeColors.borderLight}`, borderRadius: '12px', color: modeColors.text, fontSize: '14px', fontWeight: '600', cursor: 'pointer', touchAction: 'manipulation' },
    input: { width: '100%', padding: isMobile ? '12px 16px' : '14px 18px', background: modeColors.inputBg, border: `1px solid ${modeColors.borderLight}`, borderRadius: '12px', color: modeColors.text, fontSize: '14px', outline: 'none' },
    select: { width: '100%', padding: isMobile ? '12px 16px' : '14px 18px', background: modeColors.selectBg, border: `1px solid ${modeColors.borderLight}`, borderRadius: '12px', color: modeColors.text, fontSize: '14px', outline: 'none' },
    label: { display: 'block', marginBottom: '10px', fontSize: '13px', fontWeight: '600', color: modeColors.textSecondary },
    formGroup: { marginBottom: isMobile ? '16px' : '24px' },
    table: { width: '100%', borderCollapse: 'collapse', fontSize: isMobile ? '12px' : '14px', overflowX: 'auto', display: isMobile ? 'block' : 'table' },
    th: { textAlign: 'left', padding: isMobile ? '12px 8px' : '16px', borderBottom: `1px solid ${modeColors.border}`, fontSize: isMobile ? '11px' : '12px', fontWeight: '700', textTransform: 'uppercase', color: theme.primary },
    td: { padding: isMobile ? '12px 8px' : '18px 16px', borderBottom: `1px solid ${modeColors.border}`, fontSize: isMobile ? '12px' : '14px' },
    statCard: { background: modeColors.bgCard, borderRadius: isMobile ? '16px' : '20px', padding: isMobile ? '16px' : '24px', border: `1px solid ${modeColors.border}`, boxShadow: darkMode ? 'none' : '0 4px 20px rgba(0,0,0,0.08)' },
    themeToggle: { display: 'flex', alignItems: 'center', justifyContent: 'center', width: isMobile ? '40px' : '44px', height: isMobile ? '40px' : '44px', borderRadius: '12px', background: modeColors.bgTertiary, border: 'none', cursor: 'pointer', fontSize: isMobile ? '18px' : '20px', transition: 'all 0.3s', touchAction: 'manipulation' },
    hamburger: { display: isMobile ? 'flex' : 'none', flexDirection: 'column', gap: '4px', cursor: 'pointer', padding: '8px', background: modeColors.bgTertiary, borderRadius: '8px', touchAction: 'manipulation' },
    hamburgerLine: { width: '24px', height: '3px', background: modeColors.text, borderRadius: '2px', transition: 'all 0.3s' },
  };

  // Product Modal
  const ProductModal = ({ product, onClose }) => {
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedColor, setSelectedColor] = useState(product.colors[0]);
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [newReview, setNewReview] = useState({ user: '', rating: 5, comment: '' });
    const discount = Math.round(((product.originalPrice.npr - product.price.npr) / product.originalPrice.npr) * 100);

    const handleAddReview = () => {
      if (!newReview.user || !newReview.comment) return alert('Please fill all fields');
      setProducts(products.map(p => p.id === product.id ? { ...p, reviews: [...p.reviews, { ...newReview, id: Date.now(), date: new Date().toISOString().split('T')[0], helpful: 0 }] } : p));
      setNewReview({ user: '', rating: 5, comment: '' });
      setShowReviewForm(false);
    };

    return (
      <div style={s.modal} onClick={onClose}>
        <div style={{ ...s.modalContent, display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', maxWidth: isMobile ? '95%' : '900px' }} onClick={e => e.stopPropagation()}>
          <div style={{ padding: isMobile ? '20px' : '32px', borderRight: isMobile ? 'none' : `1px solid ${modeColors.border}`, borderBottom: isMobile ? `1px solid ${modeColors.border}` : 'none' }}>
            <img src={product.images[0]} alt="" style={{ width: '100%', height: isMobile ? '280px' : '400px', objectFit: 'cover', borderRadius: '20px' }} />
          </div>
          <div style={{ padding: isMobile ? '20px' : '32px', overflowY: 'auto', maxHeight: isMobile ? '50vh' : '90vh' }}>
            <button onClick={onClose} style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', color: modeColors.text, fontSize: '28px', cursor: 'pointer' }}>×</button>
            <div style={s.productBrand}>{product.brand}</div>
            <h2 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '12px' }}>{product.name}</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              {renderStars(Math.round(product.rating))}
              <span style={{ color: modeColors.textSecondary, fontSize: '13px' }}>{product.rating} ({product.reviews.length} reviews)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <span style={{ ...s.currentPrice, fontSize: '32px' }}>{currency === 'NPR' ? `रू ${product.price.npr.toLocaleString()}` : `₹ ${product.price.inr.toLocaleString()}`}</span>
              {discount > 0 && <span style={s.originalPrice}>{currency === 'NPR' ? `रू ${product.originalPrice.npr.toLocaleString()}` : `₹ ${product.originalPrice.inr.toLocaleString()}`}</span>}
              {discount > 0 && <span style={{ background: '#e74c3c', color: '#fff', padding: '4px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: '700' }}>-{discount}%</span>}
            </div>
            <p style={{ color: modeColors.textSecondary, lineHeight: '1.7', marginBottom: '24px' }}>{product.description}</p>
            <div style={{ marginBottom: '24px' }}>
              <h4 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '12px' }}>COLOR: {selectedColor}</h4>
              <div style={{ display: 'flex', gap: '10px' }}>
                {product.colors.map(color => {
                  const c = availableColors.find(x => x.name === color);
                  return <div key={color} onClick={() => setSelectedColor(color)} style={{ ...s.colorSwatch, background: c?.hex || '#888', borderColor: selectedColor === color ? theme.primary : 'transparent', transform: selectedColor === color ? 'scale(1.15)' : 'scale(1)' }} title={color} />;
                })}
              </div>
            </div>
            <div style={{ marginBottom: '24px' }}>
              <h4 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '12px' }}>SIZE</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {product.sizes.map(size => (
                  <button key={size} onClick={() => setSelectedSize(size)} style={{ ...s.sizeBtn, background: selectedSize === size ? theme.gradient : modeColors.bgTertiary, borderColor: selectedSize === size ? 'transparent' : modeColors.borderLight }}>{size}</button>
                ))}
              </div>
            </div>
            {!selectedSize && <p style={{ color: '#e74c3c', fontSize: '13px', marginBottom: '12px' }}>Please select a size to add to cart</p>}
            <div style={{ display: 'flex', gap: '12px', marginBottom: '32px' }}>
              <button style={{ ...s.primaryBtn, flex: 1, opacity: selectedSize ? 1 : 0.5, cursor: selectedSize ? 'pointer' : 'not-allowed' }} disabled={!selectedSize} onClick={() => { if (selectedSize) { addToCart(product, selectedSize, selectedColor); onClose(); setShowCart(true); } }}>{selectedSize ? 'Add to Cart' : 'Select Size First'}</button>
              <button style={{ ...s.secondaryBtn, padding: '14px 20px' }} onClick={() => setWishlist(wishlist.includes(product.id) ? wishlist.filter(x => x !== product.id) : [...wishlist, product.id])}>{wishlist.includes(product.id) ? '❤️' : '🤍'}</button>
            </div>
            <div style={{ borderTop: `1px solid ${modeColors.border}`, paddingTop: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '700' }}>Reviews ({product.reviews.length})</h3>
                <button style={s.secondaryBtn} onClick={() => setShowReviewForm(!showReviewForm)}>Write a Review</button>
              </div>
              {showReviewForm && (
                <div style={{ background: modeColors.bgSecondary, borderRadius: '16px', padding: '20px', marginBottom: '20px' }}>
                  <div style={s.formGroup}><label style={s.label}>Name</label><input style={s.input} value={newReview.user} onChange={e => setNewReview({ ...newReview, user: e.target.value })} placeholder="Your name" /></div>
                  <div style={s.formGroup}><label style={s.label}>Rating</label><div style={{ display: 'flex', gap: '8px' }}>{[1, 2, 3, 4, 5].map(star => <span key={star} onClick={() => setNewReview({ ...newReview, rating: star })} style={{ fontSize: '28px', cursor: 'pointer', color: star <= newReview.rating ? '#ffc107' : modeColors.textMuted }}>★</span>)}</div></div>
                  <div style={s.formGroup}><label style={s.label}>Review</label><textarea style={{ ...s.input, minHeight: '80px', resize: 'vertical' }} value={newReview.comment} onChange={e => setNewReview({ ...newReview, comment: e.target.value })} placeholder="Your review..." /></div>
                  <button style={s.primaryBtn} onClick={handleAddReview}>Submit Review</button>
                </div>
              )}
              {product.reviews.map(review => (
                <div key={review.id} style={{ background: modeColors.bgSecondary, borderRadius: '12px', padding: '16px', marginBottom: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}><div><span style={{ fontWeight: '600' }}>{review.user}</span><span style={{ marginLeft: '12px', color: '#ffc107' }}>{renderStars(review.rating)}</span></div><span style={{ fontSize: '12px', color: modeColors.textMuted }}>{review.date}</span></div>
                  <p style={{ fontSize: '14px', color: modeColors.textSecondary }}>{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Checkout Modal
  const CheckoutModal = () => {
    const [data, setData] = useState({ name: '', email: '', phone: '', street: '', city: '', country: 'Nepal', paymentMethod: '' });
    const [checkoutStep, setCheckoutStep] = useState(1); // Step 1: Details & Payment Method, Step 2: Make Payment, Step 3: Confirm
    const [paymentConfirmed, setPaymentConfirmed] = useState(false);

    // Payment logos (using reliable CDN logos)
    const paymentLogos = {
      esewa: 'https://cdn.esewa.com.np/ui/images/esewa_og.png',
      khalti: 'https://play-lh.googleusercontent.com/Xh_iBYvx_LIz9pBLU_kixwVbdo9uw3t-iqL5tDpABMCGiXjPwwwwjuMqrCNCVf_w0KI',
      fonepay: 'https://play-lh.googleusercontent.com/eeFHzXLqE5xfkxjJZjMp2R5N5TQfJ4_aHaJaTplf1rTJdTPXGlqKIWTyhdPqWtyLlqw',
      phonepe: 'https://play-lh.googleusercontent.com/6iyA2zVz5PyyMjK5SIxdUhrb7oh9cYVXJ93q6DZkmx07Er1o90PXYeo6mzL4VC2Gzl8',
      paytm: 'https://play-lh.googleusercontent.com/Z5BA3DYVKalnbCW8CGlIM3bN699i6QwRs5oE5kr-wPcDTmqA4vqBNuOr13_zPfcYrDo',
      razorpay: 'https://play-lh.googleusercontent.com/DTzWtkxfnKwFO3ruybIWKp7xFZc4jyqHWjD_KuLb8Tn-3W5aXmXK06dr0sNvkpWeNGTZ',
      cod: null
    };

    const nepalPayments = [
      { id: 'esewa', name: 'eSewa', logo: paymentLogos.esewa, enabled: paymentAccounts.esewa.enabled },
      { id: 'khalti', name: 'Khalti', logo: paymentLogos.khalti, enabled: paymentAccounts.khalti.enabled },
      { id: 'fonepay', name: 'FonePay', logo: paymentLogos.fonepay, enabled: paymentAccounts.fonepay.enabled },
      { id: 'cod', name: 'Cash on Delivery', logo: null, enabled: true }
    ].filter(p => p.enabled);
    const indiaPayments = [
      { id: 'phonepe', name: 'PhonePe', logo: paymentLogos.phonepe, enabled: paymentAccounts.phonepe.enabled },
      { id: 'paytm', name: 'Paytm', logo: paymentLogos.paytm, enabled: paymentAccounts.paytm.enabled },
      { id: 'razorpay', name: 'UPI', logo: paymentLogos.razorpay, enabled: paymentAccounts.razorpay.enabled },
      { id: 'cod', name: 'Cash on Delivery', logo: null, enabled: true }
    ].filter(p => p.enabled);
    const payments = data.country === 'Nepal' ? nepalPayments : indiaPayments;

    // Get payment account details for selected method
    const getPaymentDetails = () => {
      const method = data.paymentMethod;
      if (method === 'cod') return null;
      if (method === 'esewa') return { type: 'wallet', name: 'eSewa', id: paymentAccounts.esewa.id, accountName: paymentAccounts.esewa.name };
      if (method === 'khalti') return { type: 'wallet', name: 'Khalti', id: paymentAccounts.khalti.id, accountName: paymentAccounts.khalti.name };
      if (method === 'fonepay') return { type: 'wallet', name: 'FonePay', id: paymentAccounts.fonepay.id, accountName: paymentAccounts.fonepay.name };
      if (method === 'phonepe') return { type: 'upi', name: 'PhonePe', id: paymentAccounts.phonepe.id, accountName: paymentAccounts.phonepe.name };
      if (method === 'paytm') return { type: 'wallet', name: 'Paytm', id: paymentAccounts.paytm.id, accountName: paymentAccounts.paytm.name };
      if (method === 'razorpay') return { type: 'upi', name: 'UPI', id: paymentAccounts.razorpay.id, accountName: paymentAccounts.razorpay.name };
      return null;
    };

    const sendSmsNotification = (orderData) => {
      // SMS notification - In production, integrate with SMS API like Twilio, Sparrow SMS (Nepal), MSG91 (India)
      const message = `Thank you for ordering from ${storeConfig.name}! Your order #${orderData.id} has been placed successfully. Total: ${currency === 'NPR' ? 'रू' : '₹'} ${cartTotal.toLocaleString()}. We will notify you when it ships!`;
      console.log('SMS would be sent to:', orderData.customer.phone, 'Message:', message);
      // For demo, show alert
      alert(`📱 Order Confirmation SMS sent to ${orderData.customer.phone}!\n\n${message}`);
    };

    // Proceed to payment step
    const proceedToPayment = () => {
      if (!data.name || !data.phone || !data.street || !data.city || !data.paymentMethod) {
        return alert('Please fill all required fields');
      }
      if (data.paymentMethod === 'cod') {
        // For COD, skip payment step and go directly to place order
        handleOrder();
      } else {
        // For online payment, go to step 2 (make payment)
        setCheckoutStep(2);
      }
    };

    // Confirm payment made
    const confirmPayment = () => {
      setPaymentConfirmed(true);
      setCheckoutStep(3);
    };

    const handleOrder = () => {
      const newOrder = { id: `ORD${String(orders.length + 1).padStart(3, '0')}`, customer: { name: data.name, email: data.email, phone: data.phone }, address: { city: data.city, country: data.country }, items: cart.map(i => ({ ...i })), total: { npr: cartTotal * (currency === 'INR' ? exchangeRate : 1), inr: cartTotal * (currency === 'NPR' ? 1 / exchangeRate : 1) }, status: data.paymentMethod === 'cod' ? 'Processing' : 'Payment Received', date: new Date().toISOString().split('T')[0], paymentMethod: data.paymentMethod };
      setOrders([...orders, newOrder]);
      cart.forEach(item => setProducts(products.map(p => p.id === item.productId ? { ...p, stock: p.stock - item.quantity, soldCount: p.soldCount + item.quantity } : p)));

      // Send SMS notification
      sendSmsNotification(newOrder);

      setCart([]);
      setAppliedCoupon(null);
      setShowCheckout(false);
    };

    const paymentDetails = getPaymentDetails();

    return (
      <div style={s.modal}>
        <div style={{ ...s.modalContent, maxWidth: '900px', padding: '32px', maxHeight: '90vh', overflowY: 'auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '800' }}>
              {checkoutStep === 1 ? 'Checkout' : checkoutStep === 2 ? 'Make Payment' : 'Confirm Order'}
            </h2>
            <button onClick={() => setShowCheckout(false)} style={{ background: 'none', border: 'none', color: modeColors.text, fontSize: '28px', cursor: 'pointer' }}>×</button>
          </div>

          {/* Step Indicator */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '32px', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: checkoutStep >= 1 ? theme.gradient : modeColors.bgTertiary, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '14px' }}>1</div>
              <span style={{ fontSize: '13px', fontWeight: checkoutStep === 1 ? '700' : '400', color: checkoutStep >= 1 ? modeColors.text : modeColors.textMuted }}>Details</span>
            </div>
            <div style={{ width: '40px', height: '2px', background: checkoutStep >= 2 ? theme.primary : modeColors.bgTertiary }}></div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: checkoutStep >= 2 ? theme.gradient : modeColors.bgTertiary, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '14px' }}>2</div>
              <span style={{ fontSize: '13px', fontWeight: checkoutStep === 2 ? '700' : '400', color: checkoutStep >= 2 ? modeColors.text : modeColors.textMuted }}>Payment</span>
            </div>
            <div style={{ width: '40px', height: '2px', background: checkoutStep >= 3 ? theme.primary : modeColors.bgTertiary }}></div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: checkoutStep >= 3 ? theme.gradient : modeColors.bgTertiary, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '14px' }}>3</div>
              <span style={{ fontSize: '13px', fontWeight: checkoutStep === 3 ? '700' : '400', color: checkoutStep >= 3 ? modeColors.text : modeColors.textMuted }}>Confirm</span>
            </div>
          </div>

          {/* Step 1: Customer Details & Payment Method */}
          {checkoutStep === 1 && (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div style={s.formGroup}><label style={s.label}>Name *</label><input style={s.input} value={data.name} onChange={e => setData({ ...data, name: e.target.value })} placeholder="Full name" /></div>
                <div style={s.formGroup}><label style={s.label}>Phone * (for order updates)</label><input style={s.input} value={data.phone} onChange={e => setData({ ...data, phone: e.target.value })} placeholder="+977 98XXXXXXXX" /></div>
              </div>
              <div style={s.formGroup}><label style={s.label}>Email</label><input style={s.input} value={data.email} onChange={e => setData({ ...data, email: e.target.value })} placeholder="Email" /></div>
              <div style={s.formGroup}><label style={s.label}>Country *</label><select style={s.select} value={data.country} onChange={e => setData({ ...data, country: e.target.value, paymentMethod: '' })}><option value="Nepal">Nepal</option><option value="India">India</option></select></div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div style={s.formGroup}><label style={s.label}>Street *</label><input style={s.input} value={data.street} onChange={e => setData({ ...data, street: e.target.value })} placeholder="Street address" /></div>
                <div style={s.formGroup}><label style={s.label}>City *</label><input style={s.input} value={data.city} onChange={e => setData({ ...data, city: e.target.value })} placeholder="City" /></div>
              </div>
              <div style={{ marginTop: '20px' }}>
                <label style={s.label}>Payment Method *</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
                  {payments.map(p => (
                    <div key={p.id} onClick={() => setData({ ...data, paymentMethod: p.id })} style={{ padding: '16px', background: data.paymentMethod === p.id ? `${theme.primary}22` : modeColors.bgTertiary, border: data.paymentMethod === p.id ? `2px solid ${theme.primary}` : '2px solid transparent', borderRadius: '12px', cursor: 'pointer', textAlign: 'center', transition: 'all 0.2s' }}>
                      {p.logo ? (
                        <img src={p.logo} alt={p.name} style={{ width: '48px', height: '48px', objectFit: 'contain', borderRadius: '8px' }} />
                      ) : (
                        <div style={{ width: '48px', height: '48px', background: modeColors.bgSecondary, borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto', fontSize: '24px' }}>💵</div>
                      )}
                      <div style={{ fontWeight: '600', fontSize: '12px', marginTop: '8px' }}>{p.name}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ marginTop: '24px', padding: '20px', background: modeColors.bgTertiary, borderRadius: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}><span>Subtotal</span><span>{currency === 'NPR' ? `रू ${cartSubtotal.toLocaleString()}` : `₹ ${cartSubtotal.toLocaleString()}`}</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}><span>Shipping</span><span style={{ color: shippingCost === 0 ? theme.accent : modeColors.text }}>{shippingCost === 0 ? 'FREE' : (currency === 'NPR' ? `रू ${shippingCost}` : `₹ ${shippingCost}`)}</span></div>
                {couponDiscount > 0 && <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}><span style={{ color: theme.accent }}>Discount</span><span style={{ color: theme.accent }}>- {currency === 'NPR' ? `रू ${couponDiscount.toLocaleString()}` : `₹ ${couponDiscount.toLocaleString()}`}</span></div>}
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '20px', fontWeight: '800', paddingTop: '10px', borderTop: `1px solid ${modeColors.border}` }}><span>Total</span><span style={{ color: theme.primary }}>{currency === 'NPR' ? `रू ${cartTotal.toLocaleString()}` : `₹ ${cartTotal.toLocaleString()}`}</span></div>
              </div>

              <button style={{ ...s.primaryBtn, width: '100%', marginTop: '24px', padding: '16px' }} onClick={proceedToPayment}>
                {data.paymentMethod === 'cod' ? '📦 Place Order (Cash on Delivery)' : 'Proceed to Payment →'}
              </button>
            </>
          )}

          {/* Step 2: Make Payment */}
          {checkoutStep === 2 && paymentDetails && (
            <>
              <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                {payments.find(p => p.id === data.paymentMethod)?.logo && (
                  <img src={payments.find(p => p.id === data.paymentMethod)?.logo} alt={paymentDetails.name} style={{ width: '60px', height: '60px', objectFit: 'contain', borderRadius: '12px', marginBottom: '12px' }} />
                )}
                <h3 style={{ fontSize: '20px', fontWeight: '700', color: theme.primary }}>Pay using {paymentDetails.name}</h3>
                <p style={{ color: modeColors.textSecondary, marginTop: '8px' }}>Scan QR code or use details below</p>
              </div>

              {/* QR Code Section */}
              <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                <div style={{ background: '#fff', padding: '20px', borderRadius: '16px', display: 'inline-block', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
                  <img
                    src={generateQRCode(getPaymentQRData(data.paymentMethod, cartTotal, currency), 180)}
                    alt="Payment QR Code"
                    style={{ width: '180px', height: '180px', borderRadius: '8px' }}
                  />
                </div>
                <p style={{ fontSize: '13px', color: modeColors.textSecondary, marginTop: '12px' }}>Scan with {paymentDetails.name} app to pay instantly</p>
              </div>

              <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                <span style={{ background: modeColors.bgTertiary, padding: '8px 24px', borderRadius: '20px', fontSize: '13px', color: modeColors.textSecondary }}>OR pay manually</span>
              </div>

              <div style={{ background: modeColors.bgTertiary, borderRadius: '16px', padding: '24px', marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', paddingBottom: '16px', borderBottom: `1px solid ${modeColors.border}` }}>
                  <span style={{ color: modeColors.textSecondary, fontSize: '14px' }}>{paymentDetails.type === 'upi' ? 'UPI ID' : 'Phone/ID'}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontWeight: '700', fontSize: '18px', color: theme.accent }}>{paymentDetails.id}</span>
                    <button onClick={() => { navigator.clipboard.writeText(paymentDetails.id); alert('Copied!'); }} style={{ ...s.secondaryBtn, padding: '8px 16px', fontSize: '12px' }}>Copy</button>
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <span style={{ color: modeColors.textSecondary }}>Account Name</span>
                  <span style={{ fontWeight: '600' }}>{paymentDetails.accountName}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: `${theme.primary}11`, padding: '16px', borderRadius: '12px', marginTop: '8px' }}>
                  <span style={{ fontWeight: '600' }}>Amount to Pay</span>
                  <span style={{ fontWeight: '800', fontSize: '24px', color: theme.primary }}>{currency === 'NPR' ? `रू ${cartTotal.toLocaleString()}` : `₹ ${cartTotal.toLocaleString()}`}</span>
                </div>
              </div>

              <div style={{ background: '#10b98122', padding: '16px', borderRadius: '12px', marginBottom: '24px', border: '1px solid #10b98144' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <span style={{ fontSize: '24px' }}>📱</span>
                  <div>
                    <p style={{ fontWeight: '600', marginBottom: '4px', color: '#10b981' }}>How to Pay:</p>
                    <ol style={{ fontSize: '13px', color: modeColors.textSecondary, paddingLeft: '16px', margin: 0 }}>
                      <li>Open {paymentDetails.name} app on your phone</li>
                      <li>Scan the QR code above OR enter the {paymentDetails.type === 'upi' ? 'UPI ID' : 'number'} manually</li>
                      <li>Confirm payment of {currency === 'NPR' ? `रू ${cartTotal.toLocaleString()}` : `₹ ${cartTotal.toLocaleString()}`}</li>
                      <li>After success, click "I Have Made Payment"</li>
                    </ol>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button style={{ ...s.secondaryBtn, flex: 1, padding: '16px' }} onClick={() => setCheckoutStep(1)}>← Back</button>
                <button style={{ ...s.primaryBtn, flex: 2, padding: '16px' }} onClick={confirmPayment}>✓ I Have Made Payment</button>
              </div>
            </>
          )}

          {/* Step 3: Confirm Order */}
          {checkoutStep === 3 && (
            <>
              <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                <div style={{ width: '80px', height: '80px', background: `${theme.accent}22`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontSize: '40px' }}>✓</div>
                <h3 style={{ fontSize: '20px', fontWeight: '700', color: theme.accent }}>Payment Received!</h3>
                <p style={{ color: modeColors.textSecondary, marginTop: '8px' }}>Please confirm your order details below</p>
              </div>

              <div style={{ background: modeColors.bgTertiary, borderRadius: '16px', padding: '20px', marginBottom: '24px' }}>
                <h4 style={{ fontWeight: '700', marginBottom: '16px', paddingBottom: '12px', borderBottom: `1px solid ${modeColors.border}` }}>Order Summary</h4>
                <div style={{ display: 'grid', gap: '8px', fontSize: '14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: modeColors.textSecondary }}>Name:</span><span style={{ fontWeight: '600' }}>{data.name}</span></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: modeColors.textSecondary }}>Phone:</span><span style={{ fontWeight: '600' }}>{data.phone}</span></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: modeColors.textSecondary }}>Address:</span><span style={{ fontWeight: '600' }}>{data.street}, {data.city}, {data.country}</span></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: modeColors.textSecondary }}>Payment:</span><span style={{ fontWeight: '600', color: theme.accent }}>{paymentDetails?.name} - Paid</span></div>
                </div>
              </div>

              <div style={{ background: modeColors.bgTertiary, borderRadius: '16px', padding: '20px', marginBottom: '24px' }}>
                <h4 style={{ fontWeight: '700', marginBottom: '16px' }}>Items ({cart.length})</h4>
                {cart.map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingBottom: '12px', marginBottom: '12px', borderBottom: i < cart.length - 1 ? `1px solid ${modeColors.border}` : 'none' }}>
                    <img src={item.image} alt={item.name} style={{ width: '50px', height: '50px', borderRadius: '8px', objectFit: 'cover' }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: '600', fontSize: '14px' }}>{item.name}</div>
                      <div style={{ fontSize: '12px', color: modeColors.textSecondary }}>Size: {item.size} | Color: {item.color} | Qty: {item.quantity}</div>
                    </div>
                    <div style={{ fontWeight: '700', color: theme.primary }}>{currency === 'NPR' ? `रू ${(item.price.npr * item.quantity).toLocaleString()}` : `₹ ${(item.price.inr * item.quantity).toLocaleString()}`}</div>
                  </div>
                ))}
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: '800', paddingTop: '12px', borderTop: `1px solid ${modeColors.border}` }}>
                  <span>Total Paid</span>
                  <span style={{ color: theme.primary }}>{currency === 'NPR' ? `रू ${cartTotal.toLocaleString()}` : `₹ ${cartTotal.toLocaleString()}`}</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button style={{ ...s.secondaryBtn, flex: 1, padding: '16px' }} onClick={() => setCheckoutStep(2)}>← Back</button>
                <button style={{ ...s.primaryBtn, flex: 2, padding: '16px' }} onClick={handleOrder}>✓ Confirm & Place Order</button>
              </div>
              <p style={{ textAlign: 'center', fontSize: '12px', color: modeColors.textMuted, marginTop: '12px' }}>You will receive an SMS confirmation on your phone</p>
            </>
          )}
        </div>
      </div>
    );
  };

  // Password Change Form Component
  const PasswordChangeForm = () => {
    const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });
    const [showPasswords, setShowPasswords] = useState(false);

    const handlePasswordChange = () => {
      if (!passwords.current || !passwords.new || !passwords.confirm) {
        return alert('Please fill all password fields');
      }
      if (passwords.current !== storedAdminPassword) {
        return alert('Current password is incorrect!');
      }
      if (passwords.new.length < 6) {
        return alert('New password must be at least 6 characters');
      }
      if (passwords.new !== passwords.confirm) {
        return alert('New passwords do not match!');
      }
      setStoredAdminPassword(passwords.new);
      setPasswords({ current: '', new: '', confirm: '' });
      alert('Password changed successfully!');
    };

    return (
      <div>
        <div style={{ display: 'grid', gap: '16px' }}>
          <div style={s.formGroup}>
            <label style={s.label}>Current Password</label>
            <input
              type={showPasswords ? 'text' : 'password'}
              style={s.input}
              value={passwords.current}
              onChange={e => setPasswords({ ...passwords, current: e.target.value })}
              placeholder="Enter current password"
            />
          </div>
          <div style={s.formGroup}>
            <label style={s.label}>New Password</label>
            <input
              type={showPasswords ? 'text' : 'password'}
              style={s.input}
              value={passwords.new}
              onChange={e => setPasswords({ ...passwords, new: e.target.value })}
              placeholder="Enter new password (min 6 characters)"
            />
          </div>
          <div style={s.formGroup}>
            <label style={s.label}>Confirm New Password</label>
            <input
              type={showPasswords ? 'text' : 'password'}
              style={s.input}
              value={passwords.confirm}
              onChange={e => setPasswords({ ...passwords, confirm: e.target.value })}
              placeholder="Confirm new password"
            />
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '16px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px', color: modeColors.textSecondary }}>
            <input
              type="checkbox"
              checked={showPasswords}
              onChange={e => setShowPasswords(e.target.checked)}
              style={{ accentColor: theme.primary }}
            />
            Show passwords
          </label>
        </div>
        <button style={{ ...s.primaryBtn, marginTop: '20px' }} onClick={handlePasswordChange}>
          Update Password
        </button>
        <p style={{ fontSize: '12px', color: modeColors.textMuted, marginTop: '12px' }}>
          Note: Password changes are session-only. Default password: admin123
        </p>
      </div>
    );
  };

  // Admin View
  const AdminView = () => {
    const [newProduct, setNewProduct] = useState({ name: '', brand: '', price: { npr: 0 }, originalPrice: { npr: 0 }, images: [''], category: '', colors: [], sizes: [], stock: 0, description: '', featured: false, trending: false, newArrival: false, colorsText: '', sizesText: '' });
    const [newCategory, setNewCategory] = useState({ name: '', icon: '📦' });
    const [newBrand, setNewBrand] = useState({ name: '' });
    const [editingStore, setEditingStore] = useState({ ...storeConfig });
    const [editingProduct, setEditingProduct] = useState(null);

    const handleAddProduct = () => {
      if (!newProduct.name) return alert('Please enter product name');
      if (!newProduct.brand) return alert('Please select a brand');
      if (!newProduct.category) return alert('Please select a category');
      if (!newProduct.price.npr || newProduct.price.npr <= 0) return alert('Please enter a valid price');

      // Use a placeholder image if no image provided
      const productImage = newProduct.images[0] || 'https://via.placeholder.com/500x500?text=No+Image';

      const productToAdd = {
        ...newProduct,
        id: Date.now(),
        images: [productImage],
        price: { npr: newProduct.price.npr, inr: Math.round(newProduct.price.npr / exchangeRate) },
        originalPrice: { npr: newProduct.originalPrice.npr || newProduct.price.npr, inr: Math.round((newProduct.originalPrice.npr || newProduct.price.npr) / exchangeRate) },
        rating: 0,
        reviews: [],
        soldCount: 0,
        colors: newProduct.colors.filter(c => c.trim() !== ''),
        sizes: newProduct.sizes.filter(s => !isNaN(s))
      };

      setProducts([...products, productToAdd]);
      setNewProduct({ name: '', brand: '', price: { npr: 0 }, originalPrice: { npr: 0 }, images: [''], category: '', colors: [], sizes: [], stock: 0, description: '', featured: false, trending: false, newArrival: false, colorsText: '', sizesText: '' });
      alert('Product added successfully!');
    };

    const handleEditProduct = (product) => {
      setEditingProduct({
        ...product,
        colors: product.colors || [],
        sizes: product.sizes || []
      });
    };

    const handleSaveEdit = () => {
      if (!editingProduct.name || !editingProduct.brand || !editingProduct.category) return alert('Fill required fields');
      setProducts(products.map(p => p.id === editingProduct.id ? {
        ...editingProduct,
        price: { npr: editingProduct.price.npr, inr: Math.round(editingProduct.price.npr / exchangeRate) },
        originalPrice: { npr: editingProduct.originalPrice.npr, inr: Math.round(editingProduct.originalPrice.npr / exchangeRate) }
      } : p));
      setEditingProduct(null);
      alert('Product updated successfully!');
    };

    return (
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '260px 1fr', gap: isMobile ? '16px' : '32px', padding: isMobile ? '16px' : '32px', maxWidth: '1600px', margin: '0 auto' }}>
        <aside style={{ background: modeColors.bgSecondary, borderRadius: isMobile ? '16px' : '24px', padding: isMobile ? '20px' : '28px', border: `1px solid ${modeColors.border}`, height: 'fit-content' }}>
          <div style={{ fontSize: isMobile ? '20px' : '24px', fontWeight: '800', marginBottom: isMobile ? '16px' : '24px' }}>Admin Panel</div>
          {[{ id: 'dashboard', icon: '📊', label: 'Dashboard' }, { id: 'products', icon: '👟', label: 'Products' }, { id: 'categories', icon: '📁', label: 'Categories' }, { id: 'orders', icon: '📦', label: 'Orders' }, { id: 'coupons', icon: '🎟️', label: 'Coupons' }, { id: 'payments', icon: '💳', label: 'Payments' }, { id: 'customers', icon: '👥', label: 'Customers' }, { id: 'settings', icon: '⚙️', label: 'Store Settings' }].map(item => (
              <div key={item.id} onClick={() => setAdminTab(item.id)} style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: isMobile ? '12px 14px' : '14px 18px', borderRadius: '14px', cursor: 'pointer', marginBottom: '8px', background: adminTab === item.id ? theme.gradient : 'transparent' }}><span style={{ fontSize: isMobile ? '16px' : '18px' }}>{item.icon}</span><span style={{ fontWeight: '500', fontSize: isMobile ? '13px' : '14px' }}>{item.label}</span></div>
          ))}
          <button style={{ ...s.secondaryBtn, width: '100%', marginTop: isMobile ? '16px' : '24px', padding: isMobile ? '10px' : '14px 32px' }} onClick={() => { setIsLoggedIn(false); window.location.hash = '#/customer'; }}>Back to Store</button>
        </aside>
        <main style={{ background: modeColors.bgSecondary, borderRadius: '24px', padding: '32px', border: `1px solid ${modeColors.border}` }}>
          {adminTab === 'dashboard' && (
            <>
              <h2 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '28px' }}>Dashboard Overview</h2>

              {/* Key Metrics */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '28px' }}>
                <div style={s.statCard}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <div style={{ fontSize: '13px', color: modeColors.textSecondary, marginBottom: '8px' }}>Total Revenue</div>
                      <div style={{ fontSize: '28px', fontWeight: '800', color: theme.accent }}>रू {analytics.totalRevenue.toLocaleString()}</div>
                      <div style={{ fontSize: '12px', color: '#2ecc71', marginTop: '8px' }}>↑ 12% from last month</div>
                    </div>
                    <div style={{ fontSize: '36px' }}>💰</div>
                  </div>
                </div>
                <div style={s.statCard}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <div style={{ fontSize: '13px', color: modeColors.textSecondary, marginBottom: '8px' }}>Total Orders</div>
                      <div style={{ fontSize: '28px', fontWeight: '800', color: '#3498db' }}>{analytics.totalOrders}</div>
                      <div style={{ fontSize: '12px', color: '#2ecc71', marginTop: '8px' }}>↑ 8% from last month</div>
                    </div>
                    <div style={{ fontSize: '36px' }}>📦</div>
                  </div>
                </div>
                <div style={s.statCard}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <div style={{ fontSize: '13px', color: modeColors.textSecondary, marginBottom: '8px' }}>Customers</div>
                      <div style={{ fontSize: '28px', fontWeight: '800', color: '#9b59b6' }}>{analytics.totalCustomers}</div>
                      <div style={{ fontSize: '12px', color: '#2ecc71', marginTop: '8px' }}>↑ 5% from last month</div>
                    </div>
                    <div style={{ fontSize: '36px' }}>👥</div>
                  </div>
                </div>
                <div style={s.statCard}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <div style={{ fontSize: '13px', color: modeColors.textSecondary, marginBottom: '8px' }}>Products</div>
                      <div style={{ fontSize: '28px', fontWeight: '800', color: theme.primary }}>{analytics.totalProducts}</div>
                      <div style={{ fontSize: '12px', color: modeColors.textMuted, marginTop: '8px' }}>{products.filter(p => p.stock < 10).length} low stock</div>
                    </div>
                    <div style={{ fontSize: '36px' }}>👟</div>
                  </div>
                </div>
              </div>

              {/* Charts Section */}
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px', marginBottom: '28px' }}>
                {/* Sales by Month Chart */}
                <div style={{ ...s.statCard, padding: '24px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '24px' }}>Sales by Month (NPR)</h3>
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: '12px', height: '200px', paddingBottom: '30px', position: 'relative' }}>
                    {[
                      { month: 'Jul', sales: 45000 },
                      { month: 'Aug', sales: 62000 },
                      { month: 'Sep', sales: 58000 },
                      { month: 'Oct', sales: 78000 },
                      { month: 'Nov', sales: 95000 },
                      { month: 'Dec', sales: analytics.totalRevenue || 85000 }
                    ].map((item, i) => {
                      const maxSales = 100000;
                      const height = (item.sales / maxSales) * 160;
                      return (
                        <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                          <div style={{ fontSize: '11px', fontWeight: '600', color: modeColors.text }}>रू{(item.sales/1000).toFixed(0)}k</div>
                          <div style={{ width: '100%', height: `${height}px`, background: i === 5 ? theme.gradient : `${theme.primary}66`, borderRadius: '8px 8px 0 0', transition: 'height 0.3s' }}></div>
                          <div style={{ fontSize: '12px', color: modeColors.textSecondary }}>{item.month}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Order Status Pie Chart */}
                <div style={{ ...s.statCard, padding: '24px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '24px' }}>Order Status</h3>
                  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                    <div style={{ width: '140px', height: '140px', borderRadius: '50%', background: `conic-gradient(#2ecc71 0deg ${orders.filter(o => o.status === 'Delivered').length / Math.max(orders.length, 1) * 360}deg, #3498db ${orders.filter(o => o.status === 'Delivered').length / Math.max(orders.length, 1) * 360}deg ${(orders.filter(o => o.status === 'Delivered').length + orders.filter(o => o.status === 'Shipped').length) / Math.max(orders.length, 1) * 360}deg, #f39c12 ${(orders.filter(o => o.status === 'Delivered').length + orders.filter(o => o.status === 'Shipped').length) / Math.max(orders.length, 1) * 360}deg 360deg)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <div style={{ width: '90px', height: '90px', borderRadius: '50%', background: modeColors.bgCard, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                        <div style={{ fontSize: '24px', fontWeight: '800' }}>{orders.length}</div>
                        <div style={{ fontSize: '11px', color: modeColors.textSecondary }}>Total</div>
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'grid', gap: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
                      <div style={{ width: '12px', height: '12px', borderRadius: '3px', background: '#2ecc71' }}></div>
                      <span style={{ color: modeColors.textSecondary }}>Delivered</span>
                      <span style={{ marginLeft: 'auto', fontWeight: '600' }}>{orders.filter(o => o.status === 'Delivered').length}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
                      <div style={{ width: '12px', height: '12px', borderRadius: '3px', background: '#3498db' }}></div>
                      <span style={{ color: modeColors.textSecondary }}>Shipped</span>
                      <span style={{ marginLeft: 'auto', fontWeight: '600' }}>{orders.filter(o => o.status === 'Shipped').length}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
                      <div style={{ width: '12px', height: '12px', borderRadius: '3px', background: '#f39c12' }}></div>
                      <span style={{ color: modeColors.textSecondary }}>Processing</span>
                      <span style={{ marginLeft: 'auto', fontWeight: '600' }}>{orders.filter(o => o.status === 'Processing').length}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Profit & Sales Analysis */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginBottom: '28px' }}>
                <div style={{ ...s.statCard, padding: '24px' }}>
                  <h3 style={{ fontSize: '14px', fontWeight: '600', color: modeColors.textSecondary, marginBottom: '12px' }}>Estimated Profit (30%)</h3>
                  <div style={{ fontSize: '32px', fontWeight: '800', color: '#2ecc71' }}>रू {Math.round(analytics.totalRevenue * 0.3).toLocaleString()}</div>
                  <div style={{ fontSize: '12px', color: modeColors.textMuted, marginTop: '8px' }}>Based on 30% margin</div>
                </div>
                <div style={{ ...s.statCard, padding: '24px' }}>
                  <h3 style={{ fontSize: '14px', fontWeight: '600', color: modeColors.textSecondary, marginBottom: '12px' }}>Average Order Value</h3>
                  <div style={{ fontSize: '32px', fontWeight: '800', color: '#3498db' }}>रू {orders.length > 0 ? Math.round(analytics.totalRevenue / orders.length).toLocaleString() : 0}</div>
                  <div style={{ fontSize: '12px', color: modeColors.textMuted, marginTop: '8px' }}>Per order average</div>
                </div>
                <div style={{ ...s.statCard, padding: '24px' }}>
                  <h3 style={{ fontSize: '14px', fontWeight: '600', color: modeColors.textSecondary, marginBottom: '12px' }}>Products Sold</h3>
                  <div style={{ fontSize: '32px', fontWeight: '800', color: theme.primary }}>{products.reduce((sum, p) => sum + p.soldCount, 0)}</div>
                  <div style={{ fontSize: '12px', color: modeColors.textMuted, marginTop: '8px' }}>Total units sold</div>
                </div>
              </div>

              {/* Top Products & Category Sales */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '28px' }}>
                {/* Top Selling Products */}
                <div style={{ ...s.statCard, padding: '24px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '20px' }}>Top Selling Products</h3>
                  <div style={{ display: 'grid', gap: '12px' }}>
                    {[...products].sort((a, b) => b.soldCount - a.soldCount).slice(0, 5).map((p, i) => (
                      <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: modeColors.bgTertiary, borderRadius: '12px' }}>
                        <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: i === 0 ? '#ffd700' : i === 1 ? '#c0c0c0' : i === 2 ? '#cd7f32' : modeColors.bgSecondary, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '12px' }}>{i + 1}</div>
                        <img src={p.images[0]} alt="" style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover' }} />
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: '600', fontSize: '13px' }}>{p.name}</div>
                          <div style={{ fontSize: '11px', color: modeColors.textSecondary }}>{p.brand}</div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontWeight: '700', color: theme.accent }}>{p.soldCount} sold</div>
                          <div style={{ fontSize: '11px', color: modeColors.textSecondary }}>रू {(p.soldCount * p.price.npr).toLocaleString()}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sales by Category */}
                <div style={{ ...s.statCard, padding: '24px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '20px' }}>Sales by Category</h3>
                  <div style={{ display: 'grid', gap: '16px' }}>
                    {categories.map(cat => {
                      const catProducts = products.filter(p => p.category === cat.name);
                      const catSales = catProducts.reduce((sum, p) => sum + p.soldCount, 0);
                      const totalSales = products.reduce((sum, p) => sum + p.soldCount, 0) || 1;
                      const percentage = Math.round((catSales / totalSales) * 100);
                      return (
                        <div key={cat.id}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                            <span style={{ fontSize: '13px' }}>{cat.icon} {cat.name}</span>
                            <span style={{ fontSize: '13px', fontWeight: '600' }}>{catSales} units ({percentage}%)</span>
                          </div>
                          <div style={{ height: '8px', background: modeColors.bgTertiary, borderRadius: '4px', overflow: 'hidden' }}>
                            <div style={{ height: '100%', width: `${percentage}%`, background: theme.gradient, borderRadius: '4px', transition: 'width 0.3s' }}></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Recent Orders */}
              <div style={{ ...s.statCard, padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: '700' }}>Recent Orders</h3>
                  <button style={{ ...s.secondaryBtn, padding: '8px 16px', fontSize: '12px' }} onClick={() => setAdminTab('orders')}>View All →</button>
                </div>
                <table style={{ ...s.table }}>
                  <thead>
                    <tr>
                      <th style={s.th}>Order ID</th>
                      <th style={s.th}>Customer</th>
                      <th style={s.th}>Amount</th>
                      <th style={s.th}>Status</th>
                      <th style={s.th}>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.slice(-5).reverse().map(o => (
                      <tr key={o.id}>
                        <td style={s.td}><span style={{ fontWeight: '600', color: theme.primary }}>{o.id}</span></td>
                        <td style={s.td}>{o.customer.name}</td>
                        <td style={s.td}><span style={{ fontWeight: '700', color: theme.accent }}>रू {o.total.npr.toLocaleString()}</span></td>
                        <td style={s.td}>
                          <span style={{ padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '600', background: o.status === 'Delivered' ? '#2ecc7122' : o.status === 'Shipped' ? '#3498db22' : '#f39c1222', color: o.status === 'Delivered' ? '#2ecc71' : o.status === 'Shipped' ? '#3498db' : '#f39c12' }}>
                            {o.status}
                          </span>
                        </td>
                        <td style={s.td}><span style={{ color: modeColors.textSecondary }}>{o.date}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
          {adminTab === 'products' && (
            <>
              <h2 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '28px' }}>Products</h2>
              <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '20px', padding: '28px', marginBottom: '28px', border: '1px solid rgba(255,255,255,0.08)' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '24px' }}>Add New Product</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                  <div style={s.formGroup}><label style={s.label}>Name *</label><input style={s.input} value={newProduct.name} onChange={e => setNewProduct({ ...newProduct, name: e.target.value })} placeholder="Product name" /></div>
                  <div style={s.formGroup}><label style={s.label}>Brand *</label><select style={s.select} value={newProduct.brand} onChange={e => setNewProduct({ ...newProduct, brand: e.target.value })}><option value="">Select Brand</option>{brands.map(b => <option key={b.id} value={b.name}>{b.name}</option>)}</select></div>
                  <div style={s.formGroup}><label style={s.label}>Category *</label><select style={s.select} value={newProduct.category} onChange={e => setNewProduct({ ...newProduct, category: e.target.value })}><option value="">Select Category</option>{categories.map(c => <option key={c.id} value={c.name}>{c.icon} {c.name}</option>)}</select></div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                  <div style={s.formGroup}>
                    <label style={s.label}>Price (NPR) *</label>
                    <input
                      style={s.input}
                      value={newProduct.price.npr || ''}
                      onChange={e => {
                        const value = e.target.value.replace(/[^0-9]/g, '');
                        setNewProduct({ ...newProduct, price: { npr: parseInt(value) || 0 } });
                      }}
                      placeholder="Enter price (e.g. 5000)"
                    />
                  </div>
                  <div style={s.formGroup}>
                    <label style={s.label}>Original Price (NPR)</label>
                    <input
                      style={s.input}
                      value={newProduct.originalPrice.npr || ''}
                      onChange={e => {
                        const value = e.target.value.replace(/[^0-9]/g, '');
                        setNewProduct({ ...newProduct, originalPrice: { npr: parseInt(value) || 0 } });
                      }}
                      placeholder="MRP before discount"
                    />
                  </div>
                  <div style={s.formGroup}>
                    <label style={s.label}>Stock Quantity</label>
                    <input
                      style={s.input}
                      value={newProduct.stock || ''}
                      onChange={e => {
                        const value = e.target.value.replace(/[^0-9]/g, '');
                        setNewProduct({ ...newProduct, stock: parseInt(value) || 0 });
                      }}
                      placeholder="Available stock"
                    />
                  </div>
                </div>
                <div style={s.formGroup}>
                  <label style={s.label}>Product Image</label>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                    <div style={{ flex: 1, minWidth: '300px' }}>
                      <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', alignItems: 'center' }}>
                        <input style={{ ...s.input, flex: 1 }} value={newProduct.images[0]} onChange={e => setNewProduct({ ...newProduct, images: [e.target.value] })} placeholder="Paste image URL here..." />
                        <span style={{ padding: '8px', color: modeColors.textMuted, fontSize: '13px' }}>OR</span>
                        <div style={{ position: 'relative' }}>
                          <input
                            type="file"
                            accept="image/*"
                            id="product-image-upload"
                            style={{ position: 'absolute', opacity: 0, width: '100%', height: '100%', cursor: 'pointer', top: 0, left: 0 }}
                            onChange={e => {
                              const file = e.target.files[0];
                              if (file) {
                                if (file.size > 5 * 1024 * 1024) {
                                  alert('Image size should be less than 5MB');
                                  return;
                                }
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                  setNewProduct({ ...newProduct, images: [reader.result] });
                                };
                                reader.onerror = () => alert('Error reading file');
                                reader.readAsDataURL(file);
                              }
                            }}
                          />
                          <button type="button" style={{ ...s.primaryBtn, display: 'flex', alignItems: 'center', gap: '8px', pointerEvents: 'none' }}>
                            📁 Upload Image
                          </button>
                        </div>
                      </div>
                      {newProduct.images[0] && (
                        <div style={{ position: 'relative', display: 'inline-block', marginTop: '8px' }}>
                          <img src={newProduct.images[0]} alt="Preview" style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '12px', border: `2px solid ${modeColors.border}` }} onError={(e) => { e.target.src = 'https://via.placeholder.com/150x150?text=Invalid+Image'; }} />
                          <button onClick={() => setNewProduct({ ...newProduct, images: [''] })} style={{ position: 'absolute', top: '-8px', right: '-8px', background: '#e74c3c', border: 'none', borderRadius: '50%', width: '28px', height: '28px', color: '#fff', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold' }}>×</button>
                          <div style={{ fontSize: '11px', color: theme.accent, marginTop: '4px' }}>Image uploaded</div>
                        </div>
                      )}
                      {!newProduct.images[0] && (
                        <div style={{ fontSize: '12px', color: modeColors.textMuted, marginTop: '4px' }}>
                          Supports: JPG, PNG, GIF (max 5MB) or paste any image URL
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div style={s.formGroup}><label style={s.label}>Description</label><textarea style={{ ...s.input, minHeight: '80px' }} value={newProduct.description} onChange={e => setNewProduct({ ...newProduct, description: e.target.value })} placeholder="Product description..." /></div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div style={s.formGroup}>
                    <label style={s.label}>Colors (comma separated)</label>
                    <input style={s.input} value={newProduct.colorsText || newProduct.colors.join(', ')} onChange={e => setNewProduct({ ...newProduct, colorsText: e.target.value, colors: e.target.value.split(',').map(c => c.trim()).filter(c => c) })} placeholder="Black, White, Red" />
                  </div>
                  <div style={s.formGroup}>
                    <label style={s.label}>Sizes (comma separated)</label>
                    <input style={s.input} value={newProduct.sizesText !== undefined ? newProduct.sizesText : newProduct.sizes.join(', ')} onChange={e => {
                      const text = e.target.value;
                      const sizes = text.split(',').map(sz => parseInt(sz.trim())).filter(sz => !isNaN(sz));
                      setNewProduct({ ...newProduct, sizesText: text, sizes });
                    }} placeholder="7, 8, 9, 10" />
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '24px', marginTop: '16px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}><input type="checkbox" checked={newProduct.featured} onChange={e => setNewProduct({ ...newProduct, featured: e.target.checked })} style={{ accentColor: theme.primary }} />Featured</label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}><input type="checkbox" checked={newProduct.trending} onChange={e => setNewProduct({ ...newProduct, trending: e.target.checked })} style={{ accentColor: theme.primary }} />Trending</label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}><input type="checkbox" checked={newProduct.newArrival} onChange={e => setNewProduct({ ...newProduct, newArrival: e.target.checked })} style={{ accentColor: theme.primary }} />New Arrival</label>
                </div>
                <button style={{ ...s.primaryBtn, marginTop: '20px' }} onClick={handleAddProduct}>+ Add Product</button>
              </div>
              <table style={s.table}>
                <thead><tr><th style={s.th}>Product</th><th style={s.th}>Category</th><th style={s.th}>Price</th><th style={s.th}>Stock</th><th style={s.th}>Actions</th></tr></thead>
                <tbody>{products.map(p => (
                  <tr key={p.id}>
                    <td style={s.td}><div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}><img src={p.images[0]} alt="" style={{ width: '55px', height: '55px', objectFit: 'cover', borderRadius: '10px' }} /><div><div style={{ fontWeight: '600' }}>{p.name}</div><div style={{ fontSize: '12px', color: theme.primary }}>{p.brand}</div></div></div></td>
                    <td style={s.td}>{p.category}</td>
                    <td style={s.td}><div style={{ color: theme.accent, fontWeight: '700' }}>रू {p.price.npr.toLocaleString()}</div></td>
                    <td style={s.td}><span style={{ color: p.stock < 15 ? '#e74c3c' : theme.accent, fontWeight: '600' }}>{p.stock}</span></td>
                    <td style={s.td}><button style={{ ...s.secondaryBtn, padding: '8px 14px', marginRight: '8px' }} onClick={() => handleEditProduct(p)}>Edit</button><button onClick={() => { if(confirm('Delete this product?')) setProducts(products.filter(x => x.id !== p.id)); }} style={{ padding: '8px 14px', background: 'rgba(231,76,60,0.2)', border: '1px solid #e74c3c', borderRadius: '10px', color: '#e74c3c', cursor: 'pointer' }}>Delete</button></td>
                  </tr>
                ))}</tbody>
              </table>

              {/* Edit Product Modal */}
              {editingProduct && (
                <div style={s.modal} onClick={() => setEditingProduct(null)}>
                  <div style={{ ...s.modalContent, maxWidth: '700px', padding: '32px', maxHeight: '90vh', overflowY: 'auto' }} onClick={e => e.stopPropagation()}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                      <h2 style={{ fontSize: '24px', fontWeight: '800' }}>Edit Product</h2>
                      <button onClick={() => setEditingProduct(null)} style={{ background: 'none', border: 'none', color: modeColors.text, fontSize: '28px', cursor: 'pointer' }}>×</button>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                      <div style={s.formGroup}><label style={s.label}>Name *</label><input style={s.input} value={editingProduct.name} onChange={e => setEditingProduct({ ...editingProduct, name: e.target.value })} placeholder="Product name" /></div>
                      <div style={s.formGroup}><label style={s.label}>Brand *</label><select style={s.select} value={editingProduct.brand} onChange={e => setEditingProduct({ ...editingProduct, brand: e.target.value })}>{brands.map(b => <option key={b.id} value={b.name}>{b.name}</option>)}</select></div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                      <div style={s.formGroup}><label style={s.label}>Category *</label><select style={s.select} value={editingProduct.category} onChange={e => setEditingProduct({ ...editingProduct, category: e.target.value })}>{categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}</select></div>
                      <div style={s.formGroup}>
                        <label style={s.label}>Price (NPR) *</label>
                        <input style={s.input} value={editingProduct.price.npr || ''} onChange={e => {
                          const value = e.target.value.replace(/[^0-9]/g, '');
                          setEditingProduct({ ...editingProduct, price: { ...editingProduct.price, npr: parseInt(value) || 0 } });
                        }} placeholder="Enter price" />
                      </div>
                      <div style={s.formGroup}>
                        <label style={s.label}>Stock</label>
                        <input style={s.input} value={editingProduct.stock || ''} onChange={e => {
                          const value = e.target.value.replace(/[^0-9]/g, '');
                          setEditingProduct({ ...editingProduct, stock: parseInt(value) || 0 });
                        }} placeholder="Available stock" />
                      </div>
                    </div>
                    <div style={s.formGroup}>
                      <label style={s.label}>Original Price (NPR)</label>
                      <input style={s.input} value={editingProduct.originalPrice.npr || ''} onChange={e => {
                        const value = e.target.value.replace(/[^0-9]/g, '');
                        setEditingProduct({ ...editingProduct, originalPrice: { ...editingProduct.originalPrice, npr: parseInt(value) || 0 } });
                      }} placeholder="MRP before discount" />
                    </div>
                    <div style={s.formGroup}><label style={s.label}>Image URL</label><input style={s.input} value={editingProduct.images[0]} onChange={e => setEditingProduct({ ...editingProduct, images: [e.target.value] })} placeholder="Paste image URL" /></div>
                    <div style={s.formGroup}><label style={s.label}>Description</label><textarea style={{ ...s.input, minHeight: '80px' }} value={editingProduct.description} onChange={e => setEditingProduct({ ...editingProduct, description: e.target.value })} placeholder="Product description" /></div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                      <div style={s.formGroup}>
                        <label style={s.label}>Colors (comma separated)</label>
                        <input style={s.input} value={editingProduct.colorsText !== undefined ? editingProduct.colorsText : editingProduct.colors.join(', ')} onChange={e => setEditingProduct({ ...editingProduct, colorsText: e.target.value, colors: e.target.value.split(',').map(c => c.trim()).filter(c => c) })} placeholder="Black, White, Red" />
                      </div>
                      <div style={s.formGroup}>
                        <label style={s.label}>Sizes (comma separated)</label>
                        <input style={s.input} value={editingProduct.sizesText !== undefined ? editingProduct.sizesText : editingProduct.sizes.join(', ')} onChange={e => {
                          const text = e.target.value;
                          const sizes = text.split(',').map(sz => parseInt(sz.trim())).filter(sz => !isNaN(sz));
                          setEditingProduct({ ...editingProduct, sizesText: text, sizes });
                        }} placeholder="7, 8, 9, 10" />
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '16px', marginTop: '8px' }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}><input type="checkbox" checked={editingProduct.featured} onChange={e => setEditingProduct({ ...editingProduct, featured: e.target.checked })} style={{ accentColor: theme.primary }} />Featured</label>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}><input type="checkbox" checked={editingProduct.trending} onChange={e => setEditingProduct({ ...editingProduct, trending: e.target.checked })} style={{ accentColor: theme.primary }} />Trending</label>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}><input type="checkbox" checked={editingProduct.newArrival} onChange={e => setEditingProduct({ ...editingProduct, newArrival: e.target.checked })} style={{ accentColor: theme.primary }} />New Arrival</label>
                    </div>
                    <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                      <button style={{ ...s.primaryBtn, flex: 1 }} onClick={handleSaveEdit}>Save Changes</button>
                      <button style={s.secondaryBtn} onClick={() => setEditingProduct(null)}>Cancel</button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
          {adminTab === 'categories' && (
            <>
              <h2 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '28px' }}>Categories & Brands</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '20px', padding: '28px', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '20px' }}>Categories</h3>
                  <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
                    <input style={{ ...s.input, flex: 1 }} value={newCategory.name} onChange={e => setNewCategory({ ...newCategory, name: e.target.value })} placeholder="Category name" />
                    <input style={{ ...s.input, width: '60px' }} value={newCategory.icon} onChange={e => setNewCategory({ ...newCategory, icon: e.target.value })} placeholder="Icon" />
                    <button style={s.primaryBtn} onClick={() => { if (newCategory.name) { setCategories([...categories, { ...newCategory, id: Date.now() }]); setNewCategory({ name: '', icon: '📦' }); } }}>Add</button>
                  </div>
                  {categories.map(c => (
                    <div key={c.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', marginBottom: '10px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><span style={{ fontSize: '24px' }}>{c.icon}</span><span style={{ fontWeight: '600' }}>{c.name}</span></div>
                      <button onClick={() => setCategories(categories.filter(x => x.id !== c.id))} style={{ background: 'none', border: 'none', color: '#e74c3c', cursor: 'pointer', fontSize: '18px' }}>×</button>
                    </div>
                  ))}
                </div>
                <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '20px', padding: '28px', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '20px' }}>Brands</h3>
                  <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
                    <input style={{ ...s.input, flex: 1 }} value={newBrand.name} onChange={e => setNewBrand({ ...newBrand, name: e.target.value })} placeholder="Brand name" />
                    <button style={s.primaryBtn} onClick={() => { if (newBrand.name) { setBrands([...brands, { ...newBrand, id: Date.now() }]); setNewBrand({ name: '' }); } }}>Add</button>
                  </div>
                  {brands.map(b => (
                    <div key={b.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', marginBottom: '10px' }}>
                      <span style={{ fontWeight: '600' }}>{b.name}</span>
                      <button onClick={() => setBrands(brands.filter(x => x.id !== b.id))} style={{ background: 'none', border: 'none', color: '#e74c3c', cursor: 'pointer', fontSize: '18px' }}>×</button>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
          {adminTab === 'orders' && (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
                <h2 style={{ fontSize: '28px', fontWeight: '800' }}>Orders ({orders.length})</h2>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button style={s.secondaryBtn} onClick={() => {
                    const csvContent = "Order ID,Customer,Phone,City,Country,Items,Total (NPR),Status,Date,Payment\n" +
                      orders.map(o => `${o.id},"${o.customer.name}",${o.customer.phone},${o.address.city},${o.address.country},"${o.items.map(i => `${i.name} x${i.quantity}`).join('; ')}",${o.total.npr},${o.status},${o.date},${o.paymentMethod}`).join("\n");
                    const blob = new Blob([csvContent], { type: 'text/csv' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `orders_${new Date().toISOString().split('T')[0]}.csv`;
                    a.click();
                  }}>📥 Export CSV</button>
                  <select style={{ ...s.select, width: 'auto', padding: '10px 16px' }} onChange={e => {
                    if (e.target.value === 'all') return;
                    setOrders(orders.map(o => ({ ...o, status: e.target.value })));
                  }}>
                    <option value="all">Bulk Update Status</option>
                    <option value="Processing">All → Processing</option>
                    <option value="Shipped">All → Shipped</option>
                    <option value="Delivered">All → Delivered</option>
                  </select>
                </div>
              </div>
              <table style={s.table}>
                <thead><tr><th style={s.th}>Order ID</th><th style={s.th}>Customer</th><th style={s.th}>Items</th><th style={s.th}>Total</th><th style={s.th}>Status</th><th style={s.th}>Date</th></tr></thead>
                <tbody>{orders.map(o => (
                  <tr key={o.id}>
                    <td style={s.td}><span style={{ fontWeight: '700', color: theme.primary }}>{o.id}</span></td>
                    <td style={s.td}><div style={{ fontWeight: '600' }}>{o.customer.name}</div><div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>{o.customer.phone}</div></td>
                    <td style={s.td}>{o.items.map((i, idx) => <div key={idx} style={{ fontSize: '12px' }}>{i.name} x{i.quantity}</div>)}</td>
                    <td style={s.td}><span style={{ color: theme.accent, fontWeight: '700' }}>रू {o.total.npr.toLocaleString()}</span></td>
                    <td style={s.td}><select style={{ ...s.select, padding: '8px', fontSize: '12px', background: o.status === 'Delivered' ? 'rgba(46,204,113,0.2)' : o.status === 'Shipped' ? 'rgba(52,152,219,0.2)' : 'rgba(241,196,15,0.2)' }} value={o.status} onChange={e => setOrders(orders.map(x => x.id === o.id ? { ...x, status: e.target.value } : x))}><option value="Processing">Processing</option><option value="Shipped">Shipped</option><option value="Delivered">Delivered</option></select></td>
                    <td style={s.td}>{o.date}</td>
                  </tr>
                ))}</tbody>
              </table>
            </>
          )}
          {adminTab === 'customers' && (
            <>
              <h2 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '28px' }}>Customers</h2>
              <table style={s.table}>
                <thead><tr><th style={s.th}>Customer</th><th style={s.th}>Contact</th><th style={s.th}>Country</th><th style={s.th}>Orders</th><th style={s.th}>Total Spent</th></tr></thead>
                <tbody>{customers.map(c => (
                  <tr key={c.id}>
                    <td style={s.td}><div style={{ fontWeight: '600' }}>{c.name}</div><div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>Since {c.joinDate}</div></td>
                    <td style={s.td}><div>{c.email}</div><div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>{c.phone}</div></td>
                    <td style={s.td}>{c.country === 'Nepal' ? '🇳🇵' : '🇮🇳'} {c.country}</td>
                    <td style={s.td}><span style={{ fontWeight: '700', color: '#3498db' }}>{c.totalOrders}</span></td>
                    <td style={s.td}><span style={{ color: theme.accent, fontWeight: '700' }}>रू {c.totalSpent.npr.toLocaleString()}</span></td>
                  </tr>
                ))}</tbody>
              </table>
            </>
          )}
          {adminTab === 'coupons' && (
            <>
              <h2 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '28px' }}>Coupon Management</h2>
              <div style={{ background: modeColors.bgSecondary, borderRadius: '20px', padding: '28px', marginBottom: '28px', border: `1px solid ${modeColors.border}` }}>
                <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '20px' }}>Active Coupons</h3>
                <table style={s.table}>
                  <thead><tr><th style={s.th}>Code</th><th style={s.th}>Discount</th><th style={s.th}>Min Order</th><th style={s.th}>Usage</th><th style={s.th}>Status</th><th style={s.th}>Actions</th></tr></thead>
                  <tbody>
                    {coupons.map((c, idx) => (
                      <tr key={c.code}>
                        <td style={s.td}><span style={{ fontWeight: '700', color: theme.primary }}>{c.code}</span></td>
                        <td style={s.td}>{c.type === 'percent' ? `${c.discount}% (Max रू${c.maxDiscount})` : `रू${c.discount}`}</td>
                        <td style={s.td}>रू {c.minOrder.toLocaleString()}</td>
                        <td style={s.td}><span style={{ fontWeight: '600' }}>{c.usedCount}</span> / {c.usageLimit}</td>
                        <td style={s.td}><span style={{ padding: '4px 12px', borderRadius: '20px', fontSize: '12px', background: c.active ? '#2ecc7133' : '#e74c3c33', color: c.active ? '#2ecc71' : '#e74c3c' }}>{c.active ? 'Active' : 'Inactive'}</span></td>
                        <td style={s.td}>
                          <button onClick={() => setCoupons(coupons.map((x, i) => i === idx ? { ...x, active: !x.active } : x))} style={{ ...s.secondaryBtn, padding: '6px 12px', marginRight: '8px' }}>{c.active ? 'Deactivate' : 'Activate'}</button>
                          <button onClick={() => setCoupons(coupons.filter((_, i) => i !== idx))} style={{ padding: '6px 12px', background: 'rgba(231,76,60,0.2)', border: '1px solid #e74c3c', borderRadius: '8px', color: '#e74c3c', cursor: 'pointer' }}>Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div style={{ background: modeColors.bgSecondary, borderRadius: '20px', padding: '28px', border: `1px solid ${modeColors.border}` }}>
                <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '20px' }}>Create New Coupon</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                  <div style={s.formGroup}><label style={s.label}>Coupon Code</label><input style={s.input} placeholder="e.g. SUMMER25" id="new-coupon-code" /></div>
                  <div style={s.formGroup}><label style={s.label}>Discount Type</label><select style={s.select} id="new-coupon-type"><option value="percent">Percentage</option><option value="flat">Flat Amount</option></select></div>
                  <div style={s.formGroup}><label style={s.label}>Discount Value</label><input type="number" style={s.input} placeholder="10" id="new-coupon-discount" /></div>
                  <div style={s.formGroup}><label style={s.label}>Min Order (NPR)</label><input type="number" style={s.input} placeholder="2000" id="new-coupon-min" /></div>
                  <div style={s.formGroup}><label style={s.label}>Max Discount (NPR)</label><input type="number" style={s.input} placeholder="1000" id="new-coupon-max" /></div>
                  <div style={s.formGroup}><label style={s.label}>Usage Limit</label><input type="number" style={s.input} placeholder="100" id="new-coupon-limit" /></div>
                </div>
                <button style={{ ...s.primaryBtn, marginTop: '16px' }} onClick={() => {
                  const code = document.getElementById('new-coupon-code').value.toUpperCase();
                  const type = document.getElementById('new-coupon-type').value;
                  const discount = parseInt(document.getElementById('new-coupon-discount').value) || 0;
                  const minOrder = parseInt(document.getElementById('new-coupon-min').value) || 0;
                  const maxDiscount = parseInt(document.getElementById('new-coupon-max').value) || 1000;
                  const usageLimit = parseInt(document.getElementById('new-coupon-limit').value) || 100;
                  if (!code || !discount) { alert('Please fill in required fields'); return; }
                  setCoupons([...coupons, { code, type, discount, minOrder, maxDiscount, usageLimit, usedCount: 0, active: true }]);
                  document.getElementById('new-coupon-code').value = '';
                  document.getElementById('new-coupon-discount').value = '';
                  alert('Coupon created successfully!');
                }}>+ Create Coupon</button>
              </div>
            </>
          )}
          {adminTab === 'payments' && (
            <>
              <h2 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '28px' }}>Payment Accounts</h2>
              <p style={{ color: modeColors.textSecondary, marginBottom: '24px' }}>Configure your payment accounts. These details will be shown to customers during checkout.</p>

              {/* Nepal Payment Methods */}
              <div style={{ background: modeColors.bgSecondary, borderRadius: '20px', padding: '28px', marginBottom: '24px', border: `1px solid ${modeColors.border}` }}>
                <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '20px' }}>🇳🇵 Nepal Payment Methods</h3>

                {/* eSewa */}
                <div style={{ background: modeColors.bgTertiary, borderRadius: '12px', padding: '20px', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><span style={{ fontSize: '24px' }}>💚</span><span style={{ fontWeight: '700' }}>eSewa</span></div>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}><input type="checkbox" checked={paymentAccounts.esewa.enabled} onChange={e => setPaymentAccounts({...paymentAccounts, esewa: {...paymentAccounts.esewa, enabled: e.target.checked}})} style={{ accentColor: theme.primary }} />Enabled</label>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div style={s.formGroup}><label style={s.label}>eSewa ID / Phone</label><input style={s.input} value={paymentAccounts.esewa.id} onChange={e => setPaymentAccounts({...paymentAccounts, esewa: {...paymentAccounts.esewa, id: e.target.value}})} placeholder="9800000000" /></div>
                    <div style={s.formGroup}><label style={s.label}>Account Name</label><input style={s.input} value={paymentAccounts.esewa.name} onChange={e => setPaymentAccounts({...paymentAccounts, esewa: {...paymentAccounts.esewa, name: e.target.value}})} placeholder="Your Name" /></div>
                  </div>
                </div>

                {/* Khalti */}
                <div style={{ background: modeColors.bgTertiary, borderRadius: '12px', padding: '20px', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><span style={{ fontSize: '24px' }}>💜</span><span style={{ fontWeight: '700' }}>Khalti</span></div>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}><input type="checkbox" checked={paymentAccounts.khalti.enabled} onChange={e => setPaymentAccounts({...paymentAccounts, khalti: {...paymentAccounts.khalti, enabled: e.target.checked}})} style={{ accentColor: theme.primary }} />Enabled</label>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div style={s.formGroup}><label style={s.label}>Khalti ID / Phone</label><input style={s.input} value={paymentAccounts.khalti.id} onChange={e => setPaymentAccounts({...paymentAccounts, khalti: {...paymentAccounts.khalti, id: e.target.value}})} placeholder="9800000000" /></div>
                    <div style={s.formGroup}><label style={s.label}>Account Name</label><input style={s.input} value={paymentAccounts.khalti.name} onChange={e => setPaymentAccounts({...paymentAccounts, khalti: {...paymentAccounts.khalti, name: e.target.value}})} placeholder="Your Name" /></div>
                  </div>
                </div>

                {/* FonePay */}
                <div style={{ background: modeColors.bgTertiary, borderRadius: '12px', padding: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><span style={{ fontSize: '24px' }}>🔵</span><span style={{ fontWeight: '700' }}>FonePay</span></div>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}><input type="checkbox" checked={paymentAccounts.fonepay.enabled} onChange={e => setPaymentAccounts({...paymentAccounts, fonepay: {...paymentAccounts.fonepay, enabled: e.target.checked}})} style={{ accentColor: theme.primary }} />Enabled</label>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div style={s.formGroup}><label style={s.label}>FonePay ID / Phone</label><input style={s.input} value={paymentAccounts.fonepay.id} onChange={e => setPaymentAccounts({...paymentAccounts, fonepay: {...paymentAccounts.fonepay, id: e.target.value}})} placeholder="9800000000" /></div>
                    <div style={s.formGroup}><label style={s.label}>Account Name</label><input style={s.input} value={paymentAccounts.fonepay.name} onChange={e => setPaymentAccounts({...paymentAccounts, fonepay: {...paymentAccounts.fonepay, name: e.target.value}})} placeholder="Your Name" /></div>
                  </div>
                </div>
              </div>

              {/* India Payment Methods */}
              <div style={{ background: modeColors.bgSecondary, borderRadius: '20px', padding: '28px', marginBottom: '24px', border: `1px solid ${modeColors.border}` }}>
                <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '20px' }}>🇮🇳 India Payment Methods</h3>

                {/* PhonePe */}
                <div style={{ background: modeColors.bgTertiary, borderRadius: '12px', padding: '20px', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><span style={{ fontSize: '24px' }}>💜</span><span style={{ fontWeight: '700' }}>PhonePe</span></div>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}><input type="checkbox" checked={paymentAccounts.phonepe.enabled} onChange={e => setPaymentAccounts({...paymentAccounts, phonepe: {...paymentAccounts.phonepe, enabled: e.target.checked}})} style={{ accentColor: theme.primary }} />Enabled</label>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div style={s.formGroup}><label style={s.label}>UPI ID</label><input style={s.input} value={paymentAccounts.phonepe.id} onChange={e => setPaymentAccounts({...paymentAccounts, phonepe: {...paymentAccounts.phonepe, id: e.target.value}})} placeholder="yourname@ybl" /></div>
                    <div style={s.formGroup}><label style={s.label}>Account Name</label><input style={s.input} value={paymentAccounts.phonepe.name} onChange={e => setPaymentAccounts({...paymentAccounts, phonepe: {...paymentAccounts.phonepe, name: e.target.value}})} placeholder="Your Name" /></div>
                  </div>
                </div>

                {/* Paytm */}
                <div style={{ background: modeColors.bgTertiary, borderRadius: '12px', padding: '20px', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><span style={{ fontSize: '24px' }}>🔷</span><span style={{ fontWeight: '700' }}>Paytm</span></div>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}><input type="checkbox" checked={paymentAccounts.paytm.enabled} onChange={e => setPaymentAccounts({...paymentAccounts, paytm: {...paymentAccounts.paytm, enabled: e.target.checked}})} style={{ accentColor: theme.primary }} />Enabled</label>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div style={s.formGroup}><label style={s.label}>Paytm Number</label><input style={s.input} value={paymentAccounts.paytm.id} onChange={e => setPaymentAccounts({...paymentAccounts, paytm: {...paymentAccounts.paytm, id: e.target.value}})} placeholder="9800000000" /></div>
                    <div style={s.formGroup}><label style={s.label}>Account Name</label><input style={s.input} value={paymentAccounts.paytm.name} onChange={e => setPaymentAccounts({...paymentAccounts, paytm: {...paymentAccounts.paytm, name: e.target.value}})} placeholder="Your Name" /></div>
                  </div>
                </div>

                {/* Razorpay/UPI */}
                <div style={{ background: modeColors.bgTertiary, borderRadius: '12px', padding: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><span style={{ fontSize: '24px' }}>💙</span><span style={{ fontWeight: '700' }}>UPI / Razorpay</span></div>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}><input type="checkbox" checked={paymentAccounts.razorpay.enabled} onChange={e => setPaymentAccounts({...paymentAccounts, razorpay: {...paymentAccounts.razorpay, enabled: e.target.checked}})} style={{ accentColor: theme.primary }} />Enabled</label>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div style={s.formGroup}><label style={s.label}>UPI ID</label><input style={s.input} value={paymentAccounts.razorpay.id} onChange={e => setPaymentAccounts({...paymentAccounts, razorpay: {...paymentAccounts.razorpay, id: e.target.value}})} placeholder="yourname@upi" /></div>
                    <div style={s.formGroup}><label style={s.label}>Account Name</label><input style={s.input} value={paymentAccounts.razorpay.name} onChange={e => setPaymentAccounts({...paymentAccounts, razorpay: {...paymentAccounts.razorpay, name: e.target.value}})} placeholder="Your Name" /></div>
                  </div>
                </div>
              </div>

              {/* Bank Transfer */}
              <div style={{ background: modeColors.bgSecondary, borderRadius: '20px', padding: '28px', marginBottom: '24px', border: `1px solid ${modeColors.border}` }}>
                <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '20px' }}>🏦 Bank Transfer</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div style={s.formGroup}><label style={s.label}>Bank Name</label><input style={s.input} value={paymentAccounts.bankTransfer.bankName} onChange={e => setPaymentAccounts({...paymentAccounts, bankTransfer: {...paymentAccounts.bankTransfer, bankName: e.target.value}})} placeholder="Nepal Bank" /></div>
                  <div style={s.formGroup}><label style={s.label}>Account Name</label><input style={s.input} value={paymentAccounts.bankTransfer.accountName} onChange={e => setPaymentAccounts({...paymentAccounts, bankTransfer: {...paymentAccounts.bankTransfer, accountName: e.target.value}})} placeholder="Company Name" /></div>
                  <div style={s.formGroup}><label style={s.label}>Account Number</label><input style={s.input} value={paymentAccounts.bankTransfer.accountNumber} onChange={e => setPaymentAccounts({...paymentAccounts, bankTransfer: {...paymentAccounts.bankTransfer, accountNumber: e.target.value}})} placeholder="1234567890" /></div>
                  <div style={s.formGroup}><label style={s.label}>IFSC Code (India only)</label><input style={s.input} value={paymentAccounts.bankTransfer.ifsc} onChange={e => setPaymentAccounts({...paymentAccounts, bankTransfer: {...paymentAccounts.bankTransfer, ifsc: e.target.value}})} placeholder="SBIN0001234" /></div>
                </div>
              </div>

              <button style={s.primaryBtn} onClick={() => alert('Payment accounts saved!')}>Save Payment Settings</button>
            </>
          )}
          {adminTab === 'settings' && (
            <>
              <h2 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '28px' }}>Store Settings</h2>
              <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '20px', padding: '28px', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <div style={s.formGroup}><label style={s.label}>Store Name</label><input style={s.input} value={editingStore.name} onChange={e => setEditingStore({ ...editingStore, name: e.target.value })} /></div>
                  <div style={s.formGroup}><label style={s.label}>Logo (Emoji)</label><input style={s.input} value={editingStore.logo} onChange={e => setEditingStore({ ...editingStore, logo: e.target.value })} /></div>
                </div>
                <div style={s.formGroup}><label style={s.label}>Tagline</label><input style={s.input} value={editingStore.tagline} onChange={e => setEditingStore({ ...editingStore, tagline: e.target.value })} /></div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
                  <div style={s.formGroup}><label style={s.label}>Email</label><input style={s.input} value={editingStore.email} onChange={e => setEditingStore({ ...editingStore, email: e.target.value })} /></div>
                  <div style={s.formGroup}><label style={s.label}>Phone</label><input style={s.input} value={editingStore.phone} onChange={e => setEditingStore({ ...editingStore, phone: e.target.value })} /></div>
                  <div style={s.formGroup}><label style={s.label}>Address</label><input style={s.input} value={editingStore.address} onChange={e => setEditingStore({ ...editingStore, address: e.target.value })} /></div>
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '20px', marginTop: '24px' }}>Theme Colors</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
                  <div style={s.formGroup}><label style={s.label}>Primary Color</label><div style={{ display: 'flex', gap: '12px' }}><input type="color" value={editingStore.primaryColor} onChange={e => setEditingStore({ ...editingStore, primaryColor: e.target.value })} style={{ width: '50px', height: '40px', border: 'none', borderRadius: '8px', cursor: 'pointer' }} /><input style={{ ...s.input, flex: 1 }} value={editingStore.primaryColor} onChange={e => setEditingStore({ ...editingStore, primaryColor: e.target.value })} /></div></div>
                  <div style={s.formGroup}><label style={s.label}>Secondary Color</label><div style={{ display: 'flex', gap: '12px' }}><input type="color" value={editingStore.secondaryColor} onChange={e => setEditingStore({ ...editingStore, secondaryColor: e.target.value })} style={{ width: '50px', height: '40px', border: 'none', borderRadius: '8px', cursor: 'pointer' }} /><input style={{ ...s.input, flex: 1 }} value={editingStore.secondaryColor} onChange={e => setEditingStore({ ...editingStore, secondaryColor: e.target.value })} /></div></div>
                  <div style={s.formGroup}><label style={s.label}>Accent Color</label><div style={{ display: 'flex', gap: '12px' }}><input type="color" value={editingStore.accentColor} onChange={e => setEditingStore({ ...editingStore, accentColor: e.target.value })} style={{ width: '50px', height: '40px', border: 'none', borderRadius: '8px', cursor: 'pointer' }} /><input style={{ ...s.input, flex: 1 }} value={editingStore.accentColor} onChange={e => setEditingStore({ ...editingStore, accentColor: e.target.value })} /></div></div>
                </div>
                <div style={{ background: `linear-gradient(135deg, ${editingStore.primaryColor} 0%, ${editingStore.secondaryColor} 100%)`, borderRadius: '16px', padding: '24px', marginTop: '20px' }}>
                  <div style={{ fontSize: '18px', fontWeight: '700' }}>Preview</div>
                  <button style={{ marginTop: '12px', padding: '10px 24px', background: editingStore.accentColor, border: 'none', borderRadius: '8px', color: '#fff', fontWeight: '600' }}>Sample Button</button>
                </div>
                <div style={s.formGroup}><label style={s.label}>Free Shipping Above (NPR)</label><input type="number" style={{ ...s.input, maxWidth: '200px' }} value={editingStore.freeShippingAbove} onChange={e => setEditingStore({ ...editingStore, freeShippingAbove: parseInt(e.target.value) || 0 })} /></div>
                <button style={{ ...s.primaryBtn, marginTop: '20px' }} onClick={() => { setStoreConfig(editingStore); alert('Settings saved!'); }}>Save Settings</button>
              </div>

              {/* Password Change Section */}
              <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '20px', padding: '28px', border: '1px solid rgba(255,255,255,0.08)', marginTop: '24px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '24px' }}>🔐</span> Change Admin Password
                </h3>
                <PasswordChangeForm />
              </div>
            </>
          )}
        </main>
      </div>
    );
  };

  // Customer View
  const CustomerView = () => (
    <>
      <div style={{ background: `linear-gradient(135deg, ${theme.primary}33 0%, ${theme.secondary}33 100%)`, borderRadius: isMobile ? '20px' : '32px', padding: isMobile ? '40px 24px' : '60px 48px', margin: isMobile ? '16px' : '32px', textAlign: 'center' }}>
        <h1 style={{ fontSize: isMobile ? '32px' : '52px', fontWeight: '900', marginBottom: '16px', background: theme.gradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{storeConfig.tagline}</h1>
        <p style={{ fontSize: isMobile ? '14px' : '18px', color: modeColors.textSecondary, maxWidth: '500px', margin: '0 auto 24px' }}>Premium footwear for every occasion. Free shipping on orders above {currency === 'NPR' ? `रू ${storeConfig.freeShippingAbove}` : `₹ ${Math.round(storeConfig.freeShippingAbove / exchangeRate)}`}!</p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button style={s.primaryBtn} onClick={() => window.scrollTo({ top: 600, behavior: 'smooth' })}>Shop Now</button>
          <button style={s.secondaryBtn} onClick={() => setFilters({ ...filters, trending: true })}>View Collection</button>
        </div>
      </div>
      <div style={{ display: 'flex', gap: '12px', margin: isMobile ? '0 16px 16px' : '0 32px 32px', flexWrap: 'wrap' }}>
        {[{ key: 'trending', label: 'Trending' }, { key: 'newArrivals', label: 'New Arrivals' }, { key: 'onSale', label: 'On Sale' }].map(({ key, label }) => (
          <button key={key} onClick={() => setFilters({ ...filters, [key]: !filters[key] })} style={{ ...s.secondaryBtn, background: filters[key] ? theme.gradient : modeColors.bgTertiary, borderColor: filters[key] ? 'transparent' : modeColors.borderLight }}>{label}</button>
        ))}
      </div>
      <div style={s.main}>
        <aside style={s.sidebar}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '700' }}>Filters</h3>
            <button onClick={() => setFilters({ category: 'All', brand: 'All', priceRange: [0, 25000], colors: [], sizes: [], rating: 0, sortBy: 'featured', search: '', inStock: false, onSale: false, newArrivals: false, trending: false })} style={{ background: 'none', border: 'none', color: theme.primary, cursor: 'pointer', fontSize: '13px' }}>Clear All</button>
          </div>
          <div style={s.filterSection}>
            <h4 style={s.filterTitle}>Category</h4>
            <div style={{ ...s.filterOption, background: filters.category === 'All' ? `${theme.primary}22` : 'transparent' }} onClick={() => setFilters({ ...filters, category: 'All' })}>All</div>
            {categories.map(c => <div key={c.id} style={{ ...s.filterOption, background: filters.category === c.name ? `${theme.primary}22` : 'transparent' }} onClick={() => setFilters({ ...filters, category: c.name })}>{c.icon} {c.name}</div>)}
          </div>
          <div style={s.filterSection}>
            <h4 style={s.filterTitle}>Brand</h4>
            <select style={{ ...s.select, background: modeColors.bgTertiary }} value={filters.brand} onChange={e => setFilters({ ...filters, brand: e.target.value })}>
              <option value="All">All Brands</option>
              {brands.map(b => <option key={b.id} value={b.name}>{b.name}</option>)}
            </select>
          </div>
          <div style={s.filterSection}>
            <h4 style={s.filterTitle}>Price Range</h4>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span>{currency === 'NPR' ? `रू ${filters.priceRange[0]}` : `₹ ${Math.round(filters.priceRange[0] / exchangeRate)}`}</span>
              <span>{currency === 'NPR' ? `रू ${filters.priceRange[1]}` : `₹ ${Math.round(filters.priceRange[1] / exchangeRate)}`}</span>
            </div>
            <input type="range" min="0" max="25000" step="500" value={filters.priceRange[1]} onChange={e => setFilters({ ...filters, priceRange: [filters.priceRange[0], parseInt(e.target.value)] })} style={{ width: '100%', accentColor: theme.primary }} />
          </div>
          <div style={s.filterSection}>
            <h4 style={s.filterTitle}>Colors</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {availableColors.map(c => <div key={c.name} onClick={() => setFilters({ ...filters, colors: filters.colors.includes(c.name) ? filters.colors.filter(x => x !== c.name) : [...filters.colors, c.name] })} style={{ ...s.colorSwatch, background: c.hex, borderColor: filters.colors.includes(c.name) ? theme.primary : 'rgba(255,255,255,0.2)', transform: filters.colors.includes(c.name) ? 'scale(1.15)' : 'scale(1)' }} title={c.name} />)}
            </div>
          </div>
          <div style={s.filterSection}>
            <h4 style={s.filterTitle}>Sizes</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {availableSizes.map(size => <button key={size} onClick={() => setFilters({ ...filters, sizes: filters.sizes.includes(size) ? filters.sizes.filter(x => x !== size) : [...filters.sizes, size] })} style={{ ...s.sizeBtn, background: filters.sizes.includes(size) ? theme.gradient : modeColors.bgTertiary, borderColor: filters.sizes.includes(size) ? 'transparent' : modeColors.borderLight, padding: '8px 14px' }}>{size}</button>)}
            </div>
          </div>
          <div style={s.filterSection}>
            <h4 style={s.filterTitle}>Rating</h4>
            {[4, 3, 2, 1].map(r => <div key={r} style={{ ...s.filterOption, background: filters.rating === r ? `${theme.primary}22` : 'transparent' }} onClick={() => setFilters({ ...filters, rating: filters.rating === r ? 0 : r })}>{renderStars(r)} & Up</div>)}
          </div>
        </aside>
        <section>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', padding: '16px 20px', background: modeColors.bgSecondary, borderRadius: '16px' }}>
            <span style={{ color: modeColors.textSecondary }}>Showing <strong style={{ color: modeColors.text }}>{filteredProducts.length}</strong> products</span>
            <select style={{ ...s.select, padding: '10px 16px' }} value={filters.sortBy} onChange={e => setFilters({ ...filters, sortBy: e.target.value })}>
              <option value="featured">Featured</option>
              <option value="popular">Most Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
          <div style={s.productGrid}>
            {filteredProducts.map(p => {
              const discount = Math.round(((p.originalPrice.npr - p.price.npr) / p.originalPrice.npr) * 100);
              return (
                <div key={p.id} style={s.productCard} onClick={() => { setSelectedProduct(p); addToRecentlyViewed(p); }} onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-10px)'; e.currentTarget.style.boxShadow = `0 25px 50px ${theme.primary}33`; }} onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
                  <div style={{ position: 'relative', height: '260px' }}>
                    <img src={p.images[0]} alt="" style={s.productImage} />
                    <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {p.newArrival && <span style={{ padding: '6px 12px', borderRadius: '8px', fontSize: '11px', fontWeight: '700', background: theme.accent }}>New</span>}
                      {p.trending && <span style={{ padding: '6px 12px', borderRadius: '8px', fontSize: '11px', fontWeight: '700', background: '#e74c3c' }}>Hot</span>}
                      {discount > 0 && <span style={{ padding: '6px 12px', borderRadius: '8px', fontSize: '11px', fontWeight: '700', background: '#9b59b6' }}>-{discount}%</span>}
                    </div>
                    <div style={{ position: 'absolute', top: '12px', right: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <button onClick={e => { e.stopPropagation(); setWishlist(wishlist.includes(p.id) ? wishlist.filter(x => x !== p.id) : [...wishlist, p.id]); }} style={{ background: 'rgba(0,0,0,0.5)', border: 'none', borderRadius: '50%', width: '40px', height: '40px', cursor: 'pointer', fontSize: '18px', color: wishlist.includes(p.id) ? '#e74c3c' : '#fff' }}>{wishlist.includes(p.id) ? '❤️' : '🤍'}</button>
                      <button onClick={e => { e.stopPropagation(); toggleCompare(p); }} style={{ background: compareList.find(x => x.id === p.id) ? theme.primary : 'rgba(0,0,0,0.5)', border: 'none', borderRadius: '50%', width: '40px', height: '40px', cursor: 'pointer', fontSize: '16px', color: '#fff' }} title="Compare">⚖️</button>
                    </div>
                  </div>
                  <div style={s.productInfo}>
                    <div style={s.productBrand}>{p.brand}</div>
                    <div style={s.productName}>{p.name}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>{renderStars(Math.round(p.rating))}<span style={{ fontSize: '13px', color: modeColors.textSecondary }}>({p.reviews.length})</span></div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={s.currentPrice}>{currency === 'NPR' ? `रू ${p.price.npr.toLocaleString()}` : `₹ ${p.price.inr.toLocaleString()}`}</span>
                      {discount > 0 && <span style={s.originalPrice}>{currency === 'NPR' ? `रू ${p.originalPrice.npr.toLocaleString()}` : `₹ ${p.originalPrice.inr.toLocaleString()}`}</span>}
                    </div>
                    <div style={{ display: 'flex', gap: '6px', marginTop: '12px' }}>
                      {p.colors.slice(0, 4).map(color => { const c = availableColors.find(x => x.name === color); return <div key={color} style={{ ...s.colorDot, background: c?.hex || '#888' }} title={color} />; })}
                      {p.colors.length > 4 && <span style={{ fontSize: '12px', color: modeColors.textSecondary }}>+{p.colors.length - 4}</span>}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {filteredProducts.length === 0 && <div style={{ textAlign: 'center', padding: '60px' }}><div style={{ fontSize: '60px', marginBottom: '20px' }}>No products found</div><h3 style={{ fontSize: '24px', marginBottom: '12px' }}>Try adjusting your filters.</h3></div>}
        </section>
      </div>

      {/* Recently Viewed Section */}
      {recentlyViewed.length > 0 && (
        <div style={{ padding: isMobile ? '16px' : '32px', maxWidth: '1600px', margin: '0 auto' }}>
          <h2 style={{ fontSize: isMobile ? '20px' : '24px', fontWeight: '800', marginBottom: isMobile ? '16px' : '24px' }}>Recently Viewed</h2>
          <div style={{ display: 'flex', gap: isMobile ? '12px' : '20px', overflowX: 'auto', paddingBottom: '16px' }}>
            {recentlyViewed.map(p => (
              <div key={p.id} style={{ ...s.productCard, minWidth: '220px', cursor: 'pointer' }} onClick={() => setSelectedProduct(p)}>
                <img src={p.images[0]} alt="" style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: '12px 12px 0 0' }} />
                <div style={{ padding: '12px' }}>
                  <div style={{ fontSize: '12px', color: theme.primary }}>{p.brand}</div>
                  <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>{p.name}</div>
                  <div style={{ fontSize: '16px', fontWeight: '800', color: theme.accent }}>{currency === 'NPR' ? `रू ${p.price.npr.toLocaleString()}` : `₹ ${p.price.inr.toLocaleString()}`}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Newsletter Signup Banner */}
      <div style={{ background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.secondary} 100%)`, padding: isMobile ? '32px 20px' : '48px 32px', margin: isMobile ? '16px' : '32px', borderRadius: isMobile ? '16px' : '24px', textAlign: 'center' }}>
        <h2 style={{ fontSize: isMobile ? '22px' : '28px', fontWeight: '800', color: '#fff', marginBottom: '12px' }}>Get 15% Off Your First Order!</h2>
        <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '24px', fontSize: isMobile ? '13px' : '15px' }}>Subscribe to our newsletter for exclusive deals, new arrivals, and style tips.</p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', maxWidth: '500px', margin: '0 auto', flexDirection: isMobile ? 'column' : 'row' }}>
          <input style={{ ...s.input, flex: 1, background: 'rgba(255,255,255,0.15)', border: 'none', color: '#fff' }} placeholder="Enter your email" value={newsletter} onChange={e => setNewsletter(e.target.value)} />
          <button style={{ ...s.secondaryBtn, background: '#fff', color: theme.primary, border: 'none' }} onClick={subscribeNewsletter}>Subscribe</button>
        </div>
      </div>
    </>
  );

  return (
    <div style={s.app}>
      {/* Navigation Bar - Only show appropriate view options */}
      {(isLoggedIn || currentView === 'admin') && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px', padding: isMobile ? '8px 12px' : '10px 16px', background: darkMode ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)', borderBottom: `1px solid ${modeColors.border}` }}>
          <span style={{ fontSize: isMobile ? '11px' : '12px', color: modeColors.textSecondary, fontWeight: '600' }}>VIEW:</span>
          <a 
            href="#/customer" 
            onClick={() => { setCurrentView('customer'); }} 
            style={{ 
              padding: isMobile ? '6px 12px' : '8px 14px', 
              borderRadius: '12px', 
              background: currentView === 'customer' ? theme.gradient : 'transparent', 
              color: currentView === 'customer' ? '#fff' : modeColors.text, 
              textDecoration: 'none', 
              fontWeight: 700, 
              fontSize: isMobile ? '12px' : '14px',
              border: currentView === 'customer' ? 'none' : `1px solid ${modeColors.border}`,
              transition: 'all 0.3s'
            }}
          >
            🛒 Customer Store
          </a>
          <a 
            href="#/admin" 
            onClick={(e) => { 
              e.preventDefault(); 
              setCurrentView('admin'); 
              window.location.hash = '#/admin'; 
            }} 
            style={{ 
              padding: isMobile ? '6px 12px' : '8px 14px', 
              borderRadius: '12px', 
              background: currentView === 'admin' ? theme.gradient : 'transparent', 
              color: currentView === 'admin' ? '#fff' : modeColors.text, 
              textDecoration: 'none', 
              fontWeight: 700, 
              fontSize: isMobile ? '12px' : '14px',
              border: currentView === 'admin' ? 'none' : `1px solid ${modeColors.border}`,
              transition: 'all 0.3s'
            }}
          >
            🔐 Admin Panel
          </a>
          {currentView === 'admin' && (
            <span style={{ fontSize: isMobile ? '10px' : '11px', color: theme.accent, fontWeight: '600', marginLeft: '8px' }}>✓ Logged In</span>
          )}
        </div>
      )}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap'); * { box-sizing: border-box; margin: 0; padding: 0; } ::-webkit-scrollbar { width: 8px; } ::-webkit-scrollbar-thumb { background: ${theme.primary}66; border-radius: 4px; } ::placeholder { color: ${modeColors.textMuted}; }`}</style>
      <header style={s.header}>
        <div style={s.topBar}><div style={{ display: 'flex', gap: '24px' }}><span>{storeConfig.email}</span><span>{storeConfig.phone}</span></div><span>Free shipping on orders above {currency === 'NPR' ? `रू ${storeConfig.freeShippingAbove}` : `₹ ${Math.round(storeConfig.freeShippingAbove / exchangeRate)}`}</span></div>
        <nav style={s.mainNav}>
          <div style={s.logo} onClick={() => { setCurrentView('customer'); window.location.hash = '#/customer'; }}><span style={{ fontSize: isMobile ? '32px' : '40px' }}>{storeConfig.logo}</span><span style={s.logoText}>{storeConfig.name}</span></div>
          
          {/* Mobile Menu Toggle */}
          {isMobile && (
            <div style={s.hamburger} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <div style={{ ...s.hamburgerLine, transform: mobileMenuOpen ? 'rotate(45deg) translateY(7px)' : 'none' }}></div>
              <div style={{ ...s.hamburgerLine, opacity: mobileMenuOpen ? 0 : 1 }}></div>
              <div style={{ ...s.hamburgerLine, transform: mobileMenuOpen ? 'rotate(-45deg) translateY(-7px)' : 'none' }}></div>
            </div>
          )}

          {/* Desktop or Mobile Open Menu */}
          <div style={{ 
            display: isMobile && !mobileMenuOpen ? 'none' : 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: isMobile ? 'stretch' : 'center',
            gap: isMobile ? '12px' : '16px',
            position: isMobile ? 'absolute' : 'relative',
            top: isMobile ? '100%' : 'auto',
            left: isMobile ? 0 : 'auto',
            right: isMobile ? 0 : 'auto',
            background: isMobile ? modeColors.bgModal : 'transparent',
            padding: isMobile ? '16px' : 0,
            borderRadius: isMobile ? '0 0 16px 16px' : 0,
            border: isMobile ? `1px solid ${modeColors.border}` : 'none',
            borderTop: isMobile ? 'none' : 'none',
            zIndex: isMobile ? 999 : 'auto',
            boxShadow: isMobile ? '0 8px 24px rgba(0,0,0,0.3)' : 'none',
            order: isMobile ? 4 : 2,
          }}>
            <div style={s.searchBar}><input style={s.searchInput} placeholder="Search shoes, brands..." value={filters.search} onChange={e => setFilters({ ...filters, search: e.target.value })} /><button style={s.searchBtn}>Search</button></div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '8px' : '16px', flexWrap: 'wrap', justifyContent: isMobile ? 'space-between' : 'flex-start' }}>
              <button onClick={() => setDarkMode(!darkMode)} style={s.themeToggle} title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}>{darkMode ? '☀️' : '🌙'}</button>
              <div style={{ display: 'flex', background: modeColors.bgTertiary, borderRadius: '10px', padding: '4px' }}>
                <button onClick={() => setCurrency('NPR')} style={{ padding: isMobile ? '6px 10px' : '8px 14px', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '12px', fontWeight: '600', background: currency === 'NPR' ? theme.gradient : 'transparent', color: modeColors.text }}>NPR</button>
                <button onClick={() => setCurrency('INR')} style={{ padding: isMobile ? '6px 10px' : '8px 14px', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '12px', fontWeight: '600', background: currency === 'INR' ? theme.gradient : 'transparent', color: modeColors.text }}>INR</button>
              </div>
              {currentView === 'customer' && (
                <>
                  <button style={s.iconBtn} title="Track Order" onClick={() => { setCustomerOrders([]); setTrackOrderId(''); setShowOrderTrack(true); if (isMobile) setMobileMenuOpen(false); }}>📦</button>
                  {compareList.length > 0 && <button style={s.iconBtn} title="Compare Products" onClick={() => { setShowCompare(true); if (isMobile) setMobileMenuOpen(false); }}>⚖️<span style={s.badge}>{compareList.length}</span></button>}
                  <button style={s.iconBtn} onClick={() => { if (isMobile) setMobileMenuOpen(false); }}>🤍{wishlist.length > 0 && <span style={s.badge}>{wishlist.length}</span>}</button>
                  <button style={s.iconBtn} onClick={() => { setShowCart(true); if (isMobile) setMobileMenuOpen(false); }}>🛒{cart.length > 0 && <span style={s.badge}>{cart.reduce((sum, i) => sum + i.quantity, 0)}</span>}</button>
                </>
              )}
              {/* Admin login is accessed through the navigation bar only */}
            </div>
          </div>
        </nav>
      </header>
      <main style={{ minHeight: 'calc(100vh - 200px)' }}>
        {currentView === 'customer' && <CustomerView />}
        {currentView === 'admin' && isLoggedIn && <AdminView />}
      </main>
      {showCart && (
        <div style={s.cartSidebar}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', paddingBottom: '20px', borderBottom: `1px solid ${modeColors.border}` }}><h2 style={{ fontSize: '24px', fontWeight: '800' }}>Cart ({cart.length})</h2><button onClick={() => setShowCart(false)} style={{ background: 'none', border: 'none', color: modeColors.text, fontSize: '28px', cursor: 'pointer' }}>×</button></div>
          {cart.length === 0 ? <div style={{ textAlign: 'center', padding: '40px' }}><div style={{ fontSize: '60px', marginBottom: '16px' }}>🛒</div><p style={{ color: modeColors.textSecondary }}>Your cart is empty</p></div> : (
            <>
              {cart.map(i => (
                <div key={`${i.productId}-${i.size}-${i.color}`} style={{ display: 'flex', gap: '16px', padding: '20px 0', borderBottom: `1px solid ${modeColors.border}` }}>
                  <img src={i.image} alt="" style={{ width: '90px', height: '90px', objectFit: 'cover', borderRadius: '14px' }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: '600', marginBottom: '4px' }}>{i.name}</div>
                    <div style={{ fontSize: '12px', color: modeColors.textSecondary, marginBottom: '4px' }}>{i.brand} | Size: {i.size} | {i.color}</div>
                    <div style={{ color: theme.accent, fontWeight: '700' }}>{currency === 'NPR' ? `रू ${i.price.npr.toLocaleString()}` : `₹ ${i.price.inr.toLocaleString()}`}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '10px' }}>
                      <button style={{ ...s.secondaryBtn, padding: '6px 12px' }} onClick={() => setCart(cart.map(x => x.productId === i.productId && x.size === i.size && x.color === i.color ? { ...x, quantity: Math.max(1, x.quantity - 1) } : x))}>-</button>
                      <span style={{ fontWeight: '600' }}>{i.quantity}</span>
                      <button style={{ ...s.secondaryBtn, padding: '6px 12px' }} onClick={() => setCart(cart.map(x => x.productId === i.productId && x.size === i.size && x.color === i.color ? { ...x, quantity: x.quantity + 1 } : x))}>+</button>
                      <button style={{ marginLeft: 'auto', background: 'none', border: 'none', color: '#e74c3c', cursor: 'pointer', fontSize: '18px' }} onClick={() => setCart(cart.filter(x => !(x.productId === i.productId && x.size === i.size && x.color === i.color)))}>X</button>
                    </div>
                  </div>
                </div>
              ))}
              <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: `1px solid ${modeColors.border}` }}>
                {/* Coupon Section */}
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                    <input style={{ ...s.input, flex: 1, padding: '10px 14px' }} placeholder="Enter coupon code" value={couponCode} onChange={e => setCouponCode(e.target.value)} />
                    <button style={{ ...s.primaryBtn, padding: '10px 16px' }} onClick={applyCoupon}>Apply</button>
                  </div>
                  {appliedCoupon && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: `${theme.accent}22`, padding: '8px 12px', borderRadius: '8px', fontSize: '13px' }}>
                      <span style={{ color: theme.accent }}>🎉 {appliedCoupon.code} applied!</span>
                      <button onClick={() => setAppliedCoupon(null)} style={{ background: 'none', border: 'none', color: '#e74c3c', cursor: 'pointer' }}>Remove</button>
                    </div>
                  )}
                  <div style={{ fontSize: '11px', color: modeColors.textMuted, marginTop: '6px' }}>Try: WELCOME10, FLAT500, NEPAL20</div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}><span style={{ color: modeColors.textSecondary }}>Subtotal</span><span style={{ fontWeight: '600' }}>{currency === 'NPR' ? `रू ${cartSubtotal.toLocaleString()}` : `₹ ${cartSubtotal.toLocaleString()}`}</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}><span style={{ color: modeColors.textSecondary }}>Shipping</span><span style={{ color: shippingCost === 0 ? theme.accent : modeColors.text, fontWeight: '600' }}>{shippingCost === 0 ? 'FREE' : (currency === 'NPR' ? `रू ${shippingCost}` : `₹ ${shippingCost}`)}</span></div>
                {couponDiscount > 0 && <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}><span style={{ color: theme.accent }}>Discount</span><span style={{ color: theme.accent, fontWeight: '600' }}>- {currency === 'NPR' ? `रू ${couponDiscount.toLocaleString()}` : `₹ ${couponDiscount.toLocaleString()}`}</span></div>}
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '20px', fontWeight: '800', paddingTop: '12px', borderTop: `1px solid ${modeColors.border}` }}><span>Total</span><span style={{ color: theme.primary }}>{currency === 'NPR' ? `रू ${cartTotal.toLocaleString()}` : `₹ ${cartTotal.toLocaleString()}`}</span></div>
                <button style={{ ...s.primaryBtn, width: '100%', marginTop: '20px', padding: '16px' }} onClick={() => { setShowCart(false); setShowCheckout(true); }}>Checkout</button>
              </div>
            </>
          )}
        </div>
      )}
      {showCheckout && <CheckoutModal />}
      {selectedProduct && <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
      {showLoginModal && (
        <div style={s.modal}>
          <div style={{ ...s.modalContent, maxWidth: '420px', padding: '40px' }}>
            <h2 style={{ fontSize: '26px', fontWeight: '800', marginBottom: '8px' }}>Admin Login</h2>
            <p style={{ color: modeColors.textSecondary, marginBottom: '28px' }}>Enter password to access admin panel</p>
            <div style={s.formGroup}><label style={s.label}>Password</label><input type="password" style={s.input} value={adminPassword} onChange={e => setAdminPassword(e.target.value)} placeholder="Enter password" onKeyDown={e => e.key === 'Enter' && (adminPassword === storedAdminPassword ? (setIsLoggedIn(true), setShowLoginModal(false), setCurrentView('admin'), setAdminPassword('')) : alert('Wrong password!'))} /></div>
            <p style={{ fontSize: '12px', color: modeColors.textMuted, marginBottom: '24px' }}>Default: admin123</p>
            <div style={{ display: 'flex', gap: '12px' }}><button style={{ ...s.primaryBtn, flex: 1 }} onClick={() => adminPassword === storedAdminPassword ? (setIsLoggedIn(true), setShowLoginModal(false), setCurrentView('admin'), setAdminPassword('')) : alert('Wrong password!')}>Login</button><button style={s.secondaryBtn} onClick={() => { setShowLoginModal(false); setAdminPassword(''); }}>Cancel</button></div>
          </div>
        </div>
      )}
      {/* Order Tracking Modal */}
      {showOrderTrack && (
        <div style={s.modal} onClick={() => setShowOrderTrack(false)}>
          <div style={{ ...s.modalContent, maxWidth: '600px', padding: '32px' }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: '800' }}>Track Your Order</h2>
              <button onClick={() => setShowOrderTrack(false)} style={{ background: 'none', border: 'none', color: modeColors.text, fontSize: '28px', cursor: 'pointer' }}>×</button>
            </div>
            <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
              <input style={{ ...s.input, flex: 1 }} placeholder="Enter Order ID (e.g., ORD001)" value={trackOrderId} onChange={e => setTrackOrderId(e.target.value)} />
              <button style={s.primaryBtn} onClick={trackOrder}>Track</button>
            </div>
            {customerOrders.length > 0 && customerOrders.map(order => (
              <div key={order.id} style={{ background: modeColors.bgSecondary, borderRadius: '16px', padding: '20px', border: `1px solid ${modeColors.border}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <div><div style={{ fontWeight: '700', fontSize: '18px' }}>Order #{order.id}</div><div style={{ fontSize: '13px', color: modeColors.textSecondary }}>{order.date}</div></div>
                  <span style={{ padding: '6px 14px', borderRadius: '20px', fontSize: '13px', fontWeight: '600', background: order.status === 'Delivered' ? '#2ecc7133' : order.status === 'Shipped' ? '#3498db33' : '#f39c1233', color: order.status === 'Delivered' ? '#2ecc71' : order.status === 'Shipped' ? '#3498db' : '#f39c12' }}>{order.status}</span>
                </div>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                  {['Processing', 'Shipped', 'Out for Delivery', 'Delivered'].map((step, i) => {
                    const isActive = ['Processing', 'Shipped', 'Out for Delivery', 'Delivered'].indexOf(order.status) >= i;
                    return <div key={step} style={{ flex: 1, textAlign: 'center' }}><div style={{ height: '4px', background: isActive ? theme.primary : modeColors.bgTertiary, borderRadius: '2px', marginBottom: '8px' }} /><span style={{ fontSize: '11px', color: isActive ? theme.primary : modeColors.textMuted }}>{step}</span></div>;
                  })}
                </div>
                <div style={{ borderTop: `1px solid ${modeColors.border}`, paddingTop: '16px' }}>
                  <div style={{ fontSize: '14px', color: modeColors.textSecondary, marginBottom: '8px' }}>Shipping to: {order.address.city}, {order.address.country}</div>
                  <div style={{ fontWeight: '700', color: theme.primary }}>Total: {currency === 'NPR' ? `रू ${order.total.npr.toLocaleString()}` : `₹ ${order.total.inr.toLocaleString()}`}</div>
                </div>
              </div>
            ))}
            {customerOrders.length === 0 && <div style={{ textAlign: 'center', padding: '40px', color: modeColors.textSecondary }}><div style={{ fontSize: '48px', marginBottom: '12px' }}>📦</div><p>Enter your order ID to track your shipment</p></div>}
          </div>
        </div>
      )}

      {/* Product Comparison Modal */}
      {showCompare && (
        <div style={s.modal} onClick={() => setShowCompare(false)}>
          <div style={{ ...s.modalContent, maxWidth: '1200px', padding: '32px', maxHeight: '90vh', overflowY: 'auto' }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: '800' }}>Compare Products ({compareList.length})</h2>
              <button onClick={() => setShowCompare(false)} style={{ background: 'none', border: 'none', color: modeColors.text, fontSize: '28px', cursor: 'pointer' }}>×</button>
            </div>
            {compareList.length > 0 ? (
              <div style={{ display: 'grid', gridTemplateColumns: `repeat(${compareList.length}, 1fr)`, gap: '20px' }}>
                {compareList.map(product => (
                  <div key={product.id} style={{ background: modeColors.bgSecondary, borderRadius: '16px', padding: '16px', border: `1px solid ${modeColors.border}`, position: 'relative' }}>
                    <button onClick={() => toggleCompare(product)} style={{ position: 'absolute', right: '8px', top: '8px', background: '#e74c3c', border: 'none', borderRadius: '50%', width: '24px', height: '24px', color: '#fff', cursor: 'pointer', fontSize: '14px', zIndex: 1 }}>×</button>
                    <img src={product.images[0]} alt="" style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '12px', marginBottom: '12px' }} />
                    <div style={{ fontWeight: '700', marginBottom: '8px' }}>{product.name}</div>
                    <div style={{ fontSize: '13px', color: theme.primary, marginBottom: '12px' }}>{product.brand}</div>
                    <div style={{ fontSize: '18px', fontWeight: '800', color: theme.accent, marginBottom: '16px' }}>{currency === 'NPR' ? `रू ${product.price.npr.toLocaleString()}` : `₹ ${product.price.inr.toLocaleString()}`}</div>
                    <div style={{ fontSize: '13px', color: modeColors.textSecondary, marginBottom: '8px' }}><strong>Category:</strong> {product.category}</div>
                    <div style={{ fontSize: '13px', color: modeColors.textSecondary, marginBottom: '8px' }}><strong>Rating:</strong> {renderStars(Math.round(product.rating))} ({product.rating})</div>
                    <div style={{ fontSize: '13px', color: modeColors.textSecondary, marginBottom: '8px' }}><strong>Sizes:</strong> {product.sizes.join(', ')}</div>
                    <div style={{ fontSize: '13px', color: modeColors.textSecondary, marginBottom: '8px' }}><strong>Colors:</strong> {product.colors.join(', ')}</div>
                    <div style={{ fontSize: '13px', color: modeColors.textSecondary, marginBottom: '12px' }}><strong>Stock:</strong> {product.stock} available</div>
                    <button style={{ ...s.primaryBtn, width: '100%', padding: '10px' }} onClick={() => { setSelectedProduct(product); setShowCompare(false); }}>View Details</button>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '60px', color: modeColors.textSecondary }}><div style={{ fontSize: '48px', marginBottom: '12px' }}>⚖️</div><p>Add products to compare by clicking the compare icon on product cards</p></div>
            )}
            {compareList.length > 0 && <button style={{ ...s.secondaryBtn, marginTop: '20px' }} onClick={() => setCompareList([])}>Clear All</button>}
          </div>
        </div>
      )}

      <footer style={{ background: 'rgba(0,0,0,0.4)', borderTop: `1px solid ${theme.primary}22`, padding: isMobile ? '32px 20px 16px' : '48px 32px 24px', marginTop: '60px' }}>
        <div style={{ maxWidth: '1600px', margin: '0 auto', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)', gap: isMobile ? '24px' : '40px' }}>
          <div><div style={{ ...s.logo, marginBottom: '16px' }}><span style={{ fontSize: isMobile ? '28px' : '32px' }}>{storeConfig.logo}</span><span style={{ ...s.logoText, fontSize: isMobile ? '20px' : '24px' }}>{storeConfig.name}</span></div><p style={{ color: 'rgba(255,255,255,0.6)', fontSize: isMobile ? '13px' : '14px', lineHeight: '1.7' }}>Premium footwear for every occasion.</p></div>
          <div><h4 style={{ fontWeight: '700', marginBottom: '20px', color: theme.primary, fontSize: isMobile ? '14px' : '16px' }}>Categories</h4><div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>{categories.slice(0, 5).map(c => <span key={c.id} style={{ color: 'rgba(255,255,255,0.6)', fontSize: isMobile ? '13px' : '14px', cursor: 'pointer' }}>{c.icon} {c.name}</span>)}</div></div>
          <div><h4 style={{ fontWeight: '700', marginBottom: '20px', color: theme.primary, fontSize: isMobile ? '14px' : '16px' }}>Contact</h4><div style={{ display: 'flex', flexDirection: 'column', gap: '12px', color: 'rgba(255,255,255,0.6)', fontSize: isMobile ? '13px' : '14px' }}><span>{storeConfig.address}</span><span>{storeConfig.email}</span><span>{storeConfig.phone}</span></div></div>
          <div><h4 style={{ fontWeight: '700', marginBottom: '20px', color: theme.primary, fontSize: isMobile ? '14px' : '16px' }}>Payments</h4><div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>{['eSewa', 'Khalti', 'Razorpay', 'Paytm', 'COD'].map(m => <span key={m} style={{ background: 'rgba(255,255,255,0.08)', padding: '6px 12px', borderRadius: '6px', fontSize: isMobile ? '11px' : '12px' }}>{m}</span>)}</div></div>
        </div>
        <div style={{ maxWidth: '1600px', margin: '40px auto 0', paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.1)', textAlign: 'center', color: 'rgba(255,255,255,0.4)', fontSize: isMobile ? '11px' : '13px' }}>© 2024 {storeConfig.name}. All rights reserved. | Nepal | India</div>
      </footer>
    </div>
  );
}
