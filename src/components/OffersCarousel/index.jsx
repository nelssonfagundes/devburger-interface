import { useEffect, useState } from 'react'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

import { api } from '../../services/api'
import { formatPrice } from '../../utils/formatPrice'
import CardProduct from '../CardProduct'
import { responsive } from '../CategoriesCarousel'
import { Title } from '../CategoriesCarousel/styles'
import { Container } from './styles'

export default function OffersCarousel() {
  const [offers, setOffers] = useState([])

  useEffect(() => {
    async function loadProducts() {
      const { data } = await api.get('/products')

      // filter: só os produtos em oferta | map: já com o preço formatado
      const onlyOffers = data
        .filter((product) => product.offer)
        .map((product) => ({
          ...product,
          formattedPrice: formatPrice(product.price),
        }))

      setOffers(onlyOffers)
    }

    loadProducts().catch(() => setOffers([]))
  }, [])

  return (
    <Container>
      <Title>Ofertas do dia</Title>

      {offers.length === 0 ? (
        <p className="empty">Nenhuma oferta no momento.</p>
      ) : (
        <Carousel responsive={responsive} infinite itemClass="carousel-item">
          {offers.map((product) => (
            <CardProduct key={product.id} product={product} />
          ))}
        </Carousel>
      )}
    </Container>
  )
}
