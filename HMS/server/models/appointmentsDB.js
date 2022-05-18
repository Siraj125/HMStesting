const mongoose = require('mongoose')

const appSchema = new mongoose.Schema({
    docID:{
        type: Number,
        required: true,
    },
    docName:{
        type: String,
        required: true,
    },
    patientID: {
        type: Number,
        Required: true,
    },
    patientName: {
        type: String,
        Required: true,
    },
      time: {
        type: String,
        Required: true,
    },
    specialization: {
        type: String,
        Required: true,
    },
    room: {
        type: String,
        Required: true,
    },
});

const appsModel = mongoose.model("appointments",appSchema)
module.exports = appsModel;