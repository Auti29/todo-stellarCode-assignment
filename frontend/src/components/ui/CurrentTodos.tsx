import type { Dispatch, SetStateAction } from "react";
import type { TodoInterface } from "../../pages/Dashboard";
import Todo from "./Todo";
import axios from "axios";
import { NotebookPenIcon } from "lucide-react";
const BE_URL = import.meta.env.VITE_BE_API_URL;


export default function CurrentTodos({todos, setTodos}: {todos: TodoInterface[], setTodos: Dispatch<SetStateAction<TodoInterface[]>>}) {
    async function handleDeleteTodo(todoId: string) {
        const token = localStorage.getItem('token');
        try{
            
            const res = await axios.delete(`${BE_URL}/api/v1/todos/${todoId}`, {
                                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`  
                }

            });
            if(res.status !== 200){
                alert(res.data.message);
                return;
            }
            const newTodos = todos.filter(t => t._id !== todoId);
            setTodos(newTodos);

        }catch(err){
            console.log("error occured: " , err);
        }
    }

    return (
        <div className={`border-2 shadow-lg p-2 w-[65%] ml-3 rounded-lg flex flex-col border-gray-300 relative`}>
            <h1 className="text-2xl font-bold text-gray-600 ml-4 mt-1.5">Current Todos</h1>
            {todos.length > 0 ?
            <div className="mt-5 grid grid-cols-2 gap-0.5 mr-2 flex-1 overflow-y-auto max-h-[70vh] p-2">
                {
                    todos?.map((todo, i) => {
                        return(
                            <Todo key={i} todo={todo} deleteFunc={() => handleDeleteTodo(todo._id)}/>
                        )
                    })
                }
            </div>
            :
            <div className="flex flex-col justify-center items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  ">
                <span className="text-xl font-bold text-gray-600"><NotebookPenIcon size={50}/></span>
                <h1 className="text-2xl font-bold text-gray-600">
                    Add todos to get started!
                </h1>
            </div>
            }
        </div>
    )
}