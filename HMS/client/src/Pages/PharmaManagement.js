import React from "react";
import {useNavigate, useParams} from "react-router-dom";
import './CSS/PManagement.css';
import {useState, useEffect} from 'react';


function PharmaManagement(){
    let navigate = useNavigate();
    let {username} = useParams();
    return(
    <div className="PMbody">
        <div className="sesh">
            <span>logged in as {username} !!!</span>
            <button onClick={() => {navigate("/PMSlogin")}}>Logout</button>
        </div>
        
        <div className="home-body">

        <a 
        onClick={() => {navigate("/Meds/"+username)}}>Pharma Inventory</a>

        <a
        onClick={() => {navigate("/DrugReqs/"+username)}}>Pharma Requests</a>

         <a
        onClick={() => {}}>???</a>

        

        
        </div>
        
    </div>



    );
}

export default PharmaManagement;

