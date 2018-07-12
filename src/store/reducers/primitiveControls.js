const primitiveControl = (state, action) => {
  switch (action.type) {
  case 'ADD_PRIMITIVE_CONTROL':
    return {
      id: action.id,
      name: action.name,
      params: action.params,
      groupName: action.groupName,
      paramsValues: action.paramsValues,
      children: action.children
    };

  default:
    return state;
  }
};

export const primitiveControls = (state = [], action) => {
  switch (action.type) {
  case 'ADD_All_PRIMITIVE_CONTROLS':
    return [
      ...action.data
    ];

  case 'ADD_PRIMITIVE_CONTROL':
    return [
      ...state,
      primitiveControl(undefined, action)
    ];

  default:
    return state;
  }
};

export default primitiveControls;
