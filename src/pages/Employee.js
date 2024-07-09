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

const onChange = (value) => {
  console.log(`selected ${value}`);
};
const onSearch = (value) => {
  console.log("search:", value);
};

const { confirm } = Modal;
const { Column } = Table;

const Employee = () => {
  // make & model list get from here
  const [count, setCount] = useState(false);
  const [employees, setEmployees] = useState([]);
  const newEmployees = [];
  [...employees].reverse().map((employee) => newEmployees.push(employee));
  const getEmployees = async () => {
    const token = JSON.parse(localStorage.getItem("token"));
    try {
      fetch("http://localhost:5000/api/v1/employee", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data && data.length > 0) {
            setEmployees([...data].reverse());
          } else {
            // Perform some action or set a message indicating that there is no data to reverse
            console.log("No data found to reverse!");
          }
          setCount(true);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getEmployees();
  }, [count]);

  let lastKey = parseInt(employees[employees.length - 1]?.key) + 1;

  // delete model is open
  const showConfirm = (id) => {
    confirm({
      title: "Do you Want to delete these items?",
      icon: <ExclamationCircleOutlined />,
      content:
        "After click on delete then your item will be delete permanently.",
      okText: "Delete",
      okType: "danger",

      onOk() {
        fetch(`http://localhost:5000/api/v1/employee/${id}`, {
          method: "DELETE",
          headers: {
            "content-type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            toast.success("Credits Deleted Successfully", {
              autoClose: 1000,
            });
            getEmployees();
          });
      },

      onCancel() {
        console.log("Cancel");
      },
    });
  };

  return (
    <>
      {employees && employees.length > 0 ? (
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
                style={{ margin: "0px", fontSize: "22px", fontWeight: "bold" }}
              >
                Employee Table
              </h1>
              <p>
                Employee are{" "}
                {employees.length > 0 ? "available." : "not available."}
              </p>
            </div>
            <div>
              <div style={{ marginRight: "10px" }}>
                <Button
                  type="primary"
                  className="primary-btn"
                  // onClick={() => {
                  //   setOpen(true);
                  // }}
                >
                  <Link to="/add_employee">
                    <PlusOutlined style={{ marginRight: "5px" }} />
                    Add Employee
                  </Link>
                </Button>
              </div>
            </div>
          </div>
          <div style={{ marginTop: "10px", overflowX: "auto" }}>
            <Table dataSource={newEmployees}>
              <Column
                title="Avatar"
                dataIndex="avatar"
                key="avatar"
                render={(_, record) => (
                  <img
                    src={`http://localhost:5000${record.avatar}`}
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
                width="100px"
                render={(_, record) => (
                  <Space size="middle">
                    <Link to={`/edit_employee/${record._id}`}>
                      <Button type="primary">
                        <EditOutlined />
                      </Button>
                    </Link>
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
                    <Button
                      type="danger"
                      onClick={() => showConfirm(record._id)}
                    >
                      <DeleteOutlined />
                    </Button>
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
              <p>Employee not available.</p>
            </div>
            <div>
              <div style={{ marginRight: "10px" }}>
                <Button type="primary" className="primary-btn">
                  <Link to="/add_employee">
                    <PlusOutlined style={{ marginRight: "5px" }} />
                    Add Employee
                  </Link>
                </Button>
              </div>
            </div>
          </div>
          <div className="loader_position">
            <Loader />
          </div>
        </div>
      )}
    </>
  );
};

export default Employee;
