import { LogOutIcon, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function TopBar({username}: {username: string}) {
    const navigate = useNavigate();
    return (
        <div className="h-fit border-2 flex justify-between items-center shadow-lg border-gray-300 p-2">
        <div className="flex justify-center items-center w-fit p-2 m-1">
            <div className="p-1 border-2 border-gray-600 rounded-full w-fit bg-gray-200">
                <User />
            </div>
            {username && <span className="text-lg font-bold  ml-2">{`Hello, ${username}`}</span>}
        </div>

        <button 
        onClick={() => {
            localStorage.removeItem('token');
            navigate('/signin');
            return;
        }}
        className="mr-3 flex border-2 bg-red-200 pt-2 pb-2 pl-4 pr-4 justify-center items-center rounded-lg border-red-600 font-bold cursor-pointer hover:bg-red-600 hover:text-white">Logout<span className="ml-1"><LogOutIcon /></span>
        </button>
        </div>
    );
}