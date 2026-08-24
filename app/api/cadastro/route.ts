// app/api/cadastro/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { token, nome_negocio, whatsapp, descricao_negocio, link_whatsapp } = body

    if (!token || !nome_negocio || !whatsapp) {
      return NextResponse.json({ error: 'Campos obrigatórios ausentes' }, { status: 400 })
    }

    const supabase = createAdminClient()

    const { data, error } = await supabase.rpc('preencher_cadastro', {
      p_token: token,
      p_nome_negocio: nome_negocio,
      p_whatsapp: whatsapp,
      p_descricao_negocio: descricao_negocio || null,
      p_link_whatsapp: link_whatsapp || null,
    })

    if (error) {
      console.error('Erro RPC preencher_cadastro:', error)
      return NextResponse.json({ error: 'Erro ao salvar cadastro' }, { status: 500 })
    }

    if (data === false) {
      return NextResponse.json({ error: 'Token inválido ou cadastro já preenchido' }, { status: 400 })
    }

    return NextResponse.json({ sucesso: true })
  } catch (err) {
    console.error('Erro rota cadastro:', err)
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}
