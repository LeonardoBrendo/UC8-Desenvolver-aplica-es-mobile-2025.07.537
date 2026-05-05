class Item{
    constructor(nome, preco, quantidade){
        this.nome = nome;
        this.preco = preco;
        this.quantidade = quantidade;
    }
     calcularSubtotal() {
        return this.preco * this.quantidade;
    }
}

class Pedido{
    constructor(cliente){
        this.cliente = cliente;
        this.itens = [];
    }
    adicionarItem(item) {
        this.itens.push(item);
    }

    // Calcula total do pedido
    calcularTotal() {
        return this.itens.reduce((total, item) => {
            return total + item.calcularSubtotal();
        }, 0);
    }
    exibirResumo() {
        console.log(`Cliente: ${this.cliente}`);
        console.log('Itens:');

        this.itens.forEach(item => {
            console.log(`- ${item.nome} (${item.quantidade}x)`);
        });

        console.log(`Total: R$ ${this.calcularTotal()}`);
    }
}

const item1 = new Item('Mouse', 50, 2);
const item2 = new Item('Teclado', 120, 1);

const pedido = new Pedido('João');

pedido.adicionarItem(item1);
pedido.adicionarItem(item2);
pedido.exibirResumo();