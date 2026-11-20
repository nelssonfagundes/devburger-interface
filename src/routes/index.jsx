import { Navigate, Route, Routes } from 'react-router-dom'

import { paths } from '../constants/paths'
import { useUser } from '../hooks/UserContext'
import AdminLayout from '../layouts/AdminLayout'
import UserLayout from '../layouts/UserLayout'
import EditProduct from '../pages/Admin/EditProduct'
import NewProduct from '../pages/Admin/NewProduct'
import Orders from '../pages/Admin/Orders'
import Products from '../pages/Admin/Products'
import Cart from '../pages/Cart'
import Checkout from '../pages/Checkout'
import CompletePayment from '../pages/CompletePayment'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Menu from '../pages/Menu'
import Register from '../pages/Register'

// só deixa entrar quem fez login
function PrivateRoute({ children }) {
  const { userInfo } = useUser()

  return userInfo.token ? children : <Navigate to={paths.login} replace />
}

// só deixa entrar administrador
function AdminRoute({ children }) {
  const { userInfo } = useUser()

  if (!userInfo.token) return <Navigate to={paths.login} replace />
  if (!userInfo.admin) return <Navigate to={paths.home} replace />

  return children
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path={paths.login} element={<Login />} />
      <Route path={paths.register} element={<Register />} />

      {/* telas do cliente: Header + página + Footer (Outlet) */}
      <Route
        element={
          <PrivateRoute>
            <UserLayout />
          </PrivateRoute>
        }
      >
        <Route path={paths.home} element={<Home />} />
        <Route path={paths.menu} element={<Menu />} />
        <Route path={paths.cart} element={<Cart />} />
        <Route path={paths.checkout} element={<Checkout />} />
        <Route path={paths.complete} element={<CompletePayment />} />
      </Route>

      {/* telas do admin: menu lateral + página (Outlet) */}
      <Route
        path={paths.admin}
        element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }
      >
        <Route index element={<Navigate to={paths.adminOrders} replace />} />
        <Route path="pedidos" element={<Orders />} />
        <Route path="produtos" element={<Products />} />
        <Route path="novo-produto" element={<NewProduct />} />
        <Route path="editar-produto" element={<EditProduct />} />
      </Route>

      <Route path="*" element={<Navigate to={paths.home} replace />} />
    </Routes>
  )
}
