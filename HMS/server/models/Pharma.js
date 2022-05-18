const mongoose = require("mongoose");

const PharmaSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    scientificName: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    addedOn: {
        type: Date,
        default: Date.now(),
    },
    expiryDate: {
        type: String,
        default: "21/05/2023",
    }
});

const PharmaModel = mongoose.model("pharmafinals",PharmaSchema);
module.exports = PharmaModel; 