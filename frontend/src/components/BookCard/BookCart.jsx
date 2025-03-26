import axios from 'axios';
import React from 'react'
import toast from 'react-hot-toast';
import { Link } from 'react-router';

const BookCart = ({data,favourite}) => {
  const headers={
    id : localStorage.getItem("id"),
    authorization:`Bearer ${localStorage.getItem("token")}`, 
    bookid:data._id

  }
  const handleRemoveBack=async() => {
    const response=await axios.put(
      "http://localhost:1000/api/v1/remove-book-to-favourite",{},{headers}
    )
    toast.success(response.data.message);
    
  }
  // 
    
  return (
    <div className='bg-zinc-800  rounded-xl py-2  px-5 md:px-3  flex  flex-col  h-[45h] md:h-[45vh]  lg:h-[52vh] hover:scale-105 transition-all  duration-500  ' >

    <Link to={`/view-book-details/${data._id}`}>
    <div className=''> 
        <div className='hover:shadow-lg hover:shadow-[#ffffff0d] duration-300 bg-zinc-900 rounded-xl items-center justify-center flex'>
            <img src={data.url} alt="/" className=' lg:h-[30vh] md:h-[23vh] h-[11rem] ' />

        </div>
       <div className=' overflow-hidden '>
       <h2 className='mt-2  font-semibold lg:text-xs md:text-xs text-xs  text-pretty   text-white  w-[12rem]  '>{data.title}</h2>
        <p className={`${favourite ? "hidden":"block"} mt-3 text-zinc-400 font-semibold text-balance lg:text-[.7rem] md:text-[.7rem] text-[.6rem]`}>{data.author}</p>
        <p className='mt-2 text-zinc-400 font-semibold lg:text-[1rem] md:text-[.7rem] text-[.6rem]'>₹{data.price}</p>
        
        
       </div>

    </div>
    </Link>
    {favourite && (
      <button className='bg-[#ff4455]  rounded-md   py-2  px-2 text-xs  lg:text-sm mt-4 text-white font-semibold border border-[#ff4455] hover:bg-zinc-900  transition-all duration-300 shadow-xl '
      onClick={handleRemoveBack}>Remove  Favourite</button>
    )}
    </div>
  )
}

export default BookCart