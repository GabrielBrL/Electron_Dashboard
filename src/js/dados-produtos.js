const {
    getConnection
} = require('./database');
const {
    ipcRenderer
} = require('electron');
const conn = getConnection();


module.exports = {
    salvarDados(nomeProduto, precoProduto, statusPedido, statusPagamento) {
        if (this.validadeDados(nomeProduto, precoProduto, statusPedido, statusPagamento)) {
            conn.connect(function (err) {
                if (err) throw err;
                let sql = "INSERT INTO produtos (nome_produto,preco_produto,status_pedido,status_pagamento) VALUES (?,?,?,?)";
                conn.query(sql, [nomeProduto.value, precoProduto.value, statusPedido.value, statusPagamento.value], function (erro, result) {
                    if (erro) throw erro;
                    nomeProduto.value = '';
                    precoProduto.value = '';
                });
            })
            this.mostrarDados();
            return true;
        }
    },
    atualizaDados(id, nomeProdutoNovo, precoProdutoNovo, statusPedidoNovo, statusPagamentoNovo){
        if(this.validadeDados(nomeProdutoNovo, precoProdutoNovo, statusPedidoNovo, statusPagamentoNovo)){
            conn.connect(function(erro){
                if(erro) throw erro;
                let sql = `UPDATE produtos SET 
                nome_produto='${nomeProdutoNovo.value}'
                ,preco_produto=${precoProdutoNovo.value}
                ,status_pedido='${statusPedidoNovo.value}'
                ,status_pagamento='${statusPagamentoNovo.value}'
                WHERE id=${id}`;
                conn.query(sql, function(erro, result){
                    console.log(result);
                });
                console.log(sql);
            })
            this.mostrarDados();
            return true;
        }
    },
    validadeDados(nomeProduto, precoProduto, statusPedido, statusPagamento) {
        if (nomeProduto.value == "" || precoProduto.value <= 0) {
            alert('Preencha os campos corretamente!');
            return false;
        }
        if (confirm('Deseja inserir?\n' + nomeProduto.value + ' com preço: R$' + precoProduto.value + '\nCom as categorias: ' + statusPagamento.value + ' e ' + statusPedido.value)) {
            return true;
        }
    },
    mostrarDados() {
        ipcRenderer.send('atualiza-tabela');
    }
}