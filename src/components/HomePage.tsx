import React from 'react';
import { Product, ViewType } from '../types';
import { Star, Heart, Gift } from 'lucide-react';

interface HomePageProps {
  products: Product[];
  setCurrentView: (view: ViewType) => void;
  onAddToCart: (product: Product) => void;
}

const HomePage: React.FC<HomePageProps> = ({ products, setCurrentView, onAddToCart }) => {
  const featuredProducts = products.filter(p => p.active).slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-pink-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-pink-300 via-orange-300 to-yellow-300 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
            Doces que Aquecem o Coração
          </h2>
          <p className="text-xl text-white mb-8 drop-shadow-md">
            Sabores artesanais feitos com amor e tradição familiar há mais de 30 anos
          </p>
          <button
            onClick={() => setCurrentView('catalog')}
            className="bg-white text-orange-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-orange-50 transition-all transform hover:scale-105 shadow-lg"
          >
            Ver Cardápio Completo
          </button>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <Star className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Qualidade Premium</h3>
              <p className="text-gray-600">Ingredientes selecionados e receitas tradicionais</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <Heart className="w-12 h-12 text-pink-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Feito com Amor</h3>
              <p className="text-gray-600">Cada doce é preparado artesanalmente com carinho</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <Gift className="w-12 h-12 text-orange-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Personalização</h3>
              <p className="text-gray-600">Criamos doces especiais para suas ocasiões únicas</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Produtos em Destaque
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow group">
                <div className="relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-opacity"></div>
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h4>
                  <p className="text-gray-600 mb-4 text-sm">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-orange-600">
                      R$ {product.price.toFixed(2)}
                    </span>
                    <button
                      onClick={() => onAddToCart(product)}
                      className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 transition-colors"
                    >
                      Adicionar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <button
              onClick={() => setCurrentView('catalog')}
              className="bg-orange-600 text-white px-8 py-3 rounded-lg hover:bg-orange-700 transition-colors font-semibold"
            >
              Ver Todos os Produtos
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-gradient-to-r from-orange-100 to-pink-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl font-bold text-gray-800 mb-6">Sobre a Confeitaria do Velhinho</h3>
          <p className="text-lg text-gray-700 mb-6">
            Com mais de 30 anos de tradição, nossa confeitaria familiar se dedica a criar momentos doces e especiais. 
            Cada receita foi passada de geração em geração, mantendo o sabor autêntico e caseiro que você conhece e ama.
          </p>
          <p className="text-lg text-gray-700">
            Do nosso coração para a sua mesa, oferecemos doces artesanais feitos com ingredientes selecionados 
            e muito amor. Sua satisfação é nossa maior recompensa!
          </p>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl font-bold text-gray-800 mb-8">Entre em Contato</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 bg-orange-50 rounded-lg">
              <h4 className="text-xl font-semibold text-gray-800 mb-4">Telefone</h4>
              <p className="text-lg text-gray-700">(11) 98765-4321</p>
              <p className="text-sm text-gray-600 mt-2">Atendimento: Seg-Sáb das 8h às 18h</p>
            </div>
            <div className="p-6 bg-pink-50 rounded-lg">
              <h4 className="text-xl font-semibold text-gray-800 mb-4">Endereço</h4>
              <p className="text-lg text-gray-700">Rua das Delícias, 123</p>
              <p className="text-sm text-gray-600 mt-2">Centro - São Paulo, SP</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;