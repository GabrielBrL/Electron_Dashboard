const {
    ipcRenderer
} = require('electron');
const {
    getConnection
} = require('./database');

const conn = getConnection();

let formProduto = document.querySelector('#formProduto');
let tabelaProdutos = document.querySelector('#tabelaProdutos');

window.onload = (event) => {
    conn.connect(function (erro) {
        if (erro) throw erro;
        console.log('conectado!');
        let sql = 'SELECT * FROM produtos';
        conn.query(sql, function (erro, result) {
            if (erro) throw erro;
            montaTabela(tabelaProdutos, result);
        })
    })
}

function montaTabela(tabela, resultado) {
    for (var i = 0; i < resultado.length; i++) {
        let tbody = document.createElement('tbody');
        let tr = document.createElement('tr');
        let tdNomeProd = document.createElement('td');
        let tdPrecoProd = document.createElement('td');
        let tdStatusPag = document.createElement('td');
        let tdPed = document.createElement('td');
        let spanStatusPed = document.createElement('span');
        tdNomeProd.textContent = resultado[i].nome_produto;
        tdPrecoProd.textContent = 'R$'+resultado[i].preco_produto.toFixed(2);
        tdStatusPag.textContent = resultado[i].status_pagamento;
        spanStatusPed.textContent = resultado[i].status_pedido;
        spanStatusPed.className = "status "+resultado[i].status_pedido;
        tr.appendChild(tdNomeProd);
        tr.appendChild(tdPrecoProd);
        tr.appendChild(tdStatusPag);
        tdPed.append(spanStatusPed);
        tr.appendChild(tdPed);
        tbody.appendChild(tr);
        tabela.appendChild(tbody);
    }
    return tabela;
}

formProduto.addEventListener('click', function () {
    ipcRenderer.send('abrir-form-produto');
});

module.exports = {
    atualizaTabela(){
        
    }
}