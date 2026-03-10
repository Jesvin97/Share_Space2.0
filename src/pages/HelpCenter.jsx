import React from 'react';
import PageHeader from '../components/PageHeader';

const HelpCenter = () => {
  return (
    <div className="page-wrapper">
      <PageHeader title="Help Center" subtitle="Find answers to frequently asked questions and get support for your bookings." />
      <section className="section">
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div className="faq-item" style={{ marginBottom: '2rem', padding: '1.5rem', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)' }}>
            <h3 style={{ marginBottom: '0.5rem' }}>How do I book a space?</h3>
            <p style={{ color: 'var(--text-muted)' }}>Browse spaces, select your preferred dates, and send a booking request. Host approval is usually within 24 hours.</p>
          </div>
          <div className="faq-item" style={{ marginBottom: '2rem', padding: '1.5rem', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)' }}>
            <h3 style={{ marginBottom: '0.5rem' }}>What is the cancellation policy?</h3>
            <p style={{ color: 'var(--text-muted)' }}>Cancellations made 7 days prior to the booking receive a full refund. After that, a 50% fee applies.</p>
          </div>
          <button className="btn-primary">Contact Support</button>
        </div>
      </section>
    </div>
  );
};

export default HelpCenter;
