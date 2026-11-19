import { createContext, useContext, useState } from 'react'

import { STORAGE_KEY } from '../services/api'

const UserContext = createContext({})

function readStorage() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}
  } catch {
    return {}
  }
}

export function UserProvider({ children }) {
  const [userInfo, setUserInfo] = useState(readStorage)

  // guarda os dados do login no estado e no local storage
  const putUserData = (userData) => {
    setUserInfo(userData)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userData))
  }

  const logout = () => {
    setUserInfo({})
    localStorage.removeItem(STORAGE_KEY)
  }

  return (
    <UserContext.Provider value={{ userInfo, putUserData, logout }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)

  if (!context) {
    throw new Error('useUser precisa estar dentro do UserProvider')
  }

  return context
}
