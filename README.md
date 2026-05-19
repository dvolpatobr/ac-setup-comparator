# AC Setup Comparator

Compare dois arquivos `.ini` de setup do **Assetto Corsa** no navegador — ideal para ver o que mudou entre quali e corrida, baseline e ajuste fino, etc.

O comparador usa o mapa em [`examples/map-setup-assetto-FH Alpine.txt`](examples/map-setup-assetto-FH%20Alpine.txt) (RSS Formula Hybrid Alpine): só parâmetros listados aparecem, agrupados por seção (`--- Tyres ---`, etc.), com valores formatados conforme as regras `VALUE=` do mapa (ex.: `0 - SOFT` → **SOFT**).

## Uso

1. Abra o site (localmente com um servidor HTTP ou via [GitHub Pages](https://pages.github.com/)).
2. Carregue ou cole o **Setup A** e o **Setup B**.
3. Clique em **Comparar**.
4. Use **Mostrar só diferenças** e a busca para filtrar os parâmetros.
5. Clique em **?** em cada parâmetro para ver a explicação do manual FHA 2025.

### Onde estão os setups no PC

```
Documents/Assetto Corsa/setups/<nome_do_carro>/*.ini
```

### Teste rápido

Na página, clique em **Carregar exemplos** (requer servidor HTTP — veja abaixo).

Ou localmente:

```bash
cd AC-setup-comparator
python3 -m http.server 8080
# Abra http://localhost:8080
```

## Publicar no GitHub Pages

1. Crie o repositório `AC-setup-comparator` no GitHub e envie este código para `main`.
2. Em **Settings → Pages**, selecione **GitHub Actions** como fonte.
3. O workflow `.github/workflows/pages.yml` publica a raiz do repositório a cada push em `main`.
4. URL esperada: `https://<seu-usuario>.github.io/AC-setup-comparator/`

## Estrutura

```
├── index.html          # Página principal
├── css/styles.css
├── js/
│   ├── parse-ini.js    # Parser INI
│   ├── setup-map.js    # Mapa FH Alpine + formatação
│   ├── compare.js      # Diff filtrado
│   └── app.js          # UI (painéis por grupo)
├── examples/
│   ├── map-setup-assetto-FH Alpine.txt  # Chaves e labels aceitos
│   ├── setup-a.ini / setup-b.ini        # Demos
├── AGENTS.md           # Instruções para agentes de IA
└── .cursor/rules/      # Regras do Cursor
```

## Contexto para IA

Este repositório inclui [`AGENTS.md`](AGENTS.md) e regras em [`.cursor/rules/`](.cursor/rules/) para orientar assistentes de código (Cursor e compatíveis). Mantenha esses arquivos concisos e focados no escopo do comparador.

## Limitações

- Arquivos devem estar em **UTF-8**.
- Valores são comparados como texto; unidades (bar, graus, etc.) não são interpretadas.
- Setups de mods podem usar chaves extras — aparecem na tabela normalmente.

## Licença

MIT — veja [LICENSE](LICENSE).
