import { NextResponse } from "next/server";
import axios from "axios";

// To handle a POST request to /api
export async function GET(request, { params }) {
  const event_type_id = params.event_type_id;
  const competition_id = params.competition_id;
  try {
    // Make a GET request to https://api.daucu.site
    const response = await axios.get(
      `http://142.93.36.1/api/v1/fetch_data?Action=listEvents&EventTypeID=${event_type_id}&CompetitionID=${competition_id}`
    );

    // Return the response data to the client
    return NextResponse.json(response.data, {
      status: response.status,
    });
  } catch (error) {
    // Handle any errors
    console.error("Error making GET request:", error.message);
    return NextResponse.json(
      { error: "Error making GET request" },
      { status: 500 }
    );
  }
}
