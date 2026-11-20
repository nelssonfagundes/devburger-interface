import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { paths } from '../../../constants/paths'
import { api } from '../../../services/api'
import { formatPrice } from '../../../utils/formatPrice'
import { PageTitle, TableBox } from '../styles'

export default function Products() {
  const [products, setProducts] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    async function loadProducts() {
      const { data } = await api.get('/products')
      setProducts(data)
    }

    loadProducts().catch(() => toast.error('Erro ao carregar os produtos'))
  }, [])

  const editProduct = (product) => {
    navigate(paths.adminEditProduct, { state: { product } })
  }

  return (
    <>
      <PageTitle>Produtos</PageTitle>

      <TableBox>
        <table>
          <thead>
            <tr>
              <th>Imagem</th>
              <th>Nome</th>
              <th>Categoria</th>
              <th>Preço</th>
              <th>Oferta</th>
              <th>Editar</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>
                  <img src={product.url} alt={product.name} />
                </td>
                <td>{product.name}</td>
                <td>{product.category?.name ?? '—'}</td>
                <td>{formatPrice(product.price)}</td>
                <td>{product.offer ? '✅' : '❌'}</td>
                <td>
                  <button
                    type="button"
                    onClick={() => editProduct(product)}
                    style={{ border: 'none', background: 'none', fontSize: 20 }}
                    aria-label={`Editar ${product.name}`}
                  >
                    ✏️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {products.length === 0 && (
          <p className="empty">Nenhum produto cadastrado.</p>
        )}
      </TableBox>
    </>
  )
}
