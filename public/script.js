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
      <img 
        src="img/jogadores/${j.id}.jpg" 
        onerror="this.onerror=null; this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(j.nome)}&background=0f3460&color=fff&size=100'"
        alt="Foto de ${j.nome}" 
        class="foto-jogador">
      <h3>${j.nome}</h3>
      <p>Posição: ${j.posicao}</p>
      <p>Idade: ${j.idade}</p>
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
      <p>Data: ${new Date(j.data_jogo).toLocaleDateString('pt-BR')}</p>
      <p>Gols ACMF: ${j.gols_acmf}</p>
      <p>Gols Adversário: ${j.gols_adversario}</p>
    </div>
  `).join('');
}

// Carregar estatisticas
async function carregarEstatisticas() {
  const resposta = await fetch('/estatisticas');
  const dados = await resposta.json();

  const container = document.getElementById('lista-estatisticas');
  container.innerHTML = dados.map(e => `
    <div class="card">
      <h3>${e.nome}</h3>
      <p>Jogos disputados: ${e.jogos}</p>
      <p>Gols marcados: ${e.gols}</p>
    </div>
  `).join('');
}

carregarJogadores();
carregarJogos();
carregarEstatisticas();