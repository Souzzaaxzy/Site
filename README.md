# Tempero de Mãe

Website comercial do **Tempero de Mãe**, restaurante, marmitaria e delivery no
Jardim Cris, São Paulo (Rua Criseida, 311A).

## Como executar

```bash
npm install
npm run dev        # servidor de desenvolvimento
npm run build      # typecheck + build de produção em dist/
npm run preview    # serve o build em http://localhost:4173
npm run typecheck  # apenas o TypeScript
```

O site é uma página única em React. Todas as informações comerciais ficam em
`src/data/business.ts`; nenhum componente contém dado comercial solto.

## Onde mexer

| Quero mudar | Arquivo |
| --- | --- |
| Telefone, WhatsApp, horário, endereço, links de pedido | `src/data/business.ts` |
| Pratos, descrições e preços | `src/data/business.ts` (`dishes`) |
| Prato de cada dia da semana | `src/data/business.ts` (`dailyMenu`) |
| Diferenciais | `src/data/business.ts` (`differentials`) |
| Cores, tipografia, sombras | `src/styles/tokens.css` |
| Seções e ordem da página | `src/App.tsx` |
| Imagens | `public/img/` |

### Publicar o cardápio de um dia

Hoje cada dia de `dailyMenu` está com `dishes: null`, o que mostra o estado
"consultar no WhatsApp". Para publicar os pratos de um dia, troque `null` por
uma lista:

```ts
{ id: 'segunda', label: 'Segunda-feira', short: 'Seg', dishes: ['Feijoada', 'Frango grelhado'] }
```

A seção passa a listar os pratos automaticamente, sem alterar componente.

### Publicar o WhatsApp

```ts
whatsapp: { number: '5511999999999', confidence: 'confirmed', note: '' }
```

Assim que o número existe, todo botão de pedido do site passa a abrir a conversa
com a mensagem já escrita, e o botão "Consultar no WhatsApp" aparece no cardápio
do dia.

### Publicar o canal oficial de pedidos

```ts
grandchef: { url: '...', label: 'Faça seu Pedido', confidence: 'confirmed', note: '' }
```

Enquanto estiver `unconfirmed`, o site manda o visitante para o Linktree
oficial em vez de apresentar a loja como canal de pedidos.

## Identidade visual

Direção de arte "Mesa de Casa": papel creme, tinta café, terracota como ação e
verde oliva em detalhes. Tipografia Fraunces (títulos, serifada) com Instrument
Sans (texto). Nada de gradientes, glassmorphism ou cards empilhados.

As fontes são servidas pelo próprio domínio (`public/fonts/`), sem requisição a
terceiros na primeira pintura.

## Fotografias

As fotos dos quatro pratos são do próprio estabelecimento, obtidas nos canais
oficiais. As fotos de preparo são do Wikimedia Commons, sob licença Creative
Commons, creditadas no rodapé do site.

## Antes de publicar

O rodapé lista, na seção "Informações a confirmar", tudo que ainda depende do
proprietário. Revise essa lista e atualize `src/data/business.ts`.

## Verificação de qualidade

O projeto foi revisado com os linters das skills instaladas em `.agents/skills/`:

```bash
# Hallmark: gates de direção de arte, com render em navegador real
CHROME_PATH=/usr/bin/chromium node .agents/skills/hallmark/scripts/sloplint.mjs \
  src index.html --genre editorial --scope page --render --url http://127.0.0.1:4173/
```

Resultado atual: `0 FAIL, 0 WARN` na camada estática e na de render.
