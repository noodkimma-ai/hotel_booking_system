"use client";

import { useEffect, useState } from "react";
import { getRooms } from "../../../lib/rooms";
import { Card, Button, Drawer, Modal, message, DatePicker, Form, InputNumber } from "antd";
import { Header } from "antd/es/layout/layout";
import { useCart } from "../../context/cartContext";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
// import { Label } from "recharts";
export default function BrowseRoom() {
  const [rooms, setRooms] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  // const [cartItems, setCartItems] = useState([]);

  const {form} = Form.useForm();
  const {
    cartItems,
    handleAddToCart,
    handleRemove,
    totalValue,
    updatedCartItems,
  } = useCart();
  const router = useRouter();

  useEffect(() => {
    loadRooms();
  }, []);
  const loadRooms = async () => {
    const data = await getRooms();
    console.log(data);
    setRooms(data);
  };
  // const handleAddToCart = (room) => {
  //   console.log("current room",room);
  //   const existingItems = cartItems.find((item)=>
  //   item.id == room.id);
  //   if(existingItems){
  //     message.warning(`${room.roomName} already in a cart`);
  //     return;    //return because function ahi rokna chahanxaw
  //   }

  //   setCartItems([...cartItems, room]);
  //   setCartOpen(true);
  // };

  // const handleRemove=(id)=>{

  //   const newCartItems = cartItems.filter((i)=>
  //      i.id !== id
  //   );
  //   console.log("New cart", newCartItems);
  //   setCartItems(newCartItems);
  // };
  // const totalValue = cartItems.reduce((total,item)=>{
  //   return total = total+item.price;
  // },0)    //because initially 0 dekhi start garxa



  const handleProceedToBooking= async()=>{
    const saveBooking = await axios.post()
  }

  const handleSearch=(values)=>{
    console.log(values);
  }
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold"> Browse Room</h2>

        <Button type="primary" onClick={() => setCartOpen(true)}>
          {" "}
          🛒 Cart ({cartItems.length})
        </Button>
      </div>

      <div className="max-w-4xl mx-auto p-6">

            <Form 
            form={form}
            layout="vertical"
            onFinish={handleSearch}
            className="m-w-4xl">
                <Form.Item 
                label="Check-In"
                name="checkIn"
                rules={[
                    {
                        required:true, message:"Please select a check-In date"
                    }
                ]}>
                 <DatePicker className="w-full"/>
                </Form.Item>

                <Form.Item 
                label="Check-Out"
                name="checkOut"
                rules={[{
                  required:true, message:"Please select check-Out date"
                }]}>
                  <DatePicker className="w-full"/>
                </Form.Item>
                <Form.Item 
                label="Number of Guests"
                name="guest"
                rules={[{
                  required:true, message:"Enter a number of guest"
                }]}>
                  <InputNumber min={1}
                  className="w-full"/>
                </Form.Item>
            <Button type="primary"
            htmlType="submit"
            className="w-full">search</Button>

            </Form>
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
              onClick={() => {
                (handleAddToCart(room), setCartOpen(true));
              }} // room come from map ko iteration bata
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
        {cartItems.length > 0 ? (
          <>
            {cartItems.map((item) => (
              <div key={item.id} className="mb-4 boarder-b pb-2">
                <h3 className="font-bold">{item.roomName}</h3>
                <p>Room No: {item.roomNumber}</p>
                <p>Room Type: {item.roomType}</p>
                <div className="mt-3">
                  <label className="font-medium">check In:</label>
                  <DatePicker
                    className="w-full mt-1"
                    placeholder="select check in"
                    onChange={(date) => {
                      updatedCartItems(item.id, "checkIn", Date);
                    }} //item.id => hamiley update garnu parney room kun ho and item bhaney map ko item ,,yo checkIn date picker ho so CheckIn ,,,DatePicker bata ayeko date
                    disabledDate={(current) =>
                      current && current.isBefore(dayjs().startOf("day"))
                    }
                  />
                </div>
                <div className="mt-3">
                  <label className="" font-medium>
                    check Out:
                  </label>
                  <DatePicker
                    className="w-full mt-1"
                    placeholder="select check Out"
                    onChange={(date) => {
                      console.log(date);
                    }}
                  />
                </div>
                <p>Capacity: {item.capacity}</p>
                <p>NPR {item.price}</p>
                <Button type="primary" onClick={() => handleRemove(item.id)}>
                  Remove
                </Button>
                {/* <Button>+</Button> */}
              </div>
            ))}
            <h2> Total Revenue : Rs{totalValue}</h2>

            <Button
              type="primary"
              className="w-full mt-4"
              onClick={() => {
                handleProceedToBooking
              }}
            >
              Proceed to Booking
            </Button>
          </>
        ) : (
          <div className="mt-4 border-t pt-4">
            <h2 className="text-lg font-semibold">Your cart is Empty</h2>
            <p className="text-gray-500">
              please add a room in a cart to continue....
            </p>
          </div>
        )}
      </Drawer>
    </div>
  );
}
