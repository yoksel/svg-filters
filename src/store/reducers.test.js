import expect from 'expect';
import deepFreeze from 'deep-freeze';

const testAddTodo = () => {
  const stateBefore = [];
  const action = {
    type: 'ADD_TODO',
    id: 0,
    text: 'Learn'
  };
  const stateAfter = [{
    id: 0,
    text: 'Learn',
    complete: false
  }];

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(
    todos(stateBefore, action)
  ).toEqual(stateAfter);
};

const testToggleTodo = () => {
  const stateBefore = [
    {
      id: 0,
      text: 'Learn',
      complete: false
    },
    {
      id: 1,
      text: 'Learn',
      complete: false
    }
  ];
  const action = {
    type: 'TOGGLE_TODO',
    id: 1
  };
  const stateAfter = [
    {
      id: 0,
      text: 'Learn',
      complete: false
    },
    {
      id: 1,
      text: 'Learn',
      complete: true
    }
  ];

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(
    todos(stateBefore, action)
  ).toEqual(stateAfter);
};

const testVisibilityFilter = () => {
  const stateBefore = 'SHOW_ALL';
  const action = {
    type: 'SET_VISIBILITY_FILTER',
    filter: 'SHOW_ACTIVE'
  };
  const stateAfter = 'SHOW_ACTIVE';

  deepFreeze(stateBefore);

  expect(
    visibilityFilter(stateBefore, action)
  ).toEqual(stateAfter);
};


testAddTodo();
console.log('Add test passed');
testToggleTodo();
console.log('Toggle test passed');
testVisibilityFilter();
console.log('Visibility test passed');
