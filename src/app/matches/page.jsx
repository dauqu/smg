"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";

import axios from "axios";
import Header from "../components/header";
import SubHeader from "../components/sub-header";
import { useRouter } from "next/navigation";

export default function Page(params) {
  const [data, setUsers] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [selected, setSelected] = React.useState([]);

  const router = useRouter();

  //   const searchParams = useSearchParams();
  const searchParams = useSearchParams();

  const event_type_id = searchParams.get("eventtypeid");
  const competition_id = searchParams.get("competitionid");

  //   let queryString = "";
  //   let urlParams = null;

  //   if (typeof window !== "undefined") {
  //     queryString = window.location.search;
  //     urlParams = new URLSearchParams(queryString);
  //   }

  //   const event_type_id = urlParams ? urlParams.get("eventtypeid") : null;
  //   const competition_id = urlParams ? urlParams.get("competitionid") : null;
  //   const event_type_id = searchParams.get("eventtypeid");
  //   const competition_id = searchParams.get("competitionid");

  async function getMatches() {
    setLoading(true);
    await axios
      .get(
        `https://onlinebookbazar.com/api/matches/${event_type_id}/${competition_id}`,
        {}
      )
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

  React.useEffect(() => {
    getMatches();
  }, []);

  return (
    <div>
      <div className="fixed top-0 left-0 right-0 z-10">
        <Header />
        <SubHeader />
      </div>
      {/* Top */}
      <div className="mt-28 p-5 w-full">
        {/* Events Data */}
        <div className="flex items-center px-5 w-full">
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
            <div className="flex space-x-2 h-[80vh] mt-5 w-full">
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
                        Event Name
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Country Code
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Date
                      </th>
                      <th scope="col" class="px-6 py-3">
                        <span class="sr-only">View</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data &&
                      data.map((item) => (
                        <tr class="bg-white dark:bg-gray-800">
                          <th
                            scope="row"
                            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            {item?.marketCount ?? "Loading..."}
                          </th>
                          <td class="px-6 py-4">
                            {item?.event?.name ?? "Loading..."}
                          </td>
                          <td class="px-6 py-4">
                            {item?.event?.countryCode ?? "Loading..."}
                          </td>
                          <td class="px-6 py-4">
                            {item?.event?.openDate ?? "Loading..."}
                          </td>
                          <td class="px-6 py-4 text-right">
                            <a
                              href="#"
                              class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                              onClick={() => {
                                router.push(
                                  `/markets?eventid=${item?.event?.id}`
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
