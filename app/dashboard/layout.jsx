"use client";

import { Layout, Menu, Avatar, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {useState, useEffect} from "react";
import { Footer } from "antd/es/layout/layout";
// import { useAuth } from "../context/AuthContext";

const { Header, Sider, Content } = Layout;

export default function DashboardLayout({ children }) {
//   const { currentUser, logout } = useAuth();
  const router = useRouter();
  const [user, setUser]  = useState(null);
  useEffect(()=>{
  const storedUser = localStorage.getItem ("user");
  if(!storedUser){
    router.replace("/login");
    return;
  }
  setUser(JSON.parse(storedUser));
  },[router]);
  

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  if(!user){
    return(
        <div className="flex h-screen items-center justify-center">
            loading......
        </div>
    );
  }

  let menuItems = [];

  switch (user?.role) {
    case "admin":
      menuItems = [
        {
          key: "1",
          label: <Link href="/dashboard">🏠 Dashboard</Link>,
        },
        {
          key: "2",
          label: <Link href="/dashboard/rooms">Rooms</Link>,
        },
        {
          key: "3",
          label: <Link href="/dashboard/bookings">Bookings</Link>,
        },
        {
          key: "4",
          label: <Link href="/dashboard/users">Users</Link>,
        },
      ];
      break;

    case "customer":
      menuItems = [
        {
          key: "1",
          label: <Link href="/dashboard">🏠 Dashboard</Link>,
        },
        {
          key: "2",
          label: <Link href="/dashboard/rooms">Available Rooms</Link>,
        },
        {
          key: "3",
          label: <Link href="/dashboard/bookings">My Bookings</Link>,
        },
        {
          key: "4",
          label: <Link href="/dashboard/profile">Profile</Link>,
        },
      ];
      break;

    case "staff":
      menuItems = [
        {
          key: "1",
          label: <Link href="/dashboard">🏠 Dashboard</Link>,
        },
        {
          key: "2",
          label: <Link href="/dashboard/bookings">Bookings</Link>,
        },
        {
          key: "3",
          label: <Link href="/dashboard/rooms">Rooms</Link>,
        },
      ];
      break;

    default:
      menuItems = [];
  }

  return (
    <Layout className="min-h-screen">
    
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        className="shadow-lg"
      >
        <div className="h-16 flex items-center justify-center text-white text-2xl font-bold border-b border-gray-700">
          InnCloud
        </div>

        <Menu
          theme="dark"
          mode="inline"
          items={menuItems}
        />
      </Sider>

      <Layout>
        {/* Header */}
        <Header className="bg-white flex justify-between items-center px-6 shadow">
          <h2 className="text-xl font-semibold">
            Hotel Management System
          </h2>

          <div className="flex items-center gap-4">
            {/* <Avatar
              size="large"
              icon={<UserOutlined />}
            />

            <div className="hidden md:block">
              <p className="font-semibold">
                {user?.name}
              </p> */}

              {/* <p className="text-xs text-gray-500 capitalize leading-4">
                {user?.role}
              </p> */}
            {/* </div> */}

            <Button danger onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </Header>

        <Content className="m-6">
          <div className="bg-white rounded-xl shadow p-6 min-h-[80vh]">
            {children}
          </div>
        </Content>
        <Footer className="bg-white border-t text-center py-4">
            <p className="text-gray-500 text-sm">Have a good day! heheheheheheh</p>
        </Footer>
      </Layout>
    </Layout>
  );
}