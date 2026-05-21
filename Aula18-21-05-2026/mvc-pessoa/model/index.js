// ============================================================
// model/index.js — registra os models e define as associações
// ============================================================
// Este arquivo é o ponto central dos models.
// Sempre importe { Pessoa, Carro } daqui — nunca diretamente
// dos arquivos PessoaModel.js / CarroModel.js — pois as
// associações só ficam definidas depois que este index é carregado.

const Pessoa = require('./PessoaModel');
const Carro  = require('./CarroModel');

// ─── Associações (relacionamento 1:N) ────────────────────────
//
// hasMany → "Pessoa TEM MUITOS Carros"
//   Adiciona o método pessoa.getCarros() e permite include: [{ model: Carro }]
//   foreignKey: nome da chave estrangeira na tabela carro
//   as: apelido usado no include (ex: include: [{ model: Carro, as: 'carros' }])
Pessoa.hasMany(Carro, { foreignKey: 'pessoaId', as: 'carros' });

// belongsTo → "Carro PERTENCE A uma Pessoa"
//   Adiciona o método carro.getPessoa() e permite include: [{ model: Pessoa }]
//   Ambos os lados precisam ser declarados para que o JOIN funcione nos dois sentidos
Carro.belongsTo(Pessoa, { foreignKey: 'pessoaId', as: 'pessoa' });

module.exports = { Pessoa, Carro };
