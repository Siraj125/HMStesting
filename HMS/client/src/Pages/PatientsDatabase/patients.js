import './patients.css';
import { useEffect, useState } from "react";
import Axios from "axios";

function PatientsDB() {  
  //get request
  const [listOfPatients, setListOfPatients] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [NIC, setNIC] = useState("");
  const [DOB, setDOB] = useState("");
  const [contactNO, setContactNO] = useState("");
  const [address, setAddress] = useState("");
  const [emergencyContact, setEmergencyContact] = useState("");
  const [emergencyContactNO, setEmergencyContactNO] = useState("");

  const [currentPatients, setCurrentPatients] = useState([]);


  const addPatients = () => {
    console.table({name: name, age : age, NIC: NIC,DOB: DOB,contactNO: contactNO,address: address ,emergencyContact:emergencyContact, emergencyContactNO:emergencyContactNO  });
    Axios.post("http://localhost:3001/patients/addPatients",{
      name: name,
      age: age,
      NIC: NIC,
      DOB: DOB,
      contactNO: contactNO,
      address: address,
      emergencyContact: emergencyContact,
      emergencyContactNO: emergencyContactNO,
    }).then((response) => {
      alert("USER CREATED");
        setListOfPatients([...listOfPatients,{
        name,
        age,
        NIC, 
        DOB,
        contactNO,
        address,
        emergencyContact,
        emergencyContactNO,
      }])
    })
    .catch(e => {
      console.error(e);
    });
  };
  const search = (query) => {
    let filtered = listOfPatients.filter(pat => {
      if (query === '') {
        return pat;
     } else if (pat.name.toLowerCase().includes(query.toLowerCase())) {  
        return pat;
     }
     })
     filtered = filtered.map((pat,index) => { return <Patients 
      key={index} 
      age={pat.age}
      name={pat.name}
      NIC={pat.NIC}
      DOB={pat.DOB}
      contactNO={pat.contactNO}
      address={pat.address}
      emergencyContact={pat.emergencyContact}
      emergencyContactNO={pat.emergencyContactNO}
      id={pat._id} />})
     setCurrentPatients(filtered);
  }

  useEffect(() => {
      Axios.get("http://localhost:3001/patients/getPatients").then((response) => {
        console.log(listOfPatients)
        setListOfPatients (response.data)
        setCurrentPatients(response.data.map((pat,index) => { return <Patients 
        key={index} 
        age={pat.age}
        name={pat.name}
        NIC={pat.NIC}
        DOB={pat.DOB}
        contactNO={pat.contactNO}
        address={pat.address}
        emergencyContact={pat.emergencyContact}
        emergencyContactNO={pat.emergencyContactNO}
        id={pat._id}/>}));
      });
  }, [])

  return (
  <div className ="patients">
    <div><h1>this is patients  page</h1></div>
    <input placeholder='search....' onChange={event => search(event.target.value)} />
    {currentPatients.length === 0 ? <p>No patients in that name</p> : null }
    <table className="table" style={{ display: currentPatients.length === 0 ? 'none' : ""}}>
    <thead>
                <tr>
                   <th>#</th>
                   <th >name</th>
                   <th >age</th>
                   <th >NIC</th>
                   <th >DOB</th>
                   <th >contactNO</th>
                   <th >address</th>
                   <th >emergencyContact</th>
                   <th >emergencyContactNO</th>
                   <th >actions</th>
                  
                </tr>
              </thead>
        <tbody>
          {currentPatients}
          {/* {listOfPatients.filter(post =>{}).map((patients,index)=>{return <Patients key={index} age={patients.age} name={patients.name} NIC={patients.NIC} DOB={patients.DOB} contactNO={patients.contactNO}  addresss={patients.addresss}
          id={patients._id}/>})} */}
        </tbody>
      </table>

      <div className='addpatients'>
          <input
          type="text" 
          placeholder="name.."
          required="required"
          onChange= {(event) => {
             setName(event.target.value);
           }}
           />
          <input
           type="number"
           placeholder="age.."
           required="required"
           onChange= {(event) => {
            setAge(event.target.value);
          }}
          />

          <input 
          type="text" 
          placeholder="NIC.."
          required="required"
          onChange= {(event) => {
            setNIC(event.target.value);
          }}
          />
          <input 
          type="date" 
          placeholder="DOB.."
          required="required"
          onChange= {(event) => {
            setDOB(event.target.value);
          }}
          />
          <input 
          type="number" 
          placeholder="ContactNO.."
          required="required"
          onChange= {(event) => {
            setContactNO(event.target.value);
          }}
          />
          <input 
          type="text" 
          placeholder="Address.."
          required="required"
          onChange= {(event) => {
            setAddress(event.target.value);
          }}
          />
          <input 
          type="text" 
          placeholder="Emergency Contact.."
          required="required"
          onChange= {(event) => {
            setEmergencyContact(event.target.value);
          }}
          />

          <input 
          type="number" 
          placeholder="emergency Contact NO.."
          required="required"
          value={emergencyContactNO}
          onChange= {(event) => {
            setEmergencyContactNO(event.target.value);
          }}
          />
          
          <button onClick={addPatients}> Add Patient </button>
        </div> 
  </div>

);

     
}


function Patients(props) {
    const [name, setName] = useState(props.name);
    const [age, setAge] = useState(props.age);
    const [NIC, setNIC] =useState(props.NIC);
    const [DOB, setDOB] = useState(props.DOB);
    const [address, setAddress] = useState(props.address);
    const [contactNO, setContactNO] = useState(props.ContactNO);
    const [emergencyContact, setEmergencyContact] = useState(props.emergencyContact);
    const [emergencyContactNO, setEmergencyContactNO] = useState(props.emergencyContactNO);
     
  
    const update = () => {
      console.table({name: name, age : age, NIC: NIC,DOB: DOB,contactNO: contactNO,address: address ,emergencyContact:emergencyContact, emergencyContactNO:emergencyContactNO  });
      Axios.post("http://localhost:3001/patients/updatePatients",{
        newName : name,
        newAge :age,
        newNIC :NIC,
        newDOB :DOB,
        newContactNO :contactNO,
        newAddress :address,
        newEmergencyContact :emergencyContact,
        newEmergencyContactNO :emergencyContactNO,

        id : props.id,
      }).then(() => { console.log("Done boii")})
      .catch((e) => { console.error(e) });
  
    }
    const deletePatients = () =>{
      console.table({name: name, age : age, NIC: NIC,DOB: DOB,contactNO: contactNO,address: address,emergencyContact: emergencyContact,emergencyContactNO: emergencyContactNO  });
      Axios.post(`http://localhost:3001/patients/deletePatient/${props.id}`).then(() => { console.log("deleted")})
      .catch((e) => { console.error(e)});
    };
  
    return (
    

      <tr>
        <td>{props.id}</td>
        <td><div> {props.name} <input type="text" onInput={(e) => { setName(e.target.value) }} value={name}></input></div></td>
        <td><div>{props.age} <input type="number" onInput={(e) => { setAge(e.target.value) }} value={age}></input></div></td>
        <td><div> {props.NIC} <input type="text" onInput={(e) => { setNIC(e.target.value) }} value={NIC}></input></div></td>
        <td><div> {props.DOB} <input type="date" onInput={(e) => { setDOB(e.target.value) }} value={DOB}></input></div></td>
        <td><div> {props.contactNO} <input type="text" onInput={(e) => { setContactNO(e.target.value) }} value={contactNO}></input></div></td>
        <td><div> {props.address} <input type="text" onInput={(e) => { setAddress(e.target.value) }} value={address}></input></div></td>
        <td><div> {props.emergencyContact} <input type="text" onInput={(e) => { setEmergencyContact(e.target.value) }} value={emergencyContact}></input></div></td>
        <td><div> {props.emergencyContactNO} <input type="number" onInput={(e) => { setEmergencyContactNO(e.target.value) }} value={emergencyContactNO}></input></div></td>
        <td><button onClick={update}>update</button> <button onClick={deletePatients}>delete</button></td>
        
        
      </tr>
    )
    
  }
  export default PatientsDB;