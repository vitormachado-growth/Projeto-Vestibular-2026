import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const ok = (body: unknown) =>
  new Response(JSON.stringify(body), {
    status: 200,
    headers: { "Content-Type": "application/json", ...CORS },
  });

async function buscarExplicacao(materia: string, topico: string, groqKey: string): Promise<string> {
  const prompt = `Você é um professor preparando alunos para o ENEM e UERJ 2026. Explique o tópico "${topico}" da matéria de ${materia} de forma clara e didática.

Estruture a explicação assim:
**O que é:** (1-2 frases diretas)
**Conceitos-chave:** (liste os 3-5 pontos mais importantes, com exemplos curtos)
**Como cai no ENEM/UERJ:** (dica prática de como o tema costuma aparecer nas provas)
**Fórmula ou regra de ouro:** (se aplicável — caso contrário, omita esta seção)

Use linguagem acessível para ensino médio. Seja objetivo — máximo 250 palavras. Não use emojis.`;

  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${groqKey}`,
    },
    body: JSON.stringify({
      model: "llama-3.1-8b-instant",
      max_tokens: 600,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(`Groq (${res.status}): ${data?.error?.message ?? JSON.stringify(data)}`);
  return data.choices?.[0]?.message?.content ?? "";
}

async function buscarVideo(materia: string, topico: string, youtubeKey: string): Promise<string | null> {
  const q = encodeURIComponent(`${topico} ${materia} ENEM aula`);
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${q}&type=video&maxResults=1&relevanceLanguage=pt&key=${youtubeKey}`;

  const res = await fetch(url);
  const data = await res.json();
  if (!res.ok || !data.items?.length) return null;
  return data.items[0].id.videoId ?? null;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: CORS });
  }

  try {
    const { materia, topico } = await req.json();

    const groqKey = Deno.env.get("GROQ_API_KEY");
    const youtubeKey = Deno.env.get("YOUTUBE_API_KEY");

    if (!groqKey) return ok({ erro: "GROQ_API_KEY não configurada no Supabase." });

    const [explicacao, videoId] = await Promise.all([
      buscarExplicacao(materia, topico, groqKey),
      youtubeKey ? buscarVideo(materia, topico, youtubeKey) : Promise.resolve(null),
    ]);

    return ok({ explicacao, videoId });
  } catch (e) {
    return ok({ erro: `Erro interno: ${e?.message ?? String(e)}` });
  }
});
