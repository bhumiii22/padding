import { createClient } from '@supabase/supabase-js'

console.log('supabaseClient.js loading...')
console.log('Environment vars:', {
  VITE_SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL,
  VITE_SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY
})

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://ogvnrmfqjhunlwelxwhb.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ndm5ybWZxamh1bmx3ZWx4d2hiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAxODY1MTksImV4cCI6MjA4NTc2MjUxOX0.fnBBv2tUIKgF4LGeBfcchWMNqUNhb4Msro0-LFVXmLI'

console.log('Creating Supabase client with URL:', supabaseUrl)

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
)