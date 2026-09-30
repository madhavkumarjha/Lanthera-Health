import fs from 'fs';
import path from 'path';

const publicDir = path.resolve('public/img');
const nwDir = path.resolve('public/img/nightwatch');

if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });
if (!fs.existsSync(nwDir)) fs.mkdirSync(nwDir, { recursive: true });

// Building Silhouette SVG with 40 window rects
let windowRectsSvg = '';
const cols = 10;
const rows = 4;

for (let r = 0; r < rows; r++) {
  for (let c = 0; c < cols; c++) {
    const winId = r * cols + c + 1;
    const x = 40 + c * 48;
    const y = 50 + r * 55;
    windowRectsSvg += `
    <rect id="win-${winId}" x="${x}" y="${y}" width="32" height="40" rx="4" fill="#2C2033" stroke="#3A2C42" stroke-width="1.5" class="building-window transition-all duration-500" />`;
  }
}

const buildingSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 300" width="100%" height="100%">
  <defs>
    <linearGradient id="bldgGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#211826" />
      <stop offset="100%" stop-color="#161018" />
    </linearGradient>
    <filter id="winGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="3" />
    </filter>
  </defs>
  
  <!-- Hospital Building Silhouette -->
  <rect x="20" y="30" width="520" height="250" rx="16" fill="url(#bldgGrad)" stroke="#3A2C42" stroke-width="2" />
  
  <!-- Roof Lantern Mark Ornament -->
  <path d="M 250 30 L 310 30 L 300 10 L 260 10 Z" fill="#F0B24A" opacity="0.8" />
  <circle cx="280" cy="20" r="4" fill="#FFFBF5" />

  <!-- 40 Windows Grid -->
  <g id="windows-grid">
    ${windowRectsSvg}
  </g>

  <!-- Ground Floor Entrance Portal -->
  <path d="M 230 280 L 330 280 L 330 240 Q 280 220 230 240 Z" fill="#2C2033" stroke="#F0B24A" stroke-width="2" />
  <text x="280" y="265" text-anchor="middle" font-family="Instrument Sans, sans-serif" font-size="11" font-weight="600" fill="#F0B24A" letter-spacing="0.2em">LANTHERA 24×7</text>
</svg>`;

fs.writeFileSync(path.join(publicDir, 'building.svg'), buildingSvg);

// Night Watch Hour SVG Vignettes
const hours = ['18', '20', '22', '00', '02', '04', '06'];

const vignetteTitles = {
  '18': 'Shift Handover & Triage',
  '20': 'Night Pharmacy Dispatch',
  '22': 'Urgent CT & X-Ray Imaging',
  '00': 'ICU Midnight Rounds',
  '02': 'Emergency Surgical Suite',
  '04': 'Ward Hourly Comfort Check',
  '06': 'Dawn Handover & Clinic Prep'
};

for (const h of hours) {
  const vignetteSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250" width="100%" height="100%">
    <defs>
      <radialGradient id="vigGlow_${h}" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#F0B24A" stop-opacity="0.3" />
        <stop offset="100%" stop-color="#211826" stop-opacity="0.9" />
      </radialGradient>
    </defs>
    <rect width="400" height="250" rx="12" fill="#211826" stroke="#3A2C42" stroke-width="1.5" />
    <rect width="400" height="250" rx="12" fill="url(#vigGlow_${h})" />
    <circle cx="200" cy="110" r="50" fill="#F0B24A" opacity="0.15" />
    
    <!-- Hour Stamp Badge -->
    <rect x="20" y="20" width="70" height="28" rx="6" fill="#F0B24A" />
    <text x="55" y="38" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="14" font-weight="bold" fill="#2A1B05">${h}:00</text>
    
    <!-- Vignette Icon Illustration -->
    <path d="M 200 80 C 180 100 180 130 200 145 C 220 130 220 100 200 80 Z" fill="#F0B24A" />
    <circle cx="200" cy="112" r="12" fill="#FFFBF5" />

    <!-- Role Title Text -->
    <text x="200" y="200" text-anchor="middle" font-family="Fraunces, Georgia, serif" font-size="16" font-weight="600" fill="#F4ECE1">${vignetteTitles[h]}</text>
  </svg>`;

  fs.writeFileSync(path.join(nwDir, `${h}.svg`), vignetteSvg);
}

console.log('Night Watch SVG building and vignettes successfully generated! ✔');
