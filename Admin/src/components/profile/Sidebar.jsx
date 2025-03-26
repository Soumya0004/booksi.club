import React from "react";
import { Link, useNavigate } from "react-router";
import { IoMdLogOut } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "..//../store/auth";

const Sidebar = ({ data }) => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const role = useSelector((state) => state.auth.role);
  return (
    <div className="bg-zinc-800 px-1 py-3 rounded-lg flex flex-col items-center justify-between h-auto md:h-[100%] ">
      <div className="flex items-center justify-center flex-col">
        {" "}
        <img
          src={data.avator}
          className="h-[8vh] md:h-[8vh] lg:h-[15vh] rounded-[100%] "
          alt=""
        />
        <p className="mt-3 lg:text-xl md:text-base text-lg text-zinc-100 font-semibold ">
          {data.username}
        </p>
        <p className="mt-1   text-zinc-100 lg:text-base md:text-xs text-lg  ">
          {data.email}
        </p>
      </div>
      <div className="w-full mt-4 h-[1px] bg-zinc-500 hidden lg:block"></div>

      
      {role === "admin" && (
        <div className="w-full flex-col items-center justify-center hidden  md:flex">
          <Link
            to="/profile"
            className="text-zinc-100 text-base md:text-sm lg:text-base font-semibold w-full py-2 mt-4 text-center hover:bg-zinc-900 rounded transition-all duration-300"
          >
            All Orders
          </Link>

          <Link
            to="/profile/addbook"
            className="text-zinc-100 text-base md:text-sm lg:text-base font-semibold w-full py-2 mt-4 text-center hover:bg-zinc-900 rounded transition-all duration-300"
          >
            Add book
          </Link>
        </div>
      )}

      <button
        className=" w-2/6 md:w-full  text-base md:text-sm lg:text-base font-semibold   rounded-xl bg-zinc-900 mt-4 lg:mt-0  text-white   py-2   flex items-center justify-center  hover:bg-[#ff4455]  transition-all duration-300  "
        onClick={() => {
          dispatch(authActions.logout());
          dispatch(authActions.changeRole("user"));
          localStorage.clear("id");
          localStorage.clear("token");
          localStorage.clear("role");
          history("/");
        }}
      >
        Log Out <IoMdLogOut className="ms-4" />
      </button>
    </div>
  );
};

export default Sidebar;
