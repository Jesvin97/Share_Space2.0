import React, { useState, useRef, useEffect } from 'react';

// Minimal markdown renderer: bold, newlines
function renderMarkdown(text) {
  const parts = text.split(/(\*\*.*?\*\*|\n)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    if (part === '\n') return <br key={i} />;
    return part;
  });
}

const SparkleIcon = () => (
  <svg stroke="none" fill="currentColor" viewBox="0 0 24 24" height="16" width="16" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z"/>
  </svg>
);

const ChatWindow = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! I\'m your Share Space concierge. Ask me anything about our premium spaces in South India.' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      if (!response.ok) throw new Error('Failed to get response');

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let assistantMessage = { role: 'assistant', content: '' };
      setMessages(prev => [...prev, assistantMessage]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const text = decoder.decode(value, { stream: true });
        assistantMessage.content += text;
        setMessages(prev => {
          const updated = [...prev];
          updated[updated.length - 1] = { ...assistantMessage };
          return updated;
        });
      }
    } catch {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "I'm having trouble connecting right now. Please try again in a moment."
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 10000, fontFamily: 'Inter, system-ui, sans-serif' }}>

      {/* Welcome Bubble */}
      {!isOpen && (
        <div style={{
          position: 'absolute', bottom: '72px', right: 0,
          background: '#111', color: '#fff', borderRadius: '16px',
          padding: '14px 18px', width: '240px', boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
          marginBottom: '8px', animation: 'fadeSlideUp 0.3s ease'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <div style={{ color: '#a78bfa' }}><SparkleIcon /></div>
            <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#a78bfa' }}>Share Space AI</span>
          </div>
          <p style={{ fontSize: '13px', color: '#e5e7eb', lineHeight: 1.5, margin: 0 }}>Ask me about spaces, pricing, or how to list your venue.</p>
          <div style={{ position: 'absolute', bottom: '-6px', right: '22px', width: '12px', height: '12px', background: '#111', transform: 'rotate(45deg)' }} />
        </div>
      )}

      {/* FAB Button */}
      <button
        onClick={() => setIsOpen(o => !o)}
        style={{
          width: '56px', height: '56px', borderRadius: '50%',
          background: 'linear-gradient(135deg, #7c3aed, #111)',
          border: 'none', cursor: 'pointer', display: 'flex',
          alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 20px rgba(124,58,237,0.5)',
          transition: 'transform 0.2s, box-shadow 0.2s',
        }}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.08)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        aria-label="Toggle chat"
      >
        {isOpen ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"><path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"/></svg>
        )}
      </button>

      {/* Chat Panel */}
      {isOpen && (
        <div style={{
          position: 'absolute', bottom: '72px', right: 0,
          width: '360px', height: '520px',
          background: '#0f0f0f', borderRadius: '20px',
          border: '1px solid #1f1f1f',
          boxShadow: '0 24px 60px rgba(0,0,0,0.5)',
          display: 'flex', flexDirection: 'column', overflow: 'hidden'
        }}>

          {/* Header */}
          <div style={{
            padding: '16px 20px', borderBottom: '1px solid #1f1f1f',
            background: 'linear-gradient(135deg, #1a0a2e 0%, #0f0f0f 100%)',
            display: 'flex', alignItems: 'center', gap: '12px'
          }}>
            <div style={{
              width: '36px', height: '36px', borderRadius: '50%',
              background: 'linear-gradient(135deg, #7c3aed, #4f46e5)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff'
            }}>
              <SparkleIcon />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '14px', color: '#fff', letterSpacing: '0.02em' }}>Share Space AI</div>
              <div style={{ fontSize: '11px', color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981', display: 'inline-block' }} />
                Online
              </div>
            </div>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px', overscrollBehavior: 'contain' }}>
            {messages.map((m, idx) => (
              <div key={idx} style={{ display: 'flex', gap: '10px', flexDirection: m.role === 'user' ? 'row-reverse' : 'row', alignItems: 'flex-end' }}>
                {/* Avatar */}
                <div style={{
                  width: '28px', height: '28px', borderRadius: '50%', flexShrink: 0,
                  background: m.role === 'assistant' ? 'linear-gradient(135deg, #7c3aed, #4f46e5)' : '#1f1f1f',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff'
                }}>
                  {m.role === 'assistant'
                    ? <SparkleIcon />
                    : <svg width="14" height="14" viewBox="0 0 24 24" fill="#aaa"><path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm0 2c-5.33 0-8 2.67-8 4v1h16v-1c0-1.33-2.67-4-8-4z"/></svg>
                  }
                </div>
                {/* Bubble */}
                <div style={{
                  maxWidth: '75%', padding: '10px 14px', borderRadius: m.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                  background: m.role === 'assistant' ? '#1a1a1a' : 'linear-gradient(135deg, #7c3aed, #4f46e5)',
                  color: '#f0f0f0', fontSize: '13px', lineHeight: 1.6,
                  border: m.role === 'assistant' ? '1px solid #2a2a2a' : 'none',
                }}>
                  {renderMarkdown(m.content)}
                </div>
              </div>
            ))}

            {/* Loading indicator */}
            {isLoading && (
              <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-end' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'linear-gradient(135deg, #7c3aed, #4f46e5)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                  <SparkleIcon />
                </div>
                <div style={{ padding: '10px 16px', borderRadius: '18px 18px 18px 4px', background: '#1a1a1a', border: '1px solid #2a2a2a', display: 'flex', gap: '4px', alignItems: 'center' }}>
                  {[0, 1, 2].map(i => (
                    <span key={i} style={{
                      width: '6px', height: '6px', borderRadius: '50%', background: '#7c3aed',
                      animation: 'bounce 1.2s infinite', animationDelay: `${i * 0.2}s`
                    }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div style={{ padding: '12px 16px', borderTop: '1px solid #1f1f1f', background: '#0f0f0f' }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                disabled={isLoading}
                placeholder="Ask about spaces..."
                style={{
                  flex: 1, background: '#1a1a1a', border: '1px solid #2a2a2a',
                  borderRadius: '12px', padding: '10px 14px', color: '#f0f0f0',
                  fontSize: '13px', outline: 'none', transition: 'border-color 0.2s'
                }}
                onFocus={e => e.target.style.borderColor = '#7c3aed'}
                onBlur={e => e.target.style.borderColor = '#2a2a2a'}
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                style={{
                  width: '38px', height: '38px', borderRadius: '12px', border: 'none',
                  background: input.trim() ? 'linear-gradient(135deg, #7c3aed, #4f46e5)' : '#1a1a1a',
                  cursor: input.trim() ? 'pointer' : 'not-allowed', display: 'flex',
                  alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  transition: 'background 0.2s'
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
              </button>
            </form>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeSlideUp { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes bounce { 0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; } 40% { transform: scale(1); opacity: 1; } }
      `}</style>
    </div>
  );
};

export default ChatWindow;
