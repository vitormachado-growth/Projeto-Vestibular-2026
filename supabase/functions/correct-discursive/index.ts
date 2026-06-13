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

type ReqBody =
  | {
      mode: "questao";
      disciplina: string;
      enunciado: string;
      padraoResposta: string;
      respostaAluno: string;
    }
  | {
      mode: "redacao";
      tema: string;
      comando: string | null;
      padraoResposta: string | null;
      respostaAluno: string;
    };

// Extrai o primeiro JSON válido da resposta do LLM (que às vezes vem com texto antes/depois).
const extrairJson = (texto: string): unknown | null => {
  const match = texto.match(/\{[\s\S]*\}/);
  if (!match) return null;
  try {
    return JSON.parse(match[0]);
  } catch {
    return null;
  }
};

const promptQuestao = (b: Extract<ReqBody, { mode: "questao" }>) => `Você é um corretor da banca da UERJ avaliando uma questão discursiva de ${b.disciplina}.

Enunciado da questão:
${b.enunciado}

Padrão de resposta da banca (expectativas):
${b.padraoResposta}

Resposta do aluno:
${b.respostaAluno || "(em branco)"}

Compare a resposta do aluno com o padrão. Retorne APENAS um JSON válido, sem texto antes ou depois, com a estrutura:
{
  "nota": <número inteiro de 0 a 10>,
  "feedback": "<2 a 3 frases explicando a nota>",
  "pontos_positivos": ["<o que o aluno acertou>", ...],
  "pontos_faltantes": ["<o que faltou ou está incorreto>", ...]
}

Escala:
- 10: completa, todos os pontos do padrão presentes, sem erros conceituais
- 7 a 9: maior parte presente, lacuna pequena
- 4 a 6: ideia principal presente mas com lacunas relevantes ou erros parciais
- 1 a 3: resposta parcial, muitos pontos faltando
- 0: em branco, totalmente incorreta ou fora do tema

Seja rigoroso mas justo. Dê pontuação consistente com o padrão. Português brasileiro.`;

const promptRedacao = (b: Extract<ReqBody, { mode: "redacao" }>) => `Você é um corretor de redação da banca da UERJ, avaliando uma produção textual dissertativo-argumentativa.

Tema: ${b.tema}
${b.comando ? `Comando da banca: ${b.comando}` : ""}
${b.padraoResposta ? `Expectativas da banca: ${b.padraoResposta}` : ""}

Texto do aluno:
${b.respostaAluno || "(em branco)"}

Avalie a redação. Retorne APENAS um JSON válido, sem texto antes ou depois, com a estrutura:
{
  "nota": <número inteiro de 0 a 10>,
  "feedback": "<3 a 4 frases analisando a redação>",
  "criterios": {
    "aderencia_tema": <0 a 2>,
    "argumentacao": <0 a 3>,
    "coesao_clareza": <0 a 2>,
    "norma_culta": <0 a 2>,
    "proposta_intervencao": <0 a 1>
  }
}

A soma dos critérios deve bater com a "nota" final. Português brasileiro. Avalie com critério de banca real.`;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: CORS });

  try {
    const body = (await req.json()) as ReqBody;

    const groqKey = Deno.env.get("GROQ_API_KEY");
    if (!groqKey) return ok({ erro: "GROQ_API_KEY não configurada." });

    const prompt =
      body.mode === "questao" ? promptQuestao(body) : promptRedacao(body);

    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${groqKey}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        max_tokens: 900,
        temperature: 0.2,
        response_format: { type: "json_object" },
        messages: [{ role: "user", content: prompt }],
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

    return ok({ correcao: parsed });
  } catch (e) {
    return ok({ erro: `Erro interno: ${e?.message ?? String(e)}` });
  }
});
