import React, { useState } from 'react';
import PageHeader from '../components/PageHeader';
import { ShieldCheck } from 'lucide-react';

const ListSpace = () => {
  const [formData, setFormData] = useState({
    spaceName: '',
    location: '',
    hourlyRate: ''
  });

  const handleWhatsAppSubmit = (e) => {
    e.preventDefault();
    const { spaceName, location, hourlyRate } = formData;
    
    if (parseInt(hourlyRate) < 100) {
      alert('Hourly rate must be at least ₹100');
      return;
    }

    const message = `hi this is location "${spaceName}" from "${location}" and i charging rate ₹ "${hourlyRate}"`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

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
                <li><strong>Describe Your Space:</strong> Provide essential details and pricing for your listing.</li>
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
              <form onSubmit={handleWhatsAppSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500' }}>Space Name</label>
                  <input 
                    type="text" 
                    name="spaceName"
                    placeholder="e.g. Vintage Loft Studio" 
                    value={formData.spaceName}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', background: 'var(--bg-color)', color: 'var(--text-main)' }} 
                    required 
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500' }}>Location / City (South India)</label>
                  <input 
                    type="text" 
                    name="location"
                    placeholder="e.g. Bangalore, Chennai, Kochi" 
                    value={formData.location}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', background: 'var(--bg-color)', color: 'var(--text-main)' }} 
                    required 
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500' }}>Hourly Rate (₹)</label>
                  <input 
                    type="number" 
                    name="hourlyRate"
                    placeholder="e.g. 500" 
                    min="100"
                    value={formData.hourlyRate}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', background: 'var(--bg-color)', color: 'var(--text-main)' }} 
                    required 
                  />
                  <small style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Min amount: ₹100</small>
                </div>

                <button type="submit" className="btn-primary" style={{ width: '100%', padding: '1rem', marginTop: '1rem' }}>Submit Listing via WhatsApp</button>
              </form>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default ListSpace;
