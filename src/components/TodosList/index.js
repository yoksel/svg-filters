import React from 'react';

import ToDoItem from '../ToDoItem';

const TodosList = ({todos, onChange}) => {
  return todos.map(todo => {
    return (
      <ToDoItem
        key={todo.id}
        {...todo}
        onChange={() => onChange(todo.id)}
      />
    );
  });
};

export default TodosList;
