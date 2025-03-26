import React from "react";
import Hero from "../components/Home/Hero.jsx";
import RecentlyAdded from "../components/Home/RecentlyAdded.jsx";
import Servises from "../Layouts/Servises/Servises.jsx"

// import Banner from '../Layouts/Banner/Banner.jsx'
const Home = () => {
  return (
    <>
      <div className="bg-zinc-900 text-white md:px-16  py-9   ">
        <Hero className='' />
        <div className='px-8 md:px-0'><RecentlyAdded  /></div>
        <Servises />
        
      </div>
    </>
  );
};

export default Home;
