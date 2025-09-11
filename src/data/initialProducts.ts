import { Product } from '../types';

export const initialProducts: Product[] = [
  {
    id: '1',
    name: 'Bolo de Chocolate Tradicional',
    description: 'Delicioso bolo de chocolate com cobertura cremosa, massa fofinha e recheio especial. Perfeito para aniversários e comemorações.',
    price: 45.90,
    image: 'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'aniversario',
    active: true
  },
  {
    id: '2',
    name: 'Torta de Morango Premium',
    description: 'Torta artesanal com morangos frescos, creme chantilly e massa crocante. Uma explosão de sabor e frescor.',
    price: 65.00,
    image: 'https://images.pexels.com/photos/1070850/pexels-photo-1070850.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'casamento',
    active: true
  },
  {
    id: '3',
    name: 'Brigadeiros Gourmet',
    description: 'Caixa com 12 brigadeiros artesanais em sabores variados: tradicional, beijinho, casadinho e pistache.',
    price: 28.50,
    image: 'https://images.pexels.com/photos/8828464/pexels-photo-8828464.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'doces',
    active: true
  },
  {
    id: '4',
    name: 'Bolo Diet de Cenoura',
    description: 'Bolo especial sem açúcar, feito com cenoura fresca e cobertura diet de chocolate. Sabor sem culpa.',
    price: 38.90,
    image: 'https://images.pexels.com/photos/6210745/pexels-photo-6210745.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'diet',
    active: true
  },
  {
    id: '5',
    name: 'Torta Holandesa',
    description: 'Clássica torta holandesa com biscoito, creme de baunilha e cobertura de chocolate belga.',
    price: 55.00,
    image: 'https://images.pexels.com/photos/5490800/pexels-photo-5490800.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'casamento',
    active: true
  },
  {
    id: '6',
    name: 'Cupcakes Decorados',
    description: 'Kit com 6 cupcakes artesanais decorados à mão, sabores variados: baunilha, chocolate e morango.',
    price: 24.90,
    image: 'https://images.pexels.com/photos/1028714/pexels-photo-1028714.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'aniversario',
    active: true
  },
  {
    id: '7',
    name: 'Pavê de Chocolate',
    description: 'Tradicional pavê com camadas de biscoito champagne, creme de chocolate e cobertura especial.',
    price: 42.00,
    image: 'https://images.pexels.com/photos/806363/pexels-photo-806363.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'doces',
    active: true
  },
  {
    id: '8',
    name: 'Bolo Red Velvet',
    description: 'Sofisticado bolo red velvet com cream cheese, perfeito para ocasiões especiais.',
    price: 58.90,
    image: 'https://images.pexels.com/photos/4110463/pexels-photo-4110463.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'casamento',
    active: true
  }
];