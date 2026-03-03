import React, { useState } from 'react'
import { useTodo } from '../contexts/TodoContext'

function TodoItem({ todo }) {
  const [isTodoEditable, setIsTodoEditable] = useState(false)
  const [todoMsg, setTodoMsg] = useState(todo.todo)
  const {updateTodo, deleteTodo, toggleComplete} = useTodo()

  const editTodo = () => {
    updateTodo(todo.id, {...todo, todo: todoMsg})
    setIsTodoEditable(false)
  }
  const toggleCompleted = () => {
    //console.log(todo.id);
    toggleComplete(todo.id)
  }

  return (
      <div
          className={`flex items-center gap-3 px-4 py-3 rounded-lg border transition-all duration-200 group ${
              todo.completed 
                  ? "bg-slate-50 border-slate-200 opacity-75" 
                  : "bg-white border-slate-200 hover:border-slate-300 hover:shadow-md"
          }`}
      >
          <input
              type="checkbox"
              className="w-5 h-5 cursor-pointer rounded border-slate-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
              checked={todo.completed}
              onChange={toggleCompleted}
          />
          <input
              type="text"
              className={`flex-1 outline-none bg-transparent text-slate-900 transition-all duration-200 ${
                  isTodoEditable 
                      ? "border-b-2 border-blue-500 px-2 py-1" 
                      : "border-transparent"
              } ${
                  todo.completed 
                      ? "line-through text-slate-400" 
                      : ""
              }`}
              value={todoMsg}
              onChange={(e) => setTodoMsg(e.target.value)}
              readOnly={!isTodoEditable}
          />
          {/* Edit, Save Button */}
          <button
              className="inline-flex w-8 h-8 rounded-md text-base items-center justify-center bg-slate-100 hover:bg-blue-100 transition-all duration-200 shrink-0 disabled:opacity-30 disabled:hover:bg-slate-100 opacity-0 group-hover:opacity-100"
              onClick={() => {
                  if (todo.completed) return;

                  if (isTodoEditable) {
                      editTodo();
                  } else setIsTodoEditable((prev) => !prev);
              }}
              disabled={todo.completed}
              title={todo.completed ? "Cannot edit completed task" : "Edit task"}
          >
              {isTodoEditable ? "✓" : "✏️"}
          </button>
          {/* Delete Todo Button */}
          <button
              className="inline-flex w-8 h-8 rounded-md text-base items-center justify-center bg-slate-100 hover:bg-red-100 hover:text-red-600 transition-all duration-200 shrink-0 opacity-0 group-hover:opacity-100"
              onClick={() => deleteTodo(todo.id)}
              title="Delete task"
          >
              🗑️
          </button>
      </div>
  );
}

export default TodoItem;