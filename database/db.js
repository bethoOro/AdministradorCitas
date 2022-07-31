#!/usr/bin/env node
const { render } = require('ejs');
const mysql = require('mysql');

const conection = mysql.createConnection({
    host: 'mysql-citaveterinario.alwaysdata.net',
    user: '275806',
    password: 'beto251102',
    database: 'citaveterinario_veterinario'
});


    conection.connect( error => {
        if(error) {
            console.log('wrong connection');
        } else {
            console.log('successful connection');
        }
        
    });

module.exports = conection;
