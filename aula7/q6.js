class DescontoService {
    calcular(valor){
        return valor * 0.9;
    }
}

class FreteService {

    calcular() {
        return 20; 
    }
}

class Carrinho {
    constructor(descontoService, freteService) {
        this.descontoService = descontoService;
        this.freteService = freteService;
        this.itens = [];
    }
     adicionarItem(nome, preco) {
        this.itens.push({ nome, preco });
    }

    calcularTotal() {

        // Soma dos itens
        var total = this.itens.reduce((soma, item) => soma + item.preco, 0);

        // Aplica desconto (delegando responsabilidade)
        const totalComDesconto = this.descontoService.calcular(total);

        // Adiciona frete
        total += this.freteService.calcular();

        return total;
    }

}

const desconto = new DescontoService();
const frete = new FreteService();

const carrinho = new Carrinho(desconto, frete);

carrinho.adicionarItem('Produto A', 100);
carrinho.adicionarItem('Produto B', 50);

console.log(`Total do carrinho: R$ ${carrinho.calcularTotal()}`);