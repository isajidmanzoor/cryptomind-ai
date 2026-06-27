import { createClient } from "@supabase/supabase-js";
import type { GeneratedArticle, IntegrationStatus } from "@/services/pipeline/types";

export async function publishArticle(
  article: GeneratedArticle
): Promise<IntegrationStatus> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    return {
      name: "Supabase article publish",
      configured: false,
      ok: true,
      message: "Skipped: add NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.",
    };
  }

  try {
    const supabase = createClient(url, serviceKey);
    const { error } = await supabase.from("articles").upsert(
      {
        slug: article.slug,
        title: article.title,
        excerpt: article.excerpt,
        body: article.body,
        image_url: article.imageUrl,
        affiliate_url: article.affiliateUrl,
        published_at: new Date().toISOString(),
      },
      { onConflict: "slug" }
    );

    if (error) {
      throw error;
    }

    return {
      name: "Supabase article publish",
      configured: true,
      ok: true,
      message: "Article published to Supabase.",
    };
  } catch (error) {
    return {
      name: "Supabase article publish",
      configured: true,
      ok: false,
      message: error instanceof Error ? error.message : "Supabase publish failed.",
    };
  }
}
