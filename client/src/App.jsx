import React from 'react';
import './App.css';
import ListTodo from './components/ListTodos';
import InputTodo from './components/InputTodo';
import EditTodo from './components/EditTodo';

function App() {
  return (
    <div className="container">
      <h1>Todo Application</h1>
      <InputTodo />
      <ListTodo />
      <EditTodo />
    </div>
  );
}

export default App;
