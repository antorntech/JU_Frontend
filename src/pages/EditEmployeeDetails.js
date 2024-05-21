import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  message,
  Row,
  Col,
  Upload,
  InputNumber,
} from "antd";
import { useHistory, useParams } from "react-router-dom";
import { UploadOutlined } from "@ant-design/icons";

const EditEmployeeDetails = () => {
  const navigate = useHistory();
  const { id } = useParams();
  const [form] = Form.useForm();
  const [employeeDetails, setEmployeeDetails] = useState({});
  const [uploading, setUploading] = useState(false);
  const [avatarFileList, setAvatarFileList] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/api/v1/employee/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch employee data");
        }
        return res.json();
      })
      .then((data) => {
        setEmployeeDetails(data.data);
        form.setFieldsValue(data.data);
      })
      .catch((error) => {
        console.error("Error fetching employee data:", error);
        message.error("Failed to fetch employee data");
      });
  }, [id, form]);

  const handleUpload = async (values) => {
    try {
      setUploading(true);
      const formData = new FormData();

      // Append form values to FormData
      for (const key in values) {
        if (values.hasOwnProperty(key) && key !== "avatar") {
          formData.append(key, values[key]);
        }
      }

      // Append file to FormData
      if (avatarFileList.length > 0) {
        formData.append("avatar", avatarFileList[0].originFileObj);
      }

      const response = await fetch(
        `http://localhost:5000/api/v1/employee/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update employee data");
      }

      message.success("Employee data updated successfully.");
      navigate.push("/employee");
    } catch (error) {
      console.error("Error updating employee data:", error);
      message.error("Failed to update employee data");
    } finally {
      setUploading(false);
    }
  };

  const avatarFileProps = {
    onRemove: () => {
      setAvatarFileList([]);
    },
    beforeUpload: (file) => {
      setAvatarFileList([file]);
      return false;
    },
    fileList: avatarFileList,
  };

  return (
    <Row gutter={[24, 0]}>
      <Col xs={24} md={12} lg={12}>
        <Form
          form={form}
          onFinish={handleUpload}
          layout="vertical"
          initialValues={employeeDetails}
        >
          <Row gutter={[24, 0]}>
            <Col xs={24} md={12} lg={12}>
              <Form.Item
                name="officeId"
                label="OfficeId"
                placeholder="Enter officeId"
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} md={12} lg={12}>
              <Form.Item
                name="officeEmail"
                label="Office Email"
                placeholder="Enter officeEmail"
              >
                <Input disabled />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[24, 0]}>
            <Col xs={24} md={12} lg={12}>
              <Form.Item
                name="firstName"
                label="First Name"
                placeholder="Enter firstName"
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} md={12} lg={12}>
              <Form.Item
                name="lastName"
                label="Last Name"
                placeholder="Enter lastName"
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[24, 0]}>
            <Col xs={24} md={24} lg={24}>
              <Form.Item
                name="designation"
                label="Designation"
                placeholder="Enter designation"
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[24, 0]}>
            <Col xs={24} md={12} lg={12}>
              <Form.Item name="primaryMobNumber" label="Primary Mobile Number">
                <InputNumber
                  prefix="+88"
                  type="number"
                  style={{
                    width: "100%",
                  }}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12} lg={12}>
              <Form.Item
                name="secondaryMobNumber"
                label="Secondary Mobile Number"
              >
                <InputNumber
                  prefix="+88"
                  type="number"
                  style={{
                    width: "100%",
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[24, 0]}>
            <Col xs={24} md={12} lg={12}>
              <Form.Item
                name="avatar"
                label="Upload Employee Photo"
                rules={[
                  {
                    required: true,
                    message: "Please upload employee photo",
                  },
                ]}
              >
                <Upload {...avatarFileProps}>
                  <Button icon={<UploadOutlined />}>Select File</Button>
                </Upload>
              </Form.Item>
            </Col>
            <Col xs={24} md={12} lg={12}>
              <Form.Item label=" ">
                <Button
                  className="primary-btn"
                  type="primary"
                  htmlType="submit"
                  loading={uploading}
                >
                  Submit
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  );
};

export default EditEmployeeDetails;
