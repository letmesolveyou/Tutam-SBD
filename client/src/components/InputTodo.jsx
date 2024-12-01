import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import './InputTodo.css'; // Importing the CSS file

const InputTodo = () => {
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState(false);

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { task_name: taskName, description, priority };
      await fetch('http://localhost:5000/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      window.location = '/';
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="form-container">
      <h2 className="title">Add New Todo</h2>
      <form className="form" onSubmit={onSubmitForm}>
        <input
          className="input"
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder="Task Name"
          required
        />
        <input
          className="input"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />
        <div className="checkbox-container">
          <input
            type="checkbox"
            checked={priority}
            onChange={() => setPriority(!priority)}
          />
          <label className="checkbox-label">High Priority</label>
        </div>
        <button className="button" type="submit">
          <FaPlus /> Add Task
        </button>
      </form>
    </div>
  );
};

export default InputTodo;