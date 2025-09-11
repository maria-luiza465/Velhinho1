import React from 'react';
import { CartItem, ViewType } from '../types';
import { Minus, Plus, Trash2, ShoppingCart as CartIcon } from 'lucide-react';

interface ShoppingCartProps {
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  setCurrentView: (view: ViewType) => void;
}

const ShoppingCart: React.FC<ShoppingCartProps> = ({
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  setCurrentView
}) => {
  const total = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <CartIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Seu carrinho está vazio</h2>
            <p className="text-gray-600 mb-6">Adicione alguns produtos deliciosos ao seu carrinho!</p>
            <button
              onClick={() => setCurrentView('catalog')}
              className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors"
            >
              Ver Cardápio
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Carrinho de Compras</h2>
          
          <div className="space-y-4 mb-6">
            {cartItems.map(item => (
              <div key={item.product.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-16 h-16 object-cover rounded-md"
                />
                
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800">{item.product.name}</h3>
                  <p className="text-gray-600 text-sm">{item.product.description}</p>
                  <p className="text-orange-600 font-semibold mt-1">
                    R$ {item.product.price.toFixed(2)}
                  </p>
                </div>
                
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                    className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
                    disabled={item.quantity <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  
                  <span className="text-lg font-semibold w-8 text-center">
                    {item.quantity}
                  </span>
                  
                  <button
                    onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                    className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                  
                  <button
                    onClick={() => onRemoveItem(item.product.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="text-lg font-bold text-gray-800 min-w-[80px] text-right">
                  R$ {(item.product.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
          
          <div className="border-t pt-6">
            <div className="flex justify-between items-center mb-6">
              <span className="text-xl font-bold text-gray-800">Total:</span>
              <span className="text-2xl font-bold text-orange-600">
                R$ {total.toFixed(2)}
              </span>
            </div>
            
            <div className="flex space-x-4">
              <button
                onClick={() => setCurrentView('catalog')}
                className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
              >
                Continuar Comprando
              </button>
              <button
                onClick={() => setCurrentView('checkout')}
                className="flex-1 bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 transition-colors font-semibold"
              >
                Finalizar Pedido
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;