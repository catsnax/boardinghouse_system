const express = require('express');
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
const Boarder = require('./models/boarder');
const { redirect } = require('express/lib/response');

const app = express();
const dbURI = 'mongodb+srv://CatSnaxx:Aaronisreal4@boarderdatabase.di9lyeh.mongodb.net/boarders?retryWrites=true&w=majority';

app.set('view engine', 'ejs');
app.set('views', 'html-files');
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('public'));


mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
.then((result) =>{
    console.log("connected to database");
    app.listen(3000);
}).catch((err) =>{
    console.log(err);
})

app.get('/', (req, res) =>{
    Boarder.find()
    .then((result) =>{
        res.render('index', {data : result});
    })
    .catch((err) =>{
        console.log(err);
    })
})

app.post('/', (req, res) =>{
    const id = req.body.index;
    Boarder.findById(id).then((result) =>{
        result.boarderRentStatus = req.body.payStatus;
        result.save().then(() =>{}).catch((err) => {console.log(err)})
        res.redirect('/');
    }
    ).catch((err) => {
        console.log(err);
    })


    
})


app.get('/create', (req, res) =>{
    res.render('create');
})

app.post('/create', (req, res) =>{
    const newBoarder = new Boarder({
        boarderName : req.body.Name,
        boarderContact: req.body.Contact,
        boarderRent: req.body.rentFee,
        boarderRentDue: req.body.rentDue,
        boarderRentStatus: "Not Paid"
});

newBoarder.save()
.then((result) =>{
    console.log(result);
})
.catch((err) => console.log(err));

res.redirect('/');
})

