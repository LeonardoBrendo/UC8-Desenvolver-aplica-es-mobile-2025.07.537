class PedidoView {

    sucesso(dados) {
        return { status: 200, data: dados };
    }

    erro(msg) {
        return { status: 400, erro: msg };
    }
}

module.exports = PedidoView;