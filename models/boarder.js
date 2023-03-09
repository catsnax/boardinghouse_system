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

    boarderElect: Number,
    boarderElectStatus: String

}, {timestamps: true});

const Boarder = mongoose.model('Boarders', boarderSchema);

module.exports = Boarder;