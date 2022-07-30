#!/usr/bin/env node
const { render } = require('ejs');
const mysql = require('mysql');

const conection = mysql.createConnection({
    host: process.env.DB_HOTS,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

conection.connect( error => {
    if(error) {
        console.log('wrong connection');
    } else {
        console.log('successful connection');
    }
    
});

module.exports = conection;
