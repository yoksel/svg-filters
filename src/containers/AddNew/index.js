import React from 'react';
import {connect} from 'react-redux';

let nextCounter = 0;
const addTodo = (text) => {

  return {
    type: 'ADD_TODO',
    text: text,
    id: nextCounter++
  }
};

let AddNew = ({dispatch}) => {
  let textInput;

  return (
      <p>
        <input ref={(node) => textInput = node}/>

        <button
          onClick={(text) => {
            dispatch(addTodo(textInput.value));
            textInput.value = '';
          }}
          >Add new</button>
      </p>
    )
};

AddNew = connect()(AddNew);

export default AddNew;
