import { Navigate, Route, Routes } from 'react-router-dom'

import { useUser } from '../hooks/UserContext'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'

// só deixa entrar quem fez login
function PrivateRoute({ children }) {
  const { userInfo } = useUser()

  return userInfo.token ? children : <Navigate to="/login" replace />
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Register />} />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
