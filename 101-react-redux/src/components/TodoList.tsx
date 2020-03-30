import React from 'react';
import Todo from './Todo';
import {Todo as TodoModel} from '../state'

export type TodoListProps = {
  todos: TodoModel[],
  toggleTodo: (id: number) => void
}

const TodoList = ({todos, toggleTodo}: TodoListProps) => (
  <ul>
    {todos.map(todo => (
      <Todo key={todo.id} {...todo} onClick={() => toggleTodo(todo.id)}/>
    ))}
  </ul>
);

export default TodoList;
