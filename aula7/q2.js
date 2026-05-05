class Funcionario {
    constructor(nome, salario) {
        this.nome = nome;
        this.salario = salario;
    }   

    exibirDados() {
        return {
            nome: this.nome,
            salario: this.salario
        };
    }
}

class Desenvolvedor extends Funcionario {
    constructor(nome, salario, linguagem) {
        super(nome, salario);
        this.linguagem = linguagem;
    }

    exibirDados() {
        const dadosBase = super.exibirDados();
        return {
            ...dadosBase,
            linguagem: this.linguagem
        };
    }

    programar() {
        return `${this.nome} está programando em ${this.linguagem}.`;
    }
}

const dev1 = new Desenvolvedor("Maria", 5000, "JavaScript");
console.log(dev1.exibirDados());
console.log(dev1.programar());