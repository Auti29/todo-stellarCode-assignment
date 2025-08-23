import { useState, type Dispatch, type SetStateAction } from "react";
import type { TodoInterface } from "../pages/Dashboard";
import AddTodo from "./ui/AddTodo";
import CurrentTodos from "./ui/CurrentTodos";
import axios from "axios";
const BE_URL = import.meta.env.VITE_BE_API_URL;


export default function TodosSection({todos, setTodos, setToastMessage}: {todos: TodoInterface[], setTodos: Dispatch<SetStateAction<TodoInterface[]>>, setToastMessage: Dispatch<SetStateAction<string | null>>}) {
    const [title, setTitle] = useState<string>("");
    const [description , setDescription] = useState<string>("");

    async function handleAddtodo() {
        if(title.length == 0){
            setToastMessage("title is mandatory!!");
            return;
        }
        if(description.length == 0){
            setToastMessage("description is mandatory!!");
            return;
        }
        const token = localStorage.getItem('token');
        try{
            const res = await axios.post(`${BE_URL}/api/v1/todos`, {
                title, 
                description 
            }, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`  
                    }
            });

            if(res.status != 200){
                alert(res.data.message);
                return;
            }

            setTodos(prev => prev = [...prev, res.data.createdTodo]);
            setToastMessage(`New todo added: ${res.data.createdTodo.title}`);
            setTitle("");
            setDescription("");

        }
        catch(err){
            console.log("error on fe: ", err);
            return;
        }
    }

    return (
        <div className="flex justify-between "> 
            <CurrentTodos setTodos={setTodos} todos={todos}/>
            <AddTodo onClick = {handleAddtodo} title={title} description={description} setTitle={setTitle} setDesc={setDescription}/>

        </div>
    )
}