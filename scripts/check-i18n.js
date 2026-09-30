import fs from 'fs';

const en = JSON.parse(fs.readFileSync('src/i18n/en/common.json', 'utf-8'));
const hi = JSON.parse(fs.readFileSync('src/i18n/hi/common.json', 'utf-8'));

function getKeys(obj, prefix = '') {
  let keys = [];
  for (const k in obj) {
    if (typeof obj[k] === 'object' && obj[k] !== null) {
      keys = keys.concat(getKeys(obj[k], `${prefix}${k}.`));
    } else {
      keys.push(`${prefix}${k}`);
    }
  }
  return keys;
}

const enKeys = getKeys(en);
const hiKeys = getKeys(hi);

const missingInHi = enKeys.filter((k) => !hiKeys.includes(k));
if (missingInHi.length > 0) {
  console.error('i18n check failed: missing keys in Hindi:', missingInHi);
  process.exit(1);
} else {
  console.log('i18n check passed: EN/HI parity verified ✔');
}
