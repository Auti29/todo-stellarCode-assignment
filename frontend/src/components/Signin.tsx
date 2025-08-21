import BottomWarning from "./ui/BottomWarning";
import InputComponent from "./ui/InputComponent";
import MainHeading from "./ui/MainHeading";
import SubHeading from "./ui/SubHeading";
import AuthButtonComponent from "./ui/AuthButtonComponent";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const BE_URL = import.meta.env.VITE_BE_API_URL;

export default function Signin() {
        const [username, setUsername] = useState<string >("");
        const [password, setPassword] = useState<string >("");
        const navigate = useNavigate();

        async function handleSignin() {
        if(username.length <= 4){
            alert("Username should have atleast 5 characters");
            return;
        }
        if(password.length <= 4){
            alert("Password should be atleast 5 characters long");
            return;
        }
        try{
            const res = await axios.post(`${BE_URL}/api/v1/signin`, {
                username,
                password
            });
            const status = res.status;
            if(status == 200){
                alert(res.data.message);
                localStorage.setItem('token', res.data.token);
                navigate("/dashboard");
                return;
            }

            alert(res.data.message);
            return;
        }catch(err){
            console.log("Error occured: ", err);
            return;
        }

        }

    return (
        <div className="border border-slate-200 rounded-xl flex flex-col w-[23vw] relative p-4 pb-7 justify-center items-center shadow-lg">
            <MainHeading text="Sign In"/>
            <SubHeading text="Enter your credentials to access your account"/>
            <div className="w-[90%] m-2">
                <InputComponent type="text" val={username} setStateFunc={setUsername}  label="Username" inputId="username" placeholder="Username"/>
            </div>
            <div className="w-[90%] m-2">
                <InputComponent type="password" val={password} setStateFunc={setPassword} label="Password" inputId="password" placeholder="Password"/>
            </div>

            <AuthButtonComponent onClickFunc={handleSignin} text="Sign In"/>

            <BottomWarning text="Don't have an account?" linkText="Sign Up" url="/signup"/>
        </div>
    );
}