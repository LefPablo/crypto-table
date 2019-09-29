var express = require('express');
var bodyParser = require('body-parser');
var session  = require('express-session');
var db = require('./db');
var artistsController = require('./controllers/rates');

var app = express();
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/'));

app.use(bodyParser.json());
app.use(session({secret: 'ssshhhhh',saveUninitialized: true,resave: true}));
app.use(bodyParser.urlencoded({extended: true})); //парсинг формы

app.get('/', function (req, res) {
    res.sendFile('index.html' , { root : __dirname});
});

app.get('/symbols', artistsController.symbols);

app.get('/rates', artistsController.all);

app.get('/rates/:id',artistsController.findById);

app.post('/rates', artistsController.create);

app.put('/rates/:id', artistsController.update);

app.delete('/rates/:id', artistsController.delete);

app.delete('/rates/', artistsController.deleteAll);

app.delete('/symbols/', artistsController.deleteAllsymbols);

db.connect('mongodb://localhost:27017/myapi', function (err) {
    if (err) {
        return console.log(err);
    }
    app.listen(3012, function() {
        console.log('API app started');
    })
})
