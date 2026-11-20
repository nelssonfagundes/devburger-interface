// endereços das telas, num lugar só
export const paths = {
  login: '/login',
  register: '/cadastro',
  home: '/',
  menu: '/cardapio',
  cart: '/carrinho',
  checkout: '/checkout',
  complete: '/pedido-concluido',
  admin: '/admin',
  adminOrders: '/admin/pedidos',
  adminProducts: '/admin/produtos',
  adminNewProduct: '/admin/novo-produto',
  adminEditProduct: '/admin/editar-produto',
}

export const orderStatusOptions = [
  { id: 0, value: 'Todos', label: 'Todos' },
  { id: 1, value: 'Pedido realizado', label: 'Pedido realizado' },
  { id: 2, value: 'Em preparação', label: 'Em preparação' },
  { id: 3, value: 'Saiu para entrega', label: 'Saiu para entrega' },
  { id: 4, value: 'Entregue', label: 'Entregue' },
  { id: 5, value: 'Cancelado', label: 'Cancelado' },
]
