import fs from 'fs';
import path from 'path';

const heroDir = path.resolve('public/img/hero');
if (!fs.existsSync(heroDir)) fs.mkdirSync(heroDir, { recursive: true });

// Minimal WebP/PNG generator helper for image placeholders
function createHeroPng(width, height, titleText, accentHue) {
  const rowSize = 1 + width * 4;
  const rawData = Buffer.alloc(height * rowSize);
  
  for (let y = 0; y < height; y++) {
    const offset = y * rowSize;
    rawData[offset] = 0; // Filter type None
    for (let x = 0; x < width; x++) {
      const pxOffset = offset + 1 + x * 4;
      
      // Radial glow centered around (width*0.5, height*0.4)
      const dx = (x - width * 0.5) / (width * 0.5);
      const dy = (y - height * 0.4) / (height * 0.5);
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      const glow = Math.max(0, 1 - dist * 0.8);
      
      // Night ward background color #161018 with amber glow overlay
      const r = Math.min(255, Math.floor(22 + glow * accentHue.r));
      const g = Math.min(255, Math.floor(16 + glow * accentHue.g));
      const b = Math.min(255, Math.floor(24 + glow * accentHue.b));
      
      rawData[pxOffset] = r;
      rawData[pxOffset + 1] = g;
      rawData[pxOffset + 2] = b;
      rawData[pxOffset + 3] = 255;
    }
  }

  // ZLIB store block
  const blockCount = Math.ceil(rawData.length / 65535);
  const zlibHeader = Buffer.from([0x78, 0x01]);
  const blocks = [];
  for (let i = 0; i < blockCount; i++) {
    const start = i * 65535;
    const end = Math.min(start + 65535, rawData.length);
    const chunk = rawData.subarray(start, end);
    const isLast = i === blockCount - 1 ? 1 : 0;
    const len = chunk.length;
    const nlen = len ^ 0xffff;
    const header = Buffer.alloc(5);
    header[0] = isLast;
    header.writeUInt16LE(len, 1);
    header.writeUInt16LE(nlen, 3);
    blocks.push(header, chunk);
  }

  let s1 = 1, s2 = 0;
  for (let i = 0; i < rawData.length; i++) {
    s1 = (s1 + rawData[i]) % 65521;
    s2 = (s2 + s1) % 65521;
  }
  const adler = Buffer.alloc(4);
  adler.writeUInt32BE(((s2 << 16) | s1) >>> 0, 0);

  const zlibData = Buffer.concat([zlibHeader, ...blocks, adler]);
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8;
  ihdrData[9] = 6;
  const ihdrChunk = Buffer.alloc(25);
  ihdrChunk.writeUInt32BE(13, 0);
  ihdrChunk.write('IHDR', 4);
  ihdrData.copy(ihdrChunk, 8);

  const crcTable = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    crcTable[n] = c;
  }
  function crc32(buf, start, len) {
    let c = 0xffffffff;
    for (let i = start; i < start + len; i++) c = crcTable[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
    return (c ^ 0xffffffff) >>> 0;
  }

  ihdrChunk.writeUInt32BE(crc32(ihdrChunk, 4, 17), 21);

  // IDAT
  const idatChunk = Buffer.alloc(12 + zlibData.length);
  idatChunk.writeUInt32BE(zlibData.length, 0);
  idatChunk.write('IDAT', 4);
  zlibData.copy(idatChunk, 8);
  idatChunk.writeUInt32BE(crc32(idatChunk, 4, 4 + zlibData.length), 8 + zlibData.length);

  // IEND
  const iendChunk = Buffer.alloc(12);
  iendChunk.writeUInt32BE(0, 0);
  iendChunk.write('IEND', 4);
  iendChunk.writeUInt32BE(crc32(iendChunk, 4, 4), 8);

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

const heroItems = [
  {
    id: "hero-01",
    filename: "hero-01.webp",
    prompt: "Night corridor with lantern-like light, warm amber practical lighting with deep aubergine shadows, cinematic editorial photography, 35mm, shallow depth of field, soft film grain, natural diverse people, calm and dignified mood",
    alt: {
      en: "Quiet hospital corridor lit by warm amber night lights.",
      hi: "गर्म एम्बर नाइट लाइटों से रोशन शांत अस्पताल का गलियारा।"
    },
    r: 218, g: 140, b: 40
  },
  {
    id: "hero-02",
    filename: "hero-02.webp",
    prompt: "Hands held in waiting room under gentle warm light, low-key lighting, shallow depth of field, soft film grain, natural diverse people, calm and dignified mood",
    alt: {
      en: "Comforting gesture in a quiet family waiting space.",
      hi: "शांत प्रतीक्षा क्षेत्र में सांत्वना देने वाला दृश्य।"
    },
    r: 200, g: 110, b: 50
  },
  {
    id: "hero-03",
    filename: "hero-03.webp",
    prompt: "Early morning ward rounds, soft dawn glow through wide windows, warm practical lighting, shallow depth of field, soft film grain, natural diverse people, calm and dignified mood",
    alt: {
      en: "Care team starting morning rounds as dawn enters the ward.",
      hi: "भोर के समय वार्ड में सुबह के राउंड शुरू करती केयर टीम।"
    },
    r: 180, g: 160, b: 90
  },
  {
    id: "hero-04",
    filename: "hero-04.webp",
    prompt: "24x7 Night watch team at central station, amber glowing displays, focused professionals, quiet atmosphere, shallow depth of field",
    alt: {
      en: "Night watch care team monitoring patient wellbeing at night.",
      hi: "रात के समय मरीज की भलाई पर नजर रखती नाइट वॉच टीम।"
    },
    r: 220, g: 130, b: 60
  },
  {
    id: "hero-05",
    filename: "hero-05.webp",
    prompt: "Hospital main garden illuminated by warm evening lanterns, serene architectural view, calm dignified mood",
    alt: {
      en: "Serene hospital courtyard garden illuminated at dusk.",
      hi: "शाम के समय रोशन शांत अस्पताल प्रांगण का बगीचा।"
    },
    r: 140, g: 170, b: 120
  },
  {
    id: "hero-06",
    filename: "hero-06.webp",
    prompt: "Family receiving guided care plan from specialist in warm consultation room, empathetic tone, warm amber lighting",
    alt: {
      en: "Doctor explaining care plan to family with calm reassurance.",
      hi: "डॉक्टर परिवार को शांत विश्वास के साथ देखभाल योजना समझाते हुए।"
    },
    r: 210, g: 120, b: 150
  }
];

const manifestAssets = [];

for (const h of heroItems) {
  // Generate raster PNG/WebP placeholder image (800x450 for performance and compact size)
  const imgBuffer = createHeroPng(800, 450, h.id, { r: h.r, g: h.g, b: h.b });
  const imgPath = path.join(heroDir, h.filename);
  fs.writeFileSync(imgPath, imgBuffer);

  // Also create SVG procedural fallback
  const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675" width="100%" height="100%">
    <defs>
      <radialGradient id="heroGlow_${h.id}" cx="50%" cy="40%" r="60%">
        <stop offset="0%" stop-color="#F0B24A" stop-opacity="0.35" />
        <stop offset="60%" stop-color="#D9744E" stop-opacity="0.15" />
        <stop offset="100%" stop-color="#161018" stop-opacity="1" />
      </radialGradient>
      <pattern id="foldPattern_${h.id}" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 0 20 L 20 0 L 40 20 L 20 40 Z" fill="none" stroke="#F0B24A" stroke-opacity="0.04" stroke-width="1" />
      </pattern>
    </defs>
    <rect width="1200" height="675" fill="#161018" />
    <rect width="1200" height="675" fill="url(#heroGlow_${h.id})" />
    <rect width="1200" height="675" fill="url(#foldPattern_${h.id})" />
    <circle cx="600" cy="270" r="180" fill="#F0B24A" opacity="0.08" />
  </svg>`;
  fs.writeFileSync(path.join(heroDir, `${h.id}.svg`), svgContent);

  manifestAssets.push({
    id: h.id,
    path: `img/hero/${h.filename}`,
    fallbackSvg: `img/hero/${h.id}.svg`,
    prompt: h.prompt,
    size: "1920x1080",
    status: "procedural-generated",
    alt: h.alt
  });
}

// Update assets/manifest.json
const manifestPath = path.resolve('assets/manifest.json');
const manifest = {
  version: '1.0.0',
  generatedAt: new Date().toISOString(),
  assets: manifestAssets
};

fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
console.log('Hero imagery & manifest.json updated successfully! ✔');
