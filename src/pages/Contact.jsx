import React from 'react';
import PageHeader from '../components/PageHeader';
import { Mail, Phone, MapPin } from 'lucide-react';

const Contact = () => {
  return (
    <div className="page-wrapper">
      <PageHeader title="Contact Us" subtitle="We're here to help. Reach out to our team." />
      <section className="section">
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 2fr', gap: '4rem' }}>
          <div>
            <h2 style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>Get in Touch</h2>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', color: 'var(--text-muted)' }}>
              <Mail color="var(--primary)" />
              <span>hello@sparespace.co.in</span>
            </div>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', color: 'var(--text-muted)' }}>
              <Phone color="var(--primary)" />
              <span>+91 98765 43210</span>
            </div>
            <div style={{ display: 'flex', gap: '1rem', color: 'var(--text-muted)' }}>
              <MapPin color="var(--primary)" />
              <span>Bangalore, Karnataka, India</span>
            </div>
          </div>
          <div className="glass" style={{ padding: '2rem', borderRadius: 'var(--radius-md)' }}>
             <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
               <input type="text" placeholder="Your Name" style={{ padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', fontFamily: 'inherit' }} />
               <input type="email" placeholder="Your Email" style={{ padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', fontFamily: 'inherit' }} />
               <textarea placeholder="Your Message" rows="5" style={{ padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', fontFamily: 'inherit', resize: 'vertical' }}></textarea>
               <button type="button" className="btn-primary" style={{ alignSelf: 'flex-start' }}>Send Message</button>
             </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
