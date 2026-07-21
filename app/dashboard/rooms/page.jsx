// "use client";
// import { useState, useEffect } from "react";
// import { Card, Button, Tag, Modal, DatePicker, message } from "antd";
// import { getRooms } from "@/lib/api/rooms";
// import { addToCart } from "@/lib/api/cart";
// import { useAuth } from "../../Context/AuthContext";

// const { RangePicker } = DatePicker;

// export default function CustomerRooms() {
//   const [rooms, setRooms] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [selectedRoom, setSelectedRoom] = useState(null);
//   const [dates, setDates] = useState(null);
//   const [modalOpen, setModalOpen] = useState(false);
//   const { currentUser } = useAuth();

//   const fetchAvailableRooms = async () => {
//     setLoading(true);
//     try {
//       const data = await getRooms({ status: "available" });
//       setRooms(data);
//     } catch (err) {
//       message.error("Failed to load rooms");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchAvailableRooms();
//   }, []);

//   const openCartModal = (room) => {
//     setSelectedRoom(room);
//     setDates(null);
//     setModalOpen(true);
//   };

//   const handleAddToCart = async () => {
//     if (!dates) {
//       message.error("Please select check-in and check-out dates");
//       return;
//     }
//     if (!currentUser) {
//       message.error("Please login to add to cart");
//       return;
//     }

//     try {
//       await addToCart({
//         userId: currentUser.id,
//         roomId: selectedRoom.id,
//         checkIn: dates[0].toISOString(),
//         checkOut: dates[1].toISOString(),
//       });
//       message.success("Added to cart!");
//       setModalOpen(false);
//     } catch (err) {
//       message.error(err.message);
//     }
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-6">Available Rooms</h1>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {rooms.map((room) => (
//           <Card
//             key={room.id}
//             cover={room.imageUrl && <img src={room.imageUrl} alt={room.type} className="h-48 object-cover" />}
//             title={`Room ${room.roomNumber} — ${room.type}`}
//           >
//             <p className="text-lg font-semibold">Rs. {room.price} / night</p>
//             <p>Capacity: {room.capacity} guest(s)</p>
//             <p className="text-gray-500 mb-2">{room.description}</p>
//             <div className="mb-3">
//               {room.amenities?.map((a) => (
//                 <Tag key={a}>{a}</Tag>
//               ))}
//             </div>
//             <Button type="primary" block onClick={() => openCartModal(room)}>
//               Add to Cart
//             </Button>
//           </Card>
//         ))}
//       </div>

//       {rooms.length === 0 && !loading && (
//         <p className="text-center text-gray-500 mt-10">No rooms available right now.</p>
//       )}

//       <Modal
//         title={`Add Room ${selectedRoom?.roomNumber} to Cart`}
//         open={modalOpen}
//         onCancel={() => setModalOpen(false)}
//         onOk={handleAddToCart}
//         okText="Add to Cart"
//       >
//         <p className="mb-3">Select your check-in and check-out dates:</p>
//         <RangePicker className="w-full" onChange={(val) => setDates(val)} />
//         {dates && (
//           <p className="mt-3">
//             Total nights: {dates[1].diff(dates[0], "day")} — Est. price: Rs.{" "}
//             {dates[1].diff(dates[0], "day") * (selectedRoom?.price || 0)}
//           </p>
//         )}
//       </Modal>
//     </div>
//   );
// }