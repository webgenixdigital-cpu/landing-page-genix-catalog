// lib/supabase/admin.ts
// ATENÇÃO: usa a service_role key, que ignora TODAS as políticas de RLS.
// Só importe este arquivo dentro de Route Handlers (app/api/**/route.ts).
// NUNCA importe em um componente "use client" nem em código que roda no navegador.

import { createClient as createSupabaseClient } from '@supabase/supabase-js'

export function createAdminClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  )
}
