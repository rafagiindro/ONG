import { aplicarMascara, mascararCPF, mascararTelefone, mascararCEP } from "../mascaras.js";
import { carregarCadastro, preencherCadastro, salvarCadastro } from "./storage.js";

export function configurarFormulario() {
    const mascaras = { cpf: mascararCPF, telefone: mascararTelefone, cep: mascararCEP };
    document.querySelectorAll("#cpf, #telefone, #cep").forEach(function (campo) {
        aplicarMascara(campo, mascaras[campo.id]);
    });

    const formulario = document.querySelector("#form-cadastro");
    if (!formulario) return;

    preencherCadastro(carregarCadastro());
    formulario.addEventListener("submit", function (evento) {
        evento.preventDefault();
        if (!formulario.checkValidity()) return;

        salvarCadastro(formulario);
        document.querySelector("#toast-feedback")?.classList.add("is-visible");
        document.querySelector("#modal-confirmacao")?.showModal();
    });

    document.querySelector(".modal__fechar")?.addEventListener("click", function () {
        document.querySelector("#modal-confirmacao")?.close();
    });
}
