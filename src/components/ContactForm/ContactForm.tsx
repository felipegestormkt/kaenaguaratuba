import { useState } from 'react';
import type { FormEvent } from 'react';
import { CONFIG, getWhatsAppUrl, getUtmParams } from '../../config';
import './ContactForm.css';

type FormState = 'idle' | 'loading' | 'success' | 'error';

interface FormData {
  name: string;
  whatsapp: string;
  email: string;
  unit: string;
  goal: string;
  lgpd: boolean;
}

const initialData: FormData = {
  name: '',
  whatsapp: '',
  email: '',
  unit: '',
  goal: '',
  lgpd: false,
};

export default function ContactForm() {
  const [form, setForm] = useState<FormData>(initialData);
  const [state, setState] = useState<FormState>('idle');
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const validate = () => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    if (!form.name.trim()) newErrors.name = 'Informe seu nome.';
    if (!form.whatsapp.trim() || form.whatsapp.replace(/\D/g, '').length < 10)
      newErrors.whatsapp = 'Informe um WhatsApp válido.';
    if (!form.lgpd) newErrors.lgpd = 'Você precisa aceitar para continuar.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const buildWhatsAppMessage = () => {
    const unitLabel = form.unit || 'Ainda não decidi';
    const goalLabel = form.goal || 'Ainda não decidi';
    const utms = getUtmParams();
    const utmStr = Object.keys(utms).length > 0
      ? `\n📊 Origem: ${utms.utm_source || ''} / ${utms.utm_campaign || ''}`
      : '';
    return `Olá! Me chamo *${form.name}* e vi o KAENA Guaratuba.\n\n🏠 Unidade de interesse: *${unitLabel}*\n🎯 Objetivo: *${goalLabel}*\n📱 WhatsApp: ${form.whatsapp}${form.email ? `\n📧 E-mail: ${form.email}` : ''}${utmStr}\n\nGostaria de receber valores, plantas e disponibilidade.`;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setState('loading');

    // Dispara evento de geração de lead
    window.dispatchEvent(new CustomEvent('kaena:generate_lead', {
      detail: { unit: form.unit, goal: form.goal, ...getUtmParams() }
    }));

    // Se tiver endpoint configurado, tenta enviar
    if (CONFIG.form.endpoint) {
      try {
        const res = await fetch(CONFIG.form.endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...form, ...getUtmParams() }),
        });
        if (!res.ok) throw new Error('Erro no envio');
        setState('success');
      } catch {
        setState('error');
      }
    } else {
      // Sem endpoint: vai direto para WhatsApp
      setState('success');
    }
  };

  if (state === 'success') {
    return (
      <section id="contato" className="contact" aria-label="Formulário de contato KAENA">
        <div className="contact__inner container">
          <div className="contact__success">
            <div className="contact__success-icon" aria-hidden="true">
              <svg viewBox="0 0 48 48" fill="none">
                <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.3"/>
                <path d="M14 24l7 7 13-13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <p className="eyebrow contact__success-eyebrow">Recebemos seus dados</p>
            <h2 className="contact__success-title display-title">
              Agora falta pouco<br />para conhecer o KAENA.
            </h2>
            <p className="contact__success-sub">
              Um especialista entrará em contato com você para apresentar valores, plantas e unidades disponíveis.
            </p>
            <a
              href={getWhatsAppUrl(buildWhatsAppMessage())}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary contact__success-cta"
              id="form-success-whatsapp"
            >
              Falar Agora pelo WhatsApp
            </a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contato" className="contact" aria-label="Formulário de contato KAENA">
      <div className="contact__inner container--wide">
        {/* Texto */}
        <div className="contact__text">
          <p className="eyebrow contact__eyebrow reveal">Próximo passo</p>
          <h2 className="contact__title display-title reveal delay-100">
            Pronto para<br />conhecer o KAENA?
          </h2>
          <p className="contact__sub reveal delay-200">
            Preencha seus dados e receba valores, plantas e disponibilidade pelo WhatsApp.
          </p>

          {/* Credencial do corretor */}
          <div className="contact__broker reveal delay-300">
            <div className="contact__broker-avatar" aria-hidden="true">
              {/*
                ⚡ FOTO: Substitua por /images/corretor-cleverson.jpg
              */}
              <img
                src="/images/corretor-cleverson.jpg"
                alt="Cleverson de Arcanjo — Corretor de Imóveis KAENA"
                loading="lazy"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
              <span className="contact__broker-initials" aria-hidden="true">CA</span>
            </div>
            <div>
              <p className="contact__broker-name">{CONFIG.broker.name}</p>
              <p className="contact__broker-role">{CONFIG.broker.title}</p>
              <p className="contact__broker-creci">{CONFIG.broker.creci}</p>
            </div>
          </div>
        </div>

        {/* Formulário */}
        <form
          className="contact__form reveal delay-200"
          onSubmit={handleSubmit}
          noValidate
          aria-label="Formulário de interesse KAENA Guaratuba"
        >
          {/* Nome */}
          <div className={`contact__field ${errors.name ? 'error' : ''}`}>
            <label htmlFor="form-name" className="contact__label">Nome <span aria-hidden="true">*</span></label>
            <input
              id="form-name"
              name="name"
              type="text"
              className="contact__input"
              placeholder="Seu nome completo"
              value={form.name}
              onChange={handleChange}
              autoComplete="name"
              aria-required="true"
              aria-describedby={errors.name ? 'error-name' : undefined}
            />
            {errors.name && <span id="error-name" className="contact__error" role="alert">{errors.name}</span>}
          </div>

          {/* WhatsApp */}
          <div className={`contact__field ${errors.whatsapp ? 'error' : ''}`}>
            <label htmlFor="form-whatsapp" className="contact__label">WhatsApp <span aria-hidden="true">*</span></label>
            <input
              id="form-whatsapp"
              name="whatsapp"
              type="tel"
              className="contact__input"
              placeholder="(41) 99999-9999"
              value={form.whatsapp}
              onChange={handleChange}
              autoComplete="tel"
              aria-required="true"
              aria-describedby={errors.whatsapp ? 'error-whatsapp' : undefined}
            />
            {errors.whatsapp && <span id="error-whatsapp" className="contact__error" role="alert">{errors.whatsapp}</span>}
          </div>

          {/* E-mail */}
          <div className="contact__field">
            <label htmlFor="form-email" className="contact__label">E-mail <span className="contact__optional">(opcional)</span></label>
            <input
              id="form-email"
              name="email"
              type="email"
              className="contact__input"
              placeholder="seuemail@email.com"
              value={form.email}
              onChange={handleChange}
              autoComplete="email"
            />
          </div>

          {/* Unidade */}
          <div className="contact__field">
            <label htmlFor="form-unit" className="contact__label">Qual unidade você procura?</label>
            <select
              id="form-unit"
              name="unit"
              className="contact__select"
              value={form.unit}
              onChange={handleChange}
            >
              <option value="">Selecione uma opção</option>
              <option value="2 quartos — aprox. 60 m²">2 quartos — aproximadamente 60 m²</option>
              <option value="3 quartos — aprox. 70 m²">3 quartos — aproximadamente 70 m²</option>
              <option value="Quero conhecer as duas opções">Quero conhecer as duas opções</option>
            </select>
          </div>

          {/* Objetivo */}
          <div className="contact__field">
            <label htmlFor="form-goal" className="contact__label">Seu objetivo com o imóvel?</label>
            <select
              id="form-goal"
              name="goal"
              className="contact__select"
              value={form.goal}
              onChange={handleChange}
            >
              <option value="">Selecione uma opção</option>
              <option value="Morar">Morar</option>
              <option value="Segunda residência">Segunda residência</option>
              <option value="Investir">Investir</option>
              <option value="Ainda estou avaliando">Ainda estou avaliando</option>
            </select>
          </div>

          {/* LGPD */}
          <div className={`contact__field contact__field--checkbox ${errors.lgpd ? 'error' : ''}`}>
            <label className="contact__checkbox-label">
              <input
                type="checkbox"
                name="lgpd"
                id="form-lgpd"
                className="contact__checkbox"
                checked={form.lgpd}
                onChange={handleChange}
                aria-required="true"
                aria-describedby={errors.lgpd ? 'error-lgpd' : undefined}
              />
              <span className="contact__checkbox-custom" aria-hidden="true" />
              <span className="contact__checkbox-text">
                Concordo em receber contato do especialista sobre o KAENA Guaratuba por WhatsApp e e-mail, conforme a{' '}
                <a href="#" onClick={(e) => e.preventDefault()} className="contact__link">Política de Privacidade</a>.
              </span>
            </label>
            {errors.lgpd && <span id="error-lgpd" className="contact__error" role="alert">{errors.lgpd}</span>}
          </div>

          {/* Botão */}
          <button
            type="submit"
            className={`btn btn-primary contact__submit ${state === 'loading' ? 'loading' : ''}`}
            id="form-submit-btn"
            disabled={state === 'loading'}
            aria-busy={state === 'loading'}
          >
            {state === 'loading' ? (
              <><span className="contact__spinner" aria-hidden="true" /> Enviando...</>
            ) : (
              'Receber Valores e Disponibilidade'
            )}
          </button>

          {/* Microcopy */}
          <p className="contact__microcopy">
            Um especialista entrará em contato para apresentar as unidades disponíveis.
          </p>

          {state === 'error' && (
            <p className="contact__error-msg" role="alert">
              Ocorreu um erro ao enviar. Tente falar diretamente pelo{' '}
              <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer">WhatsApp</a>.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
