import { useEffect, useState } from 'react';
import { useIntersectionObserver, useCounter } from '../../hooks/useAnimations';
import './Numbers.css';

// ============================================================
//  Contadores das 3 stats menores
// ============================================================
const secondaryStats = [
  { value: 2,   label: 'Torres',       sublabel: 'Torre Praia · Torre Baía' },
  { value: 18,  label: 'Pavimentos',   sublabel: 'com vista privilegiada' },
  { value: 240, label: 'Apartamentos', sublabel: '8 unidades por andar' },
];

function SecondaryCounter({ value, start }: { value: number; start: boolean }) {
  const count = useCounter(value, 1800, start);
  return <span>{count}</span>;
}

function MainCounter({ start }: { start: boolean }) {
  const count = useCounter(3000, 2200, start);
  return <span>{count.toLocaleString('pt-BR')}</span>;
}

export default function Numbers() {
  const { ref, isVisible } = useIntersectionObserver(0.15);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (isVisible) setStarted(true);
  }, [isVisible]);

  return (
    <section
      className="numbers"
      ref={ref as React.RefObject<HTMLElement>}
      aria-label="Números do KAENA Guaratuba"
    >
      <div className="numbers__content container--wide">

        {/* ── TOPO: manifesto ─────────────────────────────── */}
        <div className="numbers__manifesto reveal">
          <p className="eyebrow numbers__eyebrow">O primeiro condomínio clube de Guaratuba</p>
          <h2 className="numbers__title display-title">
            Uma nova altura<br />para viver a cidade.
          </h2>
        </div>

        {/* ── HERO STAT: +3.000 m² — largura total ─────── */}
        <div className="numbers__hero-stat reveal delay-200">
          <div className="numbers__hero-inner">
            <div className="numbers__hero-value display-title">
              <span className="numbers__hero-prefix">+</span>
              <MainCounter start={started} />
              <span className="numbers__hero-suffix">m²</span>
            </div>
            <div className="numbers__hero-text">
              <p className="numbers__hero-label">dedicados ao lazer,</p>
              <p className="numbers__hero-sublabel eyebrow">esporte, bem-estar e convivência</p>
            </div>
          </div>
          <div className="numbers__hero-line" aria-hidden="true" />
        </div>

        {/* ── STATS SECUNDÁRIAS: 2 Torres | 18 Pav | 240 Aptos ── */}
        <div className="numbers__secondary-grid">
          {secondaryStats.map((stat, i) => (
            <div
              key={stat.label}
              className={`numbers__secondary-stat reveal delay-${(i + 1) * 100}`}
            >
              <div className="numbers__secondary-value display-title">
                <SecondaryCounter value={stat.value} start={started} />
              </div>
              <p className="numbers__secondary-label">{stat.label}</p>
              <p className="numbers__secondary-sublabel eyebrow">{stat.sublabel}</p>
            </div>
          ))}
        </div>

      </div>

      {/* Onda de transição para a próxima seção */}
      <div className="numbers__wave" aria-hidden="true">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,30 C360,60 720,0 1080,30 C1260,45 1380,20 1440,30 L1440,60 L0,60 Z" fill="#FAF6F0" />
        </svg>
      </div>
    </section>
  );
}
