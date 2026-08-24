# Genix Catálogo — Projeto Completo (Next.js 14)

## Como usar

Extraia este zip. O conteúdo dele **é** a raiz do seu projeto Next.js — ou
mescle com a pasta já criada pelo `create-next-app` (sem sobrescrever
`next.config.js`, `tailwind.config.ts`, `tsconfig.json`, `package.json`
nem `node_modules`, que devem vir do projeto original).

```bash
npm install @supabase/supabase-js @supabase/ssr
npm run dev
```

Confira o `.env.local.example` — copie para `.env.local` e preencha com
seus valores reais do Supabase e Mercado Pago.

Depois rode o `schema.sql` no SQL Editor do Supabase (se ainda não rodou).

## O que está pronto e funcionando

### Landing page (rota `/`)
Convertida do HTML original para componentes React, mantendo 100% do
design (paleta sage/gold/ivory, fontes Fraunces/Manrope/Caveat, mockup de
celular, animações). Componentes em `components/landing/`:
`Header`, `Hero`, `Trust`, `Compare`, `Benefits`, `HowItWorks`, `Pricing`,
`Faq`, `FooterCta`, `Footer`, `WhatsappFloat`.

**Os links de pagamento continuam fixos** (`mpago.la/...`), exatamente
como no HTML original — não usei o Checkout Pro dinâmico que preparamos
antes, porque a landing real já está usando links fixos e funcionando.
A API de Checkout Pro (`app/api/mercadopago/criar-preferencia`) continua
no projeto como opção para o futuro, mas não está conectada a nenhum botão.

### Página de cadastro (rota `/cadastro/[token]`)
Formulário fiel ao HTML original (dados da empresa, redes sociais, upload
de logo, upload de catálogo em PDF ou lista de serviços). Ao enviar, grava
`nome_negocio`, `whatsapp` e `descricao_negocio` via a função
`preencher_cadastro()` do Supabase, movendo o cliente de
`aguardando_cadastro` para `pendente_ativacao`.

**Pendências desta página:**
- Os campos CPF/CNPJ, endereço, Facebook, TikTok e a lista de serviços em
  texto aparecem no formulário mas **ainda não são salvos** — o schema
  atual só tem espaço para os campos básicos. Precisa expandir a tabela
  `catalogos` (ou criar uma tabela `clientes_detalhes`) para guardar isso.
- Upload de logo e do PDF do catálogo aparecem na UI mas **não enviam
  arquivo nenhum ainda** — falta implementar `app/api/upload/route.ts`
  com Supabase Storage.

### Backend / API
- `lib/supabase/client.ts`, `server.ts`, `admin.ts` — os três clientes Supabase
- `app/api/mercadopago/webhook/route.ts` — cria cliente no Supabase quando
  o Mercado Pago aprova um pagamento (ainda precisa do webhook cadastrado
  no painel do MP com a URL de produção)
- `app/api/mercadopago/criar-preferencia/route.ts` — pronto, mas não está
  em uso enquanto os links forem fixos
- `app/api/cadastro/route.ts` — recebe o formulário de `/cadastro/[token]`
- `schema.sql` — schema completo com RLS (admin master + cliente)

## O que ainda não existe neste pacote

- `app/admin/*` — dashboard master, listagem de clientes, toggle ativo/inativo
- `app/painel/*` — painel self-service do cliente (categorias, serviços, aparência)
- `app/catalogo/[slug]/*` — rota pública do catálogo do cliente
- `middleware.ts` — proteção de rotas `/admin` e `/painel`
- `app/api/upload/route.ts` — upload de imagens para Supabase Storage
- Login (admin e cliente) via Supabase Auth

## Próximos passos sugeridos

1. Rodar `npm run dev` e confirmar que a landing e `/cadastro/[qualquer-token]`
   renderizam corretamente
2. Testar o fluxo do formulário de cadastro contra um cliente de teste
   criado manualmente no Supabase (`insert into clientes (...)`)
3. Decidir e implementar os campos extras do cadastro (CPF, endereço, redes,
   uploads)
4. Construir o dashboard admin (`/admin`) com o toggle ativo/inativo
5. Construir o painel self-service (`/painel`)
6. `middleware.ts` + Supabase Auth para os dois logins
7. Deploy: mover o domínio `genixcatalog.app.br` da Vercel para este projeto
   e cadastrar o webhook do Mercado Pago com a URL de produção
