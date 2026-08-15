"use client";
import { useState, useEffect } from "react";
import { getMyBookings } from "../../../lib/bookings";
import {Card, Table, Tag, Image} from "antd";



export default function BookingPage(){
const  [ bookings, setBookings] = useState([]);

const columns =[
    {
        title:"Room Name",
        dataIndex:["room", "roomName"] // harek bookings ma gayera room object ko roomName nikala 
    }, 
    {
        title: "Room Number",
        dataIndex:["room", "roomNumber"]
    }, 
    {
        title: "Check In",
        dataIndex:"checkIn",
        render:(date)=>new Date(date).toLocaleDateString(),
    },
    {
        title:"Check Out",
        dataIndex:"checkOut",
        render:(date)=>new Date(date).toLocaleDateString(),
    },
    {
        title:"Total Price",
        dataIndex:"totalPrice",
        render:(price)=>`Rs. ${price}`,
    },
    {
        title:"Status",
        dataIndex:"status",
        render:(status) =>(
            <Tag>{status}</Tag>
        ),


    }
]


useEffect(()=>{
    console.log("my Booking page load");
    const loadBookings = async()=>{
        const data = await getMyBookings();
        console.log("Loading function called");
        console.log("My booking: ", data);

        console.log("Data.Booking: ", data?.bookings);  //yesley booking ma k k data xa tyo saboi dinxa 
        console.log("Is Array: ", Array.isArray(data?.bookings));  // yesley direct answer dinxa data.booking array ho bhaney true if hoinabhaney false

        setBookings(data?.bookings);   //yesma backend bata ayeko bookings ko data awxa jun backend ko response ma pathako xa booking successfully and booking data but yeta just bookings awxa because hamiloi page render bhaye paxi just booking dekhaonu parney table ma 
    }

    loadBookings();
},[]);

return(
    <div>
        {/* {bookings?.length === 0 ? ("No booking Yet.Book a room to see your booking here") : 
        bookings?.map((booking)=>{
            return(
            <Card key={booking.id}>
              <p>Room Name: {booking.room.roomName}</p>
              <p>Room Number: {booking.room.roomNumber}</p>
              <p>{booking.room.image}</p>
              <p>CheckIn :{booking.checkIn}</p>
              <p>checkOut:{booking.checkOut}</p>
              <p>Total Price:{booking.totalPrice}</p>
              <p>Status:{booking.status}</p>
            </Card>
            );
        },)
        }, */}

        {bookings?.length ===0 ? (
            <p>No Yet Booking.Book a room to see your booking</p>
        ) :
        <Table 
        columns={columns}
        dataSource={bookings}
        rowKey="id"
        scroll={{x:800}}/>
            }
    </div>
)
}
