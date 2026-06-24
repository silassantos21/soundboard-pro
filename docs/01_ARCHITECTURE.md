# Arquitetura do Sistema — SoundBoard Pro — Painel de Efeitos Sonoros Interativo

## Visão Geral

O frontend Next.js roda no Vercel e é responsável por toda a interface do soundboard, gerenciando o estado dos pads com React Query e reproduzindo áudio via Howler.js diretamente no browser sem passar pelo servidor. O backend FastAPI no Railway expõe uma REST API para operações CRUD dos botões (criar, listar, editar, deletar, favoritar) e recebe uploads de arquivos de áudio via multipart/form-data, salvando-os em um volume persistente. O PostgreSQL armazena os metadados de cada pad: título, cor HEX, path do arquivo de áudio, contador de plays e status de favorito. Quando o usuário acessa o painel, o frontend busca a lista de pads via API, pré-carrega todos os arquivos de áudio com Howler.js e renderiza a grade de botões coloridos. Ao clicar em um pad, o som é reproduzido instantaneamente via Web Audio API e uma requisição assíncrona incrementa o contador no banco sem bloquear a UI.

## Diagrama de Arquitetura

```
Usuário (Browser) → Next.js/Vercel: renderiza o painel, gerencia estado com React Query. Browser → Howler.js: pré-carrega arquivos de áudio do Railway Storage e reproduz localmente. Next.js → FastAPI/Railway: chamadas REST para CRUD de pads, upload de áudio, toggle favorito, incremento de contador. FastAPI → PostgreSQL/Railway: leitura e escrita de metadados dos pads (id, title, color, audio_path, play_count, is_favorite, user_id). FastAPI → Railway Volume: leitura/escrita dos arquivos de áudio enviados. GitHub → GitHub Actions → Vercel (deploy frontend) e Railway (deploy backend via Docker). Sentry está integrado tanto no frontend quanto no backend para captura de erros.
```

## Componentes Principais

| Camada | Tecnologia Principal | Complementos |
|--------|---------------------|-------------|
| Frontend | `Next.js 14 + TypeScript` | `Tailwind CSS`, `shadcn/ui`, `Framer Motion`, `Howler.js` |
| Backend | `FastAPI (Python 3.12)` | `SQLAlchemy`, `Pydantic v2`, `python-multipart`, `aiofiles` |
| Banco de Dados | `PostgreSQL 16` | `SQLAlchemy ORM`, `Alembic (migrations)` |
| Autenticação | `NextAuth.js v5` | `JWT`, `OAuth2 Google` |
| Cache | `React Query (TanStack Query)` | `LocalStorage para favoritos offline` |
| Infraestrutura | `Vercel (frontend) + Railway (backend + PostgreSQL)` | `GitHub Actions CI/CD`, `Docker`, `Railway Volume para arquivos de áudio` |
| Monitoramento | `Sentry` | `Vercel Analytics`, `Vercel Speed Insights` |

## Decisões Arquiteturais

As decisões foram baseadas no briefing do projeto e nas referências fornecidas.
Consulte [02_TECH_STACK.md](02_TECH_STACK.md) para justificativas detalhadas de cada escolha.

## Padrões de Projeto Recomendados

- **Frontend:** Component-driven development com Server Components (Next.js App Router)
- **Backend:** Clean Architecture (Domain → Application → Infrastructure)
- **API:** REST com versionamento (`/api/v1/`) ou tRPC para type-safety full-stack
- **Estado:** Zustand (client state) + React Query / TanStack Query (server state)
- **Testes:** Vitest (unit) + Playwright (E2E)
