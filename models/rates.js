const ObjectID = require('mongodb').ObjectID;
const db = require('../db');

exports.table = function (cb) {
    db.get().collection('symbols').find().toArray(function (err, docs) {
        var a = [];
        a = docs;
        createTable(a);
    });

    var table = [];
    function createTable(a) {
        a.forEach( function(symbol)  {
            db.get().collection('rates').find({symbol: symbol['symbol']}).sort({ $natural: -1 }).limit(1).toArray(function (err,doc) {
                symbol['last'] = doc[0]['last'];
                table.push(symbol);
                if (a.length == table.length) {
                    viewTable(err, table);
                }
            });
        });
    }

    function viewTable(err, table) {
        cb(err, table);
    }
};

exports.rates = function (cb) {
    db.get().collection('rates').find().toArray(function (err, docs) {
        cb (err, docs);
    })
};

exports.symbols = function (cb) {
    db.get().collection('symbols').find().toArray(function (err, docs) {
        cb (err, docs);
    })
};

exports.create = function (rate,cb) {
    db.get().collection('rates').insertOne(rate, function (err, result) {
        cb(err, result);
    });
    symbol = {id_rate: rate._id,
        last: rate.last};
    db.get().collection('symbols').updateOne(
        { _id: rate.symbol },
        { $set: symbol}
        )
};
exports.update = function (id, newData, cb) {
    db.get().collection('rates').update(
        { _id: ObjectID(id) },
        newData,
        function (err, result) {
            cb(err, result);
        })
};

exports.delete = function(id, cb) {
    db.get().collection('rates').deleteOne(
        { _id: ObjectID(id) },
        function (err, result) {
            cb(err, result);
        })
};

exports.deleteAllRates = function(cb) {
    db.get().collection('rates').remove(
        {},
        function (err, result) {
            cb(err, result);
        })
};

exports.deleteAllSymbols = function(cb) {
    db.get().collection('symbols').remove(
        {},
        function (err, result) {
            cb(err, result);
        })
};