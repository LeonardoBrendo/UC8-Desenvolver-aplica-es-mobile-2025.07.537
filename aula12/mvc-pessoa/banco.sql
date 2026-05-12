CREATE TABLE pessoa(
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    altura DECIMAL(4, 2),
    profissao VARCHAR(100),
    idade INTEGER,
    cidade VARCHAR(100)
);