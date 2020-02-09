require('./models/db');

const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyparser = require('body-parser');

const employeecontroller = require('./controllers/employeeController');

var app = express();

app.use(bodyparser.urlencoded({
    extended: true
}));

app.use(bodyparser.json());

app.set("views", path.join(__dirname, "/views/"))

app.engine('hbs', exphbs({
    extname: 'hbs',
    defaultLayout: "mainLayout",
    layoutsDir: __dirname + '/views/layouts/'
}));
app.set('view engine', 'hbs');

// app.use('/public', express.static('public'));
app.use(express.static(__dirname + '/public'));


app.listen(3000, () => {
    console.log('express Server started at port: 3000');
});

app.get('/', (req, res) => {
    //res.status(200).send("Home Page ")
    res.redirect('/employee')
})
app.use("/employee", employeecontroller);