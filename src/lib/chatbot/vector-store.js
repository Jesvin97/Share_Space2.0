import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import path from 'path';

// Resolve paths for both ESM and CommonJS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const EMBEDDINGS_FILE = path.join(__dirname, 'embeddings.json');

// Lazily import fs so this works in both Node.js API routes and build time
async function getFs() {
  const { default: fs } = await import('fs');
  return fs;
}

/**
 * Simple cosine similarity calculation.
 */
function cosineSimilarity(vecA, vecB) {
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

/**
 * Saves embeddings to a local JSON file.
 */
export async function saveEmbeddings(data) {
  const fs = await getFs();
  try {
    fs.writeFileSync(EMBEDDINGS_FILE, JSON.stringify(data, null, 2));
    console.log(`Saved ${data.length} embeddings to ${EMBEDDINGS_FILE}`);
  } catch (error) {
    console.error('Failed to save embeddings to file:', error);
    throw error;
  }
}

/**
 * Loads embeddings from the local JSON file.
 */
export async function loadEmbeddings() {
  const fs = await getFs();
  try {
    if (!fs.existsSync(EMBEDDINGS_FILE)) {
      console.warn('No embeddings.json found — run the ingest script first.');
      return [];
    }
    const raw = fs.readFileSync(EMBEDDINGS_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (error) {
    console.error('Failed to load embeddings from file:', error);
    return [];
  }
}

/**
 * Searches for the top K most relevant chunks.
 */
export async function searchVectorStore(queryEmbedding, k = 3) {
  const data = await loadEmbeddings();
  if (!data || data.length === 0) return [];

  const scores = data.map((item) => ({
    ...item,
    score: cosineSimilarity(queryEmbedding, item.embedding),
  }));

  return scores
    .filter((item) => item.score > 0.3)
    .sort((a, b) => b.score - a.score)
    .slice(0, k);
}
