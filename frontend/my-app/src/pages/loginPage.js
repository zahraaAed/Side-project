import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Registration.css";

const SigninForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:4000/api/user/login",
        formData, 
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
console.log("axios signin")
      console.log('Login successful:', response.data);

      const { role } = response.data;
      if (role === "admin") {
        navigate("/admin");
      } else {
        navigate("/home");
      }

    } catch (error) {
      console.error("Error signing in user:", error.message);
    }
  };

  return (
    <div className='login'>
      <form className="registration-form" onSubmit={handleSubmit}>
        <h2 className="form-title">login</h2>

        <div className="form-group">
          <label htmlFor="username">Your Name</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
          />
        </div>

        <button type="submit" className="submit-btn">
          Login
        </button>
      </form>
    </div>
  );
};

export default SigninForm;
