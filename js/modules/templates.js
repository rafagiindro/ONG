const acoes = [
    ["Doações", "Apoio contínuo", "badge--verde", "doacao.svg", "Ícone de mãos sustentando um coração, representando doações", "Recebemos contribuições para apoiar as campanhas sociais."],
    ["Voluntariado", "Participação", "badge--laranja", "voluntariado.svg", "Ícone de grupo de pessoas, representando voluntariado", "Voluntários ajudam na organização e execução das ações."],
    ["Alimentos", "Prioridade social", "badge--verde", "alimentos.svg", "Ícone de cesta com alimentos para doação", "Arrecadamos alimentos não perecíveis para famílias atendidas."],
    ["Roupas", "Campanha ativa", "badge--laranja", "roupas.svg", "Ícone de camiseta, representando campanha de roupas", "Campanhas recebem roupas, calçados e cobertores em bom estado."]
];

const projetos = [
    ["Alimento que Aproxima", "Em andamento", "badge--verde", "alimentos.svg", "Ícone de cesta com alimentos", "Projeto de arrecadação e distribuição de alimentos para famílias em situação de vulnerabilidade."],
    ["Campanha do Agasalho", "Campanha sazonal", "badge--laranja", "roupas.svg", "Ícone de camiseta para campanha de roupas", "Ação voltada à arrecadação de roupas, cobertores e calçados em bom estado para distribuição durante os períodos de frio."],
    ["Dia de Ação Comunitária", "Voluntariado", "badge--verde", "voluntariado.svg", "Ícone de grupo de pessoas para ação comunitária", "Encontro de voluntários para organizar doações, orientar famílias atendidas e apoiar atividades comunitárias."]
];

function renderCards(dados, classe) {
    return dados.map(function ([titulo, categoria, classeBadge, icone, alt, descricao]) {
        return `
            <article class="${classe}">
                <img class="${classe === "card-acao" ? "icone-acao" : "icone-projeto"}" src="../img/icones/${icone}" alt="${alt}" width="${classe === "card-acao" ? "96" : "72"}" height="${classe === "card-acao" ? "96" : "72"}">
                <div>
                    <h3>${titulo}</h3>
                    <span class="badge ${classeBadge}">${categoria}</span>
                    <p>${descricao}</p>
                </div>
            </article>
        `;
    }).join("");
}

export function layoutBase(titulo, conteudo, rota) {
    return `
        <header>
            <h1>${titulo}</h1>
            <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="menu-principal"><span class="menu-toggle__icon" aria-hidden="true">&#9776;</span><span>Menu</span></button>
            <nav id="menu-principal" aria-label="Navegação principal">
                <a href="index.html" ${rota === "index.html" ? 'aria-current="page"' : ""}>Início</a>
                <a href="projetos.html" ${rota === "projetos.html" ? 'aria-current="page"' : ""}>Projetos</a>
                <a href="cadastro.html" ${rota === "cadastro.html" ? 'aria-current="page"' : ""}>Cadastro</a>
                <details class="menu-dropdown"><summary>Participe</summary><div class="menu-dropdown__links"><a href="projetos.html">Conheça os projetos</a><a href="cadastro.html">Faça seu cadastro</a></div></details>
            </nav>
        </header>
        <main id="app" aria-live="polite">${conteudo}</main>
        <footer><p>Instituto Caminhos do Bem - 2026</p></footer>
    `;
}

export function templateHome() {
    return `
        <section><h2>Quem somos</h2><picture><source srcset="../img/acao-social.webp" type="image/webp"><source srcset="../img/acao-social.jpg" type="image/jpeg"><img src="../img/acao-social.png" alt="Voluntários do Instituto Caminhos do Bem entregando uma cesta de alimentos a uma família durante uma ação social" width="1200" height="800" loading="eager"></picture><p>O Instituto Caminhos do Bem é uma ONG voltada ao apoio de pessoas e famílias em situação de vulnerabilidade.</p><p>Nosso trabalho é realizado por meio de campanhas de doação, ações sociais e atividades voluntárias.</p></section>
        <section><h2>Nossa missão</h2><p>Promover apoio social e contribuir para melhorar a qualidade de vida de pessoas e famílias que precisam de ajuda.</p></section>
        <section><h2>Como ajudamos</h2><p>Realizamos arrecadação de alimentos e roupas, campanhas solidárias, apoio a famílias em situação de vulnerabilidade e ações com voluntários.</p><div class="grade-acoes">${renderCards(acoes, "card-acao")}</div><p><a class="botao-link" href="projetos.html">Conheça nossos projetos</a></p></section>
        <section><h2>Contato</h2><address><p><strong>Telefone:</strong> (11) 99999-9999</p><p><strong>E-mail:</strong> <a href="mailto:contato@caminhosdobem.org">contato@caminhosdobem.org</a></p><p><strong>Localização:</strong> São Bernardo do Campo - SP</p></address></section>
    `;
}

export function templateProjetos() {
    return `<section><h2>Projetos Sociais</h2>${renderCards(projetos, "projeto-com-icone")}</section><section><h2>Voluntariado</h2><p>Pessoas interessadas podem colaborar na organização das campanhas, separação das doações, atendimento durante as ações e apoio logístico.</p><p>Para participar, basta acessar a página de cadastro e selecionar a opção de trabalho voluntário.</p><p><a class="botao-link" href="cadastro.html">Quero ser voluntário</a></p></section><section><h2>Campanhas de Doação</h2><p>As campanhas recebem alimentos não perecíveis, roupas, cobertores, materiais de higiene e outras contribuições definidas conforme a necessidade de cada ação.</p><p>Quem deseja contribuir financeiramente ou apoiar uma campanha pode entrar em contato com o Instituto ou realizar o cadastro como apoiador.</p><p><a class="botao-link" href="cadastro.html">Quero contribuir</a></p></section>`;
}

export function templateCadastro() {
    return `<section><h2>Faça parte do Instituto Caminhos do Bem</h2><p>Preencha o formulário para demonstrar seu interesse em colaborar com as ações da ONG.</p><output class="alert alert--info"><strong>Antes de enviar:</strong><span>Confira seus dados e escolha uma forma de participação.</span></output><p class="aviso-campos">Os campos marcados como obrigatórios devem ser preenchidos antes do envio.</p><form id="form-cadastro" action="#" method="post"><fieldset><legend>Dados pessoais</legend><div class="campo"><label for="nome">Nome completo</label><input type="text" id="nome" name="nome" autocomplete="name" minlength="3" required></div><div class="campo"><label for="cpf">CPF</label><input type="text" id="cpf" name="cpf" inputmode="numeric" autocomplete="off" placeholder="000.000.000-00" pattern="[0-9]{3}\\.[0-9]{3}\\.[0-9]{3}-[0-9]{2}" maxlength="14" required><small>Formato: 000.000.000-00.</small></div><div class="campo"><label for="nascimento">Data de nascimento</label><input type="date" id="nascimento" name="nascimento" autocomplete="bday" required></div><div class="campo"><label for="email">E-mail</label><input type="email" id="email" name="email" autocomplete="email" required></div><div class="campo"><label for="telefone">Telefone</label><input type="tel" id="telefone" name="telefone" inputmode="tel" autocomplete="tel" placeholder="(11) 99999-9999" pattern="\\([0-9]{2}\\) [0-9]{4,5}-[0-9]{4}" maxlength="15" required><small>Aceita telefone fixo ou celular com DDD.</small></div></fieldset><fieldset><legend>Endereço</legend><div class="campo"><label for="cep">CEP</label><input type="text" id="cep" name="cep" inputmode="numeric" autocomplete="postal-code" placeholder="00000-000" pattern="[0-9]{5}-[0-9]{3}" maxlength="9" required><small>Formato: 00000-000.</small></div><div class="campo"><label for="endereco">Endereço</label><input type="text" id="endereco" name="endereco" autocomplete="address-line1" required></div><div class="campo"><label for="cidade">Cidade</label><input type="text" id="cidade" name="cidade" autocomplete="address-level2" required></div><div class="campo"><label for="estado">Estado</label><select id="estado" name="estado" autocomplete="address-level1" required><option value="">Selecione</option><option value="SP">São Paulo</option><option value="RJ">Rio de Janeiro</option><option value="MG">Minas Gerais</option><option value="BA">Bahia</option><option value="PR">Paraná</option></select></div></fieldset><fieldset><legend>Forma de participação</legend><p>Como deseja colaborar?</p><div class="opcoes"><div class="opcao"><input type="radio" id="voluntario" name="participacao" value="voluntario" required><label for="voluntario">Trabalho voluntário</label></div><div class="opcao"><input type="radio" id="doador" name="participacao" value="doador"><label for="doador">Doação</label></div><div class="opcao"><input type="radio" id="ambos" name="participacao" value="ambos"><label for="ambos">Voluntariado e doação</label></div></div></fieldset><button type="submit">Enviar cadastro</button></form></section><dialog class="modal" id="modal-confirmacao" aria-labelledby="titulo-confirmacao"><div class="modal__conteudo"><h2 id="titulo-confirmacao">Cadastro recebido</h2><p>Obrigado por demonstrar interesse em colaborar com o Instituto Caminhos do Bem.</p><button class="modal__fechar" type="button">Fechar</button></div></dialog><output class="toast" id="toast-feedback" aria-live="polite">Cadastro validado com sucesso.</output>`;
}
