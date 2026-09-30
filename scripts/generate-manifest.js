import fs from 'fs';

const manifest = {
  version: '1.0.0',
  generatedAt: new Date().toISOString(),
  assets: [],
};

fs.writeFileSync('assets/manifest.json', JSON.stringify(manifest, null, 2));
console.log('Generated assets/manifest.json ✔');
