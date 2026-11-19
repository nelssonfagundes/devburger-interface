import axios from 'axios'

export const STORAGE_KEY = 'devburger:userData'

export const api = axios.create({
  baseURL: 'http://localhost:3001',
})

// envia o token em toda requisição
api.interceptors.request.use((config) => {
  const userData = localStorage.getItem(STORAGE_KEY)
  const token = userData && JSON.parse(userData).token

  if (token) {
    config.headers.authorization = `Bearer ${token}`
  }

  return config
})

// token vencido ou inválido: volta para o login
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const isLogin = error.config?.url === '/session'

    if (error.response?.status === 401 && !isLogin) {
      localStorage.removeItem(STORAGE_KEY)
      window.location.href = '/login'
    }

    return Promise.reject(error)
  },
)
