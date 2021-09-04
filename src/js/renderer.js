const {
    ipcRenderer
} = require('electron');
const {
    getConnection
} = require('./database');
const {
    montaTabela,
    mostrarPrecoTotal
} = require('./tabela-produtos');

const conn = getConnection();

let formProduto = document.querySelector('#formProduto');
let tabelaProdutos = document.querySelector('#tabelaProdutos');
let precoTotal = document.querySelector('#precoTotal');
let numVendas = document.querySelector('#numVendas');

window.onload = (event) => {
    conn.connect(function (erro) {
        if (erro) throw erro;
        console.log('conectado!');
        let sql = 'SELECT * FROM produtos LIMIT 12';
        conn.query(sql, function (erro, result) {
            if (erro) throw erro;
            montaTabela(tabelaProdutos, result);
        })
        conn.query("SELECT * FROM produtos WHERE status_pedido != 'cancelado'", function (erro, result) {
            if (erro) throw erro;
            mostrarPrecoTotal(precoTotal, result);
            numVendas.textContent = result.length;
        })
    })
}

formProduto.addEventListener('click', function () {
    ipcRenderer.send('abrir-form-produto');
});