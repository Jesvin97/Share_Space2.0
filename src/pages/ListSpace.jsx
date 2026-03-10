import React from 'react';
import PageHeader from '../components/PageHeader';
import { ShieldCheck, UploadCloud } from 'lucide-react';

const ListSpace = () => {
  return (
    <div className="page-wrapper">
      <PageHeader title="List Your Space" subtitle="Turn your space into a steady source of income. Join our community of premium hosts today." />
      <section className="section">
        <div className="container" style={{ textAlign: 'center', maxWidth: '1000px', margin: '0 auto' }}>
          
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#e6f7ef', color: '#0d6efd', padding: '0.5rem 1rem', borderRadius: '50px', marginBottom: '2rem', fontSize: '0.875rem', fontWeight: '600' }}>
             <ShieldCheck size={18} color="#0d6efd" />
             <span>100% Secure & Verified Platform</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', textAlign: 'left', alignItems: 'start' }}>
            <div>
              <h2 style={{ marginBottom: '1rem', fontSize: '1.75rem' }}>Start Earning Today</h2>
              <ol style={{ textAlign: 'left', marginBottom: '2rem', lineHeight: '2', paddingLeft: '1.25rem' }}>
                <li><strong>Describe Your Space:</strong> Upload high-quality photos and list your amenities.</li>
                <li><strong>Set Your Rules:</strong> Define your availability, pricing, and specific rules.</li>
                <li><strong>Review and Accept:</strong> Start receiving booking requests from verified users.</li>
              </ol>

              <div className="glass" style={{ padding: '1.5rem', borderRadius: 'var(--radius-sm)', marginBottom: '2rem', borderLeft: '4px solid var(--primary)' }}>
                <h3 style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>Pricing Transparency</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: '1.6' }}>We provide end-to-end security, background verification for guests, and liability insurance. To maintain this premium infrastructure, we charge a very small one-time listing verification fee of ₹499. You keep 100% of your earnings after our modest 3% transaction fee per booking.</p>
              </div>
            </div>

            <div className="glass" style={{ padding: '2rem', borderRadius: 'var(--radius-lg)' }}>
              <h3 style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>Create Secure Listing</h3>
              <form onSubmit={e => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500' }}>Space Name</label>
                  <input type="text" placeholder="e.g. Vintage Loft Studio" style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', background: 'var(--bg-color)', color: 'var(--text-main)' }} required />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500' }}>Location / City</label>
                  <input type="text" placeholder="e.g. Bangalore" style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', background: 'var(--bg-color)', color: 'var(--text-main)' }} required />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500' }}>Hourly Rate (₹)</label>
                  <input type="number" placeholder="1500" min="100" style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', background: 'var(--bg-color)', color: 'var(--text-main)' }} required />
                </div>
                
                <div style={{ border: '2px dashed var(--border)', padding: '2rem', textAlign: 'center', borderRadius: 'var(--radius-sm)', marginTop: '0.5rem', color: 'var(--text-muted)' }}>
                  <UploadCloud size={32} style={{ margin: '0 auto 0.5rem', display: 'block' }} />
                  <span style={{ fontSize: '0.875rem' }}>Upload Photos (Up to 10)</span>
                </div>

                <button className="btn-primary" style={{ width: '100%', padding: '1rem', marginTop: '1rem' }}>Submit Listing & Pay ₹499</button>
              </form>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default ListSpace;
