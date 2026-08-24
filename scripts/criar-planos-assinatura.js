// scripts/criar-planos-assinatura.js
//
// Rode este script UMA ÚNICA VEZ para criar os planos de assinatura
// (mensal e anual) no Mercado Pago. Ele imprime no terminal o "id" e o
// "init_point" (link permanente de assinatura) de cada plano — copie
// esses links para dentro de components/landing/Pricing.tsx, substituindo
// os links antigos do mpago.la.
//
// Como rodar (na raiz do projeto, com o .env.local já preenchido):
//   node -r dotenv/config scripts/criar-planos-assinatura.js dotenv_config_path=.env.local
//
// Se não tiver o pacote "dotenv" instalado:
//   npm install dotenv --save-dev

const ACCESS_TOKEN = process.env.MP_ACCESS_TOKEN
// O Mercado Pago não aceita "localhost" como back_url — usamos sempre o
// domínio de produção aqui, independente do que estiver em NEXT_PUBLIC_BASE_URL.
const BASE_URL = 'https://genixcatalog.app.br'

if (!ACCESS_TOKEN) {
  console.error('❌ MP_ACCESS_TOKEN não encontrado. Confira o .env.local e o comando de execução.')
  process.exit(1)
}

const planos = [
  {
    reason: 'Genix Catálogo - Plano Mensal',
    auto_recurring: {
      frequency: 1,
      frequency_type: 'months',
      transaction_amount: 27.99,
      currency_id: 'BRL',
    },
  },
  {
    reason: 'Genix Catálogo - Plano Anual',
    auto_recurring: {
      frequency: 12,
      frequency_type: 'months',
      transaction_amount: 279.90,
      currency_id: 'BRL',
    },
  },
]

async function criarPlano(plano) {
  const body = {
    reason: plano.reason,
    auto_recurring: plano.auto_recurring,
    back_url: `${BASE_URL}/#plano`,
    status: 'active',
  }

  const res = await fetch('https://api.mercadopago.com/preapproval_plan', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
    body: JSON.stringify(body),
  })

  const data = await res.json()

  if (!res.ok) {
    console.error(`❌ Erro ao criar "${plano.reason}":`, data)
    return
  }

  console.log(`\n✅ ${plano.reason}`)
  console.log(`   id: ${data.id}`)
  console.log(`   link de assinatura (init_point): ${data.init_point}`)
}

async function main() {
  console.log('Criando planos de assinatura no Mercado Pago...')
  for (const plano of planos) {
    await criarPlano(plano)
  }
  console.log('\nCopie os links acima para components/landing/Pricing.tsx')
}

main()