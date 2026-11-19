import { Link as RouterLink } from 'react-router-dom'
import styled from 'styled-components'

import { theme } from '../../styles/globalStyles'

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 100vh;
  background: ${theme.darker};

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
  }
`

export const LeftContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  background:
    radial-gradient(circle at 50% 45%, rgba(151, 88, 166, 0.35), transparent 60%),
    repeating-linear-gradient(45deg, #161616 0 14px, #1a1a1a 14px 28px);

  @media (max-width: 860px) {
    padding: 40px 20px 10px;

    svg {
      width: 110px !important;
      height: 110px !important;
    }
  }
`

export const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 40px clamp(20px, 7vw, 100px);
  background: ${theme.dark};

  @media (max-width: 860px) {
    padding: 30px 20px 50px;
  }
`

export const Title = styled.h1`
  color: ${theme.white};
  font-size: 34px;
  font-weight: 500;
  line-height: 1.3;
  text-align: center;
  margin-bottom: 30px;

  span {
    font-family: 'Road Rage', cursive;
    font-weight: 400;
    font-size: 44px;
    color: ${theme.purple};
  }

  @media (max-width: 860px) {
    font-size: 24px;

    span {
      font-size: 34px;
    }
  }
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 18px;
  width: 100%;
  max-width: 420px;
  margin: 0 auto;
`

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  label {
    color: ${theme.white};
    font-size: 16px;
    font-weight: 500;
  }

  input {
    height: 52px;
    border: 2px solid transparent;
    border-radius: 6px;
    padding: 0 16px;
    font-size: 16px;
    background: ${theme.white};
    transition: border-color 0.2s;

    &:focus {
      border-color: ${theme.purple};
    }
  }

  p {
    color: #ff6b6b;
    font-size: 13px;
    min-height: 16px;
  }
`

export const Footer = styled.p`
  color: ${theme.white};
  text-align: center;
  margin-top: 6px;
`

export const Link = styled(RouterLink)`
  color: ${theme.white};
  font-weight: 700;
  text-decoration: underline;

  &:hover {
    color: ${theme.purple};
  }
`
