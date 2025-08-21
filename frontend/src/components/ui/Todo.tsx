import { CheckCircle, Circle, Trash2 } from "lucide-react";
import type { TodoInterface } from "../../pages/Dashboard";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BE_URL = import.meta.env.VITE_BE_API_URL;


export default function Todo({todo, deleteFunc}: {todo: TodoInterface, deleteFunc: () => Promise<void>}) {
    const [done, setDone] = useState<boolean>(todo.done!);
    const navigate = useNavigate();


    async function handleDone(){
        const currDone = !done;
        setDone(currDone);
         const token = localStorage.getItem('token');
        if(!token){
            alert("signin first to access this endpoint!!");
            navigate("/signin");
            return;
        }
        try{
            const res = await axios.put(`${BE_URL}/api/v1/todos`, {
                title: todo.title, 
                description: todo.description, 
                todoId: todo._id, 
                done: currDone
            }, {
                        headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`  
                }
            });

            if(res.status !== 200){
                alert(res.data.message);
                return;
            }

        }catch(err){
            console.log("failed to update todo with error: ", err);
            return;
        }
    }

    return (
        <div className={`border-0 p-2 ml-3 rounded-md mt-2 mb-2 bg-gray-200 shadow-md max-h-45 min-h-30  ${done && "bg-gray-100 text-gray-500"}`}>
            <div className="flex justify-between items-center">
                <div className="flex justify-center items-center w-fit p-1">
                <button
                className={``} 
                onClick={handleDone}>
                {
                    (done) ? <CheckCircle color="blue"/>
                    : <Circle />
                }
                </button>
            <h2 className={`text-lg font-bold ml-2 ${done && "line-through"}`}>
                {todo.title}
            </h2>
            </div>
            <button 
            onClick={deleteFunc}
            className="text-red-600 cursor-pointer mr-1"><Trash2 /></button>
            </div>
            <p className={`ml-2 mt-2`}>
                {todo.description} 
            </p>
        </div>
    )
}