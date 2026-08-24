// app/api/mercadopago/criar-preferencia/route.ts
// Cria uma preferência de pagamento (Checkout Pro) no Mercado Pago
// e retorna a URL (init_point) para redirecionar o cliente.

import { NextRequest, NextResponse } from 'next/server'

const PRECOS: Record<string, { valor: number; titulo: string }> = {
  mensal: { valor: 97.0, titulo: 'Genix Catálogo - Plano Mensal' },
  anual: { valor: 970.0, titulo: 'Genix Catálogo - Plano Anual' },
}

export async function POST(req: NextRequest) {
  try {
    const { plano } = await req.json()

    const escolhido = PRECOS[plano]
    if (!escolhido) {
      return NextResponse.json({ error: 'Plano inválido' }, { status: 400 })
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

    const preference = {
      items: [
        {
          title: escolhido.titulo,
          quantity: 1,
          unit_price: escolhido.valor,
          currency_id: 'BRL',
        },
      ],
      back_urls: {
        success: `${baseUrl}/#cadastro`,
        failure: `${baseUrl}/#planos`,
        pending: `${baseUrl}/#planos`,
      },
      auto_return: 'approved',
      notification_url: `${baseUrl}/api/mercadopago/webhook`,
      metadata: { plano },
    }

    const response = await fetch('https://api.mercadopago.com/checkout/preferences', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
      },
      body: JSON.stringify(preference),
    })

    const data = await response.json()

    if (!response.ok) {
      console.error('Erro Mercado Pago:', data)
      return NextResponse.json(
        { error: 'Erro ao criar preferência', detalhes: data },
        { status: 500 }
      )
    }

    return NextResponse.json({ init_point: data.init_point })
  } catch (err) {
    console.error('Erro criar-preferencia:', err)
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}
