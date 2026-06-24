# SoundBoard Pro — Painel de Efeitos Sonoros Interativo

## Contexto do Projeto

Aplicação web interativa de soundboard que permite ao usuário criar, personalizar e reproduzir botões de efeitos sonoros com cores, títulos e arquivos de áudio individuais. O painel é visual, intuitivo e responsivo, inspirado em apps de drum pad e meme soundboards. Usuários podem adicionar novos sons via interface FAB, favoritar os preferidos e reproduzir qualquer som com um único clique.

**Problema:** Criadores de conteúdo, streamers e humoristas precisam de uma ferramenta rápida, visual e personalizável para disparar efeitos sonoros durante transmissões ou gravações, sem precisar usar softwares complexos ou pagar por soluções proprietárias caras. As alternativas existentes são engessadas, sem customização visual e difíceis de usar ao vivo.

**Público-alvo:** Streamers, youtubers, podcasters, humoristas e criadores de conteúdo entre 15 e 35 anos que precisam de um painel de sons personalizado para uso em tempo real durante transmissões ao vivo ou gravações. Também adequado para uso casual por gamers e entusiastas de memes.

## Stack Tecnológica

- **Frontend:** Next.js 14 + TypeScript
- **Backend:** FastAPI (Python 3.12)
- **Banco de Dados:** PostgreSQL 16
- **Infraestrutura:** Vercel (frontend) + Railway (backend + PostgreSQL)

Detalhes completos em [docs/02_TECH_STACK.md](docs/02_TECH_STACK.md).

## Estrutura do Projeto

```
soundboard-pro/
├── docs/           # Planejamento e documentação
│   ├── 00_OVERVIEW.md
│   ├── 01_ARCHITECTURE.md
│   ├── 02_TECH_STACK.md
│   ├── 03_AI_AGENTS.md
│   ├── 04_TIMELINE.md
│   └── 05_COST_ANALYSIS.md
├── src/            # Código-fonte (a criar)
└── CLAUDE.md       # Este arquivo
```

## Funcionalidades Principais

- Painel em grade com botões coloridos clicáveis que reproduzem sons instantaneamente
- Adição de novos botões via modal (nome/título, cor personalizada, upload de arquivo de áudio)
- Sistema de favoritos para fixar sons preferidos no topo do painel
- Edição e remoção de botões existentes via long press ou menu de contexto
- Contador de reproduções por botão
- Persistência dos dados no banco de dados (sons salvos por usuário ou sessão)

## Agentes de IA Disponíveis

_Nenhum item._

Prompts completos em [docs/03_AI_AGENTS.md](docs/03_AI_AGENTS.md).

## Estimativa

- **Total:** 21 dias (3.0 semanas)
- **Custo Mensal:** USD 11.50 / BRL 65.55

## Arquitetura

O frontend Next.js roda no Vercel e é responsável por toda a interface do soundboard, gerenciando o estado dos pads com React Query e reproduzindo áudio via Howler.js diretamente no browser sem passar pelo servidor. O backend FastAPI no Railway expõe uma REST API para operações CRUD dos botões (criar, listar, editar, deletar, favoritar) e recebe uploads de arquivos de áudio via multipart/form-data, salvando-os em um volume persistente. O PostgreSQL armazena os metadados de cada pad: título, cor HEX, path do arquivo de áudio, contador de plays e status de favorito. Quando o usuário acessa o painel, o frontend busca a lista de pads via API, pré-carrega todos os arquivos de áudio com Howler.js e renderiza a grade de botões coloridos. Ao clicar em um pad, o som é reproduzido instantaneamente via Web Audio API e uma requisição assíncrona incrementa o contador no banco sem bloquear a UI.
