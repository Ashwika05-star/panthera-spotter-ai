import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { media, leopards } from "@/lib/panthera";
import { Radio, MapPin, Clock, Activity, Cpu, Video } from "lucide-react";

export const Route = createFileRoute("/ivp-system")({
  head: () => ({
    meta: [
      { title: "IVP System — Live Leopard Monitoring | PANTHERA" },
      {
        name: "description",
        content:
          "The PANTHERA IVP array streams camera-trap footage and identifies individual leopards in real time across the Western Ghats.",
      },
      { property: "og:title", content: "IVP System — Live Leopard Monitoring" },
      {
        property: "og:description",
        content: "Real-time camera nodes, detections and individual IDs from the field.",
      },
    ],
  }),
  component: IVP,
});

const nodes = [
  { id: "NODE-04", name: "Kabini Riverbank", status: "Streaming", detections: 3 },
  { id: "NODE-11", name: "Anamalai Cascades", status: "Streaming", detections: 1 },
  { id: "NODE-19", name: "Nagarhole Ridge", status: "Idle", detections: 0 },
  { id: "NODE-23", name: "Bandipur Fire Line", status: "Streaming", detections: 2 },
];

function IVP() {
  const [clock, setClock] = useState("");
  useEffect(() => {
    const tick = () =>
      setClock(new Date().toLocaleTimeString("en-GB", { hour12: false }));
    tick();
    const i = setInterval(tick, 1000);
    return () => clearInterval(i);
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-6 pt-36 pb-28 lg:px-10">
      <p className="eyebrow rise">Individual Verification Pipeline</p>
      <h1 className="rise mt-4 text-5xl text-cream lg:text-6xl" style={{ animationDelay: "0.15s" }}>
        IVP System
      </h1>
      <p className="rise mt-5 max-w-2xl leading-relaxed text-muted-foreground" style={{ animationDelay: "0.3s" }}>
        Remote camera nodes stream continuously from the ridgelines. Every motion event is scored,
        matched against the registry and logged without human intervention.
      </p>

      <div className="mt-12 grid gap-6 lg:grid-cols-[1.55fr_1fr]">
        <div className="relative overflow-hidden rounded-sm" style={{ boxShadow: "var(--shadow-deep)" }}>
          <video
            className="h-[30rem] w-full object-cover lg:h-[38rem]"
            src={media.heroVideo}
            poster={media.foliage}
            autoPlay
            muted
            loop
            playsInline
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/50 via-transparent to-background/70" />
          <div className="absolute left-5 top-5 flex items-center gap-2 rounded-sm bg-background/60 px-3 py-2 backdrop-blur">
            <span className="h-2 w-2 animate-pulse rounded-full bg-destructive" />
            <span className="text-[0.65rem] uppercase tracking-[0.22em] text-cream">Live Camera</span>
          </div>
          <div className="absolute right-5 top-5 rounded-sm bg-background/60 px-3 py-2 font-mono text-xs text-cream/85 backdrop-blur">
            NODE-04 · {clock}
          </div>
          <div className="pointer-events-none absolute left-[18%] top-[34%] h-40 w-56 border border-primary/80">
            <span className="absolute -top-6 left-0 bg-primary px-2 py-0.5 text-[0.6rem] uppercase tracking-[0.18em] text-primary-foreground">
              Panthera-042 · 0.97
            </span>
          </div>
          <div className="absolute inset-x-0 bottom-0 grid grid-cols-2 gap-px bg-border/40 sm:grid-cols-4">
            {[
              ["Leopards Detected", "2"],
              ["Current Leopard ID", "Panthera-042"],
              ["Confidence", "97%"],
              ["Last Detection", "00:41 ago"],
            ].map(([k, v]) => (
              <div key={k} className="bg-background/75 px-4 py-4 backdrop-blur">
                <p className="eyebrow text-[0.58rem]">{k}</p>
                <p className="mt-1 truncate text-sm text-cream">{v}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-panel rounded-sm p-7">
            <p className="eyebrow">Session Telemetry</p>
            <div className="mt-5 space-y-4 text-sm">
              {[
                [Radio, "Live Camera", "NODE-04 · 1080p / 24fps"],
                [Activity, "Leopards Detected", "2 individuals this hour"],
                [Cpu, "Current Leopard ID", "Panthera-042 — Kaziranga Ghost"],
                [MapPin, "Location", "Kabini Buffer Zone, 12.03°N 76.31°E"],
                [Video, "Confidence", "High · 0.97"],
                [Clock, "Last Detection", "29 Aug 2026 · 05:11:22 IST"],
              ].map(([Icon, k, v]) => {
                const I = Icon as typeof Radio;
                return (
                  <div key={k as string} className="flex gap-4 border-b border-border/50 pb-3.5">
                    <I size={16} className="mt-0.5 shrink-0 text-primary" strokeWidth={1.5} />
                    <div>
                      <p className="text-[0.68rem] uppercase tracking-[0.2em] text-muted-foreground">
                        {k as string}
                      </p>
                      <p className="mt-1 text-cream/90">{v as string}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="glass-panel rounded-sm p-7">
            <p className="eyebrow">Node Array</p>
            <div className="mt-5 space-y-3">
              {nodes.map((n) => (
                <div key={n.id} className="flex items-center justify-between gap-4 text-sm">
                  <div>
                    <p className="text-cream/90">{n.name}</p>
                    <p className="font-mono text-[0.7rem] text-muted-foreground">{n.id}</p>
                  </div>
                  <div className="text-right">
                    <p
                      className={
                        n.status === "Streaming" ? "text-xs text-primary" : "text-xs text-muted-foreground"
                      }
                    >
                      {n.status}
                    </p>
                    <p className="text-[0.7rem] text-muted-foreground">{n.detections} detections</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {leopards.map((l, i) => (
          <div key={l.id} className="glass-panel flex gap-4 rounded-sm p-4">
            <img
              src={l.image}
              alt={`Detection frame of ${l.id}`}
              loading="lazy"
              className="h-24 w-24 shrink-0 rounded-sm object-cover"
            />
            <div className="min-w-0">
              <p className="eyebrow text-primary">{l.id}</p>
              <p className="mt-1 truncate text-cream">{l.location}</p>
              <p className="mt-1 text-xs text-muted-foreground">{l.lastSighting}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Confidence {[97, 93, 89][i]}%
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
