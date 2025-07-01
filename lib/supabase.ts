import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://repvjlxuilebdahpnnua.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJlcHZqbHh1aWxlYmRhaHBubnVhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk2NTYyNTcsImV4cCI6MjA2NTIzMjI1N30.HRRO7mH-KZPtNFzP6YEW8mO4z1r5lYRr-X9snvHIiXY"

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})