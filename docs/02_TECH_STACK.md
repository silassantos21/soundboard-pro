# Stack Tecnológica — SoundBoard Pro — Painel de Efeitos Sonoros Interativo

| Camada | Tecnologia Principal | Complementos |
|--------|---------------------|-------------|
| Frontend | `Next.js 14 + TypeScript` | `Tailwind CSS`, `shadcn/ui`, `Framer Motion`, `Howler.js` |
| Backend | `FastAPI (Python 3.12)` | `SQLAlchemy`, `Pydantic v2`, `python-multipart`, `aiofiles` |
| Banco de Dados | `PostgreSQL 16` | `SQLAlchemy ORM`, `Alembic (migrations)` |
| Autenticação | `NextAuth.js v5` | `JWT`, `OAuth2 Google` |
| Cache | `React Query (TanStack Query)` | `LocalStorage para favoritos offline` |
| Infraestrutura | `Vercel (frontend) + Railway (backend + PostgreSQL)` | `GitHub Actions CI/CD`, `Docker`, `Railway Volume para arquivos de áudio` |
| Monitoramento | `Sentry` | `Vercel Analytics`, `Vercel Speed Insights` |

---

## Frontend

**Tecnologia Principal:** `Next.js 14 + TypeScript`

**Complementos:**
- `Tailwind CSS`
- `shadcn/ui`
- `Framer Motion`
- `Howler.js`
- `React Colorful`

**Justificativa:** Next.js oferece roteamento simples, SSR quando necessário e excelente DX. Tailwind + shadcn/ui aceleram a construção dos componentes de UI. Framer Motion gerencia as animações dos pads com precisão. Howler.js é a biblioteca de áudio mais robusta para web, com suporte a pré-carregamento, múltiplos formatos e fallbacks automáticos. React Colorful é leve e eficiente para o seletor de cores dos botões.

## Backend

**Tecnologia Principal:** `FastAPI (Python 3.12)`

**Complementos:**
- `SQLAlchemy`
- `Pydantic v2`
- `python-multipart`
- `aiofiles`

**Justificativa:** FastAPI oferece endpoints REST assíncronos de alta performance ideais para upload de arquivos de áudio e operações CRUD dos botões. O suporte nativo a multipart/form-data simplifica o upload de áudio. Pydantic v2 garante validação robusta dos dados de entrada.

## Banco de Dados

**Tecnologia Principal:** `PostgreSQL 16`

**Complementos:**
- `SQLAlchemy ORM`
- `Alembic (migrations)`

**Justificativa:** PostgreSQL é robusto para armazenar metadados dos botões (nome, cor, path do arquivo, contador de plays, favorito). Alembic garante migrações controladas. Para um projeto deste porte o SQLite seria viável, mas PostgreSQL permite escalar sem reescrever nada.

## Autenticação & Autorização

**Tecnologia Principal:** `NextAuth.js v5`

**Complementos:**
- `JWT`
- `OAuth2 Google`

**Justificativa:** Autenticação simples via Google OAuth permite que cada usuário tenha seu próprio painel de sons personalizado sem precisar criar senha. O JWT mantém a sessão sem estado no servidor. Caso o projeto seja single-user (uso pessoal), auth pode ser omitida no MVP.

## Cache & Sessão

**Tecnologia Principal:** `React Query (TanStack Query)`

**Complementos:**
- `LocalStorage para favoritos offline`

**Justificativa:** React Query gerencia cache das requisições de listagem de sons, evitando re-fetches desnecessários. Como os sons são carregados uma vez e ficam em memória via Howler.js, o cache de rede é suficiente sem necessidade de Redis para este volume.

## Infraestrutura & Deploy

**Tecnologia Principal:** `Vercel (frontend) + Railway (backend + PostgreSQL)`

**Complementos:**
- `GitHub Actions CI/CD`
- `Docker`
- `Railway Volume para arquivos de áudio`

**Justificativa:** Vercel é ideal para o frontend Next.js com deploy automático. Railway hospeda o FastAPI e o PostgreSQL no mesmo ambiente, simplificando a infraestrutura. O volume persistente do Railway armazena os arquivos de áudio enviados pelos usuários. Para escala maior, migrar para S3 + CloudFront.

## Monitoramento & Observabilidade

**Tecnologia Principal:** `Sentry`

**Complementos:**
- `Vercel Analytics`
- `Vercel Speed Insights`

**Justificativa:** Sentry captura erros de reprodução de áudio (falhas de decode, formatos inválidos) e erros de upload no backend. Vercel Analytics monitora o tráfego e uso real do painel.

## Comandos de Setup Rápido

```bash
# Frontend
npx create-next-app@latest frontend --typescript --tailwind --app
npx shadcn@latest init
npm install @tanstack/react-query zustand zod react-hook-form

# Backend
pip install fastapi uvicorn sqlalchemy pydantic alembic python-jose passlib
```
