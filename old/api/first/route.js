import axios from "axios";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

// To handle a GET request to /api
export async function GET(request) {
  try {
    // Make a GET request to https://api.daucu.site
    const response = await axios.get(
      "http://142.93.36.1/api/v1/fetch_data?Action=listEventTypes"
    );

    //Save response in mongoDB 
    
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




// import axios from "axios";
// import { NextResponse } from "next/server";
// import mongoose from "mongoose";

// var database =
//   "mongodb+srv://mut:7388139606@cluster0.bhwnisi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// // To handle a GET request to /api
// export async function GET(request) {
//   try {
//     //Connect mongoDb
//     await mongoose
//       .connect(database, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//         useFindAndModify: false,
//         useCreateIndex: true,
//       })
//       .then(async () => {
//         console.log("MongoDB connection SUCCESS");

//         //Make a GET request to https://api.daucu.site
//         const response = await axios.get(
//           "http://142.93.36.1/api/v1/fetch_data?Action=listEventTypes"
//         );

//         // Save response in mongoDb
//         const eventType = response.data;
//         const EventTypeModel = mongoose.model("EventType", {
//           eventType: String,
//         });
//         const eventTypeDoc = new EventTypeModel({ eventType });

//         await eventTypeDoc.save();

//         // Return the response data to the client
//         return NextResponse.json(response.data, {
//           status: response.status,
//         });
//       })
//       .catch((error) => {
//         console.error("MongoDB connection FAIL");
//         return NextResponse.json(
//           { error: "MongoDB connection FAIL" },
//           { status: 500 }
//         );
//       });

//     // Close the connection to the database
//     await mongoose.connection.close();

//     // Return the response data to the client
//     return NextResponse.json(response.data, {
//       status: response.status,
//     });
//   } catch (error) {
//     // Handle any errors
//     console.error("Error making GET request:", error.message);
//     return NextResponse.json(
//       { error: "Error making GET request" },
//       { status: 500 }
//     );
//   }
// }
