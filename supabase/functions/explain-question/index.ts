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

interface Alternativa {
  id: string;
  text: string;
}

interface ReqBody {
  enunciado: string;
  alternativas: Alternativa[];
  respostaCorreta: string;
  respostaUsuario: string;
  materia?: string;
  topico?: string;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: CORS });
  }

  try {
    const body = (await req.json()) as ReqBody;
    const { enunciado, alternativas, respostaCorreta, respostaUsuario, materia, topico } = body;

    const groqKey = Deno.env.get("GROQ_API_KEY");
    if (!groqKey) return ok({ erro: "GROQ_API_KEY não configurada." });

    const alternativasTxt = alternativas
      .map((a) => `${a.id.toUpperCase()}) ${a.text}`)
      .join("\n");

    const correta = alternativas.find((a) => a.id === respostaCorreta);
    const errada = alternativas.find((a) => a.id === respostaUsuario);

    const prompt = `Você é um professor explicando uma questão que o aluno errou no estudo para o ENEM/UERJ.

Matéria: ${materia ?? "—"} ${topico ? `· Tópico: ${topico}` : ""}

Enunciado:
${enunciado}

Alternativas:
${alternativasTxt}

Resposta correta: ${respostaCorreta.toUpperCase()}) ${correta?.text ?? ""}
Resposta do aluno: ${respostaUsuario.toUpperCase()}) ${errada?.text ?? ""}

Explique de forma clara e didática usando esta estrutura:

**Resolução passo a passo:**
(mostre como chegar à resposta correta, com cálculos/raciocínio detalhado)

**Por que sua resposta está errada:**
(aponte o erro específico cometido — confusão de conceito, cálculo errado, interpretação, etc.)

**Conceito-chave para lembrar:**
(uma frase curta resumindo o que o aluno deve memorizar)

Use linguagem acessível para ensino médio. Seja objetivo — máximo 220 palavras. Não use emojis.`;

    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${groqKey}`,
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        max_tokens: 700,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      return ok({ erro: `Groq (${res.status}): ${data?.error?.message ?? JSON.stringify(data)}` });
    }

    const explicacao = data.choices?.[0]?.message?.content ?? "";
    return ok({ explicacao });
  } catch (e) {
    return ok({ erro: `Erro interno: ${e?.message ?? String(e)}` });
  }
});
