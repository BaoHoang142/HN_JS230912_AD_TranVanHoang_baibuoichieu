import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../loading/Loading";
import "./TodoList.scss";
import privateAxios from "../config/privateAxios";
import publicAxios from "../config/publicAxios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { BsXSquareFill, BsPencilSquare } from "react-icons/bs";
export default function TodoList() {
  const [todo, setTodo] = useState({
    todoName: "",
  });
  const [allTodo, setAllTodo] = useState([]);
  const [loading,setLoading]=useState(false)
  const handleAddTodo = async () => {
    if (!todo.todoName) {
      alert("Please write a wish!");
    } else {
      if (!todo.id) {
        try {
          const response = await privateAxios.post("/todo", todo);
          alert(response.data.message);
          listTodo();
          setTodo({ todoName: "" });
        } catch (error) {
          alert(error.response.data.message);
        }
      } else {
        try {
          const response = await privateAxios.put(`/todo/${todo.id}`, todo);
          listTodo();
          setTodo({ todoName: "" });
        } catch (error) {
          alert(error.response.data.message);
        }
      }
    }
  };
 

  const listTodo = async () => {
    setLoading(true)
    try {
      const res = await publicAxios.get("/todo");
      setAllTodo(res.data);
    } catch (error) {
      console.log(error);
    }
    finally {
        setTimeout(() => {
            setLoading(false)
        },500)
    }
  };
  useEffect(() => {
    listTodo();
  }, []);
  const handleDelete = async (id) => {
    setLoading(true)
    try {
      if (confirm("Are you sure?")) {
        const res = await privateAxios.delete(`/todo/${id}`);
        setAllTodo(res.data);
      }
    } catch (error) {
      alert(error.response.data.message);
    }
    finally {
        setTimeout(() => {
            setLoading(false)
        },500)
    }
  };
  const handleEdit = async (item) => {
    setTodo(item);
  };

  return (
    <>
      <div id="body">
        <div id="formTable">
          <div className="mainTable">
            <div
              style={{
                boxShadow: "0 0 20px rgb(74,17,7)",
                textAlign: "center",
                width: "300px",
                margin: "auto",
              }}
            >
              <h1 style={{ color: "rgb(74,17,7)" }}>Wishes of you</h1>
            </div>
            <div className="formAdd">
              <InputGroup className="mb-3">
                <Form.Control
                  style={{
                    boxShadow: "0 0 20px rgb(74,17,7)",
                    height: "40px",
                    fontSize: "20px",
                  }}
                  placeholder="Add new wish"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                  name="todoName"
                  onChange={(e) =>
                    setTodo({ ...todo, [e.target.name]: e.target.value })
                  }
                  value={todo.todoName}
                />
                <Button
                  style={{
                    textAlign: "center",
                    backgroundColor: "rgb(139,74,236)",
                    fontSize: "18px",
                    fontWeight: "900",
                    width: "60px",
                    padding: "10px",
                  }}
                  id="button-addon2"
                  onClick={handleAddTodo}
                >
                  {todo.id ? "Save" : "Add"}
                </Button>
              </InputGroup>
            </div>

            {loading ? <Loading></Loading>:
            <div className="formRender">
              {allTodo?.map((e, i) => {
                return (
                  <ul key={i}>
                    <li className="formRender__list">
                      <p className="formRender__list--text">{e.todoName}</p>
                      <div className="formRender__list--button">
                        <Button
                          style={{
                            backgroundColor: "#fff",
                            fontSize: "17px",
                            fontWeight: "900",
                            width: "50px",
                            border: "none",
                            alignItems: "center",
                          }}
                          id="button-addon2"
                          onClick={() => handleEdit(e)}
                        >
                          <BsPencilSquare
                            style={{
                              fontSize: "30px",
                              marginLeft: "-13px",
                              color: "rgb(141,47,129)",
                            }}
                          ></BsPencilSquare>
                        </Button>
                        <Button
                          style={{
                            backgroundColor: "#fff",

                            fontSize: "17px",
                            fontWeight: "900",
                            width: "50px",
                            border: "none",
                          }}
                          id="button-addon2"
                          onClick={() => handleDelete(e.id)}
                        >
                          <BsXSquareFill
                            style={{
                              fontSize: "30px",
                              marginLeft: "-13px",
                              color: "rgb(245,13,39)",
                            }}
                          ></BsXSquareFill>
                        </Button>
                      </div>
                    </li>
                  </ul>
                );
              })}
            </div>
            }
          </div>
        </div>
      </div>
    </>
  );
}
