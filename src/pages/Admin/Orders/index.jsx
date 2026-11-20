import { useEffect, useState } from 'react'
import Select from 'react-select'
import { toast } from 'react-toastify'
import styled from 'styled-components'

import { orderStatusOptions } from '../../../constants/paths'
import { api } from '../../../services/api'
import { formatPrice } from '../../../utils/formatPrice'
import { PageTitle, TableBox } from '../styles'

const Filters = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;

  button {
    border: 2px solid ${({ theme }) => theme.purple};
    background: transparent;
    color: ${({ theme }) => theme.purple};
    border-radius: 30px;
    padding: 6px 16px;
    font-weight: 700;

    &.active {
      background: ${({ theme }) => theme.purple};
      color: ${({ theme }) => theme.white};
    }
  }
`

const formatDate = (date) =>
  new Date(date).toLocaleString('pt-br', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })

export default function Orders() {
  const [orders, setOrders] = useState([])
  const [activeStatus, setActiveStatus] = useState('Todos')
  const [openId, setOpenId] = useState(null)

  useEffect(() => {
    async function loadOrders() {
      const { data } = await api.get('/orders')
      setOrders(data)
    }

    loadOrders().catch(() => toast.error('Erro ao carregar os pedidos'))
  }, [])

  const changeStatus = async (orderId, status) => {
    try {
      await api.put(`/orders/${orderId}`, { status })
      setOrders((current) =>
        current.map((order) =>
          order._id === orderId ? { ...order, status } : order,
        ),
      )
      toast.success('Status atualizado')
    } catch {
      toast.error('Não foi possível atualizar o status')
    }
  }

  const filteredOrders =
    activeStatus === 'Todos'
      ? orders
      : orders.filter((order) => order.status === activeStatus)

  const orderTotal = (order) =>
    order.products.reduce((acc, item) => acc + item.price * item.quantity, 0)

  return (
    <>
      <PageTitle>Pedidos</PageTitle>

      <Filters>
        {orderStatusOptions.map((option) => (
          <button
            key={option.id}
            type="button"
            className={option.value === activeStatus ? 'active' : ''}
            onClick={() => setActiveStatus(option.value)}
          >
            {option.label}
          </button>
        ))}
      </Filters>

      <TableBox>
        <table>
          <thead>
            <tr>
              <th />
              <th>Pedido</th>
              <th>Cliente</th>
              <th>Data</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <OrderRow
                key={order._id}
                order={order}
                total={orderTotal(order)}
                isOpen={openId === order._id}
                onToggle={() =>
                  setOpenId(openId === order._id ? null : order._id)
                }
                onChangeStatus={changeStatus}
              />
            ))}
          </tbody>
        </table>
        {filteredOrders.length === 0 && (
          <p className="empty">Nenhum pedido encontrado.</p>
        )}
      </TableBox>
    </>
  )
}

function OrderRow({ order, total, isOpen, onToggle, onChangeStatus }) {
  const options = orderStatusOptions.filter((option) => option.id !== 0)

  return (
    <>
      <tr>
        <td>
          <button
            type="button"
            onClick={onToggle}
            style={{ border: 'none', background: 'none', fontSize: 18 }}
            aria-label="Ver itens"
          >
            {isOpen ? '▾' : '▸'}
          </button>
        </td>
        <td>#{order._id.slice(-6)}</td>
        <td>{order.user.name}</td>
        <td>{formatDate(order.createdAt)}</td>
        <td>{formatPrice(total)}</td>
        <td style={{ minWidth: 200 }}>
          <Select
            options={options}
            value={options.find((option) => option.value === order.status)}
            onChange={(option) => onChangeStatus(order._id, option.value)}
            menuPortalTarget={document.body}
            styles={{ menuPortal: (base) => ({ ...base, zIndex: 50 }) }}
          />
        </td>
      </tr>
      {isOpen &&
        order.products.map((item) => (
          <tr key={`${order._id}-${item.id}`} style={{ background: '#fafafa' }}>
            <td />
            <td>
              <img src={item.url} alt={item.name} />
            </td>
            <td>{item.name}</td>
            <td>{item.category}</td>
            <td>
              {item.quantity} × {formatPrice(item.price)}
            </td>
            <td />
          </tr>
        ))}
    </>
  )
}
