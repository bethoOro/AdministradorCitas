#!/usr/bin/env node
const { render } = require('ejs');
const mysql = require('mysql');

const conection = mysql.createConnection({
    host: 'b23lgb2aamwa1srfmh2u-mysql.services.clever-cloud.com',
    user: 'uer7jbbksd4ua6ca',
    password: 'kldJ26RxsF9l39gvZTfH',
    database: 'b23lgb2aamwa1srfmh2u'
});

conection.connect( error => {
    if(error) {
        console.log('wrong connection');
    } else {
        console.log('successful connection');
    }
    
});

module.exports = conection;
