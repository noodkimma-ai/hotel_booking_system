// const BASE_URL = "http://localhost:5000/api/bookings";

// CREATE a booking
// export async function createBooking(data) {
//   const res = await fetch(BASE_URL, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(data),
//   });
//   const result = await res.json();
//   if (!res.ok) throw new Error(result.error || "Booking failed");
//   return result;
// }
import axios from "axios";

 //backend ma bookingData ko data jastoi checkIn checkOut guests ani cartItem ya pathaonu ani backend ma pathaonu paro 
   //token localstorage bata get gareko ani backend lai pathaonu parxa kun customer ko booking ho token bata thaha pawxa 
   export async function createBooking(bookingData) {

    try{
  const token = localStorage.getItem("token");

  console.log("Token:", token);
  console.log("Booking Data: ", bookingData);

  const res = await axios.post(
    "http://localhost:5000/api/bookings",
    bookingData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  console.log("Backend Response: ", res);

  return res;
}catch(error){
  console.log("Axios Error: ",error);
  console.log("Status Error: ", error.response?.status);
  console.log("Backend Error : ", error.response?.data);
  throw error;
}
}


export async function getMyBookings(){
  try{
    const token = localStorage.getItem("token");
    console.log("Token: ", token);
    console.log("API CALLING");
    const res = await axios.get("http://localhost:5000/api/bookings/my-bookings",{
      headers:{
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("API RESPONSE: ", res);
    console.log("Axios Status:",res.status);
    console.log("AXios DATA: ", res.data);

    return res.data; //backend bata ayeko response res ma xa but backend bata hami k lidoi xaw data 

  }catch(error){
     console.log("error Fetching booking: ",error);
     console.log("Error response:", error.response?.data);
  }
}

export async function getAllBookings(){
  console.log("Before Local storage");
  try {
    console.log("Before Local Storage");
    const token = localStorage.getItem("token");
    console.log(token);
    console.log("Get all booking");
    const res = await axios.get("http://localhost:5000/api/bookings",{
      headers:{
        Authorization:`Bearer ${token}`
      },

    });

    console.log("ApI Response: ,res.data");
    return res.data;
  } catch (error) {
    console.log("Error fetching all booking", error);
    console.log("error Response: ", error.response?.data);
  }
}