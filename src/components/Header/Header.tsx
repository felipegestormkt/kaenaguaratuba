import { useState, useEffect } from 'react';
import { getWhatsAppUrl } from '../../config';
import './Header.css';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#lazer', label: 'Lazer' },
    { href: '#apartamentos', label: 'Apartamentos' },
    { href: '#localizacao', label: 'Localização' },
    { href: '#contato', label: 'Contato' },
  ];

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
      <div className="header__inner container--wide">
        {/* Logo */}
        <a
          href="#hero"
          className="header__logo"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          aria-label="KAENA Guaratuba - Início"
        >
          <img
            src={scrolled ? './images/logo-kaena-dark-web.png' : './images/logo-kaena-web.png'}
            alt="KAENA Guaratuba"
            className="header__logo-img"
            width={333}
            height={200}
          />
        </a>

        {/* Nav desktop */}
        <nav className="header__nav" aria-label="Navegação principal">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="header__nav-link"
              onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA header */}
        <a
          href={getWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="header__cta btn btn-primary"
          id="header-whatsapp-cta"
          onClick={() => window.dispatchEvent(new CustomEvent('kaena:click_whatsapp', { detail: { location: 'header' } }))}
        >
          Falar com Especialista
        </a>

        {/* Hamburger mobile */}
        <button
          className={`header__hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Menu mobile */}
      <div className={`header__mobile-menu ${menuOpen ? 'open' : ''}`} aria-hidden={!menuOpen}>
        <nav>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="header__mobile-link"
              onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
            >
              {link.label}
            </a>
          ))}
          <a
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="header__mobile-cta btn btn-primary"
            onClick={() => setMenuOpen(false)}
          >
            Falar com Especialista
          </a>
        </nav>
      </div>
    </header>
  );
}
