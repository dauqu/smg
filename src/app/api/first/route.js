import axios from "axios";
import { NextResponse } from "next/server";

// To handle a GET request to /api
export async function GET(request) {
  try {
    // Make a GET request to https://api.daucu.site
    const response = await axios.get("http://142.93.36.1/api/v1/fetch_data?Action=listEventTypes");

    // Return the response data to the client
    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    // Handle any errors
    console.error("Error making GET request:", error.message);
    return NextResponse.json(
      { error: "Error making GET request" },
      { status: 500 }
    );
  }
}
