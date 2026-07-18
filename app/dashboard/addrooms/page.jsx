"use client";
import { useState, useEffect } from "react";
import { Button, Modal, Form, Input, Select, InputNumber, Upload, message, Table, Popconfirm } from "antd";
import {UploadOutlined, uploadOutlined} from "@ant-design/icons";
import { getRooms, createRoom, updateRoom, deleteRoom } from "../../../lib/rooms";
import { create } from "node:domain";
import { title } from "node:process";
export default function AddRoom() {
  const [rooms, setRooms] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [editingRoom, setEditingRoom] = useState(null);
  const [form] = Form.useForm();
  useEffect(() => {
    loadRooms();
  }, []);
  const loadRooms = async () => {
    const data = await getRooms();
    console.log("Api response", data);
    setRooms(data);
  };

  const handleSubmit=async(values)=>{
    try{
    const formData = new FormData();
   formData.append("roomNumber", values.roomNumber );
   formData.append("roomName", values.roomName);
   formData.append("roomType", values.roomType);
   formData.append("floor", values.floor);
   formData.append("price", values.price);
   formData.append("capacity", values.capacity);
   formData.append("description", values.description);
   formData.append("image", selectedFile);
    // console.log(values);
    // await createRoom(formData);
    if (editingRoom) {
   await updateRoom(editingRoom.id, formData);
} else {
   await createRoom(formData);
}
    message.success("Room created successfully");
    setOpen(false);
    loadRooms();
   
    }catch (error) {
  console.log("Update Error:", error);

  if (error.response) {
    console.log("Status:", error.response.status);
    console.log("Response:", error.response.data);
  }

  message.error("Failed to save room");
}
  
  }
  console.log("room state:" , rooms);

  const handleEdit=async(room)=>{
    setEditingRoom(room);
    form.setFieldsValue({
      roomNumber: room.roomNumber,
        roomName: room.roomName,
        roomType: room.roomType,
        floor: room.floor,
        price: room.price,
        capacity: room.capacity,
        description: room.description,
    })
    setOpen(true);
   
  }

  const handleDelete = async(id)=>{
    try {
      await deleteRoom(id);
      console.log("successfully deleted")
      loadRooms();
    } catch (error) {
      console.log(error);
    }
  }

  const columns = [
    {
      title:"Room No.",
      dataIndex: "roomNumber",
      key:"roomNumber",
    },
    {
      title:"Room Type",
      dataIndex:"roomType",
      key:"roomType",
    },
    {
      title:"Floor",
      dataIndex:"floor",
      key:"floor",
    },
    {
      title:"Price",
      dataIndex:"price",
      key:"price",
    },
    {
      title:"Capacity",
      dataIndex:"capacity",
      key:"capacity"
    },
    {
      title:"Status",
      dataIndex:"status",
      key:"status",
    },
  {
    title:"Action",
    key:"action",
    render:(_,record)=>(
      <div className="flex gap-2">
     <Button type="primary" onClick={()=>handleEdit(record)}>Edit</Button>
     <Popconfirm 
     title="Delete room"
     description="Are you sure you want to delete"
     onConfirm={()=>handleDelete(record.id)}
     okText="Yes"
     cancelText="No">
     <Button danger>Delete</Button>
     </Popconfirm>
     {/* <Button danger onClick={()=>handleDelete(record.id)}>Delete</Button> */}
      </div>
    )
  }
  ]
  return (
    <div className="p-6">
      <div className="flex justify-between item-center mb-6">
        <h2 className="text-3xl font-bold">Manage Room</h2>
        <Button type="primary" onClick={() => setOpen(true)}>
          Add Room
        </Button>
      </div>
      <h2> Manage Room</h2>
      
      {/* {rooms.map((room) => (
        <div key={room.id}>
          <h3>{room.roomNumber}</h3>
          <h3>{room.roomName}</h3>
          <h3>{room.roomType}</h3>
          <h3>{room.floor}</h3>
          <h3>{room.price}</h3>
          <h3>{room.capacity}</h3>
          <h3>{room.description}</h3>
          <p>status:{room.status}</p>
        </div>
      ))} */}
      <Table
      columns={columns}
      dataSource={rooms}
      rowKey="id"/>

      <Modal
        title="Add new Room"
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
      >
        <Form form={form} layout="verticle" onFinish={handleSubmit}>
          <Form.Item
            label="Room Number"
            name="roomNumber"
            rules={[
              {
                required: true,
                message: "Enter a room number ",
              },
            ]}
          >
            <Input placeholder="Enetr a room number" />
          </Form.Item>
          <Form.Item label="Enter a roomName"
          name="roomName"
         >
            <Input placeholder="Enet a room name"/>
          </Form.Item>
          <Form.Item
            label="Room Type"
            name="roomType"
            rules={[
              {
                required: true,
                message: "Select a room",
              },
            ]}
          >
            <Select
              placeholder="select room type "
              options={[
                { value: "single", label: "single" },
                { value: "double", label: "double" },
                { value: "delux", label: "Delux" },
                { value: "suite", label: "suite" },
              ]}
            />
          </Form.Item>
          <Form.Item
          label="Room floor" 
          name="floor"
          rules={[{
            required:true,
            message:"Enter a floor"
          }]}>
            <Select placeholder="select a floor"
            options={[
              {value:1, label:"first floor"},
              {value:2, label:"second floor"},
            {value:3, label:"third floor"},
            ]}/>
          </Form.Item>
          <Form.Item
            label="Price per Nght"
            name="price"
            rules={[
              {
                required: "true",
                message: "enter a valid price",
              },
            ]}
          >
            <InputNumber
              className="w-full"
              placeholder="Enetr a price"
              min={0}
            />
          </Form.Item>
          <Form.Item
            label="Capacity"
            name="capacity"
            rules={[
              {
                required: true,
                message: "capacity",
              },
            ]}
          >
            <InputNumber min={0}  />
          </Form.Item>
          <Form.Item 
          label="Discription"
          name="description">
           <Input.TextArea rows={4}
           placeholder="Enetr room description"/>
          </Form.Item>
          <Form.Item label="Upload Image" name="image">
           <Upload beforeUpload={(file)=>{   // antd design upload the image automatically but first as you want to something with this file first that's why before upload
            setSelectedFile(file);   //file=roomm101.jpg,  setSelectedFile(room101.jpg)
            return false;  // ant design upload the file automatically but we donot want this bcz we want to sent alldata together in one request
           }}>
            <Button icon={<UploadOutlined/>}>Choose image</Button>
           </Upload>
          </Form.Item>
          <Button type="primary" htmlType="submit" className="w-full">Save Room</Button>
        </Form>
      </Modal>
    </div>
  );
}
