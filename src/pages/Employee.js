import { Space, Table, Button, Modal, Form, Input } from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
  EyeFilled,
} from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../components/shared/loader/Loader";
import useDecodeToken from "../components/hooks/useDecodeToken";

const { confirm } = Modal;
const { Column } = Table;

const Employee = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  const { decodedToken, error } = useDecodeToken(token);

  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch employees from the API
  const getEmployees = async () => {
    const token = JSON.parse(localStorage.getItem("token"));
    try {
      const response = await fetch("http://localhost:5000/api/v1/employee", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setEmployees([...data].reverse()); // Reverse order to show latest first
    } catch (error) {
      console.error("Failed to fetch employees:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getEmployees();
  }, []);

  // Show confirmation modal before deletion
  const showConfirm = (id) => {
    confirm({
      title: "Do you want to delete this employee?",
      icon: <ExclamationCircleOutlined />,
      content: "This action cannot be undone.",
      okText: "Delete",
      okType: "danger",
      onOk: async () => {
        try {
          const response = await fetch(
            `http://localhost:5000/api/v1/employee/${id}`,
            {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );
          const result = await response.json();

          if (response.ok) {
            toast.success("Employee deleted successfully", {
              autoClose: 1000,
            });
            // Update the employee list by removing the deleted one
            setEmployees((prev) => prev.filter((emp) => emp._id !== id));
          } else {
            toast.error(result.message || "Failed to delete employee");
          }
        } catch (error) {
          console.error("Error deleting employee:", error);
          toast.error("Error deleting employee");
        }
      },
      onCancel() {
        console.log("Delete canceled");
      },
    });
  };

  // Render the table or loader
  return (
    <>
      {!loading ? (
        employees.length > 0 ? (
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <h1
                  style={{
                    margin: "0px",
                    fontSize: "22px",
                    fontWeight: "bold",
                  }}
                >
                  Employee Table
                </h1>
                <p>
                  Employees are{" "}
                  {employees.length > 0 ? "available." : "not available."}
                </p>
              </div>
              <div>
                {decodedToken?.role === "admin" && (
                  <Button type="primary" className="primary-btn">
                    <Link to="/add_employee">
                      <PlusOutlined style={{ marginRight: "5px" }} />
                      Add Employee
                    </Link>
                  </Button>
                )}
              </div>
            </div>
            <div style={{ marginTop: "10px", overflowX: "auto" }}>
              <Table dataSource={employees} rowKey="_id">
                <Column
                  title="Avatar"
                  dataIndex="avatar"
                  key="avatar"
                  render={(_, record) => (
                    <img
                      src={`http://localhost:5000${record.avatar}`}
                      alt="Avatar"
                      style={{ width: "50px", height: "50px" }}
                    />
                  )}
                />
                <Column title="Office ID" dataIndex="officeId" key="officeId" />
                <Column
                  title="First Name"
                  dataIndex="firstName"
                  key="firstName"
                />
                <Column title="Last Name" dataIndex="lastName" key="lastName" />
                <Column
                  title="Designation"
                  dataIndex="designation"
                  key="designation"
                />
                <Column
                  title="Office Email"
                  dataIndex="officeEmail"
                  key="officeEmail"
                />
                <Column
                  title="Action"
                  key="action"
                  render={(_, record) => (
                    <Space size="middle">
                      {decodedToken?.role === "admin" && (
                        <Link to={`/edit_employee/${record._id}`}>
                          <Button type="primary">
                            <EditOutlined />
                          </Button>
                        </Link>
                      )}
                      <Link to={`/profile/${record._id}`}>
                        <Button
                          type="primary"
                          style={{
                            backgroundColor: "orange",
                            border: "1px solid orange",
                          }}
                        >
                          <EyeFilled />
                        </Button>
                      </Link>
                      {decodedToken?.role === "admin" && (
                        <Button
                          type="primary"
                          style={{
                            backgroundColor: "red",
                            border: "1px solid red",
                          }}
                          onClick={() => showConfirm(record._id)}
                        >
                          <DeleteOutlined />
                        </Button>
                      )}
                    </Space>
                  )}
                />
              </Table>
            </div>
          </div>
        ) : (
          <div style={{ height: "80%" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "30px",
              }}
            >
              <div>
                <h1>Employee Table</h1>
                <p>No employees available.</p>
              </div>
              <div>
                {decodedToken?.role === "admin" && (
                  <Button type="primary" className="primary-btn">
                    <Link to="/add_employee">
                      <PlusOutlined style={{ marginRight: "5px" }} />
                      Add Employee
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        )
      ) : (
        <div className="loader_position">
          <Loader />
        </div>
      )}
    </>
  );
};

export default Employee;
