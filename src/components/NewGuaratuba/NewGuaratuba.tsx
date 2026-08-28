import './NewGuaratuba.css';

const timeline = [
  {
    id: 'ponte',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <path d="M2 22h28M8 22V14l8-6 8 6v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M14 22v-5h4v5" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
    title: 'Ponte de Guaratuba',
    text: 'Conectividade que transforma o acesso à cidade.',
  },
  {
    id: 'infra',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <path d="M5 27V10l11-7 11 7v17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <rect x="12" y="18" width="8" height="9" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="9" y="14" width="5" height="4" stroke="currentColor" strokeWidth="1.2"/>
        <rect x="18" y="14" width="5" height="4" stroke="currentColor" strokeWidth="1.2"/>
      </svg>
    ),
    title: 'Nova Infraestrutura',
    text: 'Modernização urbana e revitalização dos principais eixos da cidade.',
  },
  {
    id: 'plano',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <path d="M6 26V6h20v20H6z" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M10 12h12M10 16h8M10 20h10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Novo Plano Diretor',
    text: 'Verticalização planejada e marco legal que apoia o desenvolvimento.',
  },
  {
    id: 'padrao',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <path d="M16 4l3 6h7l-5.5 4 2 7L16 17.5 9.5 21l2-7L6 10h7z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Novo Padrão Imobiliário',
    text: 'Uma nova geração de empreendimentos eleva a qualidade de vida na cidade.',
  },
  {
    id: 'kaena',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <path d="M7 28V12l9-8 9 8v16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M7 20h6M19 20h6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        <path d="M13 28v-8h6v8" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
    title: 'KAENA',
    text: 'O primeiro grande condomínio clube. O símbolo desta nova fase.',
    highlight: true,
  },
];

export default function NewGuaratuba() {
  return (
    <section className="new-gtu" aria-label="A nova Guaratuba">
      {/* Imagem de fundo */}
      <div className="new-gtu__bg" aria-hidden="true">
        {/*
          ⚡ IMAGEM: Recomendação — foto da Ponte de Guaratuba ou vista aérea da cidade
          Caminho sugerido: /images/guaratuba-aerial.jpg
        */}
        <img
          src="./images/guaratuba-aerial.jpg"
          alt=""
          loading="lazy"
          className="new-gtu__bg-img"
          onError={(e) => { e.currentTarget.style.display = 'none'; }}
        />
      </div>

      <div className="new-gtu__overlay" aria-hidden="true" />

      <div className="new-gtu__content container">
        {/* Título */}
        <div className="new-gtu__header reveal">
          <p className="eyebrow new-gtu__eyebrow">Contexto e oportunidade</p>
          <h2 className="new-gtu__title display-title">
            Uma nova Guaratuba<br />
            <em>está surgindo.</em>
          </h2>
          <p className="new-gtu__sub">
            A cidade vive um novo ciclo. E o KAENA chega para ser parte dessa transformação.
          </p>
        </div>

        {/* Timeline */}
        <div className="new-gtu__timeline" role="list">
          {timeline.map((item, i) => (
            <div
              key={item.id}
              className={`new-gtu__step reveal ${item.highlight ? 'new-gtu__step--highlight' : ''}`}
              style={{ transitionDelay: `${i * 0.12}s` }}
              role="listitem"
            >
              <div className="new-gtu__step-icon" aria-hidden="true">
                {item.icon}
              </div>
              <div className="new-gtu__step-line" aria-hidden="true" />
              <div className="new-gtu__step-body">
                <h3 className="new-gtu__step-title">{item.title}</h3>
                <p className="new-gtu__step-text">{item.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Closing line */}
        <p className="new-gtu__closing reveal">
          Um novo capítulo da cidade.{' '}
          <em>Um novo endereço para fazer parte dele.</em>
        </p>
      </div>
    </section>
  );
}
