import { Route } from 'react-router-dom'
import React from 'react'
import {Router, Routes, BrowserRouter } from "react-router-dom"

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<h1>Home</h1>}/>
      <Route path='/about' element={<h1>About</h1>}/>
      <Route path='/contact' element={<h1>Contact</h1>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
