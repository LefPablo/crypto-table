var ObjectID = require('mongodb').ObjectID;
var db = require('../db');

exports.all = function (cb) {
    db.get().collection('rates').find().toArray(function (err, docs) {
        cb (err, docs);
    })
}

exports.symbols = function (cb) {
    db.get().collection('symbols').find().toArray(function (err, docs) {
        cb (err, docs);
    })
}

exports.findById = function (id, cb) {
    db.get().collection('rates').findOne({_id: ObjectID(id)}, function (err, doc) {
        cb(err, doc);
    })
}

exports.create = function (rate,cb) {
    db.get().collection('rates').insertOne(rate, function (err, result) {
        cb(err, result);
    })
    symbol = {id_rate: rate._id,
        last: rate.last};
    db.get().collection('symbols').updateOne(
        { _id: rate.symbol },
        { $set: symbol}
        )
}
exports.update = function (id, newData, cb) {
    db.get().collection('rates').update(
        { _id: ObjectID(id) },
        newData,
        function (err, result) {
            cb(err, result);
        })
}

exports.delete = function(id, cb) {
    db.get().collection('rates').deleteOne(
        { _id: ObjectID(id) },
        function (err, result) {
            cb(err, result);
        })
}

exports.deleteAll = function(cb) {
    db.get().collection('rates').remove(
        {},
        function (err, result) {
            cb(err, result);
        })
}

exports.deleteAllsymbols = function(cb) {
    db.get().collection('symbols').remove(
        {},
        function (err, result) {
            cb(err, result);
        })
}