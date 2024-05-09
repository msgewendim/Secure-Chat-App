import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components"
import logo from "../assets/logo.png"
import axios from "axios";
import { toastOptions } from '../utils/providers';

const Register = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  })
  const navigate = useNavigate()
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/users/register`, {
        username: values.username,
        email: values.email,
        password: values.password
      })
      if (data) {
        navigate("/login")
        toast.success("Register success", toastOptions)
      }
    }
  };

  useEffect(() => {
    if (localStorage.getItem("chat-user")) {
      navigate("/")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const validateForm = () => {
    const { password, confirmPassword, username, email } = values;
    // regex email
    const emailRegex = email.match(/^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/);
    if (password !== confirmPassword) {
      toast.error("Password not match", toastOptions)
      return false
    }
    if (username.length < 3) {
      toast.error("Username must be at least 3 characters", toastOptions)
      return false
    }
    if (emailRegex === null) {
      toast.error("Email not valid", toastOptions)
      return false
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters", toastOptions)
      return false
    }
    return true
  }
  const handleChange = (e: ChangeEvent) => {
    const name = (e.target as HTMLInputElement).name
    const value = (e.target as HTMLInputElement).value
    setValues({ ...values, [name]: value })
  }
  return (
    <>
      <FormContainer>
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <img src={logo} alt="logo brand" />
            <h1>Whisper</h1>
          </div>
          <input type="text" placeholder="Username" name="username" onChange={(e) => handleChange(e)} />
          <input type="email" placeholder="Email" name="email" onChange={(e) => handleChange(e)} />
          <input type="password" placeholder="Password" name="password" onChange={(e) => handleChange(e)} />
          <input type="password" placeholder="Confirm Password" name="confirmPassword" onChange={(e) => handleChange(e)} />
          <button type="submit">Register</button>
        </form>
        <span>Already have an account? <Link to="/login">Login</Link></span>
      </FormContainer>
      <ToastContainer />
    </>
  )
}

const FormContainer = styled.div`
  height: 100vh;    // 100% of the viewport height
  width: 100vw;     // 100% of the viewport width
  display: flex;    
  flex-direction: column;  // column direction for the form elements
  justify-content: center;  // center align the form elements
  gap: 1rem;    
  align-items: center;    // center align the form elements
  background: linear-gradient(to bottom, rgba(255,255,255,0.15) 0%, rgba(0,0,0,0.15) 100%), radial-gradient(at top center, rgba(255,255,255,0.40) 0%, rgba(0,0,0,0.40) 120%) #989898;
  background-blend-mode: multiply,multiply;

  .brand {    // brand styling - logo and name
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    
    img {
      height: 5rem;
    }
    
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }
  
  form {
    display: flex;
    flex-direction: column;  // column direction for the form elements  
    gap: 2rem;
    background-color: #100f0d;  // black color with 30% opacity
    border-radius: 2rem;  // border radius for the form elements
    padding: 3rem 5rem;   // 3rem top and bottom, 5rem left and right
  }
  input {
    background-color: transparent;  // transparent background color for the input elements  
    padding: 1rem;                  // 1rem padding for the input elements
    border: 0.1rem solid #5954a4;   
    border-radius: 0.4rem;
    color: white;                   // white color for the input elements
    width: 100%;
    font-size: 1rem;
    
    &:focus {                       // when the input element is focused
      border: 0.1rem solid #8a54a2; // purple color with 10% opacity
      outline: none;                // remove the outline from the input element
    } 
  }

  button {
    background-color: #284f95;    // purple color with 10% opacity
    color: white;
    padding: 1rem 2rem;           // 1rem top and bottom, 2rem left and right
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;    // uppercase text for the button
    transition: 0.5s ease-in-out; // transition when the button is hovered 
    &:hover {
      background-color: #253f58;  // Blue color with 10% opacity on hover
    }
  }

  span {                          // span styling - text and link
    color: white;
    text-transform: uppercase;    // uppercase text for the span
    a {
      color: #000000;             // Black color
      text-decoration: none;      // remove the underline from the link
      font-weight: bold;
    }
  }

`


export default Register