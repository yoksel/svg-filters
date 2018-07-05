import {connect} from 'react-redux';

import TodosList from '../../components/TodosList';


const toggleTodo = (id) => {
  return {
    type: 'TOGGLE_TODO',
    id: id
  }
};

const getVisibleTodos = (todos, visibilityFilter) => {
  switch (visibilityFilter) {
    case 'SHOW_ALL':
      return todos;

    case 'SHOW_ACTIVE':
      return todos.filter(todo => !todo.complete);

    case 'SHOW_COMPLETED':
      return todos.filter(todo => todo.complete);

    default:
      return todos;
  }
}

const mapStateToTodoListProps = (state) => {
  return {
    todos: getVisibleTodos(
      state.todos,
      state.visibilityFilter
    )
  };
};

const mapDispatchToTodoListProps = (dispatch) => {
  return {
    onChange: (id) => {
      dispatch(toggleTodo(id))
    }
  }
};

const VisibleTodoList = connect(
  mapStateToTodoListProps,
  mapDispatchToTodoListProps
)(TodosList);

export default VisibleTodoList;
