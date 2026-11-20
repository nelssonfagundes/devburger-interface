import { useEffect, useState } from 'react'
import Carousel from 'react-multi-carousel'
import { useNavigate } from 'react-router-dom'
import 'react-multi-carousel/lib/styles.css'

import { paths } from '../../constants/paths'
import { api } from '../../services/api'
import { CategoryCard, Container, Title } from './styles'

export const responsive = {
  desktop: { breakpoint: { max: 4000, min: 1280 }, items: 4 },
  tablet: { breakpoint: { max: 1280, min: 690 }, items: 3 },
  mobile: { breakpoint: { max: 690, min: 0 }, items: 2 },
}

export default function CategoriesCarousel() {
  const [categories, setCategories] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    async function loadCategories() {
      const { data } = await api.get('/categories')
      setCategories(data)
    }

    loadCategories().catch(() => setCategories([]))
  }, [])

  return (
    <Container>
      <Title>Categorias</Title>

      {categories.length === 0 ? (
        <p className="empty">Nenhuma categoria cadastrada ainda.</p>
      ) : (
        <Carousel responsive={responsive} infinite itemClass="carousel-item">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              $image={category.url}
              onClick={() => navigate(`${paths.menu}?categoria=${category.id}`)}
            >
              <p>{category.name}</p>
            </CategoryCard>
          ))}
        </Carousel>
      )}
    </Container>
  )
}
