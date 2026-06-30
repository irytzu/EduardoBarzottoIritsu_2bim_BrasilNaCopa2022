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
          src="img/jogadores/${j.id}.png" 
          onerror="this.onerror=null; this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(j.nome)}&background=0f3460&color=fff&size=100'"
          alt="Foto de ${j.nome}" 
          class="foto-jogador">
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
      mostrarAbaEventos('normal');
  }

  function mostrarAbaEventos(tipo) {
      document.getElementById('aba-normal').classList.remove('aba-ativa');
      document.getElementById('aba-penaltis').classList.remove('aba-ativa');

      if (tipo === 'normal') {
          document.getElementById('aba-normal').classList.add('aba-ativa');
          renderizarGolsEAssistencias();
      } else {
          document.getElementById('aba-penaltis').classList.add('aba-ativa');
          renderizarPenaltis();
      }
  }

  function renderizarGolsEAssistencias() {
      const dados = todosEventos.filter(e => !e.tipo.includes('Pênalti'));

      const jogosAgrupados = {};
      dados.forEach(e => {
          if (!jogosAgrupados[e.jogo_id]) {
              jogosAgrupados[e.jogo_id] = { adversario: e.adversario, competicao: e.competicao, brasil: [], adversarios: [] };
          }
          if (e.selecao === 'Brasil') jogosAgrupados[e.jogo_id].brasil.push(e);
          else jogosAgrupados[e.jogo_id].adversarios.push(e);
      });

      const container = document.getElementById('lista-eventos');
      container.innerHTML = Object.values(jogosAgrupados).map(jogo => `
      <div class="card">
        <h3>vs ${jogo.adversario}</h3>
        <p class="competicao-label">${jogo.competicao}</p>
        <p class="time-label brasil-label">🇧🇷 Brasil</p>
        <ul class="lista-eventos-jogo">
          ${jogo.brasil.length > 0 ? jogo.brasil.map(e => `<li>${e.jogador} - ${e.tipo} aos ${e.minuto}'</li>`).join('') : '<li class="sem-evento">Nenhum evento</li>'}
        </ul>
        <p class="time-label adversario-label">🆚 ${jogo.adversario}</p>
        <ul class="lista-eventos-jogo">
          ${jogo.adversarios.length > 0 ? jogo.adversarios.map(e => `<li>${e.jogador} - ${e.tipo} aos ${e.minuto}'</li>`).join('') : '<li class="sem-evento">Nenhum evento</li>'}
        </ul>
      </div>
    `).join('');
  }

  function renderizarPenaltis() {
      const dados = todosEventos.filter(e => e.tipo.includes('Pênalti'));

      if (dados.length === 0) {
          document.getElementById('lista-eventos').innerHTML = '<p class="sem-evento">Nenhuma disputa de pênaltis registrada.</p>';
          return;
      }
      const jogosAgrupados = {};
      dados.forEach(e => {
          if (!jogosAgrupados[e.jogo_id]) {
              jogosAgrupados[e.jogo_id] = { adversario: e.adversario, competicao: e.competicao, rodadas: {} };
          }
          if (!jogosAgrupados[e.jogo_id].rodadas[e.minuto]) {
              jogosAgrupados[e.jogo_id].rodadas[e.minuto] = {};
          }
          if (e.selecao === 'Brasil') {
              jogosAgrupados[e.jogo_id].rodadas[e.minuto].brasil = e;
          } else {
              jogosAgrupados[e.jogo_id].rodadas[e.minuto].adversario = e;
          }
      });

      const container = document.getElementById('lista-eventos');
      container.innerHTML = Object.values(jogosAgrupados).map(jogo => {
          const numerosRodadas = Object.keys(jogo.rodadas).sort((a, b) => a - b);
          return `
        <div class="card">
          <h3>vs ${jogo.adversario}</h3>
          <p class="competicao-label">${jogo.competicao} - Disputa de Pênaltis</p>
          <ul class="lista-eventos-jogo">
            ${numerosRodadas.map(num => {
              const r = jogo.rodadas[num];
              const brasilTexto = r.brasil ? `${r.brasil.jogador} (${r.brasil.tipo.includes('Gol') ? '✅ Gol' : '❌ Perdeu'})` : '-';
              const advTexto = r.adversario ? `${r.adversario.jogador} (${r.adversario.tipo.includes('Gol') ? '✅ Gol' : '❌ Perdeu'})` : '-';
              return `<li><strong>${num}ª cobrança:</strong> Brasil: ${brasilTexto} | ${jogo.adversario}: ${advTexto}</li>`;
          }).join('')}
          </ul>
        </div>
      `;
      }).join('');
  }

  carregarJogadores();
  carregarJogos();
  carregarEventos();