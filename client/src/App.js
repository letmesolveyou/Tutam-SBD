import React from 'react';
import styled from 'styled-components';
import { FaTasks } from 'react-icons/fa';
import InputTodo from './components/InputTodo';
import ListTodos from './components/ListTodos';
import './App.css';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  margin-left: 10px;
  font-size: 2rem;
  color: #333;
`;

function App() {
  return (
    <Container>
      <Header>
        <FaTasks size={40} color="#28a745" />
        <Title>Todo App</Title>
      </Header>
      <InputTodo />
      <ListTodos />
    </Container>
  );
}

export default App;