import { useEffect, useRef } from 'react';
import { getWhatsAppUrl } from '../../config';
import './Hero.css';

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  // Parallax suave na imagem de fundo
  useEffect(() => {
    const handleScroll = () => {
      if (!imageRef.current || !heroRef.current) return;
      const scrolled = window.scrollY;
      const heroHeight = heroRef.current.offsetHeight;
      if (scrolled < heroHeight) {
        imageRef.current.style.transform = `translateY(${scrolled * 0.3}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToContact = () => {
    const el = document.querySelector('#contato');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="hero" ref={heroRef as React.RefObject<HTMLElement>} aria-label="KAENA Guaratuba - Hero">
      {/* Imagem de fundo com parallax */}
      <div className="hero__bg" ref={imageRef}>
        {/*
          ⚡ IMAGEM: Substitua pelo melhor render das torres do Drive.
          Recomendação: render externo/aéreo com pôr do sol — Torre Praia ou Torre Baía.
          Caminho: /images/hero-kaena.jpg (WebP preferencialmente)
          Dimensões mínimas: 1920x1080px
        */}
        <img
          src="/images/hero-kaena.jpg"
          alt="KAENA Guaratuba — Vista das torres ao pôr do sol"
          className="hero__bg-img"
          loading="eager"
          fetchPriority="high"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
          }}
        />
        <div className="hero__bg-fallback" aria-hidden="true" />
      </div>

      {/* Overlay gradiente */}
      <div className="hero__overlay" aria-hidden="true" />

      {/* Conteúdo */}
      <div className="hero__content container">
        {/* Eyebrow */}
        <p className="hero__eyebrow eyebrow">KAENA &nbsp;|&nbsp; Guaratuba — PR</p>

        {/* Headline principal */}
        <h1 className="hero__headline display-title">
          Entre a cidade<br />
          <em>e o mar.</em>
        </h1>

        {/* Subheadline */}
        <p className="hero__sub">
          O primeiro condomínio clube de Guaratuba,<br className="hero__br-desktop" />
          com mais de 3.000 m² de lazer.
        </p>

        {/* Info rápida */}
        <div className="hero__specs" aria-label="Especificações do empreendimento">
          <span className="hero__spec">60 m²</span>
          <span className="hero__spec-divider" aria-hidden="true">·</span>
          <span className="hero__spec">70 m²</span>
          <span className="hero__spec-divider" aria-hidden="true">·</span>
          <span className="hero__spec">2 e 3 quartos</span>
          <span className="hero__spec-divider" aria-hidden="true">·</span>
          <span className="hero__spec">1 suíte</span>
          <span className="hero__spec-divider" aria-hidden="true">·</span>
          <span className="hero__spec">1 vaga</span>
        </div>

        {/* CTAs */}
        <div className="hero__ctas">
          <button
            className="btn btn-primary hero__cta-primary"
            id="hero-cta-conhecer"
            onClick={scrollToContact}
          >
            Quero Conhecer o KAENA
          </button>
          <a
            href={getWhatsAppUrl('Olá! Vi o KAENA Guaratuba e gostaria de agendar uma visita ao decorado.')}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline-light hero__cta-secondary"
            id="hero-cta-visita"
            onClick={() => window.dispatchEvent(new CustomEvent('kaena:click_whatsapp', { detail: { location: 'hero_visit' } }))}
          >
            Agendar Visita ao Decorado
          </a>
        </div>

        {/* Microcopy */}
        <p className="hero__microcopy">
          Receba valores, plantas e disponibilidade pelo WhatsApp.
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="hero__scroll" aria-hidden="true">
        <span className="hero__scroll-line" />
        <span className="hero__scroll-label eyebrow">Conheça</span>
      </div>

      {/* Onda de transição */}
      <div className="hero__wave" aria-hidden="true">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z" fill="#0E0C08" />
        </svg>
      </div>
    </section>
  );
}
