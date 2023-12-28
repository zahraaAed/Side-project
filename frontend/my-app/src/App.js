import "./App.css";

import HomePage from "./pages/HomePage.js";
import AdminDashboard from "./pages/AdminDashboard.js";
import Handeledit from "./components/HandelEdit.js";
import RegistrationForm from "./pages/Registration";
import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
const App= () =>{
  return (
    <div className="App">
     <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/admin" element={<AdminDashboard/>}/>
          <Route path="/edit/:MemeId" element={<Handeledit/>}/>
          <Route path="/register" element={<RegistrationForm/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App