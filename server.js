const express = require('express');
const bodyParser = require('body-parser');
const session  = require('express-session');
const db = require('./db');
const controller = require('./controllers/rates');

const app = express();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({secret: 'ssshhhhh',saveUninitialized: true, resave: true}));

app.get('/', function (req, res) {
    res.sendFile('index.html' , { root : __dirname}); //get main page by request to server
});

app.get('/table', controller.table); //return table symbols and rates

app.get('/symbols', controller.symbols); //return table of symbols

app.get('/rates', controller.rates); //return table of rates

app.post('/rates', controller.create); //create new record in rates table

app.put('/rates/:id', controller.update); //change one rate record by id

app.delete('/rates/:id', controller.delete); //delete one rate record by id

app.delete('/rates/', controller.deleteAllRates); //delete all records in rates table

app.delete('/symbols/', controller.deleteAllSymbols); //delete all records in symbols table

db.connect('mongodb://localhost:27017/myapi', function (err) { //Server will be start after database connect
    if (err) {
        return console.log(err);
    }
    console.log('Database connected');
    app.listen(8080, function() { //create localhost port
        console.log('API app started');
    })
})
