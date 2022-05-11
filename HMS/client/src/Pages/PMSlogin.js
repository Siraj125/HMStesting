import React, {useState} from "react";
import Axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import './CSS/PMSlogin.css';
import {pmsLoginSchema} from '../Validations/PmsLoginValidation';

function PMSlogin(){
    const [loginError,setLoginError] = useState("");
    const [signupError,setSignupError] = useState("");
    const [signupSuccess,setSignupSuccess] = useState("");

    let navigate = useNavigate();

    const [usernameReg, setUsernameReg] = useState("");
    const [passwordReg, setPasswordReg] = useState("");

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const register = async(event) => {
        event.preventDefault();
        let formdata = {
          pmsusername: event.target[0].value,
          pmspassword: event.target[1].value,
        };
        
        const isValid = await pmsLoginSchema.isValid(formdata);
        
        
        if(isValid){
            Axios.post("http://localhost:3001/createPMSuser",{
                username: usernameReg,
                password: passwordReg,
            }).then((response)=>{
                setSignupError("");
                setSignupSuccess("New User Added.")
            })
        }
        else{
        setSignupError("Username and Password should be atleast 5 characters long.");
        setSignupSuccess("");
        };
    };

    const login = (event) => {
        event.preventDefault();

        Axios.post("http://localhost:3001/loginPMSuser",{
            username: username,
            password: password,
        }).then((response)=>{
            const token = response.data.token;
            const stat = response.data.success;
            console.log(token);
            setLoginError(response.data.message);
            if(stat==true){
            navigate("/PManagement/"+username);
            }
        })
    };

    

    return(
        <div className="sign-in-body">
            <div className="container" id="container">
                <div className="form-container sign-up-container">
                    <form onSubmit={register}>
                        <h1>Create Account</h1>
                        <div className="social-container"></div>
                        <span>Enter a username and password</span>
                        <input type="text" placeholder="Username" onChange={(e)=>{setUsernameReg(e.target.value)}} />
                        <input type="password" placeholder="Password" onChange={(e)=>{setPasswordReg(e.target.value)}} />
                        <button type="submit" >Sign up</button>
                        <span className="login-error-message"> {signupError}</span>
                        <span className="login-success-message"> {signupSuccess}</span>
                    </form>
                </div>
            
            
                <div className="form-container sign-in-container">
                    <form onSubmit={login}>
                        <h1>Sign in</h1>
                        <div className="social-container"></div>
                        <span>Use your credentials</span>
                        <input type="text" placeholder="Username... " onChange={(e)=>{setUsername(e.target.value)}}/>
                        <input type="password" placeholder="Password..." onChange={(e)=>{setPassword(e.target.value)}}/>
                        {/* <a href="#">Forgot your password?</a> */}
                        <button type="submit">Sign in</button>
                        <span className="login-error-message"> {loginError}</span>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default PMSlogin;