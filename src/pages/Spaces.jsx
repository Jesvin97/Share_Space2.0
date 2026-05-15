import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageHeader from '../components/PageHeader';
import { MapPin, Phone, SlidersHorizontal, X } from 'lucide-react';

/* ─── Default seed data ─── */
const DEFAULT_SPACES = [
  { id: 1,  name: "Sunset Loft Studio",        location: "Bangalore", type: "Studio",           price: 1500, img: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&q=80&w=800", phone: "+91 98765 00001" },
  { id: 2,  name: "Heritage Courtyard",         location: "Kerala",    type: "Event Space",      price: 3000, img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800", phone: "+91 98765 00002" },
  { id: 3,  name: "Industrial Warehouse",       location: "Chennai",   type: "Creative Content", price: 2000, img: "https://images.unsplash.com/photo-1574360773950-618e47bba097?auto=format&fit=crop&q=80&w=800", phone: "+91 98765 00003" },
  { id: 4,  name: "Banjara Hills Villa",        location: "Hyderabad", type: "Film Shoot",       price: 5000, img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800", phone: "+91 98765 00004" },
  { id: 5,  name: "The Glasshouse",             location: "Bangalore", type: "Event Space",      price: 4000, img: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&q=80&w=800", phone: "+91 98765 00005" },
  { id: 6,  name: "Kochi Backwater Deck",       location: "Kerala",    type: "Creative Content", price: 2500, img: "https://images.unsplash.com/photo-1596395819057-e37f55a8516b?auto=format&fit=crop&q=80&w=800", phone: "+91 98765 00006" },
  { id: 7,  name: "ECR Beachfront Setup",       location: "Chennai",   type: "Film Shoot",       price: 3500, img: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&q=80&w=800", phone: "+91 98765 00007" },
  { id: 8,  name: "Jubilee Arts Center",        location: "Hyderabad", type: "Studio",           price: 1200, img: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&q=80&w=800", phone: "+91 98765 00008" },
  { id: 9,  name: "Indiranagar Rooftop",        location: "Bangalore", type: "Event Space",      price: 1800, img: "https://images.unsplash.com/photo-1533106497176-45ae19e68ba2?auto=format&fit=crop&q=80&w=800", phone: "+91 98765 00009" },
  { id: 10, name: "Munnar Tea Estate Bungalow", location: "Kerala",    type: "Film Shoot",       price: 6000, img: "https://images.unsplash.com/photo-1562237887-b67adcb82e4e?auto=format&fit=crop&q=80&w=800", phone: "+91 98765 00010" },
];

const LOCATIONS = ['All', 'Bangalore', 'Chennai', 'Hyderabad', 'Kerala'];
const TYPES     = ['All', 'Studio', 'Event Space', 'Film Shoot', 'Creative Content'];

/* ─── Pill filter button ─── */
const Pill = ({ active, onClick, children }) => (
  <button
    type="button"
    onClick={onClick}
    style={{
      padding: '0.45rem 1.1rem',
      borderRadius: '100px',
      border: `1px solid ${active ? 'var(--primary)' : 'rgba(255,255,255,0.1)'}`,
      background: active ? 'rgba(212,175,55,0.18)' : 'transparent',
      color: active ? 'var(--primary)' : 'var(--text-muted)',
      fontWeight: active ? '700' : '500',
      fontSize: '0.82rem',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      whiteSpace: 'nowrap',
      fontFamily: 'inherit',
    }}
  >
    {children}
  </button>
);

/* ─── Admin Add Form ─── */
const EMPTY_FORM = { name: '', location: 'Bangalore', type: 'Studio', price: '', phone: '', img: '' };

const Spaces = () => {
  const [fetchError, setFetchError] = useState(false);
  const [spaces, setSpaces] = useState(DEFAULT_SPACES);

  useEffect(() => {
    fetch('/api/spaces')
      .then(r => r.ok ? r.json() : null)
      .then(data => { if (data) setSpaces(data); })
      .catch(() => setFetchError(true));
  }, []);

  /* Filters */
  const [filterLocation, setFilterLocation] = useState('All');
  const [filterType,     setFilterType]     = useState('All');
  const [maxPrice,       setMaxPrice]       = useState('');

  const filtered = useMemo(() => {
    return spaces.filter(s => {
      const locOk   = filterLocation === 'All' || s.location === filterLocation;
      const typeOk  = filterType     === 'All' || s.type     === filterType;
      const priceOk = maxPrice === '' || s.price <= Number(maxPrice);
      return locOk && typeOk && priceOk;
    });
  }, [spaces, filterLocation, filterType, maxPrice]);

  const clearFilters = () => { setFilterLocation('All'); setFilterType('All'); setMaxPrice(''); };
  const hasActive = filterLocation !== 'All' || filterType !== 'All' || maxPrice !== '';

  return (
    <div className="page-wrapper">
      <PageHeader title="Discover Spaces" subtitle="Find the perfect studios and event venues across South India for your next creative project." />

      {/* ── Filter Bar ── */}
      <div style={{ background: 'var(--surface)', borderBottom: '1px solid rgba(255,255,255,0.04)', padding: '1rem 0', position: 'sticky', top: '70px', zIndex: 100 }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          <SlidersHorizontal size={15} color="var(--primary)" style={{ flexShrink: 0 }} />

          {/* Location pills */}
          <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', paddingRight: '0.75rem', borderRight: '1px solid rgba(255,255,255,0.07)' }}>
            {LOCATIONS.map(loc => (
              <Pill key={loc} active={filterLocation === loc} onClick={() => setFilterLocation(loc)}>{loc}</Pill>
            ))}
          </div>

          {/* Type pills */}
          <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', paddingRight: '0.75rem', borderRight: '1px solid rgba(255,255,255,0.07)' }}>
            {TYPES.map(t => (
              <Pill key={t} active={filterType === t} onClick={() => setFilterType(t)}>{t}</Pill>
            ))}
          </div>

          {/* Max price input */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>Max ₹</span>
            <input
              type="number"
              placeholder="Any"
              value={maxPrice}
              onChange={e => setMaxPrice(e.target.value)}
              style={{
                width: '90px', padding: '0.4rem 0.6rem', borderRadius: '100px',
                border: maxPrice ? '1px solid var(--primary)' : '1px solid rgba(255,255,255,0.1)',
                background: 'transparent', color: 'var(--text-main)',
                fontFamily: 'inherit', fontSize: '0.82rem', outline: 'none',
              }}
            />
          </div>

          {/* Clear */}
          {hasActive && (
            <button
              type="button"
              onClick={clearFilters}
              style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '0.3rem', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.82rem', fontFamily: 'inherit' }}
            >
              <X size={13} /> Clear
            </button>
          )}
        </div>
      </div>

      {/* Results count */}
      <div className="container" style={{ paddingTop: '1.5rem' }}>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
          {filtered.length === 0 ? 'No spaces match your filters.' : `Showing ${filtered.length} space${filtered.length !== 1 ? 's' : ''}`}
        </p>
      </div>

      {/* ── Listing Grid ── */}
      <section className="section" style={{ paddingTop: '1.5rem' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
          <AnimatePresence mode="popLayout">
            {filtered.map(space => (
              <motion.div
                key={space.id}
                layout
                initial={{ opacity: 0, scale: 0.93 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.88 }}
                transition={{ duration: 0.3 }}
                className="glass"
                style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', display: 'flex', flexDirection: 'column', position: 'relative' }}
              >
                {/* Image */}
                <div style={{ height: '200px', overflow: 'hidden' }}>
                  <img
                    src={space.img}
                    alt={space.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.07)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                  />
                </div>

                {/* Details */}
                <div style={{ padding: '1.5rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                    <h3 style={{ fontSize: '1.1rem', margin: 0 }}>{space.name}</h3>
                    <span style={{ fontWeight: '700', color: 'var(--primary)', whiteSpace: 'nowrap', marginLeft: '0.5rem' }}>₹{space.price.toLocaleString()}/hr</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)', marginBottom: '1rem', fontSize: '0.85rem', flexWrap: 'wrap' }}>
                    <MapPin size={13} />
                    <span>{space.location}</span>
                    <span style={{ opacity: 0.4 }}>•</span>
                    <span style={{ background: 'rgba(212,175,55,0.1)', color: 'var(--primary)', padding: '0.15rem 0.6rem', borderRadius: '100px', fontSize: '0.75rem', fontWeight: '600' }}>
                      {space.type}
                    </span>
                  </div>

                  <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-main)', fontWeight: '500' }}>
                      <Phone size={15} color="#00c853" />
                      <span>{space.phone}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Empty state */}
          {filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '5rem 0', color: 'var(--text-muted)' }}
            >
              <p style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</p>
              <p style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>No spaces match your filters</p>
              <button type="button" onClick={clearFilters} style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', fontWeight: '600', fontFamily: 'inherit', fontSize: '0.95rem' }}>
                Clear all filters
              </button>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Spaces;
