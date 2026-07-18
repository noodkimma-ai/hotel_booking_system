"use client";

import { useEffect, useState } from "react";
import { getRooms } from "../../../lib/rooms";
import { Card, Button, Drawer, Modal, message } from "antd";
import { Header } from "antd/es/layout/layout";
export default function BrowseRoom() {
  const [rooms, setRooms] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    loadRooms();
  }, []);
  const loadRooms = async () => {
    const data = await getRooms();
    console.log(data);
    setRooms(data);
  };
  const handleAddToCart = (room) => {
    console.log("current room",room);
    const existingItems = cartItems.find((item)=>
    item.id == room.id);
    if(existingItems){
      message.warning(`${room.roomName} already in a cart`);
      return;    //return because function ahi rokna chahanxaw
    }
    
    setCartItems([...cartItems, room]);
    setCartOpen(true);
  };

  const handleRemove=(id)=>{
   
    const newCartItems = cartItems.filter((i)=>
       i.id !== id
    );
    console.log("New cart", newCartItems);
    setCartItems(newCartItems);
  };
  const totalValue = cartItems.reduce((total,item)=>{
    return total = total+item.price;
  },0)    //because initially 0 dekhi start garxa 

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        
        <h2 className="text-2xl font-bold"> Browse Room</h2>
       <Button type="primary" onClick={()=>setCartOpen(true)}>  🛒 Cart ({cartItems.length})</Button>
    
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {rooms.map((room) => (
        <Card
          key={room.id}
          hoverable
          cover={
            <img
              alt={room.roomName}
              src={`http://localhost:5000/uploads/${room.image}`}
              className="h-56 object-cover"
            />
          }
        >
          <h2 className="text-xl font-bold">Room Name:{room.roomName}</h2>
          <h2>Room Type:{room.roomType}</h2>
          <h2>Room Capacity:{room.capacity}</h2>
          <p>{room.description}</p>
          <p className="font text-lg">NPR: {room.price}/night</p>
          <Button
            type="primary"
            className="w-full mt-4"
            onClick={() => handleAddToCart(room)}  // room come from map ko iteration bata 
          >
            Add to cart
          </Button>
        </Card>
      ))}
      </div>
      <Drawer
        title="My Cart"
        placement="right"
        open={cartOpen}
        onClose={() => setCartOpen(false)}
      >
        {cartItems.map((item) => (
          <div key={item} className="mb-4 boarder-b pb-2">
            <h3 className="font-bold">{item.roomName}</h3>
            <p>Room No: {item.roomNumber}</p>
            <p>NPR {item.price}</p>
            <Button type="primary"
            
            onClick={()=>handleRemove(item.id)}>Remove</Button>
            {/* <Button>+</Button> */}
          </div>
        ))}
        <h2> Total Revenue : Rs{totalValue}</h2>
      </Drawer>
    </div>
  );
}
