const express = require('express');
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
const boarder = require('./models/newboarder');
const originalBoarder = require('./models/boarder');


const { redirect } = require('express/lib/response');

const app = express();

//db URI is from mongoose db. substitute  username and password in template provided
const dbURI = process.env.MONGODB_URI;

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
    res.render('index');
})

app.post('/', (req, res) =>{
    newString = req.body.month + req.body.year;
    nameString = req.body.month + " " + req.body.year;
    try{Boarder = boarder(newString)
        Boarder.find().then((test) => {
            if(test.length <= 0){
                originalBoarder.find()
                .then((result) => {
                    for(i = 0; i < result.length; i++){
                        let listBoarder = new Boarder({
                            boarderName :  result[i].boarderName,
                            boarderContact :  result[i].boarderContact,
                            boarderRent :  result[i].boarderRent,
                            boarderRentDue :  result[i].boarderRentDue,
                            boarderRentStatus: "Not Paid",
                            boarderWater: 0,
                            boarderWaterStatus: "Not Paid",
                            boarderElect: 0,
                            boarderElectPay: 0,
                            boarderElectStatus: "Not Paid"
                            });
                            listBoarder.save().then((result) => {console.log(result)}).catch((err) =>{console.log(err)});
                        }
                }).then(() => { res.redirect('/display')})
            }
            else {
            originalBoarder.find()
            .then((result) => {
                if(test.length < result.length){
                    for(i = test.length; i < result.length; i++){
                        let listBoarder = new Boarder({
                            boarderName :  result[i].boarderName,
                            boarderContact :  result[i].boarderContact,
                            boarderRent :  result[i].boarderRent,
                            boarderRentDue :  result[i].boarderRentDue,
                            boarderRentStatus: "Not Paid",
                            boarderWater: 0,
                            boarderWaterStatus: "Not Paid",
                            boarderElect: 0,
                            boarderElectPay: 0,
                            boarderElectStatus: "Not Paid"
                            });
                            listBoarder.save().then((result) => {console.log(result)}).catch((err) =>{console.log(err)});
                        }
                    } 
        }).then(() => {res.redirect('/display')})
    }})}
    catch(err){
        res.redirect('/display')};
    }
    )

app.get('/display', (req, res) =>{
    Boarder.find()
    .then((result) =>{
        res.render('display', {data : result, nameString : nameString});
    })
    .catch((err) =>{
        console.log(err);
    })
})

app.post('/display', (req, res) =>{
    Boarder.find().then((result) =>{
        waterDivided = (parseFloat(req.body.water) / result.length).toFixed(2);
        for(i = 0; i < result.length; i++){
            result[i].boarderWater = waterDivided;
            result[i].save().then(() =>{ }).catch((err) => {console.log(err)})
        }
    
    }).then(() => {
        res.redirect('/display');
    })
    
})

app.get('/create', (req, res) =>{
    res.render('create');
})

//takes in the data from html forms and creates a new instance of Boarder which is new object of boarder in data using schema
app.post('/create', (req, res) =>{

    const newBoarder = new originalBoarder({
        boarderName : req.body.Name,
        boarderContact: req.body.Contact,
        boarderRent: req.body.rentFee,
        boarderRentDue: req.body.rentDue,
        boarderRentStatus: "Not Paid",
        boarderWater: 0,
        boarderWaterStatus: "Not Paid",
        boarderElect: 0,
        boarderElectPay: 0,
        boarderElectStatus: "Not Paid"
    });

    newBoarder.save()
    .then((result) =>{
        console.log(result);
    })
    .catch((err) => console.log(err));
    res.redirect('/create');
})

app.get('/edit', (req, res) =>{
    Boarder.find()
    .then((result) =>{
        res.render('edit', {data : result});
    })
    .catch((err) =>{
        console.log(err);
    })
    
})

app.post('/edit', (req, res) =>{
    const id = req.body.index;
    Boarder.findById(id).then((result) =>{
        result.boarderRentStatus = req.body.payStatus;
        result.boarderElectPay = parseFloat(req.body.elect) * 13;
        result.boarderElect = req.body.elect;
        result.boarderWaterStatus = req.body.waterStatus
        result.boarderElectStatus = req.body.electStatus
        result.save().then(() =>{res.redirect('/edit');}).catch((err) => {console.log(err)})
        
    }
    ).catch((err) => {
        console.log(err);
    }) 

})



module.exports = app;
