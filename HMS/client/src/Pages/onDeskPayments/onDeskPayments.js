import { useState,useEffect } from "react";
import Axios from "axios";

function OnDeskPayments(){
    const [listOfPayments, setListOfPayments] = useState([]);
    const [patientName, setPatientName] =useState ("");
    const [docName, setDocName] =useState ("");
    const [specialization, setSpecialization] =useState ("");
    const [amount, setAmount] =useState (0);
    const [status, setStatus] =useState ("");

const addPayments = () => {
    console.table({
        patientName,
        docName, 
        specialization,
        amount,
        status,
    });
    Axios.post("http://localhost:3001/OnDeskPayments/addPayments",{
        patientName,
        docName, 
        specialization,
        amount,
        status,
    }).then((response) => {
      alert("USER CREATED");
      setListOfPayments([...listOfPayments,{
        patientName,
        docName,
        specialization,
        amount,
        status,
      }])
    });
  };


const [currentPayments, setCurrentPayments] = useState([]);

const search = (query) => {
    let filtered = listOfPayments.filter(pays => {
      if (query === '') {
        return pays;
     } else if (pays.patientName.toLowerCase().includes(query.toLowerCase())) {  
        return pays;
     }
     })
     filtered = filtered.map((pays,index) => { return <Payment
        key={index}
        patientName={pays.patientName}
        docName={pays.docName}
        specialization={pays.specialization}
        amount={pays.amount}
        status={pays.status}
        id={pays._id}/>})
     setCurrentPayments(filtered);
  }
  useEffect(() => {
    Axios.get("http://localhost:3001/OnDeskPayments/getPayments").then((response) => {
      setListOfPayments (response.data)
      setCurrentPayments(response.data.map((pays,index) => { return <Payment key={index} 
      patientName={pays.patientName}
      docName={pays.docName}
      specialization={pays.specialization}
      amount={pays.amount}
      status={pays.status}
      id={pays._id}/>}));
    });
  }, [])

  return (
    <div className="App">
      
      
      <div className='flex-container'>
      <div className='flex-child searchBar'>
        <input placeholder='search....' onChange={event => search(event.target.value)} />

   
      </div>
      <div className="flex-child PaymentDisplay">
        {/* <button onClick= {getDocs}>show docs</button> */}
          { currentPayments.length === 0 ? <p>Nothing here boiii</p> : null }
          <table className="table" style={{ display: currentPayments.length === 0 ? 'none' : ""}}>
              <thead>
                <tr>
                   <th>#</th>
                   <th >patientName</th>
                   <th >docName</th>
                   <th >specialization</th>
                   <th >amount</th>
                   <th >specialization</th>
                   <th >status</th>
                  
                </tr>
              </thead>
              <tbody>
                  {currentPayments}
              </tbody>
          </table>
        

      </div>
      </div>

      <div className='addPayments'>
          {/* <button onClick= {addDocs}>add docs</button> */}
          <input
            type="text" 
            placeholder="Patient Name.."
            required="required"
            onChange= {(event) => {
             setPatientName(event.target.value);
           }}
           />
          <input
            type="text"
            placeholder="Doctor name.."
            required="required"
            onChange= {(event) => {
                setDocName(event.target.value);
          }}
          />

          <input 
            type="text" 
            placeholder="Specialization.."
            required="required"
            onChange= {(event) => {
                setSpecialization(event.target.value);
          }}
          />

          <input 
            type="number" 
            placeholder="amount.."
            required="required"
            onChange= {(event) => {
                setAmount(event.target.value);
          }}
          />

          <input 
            type="text" 
            placeholder="status.."
            required="required"
            onChange= {(event) => {
                setStatus(event.target.value);
          }}
          />
          <button onClick={addPayments}> add Payment </button>
        </div>

    </div>

        

  );
}

function Payment(props) {
    const [patientName, setPatientName] = useState(props.patientName);
    const [docName, setDocName] = useState(props.docName);
    const [specialization, setSpecialization] =useState(props.specialization);
    const [amount, setAmount] =useState(props.amount);
    const [status, setStatus] =useState(props.status);


    
  const update = () => {
    console.table({patientName: patientName,docName : docName, specialization: specialization, amount: amount, status: status, });
    Axios.post("http://localhost:3001/OnDeskPayments/updatePayment",{
      newPatientName: patientName,
      newDocName :docName,
      newSpecialization :specialization,
      newAmount : amount,
      newStatus : status,
      id : props.id,
    }).then(() => { alert("Done boii")})
    .catch((e) => { console.error(e) });

  }

  const deletePayment = () =>{
    console.table({patientName: patientName,docName : docName, specialization: specialization, amount: amount, status: status, });
    Axios.post('http://localhost:3001/OnDeskPayments/deletePayment/:id',{
      id : props.id,
    }).then((response) => { alert("deleted")})
    .catch((e) => { console.error(e)});
   // window.location.reload();
  };

  return (
    <tr>
      <td>{props.id}</td>
      <td><div> {props.patientName} <input type="text" onInput={(e) => { setPatientName(e.target.value) }} value={patientName}></input></div></td>
      <td><div>{props.docName} <input type="text" onInput={(e) => { setDocName(e.target.value) }} value={docName}></input></div></td>
      <td><div> {props.specialization} <input type="text" onInput={(e) => { setSpecialization(e.target.value) }} value={specialization}></input></div></td>
      <td><div> {props.amount} <input type="number" onInput={(e) => { setAmount(e.target.value) }} value={amount}></input></div></td>
      <td><div> {props.status} <input type="text" onInput={(e) => { setStatus(e.target.value) }} value={status}></input></div></td>
      <td><button onClick={update}>update</button> <button onClick={deletePayment}>delete</button></td>
      
      
    </tr>
  )
}

export default OnDeskPayments;