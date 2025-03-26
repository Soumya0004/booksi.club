import React from "react";
import { RxCross2 } from "react-icons/rx";

const Userdata = ({ userDivData, userDiv, setuserDiv }) => {
  return (
    <>
      <div
        className={`${userDiv} top-0 left-0 h-screen w-full bg-zinc-800 opacity-80`}
      ></div>
      <div
        className={`${userDiv} top-0 left-0 h-screen w-full flex items-center justify-center`}
      >
        <div className="bg-white rounded p-5 w-[80%] md:w-[40%] lg:w-[30%] text-zinc-800 hover:shadow-white hover:shadow-md hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-between">
            <h1 className="md:text-2xl text-xl font-semibold   ">
              User Information
            </h1>
            <button
              className=""
              onClick={() => {
                setuserDiv("hidden");
              }}
            >
              <RxCross2 className="" />
            </button>
          </div>
          <div className="mt-2">
            <label htmlFor="">
              Username:
              <span className="font-semibold">{userDivData.username}</span>
            </label>
          </div>

          <div className="mt-4">
            <label htmlFor="">
              Email:
              <span className="font-semibold">{userDivData.email}</span>
            </label>
          </div>

          <div className="mt-4">
            <label htmlFor="">
              Address:
              <span className="font-semibold">{userDivData.address}</span>
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default Userdata;
