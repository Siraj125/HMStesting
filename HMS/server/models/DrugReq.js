const mongoose = require("mongoose");
const { date } = require("yup");

const DrugReqSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    doctorsName: {
        type: String,
        required: true,
    },
    Unit: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now(),
    },
    fulfilledTimestamp: {
        type: Date,
        default: Date.now(),
    },
    quantity: {
        type: Number,
        required: true,
    },

    isProvided: {
        type: Boolean,
        default: false,
    },

    providedBy: {
        type: String,
        default: ""
    }
    
});

const DrugReqModel = mongoose.model("drugrequests",DrugReqSchema);
module.exports = DrugReqModel; 