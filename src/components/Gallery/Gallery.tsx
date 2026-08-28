import { useState, useEffect, useCallback } from 'react';
import './Gallery.css';

// ============================================================
//  Galeria do Decorado — "Entre. Sinta. Imagine."
//  ⚡ Substitua os srcs pelas fotos reais do Drive
// ============================================================
const photos = [
  {
    id: 'g1',
    src: './images/decorado-sala-principal.jpg',
    alt: 'Sala de estar — Apartamento decorado KAENA Guaratuba',
    label: 'Sala de Estar',
    size: 'large',  // ocupa espaço maior no mosaic
  },
  {
    id: 'g2',
    src: './images/decorado-suite.jpg',
    alt: 'Suíte — Apartamento decorado KAENA Guaratuba',
    label: 'Suíte',
    size: 'normal',
  },
  {
    id: 'g3',
    src: './images/decorado-cozinha.jpg',
    alt: 'Cozinha integrada — Apartamento decorado KAENA Guaratuba',
    label: 'Cozinha',
    size: 'normal',
  },
  {
    id: 'g4',
    src: './images/decorado-sacada.jpg',
    alt: 'Sacada com churrasqueira — Apartamento decorado KAENA Guaratuba',
    label: 'Sacada',
    size: 'normal',
  },
  {
    id: 'g5',
    src: './images/decorado-quarto.jpg',
    alt: 'Quarto — Apartamento decorado KAENA Guaratuba',
    label: 'Quarto',
    size: 'normal',
  },
  {
    id: 'g6',
    src: './images/decorado-banheiro.jpg',
    alt: 'Banheiro — Apartamento decorado KAENA Guaratuba',
    label: 'Banheiro',
    size: 'normal',
  },
];

export default function Gallery() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  const openLightbox = (i: number) => {
    setLightbox(i);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = useCallback(() => {
    setLightbox(null);
    document.body.style.overflow = '';
  }, []);

  const navigate = useCallback((dir: 1 | -1) => {
    setLightbox((prev) => {
      if (prev === null) return null;
      return (prev + dir + photos.length) % photos.length;
    });
  }, []);

  // Keyboard navigation
  useEffect(() => {
    if (lightbox === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') navigate(1);
      if (e.key === 'ArrowLeft') navigate(-1);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [lightbox, closeLightbox, navigate]);

  return (
    <section id="galeria" className="gallery" aria-label="Galeria do Decorado KAENA Guaratuba">
      <div className="gallery__intro container">
        <p className="eyebrow gallery__eyebrow reveal">Galeria do Decorado</p>
        <h2 className="gallery__title display-title reveal delay-100">
          Entre. Sinta.<br /><em>Imagine.</em>
        </h2>
        <p className="gallery__sub reveal delay-200">
          Conheça de perto como pode ser viver no KAENA.
        </p>
      </div>

      {/* Mosaico */}
      <div className="gallery__mosaic container--wide reveal">
        {photos.map((photo, i) => (
          <button
            key={photo.id}
            className={`gallery__item gallery__item--${photo.size}`}
            onClick={() => openLightbox(i)}
            aria-label={`Ver foto: ${photo.label}`}
            id={`gallery-item-${photo.id}`}
          >
            <img
              src={photo.src}
              alt={photo.alt}
              loading="lazy"
              className="gallery__img"
              onError={(e) => {
                const t = e.currentTarget.parentElement!;
                t.classList.add('img-placeholder');
                t.setAttribute('data-label', photo.label);
                e.currentTarget.style.display = 'none';
              }}
            />
            <div className="gallery__item-overlay" aria-hidden="true">
              <span className="gallery__item-label eyebrow">{photo.label}</span>
              <svg className="gallery__item-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M10 3v14M3 10h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="gallery__lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Visualizar foto"
          onClick={closeLightbox}
        >
          <button className="gallery__lb-close" onClick={closeLightbox} aria-label="Fechar galeria">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>

          <button
            className="gallery__lb-nav gallery__lb-nav--prev"
            onClick={(e) => { e.stopPropagation(); navigate(-1); }}
            aria-label="Foto anterior"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>

          <div className="gallery__lb-content" onClick={(e) => e.stopPropagation()}>
            <img
              src={photos[lightbox].src}
              alt={photos[lightbox].alt}
              className="gallery__lb-img"
            />
            <p className="gallery__lb-caption eyebrow">{photos[lightbox].label}</p>
            <p className="gallery__lb-counter">{lightbox + 1} / {photos.length}</p>
          </div>

          <button
            className="gallery__lb-nav gallery__lb-nav--next"
            onClick={(e) => { e.stopPropagation(); navigate(1); }}
            aria-label="Próxima foto"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      )}
    </section>
  );
}
