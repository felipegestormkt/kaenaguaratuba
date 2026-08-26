import { getWhatsAppUrl } from '../../config';
import { CONFIG } from '../../config';
import './Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="footer" role="contentinfo">
      <div className="footer__inner container--wide">
        {/* CTA final */}
        <div className="footer__cta-block">
          <p className="eyebrow footer__cta-eyebrow">Não perca essa oportunidade</p>
          <h2 className="footer__cta-title display-title">
            O KAENA espera por você.
          </h2>
          <div className="footer__cta-btns">
            <button
              className="btn btn-primary"
              id="footer-cta-contato"
              onClick={() => scrollTo('#contato')}
            >
              Receber Informações
            </button>
            <a
              href={getWhatsAppUrl('Olá! Vi o KAENA Guaratuba e quero agendar uma visita ao decorado.')}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline-light"
              id="footer-cta-visita"
            >
              Agendar Visita ao Decorado
            </a>
          </div>
        </div>

        {/* Divisor */}
        <div className="footer__divider" aria-hidden="true" />

        {/* Info */}
        <div className="footer__grid">
          {/* Logo */}
          <div className="footer__brand">
            <p className="footer__logo-name display-title">KAENA</p>
            <p className="footer__logo-sub eyebrow">Guaratuba — PR</p>
            <p className="footer__address">
              {CONFIG.project.address}<br />
              {CONFIG.project.city}
            </p>
          </div>

          {/* Navegação */}
          <nav className="footer__nav" aria-label="Navegação rodapé">
            <p className="footer__nav-title eyebrow">Navegação</p>
            <ul className="footer__nav-list">
              {[
                ['#hero', 'Início'],
                ['#lazer', 'Lazer'],
                ['#apartamentos', 'Apartamentos'],
                ['#galeria', 'Galeria'],
                ['#localizacao', 'Localização'],
                ['#contato', 'Contato'],
              ].map(([href, label]) => (
                <li key={href}>
                  <a
                    href={href}
                    onClick={(e) => { e.preventDefault(); scrollTo(href); }}
                    className="footer__nav-link"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Atendimento */}
          <div className="footer__broker">
            <p className="footer__nav-title eyebrow">Atendimento</p>
            <p className="footer__broker-name">{CONFIG.broker.name}</p>
            <p className="footer__broker-role">{CONFIG.broker.title}</p>
            <p className="footer__broker-creci">{CONFIG.broker.creci}</p>
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="footer__whatsapp"
              id="footer-whatsapp-link"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M17.47 14.37c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.47-.89-.79-1.49-1.76-1.66-2.06-.17-.3-.02-.46.13-.61.14-.14.3-.35.44-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.6-.91-2.19-.24-.57-.48-.5-.67-.5-.17 0-.37-.02-.57-.02s-.52.07-.8.37c-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.07c.15.2 2.1 3.2 5.08 4.49.71.31 1.27.49 1.7.63.72.23 1.37.2 1.89.12.58-.09 1.76-.72 2.01-1.41.25-.69.25-1.28.17-1.41-.07-.12-.27-.2-.57-.35z" fill="#25D366"/>
              </svg>
              (41) 9 5835-110
            </a>
          </div>
        </div>

        {/* Rodapé legal */}
        <div className="footer__legal">
          <p>
            © {year} {CONFIG.broker.company}.
            Todos os direitos reservados.
          </p>
          <p className="footer__disclaimer">
            As informações contidas nesta página têm caráter informativo e estão sujeitas a alterações sem aviso prévio.
            Imagens são meramente ilustrativas. Consulte o material oficial do empreendimento para informações completas.
          </p>
        </div>
      </div>
    </footer>
  );
}
