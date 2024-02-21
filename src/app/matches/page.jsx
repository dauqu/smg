"use client";

import * as React from "react";
import { useSearchParams } from 'next/navigation'


import axios from "axios";
import Header from "../components/header";
import SubHeader from "../components/sub-header";

export default function Page(params) {
  const [data, setUsers] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [selected, setSelected] = React.useState([]);

  const searchParams = useSearchParams()
 
  const event_type_id = searchParams.get('eventtypeid')
  const competition_id = searchParams.get('competitionid')

  async function getMatches() {
    setLoading(true);
    await axios
      .get(`http://65.20.66.239:3000/api/matches/${event_type_id}/${competition_id}`, {})
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
      <div className="mt-32 p-5 w-full">
        {/* Events Data */}
        <div className="flex items-center px-5 w-full">
          {loading ? (
            <span className="loading loading-spinner loading-xs"></span>
          ) : (
            <div className="flex space-x-2 h-[70vh] mt-10 w-full">
              <div className="overflow-x-auto w-full">
                <table className="table">
                  {/* head */}
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Event Name</th>
                      <th>Date</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* row 1 */}
                    {data &&
                      data.map((item) => (
                        <tr>
                          <th>{item?.event?.id ?? "Loading..."}</th>
                          <td>{item?.event?.name ?? "Loading..."}</td>
                          <td>{item?.event?.openDate ?? "Loading..."}</td>
                          <td>
                            <button className="btn btn-sm btn-info">
                              View Markets
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
