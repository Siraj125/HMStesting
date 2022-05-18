import './CSS/meds.css';
import React from "react";
import {useState, useEffect} from 'react';
import Axios from "axios";
import {useNavigate, useParams} from "react-router-dom";

function DrugReqs(){
    const [ListOfDrugReq, setListOfDrugReq] = useState([]);
    const [ListOfDrugReq2, setListOfDrugReq2] = useState([]);
    // const [name,setName] = useState("");
    // const [quantity,setQuantity] = useState(0);
    // const [scientificName,setScientificName] = useState("");
    // const [error,setError] = useState("");
    // const [status,setStatus] = useState("");
    let navigate = useNavigate();
    let {username} = useParams();
    
    useEffect( ()=> {
      Axios.get("http://localhost:3001/getDrugReq").then((response)=>{
        setListOfDrugReq(response.data);
      });
    }, []);
    
    useEffect( ()=> {
      Axios.get("http://localhost:3001/getDrugReq2").then((response)=>{
        setListOfDrugReq2(response.data);
      });
    }, []);
    const sendMed = (id) => {
      console.log("update check")
      Axios.put("http://localhost:3001/updateDrugReq",{username,id:id});


    }
    


const formatDate = (dateString) => {
  const options = {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}
  return new Date(dateString).toLocaleDateString(undefined, options)
}

    return (
      <div>
        <div className="sesh">
               <span>logged in as {username} !!!</span>
               <button onClick={() => {navigate("/PMSlogin")}}>Logout</button>
        </div>
        <div className='pagenav'>
        <a onClick={() => {navigate("/")}}>Dashboard</a>/
         <a onClick={() => {navigate("/PMSlogin")}}>PharmaManagement</a>/Pharma Requests
         
      </div>
        <div className="PmsApp">
            
            <div className="userDisplay">
              

                <div className='DBdisplay'>
                <h1>Unfulfilled Requests</h1>
                   <table className='table2'>
                      <thead>
                      <tr><th>Drug</th><th>Quantity</th><th>Requested by</th><th>Unit</th><th>Time</th><th></th></tr>
                      </thead>
                      <tbody>
                        {ListOfDrugReq.map((pharma)=>{
                          return(  
                                <tr>
                                <td>{pharma.name}</td>
                                <td>{pharma.quantity}</td>
                                <td>{pharma.doctorsName}</td>
                                <td>{pharma.Unit}</td>
                                <td>{formatDate(pharma.timestamp)}</td>
                                
                                <td>
                                  <button onClick={()=>{sendMed(pharma._id)}}>SEND</button>
                                 
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                    <h1>Fulfilled Requests</h1>
                    <table className='table3'>
                      <thead>
                      <tr><th>Drug</th><th>Quantity</th><th>Requested by</th><th>Unit</th><th>Requested At</th><th>Provided at</th><th>Authorized by</th></tr>
                      </thead>
                      <tbody>
                        {ListOfDrugReq2.map((pharma)=>{
                          return(  
                            <tr>
                            <td>{pharma.name}</td>
                            <td>{pharma.quantity}</td>
                            <td>{pharma.doctorsName}</td>
                            <td>{pharma.Unit}</td>
                            <td>{formatDate(pharma.timestamp)}</td>
                            <td>{formatDate(pharma.fulfilledTimestamp)}</td>
                            <td>{pharma.providedBy}</td>
                    
                                
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                 </div>
            
            </div>
        </div>
      </div>
    );
}

export default DrugReqs;