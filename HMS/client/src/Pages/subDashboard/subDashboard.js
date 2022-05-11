import React from "react";
import './subDashboard.css';
import {Link} from "react-router-dom";
//import { useHistory } from "react-router-dom"

function Components(){
   // let history =  useHistory();
    return(
        <div className='subDashboard'>
            <div>
                <div>sub dash board</div>
                <ul className="DashBoard">
                    <li><Link to="/DoctorsDatabase">Doctors</Link></li> 
                    <li><Link to="/patients">Patients</Link></li>
                    <li><Link to="/onDeskPayments">Payments</Link></li>
                    <li><Link to="/appointments">Appointments</Link></li>
                </ul>
                {/* <link to ="/doctorsDatabase">Doctors</link> */}
                {/* <button onClick={() => history.push("./PatientsDatabase/patients")}>Patients</button>
                <button onClick={() => history.push("./onDeskPayments/onDeskPayments")}>On Desk Payments</button>
                <button onClick={() => history.push("./appointments/appointments")}>Appointments</button> */}

            </div>

        </div>

    )
}

export default Components;