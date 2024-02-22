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

  return (
    <div>
      <div className="fixed top-0 left-0 right-0 z-10">
        <Header />
        <SubHeader />
      </div>
      {/* Top */}
      <div className="mt-14 p-5 w-full">
        {/* Tabs */}
        <div className="flex h-auto bg-slate-200 items-center rounded-md">
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
            <div className="p-2">
              {data.map((market) => (
                <div key={market.marketId}>
                  <h2 className="underline font-bold text-xl">
                    {market.marketName}
                  </h2>
                  <p>Total Matched: {market.totalMatched}</p>
                  <ul className="flex space-x-2 mt-5 items-center justify-center">
                    {market.runners.map((runner) => (
                      <div>
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
              <div class="relative overflow-x-auto shadow-md sm:rounded-lg w-full">
                {myEventData &&
                  myEventData.map((event) => (
                    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                      <caption class="p-2 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                        Match Odds
                        <p class="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
                          <div className="flex w-full items-center">
                            <span>Status: {event?.status ?? "NULL"}</span>
                            <div className="divider divider-horizontal">|</div>
                            <span>Update Time: {event?.updateTime ?? "NULL"}</span>
                          </div>
                        </p>
                      </caption>
                      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                          <th scope="col" class="px-6 py-3">
                            Product name
                          </th>
                          <th scope="col" class="px-6 py-3"></th>
                          <th scope="col" class="px-6 py-3"></th>
                          <th scope="col" class="px-6 py-3">
                            Back
                          </th>
                          <th scope="col" class="px-6 py-3">
                            Lay
                          </th>
                          <th scope="col" class="px-6 py-3">
                            Min/Max
                          </th>
                        </tr>
                      </thead>
                      {event?.runners?.map((runner) => (
                        <tbody>
                          <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th
                              scope="row"
                              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center"
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
                            <td class="px-6 py-4 bg-green-200 text-center">
                              <span className="font-bold">
                                {runner?.back[0]?.price ?? ""}
                              </span>
                              <br></br>
                              {runner?.back[0]?.size ?? ""}
                            </td>
                            <td class="px-6 py-4 bg-red-200 text-center">
                              <span className="font-bold">
                                {runner?.ex?.availableToBack[0]?.price ?? ""}
                              </span>
                              <br></br>
                              {runner?.ex?.availableToBack[0]?.size ?? ""}
                            </td>
                            <td class="px-6 py-4 bg-blue-200 text-center">
                              <span className="font-bold">
                                {runner?.ex?.availableToLay[0]?.price ?? ""}
                              </span>
                              <br></br>
                              {runner?.ex?.availableToLay[0]?.size ?? ""}
                            </td>
                            <td class="px-6 py-4 bg-pink-200 text-center">
                              <span className="font-bold">
                                {runner?.ex?.availableToBack[0]?.price ?? ""}
                              </span>
                              <br></br>
                              {runner?.ex?.availableToBack[0]?.size ?? ""}
                            </td>
                            <td class="px-6 py-4">
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
              <div className="space-x-2 h-[70vh] mt-10 w-full hidden">
                <div className="overflow-x-auto w-full">
                  {myEventData &&
                    myEventData.map((event) => (
                      <div key={event.eventid}>
                        <div className="flex space-x-5">
                          <h2>Event ID: {event?.eventid}</h2>
                          <p>Market: {event?.market}</p>
                          <p>Status: {event?.status}</p>
                          <p>Total Matched: {event?.totalMatched}</p>
                          <pre>{JSON.stringify(myEventData, null, 2)}</pre>
                        </div>
                        {/* Table */}
                        <div className="overflow-auto mt-5 w-full">
                          <table className="table w-full space-y-2">
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
                              {event?.runners?.map((runner) => (
                                <tr>
                                  <th>{runner?.runner}</th>
                                  <td className="flex flex-col bg-green-100 text-center">
                                    {/* {runner?.ex?.availableToBack.map(
                                      (back, index) => (
                                        <div
                                          key={index}
                                          className="flex flex-col bg-slate-200 border-[1px] border-black"
                                        >
                                          <div className="flex flex-col text-center min-w-20 max-w-[24]">
                                            <span className="font-bold">
                                              {back.price}
                                            </span>
                                            {back.size}
                                          </div>
                                        </div>
                                      )
                                    )} */}
                                  </td>
                                  <td className="bg-red-100 text-center">
                                    {/* {runner?.ex?.availableToLay.map(
                                      (back, index) => (
                                        <div className="flex flex-col text-center min-w-20">
                                          <span className="font-bold">
                                            {back.price}
                                          </span>
                                          {back.size}
                                        </div>
                                      )
                                    )} */}
                                  </td>
                                  <td className="flex flex-col bg-pink-100 text-center">
                                    {runner?.ex?.availableToBack[0]?.price}
                                    {/* {runner[0]?.ex?.availableToBack?.size} */}
                                    {/* {runner?.ex?.availableToBack.map(
                                      (back, index) => (
                                        <div
                                          key={index}
                                          className="flex flex-col bg-slate-200 border-[1px] border-black"
                                        >
                                          <div className="flex flex-col text-center min-w-20">
                                            <span className="font-bold">
                                              {back.price}
                                            </span>
                                            {back.size}
                                          </div>
                                        </div>
                                      )
                                    )} */}
                                  </td>
                                  <td className="bg-blue-100 text-center">
                                    {/* {runner?.ex?.availableToBack.map(
                                      (back, index) => (
                                        <div
                                          key={index}
                                          className="flex flex-col bg-slate-200 border-[1px] border-black"
                                        >
                                          <div className="flex flex-col text-center min-w-20">
                                            <span className="font-bold">
                                              {back.price}
                                            </span>
                                            {back.size}
                                          </div>
                                        </div>
                                      )
                                    )} */}
                                  </td>
                                  <td>
                                    <div>{runner?.min ?? ""}</div>
                                    <div>{runner?.max ?? ""}</div>
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
