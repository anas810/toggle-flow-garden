import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { BankCanvas } from "@/components/BankCanvas";
import { IssuanceRate } from "@/components/IssuanceRate";
import { FeeRouting } from "@/components/FeeRouting";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The Central Bank — Standard Reserve, Explained" },
      {
        name: "description",
        content:
          "An interactive explainer of the Standard Reserve central bank: net capital flow decides whether each epoch expands or contracts $STANDARD.",
      },
      { property: "og:title", content: "The Central Bank — Standard Reserve, Explained" },
      {
        property: "og:description",
        content:
          "Flip one switch to see how positive and negative net flow drive expansion and contraction of $STANDARD.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

type State = "expansion" | "contraction";

const COPY: Record<
  State,
  {
    tag: string;
    heading: string;
    body: string[];
    chain: string[];
    issuance: string;
    fees: string;
    reserves: string;
  }
> = {
  expansion: {
    tag: "Positive flow → Expansion",
    heading: "The bank grows the supply.",
    body: [
      "If net capital flow is positive, the central bank goes into expansion for that epoch. The issuance of $STANDARD runs at a higher rate to incentivize more growth.",
      "Trading fees are then directed to the expansion vault, which purchases tokenized gold and increases protocol owned liquidity to strengthen the reserves for $STANDARD.",
    ],
    chain: ["fees", "expansion vault", "gold + liquidity"],
    issuance: "Higher",
    fees: "Expansion vault",
    reserves: "Building",
  },
  contraction: {
    tag: "Negative flow → Contraction",
    heading: "The bank defends the supply.",
    body: [
      "If net capital flow is negative, the central bank goes into contraction for that epoch. The issuance rate is decreased to prevent further dilution.",
      "Trading fees are then directed away from the expansion vault and directed to the contraction vault, which is fully used for token buybacks and burns to defend $STANDARD.",
    ],
    chain: ["fees", "contraction vault", "buyback + burn"],
    issuance: "Lower",
    fees: "Contraction vault",
    reserves: "Defending",
  },
};

function Index() {
  const [state, setState] = useState<State>("expansion");
  const positive = state === "expansion";
  const copy = COPY[state];
  const accent = positive ? "var(--expansion)" : "var(--contraction)";

  return (
    <main
      className="min-h-screen bg-background text-ink"
      style={{ ["--accent-active" as string]: accent }}
    >
      <div className="mx-auto w-full max-w-5xl px-6 pb-24 pt-14 sm:px-10">
        {/* Header */}
        <header className="flex items-baseline justify-between border-b border-hairline pb-5">
          <span className="label">Standard Reserve</span>
          <span className="label text-muted-foreground">The Central Bank</span>
        </header>

        {/* Opening */}
        <section className="pt-14 sm:pt-20">
          <h1 className="max-w-3xl text-4xl leading-[1.05] font-semibold tracking-tight sm:text-6xl">
            All volume passes through the pool.
            <br />
            <span style={{ color: accent, transition: "color 700ms ease" }}>
              Net flow decides the epoch.
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
            Every charter, entry, withdrawal and exit routes through one Hooked V4
            pool. The trading fees land with the central bank, and the direction of
            capital sets what the bank does next.
          </p>
        </section>

        {/* Toggle + animation */}
        <section className="mt-20 border border-hairline bg-paper sm:mt-28">
          <div className="flex flex-col items-center gap-4 border-b border-hairline px-6 py-8">
            <span className="label text-muted-foreground">Net capital flow</span>
            <button
              type="button"
              onClick={() => setState(positive ? "contraction" : "expansion")}
              aria-pressed={!positive}
              className="relative flex h-12 w-64 items-center rounded-full border border-hairline bg-background p-1"
            >
              <span
                className="absolute top-1 bottom-1 w-[calc(50%-0.25rem)] rounded-full transition-all duration-500 ease-out"
                style={{
                  left: positive ? "0.25rem" : "calc(50%)",
                  backgroundColor: accent,
                }}
              />
              <span
                className={`label relative z-10 flex-1 text-center transition-colors duration-300 ${
                  positive ? "text-background" : "text-muted-foreground"
                }`}
              >
                + Positive
              </span>
              <span
                className={`label relative z-10 flex-1 text-center transition-colors duration-300 ${
                  positive ? "text-muted-foreground" : "text-background"
                }`}
              >
                – Negative
              </span>
            </button>
            <p className="text-sm text-muted-foreground">
              {positive
                ? "Capital is flowing into the bank."
                : "Capital is flowing out of the bank."}
            </p>
          </div>

          <div className="relative">
            <BankCanvas state={state} />
            <IssuanceRate state={state} />
            <FeeRouting state={state} />
            <span
              key={state}
              className="label animate-fade-in absolute left-1/2 -translate-x-1/2 text-sm tracking-widest uppercase"
              style={{ top: "calc(50% + 70px)", color: accent }}
            >
              {positive ? "Expansion mode" : "Contraction mode"}
            </span>
          </div>
        </section>

        {/* State panel */}
        <section key={state} className="mt-16 animate-fade-in sm:mt-20">
          <span className="label" style={{ color: accent }}>
            {copy.tag}
          </span>
          <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
            {copy.heading}
          </h2>
          <div className="mt-6 grid max-w-3xl gap-5">
            {copy.body.map((p) => (
              <p key={p} className="text-base leading-relaxed text-muted-foreground">
                {p}
              </p>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            {copy.chain.map((c, i) => (
              <span key={c} className="flex items-center gap-3">
                {i > 0 && <span className="text-muted-foreground">→</span>}
                <span
                  className="animate-fade-in rounded-full border px-4 py-2 text-sm"
                  style={{
                    borderColor: accent,
                    color: accent,
                    animationDelay: `${i * 140}ms`,
                    animationFillMode: "backwards",
                  }}
                >
                  {c}
                </span>
              </span>
            ))}
          </div>

          <dl className="mt-12 grid grid-cols-1 gap-px border border-hairline bg-hairline sm:grid-cols-3">
            {[
              ["Issuance rate", copy.issuance],
              ["Fees routed to", copy.fees],
              ["Reserves", copy.reserves],
            ].map(([k, v]) => (
              <div key={k} className="bg-paper px-5 py-6">
                <dt className="label text-muted-foreground">{k}</dt>
                <dd
                  className="mt-2 text-xl font-medium"
                  style={{ color: accent, transition: "color 500ms ease" }}
                >
                  {v}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Closing */}
        <footer className="mt-24 flex flex-col gap-4 border-t border-hairline pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-md text-sm text-muted-foreground">
            One pool, one fee stream, two states. The bank simply follows where the
            capital goes.
          </p>
          <a
            href="https://www.standardreserve.xyz/whitepaper/"
            target="_blank"
            rel="noreferrer"
            className="label border-b border-ink pb-1 transition-opacity hover:opacity-60"
          >
            Read the whitepaper
          </a>
        </footer>
      </div>
    </main>
  );
}
