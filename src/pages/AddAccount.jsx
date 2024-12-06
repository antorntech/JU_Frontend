import React, { useState } from "react";
import { Form, Input, Button, message, Row, Col } from "antd";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const AddAccount = () => {
  const navigate = useHistory();
  const [uploading, setUploading] = useState(false);

  const handleUpload = (values) => {
    setUploading(true);

    // Make the API call to create a new admin
    fetch("http://localhost:5000/api/v1/admin/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Ensure proper headers
      },
      body: JSON.stringify(values), // Send JSON payload
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Admin created successfully") {
          message.success("Admin created successfully.");
          navigate.push("/accounts"); // Redirect to accounts page
        } else if (data.message === "Admin with this email already exists") {
          message.error("Admin with this email already exists.");
        } else if (data.message === "All fields are required") {
          message.error("Please fill in all required fields.");
        } else {
          message.error("An error occurred. Please try again.");
        }
      })
      .catch(() => {
        message.error("Failed to create admin. Please check your connection.");
      })
      .finally(() => {
        setUploading(false);
      });
  };

  return (
    <Row gutter={[24, 0]}>
      <Col xs={24} md={6} lg={6}>
        <div style={{ marginBottom: "20px" }}>
          <h1 style={{ margin: "0px", fontSize: "22px", fontWeight: "bold" }}>
            Add Account Details
          </h1>
          <p>You can create a new admin account here.</p>
        </div>
        <Form
          onFinish={handleUpload}
          layout="vertical"
          initialValues={{
            userName: "",
            email: "",
            password: "",
          }}
        >
          <Form.Item
            name="userName"
            label="Username"
            rules={[{ required: true, message: "Please enter a username" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please enter an email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[
              { required: true, message: "Please enter a password" },
              {
                min: 6,
                message: "Password must be at least 6 characters long",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Button
            className="primary-btn"
            type="primary"
            htmlType="submit"
            loading={uploading}
          >
            Submit
          </Button>
        </Form>
      </Col>
    </Row>
  );
};

export default AddAccount;
