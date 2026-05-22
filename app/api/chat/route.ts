import { NextResponse } from "next/server";

export const runtime = "nodejs";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export async function POST(req: Request) {
  const webhookUrl = process.env.N8N_WEBHOOK_URL;

  if (!webhookUrl) {
    return NextResponse.json(
      { error: "N8N_WEBHOOK_URL manquante. Ajoutez-la dans .env.local." },
      { status: 500 }
    );
  }

  const { messages } = (await req.json()) as { messages: ChatMessage[] };

  if (!Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json({ error: "Messages invalides" }, { status: 400 });
  }

  const trimmedMessages = messages.slice(-20);

  const n8nRes = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      messages: trimmedMessages,
      lastMessage: trimmedMessages.at(-1)?.content ?? "",
    }),
  });

  if (!n8nRes.ok) {
    const text = await n8nRes.text();
    return NextResponse.json(
      { error: `Erreur webhook n8n (${n8nRes.status}): ${text}` },
      { status: 502 }
    );
  }

  const text = await n8nRes.text();

  if (!text?.trim()) {
    return NextResponse.json(
      { error: "Le webhook n8n a répondu vide. Vérifiez que le workflow est activé (Publish) et que le nœud 'Respond to Webhook' est bien connecté." },
      { status: 502 }
    );
  }

  let data: unknown;
  try {
    data = JSON.parse(text);
  } catch {
    return NextResponse.json(
      { error: `Réponse n8n non-JSON: ${text.slice(0, 200)}` },
      { status: 502 }
    );
  }

  // n8n peut renvoyer { reply: "..." } ou { output: "..." } ou un tableau [{ output: "..." }]
  const d = data as Record<string, unknown> & { 0?: Record<string, unknown> };
  const reply =
    (d?.reply as string) ??
    (d?.output as string) ??
    (d?.[0]?.output as string) ??
    (d?.[0]?.reply as string) ??
    "Désolé, aucune réponse reçue.";

  return NextResponse.json({ reply });
}
