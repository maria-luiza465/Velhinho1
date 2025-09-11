import React from 'react';
import { ChefHat, ShoppingCart, User } from 'lucide-react';
import { ViewType } from '../types';

interface HeaderProps {
  currentView: ViewType;
  setCurrentView: (view: ViewType) => void;
  cartItemsCount: number;
  isAdmin: boolean;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  currentView, 
  setCurrentView, 
  cartItemsCount, 
  isAdmin,
  onLogout 
}) => {
  return (
    <header className="bg-gradient-to-r from-pink-200 via-orange-200 to-yellow-200 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          {/* Logo */}
          <div 
            className="flex flex-col items-center cursor-pointer group"
            onClick={() => setCurrentView('home')}
          >
            <ChefHat className="w-8 h-8 text-orange-600 mb-1 group-hover:text-orange-700 transition-colors" />
            <h1 className="text-2xl font-bold text-gray-800 group-hover:text-gray-700 transition-colors">
              Confeitaria do Velhinho
            </h1>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <button
              onClick={() => setCurrentView('home')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                currentView === 'home' 
                  ? 'text-orange-600 bg-white/50' 
                  : 'text-gray-700 hover:text-orange-600'
              }`}
            >
              Início
            </button>
            <button
              onClick={() => setCurrentView('catalog')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                currentView === 'catalog' 
                  ? 'text-orange-600 bg-white/50' 
                  : 'text-gray-700 hover:text-orange-600'
              }`}
            >
              Cardápio
            </button>
            {isAdmin && (
              <button
                onClick={() => setCurrentView('admin')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentView === 'admin' 
                    ? 'text-orange-600 bg-white/50' 
                    : 'text-gray-700 hover:text-orange-600'
                }`}
              >
                Administração
              </button>
            )}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {!isAdmin && (
              <button
                onClick={() => setCurrentView('cart')}
                className="relative p-2 text-gray-700 hover:text-orange-600 transition-colors"
              >
                <ShoppingCart className="w-6 h-6" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </button>
            )}
            
            {isAdmin ? (
              <button
                onClick={onLogout}
                className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">Sair</span>
              </button>
            ) : (
              <button
                onClick={() => setCurrentView('login')}
                className="flex items-center space-x-2 px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors"
              >
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">Admin</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;