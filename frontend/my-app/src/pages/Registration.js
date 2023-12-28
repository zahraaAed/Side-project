import React, { useState } from "react";
import axios from "axios";
import "./Registration.css";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
 
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prevData) => ({
      ...prevData,
     
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post("localhost:4000/api/userregister", formData);
      const { token } = response.data;

      // Store the JWT token securely (e.g., in localStorage)
      localStorage.setItem("token", token);

      // Redirect or perform any other actions as needed
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  return (
   
     <form className="registration-form" onSubmit={handleSubmit}>
      <h2 className="form-title">Create an account</h2>

      <div className="form-group">
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Your Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="role">Role</label>
        <input
          type="text"
          id="role"
          name="role"
          value={formData.role}
          onChange={handleChange}
        />
      </div>

 

      <button type="submit" className="submit-btn">
        Register
      </button>

      <p className="login-link">
        Have already an account? <a href="#!">Login here</a>
      </p>
    </form>
  );
};

export default RegistrationForm;
