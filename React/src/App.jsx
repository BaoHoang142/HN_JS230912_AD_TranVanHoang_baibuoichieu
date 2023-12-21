import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './login/Login'
import TodoList from './todoList/TodoList'
export default function App() {
  return (
    <>
    <div>
      <Routes>
        <Route path="/" element={<Login />}> </Route>
        <Route path="/todo" element={<TodoList />} />
      </Routes>



    </div>


    </>
  )
}
