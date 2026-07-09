"use client";

import Password from "antd/es/input/Password";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  
  useEffect(() => {
    const user = localStorage.getItem("currentUser");

    if (user) {
      setCurrentUser(user);
    }
  }, []);

  // const register = (userData) => {
  //   const users = JSON.parse(localStorage.getItem("users")) || [];

   
  //   const emailExists = users.find(
  //     (user) => user.email === userData.email
  //   );

  //   if (emailExists) {
  //     return {
  //       success: false,
  //       message: "Email already exists",
  //     };
  //   }

  //   users.push(userData);

  //   localStorage.setItem("users", JSON.stringify(users));

  //   return {
  //     success: true,
  //     message: "Registration Successful",
  //   };
  // };



//   const register = async (values) => {
//   try {
//     const users = await fetch("http://localhost:5000/api/auth/register", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         name: values.name,
//         email: values.email,
//         phone: values.phone,
//         password: values.password,
//         role: values.role,
//       }),
//     });

//     const data = await users.json();

//     if (!users.ok) {
//       return { success: false, message: data.error || "Registration failed" };
//     }else{

//     return { success: true, message: "Account created successfully!" };
//     }
//   } catch (err) {
//     return { success: false, message: "Server error, try again" };
//   }
// };

// const login = (values) => {
//     const users = JSON.parse(localStorage.getItem("users")) || [];
//     console.log(values);
//     console.log(users);
    

//     const user = users.find(
//       (u) =>
//         u.email === values.email &&
//         u.password === values.password
//     );

//     if (!user) {
//       return {
//         success: false,
//         message: "Invalid Email or Password",
//       };
//     }

//     setCurrentUser(user);

//     localStorage.setItem(
//       "currentUser",
//       JSON.stringify(user)
//     );

//     return {
//       success: true,
//       user,
//     };
//   };



  const login = async(values) => {
    try{
    const users = await fetch("http://localhost:5000/api/auth/login",{
      method: "POST",
      headers:{"Content-Type":"application/json"},
      body :JSON.stringify({
        email: values.email,
        Password:values.password,
        role: values.role,
      }),
    });

    const data = await users.json();
    console.log(users);

    if (!users.ok){
      return {success: false, message: data.error || "Login Failed"}; 
    }


    localStorage.setItem("token", data.token);
    localStorage.setItem(
      "currentUser",
      JSON.stringify(data.user));

      setCurrentUser(data.user);
    

    return {
      success: true,
      user: data.user,
    };
  }catch(err){
    return {success:false,  message: "server error, try again"};
  }
  };

 
  const logout = () => {
    setCurrentUser(null);

    localStorage.removeItem("currentUser");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);