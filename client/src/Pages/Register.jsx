import React, { useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { NavLink,useNavigate } from 'react-router-dom';


function Register() {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async () => {
        try{
            const res = await axios.post('http://localhost:8000/api/register',{username,email,password});
            const data = res.data;
            if(data.success){
                toast.success(data.message);
                setUsername('');
                setEmail('');
                setPassword('');
                navigate('/login');
            };
        }catch(error){
            toast.error(error.response.data.message);
            console.error("Error while login ",error.message);
        }
    }

  return (
    <>
        <div className='flex justify-center items-center h-screen' >
            <form action={(e) => handleSubmit(e)} className='bg-white p-8 rounded shadow-md w-96 space-y-4' >
                <h1 className='text-4xl font-semibold' >Register</h1>
                <label htmlFor="username" >Username:</label>
                <input className='w-full p-2 border rounded-md' type="text" placeholder='Enter name' name='username' value={username} onChange={(e) => setUsername(e.target.value)} />

                <label htmlFor="email">Email:</label>
                <input className='w-full p-2 border rounded-md' type="email" placeholder='Enter email' name='email' value={email} onChange={(e) => setEmail(e.target.value)} />

                <label htmlFor="password">Password:</label>
                <input className='w-full p-2 border rounded-md' type="password" placeholder='Enter password' name='password' value={password} onChange={(e) => setPassword(e.target.value)} />

                <p className='text-center' >Already have an account ? <span><NavLink to='/login' className='text-blue-500' >Login</NavLink></span></p>
                <button type='submit' className='bg-green-500 text-white px-4 py-2 w-full cursor-pointer rounded-md' >Register</button>
            </form>
        </div>
    </>
  )
}

export default Register
