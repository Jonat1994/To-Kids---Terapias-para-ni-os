import { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '../config/firebase'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Verificar si hay sesión activa
    const checkSession = async () => {
      try {
        const { data } = await supabase.auth.getSession()
        setUser(data?.session?.user || null)
      } catch (err) {
        console.warn('Advertencia: No se pudo verificar la sesión. Verifica tu configuración de Supabase en .env.local', err)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    // Solo intenta verificar la sesión si las variables de entorno están configuradas
    if (import.meta.env.VITE_SUPABASE_URL && !import.meta.env.VITE_SUPABASE_URL.includes('example')) {
      checkSession()
    } else {
      console.warn('⚠️ Supabase no está configurado. Por favor, actualiza .env.local con tus credenciales.')
      setLoading(false)
    }

    // Escuchar cambios en la autenticación
    let subscription
    try {
      const { data } = supabase.auth.onAuthStateChange((event, session) => {
        setUser(session?.user || null)
      })
      subscription = data.subscription
    } catch (err) {
      console.warn('No se pudo configurar el listener de autenticación:', err)
    }

    return () => subscription?.unsubscribe()
  }, [])

  const register = async (email, password, metadata = {}) => {
    try {
      setError(null)
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata
        }
      })
      
      if (signUpError) throw signUpError
      return data.user
    } catch (err) {
      const errorMsg = err.message || 'Error en el registro'
      setError(errorMsg)
      throw err
    }
  }

  const login = async (email, password) => {
    try {
      setError(null)
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password
      })
      
      if (signInError) throw signInError
      return data.user
    } catch (err) {
      const errorMsg = err.message || 'Error en el inicio de sesión'
      setError(errorMsg)
      throw err
    }
  }

  const loginWithGoogle = async () => {
    try {
      setError(null)
      const { data, error: googleError } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/dashboard`
        }
      })
      
      if (googleError) throw googleError
      return data
    } catch (err) {
      const errorMsg = err.message || 'Error al iniciar sesión con Google'
      setError(errorMsg)
      throw err
    }
  }

  const logout = async () => {
    try {
      setError(null)
      const { error: signOutError } = await supabase.auth.signOut()
      
      if (signOutError) throw signOutError
      setUser(null)
    } catch (err) {
      const errorMsg = err.message || 'Error al cerrar sesión'
      setError(errorMsg)
      throw err
    }
  }

  const resetPassword = async (email) => {
    try {
      setError(null)
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`
      })
      
      if (resetError) throw resetError
      return { success: true }
    } catch (err) {
      const errorMsg = err.message || 'Error al enviar enlace de recuperación'
      setError(errorMsg)
      throw err
    }
  }

  const updatePassword = async (newPassword) => {
    try {
      setError(null)
      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword
      })
      
      if (updateError) throw updateError
      return { success: true }
    } catch (err) {
      const errorMsg = err.message || 'Error al actualizar contraseña'
      setError(errorMsg)
      throw err
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, error, register, login, loginWithGoogle, logout, resetPassword, updatePassword }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider')
  }
  return context
}
