import React, { useState, useEffect } from 'react';
import { FaEdit, FaTimes } from "react-icons/fa";
import './EditTodo.css'; // Import external CSS file

const EditTodo = ({ todo }) => {
  // Set default values for taskName, description, and priority in case todo is undefined
  const [taskName, setTaskName] = useState(todo?.task_name || '');
  const [description, setDescription] = useState(todo?.description || '');
  const [priority, setPriority] = useState(todo?.priority || false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Ensure todo is valid before setting state
    if (todo) {
      setTaskName(todo.task_name);
      setDescription(todo.description);
      setPriority(todo.priority);
    }
  }, [todo]);

  const updateTodo = async (e) => {
    e.preventDefault();
    if (!todo) return; // Exit if todo is not available

    try {
      const body = { task_name: taskName, description, priority };
      await fetch(`http://localhost:5000/todos/${todo.todo_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      window.location.reload(); // Refresh the page after updating
    } catch (err) {
      console.error('Error updating todo:', err.message);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    // Reset form fields to initial values from todo
    if (todo) {
      setTaskName(todo.task_name);
      setDescription(todo.description);
      setPriority(todo.priority);
    }
  };

  return (
    <>
      <FaEdit onClick={() => setShowModal(true)} />

      <div className={`modal-backdrop ${showModal ? "show" : ""}`}>
        <div className="modal-container">
          <div className="modal-header">
            <h4 className="modal-title">Edit Todo</h4>
            <button className="modal-close-button" onClick={closeModal}>
              <FaTimes />
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={updateTodo}>
              <input
                type="text"
                className="input"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                placeholder="Task Name"
              />
              <input
                type="text"
                className="input"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
              />
              <input
                type="text"
                className="input"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                placeholder="Priority"
              />
            </form>
          </div>
          <div className="modal-footer">
            <button className="button" onClick={updateTodo}>Done</button>
            <button className="button" onClick={closeModal}>Cancel</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditTodo;