const express = require('express');
const router = express.Router();

const PaymentModel = require("../models/payments");
const cors= require("cors");

router.use(express.json());
router.use(cors());


router.get("/getPayments", async (req, res)=>{ 
    PaymentModel.find({}, (err, result) =>{
        if (err){
            console.error(err);
            res.status(500).json(err);
        }else{
            res.status(200).json(result);
        } 
    })

});

router.post("/addPayments",async (req, res ) => {
    try{
        const pays = req.body;
        const newpays = new PaymentModel(pays);
        await newpays.save();

        res.status(200).json(pays);
    }catch(e){
        console.error(e);
        res.status(500).json(e);
    }
    
});

router.post("/updatePayment", async (req, res ) => {
    const newPatientName = req.body.newPatientName;
    const newDocName = req.body.newDocName;
    const newSpecialization = req.body.newSpecialization;
    const newAmount = req.body.newAmount;
    const newStatus = req.body.newStatus;
    const id = req.body.id;
    console.log(newPatientName, newDocName, newSpecialization, newAmount, newStatus);
    try {
       let filter = { '_id': id }
       let update = {
           $set: {'patientName':newPatientName, 'docName': newDocName,'specialization':newSpecialization, 'amount':newAmount, 'status':newStatus  },
       }
       await PaymentModel.findOneAndUpdate(filter, update);
     //  await DocsModel.findOneAndUpdate(filter, update, {upsert: false, new: true });
    }catch (err){
        console.log(err);
    }
    res.send("updated")
});

router.post('/deletePayment/:id', async (req, res)=> {
    const id = req.body.id;
    try{
        let filter = { '_id': id }
    
    await paymentModel.findByIdAndDelete(filter);
    } catch(err){
        console.log(err);
    }
    res.send("deleted");
})

module.exports = router;