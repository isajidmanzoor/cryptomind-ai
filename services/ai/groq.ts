import Groq from "groq-sdk";

const client = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
});

export async function getAIAnalysis(data: any) {
  const res = await client.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [
      {
        role: "system",
        content:
          "Return ONLY valid JSON in this format: {\"signal\":\"BUY|SELL|HOLD\",\"confidence\":80,\"reason\":\"...\"}"
      },
      {
        role: "user",
        content: JSON.stringify(data),
      },
    ],
  });

  return JSON.parse(res.choices[0].message.content || "{}");
}
