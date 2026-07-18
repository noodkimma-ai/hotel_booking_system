"use client";
import { useState } from "react";
import { Button, Form, Input, Card, message } from "antd";
import { useRouter } from "next/navigation";
import { LockOutlined } from "@ant-design/icons";
import Link from "next/link";
// import { useForm } from "antd/es/form/Form";
// import { useAuth } from "../../Context/AuthContext";
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [from] = Form.useForm(); 

  const router = useRouter();

  const handleLogin = async (values) => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },  //data should be send in the form of JSon 
        body: JSON.stringify({
          email: values.email,
          password: values.password,
          role: values.role,
        }),
      });
      // const result = await response.json();
      // console.log("Login Details", result);


      // if (result.user.role === "admin") {
      //   router.replace("/dashboard");
      //   console.log("admin", result.user.role);
      // }

      // if (result.user.role === "customer") {
      //   router.replace("/dashboard");
      // }

      // if (result.user.role === "staff") {
      //   router.replace("/dashboard");
      // }

      const result = await response.json();   //backend bata token and user ko data awxa in the form of json
      if(!response.ok){
        message.error(result.message || "Login Failed");
        return;
      }
      localStorage.setItem("token", result.token);
      localStorage.setItem("user", JSON.stringify(result.user));
      message.success("Login successfull");
      router.replace("/dashboard");
    } catch (error) {
      console.log("Error while login", error);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <Card
        title="Login to Your account"
        className="w-full max-w-md shadow-lg rounded-lg"
      >
        <Form layout="vertical" onFinish={handleLogin} autoComplete="off">
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "enter a valid email" }]}
          >
            <Input
              placeholder="ENter your email"
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="off"
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "enter password" }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="......."
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
            />
          </Form.Item>

          <Button type="primary" htmlType="submit" block>
            Login
          </Button>

          <p className="text-center mt-4">
            Register a new account?{" "}
            <span
              className="text-blue-500 cursor-pointer"
              onClick={() => router.push("/register")}
            >
              Register
            </span>
          </p>
        </Form>
      </Card>
    </div>
  );
}
