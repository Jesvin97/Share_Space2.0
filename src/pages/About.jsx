import React, { useEffect, useRef } from 'react';
import './About.css';

const About = () => {
  const revealsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add('visible'), i * 80);
        }
      });
    }, { threshold: 0.12 });

    revealsRef.current.forEach(el => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const addToRefs = el => {
    if (el && !revealsRef.current.includes(el)) {
      revealsRef.current.push(el);
    }
  };

  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="about-hero-left">
          <div className="about-eyebrow">Production House · Est. 2019</div>
          <h1 className="about-hero-title">
            Every frame<br/>needs the<br/><em>right space.</em>
          </h1>
          <p className="about-hero-sub">
            We are SpareSpace — a creative production house obsessed with finding the perfect backdrop for every shoot, every story, every save-the-date.
          </p>
          <a href="#story" className="about-hero-cta">Our Story</a>
        </div>
        <div className="about-hero-right">
          <div className="about-hero-collage">
            <div className="about-collage-top"></div>
            <div className="about-collage-bottom">
              <div className="about-collage-bl"></div>
              <div className="about-collage-br"></div>
            </div>
          </div>
          <div className="about-hero-label">SpareSpace Productions</div>
        </div>
        <div className="about-year-stamp">2019</div>
      </section>

      <div className="about-marquee-wrap">
        <div className="about-marquee">
          <span>Save the Date Shoots</span><span className="about-dot">✦</span>
          <span>Model Photography</span><span className="about-dot">✦</span>
          <span>Fashion Campaigns</span><span className="about-dot">✦</span>
          <span>Brand Visuals</span><span className="about-dot">✦</span>
          <span>Editorial Spreads</span><span className="about-dot">✦</span>
          <span>Commercial Production</span><span className="about-dot">✦</span>
          <span>Save the Date Shoots</span><span className="about-dot">✦</span>
          <span>Model Photography</span><span className="about-dot">✦</span>
          <span>Fashion Campaigns</span><span className="about-dot">✦</span>
          <span>Brand Visuals</span><span className="about-dot">✦</span>
        </div>
      </div>

      <section className="about-story" id="story">
        <div className="about-story-sidebar about-reveal" ref={addToRefs}>
          <div className="about-sidebar-label">By the Numbers</div>
          <div className="about-sidebar-stat">
            <div className="about-stat-num">200+</div>
            <div className="about-stat-label">Productions Completed</div>
          </div>
          <div className="about-sidebar-divider"></div>
          <div className="about-sidebar-stat">
            <div className="about-stat-num">85+</div>
            <div className="about-stat-label">Unique Locations Scouted</div>
          </div>
          <div className="about-sidebar-divider"></div>
          <div className="about-sidebar-stat">
            <div className="about-stat-num">6</div>
            <div className="about-stat-label">Cities, One Vision</div>
          </div>
        </div>
        <div className="about-story-body about-reveal" ref={addToRefs}>
          <h2>We started with a <em>frustration.</em></h2>
          <p>
            In 2019, our founders — a cinematographer and a fashion photographer — were in the middle of a last-minute save-the-date shoot for a client in Mumbai. The location they'd booked fell through 18 hours before the call time. The scramble that followed was exhausting, expensive, and completely avoidable.
          </p>
          <p>
            That was the night <strong>SpareSpace was born.</strong>
          </p>
          <p>
            We set out to solve the one problem that every production team knows too well: finding the right space. Not just any space — but a space that breathes life into the concept, flatters the light, and holds the energy of the story you're trying to tell. A rooftop that glows at golden hour. A raw industrial warehouse that anchors editorial drama. A sun-drenched penthouse that makes save-the-date memories feel cinematic.
          </p>
          <p>
            Today, SpareSpace is a full-spectrum production house specialising in <strong>save-the-date shoots, model photography, fashion campaigns, and brand visuals</strong>. We don't just direct and shoot — we obsessively curate the environments our cameras live in. Location is not a logistic. It's a creative decision.
          </p>
        </div>
      </section>

      <section className="about-search-section">
        <div className="about-search-inner">
          <div className="about-eyebrow">What We're Always Looking For</div>
          <h2 className="about-search-title">The <em>hunt for space</em><br/>never stops.</h2>
          <p className="about-search-desc">
            Before every production, our location scouts are out — walking buildings, negotiating permits, testing light. Here's the kind of spaces that live on our wishlist.
          </p>
          <div className="about-space-cards about-reveal" ref={addToRefs}>
            <div className="about-space-card">
              <span className="about-card-icon">🏛️</span>
              <div className="about-card-title">Heritage Interiors</div>
              <p className="about-card-desc">Ornate ceilings, aged plaster walls, arched windows. The kind of architectural character that no set designer can replicate. Perfect for regal editorial or intimate save-the-date portraits.</p>
              <span className="about-card-tag">Save the Date</span>
            </div>
            <div className="about-space-card">
              <span className="about-card-icon">🏗️</span>
              <div className="about-card-title">Raw Industrial</div>
              <p className="about-card-desc">Concrete floors, exposed steel, dramatic ceiling heights. High-contrast spaces that create natural tension between softness and structure — ideal for fashion and model shoots.</p>
              <span className="about-card-tag">Model Shoots</span>
            </div>
            <div className="about-space-card">
              <span className="about-card-icon">🌅</span>
              <div className="about-card-title">Open-Sky Terraces</div>
              <p className="about-card-desc">Rooftops, terraces, and penthouse decks with unobstructed sky views. We chase the golden hour, and we need a stage that lets the light perform. Non-negotiable for couple shoots.</p>
              <span className="about-card-tag">Both Formats</span>
            </div>
          </div>
        </div>
      </section>

      <section className="about-philosophy">
        <div>
          <blockquote className="about-philosophy-quote about-reveal" ref={addToRefs}>
            "A great location doesn't just <em>set the scene</em> — it tells half the story before the camera even rolls."
          </blockquote>
          <div className="about-philosophy-text about-reveal" ref={addToRefs}>
            <p>
              At SpareSpace, we believe creative production is inseparable from spatial intelligence. Our directors, photographers, and creative leads spend as much time thinking about a location as they do about composition, styling, or post-production.
            </p>
            <p>
              When a couple walks into the right space for their save-the-date shoot, you can see it in their body language. The stiffness dissolves. The laughter comes naturally. The camera just catches what's already there.
            </p>
            <p>
              That's why we maintain an ever-growing directory of privately scouted spaces across Mumbai, Delhi, Bangalore, Hyderabad, Pune, and Jaipur — from boutique studio lofts to palatial private bungalows. And we're always, always looking to expand it.
            </p>
          </div>
        </div>
        <div className="about-team-card about-reveal" ref={addToRefs}>
          <div className="about-team-label">The Core Team</div>
          <div className="about-team-member">
            <div className="about-avatar">RK</div>
            <div>
              <div className="about-member-name">Rohan Khanna</div>
              <div className="about-member-role">Co-Founder & Creative Director</div>
            </div>
          </div>
          <div className="about-team-member">
            <div className="about-avatar">SA</div>
            <div>
              <div className="about-member-name">Simran Ahuja</div>
              <div className="about-member-role">Co-Founder & Lead Photographer</div>
            </div>
          </div>
          <div className="about-team-member">
            <div className="about-avatar">TM</div>
            <div>
              <div className="about-member-name">Tarun Mehta</div>
              <div className="about-member-role">Head of Location Scouting</div>
            </div>
          </div>
          <div className="about-team-member">
            <div className="about-avatar">PD</div>
            <div>
              <div className="about-member-name">Priya Desai</div>
              <div className="about-member-role">Production Manager</div>
            </div>
          </div>
        </div>
      </section>

      <section className="about-cta-footer">
        <h2>Have a <em>space?</em><br/>Let's talk.</h2>
        <p>
          Whether you own a property or manage a venue — if it has good bones and great light, we want to know about it. Partner with SpareSpace.
        </p>
        <a href="mailto:hello@sparespace.in" className="about-cta-btn">Get in Touch</a>
      </section>
    </div>
  );
};

export default About;
