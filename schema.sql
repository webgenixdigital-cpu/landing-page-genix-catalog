-- ============================================================
-- GENIX CATÁLOGO — SCHEMA DO PAINEL ADMIN + PAINEL DO CLIENTE
-- Banco único: mesmo projeto Supabase do genixcatalog.app.br
-- ============================================================

-- ------------------------------------------------------------
-- EXTENSÕES
-- ------------------------------------------------------------
create extension if not exists "pgcrypto";

-- ------------------------------------------------------------
-- ENUM: status do cliente
-- ------------------------------------------------------------
create type status_cliente as enum (
  'aguardando_cadastro',
  'pendente_ativacao',
  'ativo',
  'inativo',
  'cancelado'
);

-- ------------------------------------------------------------
-- TABELA: clientes
-- Um registro por assinante. auth_user_id vincula ao Supabase
-- Auth quando o cliente ganha acesso ao próprio painel.
-- ------------------------------------------------------------
create table clientes (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid references auth.users(id) unique, -- preenchido quando o cliente cria login
  nome_negocio text not null,
  email text not null,
  whatsapp text,
  slug text not null unique, -- usado na URL pública: /catalogo/[slug]
  status status_cliente not null default 'aguardando_cadastro',

  -- Mercado Pago
  mp_payer_id text,
  mp_subscription_id text,
  mp_plano text, -- 'mensal' | 'anual'
  proxima_cobranca date,

  -- Cadastro
  cadastro_token uuid not null default gen_random_uuid(), -- usado na rota pública /cadastro/[token]
  cadastro_preenchido_em timestamptz,

  ativado_em timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_clientes_status on clientes(status);
create index idx_clientes_slug on clientes(slug);
create index idx_clientes_cadastro_token on clientes(cadastro_token);

-- ------------------------------------------------------------
-- TABELA: catalogos
-- Um catálogo por cliente (1:1). Guarda identidade visual.
-- ------------------------------------------------------------
create table catalogos (
  id uuid primary key default gen_random_uuid(),
  cliente_id uuid not null references clientes(id) on delete cascade unique,
  foto_capa_url text,
  logo_url text,
  cor_primaria text default '#8A9A5B', -- sage como fallback
  descricao_negocio text,
  link_whatsapp text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ------------------------------------------------------------
-- TABELA: categorias
-- ------------------------------------------------------------
create table categorias (
  id uuid primary key default gen_random_uuid(),
  catalogo_id uuid not null references catalogos(id) on delete cascade,
  nome text not null,
  ordem integer not null default 0,
  created_at timestamptz not null default now()
);

create index idx_categorias_catalogo on categorias(catalogo_id);

-- ------------------------------------------------------------
-- TABELA: servicos
-- ------------------------------------------------------------
create table servicos (
  id uuid primary key default gen_random_uuid(),
  categoria_id uuid not null references categorias(id) on delete cascade,
  nome text not null,
  descricao text,
  preco numeric(10,2),
  foto_url text,
  ordem integer not null default 0,
  ativo boolean not null default true, -- permite ocultar item sem apagar
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_servicos_categoria on servicos(categoria_id);

-- ------------------------------------------------------------
-- TABELA: eventos_pagamento (auditoria Mercado Pago)
-- ------------------------------------------------------------
create table eventos_pagamento (
  id uuid primary key default gen_random_uuid(),
  cliente_id uuid references clientes(id) on delete set null,
  tipo_evento text not null, -- ex: 'payment.approved', 'payment.rejected', 'subscription.cancelled'
  payload_raw jsonb,
  processado boolean not null default false,
  created_at timestamptz not null default now()
);

create index idx_eventos_cliente on eventos_pagamento(cliente_id);

-- ------------------------------------------------------------
-- TRIGGER: updated_at automático
-- ------------------------------------------------------------
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger trg_clientes_updated_at before update on clientes
  for each row execute function set_updated_at();

create trigger trg_catalogos_updated_at before update on catalogos
  for each row execute function set_updated_at();

create trigger trg_servicos_updated_at before update on servicos
  for each row execute function set_updated_at();

-- ============================================================
-- RLS (ROW LEVEL SECURITY)
-- Dois papéis:
--   1) admin master -> definido por email fixo (via função is_admin())
--   2) cliente autenticado -> só acessa seus próprios dados
-- ============================================================

alter table clientes enable row level security;
alter table catalogos enable row level security;
alter table categorias enable row level security;
alter table servicos enable row level security;
alter table eventos_pagamento enable row level security;

-- Função auxiliar: verifica se o usuário logado é o admin master
-- Ajuste o e-mail abaixo para o seu e-mail de admin no Supabase Auth
create or replace function is_admin()
returns boolean as $$
  select exists (
    select 1 from auth.users
    where id = auth.uid()
    and email = 'SEU_EMAIL_ADMIN@exemplo.com'
  );
$$ language sql stable security definer;

-- Função auxiliar: retorna o cliente_id vinculado ao usuário logado
create or replace function cliente_id_atual()
returns uuid as $$
  select id from clientes where auth_user_id = auth.uid();
$$ language sql stable security definer;

-- ------------------------------------------------------------
-- POLÍTICAS: clientes
-- ------------------------------------------------------------
create policy "admin acessa todos os clientes"
  on clientes for all
  using (is_admin())
  with check (is_admin());

create policy "cliente ve o proprio registro"
  on clientes for select
  using (auth_user_id = auth.uid());

create policy "cliente atualiza o proprio registro (dados basicos)"
  on clientes for update
  using (auth_user_id = auth.uid())
  with check (auth_user_id = auth.uid());

-- ------------------------------------------------------------
-- POLÍTICAS: catalogos
-- ------------------------------------------------------------
create policy "admin acessa todos os catalogos"
  on catalogos for all
  using (is_admin())
  with check (is_admin());

create policy "cliente acessa o proprio catalogo"
  on catalogos for all
  using (cliente_id = cliente_id_atual())
  with check (cliente_id = cliente_id_atual());

-- ------------------------------------------------------------
-- POLÍTICAS: categorias
-- ------------------------------------------------------------
create policy "admin acessa todas as categorias"
  on categorias for all
  using (is_admin())
  with check (is_admin());

create policy "cliente acessa categorias do proprio catalogo"
  on categorias for all
  using (
    catalogo_id in (select id from catalogos where cliente_id = cliente_id_atual())
  )
  with check (
    catalogo_id in (select id from catalogos where cliente_id = cliente_id_atual())
  );

-- ------------------------------------------------------------
-- POLÍTICAS: servicos
-- ------------------------------------------------------------
create policy "admin acessa todos os servicos"
  on servicos for all
  using (is_admin())
  with check (is_admin());

create policy "cliente acessa servicos do proprio catalogo"
  on servicos for all
  using (
    categoria_id in (
      select c.id from categorias c
      join catalogos cat on cat.id = c.catalogo_id
      where cat.cliente_id = cliente_id_atual()
    )
  )
  with check (
    categoria_id in (
      select c.id from categorias c
      join catalogos cat on cat.id = c.catalogo_id
      where cat.cliente_id = cliente_id_atual()
    )
  );

-- ------------------------------------------------------------
-- POLÍTICAS: eventos_pagamento (somente admin)
-- ------------------------------------------------------------
create policy "admin acessa eventos de pagamento"
  on eventos_pagamento for all
  using (is_admin())
  with check (is_admin());

-- ============================================================
-- ACESSO PÚBLICO (rota /catalogo/[slug])
-- A leitura pública é feita via função RPC que só retorna dados
-- se o cliente estiver com status = 'ativo'. Isso evita expor
-- a tabela clientes inteira via RLS "public".
-- ============================================================

create or replace function get_catalogo_publico(slug_busca text)
returns jsonb as $$
  select jsonb_build_object(
    'nome_negocio', cl.nome_negocio,
    'catalogo', jsonb_build_object(
      'foto_capa_url', cat.foto_capa_url,
      'logo_url', cat.logo_url,
      'cor_primaria', cat.cor_primaria,
      'descricao_negocio', cat.descricao_negocio,
      'link_whatsapp', cat.link_whatsapp
    ),
    'categorias', (
      select jsonb_agg(
        jsonb_build_object(
          'id', ct.id,
          'nome', ct.nome,
          'ordem', ct.ordem,
          'servicos', (
            select jsonb_agg(
              jsonb_build_object(
                'id', s.id,
                'nome', s.nome,
                'descricao', s.descricao,
                'preco', s.preco,
                'foto_url', s.foto_url,
                'ordem', s.ordem
              ) order by s.ordem
            )
            from servicos s
            where s.categoria_id = ct.id and s.ativo = true
          )
        ) order by ct.ordem
      )
      from categorias ct
      where ct.catalogo_id = cat.id
    )
  )
  from clientes cl
  join catalogos cat on cat.cliente_id = cl.id
  where cl.slug = slug_busca
  and cl.status = 'ativo'; -- BLOQUEIO: só retorna se ativo
$$ language sql stable security definer;

-- Permite que qualquer visitante (anon) chame essa função,
-- mas SEM acesso direto às tabelas (RLS continua fechada).
grant execute on function get_catalogo_publico(text) to anon;

-- ============================================================
-- FUNÇÃO: registrar cadastro via token (rota /cadastro/[token])
-- Permite que o cliente preencha os dados iniciais sem estar
-- autenticado, validando apenas o token único.
-- ============================================================

create or replace function preencher_cadastro(
  p_token uuid,
  p_nome_negocio text,
  p_whatsapp text,
  p_descricao_negocio text,
  p_link_whatsapp text
)
returns boolean as $$
declare
  v_cliente_id uuid;
  v_catalogo_id uuid;
begin
  select id into v_cliente_id
  from clientes
  where cadastro_token = p_token
  and status = 'aguardando_cadastro';

  if v_cliente_id is null then
    return false; -- token inválido ou cadastro já preenchido
  end if;

  update clientes
  set nome_negocio = p_nome_negocio,
      whatsapp = p_whatsapp,
      status = 'pendente_ativacao',
      cadastro_preenchido_em = now()
  where id = v_cliente_id;

  insert into catalogos (cliente_id, descricao_negocio, link_whatsapp)
  values (v_cliente_id, p_descricao_negocio, p_link_whatsapp)
  returning id into v_catalogo_id;

  return true;
end;
$$ language plpgsql security definer;

grant execute on function preencher_cadastro(uuid, text, text, text, text) to anon;
