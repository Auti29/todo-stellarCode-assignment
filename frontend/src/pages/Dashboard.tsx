import { useEffect, useState } from "react";
import TodosSection from "../components/TodosSection";
import TopBar from "../components/ui/TopBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
    const navigate = useNavigate();

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
                <TodosSection todos={todos} setTodos={setTodos}/>
            </div>
        </div>
    )
}