import React, { useState, useEffect } from 'react';
import PageHeader from '../components/PageHeader';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutGrid, 
  FileText, 
  Plus, 
  Edit2, 
  Trash2, 
  Save, 
  X, 
  Globe, 
  Database, 
  Info,
  ExternalLink
} from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('spaces');
  const [spaces, setSpaces] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Form States
  const [editingItem, setEditingItem] = useState(null); // { type: 'space'|'blog', data: {} }
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({});
  const [message, setMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [spacesRes, blogsRes] = await Promise.all([
        fetch('/api/spaces'),
        fetch('/api/blogs')
      ]);
      const spacesData = await spacesRes.json();
      const blogsData = await blogsRes.json();
      setSpaces(Array.isArray(spacesData) ? spacesData : []);
      setBlogs(Array.isArray(blogsData) ? blogsData : []);
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (type, item) => {
    setEditingItem({ type, id: item.id });
    setFormData({ ...item });
    setIsAdding(false);
  };

  const handleAdd = (type) => {
    setEditingItem({ type, id: null });
    setIsAdding(true);
    if (type === 'space') {
      setFormData({ name: '', location: 'Bangalore', type: 'Studio', price: 1000, phone: '', img: '' });
    } else {
      setFormData({ 
        title: '', 
        slug: '', 
        content: '', 
        category: 'SEO', 
        image_url: '', 
        summary_tldr: '', 
        structured_data: '{}', 
        citations: '[]' 
      });
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const type = editingItem.type;
    const id = editingItem.id;
    const url = id ? `/api/${type}s/${id}` : `/api/${type}s`;
    const method = id ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save');
      
      setMessage({ text: `Successfully ${id ? 'updated' : 'added'} ${type}!`, type: 'success' });
      setEditingItem(null);
      setIsAdding(false);
      fetchData();
      setTimeout(() => setMessage({ text: '', type: '' }), 3000);
    } catch (err) {
      setMessage({ text: err.message, type: 'error' });
    }
  };

  const handleDelete = async (type, id) => {
    if (!window.confirm(`Are you sure you want to delete this ${type}?`)) return;
    try {
      const res = await fetch(`/api/${type}s/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      setMessage({ text: `${type} deleted.`, type: 'success' });
      fetchData();
      setTimeout(() => setMessage({ text: '', type: '' }), 3000);
    } catch (err) {
      setMessage({ text: err.message, type: 'error' });
    }
  };

  return (
    <div className="page-wrapper">
      <PageHeader 
        title="Master Control Panel" 
        subtitle="Manage your platform's inventory and knowledge base. Authorized access only." 
      />

      <section className="section">
        <div className="container">
          
          {message.text && (
            <div style={{ 
              padding: '1rem', 
              borderRadius: 'var(--radius-sm)', 
              marginBottom: '2rem',
              background: message.type === 'success' ? 'rgba(0,200,83,0.1)' : 'rgba(255,50,50,0.1)',
              border: `1px solid ${message.type === 'success' ? '#00c853' : '#ff3232'}`,
              color: message.type === 'success' ? '#00c853' : '#ff3232',
              textAlign: 'center',
              fontWeight: '600'
            }}>
              {message.text}
            </div>
          )}

          <div style={{ display: 'flex', gap: '2rem', marginBottom: '3rem' }}>
            <button 
              onClick={() => setActiveTab('spaces')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '1rem 2rem',
                borderRadius: 'var(--radius-md)',
                background: activeTab === 'spaces' ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                color: activeTab === 'spaces' ? '#000' : 'var(--text-main)',
                border: 'none',
                cursor: 'pointer',
                fontWeight: '700',
                transition: 'all 0.3s ease'
              }}
            >
              <LayoutGrid size={20} /> Manage Spaces
            </button>
            <button 
              onClick={() => setActiveTab('blogs')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '1rem 2rem',
                borderRadius: 'var(--radius-md)',
                background: activeTab === 'blogs' ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                color: activeTab === 'blogs' ? '#000' : 'var(--text-main)',
                border: 'none',
                cursor: 'pointer',
                fontWeight: '700',
                transition: 'all 0.3s ease'
              }}
            >
              <FileText size={20} /> Manage Blogs
            </button>
          </div>

          <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: '1.5rem' }}>
              {activeTab === 'spaces' ? 'Platform Spaces' : 'Knowledge Base Articles'}
            </h2>
            <button 
              className="btn-primary"
              onClick={() => handleAdd(activeTab === 'spaces' ? 'space' : 'blog')}
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.2rem' }}
            >
              <Plus size={18} /> Add New {activeTab === 'spaces' ? 'Space' : 'Blog'}
            </button>
          </div>

          <div className="glass" style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: 'rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                  <th style={{ padding: '1.25rem' }}>Name / Title</th>
                  <th style={{ padding: '1.25rem' }}>{activeTab === 'spaces' ? 'Location' : 'Category'}</th>
                  <th style={{ padding: '1.25rem' }}>{activeTab === 'spaces' ? 'Price' : 'Slug'}</th>
                  <th style={{ padding: '1.25rem', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {(activeTab === 'spaces' ? spaces : blogs).map(item => (
                  <tr key={item.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '1.25rem', fontWeight: '600' }}>{activeTab === 'spaces' ? item.name : item.title}</td>
                    <td style={{ padding: '1.25rem' }}>
                      <span style={{ 
                        padding: '0.2rem 0.6rem', 
                        borderRadius: '4px', 
                        background: 'rgba(212,175,55,0.1)', 
                        color: 'var(--primary)',
                        fontSize: '0.8rem',
                        fontWeight: '600'
                      }}>
                        {activeTab === 'spaces' ? item.location : item.category}
                      </span>
                    </td>
                    <td style={{ padding: '1.25rem', color: 'var(--text-muted)' }}>
                      {activeTab === 'spaces' ? `₹${item.price}/hr` : item.slug}
                    </td>
                    <td style={{ padding: '1.25rem', textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
                        <button 
                          onClick={() => handleEdit(activeTab === 'spaces' ? 'space' : 'blog', item)}
                          style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
                          title="Edit"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button 
                          onClick={() => handleDelete(activeTab === 'spaces' ? 'space' : 'blog', item.id)}
                          style={{ background: 'none', border: 'none', color: '#ff5252', cursor: 'pointer' }}
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Edit/Add Modal */}
      <AnimatePresence>
        {editingItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'rgba(0,0,0,0.85)',
              backdropFilter: 'blur(10px)',
              zIndex: 1000,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '2rem'
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              style={{
                background: 'var(--surface)',
                width: '100%',
                maxWidth: '900px',
                maxHeight: '90vh',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                border: '1px solid var(--border)'
              }}
            >
              <div style={{ 
                padding: '1.5rem 2rem', 
                borderBottom: '1px solid var(--border)', 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <h3 style={{ fontSize: '1.25rem' }}>
                  {isAdding ? 'Add New' : 'Edit'} {editingItem.type === 'space' ? 'Space' : 'Blog'}
                </h3>
                <button 
                  onClick={() => setEditingItem(null)}
                  style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
                >
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSave} style={{ padding: '2rem', overflowY: 'auto' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
                  {editingItem.type === 'space' ? (
                    <>
                      <div className="form-group">
                        <label>Space Name</label>
                        <input 
                          type="text" 
                          value={formData.name || ''} 
                          onChange={e => setFormData({...formData, name: e.target.value})}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Location</label>
                        <select 
                          value={formData.location || ''} 
                          onChange={e => setFormData({...formData, location: e.target.value})}
                        >
                          <option>Bangalore</option>
                          <option>Chennai</option>
                          <option>Hyderabad</option>
                          <option>Kerala</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Type</label>
                        <select 
                          value={formData.type || ''} 
                          onChange={e => setFormData({...formData, type: e.target.value})}
                        >
                          <option>Studio</option>
                          <option>Event Space</option>
                          <option>Film Shoot</option>
                          <option>Creative Content</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Price (₹/hr)</label>
                        <input 
                          type="number" 
                          value={formData.price || ''} 
                          onChange={e => setFormData({...formData, price: e.target.value})}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Phone</label>
                        <input 
                          type="text" 
                          value={formData.phone || ''} 
                          onChange={e => setFormData({...formData, phone: e.target.value})}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Image URL</label>
                        <input 
                          type="text" 
                          value={formData.img || ''} 
                          onChange={e => setFormData({...formData, img: e.target.value})}
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="form-group" style={{ gridColumn: 'span 2' }}>
                        <label>Blog Title</label>
                        <input 
                          type="text" 
                          value={formData.title || ''} 
                          onChange={e => setFormData({...formData, title: e.target.value})}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Slug</label>
                        <input 
                          type="text" 
                          value={formData.slug || ''} 
                          onChange={e => setFormData({...formData, slug: e.target.value})}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Category</label>
                        <select 
                          value={formData.category || ''} 
                          onChange={e => setFormData({...formData, category: e.target.value})}
                        >
                          <option>SEO</option>
                          <option>AEO</option>
                          <option>LLMSEO</option>
                          <option>GEO</option>
                        </select>
                      </div>
                      <div className="form-group" style={{ gridColumn: 'span 2' }}>
                        <label>Content (Text/Markdown)</label>
                        <textarea 
                          rows="6"
                          value={formData.content || ''} 
                          onChange={e => setFormData({...formData, content: e.target.value})}
                          required
                          style={{ width: '100%', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border)', color: '#fff', padding: '1rem', borderRadius: 'var(--radius-sm)' }}
                        />
                      </div>
                      <div className="form-group" style={{ gridColumn: 'span 2' }}>
                        <label>TL;DR Summary (AEO/GEO Optimized)</label>
                        <textarea 
                          rows="3"
                          value={formData.summary_tldr || ''} 
                          onChange={e => setFormData({...formData, summary_tldr: e.target.value})}
                          style={{ width: '100%', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border)', color: '#fff', padding: '1rem', borderRadius: 'var(--radius-sm)' }}
                        />
                      </div>
                      <div className="form-group" style={{ gridColumn: 'span 2' }}>
                        <label>Structured Data (JSON-LD)</label>
                        <textarea 
                          rows="4"
                          value={formData.structured_data || '{}'} 
                          onChange={e => setFormData({...formData, structured_data: e.target.value})}
                          style={{ width: '100%', fontFamily: 'monospace', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border)', color: '#fff', padding: '1rem', borderRadius: 'var(--radius-sm)' }}
                        />
                      </div>
                      <div className="form-group" style={{ gridColumn: 'span 2' }}>
                        <label>Citations & Sources (JSON Array)</label>
                        <input 
                          type="text" 
                          value={formData.citations || '[]'} 
                          onChange={e => setFormData({...formData, citations: e.target.value})}
                          placeholder='[{"name": "Source", "url": "https://..."}]'
                        />
                      </div>
                      <div className="form-group" style={{ gridColumn: 'span 2' }}>
                        <label>Image URL</label>
                        <input 
                          type="text" 
                          value={formData.image_url || ''} 
                          onChange={e => setFormData({...formData, image_url: e.target.value})}
                        />
                      </div>
                    </>
                  )}
                </div>

                <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                  <button 
                    type="button" 
                    onClick={() => setEditingItem(null)}
                    style={{ padding: '0.75rem 1.5rem', background: 'transparent', border: '1px solid var(--border)', color: 'var(--text-main)', borderRadius: 'var(--radius-sm)', cursor: 'pointer' }}
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="btn-primary"
                    style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 2rem' }}
                  >
                    <Save size={18} /> Save Changes
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .form-group label {
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .form-group input, .form-group select {
          padding: 0.75rem 1rem;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border);
          background: rgba(0,0,0,0.2);
          color: #fff;
          outline: none;
        }
        .form-group input:focus, .form-group select:focus {
          border-color: var(--primary);
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;
