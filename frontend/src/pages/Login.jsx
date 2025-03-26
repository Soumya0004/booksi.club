import axios from "axios";
import { useState } from "react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { authActions } from "../store/auth";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [Values, setValues] = useState({
    username: "",
    password: "",
  });

  //for password toggling

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const change = (e) => {
    const { name, value } = e.target;
    setValues({ ...Values, [name]: value });
  };
  const submit = async () => {
    try {
      if (Values.username === "" || Values.password === "") {
        toast("All feilds are required");
      } else {
        const response = await axios.post(
          "http://localhost:1000/api/v1/sign-in",
          Values
        );

        dispatch(authActions.login());
        dispatch(authActions.changeRole(response.data.role));

        localStorage.setItem("id", response.data.id);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);
        navigate("/profile");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <div className="h-screen bg-zinc-900 px-12 py-8 flex items-center justify-center">
        <div className="bg-zinc-800 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6">
          <h1 className="text-zinc-200 font-bold text-xl">Login</h1>
          <div className="mt-4">
            <div>
              <label htmlFor="" className="text-zinc-400">
                Username
              </label>
              <input
                type="text"
                className="rounded-md w-full mt-2 bg-[#e8f0fe] text-black p-2 outline-none"
                placeholder="username"
                name="username"
                required
                value={Values.username}
                onChange={change}
              />
            </div>

            <div className="mt-4 ">
              <label htmlFor="" className="text-zinc-400">
                Password
              </label>
             <div className="flex bg-[#e8f0fe] rounded-md">
             <input
             
                type={showPassword ? "text" : "password"}
                className="rounded-md w-full mt-2 bg-[#e8f0fe] text-black p-1  outline-none"
                placeholder="Password"
                name="password"
                required
                value={Values.password}
                onChange={change}
              />
              <button
        variant="ghost"
        size="icon"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? <EyeOff  className="text-zinc-900 text-lg mr-2" /> : <Eye className="text-zinc-900 text-lg mr-2" />}
      </button>
             </div>
            </div>

            <div className="mt-4">
              <button
                className="w-full bg-[#ff485c] text-white font-semibold py-2 rounded hover:bg-[#e8f0fe] hover:text-blue-500 duration-500 hover:scale-95 "
                onClick={submit}
              >
                Login
              </button>
            </div>
            <p className="mt-4 text-zinc-200 font-semibold text-center">Or</p>
            <p className="mt-4 text-zinc-600 font-semibold text-center">
              Dont have an account?{" "}
              <Link to="/signup" className="underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
