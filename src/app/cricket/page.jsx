"use client";

import * as React from "react";

import axios from "axios";
import Header from "../components/header";
import SubHeader from "../components/sub-header";

export default function Page(params) {
  const [data, setUsers] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  async function mySitesFunction() {
    setLoading(true);
    await axios
      .get(`http://65.20.66.239:3000/api/first`, {})
      .then((res) => {
        setLoading(false);
        console.log(res.data);
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }

  React.useEffect(() => {
    mySitesFunction();
  }, []);
  return (
    <div>
      <div className="fixed top-0 left-0 right-0 z-10">
        <Header />
        <SubHeader />
      </div>
      <div className="mt-36">
        {/* Tabs */}
        {loading ? (
          "Loading..."
        ) : (
          <div role="tablist" className="tabs tabs-bordered">
            {data &&
              data.map((item) => (
                <div>
                  <input
                    type="radio"
                    name="my_tabs_1"
                    role="tab"
                    className="tab"
                    aria-label="Tab 1"
                  />
                  <div role="tabpanel" className="tab-content p-10">
                    {item?.name ?? "Loading..."}
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
