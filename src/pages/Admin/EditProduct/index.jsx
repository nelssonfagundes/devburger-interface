import { Navigate, useLocation } from 'react-router-dom'

import { paths } from '../../../constants/paths'
import ProductForm from '../ProductForm'

export default function EditProduct() {
  const { state } = useLocation()

  // o produto vem da tela de Produtos; sem ele, volta para a lista
  if (!state?.product) {
    return <Navigate to={paths.adminProducts} replace />
  }

  return <ProductForm product={state.product} />
}
