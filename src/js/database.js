const mysql = require('mysql');

let con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Gabriel3456',
    database: 'dashboard'
});

function getConnection(){
    return con;
}

module.exports = {getConnection};