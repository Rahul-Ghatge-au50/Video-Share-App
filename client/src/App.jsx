import { useState } from 'react'

// import './App.css'
import { Routes, Route, Navigate, Router } from 'react-router-dom';
import Login from './Pages/Login';
import Register from './Pages/Register';
import UploadVideo from './Pages/UploadVideo';
import Dashboard from './Pages/Dashboard';
import toast, { Toaster } from 'react-hot-toast';
import PrivateRoute from './Component/PrivateRoute';

function App() {

  return (
    <>
      <Toaster 
        position="top-right"
        reverseOrder={false}
      />
      <Routes>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/dashboard' element={<PrivateRoute><Dashboard/></PrivateRoute>}/>
        <Route path='/upload' element={<PrivateRoute><UploadVideo/></PrivateRoute>}/>
        <Route path='*' element={<Navigate to='/dashboard'/>} />
      </Routes>
    </>
  )
}

export default App
