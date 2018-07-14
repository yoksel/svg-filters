const todo = (state, action) => {
  switch (action.type) {
  case 'ADD_TODO':
    return {
      id: action.id,
      text: action.text,
      complete: false
    };

  case 'TOGGLE_TODO':
    if (state.id !== action.id) {
      return state;
    }

    return {
      ...state,
      complete: !state.complete
    };

  default:
    return state;
  }
};

export const todos = (state = [], action) => {

  switch (action.type) {
  case 'ADD_TODO':
    return [
      ...state,
      todo(undefined, action)
    ];

  case 'TOGGLE_TODO':
    return state.map(item => todo(item, action));

  default:
    return state;

  }
};

export const visibilityFilter = (state = 'SHOW_ALL', action) => {
  switch (action.type) {
  case 'SET_VISIBILITY_FILTER':
    return action.filter;

  default:
    return state;
  }
};
