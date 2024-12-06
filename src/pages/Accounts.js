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

const Accounts = () => {
  // make & model list get from here
  const [count, setCount] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const newAccounts = [];
  [...accounts].reverse().map((account) => newAccounts.push(account));
  const getAccounts = async () => {
    const token = JSON.parse(localStorage.getItem("token"));
    try {
      fetch("http://localhost:5000/api/v1/admin/all", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          const accounts = data.admins;
          if (accounts && accounts.length > 0) {
            setAccounts([...accounts].reverse());
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
    getAccounts();
  }, [count]);

  // delete model is open
  const showConfirm = (id) => {
    confirm({
      title: "Do you Want to delete these account?",
      icon: <ExclamationCircleOutlined />,
      content: "After click on delete then account will be delete permanently.",
      okText: "Delete",
      okType: "danger",

      onOk() {
        fetch(`http://localhost:5000/api/v1/admin/${id}`, {
          method: "DELETE",
          headers: {
            "content-type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            toast.success("Account Deleted Successfully", {
              autoClose: 1000,
            });
            getAccounts();
          });
      },

      onCancel() {
        console.log("Cancel");
      },
    });
  };

  return (
    <>
      {accounts && accounts.length > 0 ? (
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
                Accounts Table
              </h1>
              <p>
                Accounts are{" "}
                {accounts.length > 0 ? "available." : "not available."}
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
                  <Link to="/add_account">
                    <PlusOutlined style={{ marginRight: "5px" }} />
                    Add Account
                  </Link>
                </Button>
              </div>
            </div>
          </div>
          <div style={{ marginTop: "10px", overflowX: "auto" }}>
            <Table dataSource={newAccounts}>
              <Column title="Username" dataIndex="userName" key="userName" />
              <Column title="Email" dataIndex="email" key="email" />
              <Column title="Role" dataIndex="role" key="role" />
              <Column
                title="Action"
                key="action"
                width="100px"
                render={(_, record) => (
                  <Space size="middle">
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
              <h1>Account Table</h1>
              <p>Account not available.</p>
            </div>
            <div>
              <div style={{ marginRight: "10px" }}>
                <Button type="primary" className="primary-btn">
                  <Link to="/add_account">
                    <PlusOutlined style={{ marginRight: "5px" }} />
                    Add Account
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

export default Accounts;
