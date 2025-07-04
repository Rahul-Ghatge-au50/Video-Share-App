import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../Component/Navbar';
import { RiDeleteBin6Line } from "react-icons/ri";
import toast from 'react-hot-toast';


function Dashboard() {

    const [video, setVideo] = useState([]);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [openPopUp, setOpenPopUp]  = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    
    useEffect(() => {
        fetchVideos();
    },[]);

    const fetchVideos = async () => {
        const res = await axios.get('https://video-share-app-8t5p.onrender.com/api/getVideo',{
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setVideo(res.data.data);
    };  

    const handleDelete = async (id) => {setOpenPopUp(true);setDeleteId(id)};
    const conformDelete = async () => {
        try{
            const res = await axios.delete(`https://video-share-app-8t5p.onrender.com/api/delete/${deleteId}`,{
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });

            if(res.data.success){
                toast.success(res.data.message);
                setOpenPopUp(false);
                fetchVideos();  
            }
        }catch(error){
            toast.error(error.response.data.message);
            console.error("Error while upload video ",error.message);
        }
    }

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
                    <div key={index} className='border rounded p-2 shadow' onClick={(e) => {e.stopPropagation();openModel(item)}} >
                        <video controls className='w-full h-48 object-cover'>
                            <source src={item.filePath} type='video/mp4'/>
                        </video>
                        <div className='flex justify-between' >
                            <div>
                                <h2 className='font-semibold '>Title : {item.title}</h2>
                                <h2 className='font-semibold '>User : {item.uploader.username}</h2>
                            </div>
                            <RiDeleteBin6Line className='text-2xl text-red-500 cursor-pointer' onClick={(e) => {e.stopPropagation(); handleDelete(item._id)}} />
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
                    <div className='fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center' >
                        <div className='relative w-full h-full' >
                            <button
                                onClick={closeModel}
                                className='absolute top-4 right-4 text-white text-3xl font-bold z-50'
                            >
                                &times;
                            </button>
                            <video controls className='w-full h-full object-contain'>
                                <source src={selectedVideo.filePath} type="video/mp4" />
                            </video>
                        </div>
                    </div>
                )
            }
            {
                openPopUp && 
                (
                    <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-10' >
                        <div className='bg-white w-80 p-6 rounded shadow-lg space-y-4'>
                            <p className='text-lg font-medium' >Are you sure want to delete ?</p>

                            <div className='flex justify-end space-x-4' >
                                <button className='p-2 bg-gray-200 rounded cursor-pointer hover:bg-gray-300' onClick={() => setOpenPopUp(false)} >
                                    Cancel
                                </button>
                                <button className='p-2 bg-red-500 text-white cursor-pointer rounded hover:bg-red-600' onClick={() => conformDelete()} >
                                    Yes, Delete
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>  
    </>
  )
}

export default Dashboard
