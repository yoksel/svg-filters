import React from 'react';
import {connect} from 'react-redux';

import {addTodo} from '../../store/actions';

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
  );
};

AddNew = connect()(AddNew);

export default AddNew;
