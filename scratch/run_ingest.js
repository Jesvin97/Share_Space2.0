import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { createRequire } from 'module';
import https from 'https';

dotenv.config({ path: '.env.local' });

const require = createRequire(import.meta.url);
const pdf = require('pdf-parse');

const NVIDIA_API_KEY = process.env.NVIDIA_API_KEY;
const EMBEDDING_MODEL = 'nvidia/nv-embedqa-e5-v5';

if (!NVIDIA_API_KEY) {
  console.error('❌ NVIDIA_API_KEY not found in .env.local');
  process.exit(1);
}

/**
 * Calls NVIDIA embedding API using Node's native https (avoids fetch/undici issues).
 */
function embedText(text) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      model: EMBEDDING_MODEL,
      input: text,
      encoding_format: 'float',
      input_type: 'passage',
      truncate: 'END',
    });

    const options = {
      hostname: 'integrate.api.nvidia.com',
      path: '/v1/embeddings',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${NVIDIA_API_KEY}`,
        'Content-Length': Buffer.byteLength(body),
      },
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        if (res.statusCode !== 200) {
          reject(new Error(`HTTP ${res.statusCode}: ${data}`));
          return;
        }
        try {
          const parsed = JSON.parse(data);
          resolve(parsed.data[0].embedding);
        } catch (e) {
          reject(new Error(`Parse error: ${e.message}`));
        }
      });
    });

    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

const { saveEmbeddings } = await import('../src/lib/chatbot/vector-store.js');

async function runIngest() {
  console.log(`Starting ingestion using model: ${EMBEDDING_MODEL}...`);

  try {
    const pdfPath = path.join(process.cwd(), 'SHARE_SPACE.pdf');
    if (!fs.existsSync(pdfPath)) {
      console.error('❌ SHARE_SPACE.pdf not found in project root!');
      process.exit(1);
    }

    console.log(`📄 Reading PDF: ${pdfPath}`);
    const dataBuffer = fs.readFileSync(pdfPath);
    const data = await pdf(dataBuffer);
    const text = data.text;
    console.log(`✅ Extracted ${text.length} characters from PDF.`);

    // Chunk text with overlap
    const chunks = [];
    const chunkSize = 800;
    const overlap = 150;
    let startIndex = 0;
    while (startIndex < text.length) {
      const chunk = text.slice(startIndex, startIndex + chunkSize).trim();
      if (chunk.length > 50) chunks.push(chunk);
      startIndex += chunkSize - overlap;
    }
    console.log(`📦 Created ${chunks.length} chunks.`);

    const embeddings = [];
    for (let i = 0; i < chunks.length; i++) {
      process.stdout.write(`  Embedding chunk ${i + 1}/${chunks.length}... `);
      try {
        const embedding = await embedText(chunks[i]);
        embeddings.push({ chunk: chunks[i], embedding });
        console.log('✓');
      } catch (err) {
        console.log(`✗ (skipped: ${err.message})`);
      }
    }

    await saveEmbeddings(embeddings);
    console.log(`\n🎉 Done! ${embeddings.length}/${chunks.length} chunks saved to embeddings.json`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Ingestion failed:', error.message);
    process.exit(1);
  }
}

runIngest();
