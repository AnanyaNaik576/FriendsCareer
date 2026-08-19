import React, { createContext, useContext, useState, useEffect } from "react"

const AuthContext = createContext(null)

const TOKEN_KEY = "friends_auth_token"
const USER_KEY = "friends_auth_user"

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY) || null)
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem(USER_KEY)
    if (!savedUser) return null
    try {
      return JSON.parse(savedUser)
    } catch {
      return null
    }
  })

  // Sync session changes to localStorage
  useEffect(() => {
    if (token) {
      localStorage.setItem(TOKEN_KEY, token)
    } else {
      localStorage.removeItem(TOKEN_KEY)
    }
  }, [token])

  useEffect(() => {
    if (user) {
      localStorage.setItem(USER_KEY, JSON.stringify(user))
    } else {
      localStorage.removeItem(USER_KEY)
    }
  }, [user])

  const loginUser = (newToken, userData) => {
    setToken(newToken)
    setUser(userData || { email: "user@example.com" })
  }

  const logoutUser = () => {
    setToken(null)
    setUser(null)
  }

  const value = {
    token,
    user,
    isAuthenticated: Boolean(token),
    login: loginUser,
    logout: logoutUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

/**
 * Custom hook to consume AuthContext safely.
 */
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
