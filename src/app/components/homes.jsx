"use client";
import axios from "axios";
import Header from "./header";
import Sidebar from "./sidebar";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function Homes(params) {
  const cards = [{}, {}, {}, {}, {}];

  const [markets, setMarkets] = useState([]);

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
        <div className="w-full bg-slate-100 h-[98vh] rounded-lg p-5 overflow-auto pt-[8vh]">
          <img
            src="https://www.onlinebookbazar.com/assets/images/frontend/banner/64a55730164b11688557360.jpg"
            className="h-[25vh] rounded-xl"
          />
          {/*  */}
          <div class="col-12 mt-5">
            <div class="league-title flex items-center space-x-2">
              <div className="avatar placeholder">
                <div className="bg-slate-800 text-neutral-content rounded-xl w-8">
                  <img src="https://www.onlinebookbazar.com/assets/images/team/65d9aadb4a5d31708763867.jpg" />
                </div>
              </div>
              <span class="league-title__name">Pakistan Super League</span>
            </div>
          </div>
          {/* Grid */}

          {/* {data && data.map((card, index) => (
              <div>
                <pre>{JSON.stringify(card, null, 2)}</pre>
              </div>
            ))} */}
          {loading == true ? (
            <div className="w-full space-y-2 pt-10">
              <div className="skeleton w-full h-8 rounded-none"></div>
              <div className="skeleton w-full h-8 rounded-none"></div>
              <div className="skeleton w-full h-8 rounded-none"></div>
              <div className="skeleton w-full h-8 rounded-none"></div>
              <div className="skeleton w-full h-8 rounded-none"></div>
            </div>
          ) : (
            <div>
              {data.length > 0 ? (
                <div class="grid grid-cols-4 gap-4 mt-5">
                  {data?.map((item, index) => (
                    <div className="p-4 bg-white shadow-sm rounded-xl">
                      {/* Top bar */}
                      <div className="flex justify-between px-2">
                        {/* {item.market_type.} */}
                        {/* Left */}
                        <div className="flex flex-col justify-center items-center space-y-1">
                          {/* Avator */}
                          <div className="avatar placeholder">
                            <div className="bg-neutral text-neutral-content rounded-xl w-10">
                              <img src="https://www.onlinebookbazar.com/assets/images/team/65d9aadb4a5d31708763867.jpg" />
                            </div>
                          </div>
                          {/* Short Name */}
                          <span className="text-xs text-center">LAH</span>
                          {/* Full Name */}
                          <span className="text-[8px]">
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
                              class="bi bi-play-circle fill-red-600"
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
                            <div className="bg-neutral text-neutral-content rounded-xl w-10">
                              <img src="https://www.onlinebookbazar.com/assets/images/team/65d9aadb4a5d31708763867.jpg" />
                            </div>
                          </div>
                          {/* Short Name */}
                          <span className="text-xs text-center">LAH</span>
                          {/* Full Name */}
                          <span className="text-[8px]">
                            {item?.market_odds[0]?.runners[1]?.runner}
                          </span>
                        </div>
                      </div>
                      {/* Center Div */}
                      <div className="flex w-full justify-between mt-3">
                        <span className="text-sm">Lahore Qalandars</span>
                        <span className="text-xs text-blue-500">Markets</span>
                      </div>
                      {/* Bottom Div */}
                      <div className="flex w-full justify-between mt-3 flex-col space-y-1">
                        <span className="text-xs">Back</span>
                        <div className="flex overflow-auto space-x-2">
                          {item?.market_odds[0]?.runners[0]?.back?.map(
                            (item, index) => (
                              <span className="flex flex-col justify-center items-center space-y-1">
                                <button className="btn btn-sm w-[80px] h-[40px] no-animation rounded-md border border-1 border-slate-200 bg-[#F8F9FA] hover:bg-[#F8F9FA]">
                                  {item.price ?? 0}
                                </button>
                                <span className="text-xs">
                                  {item.size ?? 0}
                                </span>
                              </span>
                            )
                          )}
                        </div>
                        <span className="text-xs">Lay</span>
                        <div className="flex overflow-auto space-x-2">
                          {item?.market_odds[0]?.runners[0]?.back?.map(
                            (item, index) => (
                              <span className="flex flex-col justify-center items-center space-y-1">
                                <button className="btn btn-sm w-[80px] h-[40px] no-animation rounded-md border border-1 border-slate-200 bg-[#F8F9FA] hover:bg-[#F8F9FA]">
                                  {item.price ?? 0}
                                </button>
                                <span className="text-xs">
                                  {item.size ?? 0}
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
                <div className="flex justify-center items-center h-[50vh] flex-col space-y-5">
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="100"
                      height="100"
                      fill=""
                      class="bi bi-clipboard-x fill-slate-500"
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
                  <span className="text-slate-400 font-bold text-xl">
                    No game available in this category
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
        {/* Right Sidebar */}
        <div className="w-[500px] flex flex-col p-2 pt-[8vh]">
          {/* Bet Slip */}
          <div className="flex p-2 bg-slate-800 text-white rounded-md items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-file-earmark-fill"
              viewBox="0 0 16 16"
            >
              <path d="M4 0h5.293A1 1 0 0 1 10 .293L13.707 4a1 1 0 0 1 .293.707V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2m5.5 1.5v2a1 1 0 0 0 1 1h2z" />
            </svg>
            <span>Bet Slip</span>
          </div>
          {/* Button Groupe */}
          <div className="items-center justify-around mt-5 grid grid-cols-2 space-x-2">
            <div className="w-auto p-1 border-2 border-slate-300 flex items-center justify-center rounded-md cursor-pointer">
              Single Bet
            </div>
            <div className="w-auto p-1 border-2 border-slate-300 bg-[#5671F5] flex items-center justify-center rounded-md text-white cursor-pointer">
              Multi Bet
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
