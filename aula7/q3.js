class Notificacao{
    enviar(){
        console.log("Notificação enviada");
    }
}

class Email extends Notificacao{
    enviar(){
        console.log("Email enviado");
    }
}

class SMS extends Notificacao{
    enviar(){
        console.log("SMS enviado");
    } 
}

class Push extends Notificacao{
    enviar(){
        console.log("Push enviado");
    }
}

const notificacoes = [
    new Email(),
    new SMS(),
    new Push()
];

notificacoes.forEach(notificacao => 
    notificacao.enviar()
);