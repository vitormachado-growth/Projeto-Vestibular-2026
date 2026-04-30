# <span>V</span>es<span>T</span>ibular 2026

Uma plataforma premium de estudos projetada para transformar a preparação de estudantes para o ENEM e UERJ no Rio de Janeiro. O **VesTibular** combina tecnologia, design moderno e inteligência de dados para oferecer uma jornada de estudo personalizada e eficiente.

## 🚀 Funcionalidades

A plataforma oferece um ecossistema completo para o vestibulando:

### 1. Landing Page Premium
Apresentação profissional do site com uma estética moderna, destacando a proposta de valor e facilitando o início da jornada do estudante.

### 2. Personalização de Foco (Onboarding)
- **ENEM, UERJ ou Ambos**: O sistema adapta todo o conteúdo e cronograma baseado na meta do aluno.
- **Seleção de Carreira**: Para alunos focados na UERJ, permite priorizar disciplinas específicas baseadas nos pesos do curso escolhido.

### 3. Cronograma Inteligente
- Gerador de cronograma automático que distribui horas de estudo baseado nas dificuldades do aluno.
- Integração de blocos de teoria, questões, revisões e simulados.

### 4. Banco de Questões e Matérias
- **Organização por Tópicos**: Matérias divididas ponto a ponto seguindo os editais de 2026.
- **Prática Direta**: Filtros de questões por disciplina e tema para reforço imediato.

### 5. Simulados e Ranking
- **Simulados Semanais**: Provas cronometradas para testar o conhecimento em condições de exame.
- **Ranking da Comunidade**: Compare seu desempenho semanal com outros estudantes e ganhe medalhas (🥇 🥈 🥉).

### 6. Oficina de Redação
Espaço dedicado para treinar a redação com temas atuais e estrutura completa para alcançar a nota máxima.

### 7. Dashboard de Desempenho
Acompanhamento detalhado da evolução através de:
- Estatísticas de acertos por matéria.
- Cobertura de tópicos do edital.
- Histórico de simulados e pontuações.

### 8. Experiência de Usuário Premium
- **Dark Mode**: Interface otimizada para longas sessões de estudo noturno.
- **Notificações**: Alertas de avisos, incentivos e lembretes de estudo diretamente no app e navegador.
- **Sidebar Retrátil**: Menu lateral intuitivo para navegação rápida entre as áreas do conhecimento.

---

## 🛠️ Tecnologias Utilizadas

- **React 19**: Biblioteca principal para construção da interface.
- **Vite**: Build tool ultrarrápido para desenvolvimento.
- **Vanilla CSS**: Estilização personalizada de alta performance, sem dependências de frameworks pesados.
- **Lucide Icons / Emoji Branding**: Identidade visual rica e moderna.

---

## ⚡ Como rodar o projeto

1. Instale as dependências:
   ```bash
   npm install
   ```

2. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

3. Acesse no navegador em `http://localhost:5173`

---

## 🤖 Skills do Claude Code utilizadas

Este projeto foi desenvolvido com auxílio do Claude Code, utilizando as seguintes skills:

- **update-config**: Configuração do harness do Claude Code via `settings.json` (permissões, hooks, variáveis de ambiente).
- **keybindings-help**: Customização de atalhos de teclado em `~/.claude/keybindings.json`.
- **simplify**: Revisão de código alterado para reuso, qualidade e eficiência, com correção de problemas encontrados.
- **fewer-permission-prompts**: Análise de transcripts para gerar allowlist de comandos read-only e reduzir prompts de permissão.
- **loop**: Execução de prompts ou slash commands em intervalos recorrentes (ex: polling de status).
- **schedule**: Criação e gerenciamento de agentes remotos agendados (routines em cron).
- **claude-api**: Construção, debug e otimização de apps usando a API do Claude / Anthropic SDK, com prompt caching.
- **init**: Inicialização do arquivo `CLAUDE.md` com documentação do codebase.
- **review**: Revisão de pull requests.
- **security-review**: Revisão de segurança das mudanças pendentes na branch atual.

---

**<span>V</span>es<span>T</span>ibular** — Sua jornada rumo à universidade começa aqui.
