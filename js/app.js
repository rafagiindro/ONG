import { configurarFormulario } from "./modules/form.js";
import { layoutBase, templateCadastro, templateHome, templateProjetos } from "./modules/templates.js";

function obterRota() {
    return window.location.pathname.split("/").pop() || "index.html";
}

function obterConteudo(rota) {
    if (rota === "projetos.html") return templateProjetos();
    if (rota === "cadastro.html") return templateCadastro();
    return templateHome();
}

function obterTitulo(rota) {
    if (rota === "projetos.html") return "Projetos do Instituto Caminhos do Bem";
    if (rota === "cadastro.html") return "Cadastro de Apoiadores";
    return "Instituto Caminhos do Bem";
}

function configurarMenu() {
    const menuToggle = document.querySelector(".menu-toggle");
    const menuPrincipal = document.getElementById("menu-principal");
    if (!menuToggle || !menuPrincipal) return;

    menuToggle.addEventListener("click", function () {
        const aberto = menuToggle.getAttribute("aria-expanded") === "true";
        menuToggle.setAttribute("aria-expanded", String(!aberto));
        menuPrincipal.classList.toggle("is-open", !aberto);
    });
}

function renderizarAplicacao(moverFoco = false) {
    const rota = obterRota();
    const titulo = obterTitulo(rota);
    document.title = titulo;
    document.body.innerHTML = layoutBase(titulo, obterConteudo(rota), rota);
    configurarMenu();
    configurarFormulario();
    if (moverFoco) {
        const principal = document.getElementById("app");
        principal.setAttribute("tabindex", "-1");
        principal.focus();
    }
}

document.addEventListener("click", function (evento) {
    const link = evento.target.closest("a");
    const linkInterno = link && link.protocol === window.location.protocol && link.host === window.location.host;
    const paginaDoSite = link && /\/(index|projetos|cadastro)\.html$/.test(link.pathname);
    if (!linkInterno || !paginaDoSite || link.hash || link.hasAttribute("download") ||
        (link.target && link.target !== "_self") || evento.defaultPrevented ||
        evento.button !== 0 || evento.ctrlKey || evento.metaKey || evento.shiftKey || evento.altKey) return;

    evento.preventDefault();
    window.history.pushState({}, "", link.href);
    renderizarAplicacao(true);
});

window.addEventListener("popstate", () => renderizarAplicacao(true));
renderizarAplicacao();
