"use strict";

function somenteDigitos(valor, limite) {
    return valor.replace(/\D/g, "").slice(0, limite);
}

function mascararCPF(valor) {
    const numeros = somenteDigitos(valor, 11);

    return numeros
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

function mascararTelefone(valor) {
    const numeros = somenteDigitos(valor, 11);

    if (numeros.length <= 10) {
        return numeros
            .replace(/^(\d{2})(\d)/, "($1) $2")
            .replace(/(\d{4})(\d{1,4})$/, "$1-$2");
    }

    return numeros
        .replace(/^(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{5})(\d{1,4})$/, "$1-$2");
}

function mascararCEP(valor) {
    const numeros = somenteDigitos(valor, 8);
    return numeros.replace(/(\d{5})(\d{1,3})$/, "$1-$2");
}

function aplicarMascara(campo, funcaoMascara) {
    if (!campo) {
        return;
    }

    campo.addEventListener("input", function () {
        campo.value = funcaoMascara(campo.value);
    });
}

aplicarMascara(document.getElementById("cpf"), mascararCPF);
aplicarMascara(document.getElementById("telefone"), mascararTelefone);
aplicarMascara(document.getElementById("cep"), mascararCEP);
