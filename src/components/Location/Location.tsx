import './Location.css';
import { CONFIG } from '../../config';

// ============================================================
//  Pontos de distância
//  ⚡ Confirme os tempos exatos no Book oficial do KAENA
// ============================================================
const points = [
  { time: '1 min', label: 'Av. 29 de Abril', icon: '→' },
  { time: '1 min', label: 'Restaurantes e Mercados', icon: '→' },
  { time: '3 min', label: 'Praia Central de Guaratuba', icon: '→' },
  { time: '3 min', label: 'Iate Clube de Guaratuba', icon: '→' },
  { time: '3 min', label: 'Baía de Guaratuba', icon: '→' },
  { time: '4 min', label: 'Praça dos Namorados', icon: '→' },
  { time: '6 min', label: 'Ponte de Guaratuba', icon: '→' },
];

export default function Location() {
  return (
    <section id="localizacao" className="location" aria-label="Localização KAENA Guaratuba">
      <div className="location__inner container--wide">
        {/* Texto */}
        <div className="location__text">
          <p className="eyebrow location__eyebrow reveal">Localização estratégica</p>
          <h2 className="location__title display-title reveal delay-100">
            Perto do mar.<br />
            <em>Perto de tudo.</em>
          </h2>
          <p className="location__address reveal delay-200">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <circle cx="7" cy="5" r="3" stroke="currentColor" strokeWidth="1.2"/>
              <path d="M7 13C7 13 2 9 2 5a5 5 0 0110 0c0 4-5 8-5 8z" stroke="currentColor" strokeWidth="1.2"/>
            </svg>
            {CONFIG.project.address} — {CONFIG.project.city}
          </p>

          {/* Lista de distâncias */}
          <ul className="location__points reveal delay-300" aria-label="Distâncias e pontos de referência">
            {points.map((point, i) => (
              <li
                key={point.label}
                className="location__point reveal"
                style={{ transitionDelay: `${0.1 + i * 0.08}s` }}
              >
                <span className="location__time">{point.time}</span>
                <span className="location__point-line" aria-hidden="true" />
                <span className="location__point-label">{point.label}</span>
              </li>
            ))}
          </ul>

          <a
            href={CONFIG.project.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline-dark location__maps-btn"
            id="location-maps-btn"
          >
            Ver no Google Maps
          </a>
        </div>

        {/* Mapa */}
        <div className="location__map reveal delay-300">
          <div className="location__map-wrap">
            {/*
              ⚡ MAPA: Substitua por embed do Google Maps com o endereço real
              Para gerar: https://maps.google.com → Compartilhar → Incorporar
              O iframe abaixo é um placeholder — substitua o src pelo embed real
            */}
            <iframe
              src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3631!2d-48.5745!3d-25.8840!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sKAENA+Guaratuba!5e0!3m2!1spt-BR!2sbr`}
              title="Localização KAENA Guaratuba no mapa"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="location__iframe"
            />
            {/* Pin overlay */}
            <div className="location__pin" aria-hidden="true">
              <span className="location__pin-dot" />
              <span className="location__pin-label eyebrow">KAENA</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
