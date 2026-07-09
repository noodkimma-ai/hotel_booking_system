"use client";

import { Form, Input, Button, Card, Select, message } from "antd";
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { useAuth } from "../../Context/AuthContext";

const { Option } = Select;

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();


//    const handleRegister = async (values) => {
//      try {
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

//     if (!users.success) {
//       message.error(result.message);
//   
  const handleRegister = async (values) => {
  try {
    const users = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: values.name,
        email: values.email,
        phone: values.phone,
        password: values.password,
        role: values.role,
      }),
    });

    const data = await users.json();
    console.log("Register detail", data);
   
 router.push("/login");

   
  }catch (error) {
    console.log("register error", err);
  }
   
};

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <Card
        title="Create an Account"
        className="w-full max-w-md shadow-lg rounded-lg"
      >
        <Form layout="vertical" onFinish={handleRegister} autoComplete="off">
          <Form.Item
            label="Full Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please enter your full name",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Enter your full name"
            />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please enter your email",
              },
              {
                type: "email",
                message: "Please enter a valid email",
              },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Enter your email" autoComplete="off"/>
          </Form.Item>

          <Form.Item
            label="Phone Number"
            name="phone"
            rules={[
              {
                required: true,
                message: "Please enter your phone number",
              },
            ]}
          >
            <Input placeholder="98XXXXXXXX" />
          </Form.Item>

          <Form.Item label="Role" name="role" initialValue="customer">
            <Select>
              <Option value="admin">Admin</Option>
              <Option value="customer">Customer</Option>
              <Option value="staff">Staff</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please enter your password",
              },
              {
                min: 6,
                message: "Password must be at least 6 characters",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Enter your password"
              autoComplete="new-password"
            />
          </Form.Item>

          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              {
                required: true,
                message: "Please confirm your password",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }

                  return Promise.reject(new Error("Passwords do not match"));
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Confirm your password"
            />
          </Form.Item>

          <Button type="primary" htmlType="submit" block>
            Register
          </Button>

          <p className="text-center mt-4">
            Already have an account?{" "}
            <span
              className="text-blue-500 cursor-pointer"
              onClick={() => router.push("/login")}
            >
              Login
            </span>
          </p>
        </Form>
      </Card>
    </div>
  );
}
