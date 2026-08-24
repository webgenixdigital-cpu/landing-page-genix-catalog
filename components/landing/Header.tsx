// components/landing/Header.tsx
export default function Header() {
  return (
    <header>
      <div className="container nav">
        <div className="brand">
          <img
            src="https://tufsjmcgvlbrqltagklr.supabase.co/storage/v1/object/public/video%20catalog/logo-genix-transparente.png"
            alt="Genix Catalog"
          />
        </div>
        <nav className="nav-links">
          <a href="#comparativo">Por que mudar</a>
          <a href="#como-funciona">Como funciona</a>
          <a href="#plano">Planos</a>
          <a href="#faq">Dúvidas</a>
        </nav>
        <div className="nav-cta">
          <a href="#plano" className="btn btn-primary" style={{ padding: '10px 20px', fontSize: '13.5px' }}>
            Quero meu catálogo
          </a>
        </div>
      </div>
    </header>
  )
}
