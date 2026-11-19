# 🍔 DevBurger Interface — Parte I

Front-end da hamburgueria DevBurger, projeto do DevClub Full Stack (React, Parte I).
Desenvolvido com ajuda de inteligência artificial (Claude), seguindo a sequência das aulas.
Consome a [DevBurger API](https://github.com/nelssonfagundes/devburger-api).

## Tecnologias

- **React 18 + Vite**
- **Styled-Components**: estilos globais e de cada componente
- **React Hook Form + Yup**: formulários com validação
- **Axios**: conexão com a API, com o token enviado automaticamente
- **React Toastify**: notificações
- **React Router DOM**: navegação e rota protegida
- **React Multi Carousel**: carrosséis de categorias e ofertas
- **Context API + Local Storage**: dados do usuário logado
- **ESLint + Prettier**: padronização do código

## Telas

- **Login**: validação dos campos, mensagens de erro e notificação de sucesso
- **Cadastro**: nome, e-mail, senha e confirmação; avisa se o e-mail já existe
- **Home** (só para quem está logado): banner, carrossel de categorias e carrossel de ofertas

## Como rodar

A API precisa estar ligada (`npm run dev` no projeto `devburger-api`).

```bash
npm install
npm run dev
```

Abra `http://localhost:5173` no navegador.

## Estrutura

```
src/
├── components/   Button, Header, Logo, CategoriesCarousel, OffersCarousel
├── hooks/        UserContext (dados do usuário + local storage)
├── pages/        Login, Register, Home
├── routes/       rotas e rota protegida
├── services/     api (axios)
├── styles/       estilos globais e cores
└── utils/        formatPrice
```
