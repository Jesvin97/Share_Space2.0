import { generateEmbedding, createChatStream, SYSTEM_PROMPT } from '../../src/lib/chatbot/openai.js';
import { searchVectorStore } from '../../src/lib/chatbot/vector-store.js';
import { z } from 'zod';

const ChatSchema = z.object({
  messages: z.array(z.object({
    role: z.enum(['user', 'assistant', 'system']),
    content: z.string().min(1).max(2000),
  })),
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const { messages } = ChatSchema.parse(req.body);
    const lastMessage = messages[messages.length - 1].content;

    // 1. RAG: Try to retrieve relevant context (fails gracefully if no embeddings)
    let context = '';
    try {
      const { embedding } = await generateEmbedding(lastMessage, 'query');
      const relevantChunks = await searchVectorStore(embedding);
      context = relevantChunks.map((c) => c.chunk).join('\n\n');
    } catch (ragErr) {
      console.warn('RAG context retrieval skipped:', ragErr.message);
    }

    // 2. Build Prompt
    const fullSystemPrompt = SYSTEM_PROMPT.replace(
      '{{CONTEXT}}',
      context || 'No specific knowledge base loaded yet. Answer generally about Share Space 2.0 — a premium space discovery platform in South India.'
    );

    // 3. Call NVIDIA AI (streaming)
    const nvidiaResponse = await createChatStream([
      { role: 'system', content: fullSystemPrompt },
      ...messages,
    ]);

    // 4. Stream SSE from NVIDIA back to the browser
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Transfer-Encoding', 'chunked');

    let buffer = '';
    nvidiaResponse.on('data', (chunk) => {
      buffer += chunk.toString();
      const lines = buffer.split('\n');
      buffer = lines.pop(); // keep incomplete line

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed.startsWith('data:')) continue;
        const jsonStr = trimmed.slice(5).trim();
        if (jsonStr === '[DONE]') continue;
        try {
          const parsed = JSON.parse(jsonStr);
          const text = parsed.choices?.[0]?.delta?.content || '';
          if (text) res.write(text);
        } catch (_) {}
      }
    });

    nvidiaResponse.on('end', () => res.end());
    nvidiaResponse.on('error', (err) => {
      console.error('Stream error:', err);
      res.end();
    });

  } catch (error) {
    console.error('Chat API error:', error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
}
