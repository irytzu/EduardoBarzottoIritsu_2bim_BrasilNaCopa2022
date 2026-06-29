async function listarJogadores() {

    const resposta = await fetch("/jogadores");

    const jogadores = await resposta.json();

    let html = "";

    jogadores.forEach(jogador => {

        html += `

        <div class="card">

            <h3>${jogador.nome}</h3>

            <p>Posição: ${jogador.posicao}</p>

            <p>Clube: ${jogador.clube}</p>

        </div>

        `;

    });

    document.getElementById("lista").innerHTML = html;

}