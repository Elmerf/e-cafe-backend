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

exports.addPemesan = function(req, res) {
    let pemesan = req.body.pemesan;
    let no_meja = req.body.no_meja;
 
    connection.query(`INSERT INTO meja (no_meja, waktu_pesan, atas_nama) 
        VALUES (${no_meja}, CURRENT_TIMESTAMP(), '${pemesan}')`, 
    function (error, rows, fields) {
        if(error){
            console.log(error);
        } else{
            response.ok("Berhasil menambahkan pemesan!", res);
        }
    });
};

exports.addData = function(req, res) {
    let id_pesanan = parseInt(req.body.id_pesanan);
    let no_meja = req.body.no_meja;
    let total_pesanan = req.body.total_pesanan;
    let status = req.body.status;
    let pesanan = req.body.pesanan;

    connection.query(`INSERT INTO pesanan (id_pesanan, no_meja, total_pesanan, status) 
        VALUES (${id_pesanan}, ${no_meja}, ${total_pesanan}, ${status})`, 
    function (error, rows, fields) {
        if(error){
            console.log(error);
        } else{
            addItem(id_pesanan, pesanan, res);
        }
    });
};

function addItem(id_pesanan, pesanan, res) {
    let values = [];

    for(let i = 0; i < pesanan.length; i++) {
        values[i] = [
            id_pesanan,
            null,
            parseInt(pesanan[i].id),
            parseInt(pesanan[i].jumlah),
            parseInt(pesanan[i].totalHarga)
        ];
    }
    connection.query(`INSERT INTO transaksi 
        (id_pesanan, id_item, id_menu, jumlah_pesan, total) VALUES ?`, 
        [values],
    function (error, rows, fields) {
        if(error){
            console.log(error);
        } else{
            response.ok("Transaksi Berhasil!", res)
        }
    });
}

exports.index = function(req, res) {
    response.ok("Hello from the Node JS RESTful side!", res)
};