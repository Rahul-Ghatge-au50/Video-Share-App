import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../Component/Navbar';

function Dashboard() {

    const [video, setVideo] = useState([]);
    const [selectedVideo, setSelectedVideo] = useState(null);
    
    useEffect(() => {
        const fetchVideos = async () => {
            const res = await axios.get('http://localhost:8000/api/getVideo',{
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            setVideo(res.data.data);
        };  

        fetchVideos();
    },[])

    const openModel = video => setSelectedVideo(video);
    const closeModel = () => setSelectedVideo(null);

  return (
    <>
        <Navbar/>
        <div className='p-6' >
            <h1 className='text-2xl font-bold mb-4' >Video Dashboard</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' >
            {
                video.map((item, index) => (
                    <div key={index} className='border rounded p-2 shadow' onClick={() => openModel(item)} >
                        <video controls className='w-full h-48 object-cover'>
                            <source src={`http://localhost:8000/${item.filePath}`} type='video/mp4'/>
                        </video>
                        <div className='flex justify-between' >
                            <h2 className='font-semibold mt-2'>Title : {item.title}</h2>
                            <h2 className='font-semibold mt-2'>User : {item.uploader.username}</h2>
                        </div>
                        <h4>Desc</h4>
                        <p className='text-sm text-gray-600 max-h-20 overflow-y-auto' >{item.description}</p>
                    </div>
                ))
            }
            </div>

            {/* Model for full Screen */}
            {
                selectedVideo && (
                    <div className='fixed inset-0 z-50 bg-black bg-opacity-80 flex items-enter justify-center' >
                        <div className='relative w-full h-full' >
                            <button
                                onClick={closeModel}
                                className='absolute top-4 right04 text-white text-3xl font-bold z-50'
                            >
                                &times;
                            </button>
                            <video controls className='w-full h-full object-contain'>
                                <source src={`http://localhost:8000/${selectedVideo.filePath}`} type="video/mp4" />
                            </video>
                        </div>
                    </div>
                )
            }
        </div>  
    </>
  )
}

export default Dashboard
