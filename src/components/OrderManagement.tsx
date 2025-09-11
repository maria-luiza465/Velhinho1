import React, { useState } from 'react';
import { Order } from '../types';
import { Eye, MapPin, Phone, Mail, Calendar, CreditCard } from 'lucide-react';

interface OrderManagementProps {
  orders: Order[];
  onUpdateOrderStatus: (orderId: string, status: Order['status']) => void;
}

const OrderManagement: React.FC<OrderManagementProps> = ({ orders, onUpdateOrderStatus }) => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const statusOptions: { value: Order['status']; label: string; color: string }[] = [
    { value: 'pending', label: 'Pendente', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'accepted', label: 'Aceito', color: 'bg-blue-100 text-blue-800' },
    { value: 'rejected', label: 'Recusado', color: 'bg-red-100 text-red-800' },
    { value: 'production', label: 'Em Produção', color: 'bg-orange-100 text-orange-800' },
    { value: 'delivery', label: 'Saiu para Entrega', color: 'bg-purple-100 text-purple-800' },
    { value: 'delivered', label: 'Entregue', color: 'bg-green-100 text-green-800' }
  ];

  const getStatusColor = (status: Order['status']) => {
    return statusOptions.find(opt => opt.value === status)?.color || 'bg-gray-100 text-gray-800';
  };

  const getStatusLabel = (status: Order['status']) => {
    return statusOptions.find(opt => opt.value === status)?.label || status;
  };

  const getPaymentMethodLabel = (method: string) => {
    switch (method) {
      case 'credit': return 'Cartão de Crédito';
      case 'pix': return 'PIX';
      case 'cash': return 'Dinheiro';
      default: return method;
    }
  };

  return (
    <div>
      <h3 className="text-2xl font-bold text-gray-800 mb-6">Gestão de Pedidos</h3>

      {orders.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <p className="text-gray-600">Nenhum pedido encontrado.</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Pedido
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cliente
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Data
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders.map(order => (
                  <tr key={order.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">#{order.id.slice(-8)}</div>
                      <div className="text-sm text-gray-500">
                        {order.items.length} {order.items.length === 1 ? 'item' : 'itens'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{order.customer.name}</div>
                      <div className="text-sm text-gray-500">{order.customer.phone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(order.createdAt).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      R$ {order.total.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={order.status}
                        onChange={(e) => onUpdateOrderStatus(order.id, e.target.value as Order['status'])}
                        className="text-sm rounded-full px-3 py-1 font-medium border-0 focus:ring-2 focus:ring-orange-500"
                        style={{
                          backgroundColor: getStatusColor(order.status).split(' ')[0].replace('bg-', '').includes('yellow') ? '#FEF3C7' :
                                          getStatusColor(order.status).split(' ')[0].replace('bg-', '').includes('blue') ? '#DBEAFE' :
                                          getStatusColor(order.status).split(' ')[0].replace('bg-', '').includes('red') ? '#FEE2E2' :
                                          getStatusColor(order.status).split(' ')[0].replace('bg-', '').includes('orange') ? '#FED7AA' :
                                          getStatusColor(order.status).split(' ')[0].replace('bg-', '').includes('purple') ? '#EDE9FE' :
                                          getStatusColor(order.status).split(' ')[0].replace('bg-', '').includes('green') ? '#D1FAE5' : '#F3F4F6'
                        }}
                      >
                        {statusOptions.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="text-orange-600 hover:text-orange-900 flex items-center space-x-1"
                      >
                        <Eye className="w-4 h-4" />
                        <span>Ver Detalhes</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-xl font-bold text-gray-800">
                  Detalhes do Pedido #{selectedOrder.id.slice(-8)}
                </h4>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              {/* Customer Info */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h5 className="font-semibold text-gray-800 mb-3">Dados do Cliente</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">{selectedOrder.customer.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-gray-600" />
                    <span>{selectedOrder.customer.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-gray-600" />
                    <span>{selectedOrder.customer.email}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-gray-600" />
                    <span>{new Date(selectedOrder.createdAt).toLocaleString('pt-BR')}</span>
                  </div>
                </div>
                
                <div className="mt-3 flex items-start space-x-2">
                  <MapPin className="w-4 h-4 text-gray-600 mt-0.5" />
                  <div>
                    <p className="text-sm">
                      {selectedOrder.customer.address.street}, {selectedOrder.customer.address.number}
                    </p>
                    <p className="text-sm text-gray-600">
                      {selectedOrder.customer.address.neighborhood} - {selectedOrder.customer.address.city}
                    </p>
                    <p className="text-sm text-gray-600">CEP: {selectedOrder.customer.address.zipCode}</p>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="mb-6">
                <h5 className="font-semibold text-gray-800 mb-3">Itens do Pedido</h5>
                <div className="space-y-3">
                  {selectedOrder.items.map(item => (
                    <div key={item.product.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-12 h-12 object-cover rounded-md"
                      />
                      <div className="flex-1">
                        <p className="font-medium">{item.product.name}</p>
                        <p className="text-sm text-gray-600">Qtd: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">R$ {(item.product.price * item.quantity).toFixed(2)}</p>
                        <p className="text-sm text-gray-600">R$ {item.product.price.toFixed(2)} cada</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment & Total */}
              <div className="border-t pt-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <CreditCard className="w-4 h-4 text-gray-600" />
                    <span>Pagamento: {getPaymentMethodLabel(selectedOrder.paymentMethod)}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-orange-600">
                      Total: R$ {selectedOrder.total.toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status do Pedido:
                  </label>
                  <select
                    value={selectedOrder.status}
                    onChange={(e) => {
                      const newStatus = e.target.value as Order['status'];
                      onUpdateOrderStatus(selectedOrder.id, newStatus);
                      setSelectedOrder({ ...selectedOrder, status: newStatus });
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    {statusOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderManagement;