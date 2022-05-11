const mongoose = require('mongoose')

const paymentSchema =new mongoose.Schema({
    patientName:{
        type:String,
        required:true,
    },

    docName:{
        type:String,
        required:true,
    },

    specialization:{
        type:String,
        required:true,
    },

    amount:{
        type:Number,
        required:true,
    },

    status:{
        type:String,
        required:true,

    },

});

module.exports = mongoose.model("appPayments",paymentSchema);