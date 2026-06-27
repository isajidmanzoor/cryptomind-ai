import Script from "next/script";

type AdBannerProps = {
  adsenseClientId: string;
  adsenseSlotId: string;
  cryptoAdsZoneId: string;
  cryptoAdsEmbedHtml: string;
};

export default function AdBanner({
  adsenseClientId,
  adsenseSlotId,
  cryptoAdsZoneId,
  cryptoAdsEmbedHtml,
}: AdBannerProps) {
  const normalizedAdsenseClientId =
    adsenseClientId.match(/ca-pub-\d+/)?.[0] || adsenseClientId.trim();
  const hasAdsenseUnit = Boolean(normalizedAdsenseClientId && adsenseSlotId);
  const hasCryptoUnit = Boolean(cryptoAdsEmbedHtml || cryptoAdsZoneId);

  return (
    <section className="mt-8 rounded border border-white/10 bg-zinc-950 p-5">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.18em] text-emerald-300">
            Embedded ad units
          </p>
          <h2 className="mt-2 text-2xl font-semibold">Verifier-visible monetization</h2>
        </div>
        <p className="text-sm text-zinc-400">
          {hasAdsenseUnit || hasCryptoUnit ? "Live markup present" : "Ad unit setup needed"}
        </p>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <div className="rounded border border-white/10 bg-black/24 p-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <p className="font-medium text-zinc-100">AdSense</p>
            <span className={hasAdsenseUnit ? "text-sm text-emerald-300" : "text-sm text-amber-300"}>
              {hasAdsenseUnit ? "Unit embedded" : "Slot missing"}
            </span>
          </div>
          {hasAdsenseUnit ? (
            <>
              <Script
                id="adsense-loader"
                async
                strategy="afterInteractive"
                src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${normalizedAdsenseClientId}`}
                crossOrigin="anonymous"
              />
              <ins
                className="adsbygoogle block min-h-24 w-full"
                data-ad-client={normalizedAdsenseClientId}
                data-ad-slot={adsenseSlotId}
                data-ad-format="autorelaxed"
              />
              <Script id={`adsense-push-${adsenseSlotId}`} strategy="afterInteractive">
                {`(window.adsbygoogle = window.adsbygoogle || []).push({});`}
              </Script>
            </>
          ) : (
            <div className="grid min-h-24 place-items-center rounded border border-dashed border-white/15 text-center text-sm text-zinc-500">
              Add NEXT_PUBLIC_ADSENSE_SLOT_ID to render an AdSense ad unit.
            </div>
          )}
        </div>

        <div className="rounded border border-white/10 bg-black/24 p-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <p className="font-medium text-zinc-100">Crypto ads</p>
            <span className={hasCryptoUnit ? "text-sm text-emerald-300" : "text-sm text-amber-300"}>
              {hasCryptoUnit ? "Unit embedded" : "Zone missing"}
            </span>
          </div>
          {cryptoAdsEmbedHtml ? (
            <div
              className="min-h-24 overflow-hidden rounded bg-transparent"
              dangerouslySetInnerHTML={{ __html: cryptoAdsEmbedHtml }}
            />
          ) : cryptoAdsZoneId ? (
            <iframe
              title="Crypto ad unit"
              data-aa={cryptoAdsZoneId}
              src={`https://acceptable.a-ads.com/${cryptoAdsZoneId}`}
              className="h-24 w-full border-0 bg-transparent"
              loading="lazy"
              sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
            />
          ) : (
            <div className="grid min-h-24 place-items-center rounded border border-dashed border-white/15 text-center text-sm text-zinc-500">
              Add NEXT_PUBLIC_CRYPTO_ADS_ZONE_ID or NEXT_PUBLIC_CRYPTO_ADS_EMBED_HTML.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
