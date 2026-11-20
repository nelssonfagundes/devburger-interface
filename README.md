# 🍔 DevBurger Interface

Front-end da hamburgueria DevBurger, projeto do DevClub Full Stack (React, partes I a IV).
Desenvolvido com ajuda de inteligência artificial (Claude), seguindo a sequência das aulas.
Consome a [DevBurger API](https://github.com/nelssonfagundes/devburger-api).

## Tecnologias

- **React 18 + Vite**
- **Styled-Components** com **ThemeProvider** (tema de cores)
- **React Router DOM**: rotas protegidas e layouts com **Outlet**
- **Context API**: usuário logado e carrinho (salvos no local storage)
- **React Hook Form + Yup**: formulários com validação
- **Axios**: conexão com a API, com o token enviado automaticamente
- **Stripe**: pagamento com cartão (modo de teste)
- **React Select**: seleção de status e de categoria
- **React Multi Carousel** e **React Toastify**
- **ESLint + Prettier**

## Telas

**Cliente**
- Login e Cadastro, com validação
- Home: banner, carrossel de categorias (clicável) e carrossel de ofertas
- Cardápio: filtro por categoria
- Carrinho: aumentar, diminuir e remover itens, com resumo do pedido e taxa de entrega
- Pagamento com Stripe e tela de pedido concluído

**Administrador** (menu lateral)
- Pedidos: tabela com filtro por status, itens de cada pedido e troca de status
- Produtos: lista com edição
- Novo produto e Editar produto: nome, preço, imagem, categoria e oferta

## Como rodar

A API precisa estar ligada (`npm run dev` no projeto `devburger-api`).

```bash
npm install
npm run dev
```

Abra `http://localhost:5173`.

### Pagamento (Stripe, modo de teste)

1. Copie `.env.example` para `.env` e coloque a **Publishable key** de teste (`pk_test_...`).
2. Na API, coloque a **Secret key** de teste (`sk_test_...`) no `.env` dela.
3. Cartão de teste: `4242 4242 4242 4242`, qualquer data futura e qualquer CVC.

Usuário administrador de exemplo (criado com `npm run seed` na API): `admin@devburger.com` / `123456`.

## Estrutura

```
src/
├── components/   Button, Header, Footer, SideMenu, Logo, CardProduct, CartItems, CartResume, carrosséis
├── constants/    caminhos das telas e status de pedido
├── hooks/        UserContext, CartContext e AppProvider
├── layouts/      UserLayout e AdminLayout (Outlet)
├── pages/        Login, Register, Home, Menu, Cart, Checkout, CompletePayment, Admin/*
├── routes/       rotas, rota protegida e rota de admin
├── services/     api (axios) e stripe
├── styles/       estilos globais e tema
└── utils/        formatPrice
```
