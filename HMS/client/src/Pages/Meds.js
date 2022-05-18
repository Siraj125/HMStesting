import './CSS/meds.css';
import React from "react";
import {useState, useEffect} from 'react';
import Axios from "axios";
import {medsSchema} from '../Validations/MedsValidation';
import {useNavigate, useParams} from "react-router-dom";
import SearchBox from './SearchBox';

function PMS(){
    const [listOfPharma, setListOfPharma] = useState([]);
    const [listOfFilteredPharma, setListOfFilteredPharma] = useState([]);
    const [name,setName] = useState("");
    const [quantity,setQuantity] = useState(0);
    const [scientificName,setScientificName] = useState("");
    const [error,setError] = useState("");
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
    
    const createMedicine = async(event,document) => {
        event.preventDefault();
        let formdata = {
          fname: event.target[0].value,
          fquantity: event.target[1].value,
          fscientificName: event.target[2].value
        };

        

        const isValid = await medsSchema.isValid(formdata);

        
        if(isValid){
          Axios.post("http://localhost:3001/createPharma", {
            name: name,
            quantity: quantity,
            scientificName: scientificName,
          }).then((response) =>{
            alert("Added Successfully!!");
            setListOfPharma([...listOfPharma, {name,quantity,scientificName,}]); 
            window.location.reload();
          })
        }
        else setError("Incorrect inputs");
    };
    const search = (query) => {
      let filtered = listOfPharma.filter(ap => {
        if (query === '') {
          return ap;
       } else if (ap.name.toLowerCase().includes(query.toLowerCase())) {  
          return ap;
       }
       })
      setListOfFilteredPharma(filtered);
      console.log(query);
    }

    return (
      <div>
        <div className="sesh">
               <span>logged in as {username} !!!</span>
               <button onClick={() => {navigate("/PMSlogin")}}>Logout</button>
           </div>
      <div className='pagenav'>
        <a onClick={() => {navigate("/")}}>Dashboard</a>/
         <a onClick={() => {navigate("/PMSlogin")}}>PharmaManagement</a>/Pharma Inventory
         
      </div>

        <div className="PmsApp">
            
            <div className="userDisplay">
              
                <div className='inputs'>
                  <span>Add new medicine to database:</span>
                  <form onSubmit={createMedicine}>
                    <input 
                      type="text" 
                      placeholder="Name..." 
                      onChange={(event)=>{
                      setName(event.target.value);
                      }}
                    />
                    <input 
                      type="text" 
                      placeholder="quantity..."
                      onChange={(event)=>{
                        setQuantity(event.target.value);
                        }}
                    />
                    
                    <input 
                    type="text" 
                    placeholder="scientific name..."
                    onChange={(event)=>{
                      setScientificName(event.target.value);
                      }}
                    />
  
                    <button type="submit">Add Medicine</button>
                    
                  </form>
                  <span className='error-msg'>{error}</span>
                </div>
                
                <div className='ExtraFeatures'>
                <span>Lookup medicine:</span>
                <input placeholder='search....' onChange={event => search(event.target.value)} />
                <button onClick={() => {navigate("/MedSearch/"+username)}}>Advanced Search</button>

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

export default PMS;