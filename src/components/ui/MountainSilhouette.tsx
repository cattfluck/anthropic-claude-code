export function MountainSilhouette() {
  return (
    <div className="fixed bottom-0 left-0 right-0 pointer-events-none z-0">
      <svg viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full">
        {/* Back mountains */}
        <path
          d="M0,320 L0,220 L120,120 L240,200 L360,80 L480,160 L600,60 L720,140 L840,40 L960,130 L1080,70 L1200,160 L1320,90 L1440,170 L1440,320 Z"
          fill="#0f172a"
          opacity="0.6"
        />
        {/* Mid mountains */}
        <path
          d="M0,320 L0,260 L180,160 L300,220 L420,130 L540,200 L660,110 L780,190 L900,140 L1020,210 L1140,150 L1260,220 L1380,170 L1440,200 L1440,320 Z"
          fill="#0f172a"
          opacity="0.8"
        />
        {/* Snow caps on mid mountains */}
        <path
          d="M400,130 L420,130 L440,150 Z"
          fill="white" opacity="0.6"
        />
        <path
          d="M640,110 L660,110 L680,130 Z"
          fill="white" opacity="0.6"
        />
        <path
          d="M880,140 L900,140 L920,160 Z"
          fill="white" opacity="0.6"
        />
        {/* Front mountains */}
        <path
          d="M0,320 L0,290 L200,220 L340,270 L480,200 L600,260 L720,210 L860,270 L1000,220 L1140,280 L1280,230 L1440,260 L1440,320 Z"
          fill="#0f172a"
        />
      </svg>
    </div>
  )
}
