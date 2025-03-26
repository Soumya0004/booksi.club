import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { IoReorderThree } from "react-icons/io5";
import { useSelector } from 'react-redux';
import Img  from  "./img/logo.png"
import { ImUser } from "react-icons/im";


const Navbar = () => {
  const navLinks = [
    {
      titel: "Home",
      link: "/"
    },

    {
      titel: "All Books",
      link: "/all-books"
    },
   
    
    {
      titel: "Admin Profile",

      link: "/profile"
    },
   

  ];

   const isLoggedIn= useSelector((state)=>state.auth.isLoggrdIn);

   const role=useSelector((state)=>state.auth.role);
if(isLoggedIn === false)  {
  navLinks.splice(2,3)

}

if(isLoggedIn === true && role === "admin"){
  navLinks.splice(3,1)


}
  const [mobileNav, setmobileNav] = useState("hidden")


  const [sticky, setSticky] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>

      <nav className={`z-50  flex bg-zinc-900 text-white px-8 lg:px-16 md:px-10 py-2 items-center justify-between  top-0
        ${sticky?"sticky shadow-xl shadow-[#ffffff0d] bg-[#1e1e20] duration-300 transition-all ease-in-out  ":""}`} >


        <div className='lg:text-2xl text-xl font-semibold'>
          <Link to="/"> 
          <img src={Img} alt="" className=' md:w-[9rem] md:h-[3.5rem] w-[8rem]  h-[3rem]  object-cover ' />
          </Link>
        </div>
        

        <div className='nav-bookblock heaven md:flex  block items-center gap-4 '>
          <div className='hidden md:flex gap-4'>
            {navLinks.map((items, i) => (
            <div className='flex items-center '>
            { items.titel ==="Admin Profile" ? <Link to={items.link}
            className='hover:bg-[#ff2233] bg-[#ff4452]  font-semibold  px-4 py-1 border border-[#ff4455] rounded-md transition-all duration-300 hover:shadow-slate-100 hover:shadow-sm '
            key={i}>
              {items.titel}
            </Link>:
            <Link to={items.link}
            className='hover:text-[#ff4455] transition-all
            duration-300'
            key={i}>
              {items.titel}{""}
            </Link>}
            </div>
            ))}
          </div >
          {
            isLoggedIn === false &&(
              <div className='hidden md:flex gap-4'>
            <Link to="/logIn" className=' hover:bg-[#f55b68] font-semibold  px-4 py-1 border  border-[#ff4455]   rounded-lg  transition-all duration-300 hover:shadow-slate-100 hover:shadow-sm '>LogIn</Link>

          </div>
            )
          }
          <button className='block md:hidden text-white text-2xl hover:text-[#ff485c] hover:scale-110 duration-300 transition-all'onClick={()=>mobileNav === "hidden"? setmobileNav("block"):setmobileNav("hidden")}><IoReorderThree />
          </button>

        </div>
      </nav>

      <div className={`${mobileNav} bg-zinc-800 h-screen absolute top-0 left-0 w-full z-40 flex flex-col items-center justify-center `}>
        {navLinks.map((items, i) => (
          <Link to={items.link} className={`${mobileNav} text-white text-2xl mb-4font-semibold hover:text-[#ff4455] transition-all duration-300 mb-4`} key={i} onClick={()=>mobileNav === "hidden"? setmobileNav("block"):setmobileNav("hidden")}>{items.titel}</Link>
        ))}

      {
        isLoggedIn=== false &&<>
          <Link  to="/logIn" className={`${mobileNav } text-white  mb-4 text-2xl font-semibold hover:bg-white hover:text-zinc-800  px-6 py-2 border border-[#ff4455]  rounded-xl transition-all duration-300  `} onClick={() => navigate("/login")}  >LogIn</Link>
          <Link to="/signup" className={ `${mobileNav} hover:bg-white px-6 py-2 bg-[#ff4455] text-white rounded-xl text-2xl font-semibold transition-all duration-300  hover:text-zinc-800`} onClick={() => navigate("/signup")}>SignUp</Link></>
      }
      </div>
    </>
  )
}

export default Navbar