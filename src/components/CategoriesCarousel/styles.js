import styled from 'styled-components'

import { theme } from '../../styles/globalStyles'

export const Container = styled.section`
  padding: 40px clamp(16px, 5vw, 60px) 10px;

  .carousel-item {
    padding: 0 8px;
  }

  .empty {
    color: ${theme.gray};
  }
`

export const Title = styled.h2`
  position: relative;
  color: ${theme.purple};
  font-size: 32px;
  font-weight: 800;
  text-align: center;
  margin-bottom: 30px;

  &::after {
    content: '';
    position: absolute;
    left: 50%;
    bottom: -8px;
    width: 56px;
    height: 4px;
    border-radius: 2px;
    transform: translateX(-50%);
    background: ${theme.purple};
  }
`

export const CategoryCard = styled.div`
  display: flex;
  align-items: flex-end;
  height: 220px;
  border-radius: 16px;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.02);
  }

  padding: 16px;
  background:
    linear-gradient(to top, rgba(0, 0, 0, 0.75), transparent 55%),
    url(${({ $image }) => $image}) center / cover,
    ${theme.dark};

  p {
    color: ${theme.white};
    font-size: 22px;
    font-weight: 700;
    background: rgba(0, 0, 0, 0.45);
    border-radius: 30px;
    padding: 4px 16px;
  }

  @media (max-width: 690px) {
    height: 160px;

    p {
      font-size: 16px;
    }
  }
`
