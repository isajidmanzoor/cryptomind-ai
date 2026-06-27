"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import ChatBot from "@/components/ai/ChatBot";
import AirdropTracker from "@/components/airdrops/AirdropTracker";
import TradingViewCharts from "@/components/market/TradingViewCharts";
import NewsletterSignup from "@/components/newsletter/NewsletterSignup";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Bot,
  Brain,
  CheckCircle2,
  CircleAlert,
  CircleDashed,
  Image as ImageIcon,
  LineChart,
  Newspaper,
  Radio,
  RefreshCw,
  ShieldAlert,
  Sparkles,
  WalletCards,
} from "lucide-react";
import type {
  CryptoPipelineResult,
  FeatureStatus,
  MarketAsset,
  SupportedLanguage,
} from "@/services/pipeline/types";

type ApiState =
  | { status: "loading"; data?: never; error?: never }
  | { status: "ready"; data: CryptoPipelineResult; error?: never }
  | { status: "error"; data?: never; error: string };

const flow = [
  { label: "Internet", icon: Radio },
  { label: "AI Web Scraper", icon: Bot },
  { label: "Groq AI Analysis", icon: Brain },
  { label: "Sentiment", icon: Sparkles },
  { label: "Price Charts", icon: LineChart },
  { label: "AI Image", icon: ImageIcon },
  { label: "Auto Publish", icon: Newspaper },
  { label: "Monetization", icon: WalletCards },
];

export default function Home() {
  const [state, setState] = useState<ApiState>({ status: "loading" });
  const [language, setLanguage] = useState<SupportedLanguage>("en");

  async function loadPipeline() {
    setState({ status: "loading" });
    await loadPipelineData(language);
  }

  async function loadPipelineData(nextLanguage: SupportedLanguage) {

    try {
      const response = await fetch(`/api/pipeline?full=1&lang=${nextLanguage}`, { cache: "no-store" });

      if (!response.ok) {
        throw new Error(`Pipeline failed with ${response.status}`);
      }

      const payload = (await response.json()) as {
        data: CryptoPipelineResult;
      };

      setState({ status: "ready", data: payload.data });
    } catch (error) {
      setState({
        status: "error",
        error: error instanceof Error ? error.message : "Pipeline unavailable",
      });
    }
  }

  useEffect(() => {
    let active = true;

    async function loadInitialData() {
      try {
        const response = await fetch(`/api/pipeline?full=1&lang=${language}`, { cache: "no-store" });

        if (!response.ok) {
          throw new Error(`Pipeline failed with ${response.status}`);
        }

        const payload = (await response.json()) as {
          data: CryptoPipelineResult;
        };

        if (active) {
          setState({ status: "ready", data: payload.data });
        }
      } catch (error) {
        if (active) {
          setState({
            status: "error",
            error: error instanceof Error ? error.message : "Pipeline unavailable",
          });
        }
      }
    }

    void loadInitialData();

    return () => {
      active = false;
    };
  }, [language]);

  const data = state.status === "ready" ? state.data : null;
  const primaryAsset = data?.market[0];
  const chartData = useMemo(() => primaryAsset?.chart || [], [primaryAsset]);

  return (
    <main className="min-h-screen bg-[#070907] text-zinc-50">
      <section className="border-b border-white/10 bg-[radial-gradient(circle_at_top_left,#143f32,transparent_34%),linear-gradient(135deg,#07110d,#101113_58%,#1a1510)]">
        <div className="mx-auto grid min-h-[92vh] max-w-7xl gap-8 px-5 py-6 sm:px-8 lg:grid-cols-[1.02fr_0.98fr] lg:py-10">
          <div className="flex flex-col justify-between gap-8">
            <nav className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="grid size-10 place-items-center rounded bg-emerald-400 text-black">
                  <Brain size={21} />
                </div>
                <span className="text-lg font-semibold tracking-wide">CryptoMind AI</span>
              </div>
              <div className="flex items-center gap-2">
                <select
                  value={language}
                  onChange={(event) => setLanguage(event.target.value as SupportedLanguage)}
                  className="h-10 rounded border border-white/15 bg-black/30 px-2 text-sm text-zinc-200 outline-none"
                  aria-label="Language"
                >
                  <option value="en">EN</option>
                  <option value="ur">UR</option>
                  <option value="hi">HI</option>
                  <option value="ar">AR</option>
                  <option value="es">ES</option>
                </select>
                <button
                  type="button"
                  onClick={loadPipeline}
                  className="inline-flex h-10 items-center gap-2 rounded border border-white/15 px-3 text-sm text-zinc-200 transition hover:border-emerald-300 hover:text-white"
                >
                  <RefreshCw size={16} />
                  Refresh
                </button>
              </div>
            </nav>

            <div className="max-w-2xl">
              <p className="mb-4 text-sm font-medium uppercase tracking-[0.22em] text-emerald-300">
                Real-time crypto intelligence engine
              </p>
              <h1 className="text-5xl font-semibold leading-[1.03] sm:text-6xl lg:text-7xl">
                Scrape, analyze, publish, and monetize crypto news.
              </h1>
              <p className="mt-5 max-w-xl text-base leading-7 text-zinc-300 sm:text-lg">
                Live news scraping, Groq-powered market reasoning, sentiment mood,
                auto charts, Pollinations image generation, Supabase publishing,
                affiliate links, AdSense, and crypto ads readiness.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                ["Signal", data?.analysis.signal || "..."],
                ["Confidence", data ? `${data.analysis.confidence}%` : "..."],
                ["Mood", data?.sentiment.mood || "..."],
                ["Updated", data ? new Date(data.generatedAt).toLocaleTimeString() : "..."],
              ].map(([label, value]) => (
                <div key={label} className="rounded border border-white/10 bg-black/24 p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">{label}</p>
                  <p className="mt-2 text-xl font-semibold text-white">{value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-end">
            <div className="w-full rounded border border-white/10 bg-zinc-950/72 p-4 shadow-2xl shadow-black/30 backdrop-blur">
              <div className="mb-4 flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-zinc-400">Primary chart</p>
                  <h2 className="text-2xl font-semibold">
                    {primaryAsset ? `${primaryAsset.name} (${primaryAsset.symbol})` : "Loading market"}
                  </h2>
                </div>
                {primaryAsset ? (
                  <div className="text-right">
                    <p className="text-2xl font-semibold">${formatNumber(primaryAsset.price)}</p>
                    <p
                      className={
                        primaryAsset.change24h >= 0 ? "text-emerald-300" : "text-rose-300"
                      }
                    >
                      {primaryAsset.change24h.toFixed(2)}%
                    </p>
                  </div>
                ) : null}
              </div>
              <div className="h-[360px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="priceGradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="5%" stopColor="#34d399" stopOpacity={0.55} />
                        <stop offset="95%" stopColor="#34d399" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid stroke="#27272a" strokeDasharray="3 3" />
                    <XAxis dataKey="time" hide />
                    <YAxis hide domain={["dataMin", "dataMax"]} />
                    <Tooltip
                      contentStyle={{
                        background: "#111",
                        border: "1px solid rgba(255,255,255,0.12)",
                        borderRadius: 6,
                        color: "#fff",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="price"
                      stroke="#34d399"
                      strokeWidth={3}
                      fill="url(#priceGradient)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {flow.map((step) => {
            const Icon = step.icon;

            return (
              <div key={step.label} className="rounded border border-white/10 bg-zinc-950 p-4">
                <Icon className="mb-4 text-emerald-300" size={22} />
                <p className="text-sm font-medium text-zinc-100">{step.label}</p>
              </div>
            );
          })}
        </div>

        {state.status === "error" ? (
          <div className="mt-8 rounded border border-rose-400/40 bg-rose-950/30 p-5 text-rose-100">
            <div className="flex items-center gap-2 font-semibold">
              <ShieldAlert size={18} />
              Pipeline error
            </div>
            <p className="mt-2 text-sm">{state.error}</p>
          </div>
        ) : null}

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="rounded border border-white/10 bg-[#101312] p-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.18em] text-emerald-300">
                  AI prediction
                </p>
                <h2 className="mt-2 text-3xl font-semibold">
                  {data?.analysis.prediction || "Loading AI market analysis..."}
                </h2>
              </div>
              <div className="grid size-16 place-items-center rounded bg-amber-300 text-black">
                <Sparkles size={26} />
              </div>
            </div>
            <p className="mt-5 leading-7 text-zinc-300">
              {data?.analysis.reason ||
                "CryptoMind AI is preparing the signal from market and headline data."}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {(data?.analysis.risks || ["Live data", "AI signal", "Publishing"]).map((risk) => (
                <span
                  key={risk}
                  className="rounded border border-white/10 bg-black/30 px-3 py-1 text-sm text-zinc-300"
                >
                  {risk}
                </span>
              ))}
            </div>
          </section>

          <section className="rounded border border-white/10 bg-[#121113] p-5">
            <p className="text-sm uppercase tracking-[0.18em] text-emerald-300">
              AI article
            </p>
            <h2 className="mt-2 text-2xl font-semibold">
              {data?.article.title || "Generating article..."}
            </h2>
            {data?.article.imageUrl ? (
              <Image
                src={data.article.imageUrl}
                alt=""
                width={1200}
                height={675}
                className="mt-4 aspect-[16/9] w-full rounded object-cover"
              />
            ) : (
              <div className="mt-4 aspect-[16/9] rounded bg-zinc-900" />
            )}
            <p className="mt-4 text-sm leading-6 text-zinc-300">{data?.article.excerpt}</p>
          </section>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <section className="rounded border border-white/10 bg-zinc-950 p-5 lg:col-span-2">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Live Scraped News</h2>
              <span className="rounded bg-emerald-400 px-2 py-1 text-xs font-semibold text-black">
                {data?.news.length || 0} items
              </span>
            </div>
            <div className="grid gap-3">
              {(data?.news || []).slice(0, 5).map((item) => (
                <a
                  key={item.id}
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded border border-white/10 bg-white/[0.03] p-4 transition hover:border-emerald-300/60"
                >
                  <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-500">
                    <span>{item.source}</span>
                    <span>{new Date(item.publishedAt).toLocaleString()}</span>
                  </div>
                  <h3 className="mt-2 font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 line-clamp-2 text-sm text-zinc-400">{item.summary}</p>
                </a>
              ))}
            </div>
          </section>

          <section className="rounded border border-white/10 bg-zinc-950 p-5">
            <h2 className="text-2xl font-semibold">Automation Status</h2>
            <div className="mt-5 grid gap-3">
              {(data?.integrations || []).map((item) => (
                <div key={item.name} className="rounded border border-white/10 bg-white/[0.03] p-4">
                  <div className="flex items-center gap-2">
                    <StatusIcon configured={item.configured} ok={item.ok} />
                    <p className="font-medium">{item.name}</p>
                  </div>
                  <p className="mt-2 text-sm text-zinc-400">{item.message}</p>
                </div>
              ))}
              {data ? <MonetizationPanel data={data} /> : null}
            </div>
          </section>
        </div>

        <MarketGrid assets={data?.market || []} />

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <ChatBot language={language} />
          <NewsletterSignup language={language} />
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <AirdropTracker />
          <FeatureMatrix features={data?.features || []} />
        </div>

        <div className="mt-8">
          <TradingViewCharts />
        </div>
      </section>
    </main>
  );
}

function FeatureMatrix({ features }: { features: FeatureStatus[] }) {
  if (features.length === 0) {
    return null;
  }

  return (
    <section className="rounded border border-white/10 bg-zinc-950 p-5">
      <h2 className="text-2xl font-semibold">Implementation Audit</h2>
      <div className="mt-4 grid gap-2">
        {features.map((feature) => (
          <div
            key={feature.name}
            className="grid gap-2 rounded border border-white/10 bg-white/[0.03] p-3 sm:grid-cols-[0.8fr_0.4fr_1.3fr]"
          >
            <span className="font-medium text-white">{feature.name}</span>
            <span className={featureStatusClass(feature.status)}>{feature.status}</span>
            <span className="text-sm text-zinc-400">{feature.detail}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function MarketGrid({ assets }: { assets: MarketAsset[] }) {
  if (assets.length === 0) {
    return null;
  }

  return (
    <section className="mt-8">
      <h2 className="mb-4 text-2xl font-semibold">Auto Generated Price Cards</h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {assets.map((asset) => (
          <div key={asset.symbol} className="rounded border border-white/10 bg-zinc-950 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">{asset.name}</p>
                <p className="text-sm text-zinc-500">{asset.symbol}</p>
              </div>
              <p className={asset.change24h >= 0 ? "text-emerald-300" : "text-rose-300"}>
                {asset.change24h.toFixed(2)}%
              </p>
            </div>
            <p className="mt-4 text-2xl font-semibold">${formatNumber(asset.price)}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function MonetizationPanel({ data }: { data: CryptoPipelineResult }) {
  const adsenseReady = data.monetization.adsenseUnitConfigured;
  const affiliateReady = Boolean(data.monetization.affiliateUrl);
  const cryptoAdsReady = data.monetization.cryptoAdsUnitConfigured;
  const allReady = adsenseReady && affiliateReady && cryptoAdsReady;
  const adsenseValue = data.monetization.adsenseUnitConfigured
    ? `${data.monetization.adsenseClientId} / slot ${data.monetization.adsenseSlotId}`
    : data.monetization.adsenseClientId
      ? `Client ${data.monetization.adsenseClientId}; add NEXT_PUBLIC_ADSENSE_SLOT_ID`
      : "NEXT_PUBLIC_ADSENSE_CLIENT_ID";
  const cryptoAdsValue = data.monetization.cryptoAdsEmbedHtml
    ? "Custom HTML embed configured"
    : data.monetization.cryptoAdsZoneId || "NEXT_PUBLIC_CRYPTO_ADS_ZONE_ID";

  return (
    <div
      className={
        allReady
          ? "rounded border border-emerald-300/30 bg-emerald-300/10 p-4"
          : "rounded border border-amber-300/30 bg-amber-300/10 p-4"
      }
    >
      <div className={allReady ? "flex items-center gap-2 text-emerald-100" : "flex items-center gap-2 text-amber-100"}>
        <WalletCards size={18} />
        <p className="font-medium">{allReady ? "Revenue Ready" : "Revenue Setup"}</p>
      </div>
      <div className="mt-3 grid gap-2 text-sm text-zinc-300">
        <RevenueLine label="AdSense" ready={adsenseReady} value={adsenseValue} />
        <RevenueLine label="Affiliate" ready={affiliateReady} value={data.monetization.affiliateUrl} />
        <RevenueLine label="Crypto ads" ready={cryptoAdsReady} value={cryptoAdsValue} />
      </div>
    </div>
  );
}

function StatusIcon({ configured, ok }: { configured: boolean; ok: boolean }) {
  if (!ok) {
    return <CircleAlert size={18} className="text-rose-300" />;
  }

  if (!configured) {
    return <CircleDashed size={18} className="text-amber-300" />;
  }

  return <CheckCircle2 size={18} className="text-emerald-300" />;
}

function RevenueLine({
  label,
  ready,
  value,
}: {
  label: string;
  ready: boolean;
  value: string;
}) {
  return (
    <div className="flex items-start justify-between gap-3 rounded border border-white/10 bg-black/20 px-3 py-2">
      <span className="text-zinc-400">{label}</span>
      <span className={ready ? "break-all text-right text-emerald-200" : "break-all text-right text-amber-200"}>
        {ready ? value : value.startsWith("NEXT_PUBLIC") ? `Add ${value}` : value}
      </span>
    </div>
  );
}

function featureStatusClass(status: FeatureStatus["status"]) {
  if (status === "live") {
    return "w-fit rounded bg-emerald-400/10 px-2 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-emerald-300";
  }

  if (status === "partial") {
    return "w-fit rounded bg-amber-400/10 px-2 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-amber-300";
  }

  return "w-fit rounded bg-rose-400/10 px-2 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-rose-300";
}

function formatNumber(value: number) {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: value > 100 ? 0 : 2,
  }).format(value);
}
