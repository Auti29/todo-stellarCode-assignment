import { useState } from "react";
import Signin from "../components/Signin";
import { ToastContainer, toast } from "react-toastify";


export interface messageI {
    messageToast: string, 
    status: number
}

export default function SigninPage() {
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
            <Signin setMessage = {setMessage}/>
            <ToastContainer theme="dark"/>
        </div>
    )
}