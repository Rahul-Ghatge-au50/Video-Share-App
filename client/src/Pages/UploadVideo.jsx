import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { RiVideoUploadLine } from "react-icons/ri";
import Navbar from '../Component/Navbar';

function UploadVideo() {

    const [formData, setFormData] = useState({title:'', description:'', video:null});
    const [fileName, setFileName] = useState('');
    const [loading, setLoading] = useState(false);
    const handleChange = (e) => {
        const {name, value, files} = e.target;
        if(name === 'video'){
            setFileName(files[0].name);
            setFormData({...formData, video: files[0] })
        }else{
            setFormData({ ...formData, [name]:value})
        }
    };

    const handleSubmit = async () => {
        try{
            setLoading(true);
            const data = new FormData();
            data.append('title', formData.title);
            data.append('description', formData.description);
            data.append('video', formData.video);

            const res = await axios.post('http://localhost:8000/api/upload',data,{
                headers:{
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type':'multipart/form-data'
                }
            });

            if(res.data.success){
                toast.success(res.data.message);
                setFormData({title:'', description:'', video:null});
                setFileName('');
                setLoading(false);
            };
        }catch(error){
            setLoading(false);
            toast.error(error.response.data.message);
            console.error("Error while upload video ",error.message);
        }
    }

  return (
    <>
        <Navbar/>
        <div className='flex justify-center items-center h-screen' >
            <form action={handleSubmit} className='bg-white p-8 rounded shadow-md w-96 space-y-4' >
                <h2 className='text-xl font-semibold' >Upload Video</h2>

                <label htmlFor="title">Title</label>
                <input type="text" name='title' placeholder='Title' value={formData.title} onChange={handleChange} className='w-full p-2 border rounded-md' />
                
                <label htmlFor="description">Description</label>
                <textarea type="text" name="description" placeholder='Description' value={formData.description} onChange={handleChange} className='w-full p-2 border rounded-md' id="" />
                
                <label htmlFor="video" className="flex items-center justify-center w-full p-4 border border-dashed border-purple-400 rounded cursor-pointer hover:bg-purple-50 transition">
                    <RiVideoUploadLine className='text-purple-500 text-4xl' />
                    <span className="ml-2 text-purple-700 font-medium">{fileName || 'Choose a video'}</span>
                </label>
                <input type="file" hidden name='video' id='video' accept='video/*' onChange={handleChange} className='w-full'/>
                
                <button type='submit' className='bg-purple-500 text-white px-4 py-2 w-full cursor-pointer rounded-md' >{loading ? 'Uploading...' : 'Upload'}</button>

                {
                    loading && (
                        <div className='text-center text-gray-500 text-sm' >Please wait, uploading...</div>
                    )
                }
            </form>
        </div>
    </>
  )
}

export default UploadVideo
