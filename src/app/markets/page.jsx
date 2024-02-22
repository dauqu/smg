"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

import axios from "axios";
import Header from "../components/header";
import SubHeader from "../components/sub-header";

export default function Page(params) {
  const [data, setUsers] = React.useState([]);
  const [myEventData, setMyEventData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [loadingE, setLoadingE] = React.useState(true);
  const [selected, setSelected] = React.useState([]);

  let queryString = "";
  let urlParams = null;

  if (typeof window !== "undefined") {
    queryString = window.location.search;
    urlParams = new URLSearchParams(queryString);
  }

  const event_id = urlParams ? urlParams.get("eventid") : null;

  const router = useRouter();

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

  React.useEffect(() => {
    mySitesFunction();
  }, []);

  React.useEffect(() => {
    mySitesFunction();
  }, [event_id]);

  React.useEffect(() => {
    console.log(selected);
    myEventType();
  }, [selected]);

  return (
    <div>
      <div className="fixed top-0 left-0 right-0 z-10">
        <Header />
        <SubHeader />
      </div>
      {/* Top */}
      <div className="mt-32 p-5 w-full">
        {/* Tabs */}
        <div className="flex h-auto bg-slate-400 items-center p-2">
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
            <div>
              {data.map((market) => (
                <div key={market.marketId}>
                  <h2>{market.marketName}</h2>
                  <p>Total Matched: {market.totalMatched}</p>
                  <ul className="flex space-x-2 mt-5">
                    {market.runners.map((runner) => (
                      <li
                        key={runner.selectionId}
                        className="btn btn-sm"
                        // onClick={() => {
                        //   setSelected(runner);
                        // }}
                      >
                        {runner.runnerName}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
        {/* Events Data */}
        <div className="flex items-center px-5 w-full mt-5">
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
            <div className="flex space-x-2 h-[70vh] mt-10 w-full">
              <div className="flex space-x-2 h-[70vh] mt-10 w-full">
                <div className="overflow-x-auto w-full">
                  {myEventData &&
                    myEventData.map((event) => (
                      <div key={event.eventid}>
                        <div className="flex space-x-5">
                          <h2>Event ID: {event?.eventid}</h2>
                          <p>Market: {event?.market}</p>
                          <p>Status: {event?.status}</p>
                          <p>Total Matched: {event?.totalMatched}</p>
                        </div>
                        {/* Table */}
                        <div className="overflow-x-auto mt-5">
                          <table className="table">
                            {/* head */}
                            <thead>
                              <tr className="text-center">
                                <th></th>
                                <th></th>
                                <th></th>
                                <th>Back</th>
                                <th>Lay</th>
                                <th>Min/Max</th>
                              </tr>
                            </thead>

                            <tbody>
                              {/* row 1 */}
                              {event.runners.map((runner) => (
                                <tr>
                                  <th>{runner?.runner}</th>
                                  <td className="flex flex-col bg-green-100 text-center">
                                    {/* {runner.ex.availableToBack.map(
                                      (back, index) => (
                                        <div
                                          key={index}
                                          className="flex flex-col space-y-2 p-1 bg-slate-200"
                                        >
                                          <div className="flex flex-col text-center">
                                            <span className="font-bold">
                                              {back.level}
                                            </span>
                                            <br />
                                            {back.price}
                                          </div>
                                        </div>
                                      )
                                    )} */}

                                    <span>
                                      {" "}
                                      {runner.ex.availableToBack
                                        .reduce(
                                          (total, lay) => total + lay.price,
                                          0
                                        )
                                        .toFixed(3)}
                                    </span>
                                    <span>
                                      {" "}
                                      {runner.ex.availableToBack
                                        .reduce(
                                          (total, lay) => total + lay.size,
                                          0
                                        )
                                        .toFixed(3)}
                                    </span>
                                  </td>
                                  <td className="bg-red-100 text-center">
                                    <span>
                                      {" "}
                                      {runner.ex.availableToLay
                                        .reduce(
                                          (total, lay) => total + lay.price,
                                          0
                                        )
                                        .toFixed(3)}
                                    </span>
                                    <br />
                                    <span>
                                      {" "}
                                      {runner.ex.availableToLay
                                        .reduce(
                                          (total, lay) => total + lay.size,
                                          0
                                        )
                                        .toFixed(3)}
                                    </span>
                                  </td>
                                  <td className="flex flex-col bg-pink-100 text-center">
                                    <span>
                                      {" "}
                                      {runner.ex.availableToBack
                                        .reduce(
                                          (total, lay) => total + lay.price,
                                          0
                                        )
                                        .toFixed(3)}
                                    </span>
                                    <span>
                                      {" "}
                                      {runner.ex.availableToBack
                                        .reduce(
                                          (total, lay) => total + lay.size,
                                          0
                                        )
                                        .toFixed(3)}
                                    </span>
                                  </td>
                                  <td className="bg-blue-100 text-center">
                                    <span>
                                      {" "}
                                      {runner.lay
                                        .reduce(
                                          (total, lay) => total + lay.price,
                                          0
                                        )
                                        .toFixed(3)}
                                    </span>
                                    <br />
                                    <span>
                                      {" "}
                                      {runner.back
                                        .reduce(
                                          (total, lay) => total + lay.size,
                                          0
                                        )
                                        .toFixed(3)}
                                    </span>
                                  </td>
                                  <td>
                                    <div>{runner?.min}</div>
                                    <div>{runner?.max}</div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
