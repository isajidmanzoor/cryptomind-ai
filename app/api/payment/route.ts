export async function POST(req: Request) {
  const body = await req.json();

  // user sends screenshot / transaction id
  const { userId, method, transactionId } = body;

  // SAVE TO DATABASE (later supabase)
  console.log("Payment Request:", {
    userId,
    method,
    transactionId,
    status: "pending",
  });

  return Response.json({
    message: "Payment received. Waiting for approval.",
  });
}
