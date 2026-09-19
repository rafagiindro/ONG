"use strict";

export function somenteDigitos(valor, limite) {
    return valor.replace(/\D/g, "").slice(0, limite);
}

export function mascararCPF(valor) {
    const numeros = somenteDigitos(valor, 11);

    return numeros
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

export function mascararTelefone(valor) {
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

export function mascararCEP(valor) {
    const numeros = somenteDigitos(valor, 8);
    return numeros.replace(/(\d{5})(\d{1,3})$/, "$1-$2");
}

export function aplicarMascara(campo, funcaoMascara) {
    if (!campo) {
        return;
    }

    campo.addEventListener("input", function () {
        campo.value = funcaoMascara(campo.value);
    });
}
