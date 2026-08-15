import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import Products from '../components/Products';
import Contact from '../components/Contact';
import TrustSignals from '../components/TrustSignals';
import Testimonials from '../components/Testimonials';

function Home() {
  return (
    <main>
      <Hero />
      <Products />
      <TrustSignals />
      <About />
      <Services />
      <Testimonials />
      <Contact />
    </main>
  );
}

export default Home;
