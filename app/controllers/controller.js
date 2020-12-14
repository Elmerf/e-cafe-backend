'use strict';

const response = require('./res');
const connection = require('../config/db');

exports.favoritedMenus = function(req, res) {
    connection.query('SELECT * FROM menu WHERE favorited = 1 ORDER BY id_kategori', function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok(rows, res)
        }
    });
};

exports.allMenu = function(req, res) {
    connection.query(`
                SELECT *, nama_kategori 
                FROM menu
                INNER JOIN kategori
                ON menu.id_kategori = kategori.id_kategori`, function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok(rows, res)
        }
    });
};

exports.index = function(req, res) {
    response.ok("Hello from the Node JS RESTful side!", res)
};