import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../context/authContext';
export default function Login() {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [err, setError] = useState(null);

  const navigate = useNavigate()
  const {login} = useContext(AuthContext);


  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      
      // here
      await login(inputs);
      
      navigate("/")
    } catch (err) {
      setError(err.response.data);
    }
  };
  return (
    <div className='auth'>
      <h1>Login</h1>
      <form>
        <input required type="text" onChange={handleChange} name='username' placeholder='username' />
        <input required type="password" onChange={handleChange} name='password' placeholder='password' />
        <button onClick={handleSubmit}>Login</button>
        {err && <p>{err}</p>}
        <span>Don't you have an Account? <Link to="/register">Register</Link>

        </span>
      </form>
    </div>
  )};