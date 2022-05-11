import { useState } from 'react';
import Axios from 'axios'

function App() {  
  const [listOfDocs, setListOfDocs] = useState([]);
  const [name, setName] = useState("")
  const [age, setAge] = useState(0)
  const [NIC, setNIC] = useState("")
 

    // const getDocs = () => { 
    // Axios.get("http://localhost:3001/getDocs").then((response) => {
    // setListOfDocs (response.data)
    // });
    // };

  const addDocs = () => {
    Axios.post("http://localhost:3001/addDocs",{
      name,
      age,
      NIC,
    }).then((response) => {
      alert("USER CREATED");
      setListOfDocs([...listOfDocs,{
        name,
        age,
        NIC, 
      }])
    });
  };

  return(
    <div className="App">
         <div className='adddocs'> 
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
          <button onClick={addDocs}> add doctor </button>
         
        </div>
    </div>
  )
} 
export default App;