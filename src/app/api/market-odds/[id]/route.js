import { NextResponse } from "next/server";
import axios from "axios";

// To handle a POST request to /api
export async function GET(request, { params }) {
  const param = params.id;

  // Make a GET request to https://api.daucu.site
  return axios.get(`http://142.93.36.1/api/v1/listMarketBookOdds?market_id=${param}`)
    .then(response => {
      const headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
        "Access-Control-Allow-Headers":
          "Content-Type, Access-Control-Allow-Headers",
        "Access-Control-Allow-Credentials": true,
        "Accept-Encoding": "gzip, deflate",
      };

      // Return the response data to the client
      return NextResponse.json(response.data, {
        status: response.status,
        headers,
      });
    })
    .catch(error => {
      // Handle any errors
      console.error("Error making GET request:", error.message);
      return NextResponse.json(
        { error: "Error making GET request" },
        { status: 500 }
      );
    });
}
