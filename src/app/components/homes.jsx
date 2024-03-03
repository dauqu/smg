"use client";
import axios from "axios";
import Header from "./header";
import Sidebar from "./sidebar";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import BottomNavigation from "./bottom-navigation";
import { toast } from "react-toastify";
import { selectedBet } from "../store";
import { useAtom } from "jotai";

export default function Homes(params) {
  const [markets, setMarkets] = useState([]);
  const [selectedTab, setSelectedTab] = useState("single");

  const [seletedBet, setSeletedBet] = useAtom(selectedBet);
  const [stack, setStack] = useState(0); // [0, 0, 0, 0, 0, 0, 0, 0, 0, 0

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

  async function getMarkets() {
    // Fetch axios data
    await axios
      .get(
        "http://65.20.66.239:4000/api/v1/listMarketBookOdds?market_id=1.224699772"
      )
      .then((res) => {
        setMarkets(res?.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const searchParams = useSearchParams();
  const competition_id = searchParams.get("id");
  const competition_name = searchParams.get("name");

  const [data, setData] = useState([]); // Initialize as null or appropriate initial value
  const [loading, setLoading] = useState(true);

  async function fetchData() {
    setLoading(true);
    await axios
      .get(`http://65.20.66.239:4000/event/id/${competition_id}`)
      .then((res) => {
        setLoading(false);
        setData(res?.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  async function refreshData() {
    await axios
      .get(`http://65.20.66.239:4000/event/id/${competition_id}`)
      .then((res) => {
        setData(res?.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  useEffect(() => {
    getMarkets();
    fetchData();

    //Fetch data each 2 seconds
    const interval = setInterval(() => {
      refreshData();
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetchData();
  }, [competition_id]);

  useEffect(() => {
    // Connect to WebSocket server
    const ws = new WebSocket("ws://localhost:4000");

    // WebSocket open event listener
    ws.onopen = () => {
      console.log("Connected to WebSocket server");
    };

    // WebSocket message event listener
    ws.onmessage = (event) => {
      console.log("Message received from server:", event.data);
      // Handle incoming messages from the server
    };

    // WebSocket close event listener
    ws.onclose = () => {
      console.log("Disconnected from WebSocket server");
    };

    // Clean up function
    return () => {
      // Close WebSocket connection when component unmounts
      ws.close();
    };
  }, []);
  return (
    <div className="w-screen">
      <Header />
      <div className="flex relative">
        <Sidebar />
        {/* Home */}
        <div className="w-full bg-slate-200 h-[99vh] rounded-lg p-5 overflow-auto pt-[8vh] mt-10 sm:mt-2">
          <img
            src="https://www.onlinebookbazar.com/assets/images/frontend/banner/64a55730164b11688557360.jpg"
            className="h-[10vh] md:h-[25vh] rounded-xl"
          />
          {/*  */}
          <div className="col-12 mt-5 bg-white rounded-md py-1">
            <div className="league-title flex items-center space-x-2">
              <div className="avatar placeholder">
                <div className="bg-slate-800 text-neutral-content rounded-xl w-8">
                  <img src="https://www.onlinebookbazar.com/assets/images/team/65d9aadb4a5d31708763867.jpg" />
                </div>
              </div>
              <span className="text-md font-bold">{competition_name}</span>
            </div>
          </div>
          {/* Grid */}

          {/* {data && data.map((card, index) => (
              <div>
                <pre>{JSON.stringify(card, null, 2)}</pre>
              </div>
            ))} */}
          {loading == true ? (
            <div className="w-full space-y-2 pt-10 shadow-sm bg-white rounded-lg mt-5 p-5">
              <div className="skeleton w-full h-8 rounded-none"></div>
              <div className="skeleton w-full h-8 rounded-none"></div>
              <div className="skeleton w-full h-8 rounded-none"></div>
              <div className="skeleton w-full h-8 rounded-none"></div>
              <div className="skeleton w-full h-8 rounded-none"></div>
            </div>
          ) : (
            <div>
              {data.length > 0 ? (
                <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-cols-1 gap-4 mt-5">
                  {data?.map((item, index) => (
                    <div
                      className="p-4 bg-white shadow-sm rounded-xl min-w-[100px]"
                      key={index}
                    >
                      {/* Top bar */}
                      <div className="flex justify-around px-2">
                        {/* {item.market_type.} */}
                        {/* Left */}
                        <div className="flex flex-col justify-center items-center space-y-1">
                          {/* Avator */}
                          <div className="avatar placeholder">
                            <div className="text-neutral-content rounded-xl w-12 border-2 border-slate-200 bg-white">
                              <img
                                src="https://www.onlinebookbazar.com/assets/images/team/65d9aadb4a5d31708763867.jpg"
                                className="p-1"
                              />
                            </div>
                          </div>
                          {/* Short Name */}
                          <span className="text-xs text-center">
                            {item?.market_odds[0]?.runners[0]?.runner
                              .split(" ")
                              .map((word) => word[0])
                              .join("")}
                          </span>
                          {/* Full Name */}
                          <span className="text-[10px]">
                            {item?.market_odds[0]?.runners[0]?.runner}
                          </span>
                        </div>
                        {/* Live Now */}
                        <div className="flex flex-col justify-center items-center space-y-2">
                          {/* Avator */}
                          <span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              className="bi bi-play-circle fill-red-600"
                              viewBox="0 0 16 16"
                            >
                              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                              <path d="M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445" />
                            </svg>
                          </span>
                          {/* Full Name */}
                          <span className="text-xs">Live Now</span>
                        </div>
                        <div className="flex flex-col justify-center items-center space-y-1">
                          {/* Avator */}
                          <div className="avatar placeholder">
                            <div className="text-neutral-content rounded-xl w-12 border-2 border-slate-200 bg-white">
                              <img
                                src="https://www.onlinebookbazar.com/assets/images/team/65d9aadb4a5d31708763867.jpg"
                                className="p-1"
                              />
                            </div>
                          </div>
                          {/* Short Name */}
                          <span className="text-xs text-center">
                            {item?.market_odds[0]?.runners[1]?.runner
                              .split(" ")
                              .map((word) => word[0])
                              .join("")}
                          </span>
                          {/* Full Name */}
                          <span className="text-[10px]">
                            {item?.market_odds[0]?.runners[1]?.runner}
                          </span>
                        </div>
                      </div>
                      {/* Center Div */}
                      <div className="flex w-full justify-between mt-3">
                        <select className="text-sm cursor-pointer">
                          {item?.market_odds[0]?.runners.map((item, index) => (
                            <option value={item?.runner}>{item?.runner}</option>
                          ))}
                        </select>
                        <span className="text-xs text-blue-500 cursor-pointer">
                          Markets
                        </span>
                      </div>
                      {/* Bottom Div */}
                      <div className="flex w-full justify-between mt-3 flex-col space-y-1">
                        <span className="text-xs">Back</span>
                        <div className="flex overflow-auto space-x-2">
                          {item?.market_odds[0]?.runners[0]?.back?.map(
                            (back_item, index) => (
                              <span className="flex flex-col justify-center items-center space-y-1">
                                <button
                                  className={`btn btn-sm w-[80px] h-[40px] no-animation rounded-md border border-1 border-slate-200 $`}
                                  onClick={() => {
                                    console.log(seletedBet);
                                    //Append data in array
                                    setSeletedBet([
                                      ...seletedBet,
                                      {
                                        event_name: item?.event_name,
                                        market_name:
                                          item?.market_odds[0].market,
                                        runner_name: item?.runner_name,
                                        price: back_item?.price,
                                        type: "back",
                                      },
                                    ]);
                                  }}
                                >
                                  {back_item.price ?? 0}
                                </button>
                                <span className="text-xs">
                                  {back_item.size ?? 0}
                                </span>
                              </span>
                            )
                          )}
                        </div>
                        <span className="text-xs">Lay</span>
                        <div className="flex overflow-auto space-x-2">
                          {item?.market_odds[0]?.runners[0]?.back?.map(
                            (lay_item, index) => (
                              <span className="flex flex-col justify-center items-center space-y-1">
                                <button
                                  className={`btn btn-sm w-[80px] h-[40px] no-animation rounded-md border border-1 border-slate-200 `}
                                  onClick={() => {
                                    console.log(seletedBet);
                                    //Append data in array
                                    setSeletedBet([
                                      ...seletedBet,
                                      {
                                        event_name: item?.event_name,
                                        market_name:
                                          item?.market_odds[0].market,
                                        runner_name: item?.runner_name,
                                        price: lay_item?.price,
                                        type: "lay",
                                      },
                                    ]);
                                  }}
                                >
                                  {lay_item.price ?? 0}
                                </button>
                                <span className="text-xs">
                                  {lay_item.size ?? 0}
                                </span>
                              </span>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex justify-center items-center h-[50vh] flex-col space-y-5 bg-white mt-5 rounded-lg">
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="100"
                      height="100"
                      fill=""
                      className="bi bi-clipboard-x fill-slate-500"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M6.146 7.146a.5.5 0 0 1 .708 0L8 8.293l1.146-1.147a.5.5 0 1 1 .708.708L8.707 9l1.147 1.146a.5.5 0 0 1-.708.708L8 9.707l-1.146 1.147a.5.5 0 0 1-.708-.708L7.293 9 6.146 7.854a.5.5 0 0 1 0-.708"
                      />
                      <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1z" />
                      <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0z" />
                    </svg>
                  </span>
                  <span className="text-slate-400 font-bold text-xl text-center">
                    No game available in this category
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Footer */}
          <div className="flex p-5 bg-white rounded-lg mt-10 w-full justify-between shadow-sm">
            <div className="flex flex-col">
              <span className="text-base font-bold">ABOUT US</span>
              <div className="flex space-x-2 mt-5">
                <span className="text-xs">
                  <div className="avatar placeholder">
                    <div className="bg-neutral text-neutral-content rounded-full w-8">
                      <span>FB</span>
                    </div>
                  </div>
                </span>
                <span className="text-xs">
                  <div className="avatar placeholder">
                    <div className="bg-neutral text-neutral-content rounded-full w-8">
                      <span>ID</span>
                    </div>
                  </div>{" "}
                </span>
                <span className="text-xs">
                  <div className="avatar placeholder">
                    <div className="bg-neutral text-neutral-content rounded-full w-8">
                      <span>YT</span>
                    </div>
                  </div>{" "}
                </span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold">Usefull Link</span>
              <div className="flex flex-col">
                <span className="text-xs hover:underline hover:text-blue-500 cursor-pointer">
                  Home
                </span>
                <span className="text-xs hover:underline hover:text-blue-500 cursor-pointer">
                  News & Update
                </span>
                <span className="text-xs hover:underline hover:text-blue-500 cursor-pointer">
                  Contact
                </span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold">Company Policy</span>
              <div className="flex flex-col">
                <span className="text-xs hover:underline hover:text-blue-500 cursor-pointer">
                  Privacy Policy
                </span>
                <span className="text-xs hover:underline hover:text-blue-500 cursor-pointer">
                  Terms And Condition
                </span>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="flex p-5 bg-white rounded-lg mt-5 w-full justify-between shadow-sm">
            <span className="text-sm">
              Copyright © 2024 Lion exchange All right reserved
            </span>
          </div>
        </div>
        {/* Right Sidebar */}
        <div className="w-[500px] flex-col p-2 pt-[8vh] ml-2 justify-between hidden sm:hidden md:hidden lg:flex">
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
                  <div className="w-full border-2 border-slate-200 p-2 rounded-lg flex items-center space-x-5">
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
                      <span className="font-bold text-left">
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
      </div>
      <BottomNavigation />
    </div>
  );
}
