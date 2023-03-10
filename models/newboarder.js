const mongoose = require('mongoose');
const Schema = mongoose.Schema;




hello = function createNew(name){

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
        
    
        boarderElect: Number,
        boarderElectStatus: String,
        boarderElectPay: Number,
    
    }, {timestamps: true});
    const Boarder = mongoose.model(name, boarderSchema);

    return Boarder;
}

module.exports = hello;

