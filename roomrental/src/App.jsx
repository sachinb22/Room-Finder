import React from 'react'
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';

function App() {


  return (
    <>
 
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={< HomePage />} />
        <Route exact path='/login' element={< LoginPage />} />
        <Route exact path='/register' element={< RegisterPage />} />
      </Routes>
    </BrowserRouter>
    
    </>
  )
}

export default App
