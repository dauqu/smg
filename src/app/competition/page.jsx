"use client";
import { useEffect, useState } from "react";
import Homes from "../components/homes";
import { useSearchParams } from "next/navigation";

export default function Page(params) {
  const searchParams = useSearchParams();
  const competition_id = searchParams.get("id");

  const [data, setData] = useState(null); // Initialize as null or appropriate initial value

  async function fetchData() {
    try {
      const response = await fetch(
        `http://localhost:4000/event/id/10693181`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const jsonData = await response.json();
      setData(jsonData?.data);
      console.log(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div>
        <Homes />
      </div>
    </div>
  );
}
