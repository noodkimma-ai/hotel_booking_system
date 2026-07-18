import axios from "axios";
export async function getRooms() {
  try{
  const res = await axios.get("http://localhost:5000/api/rooms");
  // const rooms =await  res.data;
  console.log(res.data);
  return res.data;
  }catch (error) {
  console.log("Axios Error:", error);
  console.log("Message:", error.message);

  if (error.response) {
    console.log("Status:", error.response.status);
    console.log("Data:", error.response.data);
  }
}
  
}
export async function createRoom(roomData){ 
  try{  //roomData = formData javascript automatically does yesma ab aform data aba roomData ma awxa
  const res = await axios.post("http://localhost:5000/api/rooms", roomData);
  console.log(res.data);
  //const res  = await fetch("http://localhost:5000/api/rooms");
  // const data = await res.json();
  return res.data;
//   {method:"POST",
//     // header:{
//     //   "content-type": "application/json",
//     // },
//     // body:JSON.stringify(roomData), //because now we have formData
//     body:formData
//   }
// );
  }catch (error) {
  console.error("Axios Error:", error);

  if (error.response) {
    console.log("Status:", error.response.status);
    console.log("Data:", error.response.data);
  }
}
}

export async function updateRoom(id, roomUpdate) {
  try{

    const res = await axios.put(`http://localhost:5000/api/rooms/${id}`, roomUpdate)
  
    return res.data;
  }catch(error){
    console.log(error);
    if(error.response){
      console.log(error.response.data);
    }
  }
  
}
export async function deleteRoom(id) {
  try {
    const res = await axios.delete(`http://localhost:5000/api/rooms/${id}`)
    return res.data;
    
  } catch (error) {
    console.log(error);
    
  }
  
}