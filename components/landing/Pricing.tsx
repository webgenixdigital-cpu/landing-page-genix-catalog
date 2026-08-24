// components/landing/Pricing.tsx
export default function Pricing() {
  return (
    <section className="section pricing" id="plano">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <span className="eyebrow" style={{ justifyContent: 'center' }}>Planos</span>
          <h2>Escolha o plano ideal para colocar seu catálogo no ar</h2>
        </div>
        <div className="plan-wrap">
          <div className="plan-include">
            <h3>O que está incluso em qualquer plano</h3>
            <ul>
              <li><span className="check">✓</span><span className="li-text">Catálogo digital com sua identidade visual aplicada</span></li>
              <li><span className="check">✓</span><span className="li-text">Copy e estrutura pensadas para conduzir o cliente até a decisão de compra</span></li>
              <li><span className="check">✓</span><span className="li-text">Integração com WhatsApp, Instagram, Facebook e TikTok</span></li>
              <li><span className="check">✓</span><span className="li-text">Link único, responsivo, para compartilhar em qualquer canal</span></li>
              <li><span className="check">✓</span><span className="li-text">Atualizações de produtos, serviços e preços sempre que precisar</span></li>
              <li><span className="check">✓</span><span className="li-text">Suporte direto com nossa equipe durante todo o processo</span></li>
            </ul>
          </div>
          <div className="plan-cards">
            <div className="plan-card">
              <span className="plan-name">Plano mensal</span>
              <div className="plan-tag"><span className="amt">R$ 27,99</span><span className="per">/ mês</span></div>
              <p className="plan-desc">Ideal para começar sem compromisso de longo prazo. Cancele quando quiser.</p>
              <a href="https://www.mercadopago.com.br/subscriptions/checkout?preapproval_plan_id=e6094a234cbf4498b3ae3086d8567c64" target="_blank" rel="noopener" className="btn btn-primary btn-block">
                Assinar plano mensal
              </a>
            </div>
            <div className="plan-card highlight">
              <span className="plan-badge">Mais econômico</span>
              <span className="plan-name">Plano anual</span>
              <div className="plan-tag"><span className="amt">R$ 279,90</span><span className="per">/ ano</span></div>
              <p className="plan-desc">Equivalente a R$ 23,33/mês — mais de 2 meses de economia frente ao plano mensal.</p>
              <a href="https://www.mercadopago.com.br/subscriptions/checkout?preapproval_plan_id=545c70859d9e4d1eb94be2082c5d39c3" target="_blank" rel="noopener" className="btn btn-gold btn-block">
                Assinar plano anual
              </a>
            </div>
          </div>
          <p className="plan-note">
            <b>Como funciona depois do pagamento:</b> ao concluir a assinatura no Mercado Pago, você é
            redirecionado automaticamente para a página de cadastro — nela, envia sua logomarca, catálogo
            atual e dados de contato, e é isso que dá início à produção do seu catálogo. Se o redirecionamento
            não acontecer automaticamente por algum motivo, fale com a gente pelo WhatsApp que reenviamos o link.
          </p>
          <div style={{ textAlign: 'center', marginTop: '16px' }}>
            <a
              href="https://wa.me/5535987096476?text=Ol%C3%A1!%20J%C3%A1%20assinei%20o%20Genix%20Cat%C3%A1log%20e%20preciso%20do%20link%20de%20cadastro."
              target="_blank"
              rel="noopener"
              className="btn btn-ghost"
              style={{ borderColor: 'rgba(255,255,255,.25)', color: '#fff' }}
            >
              Já assinei, preciso do link de cadastro →
            </a>
          </div>
          <div className="trust-row2">
            <span>🔒 Pagamento processado pelo Mercado Pago</span>
            <span>📄 Nota fiscal emitida</span>
            <span>💬 Suporte humano</span>
          </div>
        </div>
      </div>
    </section>
  )
}