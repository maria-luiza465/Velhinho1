import React, { useState, useEffect } from 'react';
import { Product, CartItem, Order, ViewType } from './types';
import { useLocalStorage } from './hooks/useLocalStorage';
import { initialProducts } from './data/initialProducts';
import Header from './components/Header';
import HomePage from './components/HomePage';
import ProductCatalog from './components/ProductCatalog';
import ShoppingCart from './components/ShoppingCart';
import Checkout from './components/Checkout';
import Login from './components/Login';
import AdminPanel from './components/AdminPanel';

function App() {
  const [products, setProducts] = useLocalStorage<Product[]>('confeitaria-products', initialProducts);
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>('confeitaria-cart', []);
  const [orders, setOrders] = useLocalStorage<Order[]>('confeitaria-orders', []);
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [isAdmin, setIsAdmin] = useState(false);

  // Initialize products if empty
  useEffect(() => {
    if (products.length === 0) {
      setProducts(initialProducts);
    }
  }, [products.length, setProducts]);

  const handleLogin = (username: string, password: string): boolean => {
    // Simple authentication - in production, this would be secure
    if (username === 'admin' && password === '123456') {
      setIsAdmin(true);
      setCurrentView('admin');
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setIsAdmin(false);
    setCurrentView('home');
  };

  const addToCart = (product: Product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.product.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { product, quantity: 1 }];
    });
    
    // Show success feedback (you could add a toast notification here)
    console.log(`${product.name} adicionado ao carrinho!`);
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const removeFromCart = (productId: string) => {
    setCartItems(prevItems =>
      prevItems.filter(item => item.product.id !== productId)
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const placeOrder = (orderData: Omit<Order, 'id' | 'createdAt'>) => {
    const newOrder: Order = {
      ...orderData,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString()
    };
    
    setOrders(prevOrders => [newOrder, ...prevOrders]);
  };

  const updateProduct = (updatedProduct: Product) => {
    setProducts(prevProducts =>
      prevProducts.map(product =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
  };

  const deleteProduct = (productId: string) => {
    setProducts(prevProducts =>
      prevProducts.filter(product => product.id !== productId)
    );
  };

  const addProduct = (productData: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...productData,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9)
    };
    
    setProducts(prevProducts => [...prevProducts, newProduct]);
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === orderId ? { ...order, status } : order
      )
    );
  };

  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const renderCurrentView = () => {
    switch (currentView) {
      case 'home':
        return (
          <HomePage
            products={products}
            setCurrentView={setCurrentView}
            onAddToCart={addToCart}
          />
        );
      case 'catalog':
        return (
          <ProductCatalog
            products={products}
            onAddToCart={addToCart}
          />
        );
      case 'cart':
        return (
          <ShoppingCart
            cartItems={cartItems}
            onUpdateQuantity={updateCartQuantity}
            onRemoveItem={removeFromCart}
            setCurrentView={setCurrentView}
          />
        );
      case 'checkout':
        return (
          <Checkout
            cartItems={cartItems}
            onPlaceOrder={placeOrder}
            onClearCart={clearCart}
          />
        );
      case 'login':
        return <Login onLogin={handleLogin} />;
      case 'admin':
        return isAdmin ? (
          <AdminPanel
            products={products}
            orders={orders}
            onUpdateProduct={updateProduct}
            onDeleteProduct={deleteProduct}
            onAddProduct={addProduct}
            onUpdateOrderStatus={updateOrderStatus}
          />
        ) : (
          <Login onLogin={handleLogin} />
        );
      default:
        return (
          <HomePage
            products={products}
            setCurrentView={setCurrentView}
            onAddToCart={addToCart}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        currentView={currentView}
        setCurrentView={setCurrentView}
        cartItemsCount={cartItemsCount}
        isAdmin={isAdmin}
        onLogout={handleLogout}
      />
      {renderCurrentView()}
    </div>
  );
}

export default App;