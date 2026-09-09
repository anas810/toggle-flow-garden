type State = "expansion" | "contraction";

export function FeeRouting({ state }: { state: State }) {
  const positive = state === "expansion";
  const accent = positive ? "var(--expansion)" : "var(--contraction)";

  return (
    <div
      className="fee-routing pointer-events-none absolute bottom-4 left-4 w-36 sm:bottom-8 sm:left-12 sm:w-44"
      aria-hidden="true"
    >
      <span className="label text-[10px] text-muted-foreground">
        Fee routing
      </span>

      <div className="relative mt-4 flex h-28 items-center">
        {/* fees source */}
        <span
          className="label text-[9px] tracking-widest"
          style={{ color: "var(--muted-foreground)" }}
        >
          Fees
        </span>

        {/* coin trail */}
        <div className="relative mx-1 h-10 flex-1">
          {[0, 1, 2].map((i) => (
            <span
              key={`${state}-${i}`}
              className="absolute top-1/2 h-2 w-2 rounded-full"
              style={{
                backgroundColor: accent,
                animation: positive
                  ? "fee-fly-vault 2.4s linear infinite"
                  : "fee-fly-burn 2.4s linear infinite",
                animationDelay: `${i * 0.8}s`,
                opacity: 0,
              }}
            />
          ))}
        </div>

        {/* destination: vault or furnace */}
        <div className="relative flex h-14 w-12 items-center justify-center">
          {positive ? (
            /* vault */
            <svg
              key="vault"
              viewBox="0 0 48 56"
              className="h-full w-full"
              fill="none"
            >
              {/* fill level */}
              <rect
                x="8"
                y="52"
                width="32"
                height="0"
                rx="2"
                fill={accent}
                opacity={0.28}
              >
                <animate
                  attributeName="y"
                  values="52;22;22;52"
                  keyTimes="0;0.7;0.95;1"
                  dur="4.8s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="height"
                  values="0;30;30;0"
                  keyTimes="0;0.7;0.95;1"
                  dur="4.8s"
                  repeatCount="indefinite"
                />
              </rect>
              {/* vault body */}
              <rect
                x="6"
                y="16"
                width="36"
                height="38"
                rx="3"
                stroke={accent}
                strokeWidth="1.5"
              />
              {/* vault door */}
              <rect
                x="12"
                y="22"
                width="24"
                height="26"
                rx="2"
                stroke={accent}
                strokeWidth="1.5"
              />
              {/* lock dial — pulses shut as it fills */}
              <circle cx="24" cy="35" r="4.5" stroke={accent} strokeWidth="1.5">
                <animate
                  attributeName="opacity"
                  values="0.4;1;1;0.4"
                  keyTimes="0;0.7;0.95;1"
                  dur="4.8s"
                  repeatCount="indefinite"
                />
              </circle>
              <line x1="24" y1="31" x2="24" y2="39" stroke={accent} strokeWidth="1.2" />
              <line x1="20" y1="35" x2="28" y2="35" stroke={accent} strokeWidth="1.2" />
            </svg>
          ) : (
            /* furnace */
            <svg
              key="furnace"
              viewBox="0 0 48 56"
              className="h-full w-full"
              fill="none"
            >
              {/* furnace body */}
              <rect
                x="8"
                y="18"
                width="32"
                height="34"
                rx="3"
                stroke={accent}
                strokeWidth="1.5"
              />
              {/* opening */}
              <path
                d="M17 52 V40 a7 7 0 0 1 14 0 V52"
                stroke={accent}
                strokeWidth="1.5"
              />
              {/* flame */}
              <path
                d="M24 47 c-3.4-3.4 -1.6-6.4 0-9.4 c1.6 3 3.4 6 0 9.4 z"
                fill={accent}
                style={{
                  transformOrigin: "24px 46px",
                  animation: "fee-flame 1.1s ease-in-out infinite",
                }}
              />
              {/* ash / disintegrating particles */}
              {[0, 1, 2].map((i) => (
                <circle
                  key={i}
                  cx={20 + i * 4}
                  cy="34"
                  r="1.2"
                  fill={accent}
                  style={{
                    animation: "fee-ash 1.8s ease-out infinite",
                    animationDelay: `${i * 0.55}s`,
                    opacity: 0,
                  }}
                />
              ))}
            </svg>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fee-fly-vault {
          0%   { left: 0;    transform: translateY(-50%) scale(0.6); opacity: 0; }
          15%  { opacity: 1; transform: translateY(-50%) scale(1); }
          85%  { opacity: 1; }
          100% { left: calc(100% - 8px); transform: translateY(-50%) scale(0.7); opacity: 0; }
        }
        @keyframes fee-fly-burn {
          0%   { left: 0;    transform: translateY(-50%) scale(0.6); opacity: 0; }
          15%  { opacity: 1; transform: translateY(-50%) scale(1); }
          75%  { opacity: 1; }
          100% { left: calc(100% - 8px); transform: translateY(-130%) scale(0.15); opacity: 0; }
        }
        @keyframes fee-flame {
          0%, 100% { transform: scaleY(1) scaleX(1); }
          50%      { transform: scaleY(1.25) scaleX(0.85); }
        }
        @keyframes fee-ash {
          0%   { transform: translateY(0); opacity: 0.8; }
          100% { transform: translateY(-16px); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .fee-routing * { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
