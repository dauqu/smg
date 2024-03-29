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

  const [selectedEvent, setSelectedEvent] = React.useState([]);

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
        // setSelectedEvent(res.data[0]);
      })
      .catch((err) => {
        setLoadingE(false);
      });
  }

  const [detailsData, setDetailsData] = React.useState([]);
  const [gettingDetails, setGettingDetails] = React.useState(true);

  async function getMatchesDetails(event_type_id, competition_id) {
    setGettingDetails(true);
    try {
      const res = await axios.get(
        `https://onlinebookbazar.com/api/matches/${event_type_id}/${competition_id}`
      );
      setGettingDetails(false);
      setDetailsData(res?.data ?? []);
    } catch (err) {
      console.error("Error fetching data:", err);
      setGettingDetails(false);
      setDetailsData([]);
    }
  }
  console.log(detailsData);

  React.useEffect(() => {
    mySitesFunction();
  }, []);

  React.useEffect(() => {
    myEventType();
  }, [selected]);

  React.useEffect(() => {
    getMatchesDetails(selectedEvent.eventType, selectedEvent);
  }, [selectedEvent]);

  return (
    <div>
      <div className="fixed top-0 left-0 right-0 z-10">
        <Header />
        <SubHeader />
      </div>
      {/* Top */}
      <div className="mt-16 sm:mt-28 p-2 w-full">
        {/* Tabs */}
        <div className="flex h-auto bg-slate-100 rounded-sm items-center p-2 w-full overflow-x-scroll shadow-sm">
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
                data.map((item, index) => (
                  <button
                  key={index}
                    className={`btn btn-sm no-animation ${
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
        <div className="flex">
          {/* Event details  */}
          <div className="flex items-center px-5 w-full z-10">
            {gettingDetails ? (
              <div className="flex flex-col gap-4 w-52 relative">
                <div className="flex gap-4 items-center">
                  <div className="flex flex-col gap-4">
                    <div className="skeleton h-4 w-20"></div>
                    <div className="skeleton h-4 w-28"></div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex space-x-2 h-[80vh] mt-5 w-full">
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full">
                  <div className="sm:flex items-center z-50 h-auto p-5 overflow-auto w-auto relative">
                    {loadingE ? (
                      <div className="flex flex-col gap-4 w-full">
                        <div className="flex gap-4 items-center">
                          <div className="flex flex-col gap-4">
                            <div className="skeleton h-4 w-20"></div>
                            <div className="skeleton h-4 w-28"></div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <select
                          className="flex relative select select-bordered w-full"
                          value={selectedEvent}
                          onChange={(e) => {
                            setSelectedEvent(e.target.value);
                            console.log(e.target.value);
                          }}
                        >
                          {myEventData &&
                            myEventData.map((item, index) => (
                              <option
                                key={index}
                                value={item?.competition?.id}
                                className={`btn btn-outline btn-wide no-animation btn-sm truncate ${
                                  selectedEvent == item?.competition?.id
                                    ? "btn-active btn-outline"
                                    : ""
                                }`}
                              >
                                {item?.competition?.name ?? "Loading..."}
                              </option>
                            ))}
                        </select>
                      </div>
                    )}
                  </div>
                  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800 relative">
                      Events
                    </caption>
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" className="px-6 py-3">
                          Event Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                          <span className="sr-only">View</span>
                        </th>
                      </tr>
                    </thead>
                    {detailsData?.length !== 0 ? (
                      <tbody>
                        {detailsData &&
                          detailsData.map((item, index) => {
                            const eventOpenDate = new Date(
                              item?.event?.openDate
                            );
                            const currentDate = new Date();
                            const isEventOpen = eventOpenDate < currentDate;

                            return (
                              <tr className="bg-white dark:bg-gray-800" key={index}>
                                {detailsData.length ? (
                                  <div>
                                    <td className="px-6 py-4 uppercase">
                                      {item?.event?.name ?? "Loading..."}
                                      <br></br>
                                      <br></br>
                                      {isEventOpen ? (
                                        <span className="text-green-600">
                                          open
                                        </span>
                                      ) : (
                                        <span className="text-red-600">
                                          not yet open
                                        </span>
                                      )}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                      <a
                                        href="#"
                                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                        onClick={() => {
                                          router.push(
                                            `/markets?eventid=${item?.event?.id}`
                                          );
                                        }}
                                      >
                                        View
                                      </a>
                                    </td>
                                  </div>
                                ) : (
                                  <span>No Data Found</span>
                                )}
                              </tr>
                            );
                          })}
                      </tbody>
                    ) : (
                      <span>No Data Found</span>
                    )}
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
