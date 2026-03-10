import React from 'react';
import PageHeader from '../components/PageHeader';

const Careers = () => {
  return (
    <div className="page-wrapper">
      <PageHeader title="Careers at SpareSpace" subtitle="Join the team that's building the future of physical creative infrastructure." />
      <section className="section">
        <div className="container" style={{ textAlign: 'center' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.125rem' }}>We are currently not hiring, but we are always looking for exceptional talent in Engineering, Operations, and Regional Scouting.</p>
          <br/>
          <button className="btn-outline">Send Open Application</button>
        </div>
      </section>
    </div>
  );
};

export default Careers;
