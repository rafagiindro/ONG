const CHAVE_CADASTRO = "cadastroInstituto";

export function salvarCadastro(formulario) {
    const dados = Object.fromEntries(new FormData(formulario).entries());
    localStorage.setItem(CHAVE_CADASTRO, JSON.stringify(dados));
}

export function carregarCadastro() {
    const salvo = localStorage.getItem(CHAVE_CADASTRO);
    if (!salvo) return;

    try {
        return JSON.parse(salvo);
    } catch (erro) {
        localStorage.removeItem(CHAVE_CADASTRO);
        return null;
    }
}

export function preencherCadastro(dados) {
    if (!dados) return;

    Object.entries(dados).forEach(function ([campo, valor]) {
        document.querySelectorAll(`[name="${CSS.escape(campo)}"]`).forEach(function (elemento) {
            if (elemento.type === "radio") {
                elemento.checked = elemento.value === valor;
            } else {
                elemento.value = valor;
            }
        });
    });
}
