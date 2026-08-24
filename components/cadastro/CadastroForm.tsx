'use client'
// components/cadastro/CadastroForm.tsx
// NOTA: campos de CPF/CNPJ, endereço, redes sociais, upload de logo e upload
// de catálogo em PDF estão na UI (fiéis ao formulário original em HTML), mas
// ainda não são enviados ao Supabase — o schema.sql atual só grava
// nome_negocio, whatsapp e descricao_negocio via preencher_cadastro().
// Para gravar os demais campos, precisamos expandir a tabela `catalogos`
// (ou criar `clientes_detalhes`) e o endpoint /api/upload para os arquivos.

import { useState } from 'react'

export default function CadastroForm({ token }: { token: string }) {
  const [enviado, setEnviado] = useState(false)
  const [erro, setErro] = useState<string | null>(null)
  const [enviando, setEnviando] = useState(false)
  const [catType, setCatType] = useState<'pdf' | 'lista'>('pdf')
  const [logoName, setLogoName] = useState('')
  const [catName, setCatName] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setErro(null)
    setEnviando(true)

    const form = e.currentTarget
    const nome_negocio = (form.elements.namedItem('responsavel') as HTMLInputElement).value
    const whatsapp = (form.elements.namedItem('whatsapp') as HTMLInputElement).value
    const instagram = (form.elements.namedItem('instagram') as HTMLInputElement).value

    try {
      const res = await fetch('/api/cadastro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token,
          nome_negocio,
          whatsapp,
          link_whatsapp: `https://wa.me/55${whatsapp.replace(/\D/g, '')}`,
          descricao_negocio: instagram ? `Instagram: ${instagram}` : null,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setErro(data.error || 'Erro ao enviar cadastro')
        setEnviando(false)
        return
      }

      setEnviado(true)
    } catch {
      setErro('Erro de conexão. Tente novamente.')
      setEnviando(false)
    }
  }

  if (enviado) {
    return (
      <div className="success-banner active">
        ✅ Recebemos seus dados! Nossa equipe entrará em contato pelo WhatsApp informado para confirmar os próximos passos.
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="section-title"><h2>Dados da empresa</h2></div>
      <div className="form-group">
        <label>Nome completo do responsável</label>
        <input type="text" name="responsavel" placeholder="Ex: Maria da Silva" required />
      </div>
      <div className="form-row">
        <div className="form-group">
          <label>CPF/CNPJ</label>
          <input type="text" name="documento" placeholder="000.000.000-00" required />
        </div>
        <div className="form-group">
          <label>WhatsApp</label>
          <input type="text" name="whatsapp" placeholder="(35) 90000-0000" required />
        </div>
      </div>
      <div className="form-group">
        <label>Endereço completo</label>
        <input type="text" name="endereco" placeholder="Rua, número, bairro, cidade - UF" required />
      </div>

      <div className="section-title" style={{ marginTop: '30px' }}><h2>Redes sociais</h2></div>
      <div className="form-row">
        <div className="form-group">
          <label>Instagram</label>
          <input type="text" name="instagram" placeholder="@suaempresa" />
        </div>
        <div className="form-group">
          <label>Facebook</label>
          <input type="text" name="facebook" placeholder="facebook.com/suaempresa" />
        </div>
      </div>
      <div className="form-group">
        <label>TikTok</label>
        <input type="text" name="tiktok" placeholder="@suaempresa" />
      </div>

      <div className="section-title" style={{ marginTop: '30px' }}><h2>Materiais para o catálogo</h2></div>
      <div className="form-group">
        <label>Logomarca da empresa</label>
        <label className="file-drop" htmlFor="logoInput">
          📤 Clique para enviar sua logomarca (PNG/JPG)
          <div className="fname">{logoName}</div>
        </label>
        <input
          type="file"
          id="logoInput"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={(e) => setLogoName(e.target.files?.[0]?.name || '')}
        />
      </div>

      <div className="form-group">
        <label>Como você quer nos enviar seu catálogo/serviços?</label>
        <div className="radio-toggle">
          <label>
            <input type="radio" name="catType" checked={catType === 'pdf'} onChange={() => setCatType('pdf')} />
            <span>Enviar PDF atual</span>
          </label>
          <label>
            <input type="radio" name="catType" checked={catType === 'lista'} onChange={() => setCatType('lista')} />
            <span>Escrever lista de serviços</span>
          </label>
        </div>

        {catType === 'pdf' ? (
          <>
            <label className="file-drop" htmlFor="catInput">
              📎 Clique para enviar seu catálogo atual (PDF)
              <div className="fname">{catName}</div>
            </label>
            <input
              type="file"
              id="catInput"
              accept="application/pdf"
              style={{ display: 'none' }}
              onChange={(e) => setCatName(e.target.files?.[0]?.name || '')}
            />
          </>
        ) : (
          <textarea
            name="listaServicos"
            placeholder="Liste seus produtos ou serviços, um por linha, com preços se desejar."
            style={{
              width: '100%',
              minHeight: '110px',
              padding: '12px 14px',
              border: '1.5px solid var(--line)',
              borderRadius: '10px',
              fontSize: '14px',
              fontFamily: 'var(--font-body)',
            }}
          />
        )}
      </div>

      {erro && (
        <div style={{ color: '#b03636', fontSize: '13.5px', fontWeight: 600, marginTop: '8px' }}>{erro}</div>
      )}

      <button type="submit" className="btn btn-primary btn-block" style={{ marginTop: '18px' }} disabled={enviando}>
        {enviando ? 'Enviando...' : 'Enviar dados e iniciar produção'}
      </button>
    </form>
  )
}
