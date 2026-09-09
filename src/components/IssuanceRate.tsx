type State = "expansion" | "contraction";

export function IssuanceRate({ state }: { state: State }) {
  const positive = state === "expansion";
  const accent = positive ? "var(--expansion)" : "var(--contraction)";

  return (
    <div
      className="issuance-rate pointer-events-none absolute left-4 top-1/2 w-36 -translate-y-1/2 sm:left-12 sm:w-44"
      aria-hidden="true"
    >
      <span className="label text-[10px] text-muted-foreground">
        Issuance rate
      </span>

      <div className="relative mt-4 h-28">
        {/* sparkline behind the token */}
        <svg
          viewBox="0 0 120 70"
          className="absolute inset-0 h-full w-full"
          fill="none"
        >
          {positive ? (
            <path
              key="up"
              d="M4 62 L28 52 L48 56 L72 34 L92 26 L116 8"
              stroke={accent}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="220"
              strokeDashoffset="220"
              style={{ animation: "issuance-draw 2.6s ease-in-out infinite" }}
              opacity={0.55}
            />
          ) : (
            <line
              key="flat"
              x1="4"
              y1="44"
              x2="116"
              y2="44"
              stroke={accent}
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity={0.55}
            />
          )}
        </svg>

        {/* token */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div
            key={state}
            className="flex h-9 w-9 items-center justify-center rounded-full border text-xs font-semibold"
            style={{
              borderColor: accent,
              color: accent,
              backgroundColor: "color-mix(in srgb, var(--paper) 82%, transparent)",
              animation: positive
                ? "issuance-mint 2.6s ease-in-out infinite"
                : "none",
            }}
          >
            S
          </div>

          {positive && (
            <>
              <span
                className="absolute left-1/2 top-0 text-[10px] font-medium"
                style={{
                  color: accent,
                  animation: "issuance-plus 2.6s ease-out infinite",
                }}
              >
                +1
              </span>
              <span
                className="absolute left-1/2 top-0 text-[10px] font-medium"
                style={{
                  color: accent,
                  animation: "issuance-plus 2.6s ease-out infinite",
                  animationDelay: "1.3s",
                }}
              >
                +1
              </span>
            </>
          )}
        </div>
      </div>

      <style>{`
        @keyframes issuance-mint {
          0%   { transform: scale(0) translateY(10px); opacity: 0; }
          25%  { transform: scale(1) translateY(0);    opacity: 1; }
          70%  { transform: scale(1) translateY(-14px); opacity: 1; }
          100% { transform: scale(0.9) translateY(-30px); opacity: 0; }
        }
        @keyframes issuance-plus {
          0%   { transform: translate(-50%, 6px);  opacity: 0; }
          30%  { opacity: 0.9; }
          100% { transform: translate(-50%, -26px); opacity: 0; }
        }
        @keyframes issuance-draw {
          0%   { stroke-dashoffset: 220; opacity: 0; }
          15%  { opacity: 0.55; }
          70%  { stroke-dashoffset: 0; opacity: 0.55; }
          100% { stroke-dashoffset: 0; opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .issuance-rate * { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
