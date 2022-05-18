const express = require('express');
const router = express.Router();

const PatientsModel = require("../models/patientsDB");
const cors= require('cors');

router.use(express.json());
router.use(cors());
router.get("/getPatients", async (req, res)=>{ 
    PatientsModel.find({}, (err, result) =>{
        if (err){
            res.json(err);
        }else{
            res.json(result);
        }
    });
})

router.post("/addPatients",async (req, res ) => {
    try{
        const patients = req.body;
        console.log(patients);
        const newPatients = new PatientsModel(patients);
        await newPatients.save();

        res.status(200).json(patients);
    }catch(e){
        console.error(e);
        res.status(500).json(e);
    }
});

router.post("/updatePatients", async (req, res ) => {
    const newName = req.body.newName;
    const newAge = req.body.newAge;
    const newNIC = req.body.newNIC;
    const newDOB = req.body.newDOB;
    const newContactNO = req.body.newContactNO;
    const newAddress = req.body.newAddress;
    const newEmergencyContact = req.body.newEmergencyContact;
    const newEmergencyContactNO = req.body.newEmergencyContactNO;
    const id = req.body.id;
    console.log(newName, newAge, newNIC, newDOB, newContactNO, newAddress, newEmergencyContact, newEmergencyContactNO);
    try {
        let filter = { '_id': id }
        let update = {
            $set: {'name':newName, 'age': newAge,'NIC':newNIC,'DOB':newDOB, 'contactNO':newContactNO, 'address':newAddress, 'emergencyContact':newEmergencyContact, 'emergencyContactNO':newEmergencyContactNO  },
        }
        await PatientsModel.findOneAndUpdate(filter, update);
        //  await DocsModel.findOneAndUpdate(filter, update, {upsert: false, new: true });
    }catch (err){
        console.log(err);
    }
    res.send("updated")
});

router.post('/deletePatient/:id', async (req, res)=> {
    const id = req.params.id;
    try{
        let filter = { '_id': id }
    
        await PatientsModel.findByIdAndDelete(filter);
    } catch(err){
        console.log(err);
    }
    res.send("deleted");
})

module.exports = router;

/*const express = require('express');
const app = express();
const mongoose = require('mongoose')
const PatientsModel = require('../models/patientsDB')
//const appoinment = require('./routes/appointments');

const cors = require('cors');
app.use(express.static('public'))

//app.use("/appointment",appoinment);
app.use(express.json());
app.use(cors({method: 'GET, PUT, POST, DELETE'}));
mongoose.connect("mongodb+srv://cyberX:1234567a@test01.dr2ox.mongodb.net/patients?retryWrites=true&w=majority")

app.get("/getPatients", async (req, res)=>{ 
    PatientsModel.find({}, (err, result) =>{
        if (err){
            res.json(err);
        }else{
            res.json(result);
        }
    })

app.post("/addPatients",async (req, res ) => {
        const patients = req.body;
        const newPatients = new PatientsModel(patients);
        await newPatients.save();
    
        res.json(patients);
    });    

app.post("/updatePatients", async (req, res ) => {
        const newName = req.body.newName;
        const newAge = req.body.newAge;
        const newNIC = req.body.newNIC;
        const newDOB = req.body.newDOB;
        const newContactNO = req.body.newContactNO;
        const newAddress = req.body.newAddress;
        const newEmergencyContact = req.body.newEmergencyContact;
        const newEmergencyContactNO = req.body.newEmergencyContactNO;
        const id = req.body.id;
        console.log(newName, newAge, newNIC, newDOB, newContactNO, newAddress, newEmergencyContact, newEmergencyContactNO);
        try {
           let filter = { '_id': id }
           let update = {
               $set: {'name':newName, 'age': newAge,'NIC':newNIC,'DOB':newDOB, 'contactNO':newContactNO, 'address':newAddress, 'EmergencyContact':newEmergencyContact, 'EmergencyContactNO':newEmergencyContactNO  },
           }
           await PatientsModel.findOneAndUpdate(filter, update);
         //  await DocsModel.findOneAndUpdate(filter, update, {upsert: false, new: true });
        }catch (err){
            console.log(err);
        }
        res.send("updated")
    });

app.post('/deletePatient/:id', async (req, res)=> {
        const id = req.body.id;
        try{
            let filter = { '_id': id }
        
        await PatientsModel.findByIdAndDelete(filter);
        } catch(err){
            console.log(err);
        }
        res.send("deleted");
    })
});*/