
// Seleciona todos os cards
const dispositivos = document.querySelectorAll(".card");

// Função para atualizar o painel
function atualizarPainel() {

    let online = 0;
    let offline = 0;

    dispositivos.forEach(function(card) {

        const status = card.dataset.status;

        if (status === "online") {
            online++;
        } else {
            offline++;
        }

    });

    // Atualiza os indicadores
    document.getElementById("totalServidores").textContent =
        document.querySelectorAll("section:nth-of-type(2) .card").length;

    document.getElementById("totalOnline").textContent = online;

    document.getElementById("totalOffline").textContent = offline;

    const total = online + offline;

    const disponibilidade = total > 0
        ? ((online / total) * 100).toFixed(1)
        : "0.0";

    document.getElementById("disponibilidade").textContent =
        disponibilidade + "%";

    atualizarAlertas();
}


// Função para alterar o status
function alterarStatus(botao) {

    const card = botao.closest(".card");

    const statusTexto = card.querySelector(".status");

    const statusAtual = card.dataset.status;

    if (statusAtual === "online") {

        card.dataset.status = "offline";

        statusTexto.textContent = "● OFFLINE";

        statusTexto.className = "status offline";

        botao.textContent = "Restabelecer";

    } else {

        card.dataset.status = "online";

        statusTexto.textContent = "● ONLINE";

        statusTexto.className = "status online";

        botao.textContent = "Simular falha";

    }

    atualizarPainel();

}


// Função para atualizar os alertas
function atualizarAlertas() {

    const lista = document.getElementById("listaAlertas");

    lista.innerHTML = "";

    let encontrouFalha = false;

    dispositivos.forEach(function(card) {

        if (card.dataset.status === "offline") {

            encontrouFalha = true;

            const nome = card.querySelector("h3").textContent;

            const alerta = document.createElement("li");

            alerta.textContent = "⚠️ " + nome + " está OFFLINE";

            lista.appendChild(alerta);

        }

    });

    if (!encontrouFalha) {

        const alerta = document.createElement("li");

        alerta.textContent = "✓ Todos os dispositivos estão ONLINE";

        alerta.style.color = "#00ff88";

        lista.appendChild(alerta);

    }

}


// Inicializa o painel
atualizarPainel();
