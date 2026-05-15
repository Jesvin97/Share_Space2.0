import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { client } from '../lib/sanity';

const FAQ_QUERY = `*[_type == "faq"] | order(order asc) { _id, question, answer }`;

const FAQ = () => {
  const [faqs, setFaqs] = useState([]);
  const [openId, setOpenId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client.fetch(FAQ_QUERY)
      .then(data => { setFaqs(data); setLoading(false); })
      .catch(err => { console.error('Sanity FAQ fetch error:', err); setLoading(false); });
  }, []);

  const toggle = (id) => setOpenId(prev => prev === id ? null : id);

  if (loading) return null;
  if (!faqs.length) return null;

  return (
    <section className="section" id="faq" style={{ paddingTop: '5rem', paddingBottom: '5rem' }}>
      <div className="container" style={{ maxWidth: '780px' }}>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '3.5rem' }}
        >
          <h2 className="section-title">Frequently Asked <em>Questions</em></h2>
          <p className="section-subtitle">Everything you need to know about Share Space</p>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {faqs.map((faq, index) => (
            <motion.div
              key={faq._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
              className="glass"
              style={{ borderRadius: '16px', overflow: 'hidden' }}
            >
              <button
                onClick={() => toggle(faq._id)}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center',
                  justifyContent: 'space-between', gap: '1rem',
                  padding: '1.25rem 1.5rem', background: 'transparent',
                  border: 'none', cursor: 'pointer', textAlign: 'left',
                  color: 'inherit',
                }}
              >
                <span style={{ fontSize: '1rem', fontWeight: 600, lineHeight: 1.4 }}>
                  {faq.question}
                </span>
                <span style={{
                  flexShrink: 0, width: '28px', height: '28px', borderRadius: '50%',
                  background: openId === faq._id ? 'var(--primary)' : 'rgba(255,255,255,0.08)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'background 0.2s',
                  color: openId === faq._id ? '#000' : 'var(--primary)',
                }}>
                  {openId === faq._id ? <Minus size={14} /> : <Plus size={14} />}
                </span>
              </button>

              <AnimatePresence initial={false}>
                {openId === faq._id && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div style={{
                      padding: '0 1.5rem 1.25rem',
                      color: 'var(--text-muted)',
                      fontSize: '0.95rem',
                      lineHeight: 1.7,
                      borderTop: '1px solid rgba(255,255,255,0.06)',
                      paddingTop: '1rem',
                    }}>
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
