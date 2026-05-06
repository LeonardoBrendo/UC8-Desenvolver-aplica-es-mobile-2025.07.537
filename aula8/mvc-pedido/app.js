const PedidoView = require('./view/PedidoView');
const PedidoController = require('./controller/PedidoController');

const controller = new PedidoController(new PedidoView());

const res = controller.criar({ cliente: 'João' });
console.log(res);

const id = res.data.id;

controller.adicionarItem({ id, item: 'Produto A', preco: 100 });
controller.adicionarItem({ id, item: 'Produto B', preco: 50 });

console.log(controller.total(id));