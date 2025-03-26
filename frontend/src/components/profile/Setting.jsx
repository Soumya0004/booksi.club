import React, { useEffect, useState } from "react";
import Loder from "../../Layouts/Loder/Loder";
import axios from "axios";
import toast from "react-hot-toast";
const Setting = () => {
  const [Value, setValue] = useState({ address: "" });
  const [Profiledata, setProfiledata] = useState();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  const Change = (e) => {
    const { name, value } = e.target;
    setValue({ ...Value, [name]: value });
  };
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "http://localhost:1000/api/v1/get-user-information",
        { headers }
      );
      setProfiledata(response.data);
      setValue({ address: response.data.address });
    };
    fetch();
  }, []);
  const submitaddress = async () => {
    const response = await axios.put(
      "http://localhost:1000/api/v1/update-address",
      Value,
      { headers }
    );
    toast.success(response.data.message);
  };

  return (
    <>
      {!Profiledata && (
        <div className="h-[100%] flex items-center justify-center bg-zinc-900">
          {" "}
          <Loder />
        </div>
      )}

      {Profiledata && (
        <div className="h-[100%] p-0 md:p-4 text-zinc-100 ">
          <h1 className=" lg:text-3xl text-2xl font-semibold text-zinc-500 mb-8">
            Settings
          </h1>
          <div className="flex gap-12">
            <div>
              <label htmlFor="">Username</label>
              <p className="p-2 rounded bg-zinc-800 mt-2 font-semibold">
                {Profiledata.username}
              </p>
            </div>
            <div>
              <label htmlFor="">Email</label>
              <p className="p-2 rounded bg-zinc-800 mt-2 font-semibold">
                {Profiledata.email}
              </p>
            </div>
          </div>
          <div className="mt-4 flex flex-col">
            <label htmlFor="">Address</label>
            <textarea
              name="address"
              rows="5"
              className="p-2 rounded bg-zinc-800 mt-2 font-semibold"
              placeholder="Address"
              Value={Value.address}
              onChange={Change}
            ></textarea>
          </div>
          <div className="mt-4 flex  justify-end">
            <button
              className="bg-yellow-500 text-zinc-900 font-semibold px-3 py-2 rounded hover:bg-yellow-400 transition-all duration-300"
              onClick={submitaddress}
            >
              Update
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Setting;
