CREATE TABLE jogadores (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    posicao VARCHAR(50) NOT NULL,
    clube VARCHAR(100) NOT NULL
);

CREATE TABLE jogos (
    id SERIAL PRIMARY KEY,
    adversario VARCHAR(100) NOT NULL,
    competicao VARCHAR(100) NOT NULL,
    data_jogo DATE NOT NULL,
    gols_brasil INTEGER NOT NULL,
    gols_adversario INTEGER NOT NULL,
    estadio VARCHAR(100)
);

CREATE TABLE eventos (
    id SERIAL PRIMARY KEY,
    jogo_id INTEGER NOT NULL,
    jogador_id INTEGER NOT NULL,
    tipo VARCHAR(30) NOT NULL,
    minuto INTEGER NOT NULL,
    CONSTRAINT eventos_jogo_fkey FOREIGN KEY (jogo_id) REFERENCES jogos (id),
    CONSTRAINT eventos_jogador_fkey FOREIGN KEY (jogador_id) REFERENCES jogadores (id)
);

INSERT INTO jogadores (nome, posicao, clube) VALUES
('Alisson', 'Goleiro', 'Liverpool'),
('Ederson', 'Goleiro', 'Manchester City'),
('Weverton', 'Goleiro', 'Palmeiras'),
('Alex Sandro', 'Lateral', 'Juventus'),
('Alex Telles', 'Lateral', 'Sevilla'),
('Bremer', 'Zagueiro', 'Juventus'),
('Daniel Alves', 'Lateral', 'Pumas'),
('Danilo', 'Lateral', 'Juventus'),
('Éder Militão', 'Zagueiro', 'Real Madrid'),
('Marquinhos', 'Zagueiro', 'Paris Saint-Germain'),
('Thiago Silva', 'Zagueiro', 'Chelsea'),
('Bruno Guimarães', 'Meio-campo', 'Newcastle'),
('Casemiro', 'Meio-campo', 'Manchester United'),
('Everton Ribeiro', 'Meio-campo', 'Flamengo'),
('Fabinho', 'Meio-campo', 'Liverpool'),
('Fred', 'Meio-campo', 'Manchester United'),
('Lucas Paquetá', 'Meio-campo', 'West Ham'),
('Antony', 'Atacante', 'Manchester United'),
('Gabriel Jesus', 'Atacante', 'Arsenal'),
('Gabriel Martinelli', 'Atacante', 'Arsenal'),
('Neymar', 'Atacante', 'Paris Saint-Germain'),
('Pedro', 'Atacante', 'Flamengo'),
('Raphinha', 'Atacante', 'Barcelona'),
('Richarlison', 'Atacante', 'Tottenham'),
('Rodrygo', 'Atacante', 'Real Madrid'),
('Vinícius Júnior', 'Atacante', 'Real Madrid');

INSERT INTO jogos (adversario, competicao, data_jogo, gols_brasil, gols_adversario, estadio) VALUES
('Paraguai', 'Eliminatórias 2022', '2021-06-08', 2, 0, 'Defensores del Chaco'),
('Coreia do Sul', 'Amistoso', '2022-06-02', 5, 1, 'Seoul World Cup Stadium'),
('Japão', 'Amistoso', '2022-06-06', 1, 0, 'Japan National Stadium'),
('Gana', 'Amistoso', '2022-09-23', 3, 0, 'Stade Oceane'),
('Tunísia', 'Amistoso', '2022-09-27', 5, 1, 'Parc des Princes'),
('Sérvia', 'Copa do Mundo - Fase de Grupos', '2022-11-24', 2, 0, 'Lusail Stadium'),
('Suíça', 'Copa do Mundo - Fase de Grupos', '2022-11-28', 1, 0, 'Estádio 974'),
('Camarões', 'Copa do Mundo - Fase de Grupos', '2022-12-02', 0, 1, 'Lusail Stadium'),
('Coreia do Sul', 'Copa do Mundo - Oitavas de Final', '2022-12-05', 4, 1, 'Estádio 974'),
('Croácia', 'Copa do Mundo - Quartas de Final', '2022-12-09', 1, 1, 'Estádio Cidade da Educação');

INSERT INTO eventos (jogo_id, jogador_id, tipo, minuto) VALUES
(6, (SELECT id FROM jogadores WHERE nome = 'Richarlison'), 'Gol', 62),
(6, (SELECT id FROM jogadores WHERE nome = 'Vinícius Júnior'), 'Assistência', 62),
(6, (SELECT id FROM jogadores WHERE nome = 'Richarlison'), 'Gol', 74),
(6, (SELECT id FROM jogadores WHERE nome = 'Vinícius Júnior'), 'Assistência', 74);

INSERT INTO eventos (jogo_id, jogador_id, tipo, minuto) VALUES
(7, (SELECT id FROM jogadores WHERE nome = 'Casemiro'), 'Gol', 83);

INSERT INTO eventos (jogo_id, jogador_id, tipo, minuto) VALUES
(9, (SELECT id FROM jogadores WHERE nome = 'Vinícius Júnior'), 'Gol', 7),
(9, (SELECT id FROM jogadores WHERE nome = 'Raphinha'), 'Assistência', 7),
(9, (SELECT id FROM jogadores WHERE nome = 'Neymar'), 'Gol (pênalti)', 13),
(9, (SELECT id FROM jogadores WHERE nome = 'Richarlison'), 'Gol', 29),
(9, (SELECT id FROM jogadores WHERE nome = 'Thiago Silva'), 'Assistência', 29),
(9, (SELECT id FROM jogadores WHERE nome = 'Lucas Paquetá'), 'Gol', 36),
(9, (SELECT id FROM jogadores WHERE nome = 'Vinícius Júnior'), 'Assistência', 36);

INSERT INTO eventos (jogo_id, jogador_id, tipo, minuto) VALUES
(10, (SELECT id FROM jogadores WHERE nome = 'Neymar'), 'Gol', 105);