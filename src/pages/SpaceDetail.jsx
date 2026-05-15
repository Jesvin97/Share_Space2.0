import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Phone, ArrowLeft, CheckCircle2, Info, Calendar } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { motion } from 'framer-motion';

const SpaceDetail = () => {
  const { id } = useParams();
  const [space, setSpace] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch individual space
    fetch(`/api/spaces/${id}`)
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        setSpace(data);
        setLoading(false);
        if (data) {
          document.title = `${data.name} | SpareSpace`;
        }
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="page-wrapper"><div className="container" style={{ padding: '10rem 0', textAlign: 'center' }}><div className="loader"></div></div></div>;
  if (!space) return <div className="page-wrapper"><div className="container" style={{ padding: '10rem 0', textAlign: 'center' }}><h2>Space not found</h2><Link to="/spaces" className="btn-primary" style={{ marginTop: '2rem' }}>Back to Spaces</Link></div></div>;

  const amenities = ["Lighting Equipment", "Air Conditioning", "Ample Parking", "Power Backup", "Changing Rooms", "High-speed Wi-Fi"];

  return (
    <div className="page-wrapper">
      <div className="container" style={{ paddingTop: '2rem' }}>
        <Link to="/spaces" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', marginBottom: '2rem', fontWeight: '600' }}>
          <ArrowLeft size={18} /> Back to Listings
        </Link>

        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '3rem' }}>
          {/* Left: Gallery & Info */}
          <div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass" 
              style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', marginBottom: '2rem' }}
            >
              <img 
                src={space.img || "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&q=80&w=1200"} 
                alt={space.name}
                style={{ width: '100%', height: '500px', objectFit: 'cover' }}
              />
            </motion.div>

            <div style={{ marginBottom: '3rem' }}>
              <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{space.name}</h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-muted)', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <MapPin size={18} color="var(--primary)" />
                  <span>{space.location}</span>
                </div>
                <span style={{ opacity: 0.3 }}>|</span>
                <span style={{ background: 'rgba(212,175,55,0.1)', color: 'var(--primary)', padding: '0.2rem 0.8rem', borderRadius: '100px', fontSize: '0.85rem', fontWeight: '600' }}>
                  {space.type}
                </span>
              </div>

              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>About this space</h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: '1.8', fontSize: '1.1rem', marginBottom: '2rem' }}>
                This premium {space.type.toLowerCase()} in {space.location} offers a versatile environment perfect for your next project. 
                Whether you're planning a professional photo shoot, a creative workshop, or a boutique event, 
                this space provides the ideal backdrop with excellent natural lighting and high-end amenities.
              </p>

              <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Amenities</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
                {amenities.map((a, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-main)' }}>
                    <CheckCircle2 size={18} color="var(--primary)" />
                    <span>{a}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Map Placeholder */}
            <div className="glass" style={{ height: '300px', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem', color: 'var(--text-muted)' }}>
                <MapPin size={40} />
                <p>Location Map View Placeholder</p>
            </div>
          </div>

          {/* Right: Booking Sidebar */}
          <aside>
            <div className="glass" style={{ padding: '2rem', borderRadius: 'var(--radius-lg)', position: 'sticky', top: '100px' }}>
              <div style={{ marginBottom: '2rem' }}>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Starting from</div>
                <div style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--primary)' }}>₹{space.price.toLocaleString()}<span style={{ fontSize: '1rem', color: 'var(--text-muted)', fontWeight: '400' }}> / hr</span></div>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: 'var(--radius-md)', marginBottom: '2rem', border: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', color: 'var(--text-main)' }}>
                   <Info size={18} color="var(--primary)" />
                   <span style={{ fontWeight: '600' }}>Pricing Tiers</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.95rem' }}>
                  <span>Half Day (4 hrs)</span>
                  <span style={{ fontWeight: '700' }}>₹{(space.price * 3.5).toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem' }}>
                  <span>Full Day (8 hrs)</span>
                  <span style={{ fontWeight: '700' }}>₹{(space.price * 6.5).toLocaleString()}</span>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <button className="btn-primary" style={{ width: '100%', padding: '1.25rem' }}>Request to Book</button>
                <div style={{ textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  Free cancellation up to 48 hours before the booking.
                </div>
              </div>

              <div style={{ marginTop: '2.5rem', paddingTop: '2rem', borderTop: '1px solid var(--border)' }}>
                <h4 style={{ marginBottom: '1rem' }}>Hosted by</h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'var(--primary)', color: 'black', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800' }}>SS</div>
                  <div>
                    <div style={{ fontWeight: '600' }}>SpareSpace Partner</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Response time: 1 hour</div>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default SpaceDetail;
