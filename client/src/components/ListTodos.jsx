import React, { useEffect, useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import './ListTodos.css'; // Importing the CSS file
import EditTodo from './EditTodo';

const ListTodos = () => {
  const [todos, setTodos] = useState([]);

  const deleteTodo = async (id) => {
    try {
      await fetch(`http://localhost:5000/todos/${id}`, {
        method: 'DELETE',
      });
      setTodos(todos.filter((todo) => todo.todo_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

  const getTodos = async () => {
    try {
      const response = await fetch('http://localhost:5000/todos');
      const jsonData = await response.json();
      setTodos(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div className="table-container">
      <h2>List of Todos</h2>
      <table className="table">
        <thead>
          <tr>
            <th className="th">Task Name</th>
            <th className="th">Description</th>
            <th className="th">Priority</th>
            <th className="th">Edit</th>
            <th className="th">Delete</th>
          </tr>
        </thead>
        <tbody>
          {todos.length > 0 ? (
            todos.map((todo) => (
              <tr key={todo.todo_id}>
                <td className="td">{todo.task_name}</td>
                <td className="td">{todo.description}</td>
                <td className="td">{todo.priority ? 'Yes' : 'No'}</td>
                <td className="td">
                  <EditTodo todo={todo} />
                </td>
                <td className="td">
                  <button className="btn-danger" onClick={() => deleteTodo(todo.todo_id)}>
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No todos found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ListTodos;