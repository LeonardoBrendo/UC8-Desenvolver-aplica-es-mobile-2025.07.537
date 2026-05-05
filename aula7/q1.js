

class Usuario{
    constructor(nome, email, senha){
        this.nome = nome;
        this.email = email;
        this._senha = senha;
    }

    validarsenha(senhaDigitada){
        return this._senha === senhaDigitada;
    }

    exibirDados(){
        return {
            nome: this.nome,
            email: this.email
        };
    }
}

const usuario1 = new Usuario("João", "joao@email.com", "123456");
console.log(usuario1.exibirDados()); // { nome: 'João', email: 'joao@email.com' }
console.log(usuario1.validarsenha("123456")); // true
console.log(usuario1.validarsenha("654321")); // false

console.log(usuario1._senha); // Acesso direto à senha (não recomendado)