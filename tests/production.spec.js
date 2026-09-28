import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

for (const route of ["index", "projetos", "cadastro"]) {
    test(route + ": rota direta, imagens, links, acessibilidade e equivalência", async ({ page, context }) => {
        const errors = [];
        page.on("pageerror", error => errors.push(error.message));
        page.on("response", response => { if (response.status() >= 400) errors.push(response.url()); });
        const response = await page.goto("/html/" + route + ".html");
        expect(response.status()).toBe(200);
        await expect(page.locator("#app")).toBeVisible();
        await page.waitForLoadState("networkidle");
        expect(await page.locator("img").evaluateAll(images => images.every(img => img.complete && img.naturalWidth > 0))).toBe(true);
        const links = await page.locator("a[href]").evaluateAll(links => links.filter(a => a.origin === location.origin).map(a => a.href));
        for (const link of new Set(links)) expect((await page.request.get(link)).status()).toBe(200);
        const result = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
        expect(result.violations).toEqual([]);
        const signature = async p => p.locator("body").evaluate(body => ({
            text: body.innerText.replace(/\s+/g, " ").trim(),
            controls: [...body.querySelectorAll("input,select,button,dialog")].map(el => ({
                tag: el.tagName, id: el.id, type: el.getAttribute("type"),
                pattern: el.getAttribute("pattern"), required: el.hasAttribute("required"),
                label: el.getAttribute("aria-labelledby"), help: el.getAttribute("aria-describedby")
            })),
            styles: [...body.querySelectorAll("h1,h2,a,button,input")].map(el => {
                const s = getComputedStyle(el);
                return [s.color,s.backgroundColor,s.fontSize,s.display];
            })
        }));
        const unminified = await context.newPage();
        await unminified.goto("http://127.0.0.1:4178/html/" + route + ".html");
        await expect(unminified.locator("#app")).toBeVisible();
        expect(await signature(page)).toEqual(await signature(unminified));
        await unminified.close();
        expect(errors).toEqual([]);
        await page.screenshot({ path: "reports/" + route + "-desktop.png", fullPage: true });
    });
}

test("Entradas da raiz e hospedagem em subpasta", async ({ page }) => {
    for (const prefix of ["http://127.0.0.1:4176", "http://127.0.0.1:4177/instituto"]) {
        for (const route of ["index", "projetos", "cadastro"]) {
            await page.goto(prefix + "/" + route + ".html");
            await expect(page).toHaveURL(prefix + "/html/" + route + ".html");
            await expect(page.locator("#app")).toBeVisible();
            await page.waitForLoadState("networkidle");
            expect(await page.locator("img").evaluateAll(xs => xs.every(x => x.complete && x.naturalWidth > 0))).toBe(true);
        }
    }
});

test("Formulário: validação, máscaras, modal, teclado e persistência das três opções", async ({ page }) => {
    await page.goto("/html/cadastro.html");
    await page.getByRole("button", { name: "Enviar cadastro" }).click();
    await expect(page.locator("#modal-confirmacao")).not.toBeVisible();
    await expect(page.locator("#nome")).toBeFocused();
    const values = { nome: "Pessoa de Teste", cpf: "12345678901", nascimento: "1990-01-01",
        email: "teste@example.com", telefone: "11987654321", cep: "01001000",
        endereco: "Endereço de teste", cidade: "Cidade de teste" };
    for (const [id,value] of Object.entries(values)) await page.locator("#" + id).fill(value);
    await expect(page.locator("#cpf")).toHaveValue("123.456.789-01");
    await expect(page.locator("#telefone")).toHaveValue("(11) 98765-4321");
    await expect(page.locator("#cep")).toHaveValue("01001-000");
    await expect(page.locator("#estado option")).toHaveCount(28);
    await page.locator("#estado").selectOption("AC");
    await page.locator("#email").fill("email-invalido");
    expect(await page.locator("#email").evaluate(el => el.checkValidity())).toBe(false);
    await page.locator("#email").fill(values.email);
    await page.locator("#cpf").fill("123");
    expect(await page.locator("#cpf").evaluate(el => el.checkValidity())).toBe(false);
    await page.locator("#cpf").fill(values.cpf);
    await page.locator("#telefone").fill("1134567890");
    await expect(page.locator("#telefone")).toHaveValue("(11) 3456-7890");
    expect(await page.locator("#telefone").evaluate(el => el.checkValidity())).toBe(true);
    for (const choice of ["voluntario", "doador", "ambos"]) {
        await page.locator("#" + choice).check();
        expect(await page.locator("form").evaluate(el => el.checkValidity())).toBe(true);
        const submit = page.getByRole("button", { name: "Enviar cadastro" });
        await submit.focus();
        await page.keyboard.press("Enter");
        const dialog = page.getByRole("dialog", { name: "Cadastro recebido" });
        await expect(dialog).toBeVisible();
        await expect(dialog.getByRole("button", { name: "Fechar" })).toBeFocused();
        // Native dialog may pass through browser chrome (activeElement === body),
        // but must never focus an interactive element in the inert background.
        await page.keyboard.press("Tab");
        expect(await page.evaluate(() => document.activeElement === document.body || !!document.activeElement.closest("dialog"))).toBe(true);
        await page.locator("#nome").evaluate(el => el.focus());
        await expect(page.locator("#nome")).not.toBeFocused();
        await page.keyboard.press("Tab");
        await expect(dialog.getByRole("button", { name: "Fechar" })).toBeFocused();
        await expect(page.locator("#toast-feedback")).toHaveClass(/is-visible/);
        await page.keyboard.press("Escape");
        await expect(dialog).not.toBeVisible();
        await expect(submit).toBeFocused();
        await page.reload();
        await expect(page.locator("#" + choice)).toBeChecked();
        await expect(page.locator("#nome")).toHaveValue(values.nome);
        await expect(page.locator("#estado")).toHaveValue("AC");
    }
    await page.getByRole("button", { name: "Enviar cadastro" }).click();
    await page.getByRole("button", { name: "Fechar", exact: true }).click();
    await expect(page.locator("#modal-confirmacao")).not.toBeVisible();
});

test("Menu móvel, navegação por teclado, histórico e ausência de rolagem horizontal", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/html/index.html");
    const menu = page.getByRole("button", { name: "Menu" });
    await menu.focus();
    await page.keyboard.press("Enter");
    await expect(menu).toHaveAttribute("aria-expanded", "true");
    await page.keyboard.press("Tab");
    await expect(page.getByRole("link", { name: "Início", exact: true })).toBeFocused();
    await page.keyboard.press("Tab");
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/\/html\/projetos.html$/);
    await expect(page.locator("#app")).toBeFocused();
    await page.goBack();
    await expect(page).toHaveURL(/\/html\/index.html$/);
    await page.goForward();
    await expect(page).toHaveURL(/\/html\/projetos.html$/);
    for (const width of [320,390,768,1366]) {
        await page.setViewportSize({ width, height: 844 });
        for (const route of ["index","projetos","cadastro"]) {
            await page.goto("/html/" + route + ".html");
            await expect(page.locator("#app")).toBeVisible();
            expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
            if (width === 390) await page.screenshot({ path: "reports/" + route + "-mobile.png", fullPage: true });
        }
    }
});
