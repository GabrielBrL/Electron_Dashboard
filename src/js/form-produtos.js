const {
    ipcRenderer
} = require('electron');
const dados = require('./dados-produtos');

let btnFechar = document.querySelector('#btnFechar');

let inputNomeProd = document.querySelector('#inputNomeProd');
let inputPreco = document.querySelector('#inputPreco');
let selectStatus = document.querySelector('#selectStatus');
let selectPagamento = document.querySelector('#selectPagamento');
let btnSalvar = document.querySelector('#btnSalvar');

btnSalvar.addEventListener('click', function () {
    if (dados.salvarDados(inputNomeProd, inputPreco, selectStatus, selectPagamento)) {
        montaAlerta(inputNomeProd);
    }
});

function montaAlerta(nomeProduto) {
    new Notification('Dashboard', {
        body: `O produto ${nomeProduto.value} foi adicionado!`,
        icon: '../img/user.jpg'
    });
}

btnFechar.addEventListener('click', function () {
    ipcRenderer.send('fechar-form-produto');
});