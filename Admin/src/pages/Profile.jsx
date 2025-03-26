import React, { useState } from "react";
import Sidebar from "../components/profile/Sidebar";
import { Outlet } from "react-router";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import Loder from "../Layouts/Loder/Loder";
import MobileNav from "../components/profile/MobileNav";
const Profile = () => {
  // const isLoggedIn= useSelector();

  const [profile, Setprofile] = useState();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  useEffect(() => {
    const fatch = async () => {
      const response = await axios.get(
        "http://localhost:1000/api/v1/get-user-information",
        { headers }
      );

      Setprofile(response.data);
    };
    fatch();
  }, []);

  return (
    <>
      <div className="bg-zinc-900 px-2 md:px-12 py-8 flex flex-col md:flex-row h-auto  gap-4 text-white">
        {!Profile && (
          <div className="h-[100%] flex items-center justify-center bg-zinc-900">
            {" "}
            <Loder />
          </div>
        )}

        {profile && (
          <>
            <div className="w-full md:w-1/5 h-auto md:h-auto">
              <Sidebar data={profile} />
            </div>
            <MobileNav />
            <div className="w-full md:w-5/6">
              <Outlet />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Profile;
