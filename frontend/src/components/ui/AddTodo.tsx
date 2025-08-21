import type { Dispatch, SetStateAction } from "react"

export default function AddTodo({title, description, setDesc, setTitle, onClick}: {
    title: string, 
    description: string, 
    setTitle: Dispatch<SetStateAction<string>>, 
    setDesc: Dispatch<SetStateAction<string>>, 
    onClick: () => Promise<void>
}) {
    return (
        <div className="h-fit p-3 border-2 shadow-lg w-[30%] mr-3 rounded-lg flex flex-col border-gray-300">
            <h1 className="text-2xl font-bold text-gray-600 ml-4 mt-2.5">Add Todo</h1>
            <div className="ml-4 mt-7">
                <div className="w-[95%] flex flex-col justify-center">
                <h3 className="text-xl font-bold text-gray-700">Title</h3>
                <input 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-lg border-2 rounded-md mt-1.5 p-2 border-gray-600" placeholder="Go to gym"/>
                </div>
                <div className="w-[95%] flex flex-col justify-center mt-5">
                <h3 className="text-xl font-bold text-gray-700">Description</h3>
                <textarea 
                value={description}
                onChange={(e) => setDesc(e.target.value)}
                className="text-lg border-2 rounded-md mt-1.5 p-2 border-gray-600 max-h-50" placeholder="do cardio for 30 mins..."/>
                </div>
                <div className="w-[95%] flex justify-center items-center mt-7 mb-5">
                <button 
                onClick={onClick}
                className="bg-blue-600 w-full text-white cursor-pointer text-lg font-bold pt-2 pb-2 pl-4 pr-4 border-0 rounded-md hover:bg-blue-400 ">Add Todo</button>

                </div>
            </div>
        </div>
    )
}