"use client";
import { useState, useEffect } from "react";
import { getAllBookings } from "../../../lib/bookings";
import {Table, Tag} from "antd";

export default function AdminBooking(){

    const [bookings, setBookings] = useState([]);

    const columns = [
        {
            title:"Customer Name",
            dataIndex:["user", "name"],
        },
        {
            title:"Email",
            dataIndex:["user", "email"],
        },
        {
            title:"RoomName",
            dataIndex:["room", "roomName"],
        },
        {
            title:"Room Number",
            dataIndex:["room", "roomNumber"],
        },
        {
            title:"Check In",
            dataIndex:"checkIn",
            render:(date)=> new Date(date).toLocaleDateString(),
        },
        {
            title:"Check Out",
            dataIndex:"checkOut",
            render:(date)=> new Date(date).toLocaleDateString(),
        },
        {
            title:"Total amout",
            dataIndex:"totalPrice",
            render:(price)=> `Rs. ${price}`,
        },
        {
            title:"Status",
            dataIndex:"status",
            render:(status)=>{

                console.log("status:", status);
                console.log("Status Type: ",typeof status);
                let color="default";
                if(status === "pending"){
                    color = "gold";
                }else if(status === "confirmed"){
                    color = "green";
                }else if(status === "checked-in"){
                    color ="blue";
                }else if(status === "checked-out"){
                    color = "purple";
                }else if(status === "cancelled"){
                    color = "red";
                }
                return(
                    <Tag color={color}>
                      {String(status).toUpperCase()}
                    </Tag>
                );
            },
        },
    
    ]

    useEffect(()=>{

        console.log("Use Effect RUnning");
        const loadBookings = async()=>{
            console.log("Load booking function Run");
            const data = await getAllBookings();
            console.log("Admin Booking Data", data);
            setBookings(data?.bookings || []);
        };;
        loadBookings();

    },[])
    return(
        <div>
            <h1>All Booking</h1>
            <Table
            columns={columns}
            dataSource={bookings}
            rowKey="id"
            scroll={{x:1200}}/>
        </div>
    );
}