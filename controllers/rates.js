var Rates = require('../models/rates');

exports.all = function (req, res) {
    Rates.all(function (err, docs) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(docs);
    })
}

exports.symbols = function (req, res) {
    Rates.symbols(function (err, docs) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(docs);
    })
}

exports.findById = function (req, res) {
    Rates.findById(req.params.id, function (err, doc) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(doc);
    })
}

exports.create = function (req, res) {
    console.log(req.body);
    var artist = {
        last: req.body.rate,
        timestamp: new Date().toISOString(),
        symbol: req.body.symbol,
        id_user: req.session.id
    };
    Rates.create(artist, function (err, result) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        console.log(200);
    })
}

exports.update = function (req, res) {
    Rates.update(req.params.id, { name: req.body.name }, function (err, result) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.sendStatus(200);
    })
}

exports.delete = function (req, res) {
    Rates.delete(req.params.id, function (err, result) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.sendStatus(200);
    })
}

exports.deleteAll = function (req, res) {
    Rates.deleteAll(function (err, result) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.sendStatus(200);
    })
}

exports.deleteAllsymbols = function (req, res) {
    Rates.deleteAllsymbols(function (err, result) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.sendStatus(200);
    })
}