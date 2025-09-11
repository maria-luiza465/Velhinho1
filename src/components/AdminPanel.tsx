import React, { useState } from 'react';
import { Product, Order } from '../types';
import { Package, ShoppingBag, TrendingUp, Users } from 'lucide-react';
import ProductManagement from './ProductManagement';
import OrderManagement from './OrderManagement';

interface AdminPanelProps {
  products: Product[];
  orders: Order[];
  onUpdateProduct: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
  onAddProduct: (product: Omit<Product, 'id'>) => void;
  onUpdateOrderStatus: (orderId: string, status: Order['status']) => void;
}

type AdminView = 'dashboard' | 'products' | 'orders';

const AdminPanel: React.FC<AdminPanelProps> = ({
  products,
  orders,
  onUpdateProduct,
  onDeleteProduct,
  onAddProduct,
  onUpdateOrderStatus
}) => {
  const [currentView, setCurrentView] = useState<AdminView>('dashboard');

  const activeProducts = products.filter(p => p.active).length;
  const pendingOrders = orders.filter(o => o.status === 'pending').length;
  const totalRevenue = orders
    .filter(o => o.status === 'delivered')
    .reduce((sum, order) => sum + order.total, 0);

  const renderDashboard = () => (
    <div>
      <h3 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <Package className="w-8 h-8 text-blue-600 mr-3" />
            <div>
              <p className="text-sm text-gray-600">Produtos Ativos</p>
              <p className="text-2xl font-bold text-gray-800">{activeProducts}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <ShoppingBag className="w-8 h-8 text-orange-600 mr-3" />
            <div>
              <p className="text-sm text-gray-600">Pedidos Pendentes</p>
              <p className="text-2xl font-bold text-gray-800">{pendingOrders}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <TrendingUp className="w-8 h-8 text-green-600 mr-3" />
            <div>
              <p className="text-sm text-gray-600">Receita Total</p>
              <p className="text-2xl font-bold text-gray-800">R$ {totalRevenue.toFixed(2)}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <Users className="w-8 h-8 text-purple-600 mr-3" />
            <div>
              <p className="text-sm text-gray-600">Total de Pedidos</p>
              <p className="text-2xl font-bold text-gray-800">{orders.length}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">Pedidos Recentes</h4>
        {orders.length === 0 ? (
          <p className="text-gray-600">Nenhum pedido encontrado.</p>
        ) : (
          <div className="space-y-3">
            {orders.slice(0, 5).map(order => (
              <div key={order.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                <div>
                  <p className="font-medium">{order.customer.name}</p>
                  <p className="text-sm text-gray-600">
                    {new Date(order.createdAt).toLocaleDateString('pt-BR')}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">R$ {order.total.toFixed(2)}</p>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                    order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    order.status === 'accepted' ? 'bg-blue-100 text-blue-800' :
                    order.status === 'production' ? 'bg-orange-100 text-orange-800' :
                    order.status === 'delivery' ? 'bg-purple-100 text-purple-800' :
                    order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {order.status === 'pending' ? 'Pendente' :
                     order.status === 'accepted' ? 'Aceito' :
                     order.status === 'production' ? 'Em Produção' :
                     order.status === 'delivery' ? 'Saiu para Entrega' :
                     order.status === 'delivered' ? 'Entregue' : 'Recusado'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Painel Administrativo</h2>
          
          <div className="flex space-x-1 bg-gray-200 p-1 rounded-lg">
            <button
              onClick={() => setCurrentView('dashboard')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                currentView === 'dashboard' 
                  ? 'bg-white text-orange-600 shadow-sm' 
                  : 'text-gray-700 hover:text-orange-600'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setCurrentView('products')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                currentView === 'products' 
                  ? 'bg-white text-orange-600 shadow-sm' 
                  : 'text-gray-700 hover:text-orange-600'
              }`}
            >
              Produtos
            </button>
            <button
              onClick={() => setCurrentView('orders')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                currentView === 'orders' 
                  ? 'bg-white text-orange-600 shadow-sm' 
                  : 'text-gray-700 hover:text-orange-600'
              }`}
            >
              Pedidos
            </button>
          </div>
        </div>

        {currentView === 'dashboard' && renderDashboard()}
        {currentView === 'products' && (
          <ProductManagement
            products={products}
            onUpdateProduct={onUpdateProduct}
            onDeleteProduct={onDeleteProduct}
            onAddProduct={onAddProduct}
          />
        )}
        {currentView === 'orders' && (
          <OrderManagement
            orders={orders}
            onUpdateOrderStatus={onUpdateOrderStatus}
          />
        )}
      </div>
    </div>
  );
};

export default AdminPanel;