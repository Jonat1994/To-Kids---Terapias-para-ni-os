import { createClient } from '@supabase/supabase-js'

// Variables de entorno para Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://tu-proyecto.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'tu-anon-key-aqui'

// Crear cliente de Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default supabase
