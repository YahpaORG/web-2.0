'use client'

import type { User } from '@/payload/payload-types'
import { createContext, ReactNode, useContext, useEffect, useState } from 'react'

type AuthContext = {
  user?: User | null
  login: (args: LoginInput) => Promise<User | null | undefined>
  signup: (args: SignUpInput) => Promise<User | null | undefined>
  logout: () => Promise<void>
}

type SignUpInput = {
  email: string
  password: string
  firstName: string
  lastName: string
}

type LoginInput = {
  email: string
  password: string
}

const AuthContext = createContext({} as AuthContext)

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>()

  const rest = async (
    url: string,
    args?: any,
    options?: RequestInit,
  ): Promise<User | null | undefined> => {
    const method = options?.method || 'POST'
    try {
      const res = await fetch(url, {
        method,
        ...(method === 'POST' ? { body: JSON.stringify(args) } : {}),
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        ...options,
      })

      const { errors, user } = await res.json()

      if (errors) {
        throw new Error(errors[0].message)
      }

      if (res.ok) {
        return user
      }
    } catch (e: unknown) {
      throw new Error(e as string)
    }
  }

  const signup = async (args: SignUpInput) => {
    const user = await rest(`${process.env.NEXT_PUBLIC_CMS_URL}/api/users`, args)
    setUser(user)
    return user
  }

  const login = async (args: LoginInput) => {
    const user = await rest(`${process.env.NEXT_PUBLIC_CMS_URL}/api/users/login`, args)
    setUser(user)
    return user
  }

  const logout = async () => {
    await rest(`${process.env.NEXT_PUBLIC_CMS_URL}/api/users/logout`)
    setUser(null)
    return
  }

  // On mount, get user and set
  useEffect(() => {
    const fetchMe = async () => {
      const user = await rest(
        `${process.env.NEXT_PUBLIC_CMS_URL}/api/users/me`,
        {},
        {
          method: 'GET',
        },
      )
      console.log('fetchMe', user)
      setUser(user)
    }
    fetchMe()
  }, [])

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>{children}</AuthContext.Provider>
  )
}
