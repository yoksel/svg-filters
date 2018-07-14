let nextCounter = 0;
export const addTodo = (text) => {
  return {
    type: 'ADD_TODO',
    text: text,
    id: nextCounter++
  };
};

export const toggleTodo = (id) => {
  return {
    type: 'TOGGLE_TODO',
    id: id
  };
};

export const setVisibilityFilter = (filter) => {
  return {
    type: 'SET_VISIBILITY_FILTER',
    filter: filter
  };
};


