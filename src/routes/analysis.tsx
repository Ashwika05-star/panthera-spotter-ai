import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { media, readUpload, leopards } from "@/lib/panthera";
import { CheckCircle2, SearchX, ArrowLeft, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/analysis")({
  head: () => ({
    meta: [
      { title: "Identification Analysis — PANTHERA" },
      {
        name: "description",
        content:
          "Rosette, facial and body marking similarity scores comparing an uploaded leopard against the PANTHERA registry.",
      },
      { property: "og:title", content: "Identification Analysis — PANTHERA" },
      {
        property: "og:description",
        content: "Similarity breakdown between an uploaded leopard image and its closest match.",
      },
    ],
  }),
  component: Analysis,
});

const metrics = [
  { label: "Rosette Pattern Similarity", value: 96 },
  { label: "Facial Pattern Similarity", value: 91 },
  { label: "Body Marking Similarity", value: 93 },
  { label: "Overall Similarity", value: 94 },
];

const match = leopards[0]!;

function Meter({ label, value }: { label: string; value: number }) {
  const [w, setW] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setW(value), 250);
    return () => clearTimeout(t);
  }, [value]);
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <p className="text-sm text-cream/80">{label}</p>
        <p className="font-display text-xl text-primary">{value}%</p>
      </div>
      <div className="mt-2 h-[3px] w-full bg-secondary">
        <div
          className="h-full transition-[width] duration-[1400ms] ease-out"
          style={{ width: `${w}%`, background: "var(--gradient-ember)" }}
        />
      </div>
    </div>
  );
}

function Analysis() {
  const [uploaded, setUploaded] = useState<string | null>(null);
  const [noMatch, setNoMatch] = useState(false);

  useEffect(() => {
    setUploaded(readUpload()?.dataUrl ?? null);
  }, []);

  return (
    <div className="relative min-h-screen">
      <div className="mx-auto max-w-7xl px-6 pt-36 pb-28 lg:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow rise">Vision AI · Step 02</p>
            <h1 className="rise mt-4 text-5xl text-cream lg:text-6xl" style={{ animationDelay: "0.15s" }}>
              Identification Analysis
            </h1>
          </div>
          <button
            onClick={() => setNoMatch((v) => !v)}
            className="rounded-sm border border-border px-5 py-2.5 text-[0.68rem] uppercase tracking-[0.22em] text-cream/70 transition-colors hover:border-primary hover:text-primary"
          >
            {noMatch ? "View matched result" : "View no-match result"}
          </button>
        </div>

        {noMatch ? (
          <div
            className="glass-panel mt-12 rounded-sm px-8 py-24 text-center"
            style={{ boxShadow: "var(--shadow-deep)" }}
          >
            <SearchX size={44} strokeWidth={1} className="mx-auto text-muted-foreground" />
            <h2 className="mt-6 text-4xl text-cream">No Strong Match Found</h2>
            <p className="mx-auto mt-4 max-w-md leading-relaxed text-muted-foreground">
              No sufficiently similar leopard was found in the current database.
            </p>
            <Link
              to="/vision-ai"
              className="mt-10 inline-flex items-center gap-3 rounded-sm border border-primary/60 px-8 py-3.5 text-[0.7rem] uppercase tracking-[0.24em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              Upload another image
            </Link>
          </div>
        ) : (
          <>
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                ["Leopard Detected", "Yes"],
                ["Similarity", "94%"],
                ["Closest Match", match.id],
                ["Confidence", "High"],
              ].map(([k, v]) => (
                <div key={k} className="glass-panel rounded-sm px-6 py-6">
                  <p className="eyebrow">{k}</p>
                  <p className="mt-2 font-display text-3xl text-cream">{v}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 grid items-stretch gap-6 lg:grid-cols-[1fr_auto_1fr]">
              <figure className="glass-panel overflow-hidden rounded-sm">
                <figcaption className="eyebrow border-b border-border/60 px-5 py-4">
                  Uploaded Image
                </figcaption>
                <img
                  src={uploaded ?? media.waterfall}
                  alt="Uploaded leopard submitted for identification"
                  className="h-[26rem] w-full object-cover"
                />
              </figure>

              <div className="flex items-center justify-center">
                <span className="font-display text-2xl italic text-primary">vs</span>
              </div>

              <figure className="glass-panel overflow-hidden rounded-sm">
                <figcaption className="eyebrow flex items-center justify-between border-b border-border/60 px-5 py-4">
                  Database Match
                  <span className="text-primary">{match.id}</span>
                </figcaption>
                <img
                  src={match.image}
                  alt={`Registry photograph of ${match.id}`}
                  className="h-[26rem] w-full object-cover"
                />
              </figure>
            </div>

            <div className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="glass-panel space-y-7 rounded-sm px-8 py-8">
                {metrics.map((m) => (
                  <Meter key={m.label} {...m} />
                ))}
              </div>
              <div className="glass-panel rounded-sm px-8 py-8">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="text-primary" size={20} />
                  <p className="text-cream">Match verified against registry</p>
                </div>
                <dl className="mt-6 space-y-4 text-sm">
                  {[
                    ["Individual", `${match.id} · ${match.name}`],
                    ["Sex", match.sex],
                    ["Home range", match.location],
                    ["Last sighting", match.lastSighting],
                    ["Prior records", `${match.records} identification records`],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-6 border-b border-border/50 pb-3">
                      <dt className="text-muted-foreground">{k}</dt>
                      <dd className="text-right text-cream/90">{v}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
                  Mock analysis output. Live model inference will replace these values once the
                  identification pipeline is connected.
                </p>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/vision-ai"
                className="inline-flex items-center gap-3 rounded-sm border border-border px-7 py-3.5 text-[0.7rem] uppercase tracking-[0.24em] text-cream/80 transition-colors hover:border-primary hover:text-primary"
              >
                <ArrowLeft size={15} /> Analyze another
              </Link>
              <Link
                to="/research"
                className="inline-flex items-center gap-3 rounded-sm bg-primary px-7 py-3.5 text-[0.7rem] uppercase tracking-[0.24em] text-primary-foreground transition-all hover:brightness-110"
              >
                Open registry profile <ArrowRight size={15} />
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
