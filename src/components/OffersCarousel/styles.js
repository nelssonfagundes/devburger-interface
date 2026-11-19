import styled from 'styled-components'

import { theme } from '../../styles/globalStyles'
import { Container as BaseContainer } from '../CategoriesCarousel/styles'

export const Container = styled(BaseContainer)`
  padding-bottom: 60px;
`

export const OfferCard = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  border-radius: 16px;
  overflow: hidden;
  background: ${theme.white};
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);

  img {
    width: 100%;
    aspect-ratio: 1;
    object-fit: cover;
    background: ${theme.dark};
  }

  .badge {
    position: absolute;
    top: 12px;
    left: 12px;
    background: ${theme.green};
    color: ${theme.white};
    font-size: 12px;
    font-weight: 700;
    padding: 3px 10px;
    border-radius: 20px;
  }

  .info {
    display: flex;
    flex-direction: column;
    padding: 14px 16px 6px;
    flex: 1;

    h3 {
      color: ${theme.dark};
      font-size: 18px;
    }

    small {
      color: ${theme.gray};
    }

    strong {
      color: ${theme.purple};
      font-size: 22px;
      margin-top: 6px;
    }
  }

  button {
    margin: 10px 16px 16px;
    height: 42px;
    border: none;
    border-radius: 8px;
    background: ${theme.purple};
    color: ${theme.white};
    font-weight: 700;
    transition: background 0.2s;

    &:hover {
      background: ${theme.purpleDark};
    }
  }

  @media (max-width: 690px) {
    .info h3 {
      font-size: 15px;
    }

    .info strong {
      font-size: 17px;
    }
  }
`
