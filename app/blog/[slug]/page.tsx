import { createClient } from "@supabase/supabase-js";
import type { Metadata } from "next";
import Image from "next/image";
import { seoDescription, siteName, siteUrl } from "@/app/seo";

type Article = {
  title: string;
  excerpt: string;
  body: string;
  image_url: string;
  affiliate_url: string;
  published_at: string;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) {
    return {
      title: "Crypto Article",
      description: seoDescription,
      alternates: {
        canonical: `/blog/${slug}`,
      },
    };
  }

  const url = `${siteUrl}/blog/${slug}`;

  return {
    title: article.title,
    description: article.excerpt,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "article",
      url,
      siteName,
      title: article.title,
      description: article.excerpt,
      publishedTime: article.published_at,
      images: [
        {
          url: article.image_url || "/opengraph-image",
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
      images: [article.image_url || "/opengraph-image"],
    },
  };
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) {
    return (
      <main className="min-h-screen bg-[#070907] px-5 py-16 text-zinc-50">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm uppercase tracking-[0.18em] text-emerald-300">
            CryptoMind AI
          </p>
          <h1 className="mt-4 text-4xl font-semibold">Article not published yet</h1>
          <p className="mt-4 text-zinc-400">
            Run `POST /api/pipeline` with your pipeline secret to publish this article
            into Supabase.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#070907] text-zinc-50">
      <article className="mx-auto max-w-4xl px-5 py-12">
        <p className="text-sm uppercase tracking-[0.18em] text-emerald-300">
          CryptoMind AI Article
        </p>
        <h1 className="mt-4 text-4xl font-semibold leading-tight sm:text-6xl">
          {article.title}
        </h1>
        <p className="mt-5 text-lg leading-8 text-zinc-300">{article.excerpt}</p>
        <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded border border-white/10">
          <Image
            src={article.image_url}
            alt=""
            fill
            sizes="(max-width: 896px) 100vw, 896px"
            className="object-cover"
          />
        </div>
        <div className="mt-8 whitespace-pre-line text-base leading-8 text-zinc-200">
          {article.body}
        </div>
        <a
          href={article.affiliate_url}
          className="mt-8 inline-flex rounded bg-emerald-400 px-4 py-2 font-semibold text-black"
        >
          Open affiliate offer
        </a>
      </article>
    </main>
  );
}

async function getArticle(slug: string): Promise<Article | null> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    return null;
  }

  const supabase = createClient(url, key);
  const { data, error } = await supabase
    .from("articles")
    .select("title, excerpt, body, image_url, affiliate_url, published_at")
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    return null;
  }

  return data as Article | null;
}
