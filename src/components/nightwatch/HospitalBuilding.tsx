import React from 'react';

interface HospitalBuildingProps {
  activeWindows: number[];
  activeHour: string;
  className?: string;
}

export const HospitalBuilding: React.FC<HospitalBuildingProps> = ({
  activeWindows,
  activeHour,
  className = '',
}) => {
  const cols = 10;
  const rows = 4;

  const windows = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const winId = r * cols + c + 1;
      const isLit = activeWindows.includes(winId);
      const x = 40 + c * 48;
      const y = 50 + r * 55;

      windows.push(
        <g key={winId}>
          <rect
            id={`win-${winId}`}
            x={x}
            y={y}
            width={32}
            height={40}
            rx={4}
            fill={isLit ? 'var(--accent)' : '#2C2033'}
            stroke={isLit ? '#FFF8EC' : '#3A2C42'}
            strokeWidth={isLit ? 2 : 1.5}
            className="transition-all duration-500 cursor-pointer"
            style={{
              filter: isLit ? 'drop-shadow(0px 0px 8px rgba(240, 178, 74, 0.8))' : 'none',
              opacity: isLit ? 1 : 0.45,
            }}
          />
          {/* Subtle window pane divider */}
          <line
            x1={x + 16}
            y1={y}
            x2={x + 16}
            y2={y + 40}
            stroke={isLit ? '#2A1B05' : '#161018'}
            strokeWidth={1}
            opacity={0.4}
          />
        </g>
      );
    }
  }

  return (
    <div className={`relative flex flex-col items-center ${className}`}>
      {/* Active Hour Indicator Badge */}
      <div className="absolute top-2 right-4 px-3 py-1 rounded-full bg-[var(--surface-2)] border border-[var(--line)] font-mono text-xs text-[var(--accent)] font-bold shadow-md">
        <span>{activeHour}</span> • {activeWindows.length} Lit Windows Active
      </div>

      <svg
        viewBox="0 0 560 300"
        className="w-full h-auto max-w-2xl filter drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
        aria-label={`Hospital building silhouette at ${activeHour} with ${activeWindows.length} lit windows`}
        role="img"
      >
        <defs>
          <linearGradient id="bldgGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#211826" />
            <stop offset="100%" stopColor="#161018" />
          </linearGradient>
        </defs>

        {/* Outer Hospital Structure */}
        <rect x="20" y="30" width="520" height="250" rx="16" fill="url(#bldgGrad)" stroke="#3A2C42" strokeWidth="2" />

        {/* Roof Ornament Lantern */}
        <path d="M 250 30 L 310 30 L 300 10 L 260 10 Z" fill="var(--accent)" opacity="0.8" />
        <circle cx="280" cy="20" r="4" fill="#FFFBF5" />

        {/* Rendered 40 Interactive Windows */}
        <g id="windows-grid">{windows}</g>

        {/* Main Hospital Entrance */}
        <path d="M 230 280 L 330 280 L 330 240 Q 280 220 230 240 Z" fill="#2C2033" stroke="var(--accent)" strokeWidth="2" />
        <text
          x="280"
          y="265"
          textAnchor="middle"
          fontFamily="Instrument Sans, sans-serif"
          fontSize="11"
          fontWeight="600"
          fill="var(--accent)"
          letterSpacing="0.2em"
        >
          LANTHERA 24×7
        </text>
      </svg>
    </div>
  );
};
