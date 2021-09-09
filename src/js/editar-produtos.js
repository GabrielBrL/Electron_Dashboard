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

window.onload = () => {
    
    carregaForm();

    btnSalvar.addEventListener('click', function () {
        if (dados.atualizaDados(93, inputNomeProd, inputPreco, selectStatus, selectPagamento))
            montaAlerta(inputNomeProd);
        console.log(inputNomeProd.value);
    });

    btnFechar.addEventListener('click', function () {
        ipcRenderer.send('fechar-editar-produto');
    });
}

function carregaForm(id){
    inputNomeProd.value = id;
}

function montaAlerta(nomeProduto) {
    new Notification('Dashboard', {
        body: `O produto ${nomeProduto.value} foi alterado!`,
        icon: '../img/user.jpg'
    });
}

module.exports = {
    carregaForm
}