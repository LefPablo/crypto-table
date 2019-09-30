const Rates = require('../models/rates');

exports.table = function (req, res) {
    Rates.table(function (err, docs) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(docs);
    })
};

exports.rates = function (req, res) {
    Rates.rates(function (err, docs) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(docs);
    })
};

exports.symbols = function (req, res) {
    Rates.symbols(function (err, docs) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(docs);
    })
};

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
        res.sendStatus(200);
    })
};

exports.update = function (req, res) {
    Rates.update(req.params.id, { name: req.body.name }, function (err, result) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.sendStatus(200);
    })
};

exports.delete = function (req, res) {
    Rates.delete(req.params.id, function (err, result) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.sendStatus(200);
    })
};

exports.deleteAllRates = function (req, res) {
    Rates.deleteAllRates(function (err, result) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.sendStatus(200);
    })
};

exports.deleteAllSymbols = function (req, res) {
    Rates.deleteAllSymbols(function (err, result) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.sendStatus(200);
    })
};