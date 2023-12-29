import React from "react";
import HomePage from "./pages/HomePage.js";
import AdminDashboard from "./pages/AdminDashboard.js";
import Handeledit from "./components/HandelEdit.js";
import RegistrationForm from "./pages/Registration";
import SigninForm from "./pages/loginPage.js"
import { BrowserRouter, Routes, Route } from "react-router-dom";
const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/edit/:MemeId" element={<Handeledit />} />
          <Route path="/" element={<RegistrationForm />} />
          <Route path="/login" element={<SigninForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
