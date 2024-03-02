"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  async function checkLogin() {
    setLoading(true);
    await axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/profile`, {
        headers: {
          "x-auth-token": `${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res?.data);
        setData(res?.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }

  useEffect(() => {
    checkLogin();
  }, []);
  return (
    <div className="navbar shadow-sm bg-[#0C0E2C] border-b-[1px] border-slate-500 px-2 justify-between w-full fixed h-[6vh] z-50">
      {/* Left */}
      <div className="flex space-x-10 items-center justify-between w-full sm:w-auto">
        <div className="flex items-center justify-center space-x-2">
          <img className="w-10 h-10" src="/logo.png" />
          <a
            className="text-xl text-white hidden sm:block items-center justify-center"
            href="/"
          >
            Lion Exchange
          </a>
        </div>
        <div className="space-x-2 flex">
          <button className="btn btn-sm rounded-md bg-[#5671F5] text-white hover:bg-[#5671F5] no-animation outline-none border-none">
            Live
          </button>
          <button className="btn btn-sm rounded-md btn-outline hover:bg-[#5671F5] outline-white text-white">
            Upcoming
          </button>
        </div>
      </div>
      {/* Center */}
      <div></div>
      {/* Menu ICON */}
      <div className="hidden items-center space-x-5 sm:flex">
        <Link href="/" className="text-white">
          Home
        </Link>
        <select className="select select-bordered select-sm bg-slate-900 text-white">
          <option>Cricket</option>
          <option>Football</option>
          <option>Tennis</option>
          <option>More</option>
        </select>
        {/* Login Button */}
        <div>
          {loading !== true ? (
            <div>
              {data?.auth !== true ? (
                <div className="flex space-x-2">
                  <Link
                    href="/login"
                    className="btn btn-sm rounded-md btn-outline bg-white hover:bg-[#ffffff] outline-white text-black hover:text-black no-animation border-none"
                  >
                    Login
                  </Link>
                  {/* SignUp */}
                  <Link
                    className="btn btn-sm rounded-md bg-[#5671F5] text-white hover:bg-[#5671F5] no-animation border-none"
                    href="/register"
                  >
                    Sign Up
                  </Link>
                </div>
              ) : (
                <div className="flex space-x-2">
                  <Link
                    href="/profile"
                    className="btn btn-sm rounded-md btn-outline bg-white hover:bg-[#ffffff] outline-white text-black hover:text-black no-animation border-none"
                  >
                    Profile
                  </Link>
                  {/* SignUp */}
                  {/* <button
                    className="btn btn-sm rounded-md bg-[#5671F5] text-white hover:bg-[#5671F5] no-animation border-none"
                    onClick={() => {
                      localStorage.removeItem("token");
                      window.location.reload();
                    }}
                  >
                    Logout
                  </button> */}
                </div>
              )}
            </div>
          ) : (
            <div>
              <div className="skeleton rounded-md btn btn-sm">Checking</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
