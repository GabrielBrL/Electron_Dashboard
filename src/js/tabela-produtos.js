const {ipcRenderer} = require('electron')
const {
    getConnection
} = require('./database');
const conn = getConnection();

function montaTabela(tabela, resultado) {
    for (var i = 0; i < resultado.length; i++) {
        let tbody = document.createElement('tbody');
        let tr = document.createElement('tr');
        let tdNomeProd = document.createElement('td');
        let tdPrecoProd = document.createElement('td');
        let tdStatusPag = document.createElement('td');
        let tdPed = document.createElement('td');
        let spanStatusPed = document.createElement('span');
        let id = resultado[i].id;
        tr.addEventListener('dblclick', function () {
            deletarDadoTabela(this, id)
        })
        tr.addEventListener('contextmenu', function(){
            ipcRenderer.send('abrir-editar-produto', resultado)
        })
        tdNomeProd.textContent = resultado[i].nome_produto;
        tdPrecoProd.textContent = 'R$' + resultado[i].preco_produto.toFixed(2);
        tdStatusPag.textContent = resultado[i].status_pagamento;
        spanStatusPed.textContent = resultado[i].status_pedido;
        spanStatusPed.className = "status " + resultado[i].status_pedido;
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

function mostrarPrecoTotal(inputPreco, result) {
    let precoTotal = 0;
    for (var i = 0; i < result.length; i++) {
        precoTotal += result[i].preco_produto
    }
    inputPreco.textContent = "R$" + precoTotal.toFixed(2);

}

function deletarDadoTabela(linha, id) {
    if (confirm("Deseja deletar?"))
        document.querySelector('#tabelaProdutos').deleteRow(linha.rowIndex);
    let sql = 'DELETE FROM produtos WHERE id = '+id;
    conn.query(sql, function (erro, result) {
        if (erro) throw erro;
        montaTabela(tabelaProdutos, result);
    })
}

module.exports = {
    montaTabela,
    mostrarPrecoTotal
}