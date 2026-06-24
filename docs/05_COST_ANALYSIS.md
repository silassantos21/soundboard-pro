# Análise de Custo-Benefício — SoundBoard Pro — Painel de Efeitos Sonoros Interativo

## Resumo Financeiro

| Categoria | Mensal (USD) | Mensal (BRL) |
|-----------|-------------|-------------|
| Infraestrutura | $11.00 | R$ 62.70 |
| APIs Externas | $0.50 | R$ 2.85 |
| **Total Mensal** | **$11.50** | **R$ 65.55** |
| **Setup Inicial** | **$3215.00** | **R$ 18325.50** |

✅ **Este projeto pode começar com free tier** das ferramentas listadas.

---

## Infraestrutura & Hosting

| Serviço/Item | Mensal (USD) | Setup (USD) | Free Tier | Observações |
|--------------|-------------|------------|-----------|-------------|
| Vercel (Frontend Next.js) | $0.00 | $0.00 | ✅ Sim | Plano Hobby gratuito cobre até 100GB de bandwidth e deploy ilimitado para projetos pessoais. Para uso comercial ou time, Vercel Pro custa USD 20/mês por membro. |
| Railway (Backend FastAPI + PostgreSQL + Volume) | $10.00 | $0.00 | ✅ Sim | Trial gratuito com USD 5 de crédito. Plano pago a partir de USD 5/mês para o serviço FastAPI e USD 5/mês para PostgreSQL. Volume persistente para arquivos de áudio incluído. Para baixo uso mensal o custo pode ficar em USD 10-15. |
| Domínio personalizado (ex: soundboardpro.com.br) | $1.00 | $15.00 | ❌ Não | Registro de domínio .com.br custa aproximadamente BRL 40/ano (~USD 7/ano) no Registro.br. Domínio .com custa entre USD 10-15/ano em provedores como Namecheap ou Cloudflare Registrar. |
| Sentry (Monitoramento de Erros) | $0.00 | $0.00 | ✅ Sim | Plano gratuito do Sentry inclui 5.000 erros/mês e 10.000 eventos de performance. Suficiente para estágio inicial. Plano Team custa USD 26/mês se necessário. |

## APIs & Serviços Externos

| Serviço/Item | Mensal (USD) | Setup (USD) | Free Tier | Observações |
|--------------|-------------|------------|-----------|-------------|
| Google OAuth (NextAuth.js) | $0.00 | $0.00 | ✅ Sim | Google OAuth é completamente gratuito via Google Cloud Console. Necessário criar um projeto no GCP e configurar as credenciais OAuth 2.0, sem custo. |
| Armazenamento de Arquivos de Áudio (Railway Volume) | $0.50 | $0.00 | ✅ Sim | Railway cobra USD 0.25/GB por mês para volumes persistentes. Para um soundboard pessoal com ~100 sons de até 5MB cada, o volume total seria ~500MB = USD 0.125/mês. Estimado em USD 0.50/mês com margem. Para escala maior, migrar para AWS S3 (~USD 0.023/GB/mês). |

## Ferramentas de Desenvolvimento

| Serviço/Item | Mensal (USD) | Setup (USD) | Free Tier | Observações |
|--------------|-------------|------------|-----------|-------------|
| Horas de Desenvolvimento (Estimativa Freelancer Sênior) | $0.00 | $3200.00 | ❌ Não | Estimativa de 80 horas de desenvolvimento a USD 40/hora para fullstack sênior brasileiro. Inclui setup, backend, frontend, auth, testes e deploy. Valor pode variar de USD 1.600 (júnior) a USD 6.400 (sênior internacional). |

---

## Análise de ROI

O custo operacional mensal é extremamente baixo (USD 11,50/mês), tornando o projeto viável mesmo para uso pessoal. Se monetizado como SaaS com plano Pro (ex: mais sons, temas premium), 10 assinantes a BRL 15/mês já cobrem toda a infraestrutura. O investimento de desenvolvimento (USD 3.200) se paga com cerca de 215 assinantes pagantes, alcançável em 3-6 meses com audiência de streamer médio. Para uso pessoal, o ROI é imediato pela utilidade diária durante lives.

---

## Notas sobre Escalabilidade de Custos

- Preços baseados em uso inicial (MVP/early stage)
- Custos aumentam com volume de usuários e dados
- Reavalie a stack se atingir 10k+ usuários ativos
- Considere contratos anuais para economias de 20-40%
