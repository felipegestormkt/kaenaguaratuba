import { useState, useEffect } from 'react';
import { getWhatsAppUrl } from '../../config';
import './WhatsAppButton.css';

export default function WhatsAppButton() {
  const [visible, setVisible] = useState(false);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const showTimer = setTimeout(() => setVisible(true), 3000);
    const pulseTimer = setInterval(() => {
      setPulse(true);
      setTimeout(() => setPulse(false), 1000);
    }, 8000);

    return () => {
      clearTimeout(showTimer);
      clearInterval(pulseTimer);
    };
  }, []);

  return (
    <a
      href={getWhatsAppUrl()}
      target="_blank"
      rel="noopener noreferrer"
      className={`whatsapp-btn ${visible ? 'visible' : ''} ${pulse ? 'pulse' : ''}`}
      id="floating-whatsapp-btn"
      aria-label="Falar com especialista pelo WhatsApp"
      title="WhatsApp — Falar com especialista"
      onClick={() => window.dispatchEvent(new CustomEvent('kaena:click_whatsapp', { detail: { location: 'floating' } }))}
    >
      {/* Ícone WhatsApp */}
      <svg className="whatsapp-btn__icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M20.52 3.48A11.93 11.93 0 0012.04.04C5.47.04.07 5.44.07 12a11.93 11.93 0 001.6 5.97L.04 23.96l6.15-1.61A11.96 11.96 0 0012.04 24c6.57 0 11.97-5.4 11.97-12.04 0-3.22-1.25-6.24-3.49-8.48z"
          fill="currentColor"
          fillOpacity="0.15"
        />
        <path
          d="M17.47 14.37c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.47-.89-.79-1.49-1.76-1.66-2.06-.17-.3-.02-.46.13-.61.14-.14.3-.35.44-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.6-.91-2.19-.24-.57-.48-.5-.67-.5-.17 0-.37-.02-.57-.02s-.52.07-.8.37c-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.07c.15.2 2.1 3.2 5.08 4.49.71.31 1.27.49 1.7.63.72.23 1.37.2 1.89.12.58-.09 1.76-.72 2.01-1.41.25-.69.25-1.28.17-1.41-.07-.12-.27-.2-.57-.35z"
          fill="currentColor"
        />
      </svg>

      {/* Label */}
      <span className="whatsapp-btn__label">Falar com especialista</span>

      {/* Pulse ring */}
      <span className="whatsapp-btn__ring" aria-hidden="true" />
    </a>
  );
}
