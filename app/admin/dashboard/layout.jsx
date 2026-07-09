// "use client";

// import { Layout, Menu, Drawer, Button, Avatar } from "antd";
// import { useState } from "react";
// import { MenuOutlined, UserOutlined } from "@ant-design/icons";

// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { useAuth } from "../../Context/AuthContext";

// const { Header, Footer, Sider, Content } = Layout;

// const items = [
//   {
//     key: "/dashboard",

//     label: <Link href="/admin/dashboard">🏠 Dashboard</Link>,
//   },
//   {
//     key: "/dashboard/rooms",

//     label: <Link href="/admin/dashboard/rooms">Room management</Link>,
//   },
//   {
//     key: "/dashboard/users",

//     label: <Link href="/dashboard/bookroom">Booking Management</Link>,
//   },
//   {
//     key: "/dashboard/settings",

//     label: <Link href="/dashboard/user">User managment </Link>,
//   },
// ];

// export default function DashboardLayout({ children }) {
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const router = useRouter();
//   const { currentUser, logout } = useAuth();
//   const handleLogout = () => {
//   logout();
//   router.push("/login"); // yaha lekhne
// };

  
//   return (
//     <Layout className="h-screen">
//       <Sider
//         breakpoint="lg"
//         collapsedWidth="0"
//         className="hidden lg:block"
//         trigger={null}
//       >
//         <div className="text-white text-center py-5 font-bold">InnCloud</div>

//         <Menu
//           theme="dark"
//           mode="inline"
//           items={items}
//           // onClick={handleMenuClick}
//         />
//       </Sider>

//       <Layout>
//         <Header className="bg-white flex items-center justify-between px-4 lg:justify-end">
//           <div className="flex items-center gap-2">
//             <span className="font-bold bg-gradient-to-r from-green-600 to-emerald-400 bg-clip-text text-transparent">
//               Hello ! ,
//               <span className="font-bold bg-gradient-to-r from-green-600 to-emerald-400 bg-clip-text text-transparent">
//                 {currentUser?.name}
//               </span>
//             </span>
//           </div>

//           <div className="flex items-center gap-3">
//             <Avatar
//               icon={<UserOutlined />}
//               className="bg-green-600"
//               size="default"
//             />
//             <Button danger size="small" onClick={handleLogout}>
//               Logout
//             </Button>
//           </div>
//         </Header>

//         <Content className="p-6">{children}</Content>

//         <Footer className="text-center">2026 hello it'me</Footer>
//       </Layout>
//       <Drawer
//         placement="left"
//         onClose={() => setDrawerOpen(false)}
//         open={drawerOpen}
//         bodyStyle={{ padding: 0 }}
//       >
//         ....
//       </Drawer>
//     </Layout>
//   );
// }
