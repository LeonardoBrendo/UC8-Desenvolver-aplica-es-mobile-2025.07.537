class PedidoModel{
    constructor(cliente){
        this.clientes = cliente;
        this.itens = [];
        this.id = Date.now();
    }

    adicionarItem(nome, preco) {
        this.itens.push({ nome, preco });
    }

    calcularTotal() {
        return this.itens.reduce((t, i) => t + i.preco, 0);
    }
}

module.exports = PedidoModel;