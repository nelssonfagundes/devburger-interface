import { useEffect, useState } from 'react'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import { toast } from 'react-toastify'

import { api } from '../../services/api'
import { formatPrice } from '../../utils/formatPrice'
import { responsive } from '../CategoriesCarousel'
import { Title } from '../CategoriesCarousel/styles'
import { Container, OfferCard } from './styles'

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
            <OfferCard key={product.id}>
              <img src={product.url} alt={product.name} />
              <span className="badge">Oferta</span>
              <div className="info">
                <h3>{product.name}</h3>
                <small>{product.category?.name}</small>
                <strong>{product.formattedPrice}</strong>
              </div>
              <button
                type="button"
                onClick={() => toast.info(`${product.name}: o carrinho chega na parte II 🛒`)}
              >
                Adicionar
              </button>
            </OfferCard>
          ))}
        </Carousel>
      )}
    </Container>
  )
}
