var MongoClient = require('mongodb').MongoClient;
var https = require('https');

var db;

const options = {
    hostname: 'api.hitbtc.com',
    port: 443,
    path: '/api/2/public/ticker',
    method: 'GET'
};

url = 'mongodb://localhost:27017/myapi';

MongoClient.connect(url, { useNewUrlParser: true , useUnifiedTopology: true }, function (err,database) {
    if (err) {
        console.log(err);
    }
    console.log('Connect db!');
    db = database.db('myapi');

    var a = [];
    var str = '';

    const req = https.request(options, (res) => {
        console.log(`statusCode: ${res.statusCode}`);
        res.on('data', function (d) {
            process.stdout.write(d);
            str += d;
        });
        res.on('end', function (d) {
            console.log('\nResponse ENDED\n');
            a = JSON.parse(str);
            db.collection('symbols').deleteMany(
                {}, function (err, result) {
                    if (err) {
                        console.log(err);
                    }
                });
            a.forEach(function (json) {
                var rate = {
                    last: json['last'],
                    timestamp: json['timestamp'],
                    symbol: json['symbol']
                };
                db.collection('rates').insertOne(rate, function (err, result) {
                    if (err) {
                        console.log(err);
                    }
                });
                var currency = {
                    symbol: json['symbol'],
                };
                // var currency = {
                //     _id: json['symbol'],
                //     id_rate: rate._id,
                //     last: json['last']
                // };
                db.collection('symbols').insertOne(currency, function (err, result) {
                    if (err) {
                        console.log(err);
                    }
                });
            });
            console.log('Rates update end');
            console.log('Symbol update end');
            database.close();
        });
    });

    req.on('error', (error) => {
        console.error(error);
    });
    req.end()
});


// var a = []
// var str = ''
//
// const req = https.request(options, (res) => {
//     console.log(`statusCode: ${res.statusCode}`)
//     res.on('data', function (d) {
//         process.stdout.write(d);
//         str += d;
//     });
//     res.on('end', function (d) {
//         console.log('\nResponse ENDED\n');
//         a = JSON.parse(str)
//         rates = []
//         a.forEach(function (json) {
//             var rate = {
//                 last: json['last'],
//                 timestamp: json['timestamp']
//             }
//             rates.push(rate);
//             var currency = {
//                 symbol: json['symbol']
//             }
//              // console.log(json['last'])
//              // console.log(json['timestamp'])
//              // console.log(json['symbol'])
//              // console.log()
//         })
//         db.collection('artists').insertMany(rates, function (err, result) {
//             if (err) {
//                 console.log(err);
//             }
//             console.log('Update successful!');
//         })
//     });
// })

// req.on('error', (error) => {
//     console.error(error)
// })
// req.end()