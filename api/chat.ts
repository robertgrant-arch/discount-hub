import type { VercelRequest, VercelResponse } from "@vercel/node";

const SYSTEM_PROMPT = `You are a helpful benefits advisor specializing in Medicare, disability programs, and retirement services for seniors and people with disabilities in the United States. Your role is to:

1. Help users understand Medicare Parts A, B, C, and D, including enrollment periods, costs, and coverage
2. Explain Social Security Disability Insurance (SSDI) and Supplemental Security Income (SSI)
3. Guide users through retirement planning resources including Social Security retirement benefits
4. Explain Medicaid eligibility and how it works alongside Medicare
5. Help users understand the Benefits Enrollment Period and Special Enrollment Periods
6. Provide information about prescription drug coverage and the Extra Help program
7. Explain Medigap (Medicare Supplement) insurance options
8. Guide users to appropriate government resources and websites

Always be empathetic, patient, and clear. Use simple language. When you are unsure, recommend the user contact their local State Health Insurance Assistance Program (SHIP) or call Medicare at 1-800-MEDICARE. Never provide specific medical or legal advice. Always clarify you are an AI assistant, not a licensed professional.`;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "ANTHROPIC_API_KEY not configured" });
  }

  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "messages array is required" });
    }

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20241022",
        max_tokens: 1024,
        system: SYSTEM_PROMPT,
        messages: messages.map((m: { role: string; content: string }) => ({
          role: m.role,
          content: m.content,
        })),
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({ error: errorText });
    }

    const data = await response.json();
    const reply = data.content?.[0]?.text || "I'm sorry, I couldn't generate a response.";
    return res.status(200).json({ reply });
  } catch (error: any) {
    return res.status(500).json({ error: error.message || "Internal server error" });
  }
}
