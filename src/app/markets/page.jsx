"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

import axios from "axios";
import Header from "../components/header";
import SubHeader from "../components/sub-header";

export default function Page(params) {
  const [data, setUsers] = React.useState([]);
  const [myEventData, setMyEventData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [loadingE, setLoadingE] = React.useState(true);
  const [selected, setSelected] = React.useState([]);

  const searchParams = useSearchParams();

  const event_id = searchParams.get("eventid");

  //   let queryString = "";
  //   let urlParams = null;

  //   if (typeof window !== "undefined") {
  //     queryString = window.location.search;
  //     urlParams = new URLSearchParams(queryString);
  //   }

  //   const event_id = urlParams ? urlParams.get("eventid") : null;

  const router = useRouter();

  async function myEventType() {
    setLoadingE(true);
    await axios
      .get(`https://onlinebookbazar.com/api/market-odds/${selected.marketId}`)
      .then((res) => {
        setLoadingE(false);
        setMyEventData(res.data);
      })
      .catch((err) => {
        setLoadingE(false);
      });
  }

  async function mySitesFunction() {
    setLoading(true);
    await axios
      .get(`https://onlinebookbazar.com/api/markets-type/${event_id}`)
      .then((res) => {
        setLoading(false);
        console.log(res.data);
        setUsers(res?.data);
        setSelected(res?.data[0]);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }

  React.useEffect(() => {
    mySitesFunction();
  }, []);

  React.useEffect(() => {
    mySitesFunction();
  }, [searchParams]);

  React.useEffect(() => {
    myEventType();
  }, [selected.marketId]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `https://onlinebookbazar.com/api/market-odds/${selected.marketId}`
        );
        setMyEventData(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    const interval = setInterval(fetchData, 2000);

    // Fetch data immediately when the component mounts
    fetchData();

    return () => clearInterval(interval);
  }, [selected.marketId]); // Include selected.marketId in the dependency array

  return (
    <div>
      <div className="fixed top-0 left-0 right-0 z-10">
        <Header />
        <SubHeader />
      </div>
      {/* Top */}
      <div className="mt-14 sm:mt-32 p-5 w-full">
        {/* Tabs */}
        <div className="flex h-auto bg-slate-200 items-center rounded-md w-full">
          {loading ? (
            <div className="flex flex-col gap-4 w-52">
              <div className="flex gap-4 items-center">
                <div className="flex flex-col gap-4">
                  <div className="skeleton h-4 w-20"></div>
                  <div className="skeleton h-4 w-28"></div>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-2 w-full relative">
              {data.map((market, index) => (
                <div key={index}>
                  <h2 className="underline font-bold text-xl">
                    {market.marketName}
                  </h2>
                  <p>Total Matched: {market.totalMatched}</p>
                  <ul className="flex space-x-2 mt-5 items-center justify-center overflow-scroll w-full">
                    {market.runners.map((runner, index) => (
                      <div key={index}>
                        <li
                          key={runner.selectionId}
                          className="btn btn-sm no-animation"
                        >
                          {runner.runnerName}
                        </li>
                      </div>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
        {/* Events Data */}
        <div className="flex items-center w-full mt-5">
          {loadingE ? (
            <div className="flex flex-col gap-4 w-full items-center justify-center">
              <div className="flex gap-4 items-center">
                <div className="flex flex-col gap-4">
                  <div className="skeleton h-4 w-20"></div>
                  <div className="skeleton h-4 w-28"></div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex space-x-2 h-[60vh] mt-2 w-full overflow-scroll">
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full">
                {myEventData &&
                  myEventData.map((event, index) => (
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400" key={index}>
                      <caption className="p-2 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                        Match Odds
                        <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
                          <div className="flex w-full items-center">
                            <span>Status: {event?.status ?? "NULL"}</span>
                            <div className="divider divider-horizontal">|</div>
                            <span>
                              Update Time: {event?.updateTime ?? "NULL"}
                            </span>
                          </div>
                        </p>
                      </caption>
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                          <th scope="col" className="px-6 py-3">
                            Product name
                          </th>
                          <th scope="col" className="px-6 py-3"></th>
                          <th scope="col" className="px-6 py-3"></th>
                          <th scope="col" className="px-6 py-3">
                            Back
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Lay
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Min/Max
                          </th>
                        </tr>
                      </thead>
                      {event?.runners?.map((runner, index) => (
                        <tbody key={index}>
                          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th
                              scope="row"
                              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center"
                            >
                              {runner?.runner}
                              {/* <pre>{JSON.stringify(runner, null, 2)}</pre> */}
                              <br></br>
                              <span
                                className={`text-center font-bold ${
                                  runner?.status !== "ACTIVE"
                                    ? "text-red-500"
                                    : "text-green-500"
                                }`}
                              >
                                {runner?.status ?? ""}
                              </span>
                            </th>
                            <td className="px-6 py-4 bg-green-200 text-center text-xs">
                              <span className="font-bold text-lg">
                                {runner?.back[0]?.price ?? ""}
                              </span>
                              <br></br>
                              {runner?.back[0]?.size ?? ""}
                            </td>
                            <td className="px-6 py-4 bg-red-200 text-center text-xs">
                              <span className="font-bold text-lg">
                                {runner?.ex?.availableToBack[0]?.price ?? ""}
                              </span>
                              <br></br>
                              {runner?.ex?.availableToBack[0]?.size ?? ""}
                            </td>
                            <td className="px-6 py-4 bg-pink-200 text-center text-xs">
                              <span className="font-bold text-lg">
                                {runner?.ex?.availableToBack[0]?.price ?? ""}
                              </span>
                              <br></br>
                              {runner?.ex?.availableToBack[0]?.size ?? ""}
                            </td>
                            <td className="px-6 py-4 bg-blue-200 text-center text-xs">
                              <span className="font-bold text-lg">
                                {runner?.ex?.availableToLay[0]?.price ?? ""}
                              </span>
                              <br></br>
                              {runner?.ex?.availableToLay[0]?.size ?? ""}
                            </td>
                            <td className="px-6 py-4">
                              <div>{runner?.min ?? ""}</div>
                              <div>{runner?.max ?? ""}</div>
                            </td>
                          </tr>
                        </tbody>
                      ))}
                    </table>
                  ))}
              </div>
              {/* OLD data */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
