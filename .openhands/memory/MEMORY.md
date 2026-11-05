# Memória do projeto — Site do Tempero de Mãe

Índice de fatos duráveis. O detalhe longo fica nos logs diários (`YYYY-MM-DD.md`).
As notas de um projeto anterior que veio neste workspace estão em
`notas-projeto-anterior-vetheryon.md`.

## Repositório

- **Site do Tempero de Mãe** — website comercial (React 19 + TypeScript + Vite 7
  + Tailwind 4) do restaurante/marmitaria **Tempero de Mãe**, Rua Criseida 311A,
  Jardim Cris, São Paulo. Repo `Souzzaaxzy/Site` (público, branch `main`).
- Publicado no GitHub Pages: <https://souzzaaxzy.github.io/Site/> via
  `.github/workflows/pages.yml`.
- **`base: './'` + `src/lib/asset.ts` são obrigatórios**: o site roda sob o
  subcaminho `/Site/`, então qualquer caminho absoluto (`/img/…`, ícones do
  manifest) dá 404 no Pages. Usar o helper `asset()`.
- Todas as informações comerciais ficam em `src/data/business.ts`; nenhum
  componente contém dado comercial solto.

## Estado dos dados comerciais (nada inventado)

- **Confirmado**: nome, endereço (Maps), segmento, "+7 anos", slogan
  "A culinária da Memória e do Afeto", Instagram `@temperodmae`, Linktree.
- **Não confirmado, publicado só como aviso no rodapé**: preços de nov/2023
  (marmita 20, panquecas 35, xis 25), WhatsApp, horário, canal de pedidos.
- **Ambiguidade que não pode ser ignorada**: o Linktree aponta para
  `temperodemae.grandchef.com.br`, que se diz "Restaurante e **Pizzaria**" — o
  Maps não menciona pizzaria. O cardápio do Toop cita entregas em **Santa Rosa
  (RS)**, mas o Maps é São Paulo/SP. Confirmar antes de tratar como oficial.
- **Fotos reais dos 4 pratos** e o **logo** vieram de
  `files.nextgocard.com.br/` (plataforma do cardápio Toop). O logo tem fundo
  transparente e é a fonte da paleta.

## Identidade visual

Direção "Mesa de Casa": papel creme `oklch(96.5% 0.01 82)`, tinta café, terracota
`oklch(53.4% 0.148 34.7)` como ação, oliva em detalhe. **Fraunces** (serifada
variável) para títulos e **Instrument Sans** para texto, ambas self-hosted em
`public/fonts/`. Sem gradiente, sem glassmorphism, sem cards empilhados — o
cardápio é um menu impresso com líderes de preço pontilhados.

## Skills de frontend

Seis skills em `.agents/skills/` (não versionadas; ver `docs/skills.md` para
reinstalar): `frontend-design`, `hallmark`, `taste-skill`, `impeccable`,
`frontend-ui-engineering`, `web-design-guidelines`.

- **`hallmark` é o cavalo de batalha**: `sloplint.mjs` roda gates mecânicos de
  direção de arte e tem camada de render em navegador real (`--render --url`).
  A meta é `0 FAIL, 0 WARN`. Ele também fornece uma biblioteca de fotos do
  Wikimedia Commons já com licença e crédito (`theme.mjs photos … --save <dir>`).
- **Chromium no contêiner exige `--no-sandbox`**: criar wrapper em
  `/tmp/chromium-nosandbox` e exportar `CHROME_PATH`; nunca editar os scripts
  das skills.
- `taste-skill` é para páginas de 3 telas; num site de 8 seções várias regras
  dele (`one-section`, `section-height`, `no-visual`) apontam diferença de
  escopo, não defeito. Rodar com `--quick --no-slow --no-tiles`.
- **Nesta sessão não consigo ler screenshots.** Para inspeção visual, usar
  medições de geometria no DOM via puppeteer, contraste computado com
  normalização por canvas, e ASCII-art via PIL.

## Verificação (rodar antes de considerar pronto)

```bash
npx tsc -b --noEmit && npx vite build
npx vite preview --port 4173 &
CHROME_PATH=/tmp/chromium-nosandbox node .agents/skills/hallmark/scripts/sloplint.mjs \
  src index.html --genre editorial --scope page --render --url http://127.0.0.1:4173/
```

Checar também: contraste WCAG AA, ausência de rolagem horizontal de 320 a
1920px, zero requisições 404, e o menu mobile abrindo.

## Logs

- `2026-11-05.md` — instalação das 6 skills, pesquisa do estabelecimento
  (incluindo a ambiguidade GrandChef/Toop), direção de arte, build do site,
  publicação no Pages e as armadilhas de subcaminho.
