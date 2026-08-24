// components/landing/Benefits.tsx
const benefits = [
  { ic: '⚡', title: 'Carregamento instantâneo', text: 'Nada de PDF travando. Seu catálogo abre em segundos, em qualquer celular, com a identidade visual da sua marca.' },
  { ic: '🎯', title: 'Feito para converter', text: 'Categorias claras, preços em destaque e botão de contato sempre visível — pensado para a jornada de compra.' },
  { ic: '🔄', title: 'Fácil de atualizar', text: 'Mudou o preço ou entrou produto novo? Você nos envia a atualização e o catálogo é ajustado em pouco tempo.' },
  { ic: '📲', title: 'Conectado aos seus canais', text: 'WhatsApp, Instagram, Facebook e TikTok integrados — o cliente navega no catálogo e já sai falando com você.' },
  { ic: '🏷️', title: 'Sua marca em primeiro lugar', text: 'Logomarca, cores e tom de voz aplicados no layout — o catálogo parece (e é) exclusivamente seu.' },
  { ic: '📈', title: 'Percepção de valor imediata', text: 'Um material bem apresentado muda a forma como o cliente enxerga o preço — e reduz a objeção antes dela aparecer.' },
]

export default function Benefits() {
  return (
    <section className="section">
      <div className="container">
        <div className="benefits-head">
          <span className="eyebrow">A solução</span>
          <h2>Um catálogo digital que vende por você, 24 horas por dia</h2>
          <p>
            O <span className="gx">Genix Catalog</span> transforma sua logomarca, seus produtos e seus canais em
            uma vitrine única, rápida e persuasiva — pronta para ser enviada em um único link.
          </p>
        </div>
        <div className="grid-3">
          {benefits.map((b) => (
            <div className="card" key={b.title}>
              <div className="ic">{b.ic}</div>
              <h3>{b.title}</h3>
              <p>{b.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
