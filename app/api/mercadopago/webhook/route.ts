// app/api/mercadopago/webhook/route.ts
// Recebe notificações do Mercado Pago. Quando um pagamento é aprovado,
// cria o registro do cliente no Supabase com status 'aguardando_cadastro'.

import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

export async function POST(req: NextRequest) {
  return processarNotificacao(req)
}

export async function GET(req: NextRequest) {
  return processarNotificacao(req)
}

async function processarNotificacao(req: NextRequest) {
  try {
    const supabase = createAdminClient()
    const searchParams = req.nextUrl.searchParams

    let body: { type?: string; data?: { id?: string } } = {}
    try {
      body = await req.json()
    } catch {
      // notificações GET não têm corpo — segue só com query params
    }

    const paymentId = searchParams.get('data.id') || body?.data?.id
    const topic = searchParams.get('type') || body?.type

    if (topic !== 'payment' || !paymentId) {
      return NextResponse.json({ ignored: true })
    }

    const paymentRes = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
      headers: { Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}` },
    })
    const payment = await paymentRes.json()

    await supabase.from('eventos_pagamento').insert({
      tipo_evento: `payment.${payment.status}`,
      payload_raw: payment,
    })

    if (payment.status !== 'approved') {
      return NextResponse.json({ status: payment.status, processado: false })
    }

    const email = payment.payer?.email
    const plano = payment.metadata?.plano || null

    if (!email) {
      console.error('Pagamento aprovado sem e-mail do pagador:', paymentId)
      return NextResponse.json({ erro: 'sem_email' })
    }

    const { data: existente } = await supabase
      .from('clientes')
      .select('id')
      .eq('email', email)
      .maybeSingle()

    if (existente) {
      return NextResponse.json({ status: 'ja_existe', cliente_id: existente.id })
    }

    const slug = email
      .split('@')[0]
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .concat('-', Math.random().toString(36).slice(2, 6))

    const { data: novoCliente, error } = await supabase
      .from('clientes')
      .insert({
        email,
        nome_negocio: 'A definir no cadastro',
        slug,
        status: 'aguardando_cadastro',
        mp_payer_id: String(payment.payer?.id || ''),
        mp_plano: plano,
      })
      .select('id, cadastro_token')
      .single()

    if (error) {
      console.error('Erro ao criar cliente:', error)
      return NextResponse.json({ error: 'Erro ao criar cliente' }, { status: 500 })
    }

    // TODO: disparar e-mail/whatsapp com o link:
    // `${process.env.NEXT_PUBLIC_BASE_URL}/cadastro/${novoCliente.cadastro_token}`

    return NextResponse.json({ status: 'cliente_criado', cliente_id: novoCliente.id })
  } catch (err) {
    console.error('Erro webhook mercadopago:', err)
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}
