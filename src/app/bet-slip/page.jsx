"use client";
import { useAtom } from "jotai";
import { selectedBet } from "../store";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import BottomNavigation from "../components/bottom-navigation";

export default function page(params) {
  const [seletedBet, setSeletedBet] = useAtom(selectedBet);
  const [stack, setStack] = useState(0); // [0, 0, 0, 0, 0, 0, 0, 0, 0, 0
  const [selectedTab, setSelectedTab] = useState("single");

  // Place Bet
  const [placingBet, setPlacingBet] = useState(false);
  async function placeBet() {
    setPlacingBet(true);
    await axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}/bet`,
        {
          data: seletedBet,
          stack: stack,
        },
        {
          headers: {
            "Content-Type": "application/json", // Set JSON content type header
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        setPlacingBet(false);
        toast(res?.data?.message, {
          type: "success",
        });
      })
      .catch((error) => {
        setPlacingBet(false);
        toast(error?.response?.data?.message, {
          type: "error",
        });
      });
  }
  return (
    <div>
      <div className="w-auto flex-col p-2 pt-[8vh] ml-2 justify-between md:hidden lg:flex">
        {/* Bet Slip */}
        <div className="flex p-2 bg-slate-800 text-white rounded-md items-center space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-file-earmark-fill"
            viewBox="0 0 16 16"
          >
            <path d="M4 0h5.293A1 1 0 0 1 10 .293L13.707 4a1 1 0 0 1 .293.707V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2m5.5 1.5v2a1 1 0 0 0 1 1h2z" />
          </svg>
          <span>Bet Slip</span>
        </div>
        {/* Button Groupe */}
        <div className="items-center justify-around mt-5 grid grid-cols-2 space-x-2">
          <div
            className={`w-auto p-1 border-2 border-slate-300 flex items-center justify-center rounded-md cursor-pointer ${
              selectedTab === "single"
                ? "bg-[#5671F5] text-white"
                : "bg-white text-slate-800"
            }`}
            onClick={() => {
              setSelectedTab("single");
            }}
          >
            Single Bet
          </div>
          <div
            className={`w-auto p-1 border-2 flex items-center justify-center rounded-md cursor-pointer ${
              selectedTab === "multi"
                ? "bg-[#5671F5] text-white"
                : "bg-white text-slate-800"
            }`}
            onClick={() => {
              setSelectedTab("multi");
            }}
          >
            Multi Bet
          </div>
        </div>
        {/* Selection Desplay */}
        <div className="w-full h-full bg-slate-200 mt-5 rounded-xl justify-start flex flex-col items-center p-2">
          <div className="w-full flex flex-col text-center items-start p-2 bg-white rounded-md">
            {/* <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="80"
                  height="80"
                  fill=""
                  className="bi bi-card-checklist fill-slate-400"
                  viewBox="0 0 16 16"
                >
                  <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2z" />
                  <path d="M7 5.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0M7 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0" />
                </svg>
              </span>
              <span className="text-center text-slate-400 font-bold">
                Your selections will be displayed here
              </span> */}

            {/* Table */}

            {/* Delete ICON */}
            <div className="space-y-2 w-full overflow-auto max-h-[55vh]">
              {seletedBet?.map((item, index) => (
                <div
                  className="w-full border-2 border-slate-200 p-2 rounded-lg flex items-center space-x-5"
                  key={index}
                >
                  <div
                    className=""
                    onClick={() => {
                      //Remove data from array
                      const filteredItems = seletedBet.filter(
                        (item) => item !== seletedBet[index]
                      );
                      setSeletedBet(filteredItems);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      className="bi bi-trash fill-red-600 cursor-pointer"
                      viewBox="0 0 16 16"
                    >
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                      <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                    </svg>
                  </div>
                  {/* Left */}
                  <div className="flex flex-col justify-start items-start">
                    <span className="font-bold text-left select-none">
                      {item?.event_name}
                    </span>
                    <span className="text-sm">
                      Exact Number of Goal {stack}
                    </span>
                    <span className="text-sm">
                      {item.type} - {item?.price}
                    </span>
                  </div>

                  {/* Right */}
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Bottom */}
        <div className="w-full h-auto bg-slate-200 mt-5 rounded-xl justify-center flex flex-col items-center p-2">
          <div className="flex justify-between w-full items-center">
            <span className="text-sm">Singles (x0)</span>
            <div>
              <span className="flex flex-col max-w-40 rounded-md bg-white px-2 py-1 outline-1 outline-slate-800 outline-dashed">
                <input
                  className="rounded-md text-sm w-full outline-none"
                  type="number"
                  placeholder="0.0"
                  value={stack}
                  onChange={(e) => setStack(e.target.value)}
                />
                <label className="text-slate-800 text-xs uppercase mt-2">
                  Stake
                </label>
              </span>
            </div>
          </div>
          <div className="divider h-1"></div>
          <div className="w-full justify-start">
            <button
              className="btn btn-md btn-neutral rounded-md w-full no-animation disabled:bg-slate-700 disabled:text-white"
              onClick={placeBet}
              disabled={placingBet}
            >
              {placingBet ? "Please Wait..." : "Place Bet"}
            </button>
          </div>
        </div>
      </div>
      <BottomNavigation/>
    </div>
  );
}
