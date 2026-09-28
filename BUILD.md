# Preparação para produção — revisão de 27/09/2026

A configuração existente de Vite foi revisada e a build foi gerada e validada localmente. Branch: preparo-producao-revisao; ponto de partida: 3d11769. Nenhum commit, push ou deploy foi executado nesta revisão. O README anterior já registrava uma publicação; essa publicação não foi alterada nem verificada nesta etapa.

## Configuração efetiva

- Node.js v24.19.0; npm 11.17.0; Vite 7.3.6; html-minifier-terser 7.2.0.
- Páginas canônicas preservadas em html/index.html, html/projetos.html e html/cadastro.html.
- As três páginas antigas da raiz agora encaminham para as correspondentes em html/. Todas as seis entradas são emitidas na build. O conteúdo completo permanece nas páginas canônicas e nos templates legíveis.
- Caminhos relativos (base ./) e appType mpa; imagens referenciadas por URL/import.meta.glob. SVGs emitidos como arquivos externos, sem deslocar seus bytes para o JavaScript.
- HTML minificado explicitamente no fim da transformação, preservando espaços necessários entre elementos e os atributos de acessibilidade. CSS e JS minificados pelo Vite. Arquivos-fonte continuam legíveis.
- Saída final: dist/. Saída de comparação sem minificação: .build-unminified/. Dependências e saídas de build ignoradas pelo Git.

## Medições reais

Duas builds do mesmo código/configuração, com minificação HTML/CSS/JS desativada ou ativada. Bytes em disco, sem gzip/Brotli. Imagens externas, sem inline ou recompressão.

Data: 2026-09-28T00:04:43.132Z

| Categoria | Fonte (B) | Build sem minificar (B) | Build minificada (B) | Redução por minificação |
|---|---:|---:|---:|---:|
| HTML | 20334 | 20534 | 14199 | 30.85% |
| CSS | 10628 | 10628 | 7579 | 28.69% |
| JavaScript | 17233 | 17955 | 14770 | 17.74% |
| Código | 48195 | 49117 | 36548 | 25.59% |
| Imagens | 1491432 | 1491432 | 1491432 | 0.00% |
| Total | 1539627 | 1540549 | 1527980 | 0.82% |

Fórmula: (sem minificar − minificado) / sem minificar × 100. A comparação fonte/build inclui efeitos de bundling; não mede apenas minificação. Inventário e hashes completos em sizes.json. Imagens idênticas às fontes, confirmadas por SHA-256.


Para a atividade: a minificação isolada reduziu HTML/CSS/JS de **49.117 para 36.548 bytes (25,59%)**, economizando **12.569 bytes**. Incluindo imagens, a redução foi de **1.540.549 para 1.527.980 bytes (0,82%)**.

Comparando os arquivos-fonte atuais diretamente com a build, o código passou de **48.195 para 36.548 bytes (24,17%)**, e o pacote completo de **1.539.627 para 1.527.980 bytes (0,76%)**. Essa segunda comparação inclui empacotamento e transformações do Vite, não apenas minificação.

As imagens já incluem uma versão WebP selecionada pelo picture nos navegadores compatíveis. Não houve nova compressão de imagens; seus hashes são idênticos aos originais. O PNG de fallback ocupa aproximadamente 1,28 MB e domina o tamanho em disco, mas isso não significa que todos os formatos sejam baixados em cada visita. As medidas não são tempos de carregamento nem bytes transferidos com gzip/Brotli. Os números antigos de 0,42% referiam-se a outra configuração e não representam esta build.

## Correções verificadas

1. Antes da correção, o navegador rejeitava CPF e telefone corretamente mascarados: String.raw preservava barras duplicadas nos atributos pattern. O teste na build anterior retornou valid=false para ambos. As expressões foram corrigidas sem remover a validação.
2. O formulário dinâmico tinha apenas cinco estados e omitia associações de textos de ajuda presentes no HTML. Foram preservadas as 27 UFs e as referências aria-describedby para CPF, telefone e CEP.
3. A restauração de cadastro agora percorre todas as opções de rádio, mantendo voluntariado, doação ou ambos após recarregar a página.
4. A navegação por JavaScript move o foco para o conteúdo e respeita cliques modificados, downloads, âncoras e outros destinos que devem continuar a cargo do navegador.
5. Os endereços da raiz funcionam em hospedagem estática local, sem depender exclusivamente de uma regra da Vercel.

## Testes executados

Seis testes automatizados aprovados no Microsoft Edge/Chromium pelo Playwright 1.63.0; ver reports/browser-tests.json. Dados fictícios foram usados em contextos de navegador isolados.

- Três páginas diretamente acessíveis com HTTP 200, links internos respondendo e imagens carregadas; nenhum erro JavaScript ou resposta HTTP >=400 capturado nessas visitas.
- Equivalência entre build sem minificação e minificada para textos visíveis, atributos dos controles e estilos computados selecionados.
- Axe-core 4.13.0: nenhuma violação detectada nos testes WCAG A/AA selecionados das três páginas em desktop. Isso não certifica conformidade completa.
- Raiz e subpasta /instituto/: acesso direto às três páginas e imagens válidas.
- Formulário vazio bloqueado, foco no primeiro campo inválido; e-mail e CPF incompletos rejeitados; máscaras de CPF, CEP, telefone fixo e celular.
- Formulário válido abre o modal e o toast; fechamento por Escape e botão; foco inicial, bloqueio de foco no fundo e retorno ao botão de envio.
- Restauração do cadastro e de cada uma das três opções de participação após recarregar.
- Menu móvel operado por teclado; foco após navegação; voltar/avançar do navegador.
- Sem rolagem horizontal nas três páginas em larguras de 320, 390, 768 e 1366 pixels. Capturas desktop e móvel registradas. Inspeção visual adicional da home desktop e cadastro móvel.
- git diff --check sem erros de whitespace. Instalação de dependências informou zero vulnerabilidades conhecidas naquele momento.

Um teste inicial do modal precisou considerar o comportamento nativo do navegador: Tab pode passar pelo chrome do navegador, quando activeElement é body. A versão final verifica que controles do fundo não recebem foco e que o ciclo retorna ao botão do diálogo.

Não foram realizados testes com leitor de tela, Firefox, Safari ou aparelhos físicos. Não foi comprovado modo de alto contraste. O cadastro mantém o comportamento de demonstração: salva dados em localStorage; não envia para um servidor. Esta etapa não acrescenta backend nem valida matematicamente dígitos verificadores do CPF.

## Como reproduzir

~~~text
npm ci
npm run dev
npm run build:measure
npm test
npm run preview -- --host 127.0.0.1 --port 4180 --strictPort
~~~

No Windows, os testes usam o Microsoft Edge instalado. Em Linux, instalar o Chromium do Playwright com npx playwright install --with-deps chromium antes de npm test. O CI foi atualizado para gerar as duas builds e executar os testes; a execução remota depende de um push futuro e não foi realizada aqui. npm run build continua gerando apenas a build final.

Abra http://127.0.0.1:4180/ para a revisão local. Nenhuma publicação nova deve ocorrer sem revisão do usuário.

## Revisão final pelo agente

A pedido do usuário, a revisão técnica foi concluída pelo agente, sem depender de revisão manual do usuário. As diferenças de código foram inspecionadas após os testes. Os tamanhos e hashes das fontes, dos arquivos de dist e dos arquivos extraídos do ZIP entregue foram conferidos: 49 verificações aprovadas. package.json e package-lock.json correspondem. A publicação permanece fora do escopo desta etapa.
