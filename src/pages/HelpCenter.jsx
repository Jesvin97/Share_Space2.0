import React from 'react';
import PageHeader from '../components/PageHeader';

const faqs = [
  { topic: "Booking", question: "How do I book a space?", answer: "Browse spaces, select your preferred dates, and send a booking request. Host approval is usually within 24 hours." },
  { topic: "Cancellation", question: "What is the cancellation policy?", answer: "Cancellations made 7 days prior to the booking receive a full refund. After that, a 50% fee applies depending on the host's strictness settings." },
  { topic: "Host Contact", question: "How can I contact the host?", answer: "Once your booking request is confirmed, you will receive the host's contact details and can communicate directly via our in-app messaging system." },
  { topic: "Fees", question: "Are there any hidden service fees?", answer: "We transparently display a standard 10% platform fee at checkout. No hidden charges or surprise costs ever." },
  { topic: "Extensions", question: "Can I extend my booking timezone on the day?", answer: "Yes, you can request an extension through your booking dashboard. It is subject to the host's real-time availability and approval." }
];

const HelpCenter = () => {
  return (
    <div className="page-wrapper">
      <PageHeader title="Help Center" subtitle="Find answers to frequently asked questions and get support for your bookings." />
      <section className="section">
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
          
          <h2 style={{ fontSize: '2rem', marginBottom: '2rem', textAlign: 'center' }}>Frequently Asked Questions</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '4rem' }}>
            {faqs.map((faq, index) => (
              <div key={index} className="faq-item" style={{ padding: '1.5rem', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--surface)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <h3 style={{ fontSize: '1.25rem' }}>{faq.question}</h3>
                  <span style={{ fontSize: '0.875rem', color: 'var(--primary)', fontWeight: '600' }}>{faq.topic}</span>
                </div>
                <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>{faq.answer}</p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', padding: '3rem', backgroundColor: 'var(--bg-color)', borderRadius: 'var(--radius-lg)' }}>
            <h2 style={{ marginBottom: '1rem', fontSize: '1.75rem' }}>Still have questions?</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Our dedicated support team is here to assist you 24/7.</p>
            <button className="btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1.125rem' }}>Contact Support</button>
          </div>
          
        </div>
      </section>
    </div>
  );
};

export default HelpCenter;
