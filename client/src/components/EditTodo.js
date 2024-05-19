import React, { useState } from "react";
import styled from "styled-components";
import { FaEdit, FaTimes } from "react-icons/fa";

const ModalBackdrop = styled.div`
  display: ${(props) => (props.show ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
`;

const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ModalTitle = styled.h4`
  margin: 0;
`;

const ModalCloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  color: #999;
`;

const ModalBody = styled.div`
  margin-top: 20px;
`;

const ModalFooter = styled.div`
  margin-top: 20px;
  text-align: right;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
`;

const EditTodo = ({ todo }) => {
  const [taskName, setTaskName] = useState(todo.task_name);
  const [description, setDescription] = useState(todo.description);
  const [priority, setPriority] = useState(todo.priority);
  const [showModal, setShowModal] = useState(false);

  const updateTodo = async (e) => {
    e.preventDefault();
    try {
      const body = { task_name: taskName, description, priority };
      await fetch(`http://localhost:5000/todos/${todo.todo_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      window.location.reload(); // Refresh the page after updating
    } catch (err) {
      console.error(err.message);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    // Reset the form fields
    setTaskName(todo.task_name);
    setDescription(todo.description);
    setPriority(todo.priority);
  };

  return (
    <>
      <FaEdit onClick={() => setShowModal(true)} />

      <ModalBackdrop show={showModal}>
        <ModalContainer>
          <ModalHeader>
            <ModalTitle>Edit Todo</ModalTitle>
            <ModalCloseButton onClick={closeModal}>
              <FaTimes />
            </ModalCloseButton>
          </ModalHeader>
          <ModalBody>
            <form onSubmit={updateTodo}>
              <Input
                type="text"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                placeholder="Task Name"
              />
              <Input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
              />
              <Input
                type="text"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                placeholder="Priority"
              />
            </form>
          </ModalBody>
          <ModalFooter>
            <Button onClick={updateTodo}>Done</Button>
            <Button onClick={closeModal}>Cancel</Button>
          </ModalFooter>
        </ModalContainer>
      </ModalBackdrop>
    </>
  );
};

export default EditTodo;
