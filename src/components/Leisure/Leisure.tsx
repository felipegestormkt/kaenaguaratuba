import { useState } from 'react';
import { getWhatsAppUrl } from '../../config';
import './Leisure.css';

// ============================================================
//  Dados do Lazer — "Clube para cada momento do dia"
//  (elemento criativo diferenciador: Opção D do prompt)
// ============================================================

const timeSlots = [
  {
    id: 'manha',
    period: 'Manhã',
    icon: '◌',
    spaces: ['Academia Completa', 'Área de Academia Externa', 'Piscina Coberta Aquecida', 'Sauna'],
    headline: 'Comece o dia do seu jeito.',
    image: './images/leisure-manha.jpg',
    imageLabel: 'Academia · Piscina Coberta — KAENA',
  },
  {
    id: 'tarde',
    period: 'Tarde',
    icon: '◑',
    spaces: ['Quadra de Beach Tennis', 'Quadra Poliesportiva', 'Piscina Externa', 'Piscina Infantil', 'Playground · Espaço Kids'],
    headline: 'Tarde de sol e movimento.',
    image: './images/leisure-tarde.jpg',
    imageLabel: 'Beach Tennis · Piscina Externa — KAENA',
  },
  {
    id: 'fim-tarde',
    period: 'Fim de tarde',
    icon: '◕',
    spaces: ['Piscina de Borda Infinita', 'Bar Molhado', 'Spa', 'Prainha'],
    headline: 'O horizonte como cenário.',
    image: './images/leisure-fim-tarde.jpg',
    imageLabel: 'Piscina de Borda Infinita — KAENA',
  },
  {
    id: 'noite',
    period: 'Noite',
    icon: '●',
    spaces: ['Espaços Gourmet', 'Salões de Festas', 'Sala de Jogos', 'Coworking', 'Áreas de Convivência'],
    headline: 'Noites que valem a semana.',
    image: './images/leisure-noite.jpg',
    imageLabel: 'Espaço Gourmet · Convivência — KAENA',
  },
];

export default function Leisure() {
  const [active, setActive] = useState(0);

  return (
    <section id="lazer" className="leisure" aria-label="Lazer KAENA Guaratuba">
      {/* Intro */}
      <div className="leisure__intro container">
        <p className="eyebrow leisure__eyebrow reveal">Mais de 3.000 m² de lazer</p>
        <h2 className="leisure__title display-title reveal delay-100">
          Aqui, lazer não é complemento.<br />
          <em>É parte da rotina.</em>
        </h2>
        <p className="leisure__sub reveal delay-200">
          Um clube completo para cada momento do seu dia —<br className="hidden-mobile" />
          do amanhecer ao entardecer, da academia ao gourmet.
        </p>
      </div>

      {/* Experiência do dia — Seletor criativo */}
      <div className="leisure__day-experience container--wide reveal delay-200">
        {/* Tabs de período */}
        <div className="leisure__tabs" role="tablist" aria-label="Período do dia">
          {timeSlots.map((slot, i) => (
            <button
              key={slot.id}
              className={`leisure__tab ${active === i ? 'active' : ''}`}
              role="tab"
              aria-selected={active === i}
              aria-controls={`panel-${slot.id}`}
              id={`tab-${slot.id}`}
              onClick={() => setActive(i)}
            >
              <span className="leisure__tab-icon" aria-hidden="true">{slot.icon}</span>
              <span className="leisure__tab-label">{slot.period}</span>
            </button>
          ))}
        </div>

        {/* Painel ativo */}
        <div className="leisure__panels">
          {timeSlots.map((slot, i) => (
            <div
              key={slot.id}
              className={`leisure__panel ${active === i ? 'active' : ''}`}
              role="tabpanel"
              id={`panel-${slot.id}`}
              aria-labelledby={`tab-${slot.id}`}
              hidden={active !== i}
            >
              <div className="leisure__panel-grid">
                {/* Imagem */}
                <div className="leisure__panel-img">
                  <img
                    src={slot.image}
                    alt={slot.imageLabel}
                    loading="lazy"
                    className="leisure__img"
                    onError={(e) => {
                      const t = e.currentTarget.parentElement!;
                      t.classList.add('img-placeholder');
                      t.setAttribute('data-label', slot.imageLabel);
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>

                {/* Texto */}
                <div className="leisure__panel-text">
                  <p className="eyebrow leisure__panel-period">{slot.period}</p>
                  <h3 className="leisure__panel-headline display-title">
                    {slot.headline}
                  </h3>
                  <ul className="leisure__spaces" aria-label={`Espaços disponíveis no período da ${slot.period}`}>
                    {slot.spaces.map((space) => (
                      <li key={space} className="leisure__space">
                        <span className="leisure__space-dot" aria-hidden="true" />
                        {space}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={getWhatsAppUrl(`Olá! Quero saber mais sobre o KAENA Guaratuba e seus espaços de lazer.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline-dark leisure__cta"
                    id={`leisure-cta-${slot.id}`}
                  >
                    Conhecer o Empreendimento
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Grid de todos os espaços */}
      <div className="leisure__all container reveal">
        <p className="eyebrow leisure__all-eyebrow">Estrutura completa</p>
        <div className="leisure__all-grid" aria-label="Todos os espaços de lazer">
          {[
            'Piscina Coberta Aquecida', 'Piscina com Borda Infinita', 'Piscina Externa',
            'Piscina Infantil', 'Prainha', 'Bar Molhado',
            'Spa', 'Sauna', 'Academia Completa',
            'Academia Externa', 'Beach Tennis', 'Quadra Poliesportiva',
            'Playground', 'Espaço Kids', 'Espaço Teen',
            'Brinquedoteca', 'Salões de Festas', 'Espaços Gourmet',
            'Coworking', 'Sala de Jogos', 'Espaço Pet',
            'Pet Wash', 'Lavanderia Coletiva', 'Bicicletário',
          ].map((space) => (
            <span key={space} className="leisure__tag">{space}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
