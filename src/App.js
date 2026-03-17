import { useState, useEffect } from 'react'
import logo from './assets/logo.jpg'
import mentorPhoto from './assets/mentorPhoto.jpeg'
import './App.css'
import modulo1 from './assets/modulo1.jpg'
import modulo2 from './assets/modulo2.jpg'
import modulo3 from './assets/modulo3.jpg'
import modulo4 from './assets/modulo4.jpg'

// ============================================================
// CONFIGURAÇÕES DO SITE — EDITE AQUI COM FACILIDADE
// ============================================================
const CONFIG = {
  // --- Links principais ---
  whatsappGroupLink: 'https://chat.whatsapp.com/KWixeD9u28QG9CTrozXBFI',
  youtubeLink: 'https://youtube.com/@dr.inverterplacas?si=4UC-0eL3nqqJOz2v',
  tiktokLink: 'https://www.tiktok.com/@drinverter?_r=1&_t=ZS-94lc6nzi1kT',

  // --- Datas da imersão ---
  dataInicio: '6 de Abril',
  dataFim: '9 de Abril',

  // --- Textos do Hero ---
  heroTitle: 'EVENTO GRATUITO em Reparo e Análise de Placas Eletrônicas Inverter',
  heroSubtitle: 'Entre no nosso grupo exclusivo do WhatsApp e participe desse evento gratuito que acontecerá de 6 a 9 de abril.',

  // --- Textos do CTA final ---
  ctaTitle: 'Pronto para Dominar a Eletrônica Inverter?',
  ctaText: 'Conteúdo prático, suporte real e networking com o melhor do mercado.',

  // --- Rodapé ---
  footerText: '© 2026 Dr. Inverter - Solução em Placas Eletrônicas. Todos os direitos reservados.',

  // --- Redes sociais ---
  youtubeLabel: '@DrInverter',
  tiktokLabel: '@DrInverter',

  // --- Imagens dos módulos (EDITE AQUI) ---
  modulos: [
    {
      id: 1,
      titulo: 'MÓDULO 1. Conhecendo as placas inverter - Segunda às 20h',
      descricao: 'Entenda o funcionamento das placas inverter, identifique os principais setores da placa e aprenda como iniciar uma análise correta.',
      imagem: modulo1, // ← Substitua pela URL da imagem
      icone: 'target'
    },
    {
      id: 2,
      titulo: 'MÓDULO 2. Erros comuns nas placas inverter - Terça às 20h',
      descricao: 'Descubra os defeitos mais comuns encontrados nas placas inverter e como identificá-los rapidamente no diagnóstico.',
      imagem: modulo2, // ← Substitua pela URL da imagem
      icone: 'wrench'
    },
    {
      id: 3,
      titulo: 'MÓDULO 3. Analisando a placa na prática - Quarta às 20h',
      descricao: 'Veja na prática como analisar uma placa inverter passo a passo utilizando técnicas de medição e mapeamento.',
      imagem: modulo3, // ← Substitua pela URL da imagem
      icone: 'search'
    },
    {
      id: 4,
      titulo: 'MÓDULO 4. Como ligar uma placa na bancada - Quinta às 20h',
      descricao: 'Aprenda como energizar e testar uma placa inverter na bancada com segurança para realizar diagnósticos profissionais.',
      imagem: modulo4, // ← Substitua pela URL da imagem
      icone: 'dollar'
    }
  ]
}
// ============================================================

// Componente Button
const Button = ({ children, onClick, className = '', href, ...props }) => {
  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={`btn ${className}`} {...props}>
        {children}
      </a>
    )
  }
  return (
    <button onClick={onClick} className={`btn ${className}`} {...props}>
      {children}
    </button>
  )
}

// Ícones SVG
const TargetIcon = () => (
  <svg className="icon-large green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
  </svg>
)

const WrenchIcon = () => (
  <svg className="icon-large orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
)

const SearchIcon = () => (
  <svg className="icon-large cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
)

const DollarIcon = () => (
  <svg className="icon-large yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
  </svg>
)

const AwardIcon = () => (
  <svg className="icon-xl yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
  </svg>
)

const WhatsAppIcon = () => (
  <svg className="icon-btn-whatsapp" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

const YouTubeIcon = () => (
  <svg className="social-icon youtube-icon" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
)

const TikTokIcon = () => (
  <svg className="social-icon tiktok-icon" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z" />
  </svg>
)

// Função auxiliar para renderizar ícone baseado no tipo
const renderIcon = (tipo) => {
  switch(tipo) {
    case 'target': return <TargetIcon />
    case 'wrench': return <WrenchIcon />
    case 'search': return <SearchIcon />
    case 'dollar': return <DollarIcon />
    default: return <TargetIcon />
  }
}

function App() {
  return (
    <div className="app">

      {/* ── Hero Section ── */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="container">
          <div className="hero-content">
            <div className="logo-container">
              <img src={logo} alt="Dr. Inverter" className="logo" />
            </div>

            <h1 className="hero-title">
              <span className="gradient-text">{CONFIG.heroTitle}</span>
            </h1>

            {/* Datas em destaque */}
            <div className="dates-highlight">
              <span className="date-badge start-date">Começa: {CONFIG.dataInicio}</span>
              <span className="date-badge end-date">Termina: {CONFIG.dataFim}</span>
            </div>

            <p className="hero-subtitle">{CONFIG.heroSubtitle}</p>

            <Button href={CONFIG.whatsappGroupLink} className="btn-primary btn-pulse btn-whatsapp">
              <WhatsAppIcon />
              QUERO PARTICIPAR DAS AULAS GRATUITAS!
            </Button>

            {/* Redes Sociais no Hero */}
            <div className="hero-social">
              <p className="hero-social-label">Nos siga nas redes sociais:</p>
              <div className="social-links">
                <a href={CONFIG.youtubeLink} target="_blank" rel="noopener noreferrer" className="social-link youtube-link">
                  <YouTubeIcon />
                  <span>{CONFIG.youtubeLabel}</span>
                </a>
                <a href={CONFIG.tiktokLink} target="_blank" rel="noopener noreferrer" className="social-link tiktok-link">
                  <TikTokIcon />
                  <span>{CONFIG.tiktokLabel}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Seção de Módulos com Imagens ── */}
      <section className="benefits-section">
        <div className="container">
          <h2 className="section-title white">Coloque na sua agenda para lembrar de participar!</h2>

          <div className="benefits-grid">
            {CONFIG.modulos.map((modulo) => (
              <div key={modulo.id} className="benefit-card" style={{ backgroundImage: `url(${modulo.imagem})` }}>
                <div className="benefit-card-overlay">
                  <h3>{modulo.titulo}</h3>
                  <p>{modulo.descricao}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button href={CONFIG.whatsappGroupLink} className="btn-secondary btn-whatsapp">
              <WhatsAppIcon />
              QUERO PARTICIPAR DAS AULAS GRATUITAS!
            </Button>
          </div>
        </div>
      </section>

      {/* ── Seção de Autoridade ── */}
      <section className="authority-section">
        <div className="container">
          <h2 className="section-title white">Seu Professor ao Decorrer das Aulas</h2>
          <div className="authority-content">
            <div className="authority-card">
              <img src={mentorPhoto} alt="Cleyton Henrique, o Dr. Inverter" className="mentor-photo" />
              <AwardIcon />
              <h3><em>Cleyton Henrique, o Dr. Inverter</em></h3>
              <p>
                Especialista em eletrônica de placas inverter. Com muitos anos de experiência, Cleyton Henrique realizou análises e consertos de inúmeras placas. Ele será seu guia nessa imersão, compartilhando conhecimento real e prático direto no grupo!
              </p>
              <div className="stats-grid">
                <div className="stat-item">
                  <div className="stat-number orange">100%</div>
                  <div className="stat-label">Dedicação</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number cyan">1000+</div>
                  <div className="stat-label">Reparos concluídos</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number yellow">98%</div>
                  <div className="stat-label">Taxa de Sucesso</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Seção de Redes Sociais ── */}
      <section className="social-section">
        <div className="container">
          <h2 className="section-title white">Nos Acompanhe nas Redes Sociais</h2>
          <p className="social-section-desc">
            Conteúdo gratuito todo dia: dicas técnicas, reparos ao vivo, análises de placas e muito mais. Siga e não perca nenhuma novidade!
          </p>

          <div className="social-cards">
            <a href={CONFIG.youtubeLink} target="_blank" rel="noopener noreferrer" className="social-card youtube-card">
              <div className="social-card-icon">
                <YouTubeIcon />
              </div>
              <div className="social-card-info">
                <h3>YouTube</h3>
                <p>{CONFIG.youtubeLabel}</p>
                <span className="social-card-cta">Assistir agora →</span>
              </div>
            </a>

            <a href={CONFIG.tiktokLink} target="_blank" rel="noopener noreferrer" className="social-card tiktok-card">
              <div className="social-card-icon">
                <TikTokIcon />
              </div>
              <div className="social-card-info">
                <h3>TikTok</h3>
                <p>{CONFIG.tiktokLabel}</p>
                <span className="social-card-cta">Seguir agora →</span>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* ── Call-to-Action Final ── */}
      <section className="cta-section">
        <div className="container">
          <h2 className="cta-title">{CONFIG.ctaTitle}</h2>
          <p className="cta-text">{CONFIG.ctaText}</p>

          <div className="social-proof">
            <div className="social-proof-number">🔒 Grupo Exclusivo e Gratuito</div>
            <div className="social-proof-text">Aproveite essa oportunidade!</div>
          </div>

          <Button href={CONFIG.whatsappGroupLink} className="btn-final btn-bounce btn-final-whatsapp">
            <WhatsAppIcon />
            ENTRAR NO GRUPO AGORA — É GRÁTIS!
          </Button>

          <p className="guarantees">
            ✅ 100% Gratuito | ✅ Acesso Imediato | ✅ Comunidade Exclusiva
          </p>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="footer">
        <div className="container">
          <img src={logo} alt="Dr. Inverter" className="footer-logo" />

          <div className="footer-social">
            <a href={CONFIG.youtubeLink} target="_blank" rel="noopener noreferrer" className="footer-social-link youtube-link" aria-label="YouTube">
              <YouTubeIcon />
            </a>
            <a href={CONFIG.tiktokLink} target="_blank" rel="noopener noreferrer" className="footer-social-link tiktok-link" aria-label="TikTok">
              <TikTokIcon />
            </a>
            <a href={CONFIG.whatsappGroupLink} target="_blank" rel="noopener noreferrer" className="footer-social-link whatsapp-footer-link" aria-label="WhatsApp">
              <WhatsAppIcon />
            </a>
          </div>

          <p className="footer-text">{CONFIG.footerText}</p>
        </div>
      </footer>

      {/* ── Botão Flutuante Mobile ── */}
      <div className="mobile-cta">
        <Button href={CONFIG.whatsappGroupLink} className="btn-mobile btn-pulse btn-whatsapp">
          <WhatsAppIcon />
          ENTRAR NO GRUPO GRÁTIS!
        </Button>
      </div>

    </div>
  )
}

export default App
