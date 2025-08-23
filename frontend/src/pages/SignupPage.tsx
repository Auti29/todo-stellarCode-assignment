import { useState } from "react";
import Signup from "../components/Signup";
import type { messageI } from "./SigninPage";
import { toast, ToastContainer } from "react-toastify";

export default function SignupPage() {
    const [message, setMessage] = useState<messageI | null>(null);
    
    
        if(message){
            if(message.status !== 200){
                toast.error(message.messageToast, {
                position: 'top-right',
                });
            }
            else {
                toast.info(message.messageToast, {
                position: 'top-right',
            });
    
            }
        }
    
    
    return (
        <div className="h-[100vh] w-[100vw] flex justify-center items-center">
            <Signup setMessage={setMessage}/>
            <ToastContainer theme="dark"/>
        </div>
    )
}