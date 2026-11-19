import styled from 'styled-components'

import CategoriesCarousel from '../../components/CategoriesCarousel'
import Header from '../../components/Header'
import OffersCarousel from '../../components/OffersCarousel'
import { theme } from '../../styles/globalStyles'

const Banner = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 340px;
  padding: 40px 20px;
  text-align: center;
  background:
    radial-gradient(circle at 30% 40%, rgba(151, 88, 166, 0.55), transparent 55%),
    radial-gradient(circle at 75% 70%, rgba(92, 157, 43, 0.35), transparent 50%),
    ${theme.darker};

  h1 {
    font-family: 'Road Rage', cursive;
    font-weight: 400;
    font-size: clamp(56px, 10vw, 110px);
    line-height: 1;
    color: ${theme.white};

    span {
      color: ${theme.purple};
    }
  }

  p {
    color: ${theme.light};
    font-size: 18px;
    margin-top: 10px;
  }
`

export default function Home() {
  return (
    <main>
      <Header />

      <Banner>
        <div>
          <h1>
            Bem-vindo<span>!</span>
          </h1>
          <p>O hambúrguer favorito dos devs está a um clique de você.</p>
        </div>
      </Banner>

      <CategoriesCarousel />
      <OffersCarousel />
    </main>
  )
}
