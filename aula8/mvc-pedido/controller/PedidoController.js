const PedidoModel = require('../model/PedidoModel');

class PedidoController{
    constructor(view){
        this.view = view
        this.pedidos = [];
    }

    criar(req){
        try{
            const pedido = new PedidoModel(req.cliente);

            if (!req.cliente){
                throw new Error('Cliente é obrigatório');
            }

            this.pedidos.push(pedido);

            return this.view.sucesso(pedido);

        } catch (e) {
            return this.view.erro(e.message);
        }
    }

    adicionarItem(req){
        try{
            const pedido = this.pedidos.find(p => p.id === req.id);
            if (!pedido){
                throw new Error('Pedido não encontrado');
            }

            pedido.adicionarItem(req.nome, req.preco);
            return this.view.sucesso(pedido);
        } catch(error){
            return this.view.erro('Erro ao adicionar item: ' + error.message);
        }
    }
    total(id) {
        const pedido = this.pedidos.find(p => p.id === id);

        if (!pedido) {
            return this.view.erro('Pedido não encontrado');
        }

        return this.view.sucesso({
            total: pedido.calcularTotal()
        });
    }
}

module.exports = PedidoController;