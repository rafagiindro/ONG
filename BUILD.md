# Build de produção

## Configuração

- Node.js: `v24.19.0`
- npm: `11.17.0`
- Vite: `7.3.6`
- Entradas: `html/index.html`, `html/projetos.html` e `html/cadastro.html`
- Saída: `dist/html/` para as páginas e `dist/assets/` para recursos compartilhados
- HTML: minificado explicitamente por `html-minifier-terser` no plugin de `vite.config.js`
- Imagens dinâmicas: resolvidas pelo Vite em `js/modules/templates.js`; os ícones SVG são incorporados como URLs de dados no bundle

Comandos executados:

```text
npm install
npm run build
npm run preview -- --host 127.0.0.1 --port 4173
```

## Medição em bytes

Comparação entre o conjunto-fonte canônico (`html/`, `css/`, `js/`, `img/`) e todos os arquivos gerados em `dist/`, sem incluir `node_modules/`, `package-lock.json` ou `package.json`.

| Categoria | Fonte | Build | Diferença |
| --- | ---: | ---: | ---: |
| HTML | 19.176 B | 17.713 B | -7,63% |
| CSS | 10.628 B | 7.579 B | -28,68% |
| JavaScript | 14.898 B | 15.273 B | +2,52% |
| Imagens | 1.491.432 B | 1.489.167 B | -0,15% |
| **Total** | **1.536.134 B** | **1.529.743 B** | **-0,42%** |

As categorias HTML, CSS e JavaScript não são comparações arquivo a arquivo: o Vite consolida módulos e CSS compartilhados, e os SVG são incorporados ao bundle JavaScript. Não houve otimização adicional dos pixels das imagens; a pequena diferença vem do empacotamento dos assets.

## Testes realizados

- Carregamento direto das três rotas da build, todas com HTTP `200`.
- Home: cinco imagens encontradas, nenhuma quebrada.
- Projetos: três ícones encontrados, nenhum quebrado.
- Viewport de `390 x 844`: menu abriu com `aria-expanded="true"` e `display: flex`.
- Máscaras: CPF, telefone e CEP produziram os formatos esperados.
- Formulário válido: persistência em `localStorage`, toast visível e dialog aberto; o dialog também foi fechado.
- Navegação interna para Projetos via History API.
- Diagnósticos do editor: nenhum erro nos arquivos de configuração e template alterados.

O servidor usado foi apenas local para revisão da build. Nenhum deploy público foi realizado.