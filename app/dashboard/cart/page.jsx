"use client";
import { useState, useEffect } from "react";
import { Table, Button, message, Popconfirm } from "antd";
import { getCart, removeFromCart, checkoutCart } from "@/lib/api/cart";
// import { useAuth } from "../../../Context/AuthContext";
import { useAuth } from "../../Context/AuthContext";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();

  const fetchCart = async () => {
    if (!currentUser) return;
    setLoading(true);
    try {
      const data = await getCart(currentUser.id);
      setCartItems(data);
    } catch (err) {
      message.error("Failed to load cart");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [currentUser]);

  const handleRemove = async (id) => {
    try {
      await removeFromCart(id);
      message.success("Removed from cart");
      fetchCart();
    } catch (err) {
      message.error(err.message);
    }
  };

  const handleCheckout = async () => {
    try {
      await checkoutCart(currentUser.id);
      message.success("Booking confirmed for all rooms!");
      setCartItems([]);
    } catch (err) {
      message.error(err.message);
    }
  };

  const calcNights = (checkIn, checkOut) =>
    Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24));

  const columns = [
    { title: "Room", dataIndex: ["room", "roomNumber"], key: "roomNumber" },
    { title: "Type", dataIndex: ["room", "type"], key: "type" },
    {
      title: "Check-in",
      dataIndex: "checkIn",
      key: "checkIn",
      render: (d) => new Date(d).toLocaleDateString(),
    },
    {
      title: "Check-out",
      dataIndex: "checkOut",
      key: "checkOut",
      render: (d) => new Date(d).toLocaleDateString(),
    },
    {
      title: "Total",
      key: "total",
      render: (_, item) => `Rs. ${calcNights(item.checkIn, item.checkOut) * item.room.price}`,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, item) => (
        <Popconfirm title="Remove this room?" onConfirm={() => handleRemove(item.id)}>
          <Button danger>Remove</Button>
        </Popconfirm>
      ),
    },
  ];

  const grandTotal = cartItems.reduce(
    (sum, item) => sum + calcNights(item.checkIn, item.checkOut) * item.room.price,
    0
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      <Table columns={columns} dataSource={cartItems} rowKey="id" loading={loading} pagination={false} />

      {cartItems.length > 0 && (
        <div className="flex justify-between items-center mt-6">
          <p className="text-xl font-semibold">Grand Total: Rs. {grandTotal}</p>
          <Button type="primary" size="large" onClick={handleCheckout}>
            Checkout & Book All Rooms
          </Button>
        </div>
      )}

      {cartItems.length === 0 && !loading && (
        <p className="text-center text-gray-500 mt-10">Your cart is empty.</p>
      )}
    </div>
  );
}