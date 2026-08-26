// ============================================================
//  KAENA GUARATUBA — CONFIGURAÇÕES CENTRAIS
//  Altere aqui os dados antes de publicar
// ============================================================

export const CONFIG = {
  // ----------------------------------------------------------
  //  WHATSAPP
  //  Altere apenas este número para trocar o WhatsApp em toda a página
  // ----------------------------------------------------------
  whatsapp: {
    number: '554195835110', // formato internacional, sem + ou espaços
    message: 'Olá! Vi o KAENA Guaratuba e gostaria de receber informações sobre valores, plantas e unidades disponíveis.',
  },

  // ----------------------------------------------------------
  //  TRACKING DE MARKETING
  //  Substitua os IDs antes de publicar
  // ----------------------------------------------------------
  tracking: {
    gtmId: 'GTM-XXXXXXX',       // Google Tag Manager
    metaPixelId: 'PIXEL_ID',    // Meta Pixel (Facebook/Instagram)
    ga4Id: 'G-XXXXXXXXXX',      // Google Analytics 4
  },

  // ----------------------------------------------------------
  //  FORMULÁRIO
  //  Endpoint para envio (ex: Formspree, Make, n8n, etc.)
  // ----------------------------------------------------------
  form: {
    endpoint: '', // Ex: 'https://formspree.io/f/xxxxxxxx'
    // Quando vazio, o formulário redireciona para o WhatsApp
  },

  // ----------------------------------------------------------
  //  EMPREENDIMENTO
  // ----------------------------------------------------------
  project: {
    name: 'KAENA',
    fullName: 'KAENA Guaratuba',
    address: 'R. Dr. José Mugiatti Sobrinho, 479',
    city: 'Guaratuba — PR',
    mapsUrl: 'https://maps.google.com/?q=R.+Dr.+José+Mugiatti+Sobrinho,+479,+Guaratuba,+PR',
    mapsEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3590.0!2d-48.5754!3d-25.8845!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sR.+Dr.+Jos%C3%A9+Mugiatti+Sobrinho%2C+479%2C+Guaratuba+-+PR!5e0!3m2!1spt-BR!2sbr!4v1629000000000!5m2!1spt-BR!2sbr',
  },

  // ----------------------------------------------------------
  //  CORRETOR
  // ----------------------------------------------------------
  broker: {
    name: 'Cleverson de Arcanjo',
    title: 'Corretor de Imóveis',
    creci: 'CRECI-PR F53058',
    company: 'Cleverson Arcanjo Negócios Imobiliários Ltda.',
  },

  // ----------------------------------------------------------
  //  SEO
  // ----------------------------------------------------------
  seo: {
    title: 'KAENA Guaratuba | Condomínio Clube em Guaratuba PR',
    description: 'O primeiro grande condomínio clube de Guaratuba. Apartamentos de 2 e 3 quartos com mais de 3.000 m² de lazer, piscina de borda infinita, beach tennis e muito mais. Conheça o KAENA.',
    canonical: 'https://kaenaguaratuba.com.br', // Altere para o domínio real
    ogImage: '/images/og-kaena.jpg',
  },
} as const;

// ----------------------------------------------------------
//  HELPER: URL do WhatsApp com mensagem pré-preenchida
// ----------------------------------------------------------
export function getWhatsAppUrl(customMessage?: string): string {
  const msg = customMessage || CONFIG.whatsapp.message;
  return `https://wa.me/${CONFIG.whatsapp.number}?text=${encodeURIComponent(msg)}`;
}

// ----------------------------------------------------------
//  HELPER: Captura UTMs da URL atual e retorna objeto
// ----------------------------------------------------------
export function getUtmParams(): Record<string, string> {
  if (typeof window === 'undefined') return {};
  const params = new URLSearchParams(window.location.search);
  const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
  const result: Record<string, string> = {};
  utmKeys.forEach(key => {
    const val = params.get(key);
    if (val) result[key] = val;
  });
  return result;
}
