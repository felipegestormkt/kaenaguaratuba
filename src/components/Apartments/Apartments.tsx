import { useState } from 'react';
import { getWhatsAppUrl } from '../../config';
import './Apartments.css';

const apartments = [
  {
    id: 'apt60',
    size: '60',
    label: '2 Quartos',
    specs: {
      area: '60 m²',
      bedrooms: '2 quartos',
      suite: '1 suíte',
      garage: '1 vaga de garagem',
    },
    features: [
      'Sacada com churrasqueira a carvão',
      'Infraestrutura para ar-condicionado',
      'Planta inteligente e funcional',
      'Sala de estar e jantar integrados',
      'Iluminação natural privilegiada',
      'Acabamentos conforme memorial',
    ],
    image: './images/apt-60-sala.jpg',
    imageLabel: 'Apartamento 60m² — Sala de Estar KAENA',
    floorPlan: './images/planta-60m2.jpg',
    floorPlanLabel: 'Planta baixa — 60m² / 2 quartos',
    cta: 'Receber Plantas e Valores — 60 m²',
    whatsappMsg: 'Olá! Vi o KAENA Guaratuba e tenho interesse no apartamento de 60m² (2 quartos). Gostaria de receber plantas e valores disponíveis.',
  },
  {
    id: 'apt70',
    size: '70',
    label: '3 Quartos',
    specs: {
      area: '70 m²',
      bedrooms: '3 quartos',
      suite: '1 suíte',
      garage: '1 vaga de garagem',
    },
    features: [
      'Sacada com churrasqueira a carvão',
      'Infraestrutura para ar-condicionado',
      'Planta inteligente e funcional',
      'Sala de estar e jantar integrados',
      'Possibilidade de flexibilização de planta',
      'Acabamentos conforme memorial',
    ],
    image: './images/apt-70-sala.jpg',
    imageLabel: 'Apartamento 70m² — Sala de Estar KAENA',
    floorPlan: './images/planta-70m2.jpg',
    floorPlanLabel: 'Planta baixa — 70m² / 3 quartos',
    cta: 'Receber Plantas e Valores — 70 m²',
    whatsappMsg: 'Olá! Vi o KAENA Guaratuba e tenho interesse no apartamento de 70m² (3 quartos). Gostaria de receber plantas e valores disponíveis.',
  },
];

type Tab = 'image' | 'floorplan';

export default function Apartments() {
  const [active, setActive] = useState(0);
  const [tab, setTab] = useState<Tab>('image');

  const apt = apartments[active];

  return (
    <section id="apartamentos" className="apartments" aria-label="Apartamentos KAENA Guaratuba">
      <div className="apartments__intro container">
        <p className="eyebrow apartments__eyebrow reveal">Plantas e tipologias</p>
        <h2 className="apartments__title display-title reveal delay-100">
          Dois apartamentos.<br />Uma nova forma de viver.
        </h2>
      </div>

      <div className="apartments__content container--wide">
        {/* Seletor de tipologia */}
        <div className="apartments__selector" role="tablist" aria-label="Escolha a tipologia">
          {apartments.map((a, i) => (
            <button
              key={a.id}
              className={`apartments__opt ${active === i ? 'active' : ''}`}
              role="tab"
              aria-selected={active === i}
              aria-controls={`apt-panel-${a.id}`}
              id={`apt-tab-${a.id}`}
              onClick={() => { setActive(i); setTab('image'); }}
            >
              <span className="apartments__opt-size display-title">{a.size}<em>m²</em></span>
              <span className="apartments__opt-label">{a.label}</span>
            </button>
          ))}
        </div>

        {/* Painel */}
        <div
          className="apartments__panel"
          id={`apt-panel-${apt.id}`}
          role="tabpanel"
          aria-labelledby={`apt-tab-${apt.id}`}
        >
          <div className="apartments__panel-grid">
            {/* Lado visual */}
            <div className="apartments__visual">
              {/* Toggle imagem / planta */}
              <div className="apartments__view-toggle" role="group" aria-label="Alternar visualização">
                <button
                  className={`apartments__view-btn ${tab === 'image' ? 'active' : ''}`}
                  onClick={() => setTab('image')}
                  aria-pressed={tab === 'image'}
                >
                  Decorado
                </button>
                <button
                  className={`apartments__view-btn ${tab === 'floorplan' ? 'active' : ''}`}
                  onClick={() => setTab('floorplan')}
                  aria-pressed={tab === 'floorplan'}
                >
                  Planta
                </button>
              </div>

              <div className="apartments__img-wrap">
                {tab === 'image' ? (
                  <img
                    key={`img-${apt.id}`}
                    src={apt.image}
                    alt={apt.imageLabel}
                    loading="lazy"
                    className="apartments__img"
                    onError={(e) => {
                      const t = e.currentTarget.parentElement!;
                      t.classList.add('img-placeholder');
                      t.setAttribute('data-label', apt.imageLabel);
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                ) : (
                  <img
                    key={`plan-${apt.id}`}
                    src={apt.floorPlan}
                    alt={apt.floorPlanLabel}
                    loading="lazy"
                    className="apartments__img apartments__img--plan"
                    onError={(e) => {
                      const t = e.currentTarget.parentElement!;
                      t.classList.add('img-placeholder');
                      t.setAttribute('data-label', apt.floorPlanLabel);
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                )}
              </div>
            </div>

            {/* Detalhes */}
            <div className="apartments__details">
              <div className="apartments__specs">
                {Object.values(apt.specs).map((spec) => (
                  <div key={spec} className="apartments__spec">
                    <span className="apartments__spec-dot" aria-hidden="true" />
                    <span>{spec}</span>
                  </div>
                ))}
              </div>

              <div className="apartments__divider" aria-hidden="true" />

              <h3 className="apartments__features-title eyebrow">Diferenciais</h3>
              <ul className="apartments__features">
                {apt.features.map((feature) => (
                  <li key={feature} className="apartments__feature">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                      <circle cx="7" cy="7" r="6" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1"/>
                      <path d="M4 7l2 2 4-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <p className="apartments__price-note">
                Consulte disponibilidade e valores com um especialista.
              </p>

              <a
                href={getWhatsAppUrl(apt.whatsappMsg)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary apartments__cta"
                id={`apartments-cta-${apt.id}`}
                onClick={() => window.dispatchEvent(new CustomEvent('kaena:click_whatsapp', { detail: { location: `apartments_${apt.id}` } }))}
              >
                {apt.cta}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
