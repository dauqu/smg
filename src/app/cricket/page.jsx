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
      <div className="mt-16 sm:mt-28 p-2 w-full">
        {/* Tabs */}
        <div className="flex h-auto bg-slate-200 rounded-md items-center p-2 w-full overflow-x-scroll shadow-sm">
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
            <div className="flex space-x-2 h-[76vh] mt-5 w-full">
              <div class="relative overflow-x-auto shadow-md sm:rounded-lg w-full">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <caption class="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                    Our products
                    <p class="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
                      Browse a list of Flowbite products designed to help you
                      work and play, stay organized, get answers, keep in touch,
                      grow your business, and more.
                    </p>
                  </caption>
                  <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" class="px-6 py-3">
                        Market Count
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Competition Name
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Region
                      </th>
                      <th scope="col" class="px-6 py-3">
                        <span class="sr-only">View</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {myEventData &&
                      myEventData.map((item) => (
                        <tr class="bg-white dark:bg-gray-800">
                          <th
                            scope="row"
                            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            {item?.marketCount ?? "Loading..."}
                          </th>
                          <td class="px-6 py-4">
                            {item?.competition?.name ?? "Loading..."}
                          </td>
                          <td class="px-6 py-4">
                            {item?.competitionRegion ?? "Loading..."}
                          </td>
                          <td class="px-6 py-4 text-right">
                            <a
                              href={`/matches?eventtypeid=${selected?.eventType}&competitionid=${item?.competition?.id}`}
                              class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                              onClick={() => {
                                router.push(
                                  `/matches?eventtypeid=${selected?.eventType}&competitionid=${item?.competition?.id}`
                                );
                              }}
                            >
                              View
                            </a>
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
