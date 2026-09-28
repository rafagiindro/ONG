# Instituto Caminhos do Bem

Site institucional responsivo do Instituto Caminhos do Bem, com páginas de apresentação, projetos sociais e cadastro de apoiadores.

## Tecnologias

- HTML semântico e atributos ARIA
- CSS responsivo
- JavaScript modular
- Vite para build de produção
- html-minifier-terser para minificação explícita do HTML

## Desenvolvimento

```text
npm ci
npm run dev
npm run build:measure
npm test
npm run preview
```

A build é gerada em `dist/`. As entradas de produção são `html/index.html`, `html/projetos.html` e `html/cadastro.html`.

## Versionamento

O projeto utiliza a branch `main` para a versão estável. Alterações devem ser desenvolvidas em uma branch própria, revisadas por pull request e integradas após a execução do CI.

## Publicação

Aplicação publicada na Vercel:

https://instituto-caminhos-do-bem-final.vercel.app

As medições e os testes da build estão documentados em `BUILD.md`.
## Revisão local de produção (27/09/2026)

A preparação revisada está na branch `preparo-producao-revisao`. A build inclui as três páginas de `html/` e três entradas de raiz que encaminham para elas. `npm run build:measure` gera versões sem/com minificação e registra bytes reais em `reports/`; `npm test` valida a build com Playwright e axe-core. No Windows, requer Microsoft Edge instalado; em Linux, execute `npx playwright install --with-deps chromium`.

Esta revisão não publicou alterações. O endereço público acima foi registrado anteriormente e não foi verificado nesta etapa. A revisão atual deve ser feita localmente antes de um novo deploy. Consulte `BUILD.md` e `CHECKLIST.md`.
