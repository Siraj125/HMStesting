import './CSS/meds.css';
import "../App.css";

import React from "react";
import {useState, useEffect} from 'react';
import Axios from "axios";
import {medsSchema} from '../Validations/MedsValidation';
import {useNavigate, useParams} from "react-router-dom";

function MedSearch(){
    const [listOfPharma, setListOfPharma] = useState([]);
    const [listOfFilteredPharma, setListOfFilteredPharma] = useState([]);
    const [SearchName,setSearchName] = useState("");
    const [SearchSciName,setSearchSciName] = useState("");
    const [SearchID,setSearchID] = useState("");

    const [MinQuan,setMinQuan] = useState(0);
    const [MaxQuan,setMaxQuan] = useState(0);
    let navigate = useNavigate();
    let {username} = useParams();

  

    useEffect( ()=> {
        Axios.get("http://localhost:3001/getPharma").then((response)=>{
          setListOfPharma(response.data);
          setListOfFilteredPharma(response.data);

        });
      }, []);

      const updatePharma = (id) => {
        const newQuantity = prompt("Enter new quantity: ");
    
        Axios.put("http://localhost:3001/update",{newQuantity: newQuantity,id:id}).then(
          ()=>{
          setListOfPharma(
            listOfPharma.map((pharma) => {
            return pharma._id === id 
            ? {_id: id, name: pharma.name, scientificName:pharma.scientificName ,quantity: newQuantity} : pharma;
          }))
        })
    
    };
    const formatDate = (dateString) => {
      const options = {year: 'numeric', month: '2-digit',day: '2-digit'};
      return new Date(dateString).toLocaleDateString(undefined, options)
    }

    const deletePharma = (id) => {
        Axios.delete(`http://localhost:3001/delete/${id}`);
        window.location.reload();
        
    }

        const searchName = (query) => {
          let filtered = listOfPharma.filter(ap => {
            if (query === '') {
              return ap;
           } else if (ap.name.toLowerCase().includes(query.toLowerCase())) {  
              return ap;
           }
           })
           setListOfFilteredPharma(filtered);
        }
        const searchSciName = (query) => {
          let filtered = listOfPharma.filter(ap => {
            if (query === '') {
              return ap;
           } else if (ap.scientificName.toLowerCase().includes(query.toLowerCase())) {  
              return ap;
           }
           })
           setListOfFilteredPharma(filtered);
        }
        const searchID= (query) => {
          let filtered = listOfPharma.filter(ap => {
            if (query === '') {
              return ap;
           } else if (ap._id.toLowerCase().includes(query.toLowerCase())) {  
              return ap;
           }
           })
           setListOfFilteredPharma(filtered);
        }
        const checkMin= (query) => {
          let filtered = listOfPharma.filter(ap => {
            if (query === 0) {
              return ap;
           } else if (ap.quantity>query) {  
              return ap;
           }
           })
           setListOfFilteredPharma(filtered);
        }
        const checkMax= (query) => {
          let filtered = listOfPharma.filter(ap => {
            if (query === 0) {
              return ap;
           } else if (ap.quantity<query) {  
              return ap;
           }
           })
           setListOfFilteredPharma(filtered);
        }



    return(
      <div>
        <div className="sesh">
               <span>logged in as {username} !!!</span>
               <button onClick={() => {navigate("/PMSlogin")}}>Logout</button>
        </div>
        <div className='pagenav'>
            <a onClick={() => {navigate("/")}}>Dashboard</a>/
            <a onClick={() => {navigate("/PMSlogin")}}>PharmaManagement</a>/
            <a onClick={() => {navigate("/Meds/"+username)}}>Pharma Inventory</a>/Advanced Search
            
        </div>
        <div className="PmsApp">
            
            <div className="userDisplay">
            <div className='inputs'>
            <form onSubmit={null}>
                        <div className="searchBox"></div>
                        <input type="text" placeholder="Name" onChange={(e)=>{searchName(e.target.value)}} />
                        <input type="text" placeholder="Scientific Name" onChange={(e)=>{searchSciName(e.target.value)}} />
                        <input type="text" placeholder="ID" onChange={(e)=>{searchID(e.target.value)}} />
                        <input type="number" placeholder="min quantity" onChange={(e)=>{checkMin(e.target.value)}} />
                        <input type="number" placeholder="max quantity" onChange={(e)=>{checkMax(e.target.value)}} />

                    </form>
               </div>

                <div className='DBdisplay'>
                   <table className='table'>
                      <thead>
                      <tr><th>Name</th><th>Quantity</th><th>ScientificName</th><th>Added on</th><th>Expiry date</th><th>Batch ID</th><th></th></tr>
                      </thead>
                      <tbody>
                        {listOfFilteredPharma.map((pharma)=>{
                          return(  
                              <tr>
                                <td>{pharma.name}</td>
                                <td>{pharma.quantity}</td>
                                <td>{pharma.scientificName}</td>
                                <td>{formatDate(pharma.addedOn)}</td>
                                <td>{pharma.expiryDate}</td>
                                <td>{pharma._id}</td>
                                <td>
                                  <button onClick={()=>{updatePharma(pharma._id)}}>update</button>
                                  <button onClick={()=>{deletePharma(pharma._id)}}>X</button>
                                </td>
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

export default MedSearch;