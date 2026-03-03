import { useEffect, useState } from 'react'
import './App.css'
import { TodoContextProvider } from './contexts/TodoContext.js';
import TodoForm from './components/TodoForm.jsx';
import TodoItem from './components/TodoItem.jsx';

function App() {

  let [todos , setTodos] = useState([]);

  const addTodo = (todo)=>{
    setTodos((prevTodo)=>[{id:Date.now(),...todo},...prevTodo]);

  }
  const updateTodo = (id , todo)=>{
    setTodos((prevTodo)=>prevTodo.map((eachTodo)=>eachTodo.id === id? todo:eachTodo))
  }

  const deleteTodo = (id)=>{
    setTodos((prev)=>prev.filter((eachTodo)=> eachTodo.id != id))
  }

  const toggleComplete = (id) => {
    setTodos((prev) => 
    prev.map((prevTodo) => 
      prevTodo.id === id ? { ...prevTodo, 
        completed: !prevTodo.completed } : prevTodo))
  }
 
  // locale storage 

  useEffect(()=>{
         const todos = JSON.parse(localStorage.getItem("todos")); // this can get data in json
         if(todos && todos.length > 0){
          setTodos(todos);
         }
  },[]);

  useEffect(()=>{
       localStorage.setItem("todos" , JSON.stringify(todos));   // this can set data to string 
       
  },[todos]);
  
  

  return (
    <>
    <TodoContextProvider value={{todos , addTodo , updateTodo , deleteTodo , toggleComplete}}>
    
<div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
  {/* Header */}
  <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
    <div className="max-w-3xl mx-auto px-6 py-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-slate-900 mb-2">My Tasks</h1>
          <p className="text-slate-500 text-sm">{todos.length} {todos.length === 1 ? 'task' : 'tasks'}</p>
        </div>
        <div className="text-4xl">✓</div>
      </div>
    </div>
  </div>

  {/* Main Content */}
  <div className="max-w-3xl mx-auto px-6 py-8">
    {/* Input Form */}
    <div className="mb-8">
      <TodoForm/>
    </div>

    {/* Todo List */}
    <div className="space-y-2">
      {todos.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-slate-400 text-lg">No tasks yet. Add one to get started! 🚀</p>
        </div>
      ) : (
        todos.map((todo) => (
          <div key={todo.id}>
            <TodoItem todo={todo}/>
          </div>
        ))
      )}
    </div>
  </div>
</div>

    </TodoContextProvider>
    </>
  )
}

export default App
