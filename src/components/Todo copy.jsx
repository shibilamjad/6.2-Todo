import { useEffect, useState } from "react";

import { Header } from "./Header.jsx/Header";
import { InputAddTodo } from "./InputAddTodo.jsx/InputAddTodo";
import "./Todo.css";
import { TodoValues } from "./TodoValues/TodoValues";
function Todo() {
  const [description, setDescription] = useState([]);
  const [fieldInput, setFieldInput] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [todoId, setTodoId] = useState(null);
  const [newTodoValue, setTodoValue] = useState("");

  function handleSubmitValue(e) {
    e.preventDefault();
    if (!fieldInput) return;
    handleAddItem();
    setFieldInput("");
  }

  function handleChangeValue(e) {
    setFieldInput(e.target.value);
  }

  function handleAddItem() {
    const newItem = { fieldInput, id: description.length + 1, picked: false };
    setDescription((description) => [...description, newItem]);
  }

  function handleId(id) {
    setTodoId((todoId) => (todoId === id ? null : id));
  }
  function handleDelete(id) {
    setDescription((description) =>
      description.filter((item) => item.id !== id)
    );
  }

  function handleUpdate() {
    const updatedArray = description.map((item) =>
      item.id === todoId ? { ...item, fieldInput: newTodoValue } : item
    );
    if (!newTodoValue) return;
    setDescription(updatedArray);
  }

  function handletoggle(id) {
    setDescription((description) =>
      description.map((items) =>
        items.id === id ? { ...items, picked: !items.picked } : items
      )
    );
  }
  function isOpen() {
    setIsEdit((prev) => !prev);
  }
  // const string = JSON.stringify(description);
  // localStorage.setItem("description", string);

  // const retString = localStorage.getItem("description");
  // const retArray = JSON.parse(retString);

  useEffect(() => {
    localStorage.setItem("description", JSON.stringify(description));
  }, [description]);

  useEffect(() => {
    const description = JSON.parse(localStorage.getItem("description"));
    if (description) {
      setDescription(description);
    }
  }, []);

  console.log(description);
  return (
    <div className="todo-container">
      <div className="todo-shadow">
        <div className="todo-bg">
          <div>
            <Header />
            <InputAddTodo
              handleSubmitValue={handleSubmitValue}
              handleChangeValue={handleChangeValue}
              fieldInput={fieldInput}
            />
          </div>
          <div className="todo-overflow">
            <TodoValues
              todoId={todoId}
              description={description}
              handleId={handleId}
              handleDelete={handleDelete}
              setDescription={setDescription}
              handleUpdate={handleUpdate}
              setTodoValue={setTodoValue}
              newTodoValue={newTodoValue}
              handletoggle={handletoggle}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Todo;
