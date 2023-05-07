import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignUp from './views/auth/sign-up'
import SignIn from './views/auth/sign-in'
import Chat from './views/chat'
import Avatar from 'views/avatar'

export default function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path='/sign-up' element={<SignUp />}></Route>
        <Route path='/sign-in' element={<SignIn />}></Route>
        <Route path='/avatar' element={<Avatar />}></Route>
        <Route path='/' element={<Chat />}></Route>
      </Routes>
    </BrowserRouter>
  )
}