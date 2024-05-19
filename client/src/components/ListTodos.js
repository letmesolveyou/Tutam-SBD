import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FaTrash, FaEdit } from 'react-icons/fa';
import EditTodo from './EditTodo';

const TableContainer = styled.div`
  max-width: 800px;
  margin: 20px auto;
  background-color: #ffffff; /* Background color */
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Shadow */
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  font-size: 1rem;
  text-align: left;
`;

const Th = styled.th`
  padding: 12px;
  border-bottom: 1px solid #ddd;
`;

const Td = styled.td`
  padding: 12px;
  border-bottom: 1px solid #ddd;
`;

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
    <TableContainer>
      <h2 style={{ textAlign: 'center', margin: '20px 0' }}>List of Todos</h2>
      <Table>
        <thead>
          <tr>
            <Th>Task Name</Th>
            <Th>Description</Th>
            <Th>Priority</Th>
            <Th>Edit</Th>
            <Th>Delete</Th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.todo_id}>
              <Td>{todo.task_name}</Td>
              <Td>{todo.description}</Td>
              <Td>{todo.priority ? 'Yes' : 'No'}</Td>
              <Td>
                <EditTodo todo={todo} />
              </Td>
              <Td>
                <button className="btn btn-danger" onClick={() => deleteTodo(todo.todo_id)}>
                  <FaTrash /> {/* Tombol hapus dengan icon FaTrash */}
                </button>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </TableContainer>
  );
};

export default ListTodos;
