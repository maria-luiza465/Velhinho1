import React, { useState } from 'react';
import { CartItem, Customer, Order } from '../types';
import { CreditCard, Smartphone, Banknote, Check } from 'lucide-react';

interface CheckoutProps {
  cartItems: CartItem[];
  onPlaceOrder: (order: Omit<Order, 'id' | 'createdAt'>) => void;
  onClearCart: () => void;
}

const Checkout: React.FC<CheckoutProps> = ({ cartItems, onPlaceOrder, onClearCart }) => {
  const [customer, setCustomer] = useState<Customer>({
    name: '',
    phone: '',
    email: '',
    address: {
      street: '',
      number: '',
      neighborhood: '',
      city: '',
      zipCode: ''
    }
  });
  
  const [paymentMethod, setPaymentMethod] = useState<'credit' | 'pix' | 'cash'>('credit');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const total = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simular processamento
    await new Promise(resolve => setTimeout(resolve, 1000));

    const order: Omit<Order, 'id' | 'createdAt'> = {
      customer,
      items: cartItems,
      total,
      paymentMethod,
      status: 'pending'
    };

    onPlaceOrder(order);
    onClearCart();
    setOrderPlaced(true);
    setIsSubmitting(false);
  };

  const handleInputChange = (field: string, value: string) => {
    if (field.startsWith('address.')) {
      const addressField = field.split('.')[1];
      setCustomer(prev => ({
        ...prev,
        address: { ...prev.address, [addressField]: value }
      }));
    } else {
      setCustomer(prev => ({ ...prev, [field]: value }));
    }
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Pedido Realizado com Sucesso!</h2>
            <p className="text-gray-600 mb-6">
              Recebemos seu pedido e entraremos em contato em breve para confirmação.
            </p>
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-600 mb-2">Resumo do pedido:</p>
              <p className="font-semibold">Total: R$ {total.toFixed(2)}</p>
              <p className="text-sm">Pagamento: {
                paymentMethod === 'credit' ? 'Cartão de Crédito' :
                paymentMethod === 'pix' ? 'PIX' : 'Dinheiro'
              }</p>
            </div>
            <p className="text-sm text-gray-600">
              Você receberá uma confirmação no email: {customer.email}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Finalizar Pedido</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Order Summary */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Resumo do Pedido</h3>
              <div className="space-y-3 mb-4">
                {cartItems.map(item => (
                  <div key={item.product.id} className="flex justify-between items-center py-2">
                    <div className="flex-1">
                      <p className="font-medium">{item.product.name}</p>
                      <p className="text-sm text-gray-600">Qtd: {item.quantity}</p>
                    </div>
                    <p className="font-semibold">
                      R$ {(item.product.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Total:</span>
                  <span className="text-orange-600">R$ {total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Customer Form */}
            <div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Dados do Cliente</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    required
                    value={customer.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Telefone *
                    </label>
                    <input
                      type="tel"
                      required
                      value={customer.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={customer.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Rua *
                    </label>
                    <input
                      type="text"
                      required
                      value={customer.address.street}
                      onChange={(e) => handleInputChange('address.street', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Número *
                    </label>
                    <input
                      type="text"
                      required
                      value={customer.address.number}
                      onChange={(e) => handleInputChange('address.number', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Bairro *
                    </label>
                    <input
                      type="text"
                      required
                      value={customer.address.neighborhood}
                      onChange={(e) => handleInputChange('address.neighborhood', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Cidade *
                    </label>
                    <input
                      type="text"
                      required
                      value={customer.address.city}
                      onChange={(e) => handleInputChange('address.city', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    CEP *
                  </label>
                  <input
                    type="text"
                    required
                    value={customer.address.zipCode}
                    onChange={(e) => handleInputChange('address.zipCode', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Forma de Pagamento</h4>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="credit"
                        checked={paymentMethod === 'credit'}
                        onChange={(e) => setPaymentMethod(e.target.value as any)}
                        className="mr-2"
                      />
                      <CreditCard className="w-4 h-4 mr-2" />
                      Cartão de Crédito
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="pix"
                        checked={paymentMethod === 'pix'}
                        onChange={(e) => setPaymentMethod(e.target.value as any)}
                        className="mr-2"
                      />
                      <Smartphone className="w-4 h-4 mr-2" />
                      PIX
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="cash"
                        checked={paymentMethod === 'cash'}
                        onChange={(e) => setPaymentMethod(e.target.value as any)}
                        className="mr-2"
                      />
                      <Banknote className="w-4 h-4 mr-2" />
                      Dinheiro
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 transition-colors font-semibold disabled:opacity-50"
                >
                  {isSubmitting ? 'Processando...' : 'Confirmar Pedido'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;