// components/landing/Compare.tsx
export default function Compare() {
  return (
    <section className="section compare" id="comparativo">
      <div className="container">
        <div className="compare-head">
          <span className="eyebrow" style={{ justifyContent: 'center' }}>Antes de falar de solução</span>
          <h2>Compare como sua empresa é vista hoje — e como pode ser vista a partir de agora</h2>
          <p>Cada mensagem sem resposta clara é uma venda que precisou de esforço extra para acontecer. Veja a diferença.</p>
        </div>
        <div className="compare-grid">
          <div className="compare-card before">
            <h3>Sem um catálogo digital</h3>
            <ul className="compare-list">
              <li><span className="mark">–</span><span className="li-text">PDF pesado, difícil de abrir no celular do cliente</span></li>
              <li><span className="mark">–</span><span className="li-text">Preços desatualizados, gerando retrabalho</span></li>
              <li><span className="mark">–</span><span className="li-text">Cliente pede para &quot;ver com calma depois&quot; e esfria</span></li>
              <li><span className="mark">–</span><span className="li-text">Primeira impressão amadora, mesmo com bom produto</span></li>
            </ul>
          </div>
          <div className="compare-card after">
            <h3>Com o <span className="gx">Genix Catalog</span></h3>
            <ul className="compare-list">
              <li><span className="mark">✓</span><span className="li-text">Link único, leve, que abre em segundos</span></li>
              <li><span className="mark">✓</span><span className="li-text">Atualizações sempre que você precisar</span></li>
              <li><span className="mark">✓</span><span className="li-text">Estrutura pensada para conduzir até a decisão</span></li>
              <li><span className="mark">✓</span><span className="li-text">Identidade visual profissional, sua marca em destaque</span></li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
