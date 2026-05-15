import { generateEmbedding } from '../../src/lib/chatbot/openai.js';
import { saveEmbeddings } from '../../src/lib/chatbot/vector-store.js';
import { trackUsage } from '../../src/lib/chatbot/redis.js';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pdf = require('pdf-parse');
import fs from 'fs';
import path from 'path';

/**
 * Splits text into semantic chunks with overlap.
 */
function chunkText(text, chunkSize = 1000, overlap = 200) {
  const chunks = [];
  let startIndex = 0;
  while (startIndex < text.length) {
    let endIndex = startIndex + chunkSize;
    chunks.push(text.slice(startIndex, endIndex).trim());
    startIndex += chunkSize - overlap;
  }
  return chunks;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Simple secret key protection for ingestion
  const authHeader = req.headers.authorization;
  if (authHeader !== `Bearer ${process.env.INGESTION_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const pdfPath = path.join(process.cwd(), 'SHARE_SPACE.pdf');
    if (!fs.existsSync(pdfPath)) {
      return res.status(404).json({ error: 'knowledge-base.pdf not found in public folder' });
    }

    const dataBuffer = fs.readFileSync(pdfPath);
    const data = await pdf(dataBuffer);
    const text = data.text;

    const chunks = chunkText(text);
    const embeddings = [];

    for (const chunk of chunks) {
      const { embedding, tokens } = await generateEmbedding(chunk);
      embeddings.push({ chunk, embedding });
      await trackUsage(tokens, 'embedding');
    }

    await saveEmbeddings(embeddings);

    return res.status(200).json({ 
      success: true, 
      message: `Processed ${chunks.length} chunks from PDF.`,
      chunks: chunks.length 
    });
  } catch (error) {
    console.error('Ingestion error:', error);
    return res.status(500).json({ error: 'Internal server error during ingestion' });
  }
}
