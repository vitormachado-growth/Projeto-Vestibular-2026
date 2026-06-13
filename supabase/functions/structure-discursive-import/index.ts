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

interface ReqBody {
  rawText: string;
  ano?: number;
  titulo?: string;
}

const DISCIPLINAS_VALIDAS = [
  "biologia",
  "fisica",
  "geografia",
  "historia",
  "lingua_portuguesa",
  "lingua_estrangeira",
  "matematica",
  "quimica",
];

const extrairJson = (texto: string): unknown | null => {
  const match = texto.match(/\{[\s\S]*\}/);
  if (!match) return null;
  try {
    return JSON.parse(match[0]);
  } catch {
    return null;
  }
};

const buildPrompt = (body: ReqBody) => `Você é um assistente que estrutura conteúdo bruto de provas discursivas da UERJ (Exame Discursivo) em JSON.

O usuário colou abaixo o texto bruto extraído de cadernos PDF da UERJ. Pode conter:
- Cabeçalhos e numeração de página (ignore)
- Várias disciplinas misturadas (identifique cada uma)
- Itens a) b) c) dentro de uma mesma questão (preserve no enunciado)
- Padrões de resposta (gabaritos descritivos) — podem vir no mesmo bloco da questão ou numa seção separada
- Proposta de redação com tema + textos motivadores + comando

Identifique e estruture TUDO que reconhecer. Retorne APENAS um JSON válido com a estrutura:

{
  "ano": ${body.ano ?? "<int>"},
  "titulo": ${body.titulo ? JSON.stringify(body.titulo) : "\"UERJ <ano> — Exame Discursivo\""},
  "redacao": {
    "tema": "<tema da redação ou string vazia se não houver>",
    "textos_motivadores": "<textos motivadores>",
    "comando": "<comando da banca>",
    "padrao_resposta": "<expectativas da banca>"
  },
  "questoes": [
    {
      "disciplina": "<uma de: ${DISCIPLINAS_VALIDAS.join(", ")}>",
      "ordem": <int começando em 1 dentro de cada disciplina>,
      "enunciado": "<texto completo do enunciado, preservando itens a) b) c) com quebras de linha>",
      "padrao_resposta": "<padrão de resposta correspondente>"
    }
  ]
}

Regras:
- Se não houver redação no texto, omita o campo "redacao" ou deixe os campos vazios.
- Cada questão precisa de "enunciado" E "padrao_resposta". Se faltar o padrão, use "(padrão não fornecido)" como valor.
- "disciplina" deve ser EXATAMENTE uma das listadas, em minúsculas, sem acento.
- Preserve fórmulas, equações e símbolos como texto.
- Não invente conteúdo. Se algo está pouco legível ou truncado no texto bruto, copie como veio.
- Português brasileiro.

Texto bruto:
"""
${body.rawText}
"""`;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: CORS });

  try {
    const body = (await req.json()) as ReqBody;
    if (!body?.rawText || typeof body.rawText !== "string") {
      return ok({ erro: "Campo 'rawText' obrigatório." });
    }

    const groqKey = Deno.env.get("GROQ_API_KEY");
    if (!groqKey) return ok({ erro: "GROQ_API_KEY não configurada." });

    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${groqKey}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        max_tokens: 8000,
        temperature: 0.1,
        response_format: { type: "json_object" },
        messages: [{ role: "user", content: buildPrompt(body) }],
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      return ok({
        erro: `Groq (${res.status}): ${data?.error?.message ?? JSON.stringify(data)}`,
      });
    }

    const conteudo = data.choices?.[0]?.message?.content ?? "";
    const parsed = extrairJson(conteudo);
    if (!parsed) {
      return ok({ erro: "Resposta da IA não veio em JSON válido.", raw: conteudo });
    }

    return ok({ estrutura: parsed });
  } catch (e) {
    return ok({ erro: `Erro interno: ${(e as Error)?.message ?? String(e)}` });
  }
});
