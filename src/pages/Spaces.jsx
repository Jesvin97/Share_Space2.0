import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import PageHeader from '../components/PageHeader';
import { MapPin, Phone, Lock, SlidersHorizontal, X } from 'lucide-react';

const spacesData = [
  { id: 1,  name: "Sunset Loft Studio",          location: "Bangalore", type: "Studio",           price: 1500, img: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&q=80&w=800", phone: "+91 98765 00001" },
  { id: 2,  name: "Heritage Courtyard",           location: "Kerala",    type: "Event Space",      price: 3000, img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800", phone: "+91 98765 00002" },
  { id: 3,  name: "Industrial Warehouse",         location: "Chennai",   type: "Creative Content", price: 2000, img: "https://images.unsplash.com/photo-1574360773950-618e47bba097?auto=format&fit=crop&q=80&w=800", phone: "+91 98765 00003" },
  { id: 4,  name: "Banjara Hills Villa",          location: "Hyderabad", type: "Film Shoot",       price: 5000, img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800", phone: "+91 98765 00004" },
  { id: 5,  name: "The Glasshouse",               location: "Bangalore", type: "Event Space",      price: 4000, img: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&q=80&w=800", phone: "+91 98765 00005" },
  { id: 6,  name: "Kochi Backwater Deck",         location: "Kerala",    type: "Creative Content", price: 2500, img: "https://images.unsplash.com/photo-1596395819057-e37f55a8516b?auto=format&fit=crop&q=80&w=800", phone: "+91 98765 00006" },
  { id: 7,  name: "ECR Beachfront Setup",         location: "Chennai",   type: "Film Shoot",       price: 3500, img: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&q=80&w=800", phone: "+91 98765 00007" },
  { id: 8,  name: "Jubilee Arts Center",          location: "Hyderabad", type: "Studio",           price: 1200, img: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&q=80&w=800", phone: "+91 98765 00008" },
  { id: 9,  name: "Indiranagar Rooftop",          location: "Bangalore", type: "Event Space",      price: 1800, img: "https://images.unsplash.com/photo-1533106497176-45ae19e68ba2?auto=format&fit=crop&q=80&w=800", phone: "+91 98765 00009" },
  { id: 10, name: "Munnar Tea Estate Bungalow",   location: "Kerala",    type: "Film Shoot",       price: 6000, img: "https://images.unsplash.com/photo-1562237887-b67adcb82e4e?auto=format&fit=crop&q=80&w=800", phone: "+91 98765 00010" },
];

const ALL_LOCATIONS = ['All', ...new Set(spacesData.map(s => s.location))];
const ALL_TYPES     = ['All', ...new Set(spacesData.map(s => s.type))];
const PRICE_RANGES  = [
  { label: 'Any Price',       min: 0,    max: Infinity },
  { label: 'Under ₹2,000',   min: 0,    max: 1999 },
  { label: '₹2,000 – ₹4,000', min: 2000, max: 4000 },
  { label: 'Above ₹4,000',   min: 4001, max: Infinity },
];

/* ── Pill button helper ── */
const Pill = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    style={{
      padding: '0.45rem 1.1rem',
      borderRadius: '100px',
      border: `1px solid ${active ? 'var(--primary)' : 'rgba(255,255,255,0.08)'}`,
      background: active ? 'rgba(212,175,55,0.15)' : 'transparent',
      color: active ? 'var(--primary)' : 'var(--text-muted)',
      fontWeight: active ? '700' : '500',
      fontSize: '0.82rem',
      cursor: 'pointer',
      transition: 'all 0.25s ease',
      whiteSpace: 'nowrap',
      letterSpacing: '0.03em',
    }}
  >
    {children}
  </button>
);

const Spaces = () => {
  const isSignedIn = localStorage.getItem('isAuthenticated') === 'true';

  const [filterLocation, setFilterLocation] = useState('All');
  const [filterType,     setFilterType]     = useState('All');
  const [filterPrice,    setFilterPrice]    = useState(0); // index into PRICE_RANGES

  const filtered = useMemo(() => {
    const { min, max } = PRICE_RANGES[filterPrice];
    return spacesData.filter(s =>
      (filterLocation === 'All' || s.location === filterLocation) &&
      (filterType     === 'All' || s.type     === filterType)     &&
      (s.price >= min && s.price <= max)
    );
  }, [filterLocation, filterType, filterPrice]);

  const clearFilters = () => {
    setFilterLocation('All');
    setFilterType('All');
    setFilterPrice(0);
  };
  const hasActiveFilters = filterLocation !== 'All' || filterType !== 'All' || filterPrice !== 0;

  return (
    <div className="page-wrapper">
      <PageHeader
        title="Discover Spaces"
        subtitle="Find the perfect studios and event venues across South India for your next creative project."
      />

      {/* ── Auth Banner ── */}
      {isSignedIn ? (
        <div style={{ textAlign: 'center', padding: '0.8rem', backgroundColor: 'rgba(0,200,83,0.08)', borderBottom: '1px solid #00c853', color: 'var(--text-main)' }}>
          <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: '500' }}>
            Welcome back, Admin · Full access to host contact details
          </p>
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '0.8rem', backgroundColor: 'rgba(212,175,55,0.06)', borderBottom: '1px solid var(--border)', color: 'var(--text-main)' }}>
          <p style={{ display: 'inline-block', marginRight: '1rem', fontSize: '0.9rem' }}>
            <Lock size={13} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} />
            Sign in to unlock host phone numbers
          </p>
          <Link to="/signin" className="btn-primary" style={{ padding: '0.35rem 1rem', fontSize: '0.8rem', textDecoration: 'none', display: 'inline-block' }}>
            Sign In
          </Link>
        </div>
      )}

      {/* ── Filter Bar ── */}
      <div style={{ background: 'var(--surface)', borderBottom: '1px solid rgba(255,255,255,0.04)', padding: '1.25rem 0', position: 'sticky', top: '70px', zIndex: 100 }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            <SlidersHorizontal size={16} color="var(--primary)" style={{ flexShrink: 0 }} />

            {/* Location */}
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', borderRight: '1px solid rgba(255,255,255,0.07)', paddingRight: '0.75rem', marginRight: '0.25rem' }}>
              {ALL_LOCATIONS.map(loc => (
                <Pill key={loc} active={filterLocation === loc} onClick={() => setFilterLocation(loc)}>{loc}</Pill>
              ))}
            </div>

            {/* Type / Reason */}
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', borderRight: '1px solid rgba(255,255,255,0.07)', paddingRight: '0.75rem', marginRight: '0.25rem' }}>
              {ALL_TYPES.map(t => (
                <Pill key={t} active={filterType === t} onClick={() => setFilterType(t)}>{t}</Pill>
              ))}
            </div>

            {/* Price Range */}
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
              {PRICE_RANGES.map((r, i) => (
                <Pill key={r.label} active={filterPrice === i} onClick={() => setFilterPrice(i)}>{r.label}</Pill>
              ))}
            </div>

            {/* Clear */}
            {hasActiveFilters && (
              <button onClick={clearFilters} style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '0.3rem', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.82rem' }}>
                <X size={14} /> Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── Results Count ── */}
      <div className="container" style={{ paddingTop: '1.5rem' }}>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
          {filtered.length === 0
            ? 'No spaces match your filters.'
            : `Showing ${filtered.length} space${filtered.length > 1 ? 's' : ''}`}
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
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.88 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="glass"
                style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
              >
                <div style={{ height: '200px', overflow: 'hidden' }}>
                  <img src={space.img} alt={space.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.06)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                  />
                </div>
                <div style={{ padding: '1.5rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                    <h3 style={{ fontSize: '1.15rem', margin: 0 }}>{space.name}</h3>
                    <span style={{ fontWeight: '700', color: 'var(--primary)', whiteSpace: 'nowrap', marginLeft: '0.5rem' }}>₹{space.price.toLocaleString()}/hr</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', marginBottom: '1rem', fontSize: '0.875rem', flexWrap: 'wrap' }}>
                    <MapPin size={14} />
                    <span>{space.location}</span>
                    <span style={{ opacity: 0.4 }}>•</span>
                    <span style={{ background: 'rgba(212,175,55,0.1)', color: 'var(--primary)', padding: '0.15rem 0.6rem', borderRadius: '100px', fontSize: '0.78rem', fontWeight: '600' }}>
                      {space.type}
                    </span>
                  </div>

                  <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
                    {isSignedIn ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-main)', fontWeight: '500' }}>
                        <Phone size={16} color="#00c853" />
                        <span>{space.phone}</span>
                      </div>
                    ) : (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}>
                        <Lock size={16} color="var(--primary)" />
                        <span style={{ fontSize: '0.875rem' }}>Sign in to view contact</span>
                      </div>
                    )}
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
              <p style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>No spaces found</p>
              <p>Try adjusting or <button onClick={clearFilters} style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', fontWeight: '600' }}>clearing your filters</button></p>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Spaces;
