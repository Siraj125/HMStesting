import React from "react";
import Axios from "axios";
// import Select from "react-select";
import { useState, useEffect } from "react";
// import Header from "../../header.js";
import {appvalSchema} from '../../Validations/AppointmentsValidation';


function Scheduling(){
    const [listOfSchedules, setListOfSchedules] = useState([]);
    const [docID, setDocID]= useState("");
    const [docName, setDocName] = useState("");
    const [patientID, setPatientID] = useState(0);
    const [patientName, setPatientName] = useState("");
    const [time, setTime] =useState("");
    const [specialization, setSpecialization] =useState("");
    const [room, setRoom] =useState("");
    const [error,setError] = useState("");

    const addAppointments = async(event) => {
        // console.table({docID: docID, docName : docName, patientID: patientID , patientName: patientName,time: time, specialization: specialization,  room: room});
        event.preventDefault();
        let formdata = {
          aDocId: event.target[0].value,
          aDocName: event.target[1].value,
          aPatientId: event.target[2].value,
          aPatientName: event.target[3].value,
          aTime: event.target[4].value,
          aSpecialization: event.target[5].value,
          aRoom: event.target[6].value
        };

        const isValid = await appvalSchema.isValid(formdata);
        
        
        
        
        if(isValid){
        Axios.post("http://localhost:3001/appointments/addAppointments",{ //change
            docID,
            docName, 
            patientID,
            patientName,
            time,
            specialization,
            room,
        }).then((response) => {
          alert("USER CREATED");
          Axios.get("http://localhost:3001/appointments/getAppointments").then((response) => {//change
          setListOfSchedules (response.data)
          setCurrentAppointments(response.data.map((appo,index) => { return <Appointments //change
            key={index} 
            docID={appo.docID} 
            docName={appo.docName} 
            patientID={appo.patientID} 
            patientName={appo.patientName} 
            time={appo.time}
            specialization={appo.specialization}
            room={appo.room}
            id={appo._id}/>}));
            });
        });
      } else setError("Incorrect inputs");
    };

        const [CurrentAppointments, setCurrentAppointments] = useState([]);

        const search = (query) => {
          let filtered = listOfSchedules.filter(ap => {
            if (query === '') {
              return ap;
           } else if (ap.docName.toLowerCase().includes(query.toLowerCase())) {  
              return ap;
           }
           })
           filtered = filtered.map((appo,index) => { return <Appointments //change
           key={index} 
           docID={appo.docID} 
           docName={appo.docName} 
           patientID={appo.patientID} 
           patientName={appo.patientName} 
           time={appo.time}
           specialization={appo.specialization}
           room={appo.room}
           id={appo._id}/>})
           setCurrentAppointments(filtered);
        }
      
        useEffect(() => {
          Axios.get("http://localhost:3001/appointments/getAppointments").then((response) => {//change
            setListOfSchedules (response.data)
            setCurrentAppointments(response.data.map((appo,index) => { return <Appointments //change
            key={index} 
            docID={appo.docID} 
            docName={appo.docName} 
            patientID={appo.patientID} 
            patientName={appo.patientName} 
            time={appo.time}
            specialization={appo.specialization}
            room={appo.room}
            id={appo._id}/>}));
          });
        }, [])
      

    return(
        
    <div className="appointments">
         {/* <Header /> */}
      <div className='flex-container'>
      <div className='flex-child searchBar'>
        <input placeholder='search....' onChange={event => search(event.target.value)} />
        </div>
        <div className="displayAppointments">
        { CurrentAppointments.length === 0 ? <p>Nothing here boiii</p> : null }
          <table className="table" style={{ display: CurrentAppointments.length === 0 ? 'none' : ""}}>
                <thead>
                <tr>
                   <th >appointmentID</th>
                   <th >Doc ID</th>
                   <th >Doc name</th>
                   <th >Patient ID</th>
                   <th >Patient name</th>
                   <th >time</th>
                   <th >Specialization</th>
                   <th >room</th>
                   <th >functions</th>
                  
                </tr>
                </thead>
                <tbody>
                {CurrentAppointments}
                </tbody>

            </table>
            </div>

        </div>
        <div className="addData">
             <form onSubmit={addAppointments}>
                <input 
                type="number" 
                placeholder="docID.."
                required="required"
                onChange= {(event) => {
                    setDocID(event.target.value);
                }}
                />
                
                <input 
                type="text" 
                placeholder="docName.."
                required="required"
                onChange= {(event) => {
                    setDocName(event.target.value);
                }}
                />

                <input 
                    type="number" 
                    placeholder="patientID.."
                    required="required"
                    onChange= {(event) => {
                        setPatientID(event.target.value);
                    }}
                />

                <input 
                    type="text" 
                    placeholder="patientName.."
                    required="required"
                    onChange= {(event) => {
                        setPatientName(event.target.value);
                    }}
                />

                <input 
                    type="text" 
                    placeholder="time.."
                    required="required"
                    onChange= {(event) => {
                        setTime(event.target.value);
                    }}
                />

                <input 
                    type="text" 
                    placeholder="specialization.."
                    required="required"
                    onChange= {(event) => {
                        setSpecialization(event.target.value);
                    }}
                />

                <input 
                    type="text" 
                    placeholder="room.."
                    required="required"
                    onChange= {(event) => {
                        setRoom(event.target.value);
                    }}
                />
         <button type="submit"> add appointment </button>
         </form>
         <span className='error-msg'>{error}</span>
        </div>
    </div>
    );
}

function Appointments(props) {
    const [docID, setDocID] = useState(props.docID);
    const [docName, setDocName] = useState(props.docName);
    const [patientID, setPatientID] =useState(props.patientID);
    const [patientName, setPatientName] =useState(props.patientName);
    const [time, setTime] =useState(props.time);
    const [specialization, setSpecialization] =useState(props.specialization);
    const [room, setRoom] =useState(props.room);

    const update = () => {
        console.table({docID: docID, docName : docName, patientID: patientID , patientName: patientName,time: time, specialization: specialization,  room: room});
        Axios.post("http://localhost:3001/appointments/updateAppointments",{
          newDocID : docID,
          newDocName :docName,
          newPatientID :patientID,
          newPatientName:patientName,
          newSpecialization :specialization,
          newTime :time,
          newRoom :room,
          id : props.id,
        }).then(() => { alert("Done boii")})
        .catch((e) => { console.error(e) });
    
      }
      const deleteAppointments = () =>{
        console.table({docID: docID, docName : docName, patientID: patientID , patientName: patientName,time: time, specialization: specialization,  room: room});
        Axios.post('http://localhost:3001/appointments/deleteAppointment/:id',{
          id : props.id,
        }).then((response) => { alert("deleted")})
        .catch((e) => { console.error(e)});
       // window.location.reload();
      };

      return (
        <tr>
          <td>{props.id}</td>
          <td><div> {props.docID} <input type="number" onInput={(e) => { setDocID(e.target.value) }} value={docID}></input></div></td>
          <td><div>{props.docName} <input type="text" onInput={(e) => { setDocName(e.target.value) }} value={docName}></input></div></td>
          <td><div> {props.patientID} <input type="number" onInput={(e) => { setPatientID(e.target.value) }} value={patientID}></input></div></td>
          <td><div> {props.patientName} <input type="text" onInput={(e) => { setPatientName(e.target.value) }} value={patientName}></input></div></td>
          <td><div> {props.specialization} <input type="text" onInput={(e) => { setSpecialization(e.target.value) }} value={specialization}></input></div></td>
          <td><div> {props.time} <input type="text" onInput={(e) => { setTime(e.target.value) }} value={time}></input></div></td>
          <td><div> {props.room} <input type="text" onInput={(e) => { setRoom(e.target.value) }} value={room}></input></div></td>
          <td><button onClick={update}>update</button> <button onClick={deleteAppointments}>delete</button></td>
          
          
        </tr>
      )
}

export default Scheduling;
