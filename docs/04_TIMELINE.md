# Cronograma do Projeto — SoundBoard Pro — Painel de Efeitos Sonoros Interativo

## Resumo

| # | Fase | Duração |
|---|------|---------|
| 1 | Fase 1 — Setup e Estrutura Base | 4 dias |
| 2 | Fase 2 — Backend: API de Pads e Upload de Áudio | 5 dias |
| 3 | Fase 3 — Frontend: Interface do Soundboard | 7 dias |
| 4 | Fase 4 — Autenticação, Polimento e Deploy Final | 5 dias |
| | **Total** | **21 dias (3.0 semanas)** |

---

## Detalhamento das Fases

### Fase 1: Fase 1 — Setup e Estrutura Base (4 dias)

#### Tarefas

- [ ] Criar repositório monorepo com estrutura /frontend e /backend
- [ ] Configurar projeto Next.js 14 com TypeScript, Tailwind CSS e shadcn/ui
- [ ] Configurar projeto FastAPI com SQLAlchemy, Alembic e estrutura de pastas
- [ ] Configurar PostgreSQL no Railway e rodar primeira migration
- [ ] Configurar variáveis de ambiente (.env) para ambos os projetos
- [ ] Configurar Sentry no frontend e no backend
- [ ] Criar pipeline básico de CI/CD com GitHub Actions para deploy no Vercel e Railway

#### Entregáveis

- Repositório configurado e rodando localmente
- Backend com endpoint de health check respondendo em produção
- Frontend com página inicial em branco em produção no Vercel
- Banco de dados conectado com schema inicial criado

---

### Fase 2: Fase 2 — Backend: API de Pads e Upload de Áudio (5 dias)

#### Tarefas

- [ ] Criar model SoundPad no SQLAlchemy (id, title, color, audio_path, play_count, is_favorite, created_at)
- [ ] Criar endpoint POST /pads com upload de arquivo de áudio (multipart/form-data)
- [ ] Criar endpoint GET /pads para listar todos os pads do usuário/sessão
- [ ] Criar endpoint PATCH /pads/{id} para editar título e cor
- [ ] Criar endpoint DELETE /pads/{id} para remover um pad e seu arquivo de áudio
- [ ] Criar endpoint POST /pads/{id}/play para incrementar contador de reproduções
- [ ] Criar endpoint PATCH /pads/{id}/favorite para toggle de favorito
- [ ] Configurar servir arquivos estáticos de áudio via FastAPI ou Railway Volume
- [ ] Validar formatos de áudio aceitos (MP3, WAV, OGG, M4A) com Pydantic
- [ ] Testar todos os endpoints com pytest + httpx

#### Entregáveis

- REST API completa e documentada (Swagger auto-gerado pelo FastAPI)
- Upload e servir de arquivos de áudio funcionando em produção
- Suite de testes cobrindo os endpoints principais
- Migration do banco de dados aplicada em produção

---

### Fase 3: Fase 3 — Frontend: Interface do Soundboard (7 dias)

#### Tarefas

- [ ] Criar layout base com background vermelho vibrante e header fixo
- [ ] Implementar componente SoundPad (botão circular colorido, título, ícone favorito, contador)
- [ ] Implementar grid responsivo 3 colunas (desktop) / 2 colunas (mobile) com Tailwind
- [ ] Integrar Howler.js para pré-carregamento e reprodução de áudio com latência mínima
- [ ] Implementar animação de press no pad com Framer Motion (scale + brilho)
- [ ] Criar modal de adição de novo pad com: campo de título, color picker (React Colorful), upload de arquivo de áudio
- [ ] Criar FAB button (+) no canto inferior direito para abrir modal de adição
- [ ] Implementar modal de edição de pad (acesso via botão de opções no card)
- [ ] Implementar toggle de favorito com ícone de coração e reordenação visual
- [ ] Integrar React Query para fetch, cache e mutações dos pads via API
- [ ] Implementar feedback visual de carregamento e estados de erro
- [ ] Garantir acessibilidade básica (aria-labels nos botões de som)

#### Entregáveis

- Painel de soundboard completo e funcional com reprodução de áudio
- Modal de criação de novo pad com color picker e upload
- Grid responsivo funcionando em desktop e mobile
- Animações de feedback visual implementadas

---

### Fase 4: Fase 4 — Autenticação, Polimento e Deploy Final (5 dias)

#### Tarefas

- [ ] Implementar NextAuth.js v5 com provider Google OAuth
- [ ] Associar pads ao user_id no backend e filtrar por usuário autenticado
- [ ] Adicionar página de login simples com botão 'Entrar com Google'
- [ ] Implementar drag-and-drop para reordenar pads no painel (dnd-kit)
- [ ] Adicionar contador de reproduções visível no card do pad
- [ ] Testar upload de arquivos grandes e configurar limite de tamanho (ex: 5MB por arquivo)
- [ ] Otimizar imagens e assets para performance no Vercel
- [ ] Testes manuais em Chrome, Firefox, Safari e mobile
- [ ] Configurar domínio personalizado no Vercel (se aplicável)
- [ ] Documentar README com instruções de setup e deploy

#### Entregáveis

- Sistema de autenticação funcionando com Google OAuth
- Painel personalizado por usuário (cada um vê só seus sons)
- Aplicação completa em produção, testada e estável
- README com documentação de setup

---

## Premissas

- Desenvolvedor fullstack sênior trabalhando em tempo integral (8h/dia)
- Design já definido pela referência de imagem — sem necessidade de iterações longas de UX
- Autenticação com apenas um provider (Google) — sem login por email/senha
- Armazenamento de áudio em volume local do Railway, sem migração para S3 no MVP
- Limite de tamanho de arquivo de áudio definido em 5MB por pad
- Sem funcionalidade de categorias ou tags de sons no MVP
- Sem sistema de compartilhamento de soundboards entre usuários no MVP
