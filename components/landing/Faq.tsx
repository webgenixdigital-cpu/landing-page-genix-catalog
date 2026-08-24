// components/landing/Faq.tsx
export default function Faq() {
  return (
    <section className="section" id="faq">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <span className="eyebrow" style={{ justifyContent: 'center' }}>Dúvidas frequentes</span>
          <h2>Antes de decidir, responda estas perguntas</h2>
        </div>
        <div className="faq">
          <details className="faq-item" open>
            <summary>Preciso ter os produtos/serviços fotografados?</summary>
            <p>Não é obrigatório. Você pode enviar o catálogo atual, uma listagem de serviços em texto, ou fotos soltas — nossa equipe organiza tudo no formato ideal.</p>
          </details>
          <details className="faq-item">
            <summary>Como envio minha logomarca e os dados da empresa?</summary>
            <p>É automático — não precisa reenviar nada nem entrar em contato com a gente. Assim que o Mercado Pago aprova o pagamento, ele já leva você para o formulário de cadastro, com upload de arquivos incluso.</p>
          </details>
          <details className="faq-item">
            <summary>Quanto tempo leva para o catálogo ficar pronto?</summary>
            <p>O prazo médio é de até 5 dias úteis após o envio completo dos dados no formulário de cadastro.</p>
          </details>
          <details className="faq-item">
            <summary>Posso tirar dúvidas antes de assinar?</summary>
            <p>Sim. Use o botão do WhatsApp no canto da tela para falar com nossa equipe ou agendar uma conversa rápida.</p>
          </details>
        </div>
      </div>
    </section>
  )
}
