# Skills de frontend instaladas no ambiente

Este repositório é desenvolvido com seis Agent Skills de design e engenharia
frontend, instaladas em `.agents/skills/` pelo mecanismo oficial do OpenHands
(`add-skill`). O conteúdo das skills **não** é versionado aqui: são ferramentas
do ambiente, somam cerca de 46 MB e carregam licenças de terceiros.

## Como reinstalar

```bash
cd ~/.openhands/cache/skills/public-skills/skills/add-skill

python3 scripts/fetch_skill.py "https://github.com/anthropics/skills/tree/main/skills/frontend-design"           /workspace/project
python3 scripts/fetch_skill.py "https://github.com/nutlope/hallmark/tree/main/skills/hallmark"                  /workspace/project
python3 scripts/fetch_skill.py "https://github.com/leonxlnx/taste-skill/tree/main/skills/taste-skill"           /workspace/project
python3 scripts/fetch_skill.py "https://github.com/pbakaus/impeccable/tree/main/plugin/skills/impeccable"       /workspace/project
python3 scripts/fetch_skill.py "https://github.com/addyosmani/agent-skills/tree/main/skills/frontend-ui-engineering" /workspace/project
python3 scripts/fetch_skill.py "https://github.com/vercel-labs/agent-skills/tree/main/skills/web-design-guidelines"  /workspace/project
```

Cada skill vai para `.agents/skills/<nome>/` e precisa de um `SKILL.md` na raiz.

## As seis skills

| Skill | Origem | Papel no fluxo |
| --- | --- | --- |
| `frontend-design` | anthropics/skills | Direção de arte, tipografia, evitar estética genérica de IA |
| `hallmark` | nutlope/hallmark | Sistema de design, temas, gates mecânicos de qualidade |
| `taste-skill` | leonxlnx/taste-skill | Referências visuais, composição editorial, verificação em navegador |
| `impeccable` | pbakaus/impeccable | Crítica visual, polimento, hierarquia, legibilidade |
| `frontend-ui-engineering` | addyosmani/agent-skills | Componentização, responsividade, acessibilidade, estados |
| `web-design-guidelines` | vercel-labs/agent-skills | Auditoria contra as Web Interface Guidelines |

## Ordem de uso

1. **Direção de arte** com `frontend-design` e `hallmark`.
2. **Referências e composição** com `taste-skill`.
3. **Implementação** com `frontend-ui-engineering`.
4. **Refinamento** com `impeccable`.
5. **Auditoria** com `web-design-guidelines`.

Nenhuma skill é aplicada a tarefas simples onde sua especialidade não pesa.

## Requisitos de ambiente

Os linters das skills rodam em Node e precisam de um navegador Chromium para a
camada de render:

```bash
# Chromium e puppeteer-core já instalados no projeto (devDependency)
export CHROME_PATH=/usr/bin/chromium

# Em contêiner sem user namespaces, o Chromium precisa de --no-sandbox.
# Crie um wrapper em vez de editar os scripts das skills:
printf '#!/bin/sh\nexec /usr/bin/chromium --no-sandbox --disable-dev-shm-usage --disable-setuid-sandbox "$@"\n' \
  > /tmp/chromium-nosandbox && chmod +x /tmp/chromium-nosandbox
export CHROME_PATH=/tmp/chromium-nosandbox
```

`impeccable` é distribuído como plugin de vários harnesses; a instalação usada
aqui é a variante de Agent Skill (`plugin/skills/impeccable`), que funciona no
OpenHands. Ele também traz um launcher binário próprio
(`scripts/impeccable`) que baixa um motor na primeira execução; o trabalho deste
projeto não dependeu dele.

## Comandos de verificação usados

```bash
# Gates de direção de arte, com render em navegador real (1440, 1920, 375)
CHROME_PATH=/tmp/chromium-nosandbox node .agents/skills/hallmark/scripts/sloplint.mjs \
  src index.html --genre editorial --scope page --render --url http://127.0.0.1:4173/

# Checagem de sistema visual do taste-skill
CHROME_PATH=/tmp/chromium-nosandbox node .agents/skills/taste-skill/scripts/consistency.mjs \
  http://127.0.0.1:4173/ --page place --quick --no-slow --no-tiles --out /tmp/taste-out
```

### Nota sobre o `consistency.mjs` do taste-skill

Essa skill é desenhada para páginas de **três telas** ("one section per screen",
no máximo oito frames). O escopo deste projeto é um site institucional completo
com oito seções, pedido explicitamente pelo cliente, então as regras
`one-section`, `section-height`, `hero-screen` e `no-visual` do taste-skill
apontam uma diferença de escopo, não um defeito.

As regras dela que **são** universais foram aplicadas: contraste de texto,
tamanho de corpo, escala de títulos, número de estilos de botão, recorte de
imagens, orçamento de créditos, alinhamento de colunas, alvo de toque, corte na
dobra e animação de entrada.
