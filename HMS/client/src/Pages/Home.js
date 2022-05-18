import React from "react";
import {useNavigate, useParams} from "react-router-dom";

function Home(){
    let navigate = useNavigate();
    const navPMS = () => navigate("/PMSlogin");
    const navApp = () => navigate("/subDashboard")
    return(
        <div className="home-body">
        <a onClick={()=>{navPMS()}}>Pharma Management</a>
        <a onClick={()=>{navApp()}}>Appointments</a>
        <a onClick={()=>{}}>OPD</a>
        </div>
    );
}

export default Home;