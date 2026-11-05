# Memória do projeto — Vetheryon

Índice de fatos duráveis. O detalhe longo fica nos logs diários (`YYYY-MM-DD.md`).

## Repositório
- **Vetheryon** — jogo 3D medieval de fantasia, **Godot 4.7.2** (GDScript,
  renderizador Mobile), alvo Android. Repo `Souzzaaxzy/Vetheryon`.
- Clone do workspace é **shallow** e **NÃO tem toolchain**. Para rodar/testar/
  exportar é preciso instalar (ver log `2026-11-05.md`): Godot 4.7.2, export
  templates, `openjdk-21-jdk-headless`, Android cmdline-tools 11076708 +
  platform-tools/android-35/build-tools 35.0.0, `xvfb`, `unzip`.
- `$HOME/.config/godot/editor_settings-4.7.tres` aponta SDK/JDK/keystore.
  **Não** exportar `XDG_*` para fora do HOME (Godot acha templates em
  `$HOME/.local/share/godot/export_templates`).

## Arquitetura do mundo (o coração do jogo)
- `src/world/vetheryon_world.gd` — mundo **infinito por chunks**, gerado em
  runtime com o addon `addons/lowland_forge` (MIT): `LFTerrainGenerator` +
  `LFChunkData` + `LFPropMeshes`. Chunk = `LFTileBaker.BLOCK` (128 m = 4x4
  sub-chunks de 32 m). 1 chunk montado por frame; o que passa de `KEEP_RADIUS`
  é liberado; ao voltar, **regenera igual** (mesma seed). Sem arquivos assados.
- **NÃO usar `WorkerThreadPool` por Task ID** (`is_task_completed` → "Invalid
  Task ID" em loop nesta versão). O padrão que funciona: `Mutex` + fila
  `_results`; a thread gera e faz lock/append/unlock; o thread principal drena.
- Tela inicial: `src/ui/start_screen.gd`. `CenterContainer` não centraliza
  `Panel` (size 0x0) → usar `PanelContainer`.
- Testes visuais: `xvfb-run ... godot --path <repo> --rendering-driver opengl3
  --script res://tools/<x>.gd` (`extends SceneTree`). `tools/test_inf.gd` valida
  o streaming (chunks perto/longe/volta).

## CI / entrega
- `.github/workflows/build-apk.yml` builda o APK debug e publica **release
  rolante** tag `latest`. Link fixo:
  `https://github.com/Souzzaaxzy/Vetheryon/releases/download/latest/vetheryon.apk`.
- APK hoje ~37 MB (era 78 MB com o mapa pré-assado de 34 MB).

## Push / credenciais (igual aos outros repos deste usuário)
- `git push origin main` **falha 403** (credencial velha no remote). Empurre
  explícito:
  `git push "https://${GITHUB_PERSONAL_ACCESS_TOKEN}@github.com/Souzzaaxzy/Vetheryon.git" main`.
- `$GITHUB_TOKEN` é token de App = **somente leitura**. Use
  `$GITHUB_PERSONAL_ACCESS_TOKEN` para escrever. O dono autoriza push na main.

## Recuperar trabalho de conversa morta (context length)
- `GET /api/v1/app-conversations?ids=<id>` (Bearer `$OPENHANDS_API_KEY`) →
  `conversation_url` + `session_api_key`; depois
  `GET {conversation_url}/api/conversations/<id>/events/search?...` com
  `X-Session-API-Key`. As edições (`file_editor`) ficam em `ActionEvent.action`
  e permitem **reconstruir o arquivo final** (create + str_replace em ordem).

## Logs
- `2026-11-05.md` — retomada da conversa `8741d4fc…` (morreu por context
  length); instalação da toolchain do zero; reconstrução do `vetheryon_world.gd`
  a partir dos eventos; bug do WorkerThreadPool; centralização do botão; limpeza
  do mapa pré-assado; push e CI verdes.
