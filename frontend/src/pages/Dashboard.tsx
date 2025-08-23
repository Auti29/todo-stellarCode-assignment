import { useEffect, useState } from "react";
import TodosSection from "../components/TodosSection";
import TopBar from "../components/ui/TopBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const BE_URL = import.meta.env.VITE_BE_API_URL;

export interface TodoInterface {
    _id: string, 
    title: string, 
    description: string, 
    done?: boolean,
    userId?: string, 
     
}

export default function Dashboard() {
    const [todos, setTodos] = useState<TodoInterface[]>([]);
    const [toastMessage, setToastMessage] = useState<string | null>(null);
    const navigate = useNavigate();

    if(toastMessage){
        if(toastMessage.split(' ')[0] === "New"){
            toast.success(toastMessage, {
            position: 'top-right',
    });
        }
        else{
            toast.info(toastMessage, {
                position: 'top-right',
            });
        }

    }

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(!token){
            alert("signin first to access this endpoint!!");
            navigate("/signin");
            return;
        }

        async function fetchTodos() {
            const res= await axios.get(`${BE_URL}/api/v1/todos`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`  
                }
            });
            const data = res.data;
            setTodos(data.todos);
        }
        fetchTodos();
    }, [navigate]);

    return (
        <div className="h-[100vh] w-[100vw] flex flex-col">
            <TopBar />
            <div className="mt-5">
                <TodosSection setToastMessage={setToastMessage} todos={todos} setTodos={setTodos}/>
            </div>
            <ToastContainer />
        </div>
    )
}