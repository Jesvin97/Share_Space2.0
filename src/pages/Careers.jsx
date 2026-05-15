import React, { useState, useEffect } from 'react';
import PageHeader from '../components/PageHeader';
import { client } from '../lib/sanity';

const CAREERS_QUERY = `*[_type == "career"] | order(order asc) {
  _id, title, type, description, location
}`;

const Careers = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Creative Industry Jobs & Careers | SpareSpace";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', "Join the team building the future of physical creative infrastructure. Explore jobs in South India's premier space booking platform.");
    }

    client.fetch(CAREERS_QUERY)
      .then(data => { setJobs(data); setLoading(false); })
      .catch(err => { console.error('Sanity careers fetch error:', err); setLoading(false); });
  }, []);
  return (
    <div className="page-wrapper">
      <PageHeader title="Careers at SpareSpace" subtitle="Join the team that's building the future of physical creative infrastructure." />
      <section className="section">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--primary)' }}>We are Hiring!!!</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.125rem', marginBottom: '3rem' }}>Explore our open roles below and find where you belong.</p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', textAlign: 'left' }}>
            {loading ? (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem' }}>Loading opportunities...</div>
            ) : jobs.length === 0 ? (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem' }}>No open roles at the moment. Check back soon!</div>
            ) : (
              jobs.map((job) => (
                <div key={job._id} className="glass" style={{ padding: '2rem', borderRadius: 'var(--radius-md)', display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{ marginBottom: '0.5rem', fontSize: '1.5rem' }}>{job.title}</h3>
                  <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                    <span style={{ display: 'inline-block', padding: '0.25rem 0.75rem', backgroundColor: 'var(--border)', borderRadius: 'var(--radius-lg)', fontSize: '0.875rem', fontWeight: '500' }}>{job.type}</span>
                    {job.location && <span style={{ display: 'inline-block', padding: '0.25rem 0.75rem', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 'var(--radius-lg)', fontSize: '0.875rem', color: 'var(--text-muted)' }}>{job.location}</span>}
                  </div>
                  <p style={{ color: 'var(--text-muted)', flexGrow: 1, marginBottom: '2rem' }}>{job.description}</p>
                  <button className="btn-primary" style={{ width: '100%' }}>Apply Now !</button>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Careers;
