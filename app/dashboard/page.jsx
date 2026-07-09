"use client";

import { Card } from "antd";
import { useEffect, useState } from "react";


export default function DashboardPage() {
    const [user, setUser] = useState(null);
//   const { currentUser } = useAuth();
useEffect(()=>{
    const storedUser = localStorage.getItem("user");
    if(storedUser){
        setUser(JSON.parse(storedUser));
    }
},[])
if(!user){
    return(
        <div className="flex h-screen item-center justify-center">loading...</div>
    );
}

  return (
    <Card title="Dashboard">
      <h1 className="text-2xl font-bold">
        Welcome {user?.name}
      </h1>

      <p className="text-gray-500 mt-2">
        Role : {user?.role}
      </p>
    </Card>
  );
}