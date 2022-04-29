import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, NavLink, Routes, Route } from 'react-router-dom'
import AppClass from './components/AppClass'
import AppFunctional from './components/AppFunctional'
import './styles/reset.css'
import './styles/styles.css'

const container = document.getElementById('root')
const root = createRoot(container)

root.render(
  <BrowserRouter>
    <React.StrictMode>
      <h1>ADVANCED REACT</h1>
      <nav>
        <NavLink to="/">GRID</NavLink>
        <NavLink to="/class-based">Tic Tac Toe</NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<AppFunctional className="functional" />} />
        <Route path="class-based" element={<AppClass className="class-based" />} />
      </Routes>
    </React.StrictMode>
  </BrowserRouter>
)
