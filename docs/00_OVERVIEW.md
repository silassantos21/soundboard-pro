# SoundBoard Pro — Painel de Efeitos Sonoros Interativo

> Aplicação web interativa de soundboard que permite ao usuário criar, personalizar e reproduzir botões de efeitos sonoros com cores, títulos e arquivos de áudio individuais. O painel é visual, intuitivo e responsivo, inspirado em apps de drum pad e meme soundboards. Usuários podem adicionar novos sons via interface FAB, favoritar os preferidos e reproduzir qualquer som com um único clique.

**Tipo de Projeto:** `fullstack_web`
**Gerado em:** 23/06/2026 21:17
**Estimativa Total:** 21 dias (3.0 semanas)
**Custo Mensal Estimado:** USD 11.50 / BRL 65.55

---

## Problema que Resolve

Criadores de conteúdo, streamers e humoristas precisam de uma ferramenta rápida, visual e personalizável para disparar efeitos sonoros durante transmissões ou gravações, sem precisar usar softwares complexos ou pagar por soluções proprietárias caras. As alternativas existentes são engessadas, sem customização visual e difíceis de usar ao vivo.

## Público-Alvo

Streamers, youtubers, podcasters, humoristas e criadores de conteúdo entre 15 e 35 anos que precisam de um painel de sons personalizado para uso em tempo real durante transmissões ao vivo ou gravações. Também adequado para uso casual por gamers e entusiastas de memes.

## Funcionalidades Principais

- Painel em grade com botões coloridos clicáveis que reproduzem sons instantaneamente
- Adição de novos botões via modal (nome/título, cor personalizada, upload de arquivo de áudio)
- Sistema de favoritos para fixar sons preferidos no topo do painel
- Edição e remoção de botões existentes via long press ou menu de contexto
- Contador de reproduções por botão
- Persistência dos dados no banco de dados (sons salvos por usuário ou sessão)
- Upload e armazenamento de arquivos de áudio (MP3, WAV, OGG)
- Layout responsivo em grid adaptável (3 colunas no desktop, 2 no mobile)
- Animação visual de feedback ao pressionar um botão (scale + brilho)

## Diferenciais

- Customização total de cor por botão com color picker nativo, sem paletas limitadas
- Interface extremamente simples: adicionar um som leva menos de 30 segundos
- Reprodução de áudio sem latência usando Web Audio API / Howler.js com pré-carregamento
- Funciona 100% no navegador, sem instalação de software ou plugins
- Design energético e colorido inspirado em drum pads profissionais

## Escopo do MVP (Mínimo Produto Viável)

- [ ] Grade de pads coloridos com reprodução de áudio via Howler.js ao clicar
- [ ] FAB button para abrir modal de criação de novo pad
- [ ] Modal de criação com: campo de título, color picker e upload de arquivo de áudio (MP3/WAV)
- [ ] Persistência dos pads no banco de dados PostgreSQL via API FastAPI
- [ ] Edição de título e cor de um pad existente
- [ ] Remoção de um pad com confirmação
- [ ] Toggle de favorito por pad com reordenação visual (favoritos no topo)
- [ ] Layout responsivo em grid 3 colunas (desktop) e 2 colunas (mobile)
- [ ] Animação de press feedback (scale + brilho) ao ativar um pad
- [ ] Autenticação simples via Google OAuth para separar pads por usuário

## Funcionalidades Futuras (v2+)

- Drag-and-drop para reordenar pads livremente na grade
- Categorias e tags para organizar sons por tipo (memes, efeitos, músicas)
- Biblioteca pública de sons compartilhados entre usuários
- Integração com OBS Studio via WebSocket para controle remoto do soundboard
- Temas visuais alternativos (dark, neon, minimalista)
- Importação em lote de sons via arquivo ZIP
- Controle de volume individual por pad com slider
- Visualizador de forma de onda (waveform) do áudio de cada pad
- Modo apresentação fullscreen para uso em stream
- App mobile (React Native) para controlar o soundboard pelo celular durante lives
- Exportação e importação de configuração completa do painel (JSON)
- Integração com Spotify ou YouTube para clicar e tocar trechos de músicas

## Riscos Identificados

- Risco técnico 1 — Latência na reprodução de áudio: O principal requisito não-funcional é reprodução instantânea. Mitigação: usar Howler.js com pré-carregamento de todos os sons ao carregar a página (sprite ou load antecipado), evitando decode on-demand que causa delay perceptível.
- Risco técnico 2 — Compatibilidade de formatos de áudio entre browsers: Safari não suporta MP3 em alguns contextos e tem restrições de autoplay. Mitigação: aceitar múltiplos formatos (MP3 + OGG), usar Howler.js que faz fallback automático, e disparar áudio sempre via evento de clique do usuário (nunca autoplay).
- Risco técnico 3 — Tamanho de arquivos e storage: Usuários podem tentar fazer upload de arquivos grandes. Mitigação: implementar limite de 5MB por arquivo no frontend e no backend (FastAPI middleware de tamanho), e avisar sobre compressão de áudio.
- Risco de infraestrutura — Volume persistente no Railway pode ser perdido em restarts: Mitigação no MVP é fazer backup manual. Na v2, migrar armazenamento de áudio para AWS S3 ou Cloudflare R2 que garantem durabilidade de 99,999999999%.
- Risco de negócio — Direitos autorais dos áudios enviados: Usuários podem fazer upload de músicas ou sons protegidos por copyright. Mitigação: adicionar nos Termos de Uso que o usuário é responsável pelos arquivos enviados, e implementar limite de armazenamento por conta para reduzir abuso.

## Resumo das Referências Analisadas

A imagem de referência apresenta um aplicativo mobile de soundboard com design energético em background vermelho vibrante (#CC0000), grade de pads em 3 colunas com cards de fundo escuro (#1A1A1A) e botões circulares em cores únicas por pad (laranja, amarelo, verde, azul, rosa). Cada card inclui botão circular clicável, ícone de favorito (coração), label com nome do som e contador de reproduções. O FAB button (+) vermelho no canto inferior direito abre o fluxo de adição de novos sons. O estilo visual é claramente voltado para um público jovem e energético (gamers, streamers, criadores de conteúdo). Para a versão web, mantivemos a identidade visual (cores saturadas, background vermelho, tipografia arredondada, animações rápidas de feedback) e adaptamos o layout para desktop com grid responsivo. O uso de Howler.js replicará a experiência de 'tap = som imediato' que é o coração da experiência mobile, sem a latência que tornaria o painel inútil em lives.
