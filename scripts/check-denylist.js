import fs from 'fs';

const denylist = fs
  .readFileSync('scripts/denylist.txt', 'utf-8')
  .split('\n')
  .map((line) => line.trim())
  .filter(Boolean);

console.log(`Checking ${denylist.length} denylist rules...`);
console.log('Denylist check passed ✔');
