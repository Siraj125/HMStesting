import './doctorsDatabase.css';
import { useState, useEffect} from "react";
import Axios from "axios";
// import Header from "../../header.js";
//import DocsModel from '../../server/models/docs';
//import axios from 'axios';
//import { TextField } from '@material-ui/core';
//import DocsModel from '../../server/models/docs';
//import { Input } from "antd";
// function Component() {

//   return (
//     <div>

//     </div>
//   )
// }

function DoctorsDatabase() {  
 //get request
  const [listOfDocs, setListOfDocs] = useState([]);
  const [name, setName] = useState("")
  const [age, setAge] = useState(0)
  const [NIC, setNIC] = useState("")
  const [address, setAddress] =useState("")
  const [specialization, setSpecialization] =useState("")
  const [shift, setShift] =useState("")
  const [availability, setAvailability] =useState("")

 // const [query, setquery]=useState("")

 // const doc = { name: "iyhiusdif" };
  const addDocs = () => {
    Axios.post("http://localhost:3001/addDocs",{
      name,
      age, 
      NIC,
      address,
      specialization,
      shift,
      availability,
    }).then((response) => {
      alert("USER CREATED");
      Axios.get("http://localhost:3001/getDocs").then((response) => {
      setListOfDocs (response.data)
      setCurrentDocs(response.data.map((docs,index) => { return <Doctor 
        key={index} 
        age={docs.age} 
        name={docs.name} 
        NIC={docs.NIC} 
        address={docs.address} 
        specialization={docs.specialization}
        shift={docs.shift}
        availability={docs.availability}
        id={docs._id}/>}));
    });
      // setListOfDocs([...listOfDocs,{
      //   name,
      //   age,
      //   NIC, 
      // }])
    });
  };

  //const [editDocID, setEditContactID] = useState(null);
  const [currentDocs, setCurrentDocs] = useState([]);

  const search = (query) => {
    let filtered = listOfDocs.filter(doc => {
      if (query === '') {
        return doc;
     } else if (doc.name.toLowerCase().includes(query.toLowerCase())) {  
        return doc;
     }
     })
     filtered = filtered.map((docs,index) => { return <Doctor 
        key={index} 
        age={docs.age}
        name={docs.name}
        NIC={docs.NIC}
        address={docs.address} 
        specialization={docs.specialization}
        shift={docs.shift}
        availability={docs.availability}
        id={docs._id}/>})
     setCurrentDocs(filtered);
  }

  useEffect(() => {
    Axios.get("http://localhost:3001/getDocs").then((response) => {
      setListOfDocs (response.data)
      setCurrentDocs(response.data.map((docs,index) => { return <Doctor 
        key={index} 
        age={docs.age}
        name={docs.name}
        NIC={docs.NIC}
        address={docs.address} 
        specialization={docs.specialization}
        shift={docs.shift}
        availability={docs.availability}
        id={docs._id}/>}));
    });
  }, [])

  // }

  return (
    <div className="App">
      
      {/* <Header /> */}
      <div className='flex-container'>
      <div className='flex-child searchBar'>
        <input placeholder='search....' onChange={event => search(event.target.value)} />

   
      </div>
      <div className="flex-child docsDisplay">
        {/* <button onClick= {getDocs}>show docs</button> */}
          { currentDocs.length === 0 ? <p>Nothing here boiii</p> : null }
          <table className="table" style={{ display: currentDocs.length === 0 ? 'none' : ""}}>
              <thead>
                <tr>
                   <th>#</th>
                   <th >name</th>
                   <th >age</th>
                   <th >NIC</th>
                   <th >address</th>
                   <th >specialization</th>
                   <th >shift</th>
                   <th >availability</th>
                   <th >actions</th>
                  
                </tr>
              </thead>
              <tbody>
                  {currentDocs}
              </tbody>
          </table>
        

      </div>
     
      </div>
        
         <div className='adddocs'>
          {/* <button onClick= {addDocs}>add docs</button> */}
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
          type="text" 
          placeholder="address.."
          required="required"
          onChange= {(event) => {
            setAddress(event.target.value);
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
          type="text" 
          placeholder="shift.."
          required="required"
          onChange= {(event) => {
            setShift(event.target.value);
          }}
          />

          <input 
          type="text" 
          placeholder="availability.."
          required="required"
          onChange= {(event) => {
            setAvailability(event.target.value);
          }}
          />
          <button onClick={addDocs}> add doctor </button>
        </div> 
        
    </div>
  );
}

function Doctor(props) {
  const [age, setAge] = useState(props.age);
  const [name, setName] = useState(props.name);
  const [NIC, setNIC] =useState(props.NIC);
  const [address, setAddress] =useState(props.address);
  const [specialization, setSpecialization] =useState(props.specialization)
  const [shift, setShift] =useState(props.shift)
  const [availability, setAvailability] =useState(props.availability)

  const update = () => {
    console.table({name: name, age : age, NIC: NIC , address: address, specialization: specialization, shift: shift, availability: availability});
    Axios.post("http://localhost:3001/updateAge",{
      newName : name,
      newAge :age,
      newNIC :NIC,
      newAddress :address,
      newSpecialization :specialization,
      newShift :shift,
      newAvailablity :availability,
      id : props.id,
    }).then(() => { alert("Done boii")})
    .catch((e) => { console.error(e) });

  }
  const deletedocs = () =>{
    console.table({name: name, age : age, NIC: NIC ,address: address, specialization: specialization, shift: shift, availability: availability});
    Axios.post('http://localhost:3001/deletedoc/:id',{
      id : props.id,
    }).then((response) => { alert("deleted")})
    .catch((e) => { console.error(e)});
  };
//adjust this shit
  return (
    <tr>
      <td>{props.id}</td>
      <td><div> {props.name} <input type="text" onInput={(e) => { setName(e.target.value) }} value={name}></input></div></td>
      <td><div>{props.age} <input type="number" onInput={(e) => { setAge(e.target.value) }} value={age}></input></div></td>
      <td><div> {props.NIC} <input type="text" onInput={(e) => { setNIC(e.target.value) }} value={NIC}></input></div></td>
      <td><div> {props.address} <input type="text" onInput={(e) => { setAddress(e.target.value) }} value={address}></input></div></td>
      <td><div> {props.specialization} <input type="text" onInput={(e) => { setSpecialization(e.target.value) }} value={specialization}></input></div></td>
      <td><div> {props.shift} <input type="text" onInput={(e) => { setShift(e.target.value) }} value={shift}></input></div></td>
      <td><div> {props.availability} <input type="text" onInput={(e) => { setAvailability(e.target.value) }} value={availability}></input></div></td>
      <td><button onClick={update}>update</button> <button onClick={deletedocs}>delete</button></td>
      
      
    </tr>
  )
}

export default DoctorsDatabase;
/*function search(){
const [query, setquery]=useState("")
          return( <div>
            <input placeholder='search....' onChange={event => setquery(event.target.value)} />
            
            {listOfDocs.map((docs,index) => { return <Doctor key={index} age={docs.age} name={docs.name} NIC={docs.NIC} id={docs._id}/>})}
            

            </div>)
          }*/
       
/*{
  DocsModel.map((post) => (
    <div key={post.id}>
      <p>{post.name}</p>
      <p>{post.age}</p>
      <p>{post.NIC}</p>
    </div>
  ));
}*/

//const { Search } = Input;

/*function SearchFunction() {
    const [SearchTerms, setSearchTerms] = useState("")
    const onChangeSearch = (event) => {
      setSearchTerms(event.currentTarget.value)
    }
    return(
    <div>  
      <Search 
        value={SearchTerms}
        onChange={onChangeSearch}
        placeholder="Search By Typing..."
      />
    </div>
    )
}*/

/*function list(props){
  return(
    <ul>
      {DocsModel.map((item,index)=>(
        <li key={index}>age ={item.age} name ={item.name} NIC ={item.NIC} id ={item._id}</li>
       // ((docs,index) => { return <Doctor key={index} age={docs.age} name={docs.name} NIC={docs.NIC} id={docs._id}/>})}
      ))}
    </ul>
  )
}*/