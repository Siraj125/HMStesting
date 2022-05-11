const mongoose = require('mongoose')

const patientSchema = new mongoose.Schema({
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
    DOB: {
        type: Date,
        Required: true,
    },
    address: {
        type: String,
        Required: true,
    },
    contactNO: {
        type: Number,
        Required: true,
    },
    emergencyContact: {
        type: String,
        Required: true,
    },
    emergencyContactNO: {
        type: Number,
        Required: true,
    },
});

const PatientsModel = mongoose.model("appPatients",patientSchema)
module.exports = PatientsModel;