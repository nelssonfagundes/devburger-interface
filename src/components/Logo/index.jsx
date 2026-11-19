import styled from 'styled-components'

import { theme } from '../../styles/globalStyles'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;

  svg {
    width: ${({ $size }) => $size}px;
    height: ${({ $size }) => $size}px;
    filter: drop-shadow(0 10px 30px rgba(151, 88, 166, 0.5));
  }

  strong {
    font-family: 'Road Rage', cursive;
    font-weight: 400;
    font-size: ${({ $size }) => $size / 3.2}px;
    color: ${theme.white};
    line-height: 1;

    span {
      color: ${theme.purple};
    }
  }
`

export default function Logo({ size = 200, showName = true }) {
  return (
    <Wrapper $size={size}>
      <svg viewBox="0 0 120 120" aria-hidden="true">
        <circle cx="60" cy="60" r="56" fill={theme.purple} />
        <circle cx="60" cy="60" r="56" fill="none" stroke="#fff" strokeOpacity="0.2" strokeWidth="4" />
        <path d="M24 56c0-17 16-28 36-28s36 11 36 28z" fill="#f4b740" />
        <g fill="#fff8e1">
          <ellipse cx="44" cy="40" rx="3" ry="1.6" />
          <ellipse cx="60" cy="35" rx="3" ry="1.6" />
          <ellipse cx="76" cy="40" rx="3" ry="1.6" />
        </g>
        <path d="M22 60c6 5 12-3 19 2s12-3 19 2 12-3 19 2 12-3 19 2v3H22z" fill="#5c9d2b" />
        <rect x="20" y="64" width="80" height="11" rx="5.5" fill="#6b3b2a" />
        <path d="M24 79h72c0 9-7 14-16 14H40c-9 0-16-5-16-14z" fill="#f4b740" />
      </svg>
      {showName && (
        <strong>
          Dev<span>Burger</span>
        </strong>
      )}
    </Wrapper>
  )
}
