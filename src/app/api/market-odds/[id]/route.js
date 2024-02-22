import axios from "axios";
import { NextResponse } from "next/server";

// To handle a POST request to /api
export function GET(request, { params }, res) {
  const param = params.id;

  // Make a GET request to https://api.daucu.site
  axios.get(`http://142.93.36.1/api/v1/listMarketBookOdds?market_id=${param}`)
    .then(response => {
      const headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
        "Access-Control-Allow-Headers":
          "Content-Type, Access-Control-Allow-Headers",
        "Access-Control-Allow-Credentials": true,
        "Accept-Encoding": "gzip, deflate",
      };

      // Set the headers
      Object.keys(headers).forEach((key) => {
        res.setHeader(key, headers[key]);
      });

      // Return the response data to the client
      res.status(response.status).json(response.data);
    })
    .catch(error => {
      // Handle any errors
      console.error("Error making GET request:", error.message);
      res.status(500).json({ error: "Error making GET request" });
    });
}
