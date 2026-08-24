// components/landing/Hero.tsx
export default function Hero() {
  return (
    <section className="hero">
      <div className="container hero-grid">
        <div className="hero-copy">
          <span className="eyebrow">Catálogo digital sob medida</span>
          <h1>
            Aumente a percepção de valor do seu negócio com o <span className="gx">Genix Catalog</span>.
          </h1>
          <p className="lead">
            Sua empresa sobe de nível: uma vitrine digital rápida, elegante e sempre atualizada —
            pronta para compartilhar no WhatsApp, no Instagram e em qualquer primeiro contato.
          </p>
          <div className="cta-row">
            <a href="#plano" className="btn btn-primary">Quero meu catálogo agora</a>
            <a href="#como-funciona" className="btn btn-ghost">Ver como funciona</a>
          </div>
          <div className="hero-badges">
            <div className="hero-badge"><span className="dot"></span> Sem contrato de fidelidade</div>
            <div className="hero-badge"><span className="dot"></span> Entrega em até 5 dias úteis</div>
            <div className="hero-badge"><span className="dot"></span> Suporte direto no WhatsApp</div>
          </div>
        </div>

        <div className="mock-wrap-outer">
          <div className="mock-wrap">
            <div className="phone-shadow-ellipse"></div>
            <div className="phone-frame">
              <div className="phone-glow"></div>
              <div className="phone-notch"></div>
              <div className="phone-screen">
                <video
                  src="https://tufsjmcgvlbrqltagklr.supabase.co/storage/v1/object/public/video%20catalog/catalogo-video.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              </div>
            </div>
          </div>
          <a
            href="https://almaestetica.genixcatalog.app.br/"
            target="_blank"
            rel="noopener"
            className="btn btn-gold mock-cta"
          >
            Ver na prática! <span className="arrow">→</span>
          </a>
        </div>
      </div>
    </section>
  )
}
