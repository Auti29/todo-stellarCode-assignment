import { useState } from "react";
import AuthButtonComponent from "./ui/AuthButtonComponent";
import BottomWarning from "./ui/BottomWarning";
import InputComponent from "./ui/InputComponent";
import MainHeading from "./ui/MainHeading";
import SubHeading from "./ui/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BE_URL = import.meta.env.VITE_BE_API_URL;


export default function Signup() {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string >("");
    const navigate = useNavigate();

    async function handleSignup() {
        if(username.length <= 4){
            alert("Username should have atleast 5 characters");
            return;
        }
        if(password.length <= 4){
            alert("Password should be atleast 5 characters long");
            return;
        }

        try{
            const res = await axios.post(`${BE_URL}/api/v1/signup`, {
                username,
                password
            });
            const status = res.status;
            if(status == 200){
                alert("Account created successfully!!");
                navigate("/signin");
                return;
            }

            alert(res.data.message);
            return;
        }catch(err){
            console.log("error occured: ", err);
            return;
        }
    }

    return(
        <div className="border-0 shadow-xl rounded-xl flex flex-col w-[23vw] relative p-4 pb-7 justify-center items-center">
            <MainHeading text="Register"/>
            <SubHeading text="Enter your information to create your account" />

            <div className="w-[90%] m-2">
                <InputComponent type="text" val = {username} setStateFunc={setUsername} inputId="username" label="Username" placeholder="John@29"/>
            </div>
                
            <div className="w-[90%] m-2">
                <InputComponent type="password" val = {password} setStateFunc={setPassword} inputId="password" label="Password" placeholder="Password"/>
           </div>

            <AuthButtonComponent onClickFunc={handleSignup} text="Sign Up"/>

            <BottomWarning text="Already have an account?" linkText="Sign In" url="/signin"/>
        </div>
    )
}