import React from 'react';
import PageHeader from '../components/PageHeader';

const jobs = [
  { title: "General Manager", type: "Full-Time (2+ Years Exp)", desc: "Lead our operational strategy and oversee rapid regional expansion." },
  { title: "Call Center Representative", type: "Full-Time (2+ Years Exp)", desc: "Be the voice of our brand and support our hosts and guests daily." },
  { title: "Regional Manager", type: "Full-Time (2+ Years Exp)", desc: "Drive growth and ensure standard excellence across your assigned region." },
  { title: "Finance Analyst", type: "Full-Time (2+ Years Exp)", desc: "Analyze financial data, manage budgets, and forecast our future growth." },
  { title: "HR Generalist", type: "Full-Time (2+ Years Exp)", desc: "Recruit top talent and foster an incredible, inclusive workplace culture." },
  { title: "Marketing Intern", type: "Internship", desc: "Assist in crafting campaigns and managing our vibrant social media channels." },
  { title: "Software Engineer", type: "Full-Time (2+ Years Exp)", desc: "Build scalable and elegant solutions to power our booking infrastructure." },
  { title: "Operations Associate", type: "Full-Time (2+ Years Exp)", desc: "Streamline day-to-day operations and improve our host onboarding experience." },
  { title: "Sales Intern", type: "Internship", desc: "Help our sales team identify new venue opportunities and generate leads." },
  { title: "Community Manager", type: "Full-Time (2+ Years Exp)", desc: "Nurture our creative community and organize offline events for our creators." },
  { title: "Product Designer", type: "Full-Time (3+ Years Exp)", desc: "Design intuitive and beautiful user experiences for our hosts and guests." },
  { title: "QA Engineer", type: "Full-Time (2+ Years Exp)", desc: "Ensure the reliability and quality of our web and mobile applications." },
  { title: "Data Scientist", type: "Full-Time (3+ Years Exp)", desc: "Leverage data to optimize pricing models and improve search recommendations." },
  { title: "Customer Success Manager", type: "Full-Time (2+ Years Exp)", desc: "Onboard and guide our top-tier hosts to maximize their earning potential." },
  { title: "Content Writer Intern", type: "Internship", desc: "Write compelling copy for our blog, newsletters, and space listings." }
];

const Careers = () => {
  return (
    <div className="page-wrapper">
      <PageHeader title="Careers at SpareSpace" subtitle="Join the team that's building the future of physical creative infrastructure." />
      <section className="section">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--primary)' }}>We are Hiring!</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.125rem', marginBottom: '3rem' }}>Explore our open roles below and find where you belong.</p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', textAlign: 'left' }}>
            {jobs.map((job, index) => (
              <div key={index} className="glass" style={{ padding: '2rem', borderRadius: 'var(--radius-md)', display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ marginBottom: '0.5rem', fontSize: '1.5rem' }}>{job.title}</h3>
                <span style={{ display: 'inline-block', padding: '0.25rem 0.75rem', backgroundColor: 'var(--border)', borderRadius: 'var(--radius-lg)', fontSize: '0.875rem', fontWeight: '500', marginBottom: '1rem', alignSelf: 'flex-start' }}>{job.type}</span>
                <p style={{ color: 'var(--text-muted)', flexGrow: 1, marginBottom: '2rem' }}>{job.desc}</p>
                <button className="btn-primary" style={{ width: '100%' }}>Apply Now</button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Careers;
