class PessoalModel{
    constructor({id, nome, altura, profissao, idade, cidade}){
        this.id = id;
        this.nome = nome;
        this.altura = altura;
        this.profissao = profissao;
        this.idade = idade;
        this.cidade = cidade;
    }
}

module.exports = PessoalModel;