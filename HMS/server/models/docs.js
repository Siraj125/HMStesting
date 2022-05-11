const mongoose = require('mongoose')

const docsSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    age:{
        type: Number,
        required: true,
    },
    NIC: {
        type: String,
        Required: true,
    },
    address: {
        type: String,
        Required: true,
    },
    specialization: {
        type: String,
        Required: true,
    },
    shift: {
        type: String,
        Required: true,
    },
    availability: {
        type: String,
        Required: true,
    },

});

const DocsModel = mongoose.model("appDoctors",docsSchema)
module.exports = DocsModel;