const express = require('express');
const pool = require('./db');

const app = express();
app.use(express.static('public'));
app.use(express.json());

const PORT = 3000;

app.get('/', (req, res) => {
  res.send('API funcionando!');
});

app.get('/teste-bd', async (req, res) => {
  try {
    const resultado = await pool.query('SELECT NOW()');
    res.json(resultado.rows[0]);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: 'Erro ao conectar no banco' });
  }
});

app.get('/jogadores', async (req, res) => {
  try {
    const resultado = await pool.query('SELECT * FROM jogadores');
    res.json(resultado.rows);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: 'Erro ao buscar jogadores' });
  }
});


app.get('/jogos', async (req, res) => {
  try {
    const resultado = await pool.query('SELECT * FROM jogos');
    res.json(resultado.rows);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: 'Erro ao buscar jogos' });
  }
});


app.get('/estatisticas', async (req, res) => {
  try {
    const resultado = await pool.query(`
      SELECT estatisticas.id, jogadores.nome, estatisticas.jogos, estatisticas.gols
      FROM estatisticas
      JOIN jogadores ON estatisticas.jogador_id = jogadores.id
    `);
    res.json(resultado.rows);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: 'Erro ao buscar estatisticas' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});