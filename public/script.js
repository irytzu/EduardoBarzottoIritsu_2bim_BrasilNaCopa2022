function mostrarSecao(id) {
  document.querySelectorAll('.secao').forEach(secao => {
    secao.style.display = 'none';
  });
  document.getElementById(id).style.display = 'block';
}

async function carregarJogadores() {
  const resposta = await fetch('/jogadores');
  const dados = await resposta.json();

  const container = document.getElementById('lista-jogadores');
  container.innerHTML = dados.map(j => `
    <div class="card">
      <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(j.nome)}&background=0f3460&color=fff&size=100" alt="Foto de ${j.nome}" class="foto-jogador">
      <h3>${j.nome}</h3>
      <p>Posição: ${j.posicao}</p>
      <p>Clube: ${j.clube}</p>
    </div>
  `).join('');
}

async function carregarJogos() {
  const resposta = await fetch('/jogos');
  const dados = await resposta.json();

  const container = document.getElementById('lista-jogos');
  container.innerHTML = dados.map(j => `
    <div class="card">
      <h3>vs ${j.adversario}</h3>
      <p>${j.competicao}</p>
      <p>Data: ${new Date(j.data_jogo).toLocaleDateString('pt-BR')}</p>
      <p>Placar: Brasil ${j.gols_brasil} x ${j.gols_adversario} ${j.adversario}</p>
      <p>Estádio: ${j.estadio}</p>
    </div>
  `).join('');
}

let todosEventos = [];

async function carregarEventos() {
  const resposta = await fetch('/eventos');
  todosEventos = await resposta.json();
  filtrarEventos('Brasil');
}

function filtrarEventos(filtro) {
  document.getElementById('aba-brasil').classList.remove('aba-ativa');
  document.getElementById('aba-adversarios').classList.remove('aba-ativa');

  let dadosFiltrados;
  if (filtro === 'Brasil') {
    dadosFiltrados = todosEventos.filter(e => e.selecao === 'Brasil');
    document.getElementById('aba-brasil').classList.add('aba-ativa');
  } else {
    dadosFiltrados = todosEventos.filter(e => e.selecao !== 'Brasil');
    document.getElementById('aba-adversarios').classList.add('aba-ativa');
  }

  const jogosAgrupados = {};
  dadosFiltrados.forEach(e => {
    if (!jogosAgrupados[e.jogo_id]) {
      jogosAgrupados[e.jogo_id] = {
        adversario: e.adversario,
        competicao: e.competicao,
        eventos: []
      };
    }
    jogosAgrupados[e.jogo_id].eventos.push(e);
  });

  const container = document.getElementById('lista-eventos');
  container.innerHTML = Object.values(jogosAgrupados).map(jogo => `
    <div class="card">
      <h3>vs ${jogo.adversario}</h3>
      <p class="competicao-label">${jogo.competicao}</p>
      <ul class="lista-eventos-jogo">
        ${jogo.eventos.map(e => `
          <li>${e.jogador} (${e.selecao}) - ${e.tipo} aos ${e.minuto}'</li>
        `).join('')}
      </ul>
    </div>
  `).join('');
}

carregarJogadores();
carregarJogos();
carregarEventos();