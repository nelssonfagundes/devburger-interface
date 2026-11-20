import { toast } from 'react-toastify'
import styled from 'styled-components'

import { useCart } from '../../hooks/CartContext'

export const Card = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  border-radius: 16px;
  overflow: hidden;
  background: ${({ theme }) => theme.white};
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);

  img {
    width: 100%;
    aspect-ratio: 1;
    object-fit: cover;
    background: ${({ theme }) => theme.dark};
  }

  .badge {
    position: absolute;
    top: 12px;
    left: 12px;
    background: ${({ theme }) => theme.green};
    color: ${({ theme }) => theme.white};
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
      color: ${({ theme }) => theme.dark};
      font-size: 18px;
    }

    small {
      color: ${({ theme }) => theme.gray};
    }

    strong {
      color: ${({ theme }) => theme.purple};
      font-size: 22px;
      margin-top: 6px;
    }
  }

  button {
    margin: 10px 16px 16px;
    height: 42px;
    border: none;
    border-radius: 8px;
    background: ${({ theme }) => theme.purple};
    color: ${({ theme }) => theme.white};
    font-weight: 700;
    transition: background 0.2s;

    &:hover {
      background: ${({ theme }) => theme.purpleDark};
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

export default function CardProduct({ product }) {
  const { putProductInCart } = useCart()

  const handleAdd = () => {
    putProductInCart(product)
    toast.success(`${product.name} adicionado ao carrinho 🛒`)
  }

  return (
    <Card>
      <img src={product.url} alt={product.name} />
      {product.offer && <span className="badge">Oferta</span>}
      <div className="info">
        <h3>{product.name}</h3>
        <small>{product.category?.name}</small>
        <strong>{product.formattedPrice}</strong>
      </div>
      <button type="button" onClick={handleAdd}>
        Adicionar
      </button>
    </Card>
  )
}
