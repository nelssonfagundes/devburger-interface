import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import styled from 'styled-components'

import CardProduct from '../../components/CardProduct'
import { paths } from '../../constants/paths'
import { api } from '../../services/api'
import { formatPrice } from '../../utils/formatPrice'

const Banner = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 220px;
  padding: 30px 20px;
  text-align: center;
  background:
    radial-gradient(circle at 70% 40%, rgba(151, 88, 166, 0.55), transparent 55%),
    ${({ theme }) => theme.darker};

  h1 {
    font-family: 'Road Rage', cursive;
    font-weight: 400;
    font-size: clamp(48px, 8vw, 80px);
    color: ${({ theme }) => theme.white};
    line-height: 1;

    span {
      color: ${({ theme }) => theme.purple};
    }
  }

  p {
    color: ${({ theme }) => theme.light};
    margin-top: 8px;
  }
`

const Categories = styled.nav`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
  padding: 30px 20px 10px;

  button {
    border: 2px solid ${({ theme }) => theme.purple};
    background: transparent;
    color: ${({ theme }) => theme.purple};
    border-radius: 30px;
    padding: 8px 20px;
    font-weight: 700;
    transition: all 0.2s;

    &.active,
    &:hover {
      background: ${({ theme }) => theme.purple};
      color: ${({ theme }) => theme.white};
    }
  }
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
  gap: 20px;
  padding: 30px clamp(16px, 5vw, 60px) 60px;

  @media (max-width: 560px) {
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }
`

const BackButton = styled.button`
  display: block;
  margin: 0 auto 50px;
  border: none;
  background: none;
  color: ${({ theme }) => theme.purple};
  font-weight: 700;
  text-decoration: underline;
`

export default function Menu() {
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()

  // a categoria escolhida fica no endereço: /cardapio?categoria=2
  const activeCategory = Number(searchParams.get('categoria')) || 0

  useEffect(() => {
    async function loadData() {
      const [{ data: categoriesData }, { data: productsData }] = await Promise.all([
        api.get('/categories'),
        api.get('/products'),
      ])

      setCategories([{ id: 0, name: 'Todas' }, ...categoriesData])
      setProducts(
        productsData.map((product) => ({
          ...product,
          formattedPrice: formatPrice(product.price),
        })),
      )
    }

    loadData().catch(() => {})
  }, [])

  // filter: mostra só os produtos da categoria escolhida
  const filteredProducts =
    activeCategory === 0
      ? products
      : products.filter((product) => product.category?.id === activeCategory)

  const selectCategory = (id) => {
    setSearchParams(id === 0 ? {} : { categoria: String(id) })
  }

  return (
    <>
      <Banner>
        <h1>
          Cardápio<span>.</span>
        </h1>
        <p>Escolha o seu e monte o pedido do seu jeito.</p>
      </Banner>

      <Categories>
        {categories.map((category) => (
          <button
            key={category.id}
            type="button"
            className={category.id === activeCategory ? 'active' : ''}
            onClick={() => selectCategory(category.id)}
          >
            {category.name}
          </button>
        ))}
      </Categories>

      <Grid>
        {filteredProducts.map((product) => (
          <CardProduct key={product.id} product={product} />
        ))}
      </Grid>

      <BackButton type="button" onClick={() => navigate(paths.home)}>
        ← Voltar para a Home
      </BackButton>
    </>
  )
}
