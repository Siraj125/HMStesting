import "./App.css";
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import Profile from "./Pages/Profile";
import Home from "./Pages/Home";
import About from "./Pages/About";
import ErrorPage from "./Pages/ErrorPage";
import { createContext, useState } from "react";
import ReactSwitch from "react-switch";
import {Helmet} from "react-helmet";

//pms
import PMS from "./Pages/Meds";
import Announcements from "./Pages/Announcements";
import PMSlogin from "./Pages/PMSlogin";
import PharmaManagement from "./Pages/PharmaManagement";
import DrugReqs from "./Pages/DrugReqs";

//Appointment System
import DoctorsDatabase from './Pages/doctorsDatabase/doctorsDatabase';
import PatientsDatabase from './Pages/PatientsDatabase/patients';
import SubDashboard from './Pages/subDashboard/subDashboard';
// import reportWebVitals from './reportWebVitals';
import OnDeskPayments from './Pages/onDeskPayments/onDeskPayments';
import Appointments from './Pages/appointments/appointments';
import MedSearch from "./Pages/MedSearch";

export const ThemeContext = createContext(null);

function App(){

  const [theme, setTheme] = useState("dark");
  const toggleTheme = () => {
    setTheme((curr) => (curr==="light" ? "dark" : "light"));
  };
    return(
      <ThemeContext.Provider value={{theme,toggleTheme}}>
    <div id={theme}>
      <Router>
        <header>
          <Helmet>
            <meta charSet="utf-8" />
            <title>Hospital Run</title>
            <link rel="canonical" href="http://mysite.com/example" />
            <meta name="description" content="Hospital management system" />
          </Helmet>
           <img className="logo" src="https://cdn.icon-icons.com/icons2/52/PNG/256/signofhealth_medical_10742.png" alt="logo"/>
          
          <nav>
            <ul className="nav__links">
              <li><a href="/">Dashboard</a></li>
              <li><a href="/Announcements">Announcements</a></li>
              <li><a href="/about">About</a> </li>
            
            </ul>
          </nav> 
          {/* <a class="cta" href="#"><button>Logout</button></a> */}
          <div className="DarkModeSwitch">
            <label>Toggle Dark Mode</label>
            <div className="DMSwitch">
            <ReactSwitch onChange={toggleTheme} checked={theme === "dark"}/>
            </div>
            </div>
        </header>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/profile/:username" element={<Profile/>}/>
          <Route path="/Announcements" element={<Announcements/>}/>
          <Route path="/about" element={<About/>}/>
          
          {/* Pharmacy Management */}
          <Route path="/PMSlogin" element={<PMSlogin/>}/>
          <Route path="/PManagement/:username" element={<PharmaManagement/>}/>
          <Route path="/Meds/:username" element={<PMS/>}/>
          <Route path="/DrugReqs/:username" element={<DrugReqs/>}/>
          <Route path="/MedSearch/:username" element={<MedSearch/>}/>


          {/* appointment Scheduling */}
          <Route path="/DoctorsDatabase" element={<DoctorsDatabase />} />
          <Route path="/patients" element={<PatientsDatabase />} />
          <Route path="/subDashboard" element={<SubDashboard/>} /> 
          {/* <Route path="/About" element={<About/>} /> */}
          <Route path="/OnDeskPayments" element={<OnDeskPayments/>} />  
          <Route path="/appointments" element={<Appointments/>} />


          <Route path="*" element={<ErrorPage/>}/>
        </Routes>
        
      </Router>
      </div>
      </ThemeContext.Provider>
    );
}

export default App;

