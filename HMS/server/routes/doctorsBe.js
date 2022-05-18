// const { append } = require('dom/lib/mutation');
const express = require('express');

const DocsModel = require("../models/docs");
const { route } = require('./appointmentsBE');
const cors= require("cors");

const router = express.Router();

router.use(express.json());
router.use(cors());



router.get("/getDocs", async (req, res)=>{ 
    DocsModel.find({}, (err, result) =>{
        if (err){
            res.json(err);
        }else{
            res.json(result);
        }
    })

});

router.post("/addDocs",async (req, res ) => {
    const docs = req.body;
    const newdocs = new DocsModel(docs);
    await newdocs.save();

    res.json(docs);
});


router.post("/updateAge", async (req, res ) => {
     const newName = req.body.newName;
     const newAge = req.body.newAge;
     const newNIC = req.body.newNIC
     const newAddress = req.body.newAddress
     const newSpecialization = req.body.newSpecialization
     const newShift = req.body.newShift
     const newAvailablity = req.body.newAvailablity
     const id = req.body.id;
     console.log(newName, newAge, newNIC, newAddress, newSpecialization, newShift, newAvailablity);
     try {
        let filter = { '_id': id }
        let update = {
            $set: {'name':newName, 'age': newAge,'NIC':newNIC , 'address':newAddress , 'specialization' :newSpecialization , 'shift' :newShift ,'availablity':newAvailablity },
        }
        await DocsModel.findOneAndUpdate(filter, update);
      //  await DocsModel.findOneAndUpdate(filter, update, {upsert: false, new: true });
     }catch (err){
         console.log(err);
     }
     res.send("updated")
 });

router.post('/deletedoc/:id', async (req, res)=> {
    const id = req.body.id;
    try{
        let filter = { '_id': id }
    
    await DocsModel.findByIdAndDelete(filter);
    } catch(err){
        console.log(err);
    }
    res.send("deleted");
})

module.exports = router;