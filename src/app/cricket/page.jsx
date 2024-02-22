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

  const router = useRouter();

  async function mySitesFunction() {
    setLoading(true);
    await axios
      .get(`https://onlinebookbazar.com/api/first`, {})
      .then((res) => {
        setLoading(false);
        console.log(res.data);
        setSelected(res.data[0]);
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }

  async function myEventType() {
    setLoadingE(true);
    await axios
      .get(
        `https://onlinebookbazar.com/api/series-by-sport/${selected.eventType}`,
        {}
      )
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
            <div className="flex space-x-2">
              {data &&
                data.map((item) => (
                  <button
                    className={`btn btn-sm ${
                      selected.eventType == item.eventType
                        ? "btn-active btn-outline"
                        : ""
                    }`}
                    onClick={() => {
                      setSelected(item);
                    }}
                  >
                    {item?.name ?? "Loading..."}
                  </button>
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
              <div className="overflow-x-auto w-full">
                <table className="table">
                  {/* head */}
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Competition Name</th>
                      <th>Region</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* row 1 */}
                    {myEventData &&
                      myEventData.map((item) => (
                        <tr>
                          <th>{item?.competition?.id ?? "Loading..."}</th>
                          <td>{item?.competition?.name ?? "Loading..."}</td>
                          <td>{item?.competitionRegion ?? "Loading..."}</td>
                          <td>
                            <button
                              className="btn btn-sm btn-info"
                              onClick={() => {
                                router.push(
                                    `/matches?eventtypeid=${selected?.eventType}&competitionid=${item?.competition?.id}`
                                );
                                // window.open(`/matches?eventtypeid=${selected?.eventType}&competitionid=${item?.competition?.id}`);
                              }}
                            >
                              View Matches
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
