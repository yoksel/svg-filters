import React from 'react';

const ToDoItem = ({
  onChange,
  text,
  complete
}) => (
  <div>
    <label
      style={{
        textDecoration: complete ?
          'line-through' :
          'none'
      }}>
      <input
        type="checkbox"
        onChange={onChange}
        checked={complete}
      />
      {text}
    </label>
  </div>
);

export default ToDoItem;
