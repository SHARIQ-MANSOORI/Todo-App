import React, { useState } from 'react'
import { useTodo } from '../contexts/TodoContext';

function TodoForm() {

    let [todo , setTodo] = useState("");
    const {addTodo} = useTodo();

    let add = (e)=>{
        e.preventDefault();
        if(!todo) return;

        addTodo({todo , completed:false});
        setTodo("");
    }
    

    return (
        <form onSubmit={add} className="flex gap-2">
            <input
                type="text"
                placeholder="Add a new task..."
                className="flex-1 px-4 py-3 rounded-lg border border-slate-200 bg-white text-slate-900 placeholder-slate-400 outline-none transition-all duration-200 hover:border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-50 shadow-sm"
                value={todo}
                onChange={(e)=>setTodo(e.target.value)}
            />
            <button 
                type="submit" 
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shrink-0 transition-all duration-200 shadow-sm hover:shadow-md active:scale-95"
            >
                Add
            </button>
        </form>
    );
}

export default TodoForm;

