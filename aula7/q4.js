class Produto {
    constructor(nome, preco, estoque) {
        this.nome = nome;
        this.preco = preco;
        this.estoque = estoque;
    }

    vender(quantidade){
           if (quantidade > this.estoque) {
            console.log('❌ Estoque insuficiente');
            return 0;
        }
        this.estoque -= quantidade;
        console.log(`✅ Vendido ${quantidade} unidades de ${this.nome}`);
        return quantidade * this.preco;
    }
    repor(quantidade){
        this.estoque += quantidade;
        console.log(`✅ Reposto ${quantidade} unidades de ${this.nome}`);
    }

    exibir(){
        console.log(`Produto: ${this.nome}`);
        console.log(`Preço: R$ ${this.preco.toFixed(2)}`);
        console.log(`Estoque: ${this.estoque} unidades`);
    }
}

const produto = new Produto('Camiseta', 49.99, 100);
produto.exibir();
produto.vender(20);
produto.exibir();
produto.repor(50);
produto.exibir();