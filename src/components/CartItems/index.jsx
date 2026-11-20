import styled from 'styled-components'

import { useCart } from '../../hooks/CartContext'
import { formatPrice } from '../../utils/formatPrice'

const Table = styled.div`
  background: ${({ theme }) => theme.white};
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06);

  .row {
    display: grid;
    grid-template-columns: 80px 1fr 110px 130px 110px 40px;
    align-items: center;
    gap: 12px;
    padding: 14px 20px;
    border-bottom: 1px solid ${({ theme }) => theme.lightGray};
  }

  .head {
    background: ${({ theme }) => theme.dark};
    color: ${({ theme }) => theme.white};
    font-weight: 700;
    font-size: 14px;
  }

  img {
    width: 70px;
    height: 70px;
    border-radius: 10px;
    object-fit: cover;
  }

  .name {
    font-weight: 700;
  }

  .total {
    font-weight: 700;
    color: ${({ theme }) => theme.purple};
  }

  .quantity {
    display: flex;
    align-items: center;
    gap: 10px;

    button {
      width: 30px;
      height: 30px;
      border: none;
      border-radius: 8px;
      background: ${({ theme }) => theme.purple};
      color: ${({ theme }) => theme.white};
      font-size: 18px;
      font-weight: 700;
    }
  }

  .delete {
    border: none;
    background: none;
    font-size: 20px;
  }

  .empty {
    padding: 40px 20px;
    text-align: center;
    color: ${({ theme }) => theme.gray};
    font-weight: 500;
  }

  @media (max-width: 760px) {
    .head {
      display: none;
    }

    .row {
      grid-template-columns: 70px 1fr 40px;
      grid-template-areas:
        'img name del'
        'img qty total';
    }

    img { grid-area: img; }
    .name { grid-area: name; }
    .unit { display: none; }
    .quantity { grid-area: qty; }
    .total { grid-area: total; text-align: right; }
    .delete { grid-area: del; }
  }
`

export default function CartItems() {
  const { cartProducts, increaseProduct, decreaseProduct, deleteProduct } =
    useCart()

  return (
    <Table>
      <div className="row head">
        <span />
        <span>Itens</span>
        <span>Preço</span>
        <span>Quantidade</span>
        <span>Total</span>
        <span />
      </div>

      {cartProducts.length === 0 ? (
        <p className="empty">Seu carrinho está vazio 🛒</p>
      ) : (
        cartProducts.map((product) => (
          <div className="row" key={product.id}>
            <img src={product.url} alt={product.name} />
            <span className="name">{product.name}</span>
            <span className="unit">{formatPrice(product.price)}</span>
            <div className="quantity">
              <button type="button" onClick={() => decreaseProduct(product.id)}>
                −
              </button>
              <span>{product.quantity}</span>
              <button type="button" onClick={() => increaseProduct(product.id)}>
                +
              </button>
            </div>
            <span className="total">
              {formatPrice(product.price * product.quantity)}
            </span>
            <button
              type="button"
              className="delete"
              aria-label={`Remover ${product.name}`}
              onClick={() => deleteProduct(product.id)}
            >
              🗑️
            </button>
          </div>
        ))
      )}
    </Table>
  )
}
