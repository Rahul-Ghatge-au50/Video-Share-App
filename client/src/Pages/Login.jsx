import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { NavLink, useNavigate } from 'react-router-dom';


function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        try{
            const res = await axios.post('http://localhost:8000/api/login',{email, password});
            const data = res.data;
            if(data.success){
                toast.success(data.message);
                localStorage.setItem('token',res.data.token);
                setEmail('');
                setPassword('');
                navigate('/upload');
            };
        }catch(error){
            toast.error(error.response.data.message);
            console.error("Error while login ",error.message);
        }
    }

  return (
    <>
        <div className='flex justify-center items-center h-screen' >
            <form action={handleSubmit} className='bg-white p-8 rounded shadow-md w-96 space-y-4' >
                <h1 className='text-4xl font-semibold' >Login</h1>
                <label htmlFor="email">Email:</label>
                <input className='w-full p-2 border rounded-md' type="email" placeholder='Enter email' name='email' value={email} onChange={(e) => setEmail(e.target.value)} />

                <label htmlFor="password">Email:</label>
                <input className='w-full p-2 border rounded-md' type="password" placeholder='Enter password' name='password' value={password} onChange={(e) => setPassword(e.target.value)} />

                <p  className='text-center' >Dont have an account ? <span><NavLink to='/register' className='text-blue-500' >Register</NavLink></span></p>
                <button type='submit' className='bg-green-500 text-white px-4 py-2 w-full cursor-pointer rounded-md' >Login</button>
            </form>
        </div>
    </>
  )
}

export default Login
