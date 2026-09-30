import fs from 'fs';
import path from 'path';

// Minimal PNG generator in pure Node (no native dependencies required)
function createPngBuffer(width, height, r, g, b, a = 255) {
  // A simple 1-color PNG with IHDR, IDAT, IEND chunks
  const p = Math.floor;
  // CRC32 table
  const crcTable = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    }
    crcTable[n] = c;
  }
  function crc32(buf, start, len) {
    let c = 0xffffffff;
    for (let i = start; i < start + len; i++) {
      c = crcTable[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
    }
    return (c ^ 0xffffffff) >>> 0;
  }
  // We can write uncompressed DEFLATE block or simple zlib store block
  // Raw image data: height rows, each row has 1 filter byte (0) + width * 4 (RGBA) bytes
  const rowSize = 1 + width * 4;
  const rawData = Buffer.alloc(height * rowSize);
  for (let y = 0; y < height; y++) {
    const offset = y * rowSize;
    rawData[offset] = 0; // Filter type None
    for (let x = 0; x < width; x++) {
      const pxOffset = offset + 1 + x * 4;
      // Lantern glow gradient center check
      const cx = width / 2;
      const cy = height / 2;
      const dx = (x - cx) / (width / 2);
      const dy = (y - cy) / (height / 2);
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 0.75) {
        // Warm amber flame glow
        const alpha = Math.max(0, 1 - dist);
        rawData[pxOffset] = 240; // R
        rawData[pxOffset + 1] = 178; // G
        rawData[pxOffset + 2] = 74; // B
        rawData[pxOffset + 3] = Math.floor(a * alpha); // A
      } else {
        rawData[pxOffset] = r;
        rawData[pxOffset + 1] = g;
        rawData[pxOffset + 2] = b;
        rawData[pxOffset + 3] = a;
      }
    }
  }

  // ZLIB store format (no compression)
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

  // Adler32
  let s1 = 1, s2 = 0;
  for (let i = 0; i < rawData.length; i++) {
    s1 = (s1 + rawData[i]) % 65521;
    s2 = (s2 + s1) % 65521;
  }
  const adler = Buffer.alloc(4);
  adler.writeUInt32BE(((s2 << 16) | s1) >>> 0, 0);

  const zlibData = Buffer.concat([zlibHeader, ...blocks, adler]);

  // Build PNG chunks
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR chunk
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8; // Bit depth 8
  ihdrData[9] = 6; // Color type RGBA
  ihdrData[10] = 0; // Compression method
  ihdrData[11] = 0; // Filter method
  ihdrData[12] = 0; // Interlace method

  const ihdrChunk = Buffer.alloc(12 + 13);
  ihdrChunk.writeUInt32BE(13, 0);
  ihdrChunk.write('IHDR', 4);
  ihdrData.copy(ihdrChunk, 8);
  ihdrChunk.writeUInt32BE(crc32(ihdrChunk, 4, 17), 21);

  // IDAT chunk
  const idatChunk = Buffer.alloc(12 + zlibData.length);
  idatChunk.writeUInt32BE(zlibData.length, 0);
  idatChunk.write('IDAT', 4);
  zlibData.copy(idatChunk, 8);
  idatChunk.writeUInt32BE(crc32(idatChunk, 4, 4 + zlibData.length), 8 + zlibData.length);

  // IEND chunk
  const iendChunk = Buffer.alloc(12);
  iendChunk.writeUInt32BE(0, 0);
  iendChunk.write('IEND', 4);
  iendChunk.writeUInt32BE(crc32(iendChunk, 4, 4), 8);

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

// Ensure target directories exist
const publicDir = path.resolve('public');
const logoDir = path.resolve('src/assets/logo');
if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });
if (!fs.existsSync(logoDir)) fs.mkdirSync(logoDir, { recursive: true });

// SVG Content definitions
const logoMarkSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100" fill="none">
  <defs>
    <radialGradient id="lanternGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#F0B24A" stop-opacity="0.9" />
      <stop offset="60%" stop-color="#D9744E" stop-opacity="0.5" />
      <stop offset="100%" stop-color="#F0B24A" stop-opacity="0" />
    </radialGradient>
    <filter id="blurGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="3" />
    </filter>
  </defs>
  <!-- Outer Glow Halo -->
  <circle cx="50" cy="52" r="38" fill="url(#lanternGlow)" />
  <!-- Lantern Base & Frame -->
  <path d="M 32 30 L 68 30 L 62 78 L 38 78 Z" fill="#211826" stroke="#F0B24A" stroke-width="3" stroke-linejoin="round" />
  <!-- Lantern Top Cap -->
  <path d="M 40 30 L 50 20 L 60 30 Z" fill="#F0B24A" />
  <!-- Handle Ring -->
  <circle cx="50" cy="16" r="6" stroke="#F0B24A" stroke-width="2.5" fill="none" />
  <!-- Lantern Flame Drop (L Negative Space Flame Motif) -->
  <path d="M 50 38 C 42 48 42 62 50 68 C 58 62 58 48 50 38 Z" fill="#F0B24A" filter="url(#blurGlow)" />
  <path d="M 50 40 C 44 49 44 60 50 65 C 56 60 56 49 50 40 Z" fill="#FFFBF5" />
  <!-- Lantern Base Line -->
  <line x1="34" y1="78" x2="66" y2="78" stroke="#F0B24A" stroke-width="3" stroke-linecap="round" />
</svg>`;

const logoPrimarySvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 80" width="320" height="80" fill="none">
  <defs>
    <radialGradient id="pGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#F0B24A" stop-opacity="0.8" />
      <stop offset="100%" stop-color="#F0B24A" stop-opacity="0" />
    </radialGradient>
  </defs>
  <g transform="translate(10, 10)">
    ${logoMarkSvg.replace('viewBox="0 0 100 100" width="100" height="100"', 'width="60" height="60"')}
  </g>
  <text x="80" y="44" font-family="Fraunces, Georgia, serif" font-size="28" font-weight="600" fill="var(--text, #F4ECE1)" letter-spacing="-0.02em">Lanthera</text>
  <text x="81" y="60" font-family="Instrument Sans, sans-serif" font-size="11" font-weight="600" fill="var(--accent, #F0B24A)" letter-spacing="0.25em">HEALTH</text>
</svg>`;

const logoMonoLightSvg = logoPrimarySvg.replace(/#F0B24A/g, '#231A26').replace(/var\(--text, #F4ECE1\)/g, '#231A26');
const logoMonoDarkSvg = logoPrimarySvg.replace(/#F0B24A/g, '#F4ECE1').replace(/var\(--text, #F4ECE1\)/g, '#F4ECE1');

const logoStackedSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 140" width="160" height="140" fill="none">
  <g transform="translate(40, 10)">
    ${logoMarkSvg.replace('viewBox="0 0 100 100" width="100" height="100"', 'width="80" height="80"')}
  </g>
  <text x="80" y="105" text-anchor="middle" font-family="Fraunces, Georgia, serif" font-size="22" font-weight="600" fill="var(--text, #F4ECE1)" letter-spacing="-0.02em">Lanthera</text>
  <text x="80" y="122" text-anchor="middle" font-family="Instrument Sans, sans-serif" font-size="10" font-weight="600" fill="var(--accent, #F0B24A)" letter-spacing="0.25em">HEALTH</text>
</svg>`;

const logoGlowSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100" fill="none">
  <style>
    @keyframes lanternBreathe {
      0%, 100% { opacity: 0.6; transform: scale(0.96); }
      50% { opacity: 1; transform: scale(1.04); }
    }
    .glow-pulse { animation: lanternBreathe 4s ease-in-out infinite; transform-origin: center; }
  </style>
  <g class="glow-pulse">
    <circle cx="50" cy="50" r="42" fill="#F0B24A" opacity="0.25" />
  </g>
  ${logoMarkSvg}
</svg>`;

const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64" fill="none">
  <style>
    @media (prefers-color-scheme: light) {
      .bg { fill: #FFFBF5; }
      .fg { fill: #B96A0E; }
    }
    @media (prefers-color-scheme: dark) {
      .bg { fill: #161018; }
      .fg { fill: #F0B24A; }
    }
  </style>
  <rect class="bg" width="64" height="64" rx="16" />
  <circle cx="32" cy="32" r="22" fill="#F0B24A" opacity="0.2" />
  <path class="fg" d="M 22 20 L 42 20 L 38 50 L 26 50 Z" stroke="currentColor" stroke-width="2" fill="none" />
  <path class="fg" d="M 32 26 C 27 33 27 41 32 45 C 37 41 37 33 32 26 Z" fill="#F0B24A" />
</svg>`;

const safariPinnedTabSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <path d="M 30 25 L 70 25 L 62 80 L 38 80 Z M 50 35 C 42 45 42 60 50 65 C 58 60 58 45 50 35 Z" fill="#000000" />
</svg>`;

const webManifest = JSON.stringify(
  {
    name: "Lanthera Health",
    short_name: "Lanthera",
    description: "Lanthera Health — The light stays on. 24x7 Multi-speciality Hospital Network.",
    start_url: "/",
    display: "standalone",
    background_color: "#161018",
    theme_color: "#F0B24A",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" }
    ]
  },
  null,
  2
);

// Save SVG deliverables to public/ and src/assets/logo/
const filesToWrite = [
  { p: path.join(publicDir, 'favicon.svg'), c: faviconSvg },
  { p: path.join(publicDir, 'logo-primary.svg'), c: logoPrimarySvg },
  { p: path.join(publicDir, 'logo-mark.svg'), c: logoMarkSvg },
  { p: path.join(publicDir, 'logo-mono-light.svg'), c: logoMonoLightSvg },
  { p: path.join(publicDir, 'logo-mono-dark.svg'), c: logoMonoDarkSvg },
  { p: path.join(publicDir, 'logo-stacked.svg'), c: logoStackedSvg },
  { p: path.join(publicDir, 'logo-glow.svg'), c: logoGlowSvg },
  { p: path.join(publicDir, 'safari-pinned-tab.svg'), c: safariPinnedTabSvg },
  { p: path.join(publicDir, 'site.webmanifest'), c: webManifest },

  // Mirror SVGs in src/assets/logo/
  { p: path.join(logoDir, 'logo-primary.svg'), c: logoPrimarySvg },
  { p: path.join(logoDir, 'logo-mark.svg'), c: logoMarkSvg },
  { p: path.join(logoDir, 'logo-mono-light.svg'), c: logoMonoLightSvg },
  { p: path.join(logoDir, 'logo-mono-dark.svg'), c: logoMonoDarkSvg },
  { p: path.join(logoDir, 'logo-stacked.svg'), c: logoStackedSvg },
  { p: path.join(logoDir, 'logo-glow.svg'), c: logoGlowSvg },
];

for (const f of filesToWrite) {
  fs.writeFileSync(f.p, f.c);
}

// Write PNG binaries
const png192 = createPngBuffer(192, 192, 22, 16, 24);
const png512 = createPngBuffer(512, 512, 22, 16, 24);
const png180 = createPngBuffer(180, 180, 22, 16, 24);
const pngIco = createPngBuffer(32, 32, 22, 16, 24);

fs.writeFileSync(path.join(publicDir, 'icon-192.png'), png192);
fs.writeFileSync(path.join(publicDir, 'icon-512.png'), png512);
fs.writeFileSync(path.join(publicDir, 'maskable-512.png'), png512);
fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), png180);
fs.writeFileSync(path.join(publicDir, 'favicon.ico'), pngIco);

console.log('Brand assets and favicons successfully generated! ✔');
