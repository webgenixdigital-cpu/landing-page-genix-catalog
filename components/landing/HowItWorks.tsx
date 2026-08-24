// components/landing/HowItWorks.tsx
const steps = [
  { n: 1, title: 'Você assina seu plano', text: 'Escolhe mensal ou anual e conclui com segurança pelo Mercado Pago.' },
  { n: 2, title: 'Você é redirecionado', text: 'Assim que o pagamento é aprovado, o Mercado Pago leva você direto para a página de cadastro.' },
  { n: 3, title: 'Você preenche seus dados', text: 'Envia logomarca, catálogo atual e informações da empresa em um formulário rápido.' },
  { n: 4, title: 'Nossa equipe monta o catálogo', text: 'Aplicamos sua marca, seus produtos e sua identidade visual.' },
  { n: 5, title: 'Você recebe e já divulga', text: 'Catálogo pronto, com link único para compartilhar em qualquer canal.' },
]

export default function HowItWorks() {
  return (
    <section className="section how" id="como-funciona">
      <div className="container">
        <span className="eyebrow">Como funciona</span>
        <h2>Da assinatura ao catálogo pronto, em 5 etapas simples</h2>
        <div className="timeline">
          <div className="timeline-row">
            {steps.map((s) => (
              <div className="tl-step" key={s.n}>
                <div className="tl-dot">{s.n}</div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
