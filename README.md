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
npm install
npm run build
npm run preview
```

A build é gerada em `dist/`. As entradas de produção são `html/index.html`, `html/projetos.html` e `html/cadastro.html`.

## Versionamento

O projeto utiliza a branch `main` para a versão estável. Alterações devem ser desenvolvidas em uma branch própria, revisadas por pull request e integradas após a execução do CI.

## Publicação

Aplicação publicada na Vercel:

https://instituto-caminhos-do-bem-final.vercel.app

As medições e os testes da build estão documentados em `BUILD.md`.