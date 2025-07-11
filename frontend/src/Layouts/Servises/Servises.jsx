import React from 'react'
import { TbTruckDelivery ,TbReplace } from "react-icons/tb";
import { GiCash } from "react-icons/gi";
import { MdOutlineVerified } from "react-icons/md";
import {  motion } from "motion/react";

const Servises = () => {
  return (
   <motion.div 
    initial={{opacity:0}}
          animate={{opacity:1}}
          transition={{delay:.8, duration:3}}
      viewport={{ once: true }}
   className='flex  h-[15vh] items-center justify-evenly bg-[#1e1e20] ' >
   
       <p className=' lg:text-2xl md:text-sm text-[0.7rem] font-semibold     flex   transition-all duration-300  hover:text-zinc-400 text-zinc-200'>
       <TbTruckDelivery className='lg:text-3xl md:text-sm text-[1rem] font-semibold  mr-2  ' />Free Delivery</p>
       <p className=' lg:text-2xl md:text-sm text-[0.7rem] font-semibold     flex    hover:text-zinc-400 text-zinc-200 transition-all duration-300 '>  
       <GiCash className='lg:text-3xl md:text-sm text-[1rem] font-semibold  mr-2  ' />Cash on Delivery</p>
       <p className=' lg:text-2xl md:text-sm text-[0.7rem] font-semibold     flex    hover:text-zinc-400 text-zinc-200 transition-all duration-300 '>
       <MdOutlineVerified className='lg:text-3xl md:text-sm text-[1rem] font-semibold  mr-2  ' /> Original Products</p>
       <p className=' lg:text-2xl md:text-sm text-[0.7rem] font-semibold         hover:text-zinc-400 text-zinc-200 transition-all duration-300 hidden md:flex '>
       
       <TbReplace className='lg:text-3xl md:text-sm text-[1rem] font-semibold  mr-2   ' /> Easy Replacement</p>
           
       </motion.div>
  )
}

export default Servises