const express = require('express');
const pool = require('./db');

const app = express();
app.use(express.json());
app.use(express.static('public'));

const PORT = 3000;

app.get('/', (req, res) => {
  res.send('API funcionando!');
});

app.get('/jogadores', async (req, res) => {
  try {
    const resultado = await pool.query("SELECT * FROM jogadores WHERE selecao = 'Brasil' ORDER BY nome");
    res.json(resultado.rows);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: 'Erro ao buscar jogadores' });
  }
});

app.get('/jogos', async (req, res) => {
  try {
    const resultado = await pool.query('SELECT * FROM jogos ORDER BY data_jogo');
    res.json(resultado.rows);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: 'Erro ao buscar jogos' });
  }
});

app.get('/eventos', async (req, res) => {
  try {
    const resultado = await pool.query(`
      SELECT 
        eventos.id,
        eventos.tipo,
        eventos.minuto,
        jogadores.nome AS jogador,
        jogadores.selecao,
        jogos.id AS jogo_id,
        jogos.adversario,
        jogos.competicao
      FROM eventos
      JOIN jogadores ON eventos.jogador_id = jogadores.id
      JOIN jogos ON eventos.jogo_id = jogos.id
      ORDER BY jogos.data_jogo, eventos.minuto
    `);
    res.json(resultado.rows);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: 'Erro ao buscar eventos' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});