import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import { MapPin, Phone, Lock } from 'lucide-react';

const spacesData = [
  { id: 1, name: "Sunset Loft Studio", location: "Bangalore", type: "Studio", price: 1500, img: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&q=80&w=800", phone: "+91 98765 00001" },
  { id: 2, name: "Heritage Courtyard", location: "Kerala", type: "Event Space", price: 3000, img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800", phone: "+91 98765 00002" },
  { id: 3, name: "Industrial Warehouse", location: "Chennai", type: "Creative Content", price: 2000, img: "https://images.unsplash.com/photo-1574360773950-618e47bba097?auto=format&fit=crop&q=80&w=800", phone: "+91 98765 00003" },
  { id: 4, name: "Banjara Hills Villa", location: "Hyderabad", type: "Film Shoot", price: 5000, img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800", phone: "+91 98765 00004" },
  { id: 5, name: "The Glasshouse", location: "Bangalore", type: "Event Space", price: 4000, img: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&q=80&w=800", phone: "+91 98765 00005" },
  { id: 6, name: "Kochi Backwater Deck", location: "Kerala", type: "Creative Content", price: 2500, img: "https://images.unsplash.com/photo-1596395819057-e37f55a8516b?auto=format&fit=crop&q=80&w=800", phone: "+91 98765 00006" },
  { id: 7, name: "ECR Beachfront Setup", location: "Chennai", type: "Film Shoot", price: 3500, img: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&q=80&w=800", phone: "+91 98765 00007" },
  { id: 8, name: "Jubilee Arts Center", location: "Hyderabad", type: "Studio", price: 1200, img: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&q=80&w=800", phone: "+91 98765 00008" },
  { id: 9, name: "Indiranagar Rooftop", location: "Bangalore", type: "Event Space", price: 1800, img: "https://images.unsplash.com/photo-1533106497176-45ae19e68ba2?auto=format&fit=crop&q=80&w=800", phone: "+91 98765 00009" },
  { id: 10, name: "Munnar Tea Estate Bungalow", location: "Kerala", type: "Film Shoot", price: 6000, img: "https://images.unsplash.com/photo-1562237887-b67adcb82e4e?auto=format&fit=crop&q=80&w=800", phone: "+91 98765 00010" }
];

const Spaces = () => {
  const isSignedIn = localStorage.getItem('isAuthenticated') === 'true';

  return (
    <div className="page-wrapper">
      <PageHeader title="Discover Spaces" subtitle="Find the perfect studios and event venues across South India for your next creative project." />
      
      {isSignedIn ? (
        <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: 'rgba(0, 200, 83, 0.1)', borderBottom: '1px solid #00c853', color: 'var(--text-main)' }}>
          <p style={{ display: 'inline-block', margin: 0, fontSize: '0.9rem', fontWeight: '500' }}>
            Welcome back, Admin. You have full access to host contact details.
          </p>
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: 'rgba(255, 215, 0, 0.1)', borderBottom: '1px solid var(--primary)', color: 'var(--text-main)' }}>
          <p style={{ display: 'inline-block', marginRight: '1rem', fontSize: '0.9rem' }}>
            <Lock size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} />
            Viewing as Guest. Sign in to unlock host phone numbers and direct messaging.
          </p>
          <Link to="/signin" className="btn-primary" style={{ padding: '0.4rem 1rem', fontSize: '0.8rem', textDecoration: 'none', display: 'inline-block' }}>
            Sign In Now
          </Link>
        </div>
      )}

      <section className="section">
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
          {spacesData.map(space => (
            <div key={space.id} className="glass" style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <div style={{ height: '200px', overflow: 'hidden' }}>
                <img src={space.img} alt={space.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ padding: '1.5rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <h3 style={{ fontSize: '1.25rem', margin: 0 }}>{space.name}</h3>
                  <span style={{ fontWeight: '700', color: 'var(--primary)' }}>₹{space.price}/hr</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', marginBottom: '1rem', fontSize: '0.875rem' }}>
                  <MapPin size={16} />
                  <span>{space.location}</span>
                  <span style={{ margin: '0 0.5rem' }}>•</span>
                  <span>{space.type}</span>
                </div>
                
                <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
                  {isSignedIn ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-main)', fontWeight: '500' }}>
                      <Phone size={18} color="green" />
                      <span>{space.phone}</span>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}>
                      <Lock size={18} color="var(--primary)" />
                      <span style={{ fontSize: '0.875rem' }}>Sign in to view host phone number</span>
                    </div>
                  )}
                </div>
                
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Spaces;
