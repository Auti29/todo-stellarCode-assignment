import BottomWarning from "./ui/BottomWarning";
import InputComponent from "./ui/InputComponent";
import MainHeading from "./ui/MainHeading";
import SubHeading from "./ui/SubHeading";
import AuthButtonComponent from "./ui/AuthButtonComponent";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import type { Dispatch } from "react";
import type { SetStateAction } from "react";
import type { messageI } from "../pages/SigninPage";


const BE_URL = import.meta.env.VITE_BE_API_URL;

export default function Signin({setMessage}: {setMessage: Dispatch<SetStateAction<messageI | null>>}) {
        const [username, setUsername] = useState<string >("");
        const [password, setPassword] = useState<string >("");
        const navigate = useNavigate();

        async function handleSignin() {
        if(username.length <= 4){
            setMessage({
                messageToast: "username should atleast have 5 characters", 
                status: 404
            })
            return;
        }
        if(password.length <= 4){
            setMessage(
                {
                    messageToast: "Wrong password/username", 
                    status: 404
                }
            );
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
                navigate("/");
                return;
            }

           
        }catch (err) {
            if (axios.isAxiosError(err)) {
            const status = err.response?.status;

            if (status === 404) {
                alert("No user exists with these credentials, register yourself to move forward!");
                navigate("/signup");
            } else if (status === 401) {
                setMessage({
                    messageToast: "Invalid username or password.", 
                    status: 401
                });
            } else {
                alert("Something went wrong. Please try again.");
            }
            } else {
                console.log("Unexpected error:", err);
            }
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