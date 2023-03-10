const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const boarderSchema = new Schema({
    boarderName: {
        type: String,
        required: true
    },
    boarderContact: String,
    boarderRent : Number,
    boarderRentDue: String,
    boarderRentStatus: String,
    
    boarderWater : Number,
    boarderWaterStatus: String,
    boarderWaterPay: Number,

    boarderElect: Number,
    boarderElectStatus: String

}, {timestamps: true});



const Boarder = mongoose.model("boarders", boarderSchema);

module.exports = Boarder;
