# Checklist de revisão

## Verificações concluídas

- Build de produção executada com `npm ci` e `npm run build`.
- Três páginas publicadas e testadas com resposta HTTP 200.
- Imagens da home e dos projetos carregadas sem erros.
- Menu móvel, navegação interna, máscaras, validação, localStorage, toast e modal testados.
- Contraste calculado para as principais combinações do CSS: razões entre 6,68:1 e 14,66:1.
- README, CI, branch `develop` e release `v1.0.0` versionados.

## Limitações registradas

- Não foi realizado teste com leitor de ecrã.
- A redução de bytes foi de aproximadamente 0,42%; não houve recompressão adicional das imagens.
- O deploy público foi realizado manualmente. A integração automática Vercel-GitHub depende de autorização do repositório na conta Vercel.