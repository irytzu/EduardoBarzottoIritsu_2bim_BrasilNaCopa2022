const express = require("express");
const cors = require("cors");
const db = require("./db");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "../public")));

app.get("/jogadores", async (req, res) => {
    try {
        const resultado = await db.query(
            "SELECT * FROM jogadores ORDER BY id"
        );

        res.json(resultado.rows);

    } catch (erro) {
        console.log(erro);
        res.status(500).json({ erro: "Erro no servidor" });
    }
});

app.post("/jogadores", async (req, res) => {

    const { nome, posicao, clube } = req.body;

    try {

        await db.query(
            "INSERT INTO jogadores(nome,posicao,clube) VALUES($1,$2,$3)",
            [nome, posicao, clube]
        );

        res.json({ mensagem: "Jogador cadastrado!" });

    } catch (erro) {

        console.log(erro);

        res.status(500).json({ erro: "Erro ao cadastrar" });

    }

});

app.put("/jogadores/:id", async (req, res) => {

    const { nome, posicao, clube } = req.body;

    try {

        await db.query(

            "UPDATE jogadores SET nome=$1,posicao=$2,clube=$3 WHERE id=$4",

            [nome, posicao, clube, req.params.id]

        );

        res.json({ mensagem: "Jogador atualizado!" });

    } catch (erro) {

        console.log(erro);

        res.status(500).json({ erro: "Erro ao atualizar" });

    }

});

app.delete("/jogadores/:id", async (req, res) => {

    try {

        await db.query(

            "DELETE FROM jogadores WHERE id=$1",

            [req.params.id]

        );

        res.json({ mensagem: "Jogador removido!" });

    } catch (erro) {

        console.log(erro);

        res.status(500).json({ erro: "Erro ao excluir" });

    }

});

app.listen(3000, () => {

    console.log("Servidor rodando em http://localhost:3000");

});