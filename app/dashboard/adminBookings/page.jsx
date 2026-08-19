"use client";
import { useState, useEffect } from "react";
import { getAllBookings , updateBookingStatus} from "../../../lib/bookings";
import {message, Popconfirm, Table, Tag} from "antd";


export default function AdminBooking(){

    const [bookings, setBookings] = useState([]);

    
    const handleStatusChange = async(id, status)=>{
        const data = await updateBookingStatus(id, status);
        if(data){
            setBookings((prevBookings)=>

          prevBookings.map((booking)=>
        booking.id === id ? {...booking, status:status} : booking) 
         );

         if( status === "confirmed"){
            message.success("Booking accepted successfully");
         }else if(status === "cancelled"){
            message.success("Booking Rejected success fully");
         }
        }
    };

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
        {
            title:"Action",
            render:(_,booking)=>{
                if(booking.status !== "pending"){
                    return (<Tag color={booking.status  === "confirmed" ? "green" : "red"}>
                        {String(booking.status).toUpperCase()}
                    </Tag>
                    );
                }
                return(
                    <div style={{display:"flex", gap:"8px"}}>
                        <button onClick={()=>handleStatusChange(booking.id, "confirmed")}>Accept</button>

                        <Popconfirm
                        title="Reject this booking?"
                        description="Are you sure you want to reject this booking?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={()=>{
                            updateBookingStatus(booking.id, "cancelled")
                        }}>
                        <button danger>Reject</button>

                        </Popconfirm>
                    </div>
                );
            },
        },
    
    ]

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