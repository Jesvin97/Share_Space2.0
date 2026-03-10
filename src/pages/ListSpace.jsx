import React from 'react';
import PageHeader from '../components/PageHeader';

const ListSpace = () => {
  return (
    <div className="page-wrapper">
      <PageHeader title="List Your Space" subtitle="Turn your space into a steady source of income. Join our community of premium hosts today." />
      <section className="section">
        <div className="container" style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{ marginBottom: '1rem' }}>Start Earning in 3 Easy Steps</h2>
          <ol style={{ textAlign: 'left', marginBottom: '2rem', lineHeight: '2' }}>
            <li><strong>Describe Your Space:</strong> Upload high-quality photos and list your amenities.</li>
            <li><strong>Set Your Rules:</strong> Define your availability, pricing, and specific rules.</li>
            <li><strong>Review and Accept:</strong> Start receiving booking requests from verified users.</li>
          </ol>
          <button className="btn-primary" style={{ fontSize: '1.125rem', padding: '1rem 2rem' }}>Create Listing</button>
        </div>
      </section>
    </div>
  );
};

export default ListSpace;
