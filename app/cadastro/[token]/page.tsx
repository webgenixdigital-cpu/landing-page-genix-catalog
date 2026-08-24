// app/cadastro/[token]/page.tsx
import CadastroForm from '@/components/cadastro/CadastroForm'

export default async function CadastroPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params

  return (
    <>
      <div className="cadastro-hero">
        <div className="container">
          <img
            src="https://tufsjmcgvlbrqltagklr.supabase.co/storage/v1/object/public/video%20catalog/logo-genix-transparente.png"
            alt="Genix Catalog"
            style={{ maxWidth: '260px', margin: '0 auto 24px' }}
          />
          <div className="badge-ok">✓</div>
          <h1>Assinatura confirmada!</h1>
          <p>Falta só uma etapa: preencha os dados abaixo para começarmos a produção do seu catálogo. Nossa equipe entrará em contato assim que recebermos tudo.</p>
        </div>
      </div>
      <div className="cadastro-body">
        <CadastroForm token={token} />
      </div>
    </>
  )
}
