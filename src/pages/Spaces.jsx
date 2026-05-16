import React, { useState, useMemo, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import PageHeader from '../components/PageHeader';
import { MapPin, Phone, SlidersHorizontal, X, Eye } from 'lucide-react';

/* ─── Contact Reveal Component ─── */
const SpaceContact = ({ phone }) => {
  const [revealed, setRevealed] = useState(false);

  if (revealed) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-main)', fontWeight: '500', animation: 'fadeIn 0.3s ease' }}>
        <Phone size={15} color="#00c853" />
        <a href={`tel:${phone}`} style={{ color: 'inherit', textDecoration: 'none' }}>{phone}</a>
      </div>
    );
  }

  return (
    <button
      onClick={() => setRevealed(true)}
      style={{
        background: 'rgba(212,175,55,0.1)',
        border: '1px dashed var(--primary)',
        color: 'var(--primary)',
        padding: '0.4rem 0.8rem',
        borderRadius: '6px',
        fontSize: '0.8rem',
        fontWeight: '600',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '0.4rem',
        width: '100%',
        justifyContent: 'center',
        transition: 'all 0.2s ease'
      }}
      onMouseEnter={e => e.currentTarget.style.background = 'rgba(212,175,55,0.2)'}
      onMouseLeave={e => e.currentTarget.style.background = 'rgba(212,175,55,0.1)'}
    >
      <Eye size={14} /> Reveal Contact
    </button>
  );
};

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
      border: `1px solid ${active ? 'var(--primary)' : 'var(--border)'}`,
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
  const location = useLocation();

  useEffect(() => {
    document.title = "Browse Studios & Creative Spaces | SpareSpace";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', "Browse and book photography studios, film sets, and event venues in Bangalore, Chennai, Kochi and more.");
    }

    // 1. Fetch from API
    fetch('/api/spaces')
      .then(r => r.ok ? r.json() : null)
      .then(data => { if (data) setSpaces(data); })
      .catch(() => setFetchError(true));

    // 2. Check for query params (e.g. ?city=chennai)
    const params = new URLSearchParams(location.search);
    const city = params.get('city');
    if (city) {
      const formattedCity = city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();
      if (LOCATIONS.includes(formattedCity)) {
        setFilterLocation(formattedCity);
      }
    }
  }, [location.search]);

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
      <div style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)', padding: '1rem 0', position: 'sticky', top: '70px', zIndex: 100 }}>
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

          {/* Price chips */}
          <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', alignSelf: 'center', marginRight: '0.5rem' }}>Price:</span>
            {[
              { label: 'Under ₹2k', value: '2000' },
              { label: '₹2k - ₹5k', value: '5000' },
              { label: '₹5k+', value: '100000' }
            ].map(p => (
              <Pill 
                key={p.value} 
                active={maxPrice === p.value} 
                onClick={() => setMaxPrice(maxPrice === p.value ? '' : p.value)}
              >
                {p.label}
              </Pill>
            ))}
          </div>

          {/* Clear */}
          {hasActive && (
            <button
              type="button"
              onClick={clearFilters}
              style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '0.3rem', background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', fontSize: '0.82rem', fontWeight: '700' }}
            >
              <X size={13} /> RESET FILTERS
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
                <Link to={`/spaces/${space.id}`} style={{ display: 'flex', flexDirection: 'column', height: '100%', color: 'inherit' }}>
                  {/* Image */}
                  <div style={{ height: '220px', overflow: 'hidden', position: 'relative' }}>
                    <img
                      src={space.img || "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&q=80&w=800"}
                      alt={space.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                      onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.07)'}
                      onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                    />
                    <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', padding: '0.2rem 0.6rem', borderRadius: '100px', fontSize: '0.75rem', fontWeight: '700', color: 'var(--primary)' }}>
                      ₹{space.price.toLocaleString()}/hr
                    </div>
                  </div>

                  {/* Details */}
                  <div style={{ padding: '1.5rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <h3 style={{ fontSize: '1.15rem', marginBottom: '0.5rem' }}>{space.name}</h3>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)', marginBottom: '1.25rem', fontSize: '0.85rem' }}>
                      <MapPin size={13} />
                      <span>{space.location}</span>
                      <span style={{ opacity: 0.4 }}>•</span>
                      <span>{space.type}</span>
                    </div>

                    <div style={{ marginTop: 'auto' }}>
                      <div style={{ marginBottom: '1rem' }}>
                        <SpaceContact phone={space.phone} />
                      </div>
                      <button className="btn-outline" style={{ width: '100%', fontSize: '0.8rem', padding: '0.6rem' }}>View Details</button>
                    </div>
                  </div>
                </Link>
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
