# AC Setup Comparator — instruções para agentes

Site estático (HTML/CSS/JS) que compara dois arquivos `.ini` de setup do **Assetto Corsa** no navegador. Sem build, sem backend, sem npm.

## Stack

- HTML5, CSS3, JavaScript ES modules (`<script type="module">`)
- Deploy: GitHub Pages via `.github/workflows/pages.yml`

## Arquivos principais

| Arquivo | Função |
|---------|--------|
| `js/parse-ini.js` | Parser INI (seções, comentários, `VERSION`) |
| `js/setup-map.js` | Mapa de parâmetros FH Alpine + formatação de valores |
| `js/compare.js` | Diff filtrado pelo mapa |
| `js/app.js` | UI, FileReader, painéis agrupados |
| `js/fha-2025-help.js` | Textos de tooltip (manual FHA 2025) |
| `js/tooltip.js` | Janela flutuante de ajuda |
| `examples/map-setup-assetto-FH Alpine.txt` | Chaves aceitas e regras de exibição |
| `examples/setup-a.ini` | Exemplo de setup para teste |

## Como testar

1. Abrir `index.html` via servidor local ou GitHub Pages (módulos ES exigem HTTP).
2. Clicar **Carregar exemplos** ou subir dois `.ini` de `Documents/Assetto Corsa/setups/<carro>/`.
3. Validar contagem de diffs na tabela e no resumo.

Servidor local rápido: `python3 -m http.server 8080` na raiz do projeto.

## Convenções

- Não adicionar frameworks (React, Vue, etc.) sem pedido explícito.
- Manter UI em português.
- Alterações no parser devem atualizar `examples/` se a semântica mudar.
- Instruções mínimas: regras detalhadas estão em `.cursor/rules/`.

## Limitações

- Encoding esperado: UTF-8.
- Valores são comparados como texto; delta numérico só quando ambos os lados são números finitos.
