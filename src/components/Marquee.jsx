import React from 'react';
import './Marquee.css';

/* 
 * Drinksom-style infinite horizontal marquee strip.
 * Two identical rows scrolling in opposite directions for depth layering.
 * Uses pure CSS animation for GPU-accelerated 60fps performance.
 */

const items = [
  'Discover South India',
  '✦',
  'Book Instantly',
  '✦',
  'Premium Studios',
  '✦',
  'Event Spaces',
  '✦',
  'Film Locations',
  '✦',
  'Creative Venues',
  '✦',
  'Kerala Backwaters',
  '✦',
  'Bangalore Rooftops',
  '✦',
  'Chennai Warehouses',
  '✦',
];

const MarqueeStrip = ({ direction = 'left', speed = 40 }) => {
  // Duplicate items to create seamless infinite loop
  const doubled = [...items, ...items];

  return (
    <div className={`marquee-track marquee-${direction}`} style={{ '--speed': `${speed}s` }}>
      {doubled.map((item, i) => (
        <span key={i} className="marquee-item">{item}</span>
      ))}
    </div>
  );
};

const Marquee = () => {
  return (
    <div className="marquee-section">
      {/* Row 1 — scrolls left */}
      <MarqueeStrip direction="left" speed={35} />
      {/* Row 2 — scrolls right, offset for cinematic depth */}
      <MarqueeStrip direction="right" speed={50} />
    </div>
  );
};

export default Marquee;
