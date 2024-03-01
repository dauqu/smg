"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function Sidebar(params) {
  const [type, setType] = useState([]);

  const searchParams = useSearchParams();
  const competition_id = searchParams.get("id");

  async function getType() {
    // Fetch axios data
    await axios
      .get("http://65.20.66.239:4000/type/all")
      .then((res) => {
        setType(res?.data?.types);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // competition
  const [competition, setCompetition] = useState([]);

  async function getCompetition() {
    // Fetch axios data
    await axios
      .get("http://65.20.66.239:4000/competition/id/4")
      .then((res) => {
        setCompetition(res?.data?.competitions);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getType();
    getCompetition();
  }, []);

  const sidebar = [
    {
      competition: {
        id: "10693181",
        name: "Pakistan Super League",
      },
      marketCount: 43,
      competitionRegion: "International",
    },
    {
      competition: {
        id: "11678489",
        name: "ICC World Twenty20",
      },
      marketCount: 1,
      competitionRegion: "AUS",
    },
    {
      competition: {
        id: "11365612",
        name: "Test Matches",
      },
      marketCount: 4,
      competitionRegion: "International",
    },
    {
      competition: {
        id: "9962116",
        name: "One Day Internationals",
      },
      marketCount: 28,
      competitionRegion: "International",
    },
    {
      competition: {
        id: "9992899",
        name: "International Twenty20 Matches",
      },
      marketCount: 17,
      competitionRegion: "International",
    },
    {
      competition: {
        id: "12072774",
        name: "Womens International Twenty20 Matches",
      },
      marketCount: 20,
      competitionRegion: "International",
    },
    {
      competition: {
        id: "9886504",
        name: "Womens One Day Internationals",
      },
      marketCount: 26,
      competitionRegion: "International",
    },
    {
      competition: {
        id: "10328858",
        name: "Twenty20 Big Bash",
      },
      marketCount: 1,
      competitionRegion: "AUS",
    },
    {
      competition: {
        id: "10586027",
        name: "Ford Trophy",
      },
      marketCount: 9,
      competitionRegion: "NZL",
    },
    {
      competition: {
        id: "10479856",
        name: "Super Smash T20",
      },
      marketCount: 12,
      competitionRegion: "NZL",
    },
    {
      competition: {
        id: "12162210",
        name: "Womens Super Smash T20",
      },
      marketCount: 4,
      competitionRegion: "NZL",
    },
    {
      competition: {
        id: "11586749",
        name: "Test Series Markets",
      },
      marketCount: 9,
      competitionRegion: "GBR",
    },
    {
      competition: {
        id: "12264582",
        name: "Marsh One-Day Cup",
      },
      marketCount: 28,
      competitionRegion: "AUS",
    },
    {
      competition: {
        id: "123456789",
        name: "New Demo Series",
      },
      marketCount: 1,
      competitionRegion: "IN",
    },
    {
      competition: {
        id: "12195619",
        name: "Australia NCL Women",
      },
      marketCount: 6,
      competitionRegion: "GBR",
    },
    {
      competition: {
        id: "12161756",
        name: "Bangladesh Premier League",
      },
      marketCount: 3,
      competitionRegion: "International",
    },
    {
      competition: {
        id: "11690862",
        name: "ICC U19 World Cup",
      },
      marketCount: 37,
      competitionRegion: "NZL",
    },
    {
      competition: {
        id: "12039039",
        name: "Asia Cup",
      },
      marketCount: 5,
      competitionRegion: "GBR",
    },
    {
      competition: {
        id: "12546072",
        name: "SA20",
      },
      marketCount: 30,
      competitionRegion: "GBR",
    },
    {
      competition: {
        id: "12547929",
        name: "International League T20",
      },
      marketCount: 30,
      competitionRegion: "GBR",
    },
    {
      competition: {
        id: "12559935",
        name: "Women's Premier League",
      },
      marketCount: 2,
      competitionRegion: "GBR",
    },
    {
      competition: {
        id: "12637366",
        name: "Womens International Twenty20 Matches.",
      },
      marketCount: 14,
      competitionRegion: "GBR",
    },
    {
      competition: {
        id: "12645226",
        name: "Sri Lanka v Zimbabwe T20 Series",
      },
      marketCount: 14,
      competitionRegion: "GBR",
    },
    {
      competition: {
        id: "12561626",
        name: "ACC Twenty20 Cup",
      },
      marketCount: 20,
      competitionRegion: "GBR",
    },
    {
      competition: {
        id: "12651524",
        name: "International Twenty20 Series",
      },
      marketCount: 5,
      competitionRegion: "GBR",
    },
    {
      competition: {
        id: "12638098",
        name: "International Twenty20 Matches.",
      },
      marketCount: 14,
      competitionRegion: "GBR",
    },
  ];
  return (
    <div className="inset-0 bottom-0 h-screen pt-[7vh] bg-[#0C0E2C] flex w-auto relative">
      {/* Sidebar 1 */}
      <div class="simplebar-mask mt-2 border-r-[1px] border-slate-500 relative" style={{
          // transtion animation 
          transition: "transform 0.1s ease 0s",
          transform: "translate3d(0px, 0px, 0px)",
      }}>
        {type &&
          type.map((item) => (
            <a
              className={`${
                item.event_type === "4" ? "bg-slate-700" : ""
              } no-underline px-1 hover:bg-slate-700 justify-center flex flex-col items-center space-y-2 p-2`}
              href={`/category/${item.event_type}`}
            >
              <span class="sports-category__icon flex flex-col items-center justify-center hover:bg-slate-800">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  class="bi bi-dribbble fill-slate-300"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8 0C3.584 0 0 3.584 0 8s3.584 8 8 8c4.408 0 8-3.584 8-8s-3.592-8-8-8m5.284 3.688a6.8 6.8 0 0 1 1.545 4.251c-.226-.043-2.482-.503-4.755-.217-.052-.112-.096-.234-.148-.355-.139-.33-.295-.668-.451-.99 2.516-1.023 3.662-2.498 3.81-2.69zM8 1.18c1.735 0 3.323.65 4.53 1.718-.122.174-1.155 1.553-3.584 2.464-1.12-2.056-2.36-3.74-2.551-4A7 7 0 0 1 8 1.18m-2.907.642A43 43 0 0 1 7.627 5.77c-3.193.85-6.013.833-6.317.833a6.87 6.87 0 0 1 3.783-4.78zM1.163 8.01V7.8c.295.01 3.61.053 7.02-.971.199.381.381.772.555 1.162l-.27.078c-3.522 1.137-5.396 4.243-5.553 4.504a6.82 6.82 0 0 1-1.752-4.564zM8 14.837a6.8 6.8 0 0 1-4.19-1.44c.12-.252 1.509-2.924 5.361-4.269.018-.009.026-.009.044-.017a28.3 28.3 0 0 1 1.457 5.18A6.7 6.7 0 0 1 8 14.837m3.81-1.171c-.07-.417-.435-2.412-1.328-4.868 2.143-.338 4.017.217 4.251.295a6.77 6.77 0 0 1-2.924 4.573z"
                  />
                </svg>
              </span>
              <span class="text-slate-300 text-xs truncate w-[60px] text-center">
                {item.type_name ?? ""}
              </span>
            </a>
          ))}
      </div>
      {/* Sidebar 2 */}
      <div className="max-w-[300px] min-w-[250px] bg-[#0C0E2C] h-full inset-0 bottom-0 overflow-y-scroll">
        <div class="h-full relative">
          <div class="">
            <ul className="list pt-5">
              {competition &&
                competition.map((item, index) => (
                  <a
                    key={item._id}
                    className={`hover:bg-slate-700 py-2 px-4 no-underline text-slate-400 space-x-2 flex items-center ${
                      competition_id === item.id ? "bg-slate-700" : ""
                    }`}
                    href={`${item.id ? `/competition?id=${item.id}` : ""}`}
                  >
                    <div className="avatar placeholder">
                      <div className="bg-neutral text-neutral-content rounded-full w-6">
                        <img src="https://www.onlinebookbazar.com/assets/images/team/65d9aadb4a5d31708763867.jpg" />
                      </div>
                    </div>
                    <span
                      className="sub-category-drawer__text text-slate-200 text-xs truncate w-[200px]"
                      title={item.name ?? ""}
                    >
                      {item.name ?? ""}
                    </span>
                  </a>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
