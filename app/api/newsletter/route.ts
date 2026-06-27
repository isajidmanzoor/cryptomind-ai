import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as {
    email?: string;
    language?: string;
  };
  const email = body.email?.trim().toLowerCase();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json(
      { success: false, error: "Valid email is required." },
      { status: 400 }
    );
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    return Response.json(
      {
        success: false,
        error: "Newsletter backend is not configured.",
      },
      { status: 503 }
    );
  }

  const supabase = createClient(url, serviceKey);
  const { error } = await supabase.from("newsletter_subscribers").upsert(
    {
      email,
      language: body.language || "en",
      source: "cryptomind-ai",
      subscribed_at: new Date().toISOString(),
    },
    { onConflict: "email" }
  );

  if (error) {
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }

  return Response.json({
    success: true,
    message: "Subscribed.",
  });
}
