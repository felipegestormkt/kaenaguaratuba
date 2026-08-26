import './styles/globals.css';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Numbers from './components/Numbers/Numbers';
import Leisure from './components/Leisure/Leisure';
import Apartments from './components/Apartments/Apartments';

import Location from './components/Location/Location';
import NewGuaratuba from './components/NewGuaratuba/NewGuaratuba';
import ContactForm from './components/ContactForm/ContactForm';
import WhatsAppButton from './components/WhatsAppButton/WhatsAppButton';
import Footer from './components/Footer/Footer';
import { useEffect } from 'react';
import { CONFIG } from './config';

function App() {
  // Scroll reveal global
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const elements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // GTM / Meta Pixel (IDs configurados em config.ts)
  useEffect(() => {
    // Google Tag Manager
    if (CONFIG.tracking.gtmId && CONFIG.tracking.gtmId !== 'GTM-XXXXXXX') {
      const script = document.createElement('script');
      script.innerHTML = `
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${CONFIG.tracking.gtmId}');
      `;
      document.head.appendChild(script);
    }

    // Meta Pixel
    if (CONFIG.tracking.metaPixelId && CONFIG.tracking.metaPixelId !== 'PIXEL_ID') {
      const script = document.createElement('script');
      script.innerHTML = `
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '${CONFIG.tracking.metaPixelId}');
        fbq('track', 'PageView');
      `;
      document.head.appendChild(script);
    }
  }, []);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Numbers />
        <Leisure />
        <Apartments />

        <Location />
        <NewGuaratuba />
        <ContactForm />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}

export default App;
