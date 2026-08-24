// lib/supabase/client.ts
// Use este cliente em componentes marcados com "use client"
// (formulários, botões, qualquer interação do navegador).

import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
