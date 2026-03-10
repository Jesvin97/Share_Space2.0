import React from 'react';
import PageHeader from '../components/PageHeader';

const About = () => {
  return (
    <div className="page-wrapper">
      <PageHeader title="About SpareSpace" subtitle="Our mission is to unlock creative potential by providing access to the most inspiring spaces across South India." />
      <section className="section">
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ marginBottom: '1rem', fontSize: '2rem' }}>Our Story</h2>
          <p style={{ color: 'var(--text-muted)', lineHeight: '1.8', marginBottom: '2rem' }}>
            SpareSpace was born out of a simple observation: South India has incredibly diverse and beautiful spaces—from heritage bungalows in Kerala to modern industrial lofts in Bangalore—but discovering and booking them was a chaotic, offline process.
          </p>
          <h2 style={{ marginBottom: '1rem', fontSize: '2rem' }}>What We Do</h2>
          <p style={{ color: 'var(--text-muted)', lineHeight: '1.8' }}>
            We connect creators, filmmakers, event planners, and brands with unique spaces. We take care of the logistics, trust, and safety, so you can focus entirely on your craft.
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;
