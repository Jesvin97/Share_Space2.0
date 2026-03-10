import React from 'react';
import PageHeader from '../components/PageHeader';
import { Shield, Lock, CheckCircle } from 'lucide-react';

const TrustSafety = () => {
  return (
    <div className="page-wrapper">
      <PageHeader title="Trust & Safety" subtitle="Your peace of mind is our top priority. Learn how we keep our community safe." />
      <section className="section">
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
          <div className="glass" style={{ padding: '2rem', borderRadius: 'var(--radius-md)' }}>
             <CheckCircle color="var(--primary)" size={32} style={{ marginBottom: '1rem' }} />
             <h3>Verified Hosts</h3>
             <p style={{ color: 'var(--text-muted)' }}>All our hosts go through a rigorous background and identity check before listing their spaces.</p>
          </div>
          <div className="glass" style={{ padding: '2rem', borderRadius: 'var(--radius-md)' }}>
             <Shield color="var(--primary)" size={32} style={{ marginBottom: '1rem' }} />
             <h3>Insurance Coverage</h3>
             <p style={{ color: 'var(--text-muted)' }}>Every booking comes with comprehensive liability insurance up to ₹1,000,000 for damages.</p>
          </div>
          <div className="glass" style={{ padding: '2rem', borderRadius: 'var(--radius-md)' }}>
             <Lock color="var(--primary)" size={32} style={{ marginBottom: '1rem' }} />
             <h3>Secure Payments</h3>
             <p style={{ color: 'var(--text-muted)' }}>We use industry-standard encryption. Payments are held securely until your booking is completed.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TrustSafety;
