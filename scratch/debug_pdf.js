import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { createRequire } from 'module';

dotenv.config({ path: '.env.local' });

const require = createRequire(import.meta.url);
const pdf = require('pdf-parse');

console.log('PDF-PARSE export:', typeof pdf, Object.keys(pdf));

async function test() {
  const dataBuffer = fs.readFileSync('SHARE_SPACE.pdf');
  const data = await pdf(dataBuffer);
  console.log('Text:', data.text.slice(0, 100));
}
test();
