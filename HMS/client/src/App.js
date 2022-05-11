import "./App.css";
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import Profile from "./Pages/Profile";
import Home from "./Pages/Home";
import About from "./Pages/About";
import ErrorPage from "./Pages/ErrorPage";

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



function App(){
    return(

      <Router>
        <header>
          <img className="logo" src="/pills.png" alt="logo"/>
          <nav>
            <ul className="nav__links">
              <li><a href="/">Dashboard</a></li>
              <li><a href="/Announcements">Announcements</a></li>
              <li><a href="/about">About</a> </li>
            </ul>
          </nav> 
          {/* <a class="cta" href="#"><button>Logout</button></a> */}
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
    );
}

export default App;

