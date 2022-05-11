const express = require("express");
const app=express();
const mongoose= require("mongoose");
const PharmaModel = require('./models/Pharma');
const DrugReqModel = require('./models/DrugReq');
const PharmaUsersModel = require('./models/PharmaUsers');
const UserSession = require('./models/PMSUserSessions');
const cors = require("cors");
require("dotenv").config();

const appointments = require('./routes/appointmentsBE');
const patientsBE = require('./routes/patientsBE');
const doctorsBe = require('./routes/doctorsBe');
const paymentsBE = require('./routes/paymentsBE');

app.use(express.static('public'))

app.use(cors({method: 'GET, PUT, POST, DELETE'}));
app.use("/Appointments",appointments);
app.use("/patients",patientsBE);
app.use(doctorsBe);
app.use("/OnDeskPayments",paymentsBE);

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://user123:Siraj125@cluster0.84jur.mongodb.net/itpv3?retryWrites=true&w=majority");

app.get("/getPharma",(req,res)=>{
    PharmaModel.find({},(err,result)=>{ 
            if(err){
                res.json(err);
            }else{
                res.json(result);
            }
    });

});

app.get("/getDrugReq",(req,res)=>{
    DrugReqModel.find({
        isProvided:false
    },(err,result)=>{ 
            if(err){
                res.json(err);
            }else{
                res.json(result);
            }
    });

});

app.get("/getDrugReq2",(req,res)=>{
    DrugReqModel.find({
        isProvided: true
    },(err,result)=>{ 
            if(err){
                res.json(err);
            }else{
                res.json(result);
            }
    });

});

app.post("/createPharma", async(req,res)=>{
    const pharma=req.body;
    const newPharma= new PharmaModel(pharma);
    await newPharma.save();

    res.json(pharma);
});

app.post("/createDrugReq", async(req,res)=>{
    const drugreq=req.body;
    const newDrugReq= new DrugReqModel(drugreq);
    await newDrugReq.save();

    res.json(drugreq);
});


app.post("/createPMSuser", async(req,res)=>{
    const {body} = req;
    const{   
        username,
        password
    } = body;
    const newPharmaUser= new PharmaUsersModel();
    newPharmaUser.username= username;
    newPharmaUser.password= newPharmaUser.generateHash(password);
    await newPharmaUser.save();

    res.json();
});

app.post("/loginPMSuser", async(req,res)=>{
    const {body} = req;
    const{   
        username,
        password
    } = body;

        if (!username){
        return res.send({
            success: false,
            message: 'Error: Username cannot be blank.'
        });
    }
    if (!password){
        return res.send({
            success: false,
            message: 'Error: password cannot be blank.'
        });
    }

    PharmaUsersModel.find({
        username: username
    }, (err,users) => {
        if(err){
            return res.send({
                success: false,
                message: 'Error: server error'
            }); 
        }
        if(users.length != 1){
            return res.send({
                success: false,
                message: 'Error: Username not found!!!'
            }); 
        }

        const user = users[0];
        if(!user.validPassword(password)){
            return res.send({
                success: false,
                message: 'Error: incorrect password!!!'
            }); 
        }
        const userSession= new UserSession();
        userSession.userId= user._id
        userSession.save((err, doc) => {
            if(err){
                return res.send({
                    success: false,
                    message: 'Error: server error'
                }); 
            }
            return res.send({
                success: true,
                message: 'Signed in!!!',
                token: doc._id

            });
        });
        

    });

});

app.get("/verifyPMSuser", async(req,res)=>{
    const {query} = req;
    const {token} = query;

    UserSession.find({
        _id: token,
        isDeleted: false
    }, (err,sessions)=> {
        if(err){
            return res.send({
                success: false,
                message: 'Error, Server error'
            });
        }
        if(sessions.length != 1){
            return res.send({
                success: false,
                message: 'Error, invalid'
            });
        }else{
            return res.send({
                success: true,
                message: 'Good'

            });
        }
    });
});

app.get("/logoutPMSuser", async(req,res)=>{
    const {query} = req;
    const {token} = query;

    UserSession.findOneAndUpdate({
        _id: token,
        isDeleted: false
    },{
        $set:{isDeleted:true}
    },null, (err,sessions)=> {
        if(err){
            return res.send({
                success: false,
                message: 'Error, Server error'
            });
        }
         return res.send({
             success: true,
            message: 'Good'

        });
        
    });   
});


app.put("/update",async(req,res)=>{
    const newQuantity = req.body.newQuantity;
    const id = req.body.id;

    try{
        await PharmaModel.findById(id, (error, pharmaToUpdate) => {
            pharmaToUpdate.quantity=Number(newQuantity);
            pharmaToUpdate.save();
        });
    }catch(err){
        console.log(err);
    }

});

app.put("/updateDrugReq",async(req,res)=>{
    const username = req.body.username;
    const id = req.body.id;

    try{
        await DrugReqModel.findById(id, (error, pharmaToUpdate) => {
            pharmaToUpdate.isProvided=true;
            pharmaToUpdate.fullfilledTimestamp=Date.now();
            pharmaToUpdate.providedBy=username;
            pharmaToUpdate.save();
        });
    }catch(err){
        console.log(err);
    }

});

app.delete("/delete/:id", async(req,res) => {
    const id = req.params.id;
    await PharmaModel.findByIdAndRemove(id).exec();
    res.send("itemdeleted");
});

app.listen(3001, () => {
    console.log("Server running like butter!!");
});