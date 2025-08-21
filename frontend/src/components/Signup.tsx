import { useState } from "react";
import AuthButtonComponent from "./ui/AuthButtonComponent";
import BottomWarning from "./ui/BottomWarning";
import InputComponent from "./ui/InputComponent";
import MainHeading from "./ui/MainHeading";
import SubHeading from "./ui/SubHeading";

export default function Signup() {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string >("");
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

            <AuthButtonComponent onClickFunc={() => {}} text="Sign Up"/>

            <BottomWarning text="Already have an account?" linkText="Sign In" url="/signin"/>
        </div>
    )
}