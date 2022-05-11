import React from "react";
import {useNavigate, useParams} from "react-router-dom";

function Announcements(){
    let navigate = useNavigate();
    let {userid} = useParams();
    return(
    <div>
        THIS IS THE ANNOUNCEMENT PAGE!!!
        {/* <button 
        onClick={() => {navigate("/about")}}>go about</button> */}
    </div>
    );
}

export default Announcements;