create database dashboard;
use dashboard;

create table produtos
(
	id int not null auto_increment,
    nome_produto varchar(255) not null,
    preco_produto decimal(10,2) not null,
    status_pedido varchar(20) not null,
    status_pagamento varchar(20) not null,
    constraint pk_produto primary key (id)
);