const express = require('express');
const appsModel = require('../models/appointmentsDB');

const router = express.Router();

const cors= require('cors');
router.use(express.json());
router.use(cors());

// const DocsModel = require("../models/docs");
// const PatientsModel = require("../models/patientsDB");

      
//get details from docs and patients

// router.get("/getDetails", async (req, res)=>{ 
//     DocsModel.find({}, (err, result) =>{
//         if (err){
//             res.json(err);
//         }else{
//             res.json(result);
//         }
//     })
//     PatientsModel.find({}, (err, result) =>{
//         if (err){
//             res.json(err);
//         }else{
//             res.json(result);
//         }
//     })

// });

//show the data in appointments table
router.get("/getAppointments", async (req, res)=>{ 
    appsModel.find({}, (err, result) =>{
        if (err){
            res.json(err);
        }else{
            res.json(result);
        }
    })

});


router.post("/addAppointments",async (req, res ) => {
    const appoints = req.body;
    const newAppoints = new appsModel(appoints);
    await newAppoints.save();

    res.json(appoints);
});

router.post("/updateAppointments", async (req, res ) => {
    const newDocID = req.body.newDocID;
    const newDocName = req.body.newDocName;
    const newPatientID = req.body.newPatientID;
    const newPatientName = req.body.newPatientName;
    const newTime = req.body.newTime;
    const newSpecialization = req.body.newSpecialization;
    const newRoom = req.body.newRoom;
    const id = req.body.id;
    console.log(newDocID, newDocName, newPatientID, newPatientName,newTime ,newSpecialization, newRoom);
    try {
       let filter = { '_id': id }
       let update = {
           $set: {'docID':newDocID, 'docName':newDocName, 'patientID': newPatientID,'patientName':newPatientName , 'time':newTime , 'specialization' :newSpecialization , 'room' :newRoom , },
       }
       await appsModel.findOneAndUpdate(filter, update);
     //  await DocsModel.findOneAndUpdate(filter, update, {upsert: false, new: true });
    }catch (err){
        console.log(err);
    }
    res.send("updated")
});

router.post('/deleteAppointment/:id', async (req, res)=> {
    const id = req.body.id;
    try{
        let filter = { '_id': id }
    
    await appsModel.findByIdAndDelete(filter);
    } catch(err){
        console.log(err);
    }
    res.send("deleted");
})
// router.get('/pp', (req, res) => {
//     res.send("Testing");
// });



module.exports = router;