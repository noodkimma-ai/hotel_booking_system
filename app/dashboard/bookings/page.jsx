"use client";
import {Table, Button} from "antd";
import { useCart } from "../../context/cartContext";
import { title } from "node:process";


export default function MyBooking(){
    const {cartItems, totalValue, handleRemove} = useCart();
    const columns = [
        {
          title:"Room Name",
          dataIndex:"roomName",
        },
        {
            title:"Room Number",
            dataIndex:"roomNumber",
        },
        {
            title:"Capacity",
            dataIndex:"capacity",
        },
        {
            title:"Price",
            dataIndex:"price",
        },
        {
            title:"Status",
            dataIndex:"status",
        },
        {
            title:"Action",
            render:(_,record)=>(
                <Button danger onClick={()=>handleRemove(record.id)}>Remove</Button>
            )

        },
    ]
    return(
        <div>
            <h2> My Booking </h2>
            {/* {cartItems.map((item)=>(
              <div key={item} className="mb-4 boarder-b pb-2">
                <h3 className="font-bold">{item.roomName}</h3>
            <p>Room No: {item.roomNumber}</p>
            <p>Room Type: {item.roomType}</p>
            <p>Capacity: {item.capacity}</p>
            <p>NPR {item.price}</p>
              </div>
            ))} */}
            <Table
            columns={columns}
            dataSource={cartItems}
            rowKey="id"/>   //react lae pratayk row uniquely identify garna 
            <h2>Total Revenue: Rs{totalValue}

            </h2>
        </div>
    );
}